import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

prompt = "Provide a JSON object with 'score': 100, 'status': 'Pass', 'message': 'Perfect'. Return ONLY the JSON."

print("Testing WITHOUT JSON config (Prompt only):")
try:
    response = model.generate_content(prompt)
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {str(e)}")

print("\nTesting WITH JSON config:")
try:
    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            response_mime_type="application/json",
        ),
    )
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {str(e)}")
