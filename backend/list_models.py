import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

api_keys = os.getenv("GEMINI_API_KEYS", "").split(",")
api_key = api_keys[0] if api_keys else os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print("Available models:")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)
