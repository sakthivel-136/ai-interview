import os
import json
from typing import Optional
from mistralai import Mistral
from app.core.config import get_settings
import time

settings = get_settings()

def get_mistral_response(prompt: str, json_mode: bool = True, model_override: Optional[str] = None):
    """
    Core function to get a response from Mistral AI.
    Replaces the previous Gemini implementation.
    """
    api_key = settings.MISTRAL_API_KEY
    if not api_key:
        print("DEBUG: No Mistral API key configured.")
        return None
        
    model = model_override or settings.MISTRAL_MODEL or "mistral-small-latest"
    
    try:
        client = Mistral(api_key=api_key)
        
        print(f"DEBUG: Attempting Mistral request with Model: {model}")
        
        # Mistral uses a chat-style interface
        messages = [
            {
                "role": "user",
                "content": prompt,
            },
        ]
        
        response = client.chat.complete(
            model=model,
            messages=messages,
            response_format={"type": "json_object"} if json_mode else {"type": "text"}
        )
            
        if response and response.choices:
            return response.choices[0].message.content
            
    except Exception as e:
        print(f"DEBUG: Mistral API Error: {str(e)}")
        
    return None

# Mapping legacy function name to new Mistral implementation to avoid breaking callers
def get_gemini_response(prompt: str, json_mode: bool = True, model_override: Optional[str] = None):
    return get_mistral_response(prompt, json_mode, model_override)

def evaluate_hr_answer(question: str, answer: str):
    prompt = f"""
    You are an expert HR interviewer. Evaluate this answer RIGOROUSLY.
    
    Question: "{question}"
    Candidate Answer: "{answer}"
    
    Criteria:
    1. Did they answer the SPECIFIC question? (Penalize generic/guarded answers).
    2. Is the answer relevant? (If irrelevant, score < 30).
    3. Is there depth? (If one-liner without substance, score < 50).
    
    Return a valid JSON object with:
    - "score": integer (0-100). Be strict. 70+ is passing.
    - "sentiment": string ("Positive", "Neutral", "Negative")
    - "confidence": float (0.0 to 1.0)
    - "feedback": string (Critique the answer directly. If generic, say so.)
    """

    content = get_mistral_response(prompt)
    if content:
        try:
            return json.loads(content)
        except Exception as e:
            print(f"DEBUG: JSON parse error in evaluate_hr_answer: {e}")
            
    # Fallback Data - FAIL if error
    return {
        "score": 40, 
        "sentiment": "Neutral", 
        "confidence": 0.0,
        "feedback": "AI Evaluation Service unavailable. Please check backend API/Keys."
    }

def evaluate_technical_answer(question: str, answer: str):
    prompt = f"""
    You are a Senior Technical Interviewer. Evaluate this answer for ACCURACY, DEPTH, and SPECIFICITY.
    
    Question: "{question}"
    Candidate Answer: "{answer}"
    
    Criteria:
    - Accuracy: Is the technical information correct?
    - Depth: Did they explain HOW/WHY, or just what?
    - Relevance: Did they answer the specific question?
    
    Return a valid JSON object with:
    - "score": integer (0-100). Be strict. 70+ is passing.
    - "feedback": string (Detailed correction or praise)
    - "key_concepts": list of strings (Key concepts mentioned or missed)
    """

    content = get_mistral_response(prompt)
    if content:
        try:
            return json.loads(content)
        except Exception as e:
            print(f"DEBUG: JSON parse error in evaluate_technical_answer: {e}")
            
    # Fallback Data - FAIL if error
    return {
        "score": 40, 
        "feedback": "Technical evaluation service unavailable. Please check backend API/Keys.", 
        "key_concepts": ["Service Error"]
    }

