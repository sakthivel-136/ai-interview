import sys
import os
import json
import time

# Add backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.openai_service import get_mistral_response

def generate_batch(type_name, count, prompt_template):
    print(f"[{type_name}] Generating {count} questions...")
    response = get_mistral_response(prompt_template.format(count=count), json_mode=True)
    if not response:
        print(f"[{type_name}] Failed to get response.")
        return []
    
    try:
        data = json.loads(response)
        # Handle if wrapped in a key like "questions" or just a list
        if isinstance(data, list):
            return data
        elif isinstance(data, dict):
            for key in data:
                if isinstance(data[key], list):
                    return data[key]
        return []
    except Exception as e:
        print(f"[{type_name}] JSON Error: {e}")
        return []

def main():
    # 1. Aptitude
    apt_prompt = """
    Generate {count} UNIQUE, CHALLENGING Aptitude questions for software engineers.
    Categories: Arithmetic, Logical, Verbal, Data Interpretation.
    Return ONLY a JSON LIST of objects with this format:
    {{
        "id": "gen-apt-{{i}}",
        "question": "Question text...",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Option A",
        "explanation": "Step-by-step reasoning...",
        "category": "Logical" 
    }}
    """
    apt_data = generate_batch("Aptitude", 50, apt_prompt)

    # 2. HR
    hr_prompt = """
    Generate {count} UNIQUE, BEHAVIORAL HR Interview questions.
    Focus on: Leadership, Conflict, Failure, Success, Ethics, Teamwork.
    Return ONLY a JSON LIST of objects:
    {{
        "id": "gen-hr-{{i}}", 
        "question": "Question text..."
    }}
    """
    hr_data = generate_batch("HR", 50, hr_prompt)

    # 3. Technical
    tech_prompt = """
    Generate {count} UNIQUE Technical Interview questions.
    Categories: System Design, Operating Systems, DBMS, OOPs, Networking, DSA, Security, Cloud & DevOps, Web.
    Return ONLY a JSON LIST of objects:
    {{
        "id": "gen-tech-{{i}}",
        "question": "Question text...",
        "category": "System Design"
    }}
    """
    tech_data = generate_batch("Technical", 50, tech_prompt)

    final_output = {
        "aptitude": apt_data,
        "hr": hr_data,
        "technical": tech_data
    }

    with open('backend/scripts/generated_batch.json', 'w') as f:
        json.dump(final_output, f, indent=2)
    
    print(f"Success! Generated: Aptitude={len(apt_data)}, HR={len(hr_data)}, Tech={len(tech_data)}")

if __name__ == "__main__":
    main()
