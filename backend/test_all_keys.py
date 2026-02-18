import os
from mistralai import Mistral
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("MISTRAL_API_KEY")
model_name = os.getenv("MISTRAL_MODEL", "mistral-small-latest")

if not api_key:
    print("No MISTRAL_API_KEY found in .env.")
    exit(1)

print(f"Testing Mistral AI Key: {api_key[:10]}...")
print(f"Model: {model_name}\n")

try:
    client = Mistral(api_key=api_key)
    messages = [
        {
            "role": "user",
            "content": "Say 'Mistral works'",
        },
    ]
    
    response = client.chat.complete(
        model=model_name,
        messages=messages
    )
    
    if response and response.choices:
        print(f"  ✅ SUCCESS: {response.choices[0].message.content.strip()}")
    else:
        print(f"  ❌ FAILED: Empty response")
except Exception as e:
    print(f"  ❌ ERROR: {str(e)}")
print("-" * 30)
