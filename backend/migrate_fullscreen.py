import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

sql = """
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mock_exit_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_exit_date DATE DEFAULT current_date;

COMMENT ON COLUMN profiles.mock_exit_count IS 'Tracks how many times a user has exited full-screen in a single day during mock interviews.';
COMMENT ON COLUMN profiles.last_exit_date IS 'Records the last date an exit occurred to reset the daily count.';
"""

try:
    # Supabase Python client doesn't have a direct raw SQL executor in the same way as the JS client's RPC logic might, 
    # but we can try to use an RPC if one exists, or just use the PostgREST interface if we were doing data changes.
    # For schema changes, typically one uses the Supabase UI or migrations.
    # However, I will try to see if there's an 'rpc' or similar way to run this.
    # If not, I'll have to ask the user to run it in the SQL Editor.
    
    # Actually, the most reliable way for me to do this is to inform the user or try to find a workaround.
    # Let's try to find if there is a 'query' method or similar in this version of the client.
    print("Attempting to apply schema changes...")
    # NOTE: Most Supabase clients do NOT allow schema changes via the client library for security reasons.
    # I will try to use the 'rpc' method if the user has a 'exec_sql' function defined, 
    # but since I don't know that, I'll just provide the script and tell the user to run it in the UI if this fails.
    
    # Let's check for migrations folder.
    print("Migration SQL:\n", sql)
    print("\n[IMPORTANT] Please run the above SQL in your Supabase SQL Editor if you haven't already.")
except Exception as e:
    print(f"Error: {e}")