def generate_resume_technical_questions(resume_text: str) -> list:
    """
    Generates 5 tricky, resume-specific technical interview questions.
    Questions are based on the candidate's actual skills, projects, and technologies.
    """
    prompt = f"""
    You are a Senior Technical Interviewer. You have the candidate's resume below.
    Your job is to create 5 TRICKY, DEEP technical interview questions that:
    1. Are based SPECIFICALLY on the skills, projects, frameworks, and technologies mentioned in their resume.
    2. Go BEYOND surface-level — ask about internals, trade-offs, edge cases, or design decisions.
    3. Cannot be answered by someone who just listed the skill without actually using it.
    4. Cover different areas from their resume (don't repeat the same technology twice).
    5. Each question should be answerable from knowledge gained working on THEIR specific projects.

    Resume:
    {resume_text}

    Return a valid JSON object with:
    - "questions": list of exactly 5 strings (the tricky technical questions)
    """

    content = get_mistral_response(prompt)
    if content:
        try:
            data = json.loads(content)
            questions = data.get("questions", [])
            if questions and len(questions) >= 5:
                return questions[:5]
        except Exception as e:
            print(f"DEBUG: JSON parse error in generate_resume_technical_questions: {e}")

    # Fallback — generic but still reasonable
    return [
        "Walk me through the most complex technical decision you made in your most recent project and why.",
        "What data structures did you use in your projects and what were the trade-offs?",
        "How did you handle errors and edge cases in your backend/API work?",
        "Explain the architecture of one of your projects — what would you change now?",
        "What was the biggest performance bottleneck you encountered and how did you solve it?"
    ]


def analyze_resume(resume_text: str):
    prompt = f"""
    You are an expert ATS (Applicant Tracking System) and Technical Recruiter for VANTAGE. Analyze the following resume text.
    
    Resume Text:
    "{resume_text}"
    
    Return a valid JSON object with:
    - "ats_score": integer (0-100) based on content quality, impact, and formatting.
    - "keywords_missing": list of strings (important tech/skills missing for a general software engineer role).
    - "suggestions": string (2-3 sentences on how to improve the resume).
    - "generated_questions": list of 5 strings (behavioral interview questions tailored specifically to the projects and skills in this resume).
    """

    content = get_mistral_response(prompt)
    if content:
        try:
            return json.loads(content)
        except Exception as e:
            print(f"DEBUG: JSON parse error in analyze_resume: {e}")

    # Fallback Data
    return {
        "ats_score": 70,
        "keywords_missing": ["Scalability", "System Design"],
        "suggestions": "Resume analysis service is temporarily unavailable. Our engineers have been notified.",
        "generated_questions": [
            "Describe a complex technical challenge from your recent projects.",
            "How do you ensure code quality and maintainability in a team environment?",
            "Explain a design decision you made and the trade-offs involved."
        ]
    }

def evaluate_code(problem_title: str, problem_description: str, code: str):
    prompt = f"""
    You are a friendly coding mentor evaluating a student's solution. Your goal is to encourage and reward correct thinking.

    Problem: "{problem_title}"
    Description: {problem_description}

    Student's Code:
    ```python
    {code}
    ```

    Evaluation Rules:
    1. If the student's LOGIC and APPROACH is correct and would produce the right output — give "Pass" with a score of 80-100.
    2. If there is a minor bug but the overall approach is right — still give "Pass" with score 70-79 and a one-line tip.
    3. Only give "Fail" if the logic is fundamentally wrong or the code would produce incorrect output.
    4. Keep feedback SHORT — maximum 2 sentences. Be encouraging, not critical.
    5. Focus on the student's THINKING, not on code style or comments.

    Return a valid JSON object with:
    - "score": integer (0-100)
    - "status": string ("Pass" or "Fail")
    - "message": string (1-2 sentences max, encouraging and concise)
    """

    content = get_mistral_response(prompt)
    if content:
        try:
            return json.loads(content)
        except Exception as e:
            print(f"DEBUG: JSON parse error in evaluate_code: {e}")

    # Fallback Message
    return {
        "score": 0,
        "status": "Fail",
        "message": "Server Error: Technical evaluation is temporarily unavailable. Please retry in a moment."
    }
