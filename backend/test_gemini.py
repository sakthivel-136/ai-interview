import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")
print(f"Key: {api_key[:10]}...")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

try:
    response = model.generate_content("Say hello")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {str(e)}")
