from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

print(f"URL: {url}")
print(f"Key length: {len(key) if key else 0}")

try:
    supabase = create_client(url, key)
    print("Success: Supabase client created.")
    # Try a simple query
    res = supabase.table("problems").select("count", count="exact").limit(1).execute()
    print(f"Query result: {res}")
except Exception as e:
    print(f"Error: {str(e)}")
