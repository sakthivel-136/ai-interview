import sys
import os
import json
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.services.openai_service import get_mistral_response

def main():
    prompt = """
    Generate 10 UNIQUE LeetCode-style Coding Problems not commonly found in basic lists.
    Difficulty: Mix of Easy, Medium, Hard.
    Return ONLY a JSON LIST of objects:
    {
        "id": "gen-code-{i}",
        "title": "Problem Title",
        "description": "Problem Description...",
        "difficulty": "Medium",
        "category": "Arrays",
        "starter_code": "def solution(arg):\\n    pass",
        "constraints": ["Constraint 1", "Constraint 2"]
    }
    """
    print("Generating 10 Coding Questions...")
    response = get_mistral_response(prompt, json_mode=True)
    
    if response:
        try:
            data = json.loads(response)
            if isinstance(data, dict): data = data.get('questions', []) or list(data.values())[0]
            
            with open('backend/scripts/generated_coding.json', 'w') as f:
                json.dump(data, f, indent=2)
            print(f"Generated {len(data)} coding questions.")
        except Exception as e:
            print(f"Error parsing: {e}")
    else:
        print("No response.")

if __name__ == "__main__":
    main()
