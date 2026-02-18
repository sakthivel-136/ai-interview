import os
import json
import time
from dotenv import load_dotenv
from supabase import create_client, Client
from mistralai import Mistral

load_dotenv()

# Supabase Config
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Mistral Config
api_key = os.getenv("MISTRAL_API_KEY")
model_name = os.getenv("MISTRAL_MODEL", "mistral-small-latest")

def generate_problems(count=100):
    print(f"Generating {count} high-quality problems using Mistral...")
    
    if not api_key:
        print("Error: No Mistral API key found in .env")
        return []

    client = Mistral(api_key=api_key)
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
            print(f"Generating batch for {cat}...")
            messages = [
                {
                    "role": "user",
                    "content": prompt,
                },
            ]
            
            response = client.chat.complete(
                model=model_name,
                messages=messages,
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            batch_data = json.loads(content)
            
            # Mistral might return a dictionary with a list inside, or just the list
            if isinstance(batch_data, dict):
                # Look for a list in any key
                for k, v in batch_data.items():
                    if isinstance(v, list):
                        batch_data = v
                        break
            
            if isinstance(batch_data, list):
                all_problems.extend(batch_data)
                print(f"Generated {len(all_problems)}/{count} problems...")
            else:
                print(f"Warning: Unexpected format from AI: {type(batch_data)}")
                
        except Exception as e:
            print(f"Error generating batch: {e}")
            
        # Simple rate limiting/breather
        time.sleep(1)
            
    return all_problems

def populate():
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
