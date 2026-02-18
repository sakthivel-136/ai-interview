import os
import json
import time
from dotenv import load_dotenv
from supabase import create_client, Client
import google.generativeai as genai

load_dotenv()

# Supabase Config
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Gemini Config
gemini_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel("gemini-flash-latest")

def generate_problems(count=100):
    print(f"Generating {count} high-quality problems using Gemini...")
    
    categories = ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Greedy", "Backtracking", "Stacks", "Queues"]
    
    all_problems = []
    
    # We'll batch them to avoid token limits or timeouts
    batch_size = 5
    for i in range(0, count, batch_size):
        cat = categories[(i // batch_size) % len(categories)]
        prompt = f"""
        Generate {batch_size} unique, high-quality coding interview problems for the category: {cat}.
        Each problem must have:
        - title: A catchy, standard name.
        - description: Clear problem statement with an example (Input/Output). Use Markdown.
        - difficulty: 'Easy', 'Medium', or 'Hard'.
        - category: {cat}.
        - starter_code: A Python function template (e.g., 'def solve(nums):\n    pass').
        - test_cases: A JSON list of objects with 'input' and 'output' strings.
        
        Return ONLY a valid JSON list of objects. No markdown formatting for the JSON itself.
        """
        
        try:
            response = model.generate_content(prompt)
            content = response.text.strip()
            # Clean possible markdown wrap
            if content.startswith("```json"):
                content = content[7:-3].strip()
            elif content.startswith("```"):
                content = content[3:-3].strip()
                
            batch_data = json.loads(content)
            all_problems.extend(batch_data)
            print(f"Generated {len(all_problems)}/{count} problems...")
            
            # Simple rate limiting/breather
            time.sleep(2)
        except Exception as e:
            print(f"Error generating batch starting at {i}: {e}")
            
    return all_problems

def populate():
    # 1. Clear existing generic problems? 
    # The user might want to keep some, but they mentioned "Algorithm Challenge #..." are bad.
    # supabase.table("problems").delete().neq("title", "KEEP ME").execute() # Optional
    
    new_problems = generate_problems(100)
    
    print(f"Inserting {len(new_problems)} problems into Supabase...")
    for p in new_problems:
        try:
            # Ensure p is a dict and has required fields
            if not isinstance(p, dict): continue
            
            supabase.table("problems").insert({
                "title": p.get("title", "Untitled Challenge"),
                "description": p.get("description", ""),
                "difficulty": p.get("difficulty", "Easy"),
                "category": p.get("category", "General"),
                "test_cases": p.get("test_cases", []),
                "starter_code": p.get("starter_code", "# Write your code here")
            }).execute()
        except Exception as e:
            print(f"Error inserting {p.get('title')}: {e}")

if __name__ == "__main__":
    populate()
