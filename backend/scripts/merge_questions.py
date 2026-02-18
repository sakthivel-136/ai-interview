import sys
import os
import json
import uuid

# Define paths relative to script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BATCH_JSON_PATH = os.path.join(SCRIPT_DIR, 'generated_batch.json')
CODING_JSON_PATH = os.path.join(SCRIPT_DIR, 'generated_coding.json')
FRONTEND_DATA_DIR = os.path.join(SCRIPT_DIR, '../../frontend/data')

def merge_aptitude(questions):
    path = os.path.join(FRONTEND_DATA_DIR, 'aptitude.ts')
    with open(path, 'r') as f: content = f.read()
    marker = "];"; last_idx = content.rfind(marker)
    if last_idx == -1: return

    insert_str = ""
    for idx, q in enumerate(questions):
        try:
            new_id = f"apt-gen-{uuid.uuid4().hex[:6]}"
            quest = q['question'].replace('"', '\\"').replace('\n', ' ')
            ans = q['answer'].replace('"', '\\"').replace('\n', ' ')
            expl = q.get('explanation', '').replace('"', '\\"').replace('\n', ' ')
            cat = q.get('category', 'Logical')
            opts = json.dumps(q['options'])
            insert_str += f"""
    {{ id: "{new_id}", question: "{quest}", options: {opts}, answer: "{ans}", explanation: "{expl}", category: "{cat}" }},"""
        except: pass

    new_content = content[:last_idx] + insert_str + "\n" + content[last_idx:]
    with open(path, 'w') as f: f.write(new_content)
    print(f"Merged {len(questions)} aptitude questions.")

def merge_hr(questions):
    path = os.path.join(FRONTEND_DATA_DIR, 'hr.ts')
    with open(path, 'r') as f: content = f.read()
    marker = "];"; last_idx = content.rfind(marker)
    if last_idx == -1: return
        
    insert_str = ""
    for idx, q in enumerate(questions):
        try:
            new_id = f"hr-gen-{uuid.uuid4().hex[:6]}"
            quest = q['question'].replace('"', '\\"').replace('\n', ' ')
            insert_str += f"""
    {{ id: "{new_id}", question: "{quest}" }},"""
        except: pass
            
    new_content = content[:last_idx] + insert_str + "\n" + content[last_idx:]
    with open(path, 'w') as f: f.write(new_content)
    print(f"Merged {len(questions)} HR questions.")

def merge_technical(questions):
    path = os.path.join(FRONTEND_DATA_DIR, 'technical.ts')
    with open(path, 'r') as f: content = f.read()
    marker = "];"; last_idx = content.rfind(marker)
    if last_idx == -1: return

    insert_str = ""
    for idx, q in enumerate(questions):
        try:
            new_id = f"tech-gen-{uuid.uuid4().hex[:6]}"
            quest = q['question'].replace('"', '\\"').replace('\n', ' ')
            cat = q.get('category', 'General')
            insert_str += f"""
    {{ id: "{new_id}", question: "{quest}", category: "{cat}" }},"""
        except: pass
            
    new_content = content[:last_idx] + insert_str + "\n" + content[last_idx:]
    with open(path, 'w') as f: f.write(new_content)
    print(f"Merged {len(questions)} Technical questions.")

def merge_coding(questions):
    path = os.path.join(FRONTEND_DATA_DIR, 'coding.ts')
    with open(path, 'r') as f: content = f.read()
    marker = "];"; last_idx = content.rfind(marker)
    if last_idx == -1: return

    insert_str = ""
    for idx, q in enumerate(questions):
        try:
            new_id = f"code-gen-{uuid.uuid4().hex[:8]}"
            title = q['title'].replace('"', '\\"').replace('\n', ' ')
            desc = q['description'].replace('"', '\\"').replace('\n', ' ')
            diff = q.get('difficulty', 'Medium')
            cat = q.get('category', 'Arrays')
            
            starter = q.get('starter_code', '')
            # Escape literal newlines for JS string literal
            starter = starter.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
            
            con = q.get('constraints', [])
            if isinstance(con, str): con = [con]
            con_json = json.dumps(con)

            insert_str += f"""
    {{ 
        id: "{new_id}", 
        title: "{title}", 
        description: "{desc}", 
        difficulty: "{diff}", 
        category: "{cat}", 
        starter_code: "{starter}", 
        constraints: {con_json} 
    }},"""
        except Exception as e:
            print(f"Error coding q {idx}: {e}")

    new_content = content[:last_idx] + insert_str + "\n" + content[last_idx:]
    with open(path, 'w') as f: f.write(new_content)
    print(f"Merged {len(questions)} Coding questions.")

def main():
    if os.path.exists(BATCH_JSON_PATH):
        try:
            with open(BATCH_JSON_PATH, 'r') as f: data = json.load(f)
            if 'aptitude' in data: merge_aptitude(data['aptitude'])
            if 'hr' in data: merge_hr(data['hr'])
            if 'technical' in data: merge_technical(data['technical'])
            os.remove(BATCH_JSON_PATH)
        except Exception as e: print(f"Batch merge error: {e}")

    if os.path.exists(CODING_JSON_PATH):
        try:
            with open(CODING_JSON_PATH, 'r') as f: data = json.load(f)
            if isinstance(data, list): qs = data
            elif isinstance(data, dict): qs = data.get('questions', []) or list(data.values())[0] if data.values() else []
            else: qs = []
            merge_coding(qs)
            os.remove(CODING_JSON_PATH)
        except Exception as e: print(f"Coding merge error: {e}")

if __name__ == "__main__":
    main()
