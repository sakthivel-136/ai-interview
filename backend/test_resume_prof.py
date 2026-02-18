import time
import os
import sys
from dotenv import load_dotenv

# Add the backend directory to sys.path to import app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.openai_service import analyze_resume

def test_resume_speed():
    load_dotenv()
    
    sample_resume = """
    John Doe
    Software Engineer
    Experience:
    - Built a high-scalability backend using Python and FastAPI.
    - Optimized database queries in PostgreSQL, reducing latency by 40%.
    - Lead a team of 5 engineers to deliver a Fintech product.
    Skills: Python, Go, React, AWS, Docker, Kubernetes.
    Education: BS in Computer Science.
    """
    
    print("Starting Resume Analysis Test...")
    start = time.time()
    try:
        result = analyze_resume(sample_resume)
        end = time.time()
        print(f"Analysis Successful in {end - start:.2f} seconds")
        print("Result Summary:")
        print(f"ATS Score: {result.get('ats_score')}")
        print(f"Missing Keywords: {result.get('keywords_missing')}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_resume_speed()
