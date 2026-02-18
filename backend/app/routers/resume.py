from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from app.middleware.auth import get_current_user, get_supabase_client
from app.services.openai_service import analyze_resume
from pydantic import BaseModel
from typing import Optional
import io

router = APIRouter()

class ResumeAnalysisResponse(BaseModel):
    ats_score: int
    keywords_missing: list[str]
    suggestions: str
    generated_questions: list[str]

@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume_endpoint(
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
    user = Depends(get_current_user)
):
    resume_text = ""
    
    # 1. Extract Text
    if text:
        resume_text = text
    elif file:
        content = await file.read()
        filename = (file.filename or "").lower()
        
        if filename.endswith(".pdf"):
            try:
                from pypdf import PdfReader
                pdf_reader = PdfReader(io.BytesIO(content))
                for page in pdf_reader.pages:
                    extracted = page.extract_text()
                    if extracted:
                        resume_text += extracted + "\n"
            except ImportError:
                raise HTTPException(
                    status_code=500,
                    detail="PDF library not available. Please paste your resume text instead."
                )
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Error reading PDF: {str(e)}")
        else:
            try:
                resume_text = content.decode("utf-8")
            except Exception:
                raise HTTPException(status_code=400, detail="Could not decode file as UTF-8 text.")
    
    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="No resume content provided.")
    
    # 2. Analyze with OpenAI
    analysis = analyze_resume(resume_text)
    
    # 3. Save to Database
    supabase = get_supabase_client()
    
    data = {
        "user_id": user.user.id,
        "ats_score": analysis.get("ats_score", 0),
        "keywords_missing": analysis.get("keywords_missing", []),
        "suggestions": analysis.get("suggestions", ""),
        "generated_questions": analysis.get("generated_questions", [])
    }
    
    try:
        supabase.table("resume_analysis").upsert(data, on_conflict="user_id").execute()
    except Exception as e:
        # Table might not exist yet - still return the analysis
        print(f"Warning: Could not save resume analysis to DB: {e}")
    
    return analysis

@router.get("/", response_model=Optional[ResumeAnalysisResponse])
def get_resume_analysis(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    
    try:
        response = supabase.table("resume_analysis").select("*").eq("user_id", user.user.id).maybe_single().execute()
        
        if not response.data:
            return None
            
        return {
            "ats_score": response.data["ats_score"],
            "keywords_missing": response.data["keywords_missing"] or [],
            "suggestions": response.data["suggestions"] or "",
            "generated_questions": response.data["generated_questions"] or []
        }
    except Exception as e:
        # Table doesn't exist yet - return None gracefully
        print(f"Warning: Could not fetch resume analysis: {e}")
        return None
