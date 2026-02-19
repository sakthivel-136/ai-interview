from fastapi import APIRouter, Depends, HTTPException
from app.middleware.auth import get_current_user, get_supabase_client
from app.services.openai_service import evaluate_code
from pydantic import BaseModel
from typing import List, Dict, Any

import re

UUID_REGEX = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', re.IGNORECASE)

router = APIRouter()

class ProblemSchema(BaseModel):
    id: str
    title: str
    description: str
    difficulty: str
    category: str

class SubmissionSchema(BaseModel):
    problem_id: str
    code: str

class EvaluationResult(BaseModel):
    score: int
    status: str
    message: str
    output: str

def execute_python_code(code: str) -> str:
    import subprocess
    import tempfile
    import os

    tmp_path = None
    try:
        # Create a temporary file for the code
        with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as tmp:
            tmp.write(code.encode('utf-8'))
            tmp_path = tmp.name

        # Run the code in a subprocess with a timeout (Sandbox simulation)
        # We use a 5-second timeout to prevent infinite loops
        result = subprocess.run(
            ["python3", tmp_path],
            capture_output=True,
            text=True,
            timeout=5,
        )
        
        output = result.stdout
        if result.stderr:
            output += f"\nError:\n{result.stderr}"
            
        return output if output else "(No output)"

    except subprocess.TimeoutExpired:
        return "Error: Execution timed out (exceeded 5 seconds). Possible infinite loop."
    except Exception as e:
        return f"Error during execution: {str(e)}"
    finally:
        # Clean up the temporary file
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)
    
    return "Error: Unknown execution failure." # Final fallback

@router.get("/", response_model=List[ProblemSchema])
def get_problems(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    response = supabase.table("problems").select("id, title, description, difficulty, category").execute()
    return response.data

@router.get("/random", response_model=List[ProblemSchema])
def get_random_problems(limit: int = 5, user = Depends(get_current_user)):
    import random
    supabase = get_supabase_client()
    response = supabase.table("problems").select("id, title, description, difficulty, category").execute()
    problems = response.data or []
    random.shuffle(problems)
    return problems[:limit]

@router.get("/{problem_id}", response_model=ProblemSchema)
def get_problem(problem_id: str, user = Depends(get_current_user)):
    supabase = get_supabase_client()
    response = supabase.table("problems").select("id, title, description, difficulty, category").eq("id", problem_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Problem not found")
    return response.data

@router.post("/submit", response_model=EvaluationResult)
def submit_solution(submission: SubmissionSchema, user = Depends(get_current_user)):
    import time
    start_total = time.time()
    print(f"DEBUG: [0s] Problem submission start: {submission.problem_id}")

    is_real_uuid = bool(UUID_REGEX.match(submission.problem_id))
    title = f"Problem {submission.problem_id}"
    description = "Solve the given coding problem."

    # 1. Fetch Problem Details from DB only if it's a real UUID
    if is_real_uuid:
        try:
            supabase = get_supabase_client()
            start_db = time.time()
            problem_response = supabase.table("problems").select("title, description").eq("id", submission.problem_id).single().execute()
            problem_data = problem_response.data
            print(f"DEBUG: [{time.time() - start_db:.2f}s] DB Problem fetch done")
            if problem_data:
                title = problem_data.get('title', title)
                description = problem_data.get('description', description)
        except Exception as e:
            print(f"DEBUG: DB fetch skipped: {e}")
    else:
        print(f"DEBUG: Non-UUID problem_id '{submission.problem_id}' — skipping DB fetch")

    try:
        # 2. Execute Code (Real Execution)
        start_exec = time.time()
        execution_output = execute_python_code(submission.code)
        print(f"DEBUG: [{time.time() - start_exec:.2f}s] Code Execution done")

        # 3. Evaluate Code with Mistral (AI Evaluation)
        start_ai = time.time()
        # Append the execution output to the prompt so AI knows what happened
        evaluation = evaluate_code(title, description, submission.code + f"\n\n# Execution Output:\n{execution_output}")
        print(f"DEBUG: [{time.time() - start_ai:.2f}s] AI Evaluation done")

        score = evaluation.get("score", 0)
        status = evaluation.get("status", "Fail")
        message = evaluation.get("message", "Evaluation failed.")

        # 4. Save Submission to DB only if it's a real UUID
        if is_real_uuid:
            try:
                supabase = get_supabase_client()
                start_save = time.time()
                supabase.table("submissions").insert({
                    "user_id": user.user.id,
                    "problem_id": submission.problem_id,
                    "code": submission.code,
                    "score": score,
                    "status": status
                }).execute()
                print(f"DEBUG: [{time.time() - start_save:.2f}s] DB Submission save done")
            except Exception as e:
                print(f"DEBUG: DB Save Error (non-critical): {str(e)}")
        else:
            print(f"DEBUG: Non-UUID problem_id — skipping DB save")

        print(f"DEBUG: TOTAL TIME: {time.time() - start_total:.2f}s")
        return {
            "score": score, 
            "status": status, 
            "message": message,
            "output": execution_output
        }
    except Exception as e:
        print(f"DEBUG: CRITICAL ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
