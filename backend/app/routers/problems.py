from fastapi import APIRouter, Depends, HTTPException
from app.middleware.auth import get_current_user, get_supabase_client
from app.services.openai_service import evaluate_code
from pydantic import BaseModel
from typing import List, Dict, Any

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
    from datetime import datetime, timedelta
    print(f"DEBUG: Problem submission: {submission.problem_id} for user {user.user.id}")
    supabase = get_supabase_client()
    
    # 0. Check if already passed
    existing_pass = supabase.table("submissions") \
        .select("id") \
        .eq("user_id", user.user.id) \
        .eq("problem_id", submission.problem_id) \
        .eq("status", "Pass") \
        .execute()
    
    if existing_pass.data:
        raise HTTPException(status_code=400, detail="You have already mastered this problem. Try a different challenge to improve your College Rank!")

    try:
        # 1. Fetch Problem Details
        print(f"DEBUG: Fetching problem details...")
        problem_response = supabase.table("problems").select("title, description").eq("id", submission.problem_id).single().execute()
        if not problem_response.data:
            print("DEBUG: ERROR: Problem not found")
            raise HTTPException(status_code=404, detail="Problem not found")
        
        problem = problem_response.data
        print(f"DEBUG: Problem found: {problem.get('title')}")

        # 2. Evaluate Code with Gemini
        print("DEBUG: Calling AI evaluator...")
        evaluation = evaluate_code(
            problem.get("title", ""),
            problem.get("description", ""),
            submission.code
        )
        
        score = evaluation.get("score", 0)
        status = evaluation.get("status", "Fail")
        message = evaluation.get("message", "Evaluation failed.")
        
        print(f"DEBUG: Evaluation result: {status} ({score}%)")

        # 3. Save Submission
        print("DEBUG: Inserting submission record...")
        supabase.table("submissions").insert({
            "user_id": user.user.id,
            "problem_id": submission.problem_id,
            "code": submission.code,
            "score": score,
            "status": status
        }).execute()
        
        print("DEBUG: Submission saved successfully")
        return {"score": score, "status": status, "message": message}
    except Exception as e:
        print(f"DEBUG: ERROR in submit_solution: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
