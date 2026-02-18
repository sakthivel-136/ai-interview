from datetime import date
import random
from fastapi import APIRouter, Depends, HTTPException, Body
from app.middleware.auth import get_current_user, get_supabase_client
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class AptitudeQuestionSchema(BaseModel):
    id: str
    question: str
    options: List[str]
    # correct_answer should NOT be sent to frontend

class AptitudeSubmitSchema(BaseModel):
    answers: dict[str, str] # question_id -> selected_option

class HRSubmitSchema(BaseModel):
    question: str
    answer: str

@router.get("/aptitude", response_model=List[AptitudeQuestionSchema])
def get_aptitude_questions(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    try:
        response = supabase.rpc("get_random_aptitude_questions", {"limit_count": 10}).execute()
        if response.data and len(response.data) > 0:
            return response.data
    except Exception as e:
        print(f"DEBUG: RPC failed, using fallback: {e}")

    # Shuffled fallback
    response = supabase.table("aptitude_questions").select("id, question, options").execute()
    questions = response.data or []
    random.shuffle(questions)
    return questions[:10]

@router.post("/aptitude/submit")
def submit_aptitude(submission: AptitudeSubmitSchema, user = Depends(get_current_user)):
    supabase = get_supabase_client()
    
    score = 0
    total = 0
    
    # Verify answers
    # Ideally fetch all correct answers in one go
    # For MVP, iterate (inefficient but simple) or fetch all matching IDs
    
    print(f"DEBUG: Submitting aptitude answers for user {user.user.id}")
    question_ids = list(submission.answers.keys())
    if not question_ids:
         return {"score": 0.0, "passed": False}

    try:
        response = supabase.table("aptitude_questions").select("id, correct_answer").in_("id", question_ids).execute()
        correct_map = {item['id']: item['correct_answer'] for item in response.data}
        
        for q_id, user_ans in submission.answers.items():
            if correct_map.get(q_id) == user_ans:
                score += 1
            total += 1
        
        percentage = (score / total) * 100 if total > 0 else 0
        passed = percentage >= 70
        
        print(f"DEBUG: Score: {score}/{total} ({percentage}%), Passed: {passed}")

        # Record Attempt
        attempt_data = {
            "user_id": user.user.id,
            "round": "Aptitude",
            "score": int(percentage),
            "passed": passed
        }
        print(f"DEBUG: Inserting mock_attempt: {attempt_data}")
        supabase.table("mock_attempts").insert(attempt_data).execute()
        
        return {"score": percentage, "passed": passed}
    except Exception as e:
        print(f"DEBUG: Error in submit_aptitude: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/hr/questions")
def get_hr_questions(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    
    resume_data = supabase.table("resume_analysis").select("generated_questions").eq("user_id", user.user.id).limit(1).execute()
    
    questions = [
        "Tell me about yourself and your professional journey.",
        "What is your greatest professional asset and a growth area?",
        "Describe a high-stakes situation you navigated successfully.",
        "Where do you see your career trajectory in 5 years?",
        "Why is VANTAGE the right fit for your evolution?",
        "How do you sustain performance under intense pressure?",
        "What are your expectations for compensation and impact?",
        "Describe a time you lead a team through a technical bottleneck.",
        "How do you prioritize competing deadlines in a fast-paced environment?",
        "What is your philosophy on professional mentorship and growth?"
    ]
    
    if resume_data.data and resume_data.data[0].get("generated_questions"):
        questions = resume_data.data[0]["generated_questions"]

    random.shuffle(questions)
    return questions[:5] # Return 5 random ones

@router.post("/hr/submit")
def submit_hr_answer(submission: HRSubmitSchema, user = Depends(get_current_user)):
    from app.services.openai_service import evaluate_hr_answer
    
    # 1. AI Evaluation
    evaluation = evaluate_hr_answer(submission.question, submission.answer)
    
    ai_score = evaluation.get("score", 0)
    sentiment = evaluation.get("sentiment", "Neutral")
    confidence = evaluation.get("confidence", 0.0)
    feedback = evaluation.get("feedback", "")
    
    # 2. Save Answer
    supabase = get_supabase_client()
    supabase.table("interview_answers").insert({
        "user_id": user.user.id,
        "question": submission.question,
        "answer": submission.answer,
        "ai_score": ai_score,
        "sentiment": sentiment,
        "confidence": confidence
    }).execute()
    
    # 3. Update HR Mock Attempt (Keep record of this round)
    supabase.table("mock_attempts").insert({
        "user_id": user.user.id,
        "round": "HR",
        "score": ai_score,
        "passed": ai_score >= 70
    }).execute()
    
    return {"ai_score": ai_score, "sentiment": sentiment, "feedback": feedback}

@router.get("/technical/questions")
def get_technical_questions(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    resume_data = supabase.table("resume_analysis").select("generated_questions").eq("user_id", user.user.id).limit(1).execute()
    
    questions = [
        "Explain the critical differences between a process and a thread.",
        "Deep dive into Hash Map implementation and collision resolution.",
        "Architectural principles of REST vs gRPC.",
        "Big O analysis: Compare sorting algorithms in average and worst case.",
        "Consistency vs Availability in distributed NoSQL databases.",
        "Memory management and garbage collection strategies in Python/Java.",
        "Functional programming: Explain closures and decorators with use cases.",
        "Distributed Locking: How would you implement it in a microservices architecture?",
        "Database Indexing: Explain B-Trees vs Hash Indexes.",
        "Solid Principles: Explain with a real-world refactoring example."
    ]
    
    if resume_data.data and resume_data.data[0].get("generated_questions"):
         questions = resume_data.data[0]["generated_questions"]

    random.shuffle(questions)
    return questions[:5] # Return 5 random ones

@router.post("/technical/submit")
def submit_technical_answer(submission: HRSubmitSchema, user = Depends(get_current_user)):
    from app.services.openai_service import evaluate_technical_answer
    
    # 1. AI Evaluation
    evaluation = evaluate_technical_answer(submission.question, submission.answer)
    
    ai_score = evaluation.get("score", 0)
    feedback = evaluation.get("feedback", "")
    
    # 2. Save Answer
    supabase = get_supabase_client()
    supabase.table("interview_answers").insert({
        "user_id": user.user.id,
        "question": submission.question,
        "answer": submission.answer,
        "ai_score": ai_score,
        "sentiment": "Neutral",
        "confidence": 1.0
    }).execute()
    
    # 3. Update Technical Mock Attempt
    supabase.table("mock_attempts").insert({
        "user_id": user.user.id,
        "round": "Technical",
        "score": ai_score,
        "passed": ai_score >= 70
    }).execute()

    return {"ai_score": ai_score, "feedback": feedback}

@router.post("/coding/submit")
def submit_coding_round(submission: dict = Body(...), user = Depends(get_current_user)):
    # submission expected as { "solutions": { "prob_id": "code", ... } }
    solutions = submission.get("solutions", {})
    if not solutions:
        raise HTTPException(status_code=400, detail="No solutions provided.")

    supabase = get_supabase_client()
    from app.services.openai_service import evaluate_code
    
    total_score = 0
    count = 0
    
    # 1. Fetch problem details for prompt context
    problem_ids = list(solutions.keys())
    problems_res = supabase.table("problems").select("id, title, description").in_("id", problem_ids).execute()
    problem_map = {p['id']: p for p in problems_res.data}

    # 2. Evaluate each
    feedback_list = []
    evaluation_details = []
    
    for p_id, code in solutions.items():
        prob = problem_map.get(p_id)
        if not prob: continue
        
        try:
            evaluation = evaluate_code(prob['title'], prob['description'], code)
            score = evaluation.get("score", 0)
            status = evaluation.get("status", "Fail")
            
            total_score += score
            feedback_list.append(f"{prob['title']}: {evaluation.get('message', 'N/A')}")
            evaluation_details.append({
                "problem_id": p_id,
                "code": code,
                "score": score,
                "status": status
            })
            count += 1
        except Exception as e:
            print(f"DEBUG: Error evaluating problem {p_id}: {e}")
            continue

    final_score = int(total_score / count) if count > 0 else 0
    passed = final_score >= 70

    # 3. Save Overall Attempt
    supabase.table("mock_attempts").insert({
        "user_id": user.user.id,
        "round": "Coding",
        "score": final_score,
        "passed": passed
    }).execute()

    # 4. Save individual submissions for history
    for detail in evaluation_details:
        supabase.table("submissions").insert({
            "user_id": user.user.id,
            "problem_id": detail["problem_id"],
            "code": detail["code"],
            "score": detail["score"],
            "status": detail["status"]
        }).execute()

    return {
        "score": final_score, 
        "passed": passed, 
        "message": "\n".join(feedback_list)
    }

@router.get("/check-block")
def check_mock_block(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    res = supabase.table("profiles").select("mock_exit_count, last_exit_date").eq("id", user.user.id).single().execute()
    
    if not res.data:
        return {"blocked": False, "count": 0}
        
    exit_count = res.data.get("mock_exit_count", 0)
    last_date = res.data.get("last_exit_date")
    today = str(date.today())
    
    if last_date != today:
        # Reset count for a new day
        supabase.table("profiles").update({"mock_exit_count": 0, "last_exit_date": today}).eq("id", user.user.id).execute()
        return {"blocked": False, "count": 0}
        
    return {"blocked": exit_count >= 5, "count": exit_count}

@router.post("/exit-session")
def report_exit(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    res = supabase.table("profiles").select("mock_exit_count, last_exit_date").eq("id", user.user.id).single().execute()
    
    if not res.data:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    exit_count = res.data.get("mock_exit_count", 0)
    last_date = res.data.get("last_exit_date")
    today = str(date.today())
    
    new_count = 1 if last_date != today else exit_count + 1
    
    supabase.table("profiles").update({
        "mock_exit_count": new_count,
        "last_exit_date": today
    }).eq("id", user.user.id).execute()
    
    return {"message": "Exit recorded", "new_count": new_count, "blocked": new_count >= 5}
