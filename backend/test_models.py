import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Testing Gemini 2.5 Pro (Primary)
model_name = 'gemini-3-flash-preview'
print(f"Testing model: {model_name}")
model = genai.GenerativeModel(model_name)

try:
    response = model.generate_content("Say hello")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error for {model_name}: {str(e)}")

# Testing Gemini 2.5 Pro (Secondary/Fallback check)
model_name = 'gemini-3-flash-preview'
print(f"\nTesting model: {model_name}")
model = genai.GenerativeModel(model_name)
try:
    response = model.generate_content("Say hello")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error for {model_name}: {str(e)}")
