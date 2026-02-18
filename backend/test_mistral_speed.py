import time
from mistralai import Mistral
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")
client = Mistral(api_key=api_key)

prompt = """
You are an expert Coding Interviewer for VANTAGE. Evaluate the following Python solution for the problem: "Two Sum".

Problem Description:
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

Candidate Code:
```python
def twoSum(nums, target):
    d = {}
    for i, n in enumerate(nums):
        if target - n in d:
            return [d[target - n], i]
        d[n] = i
```

Return a valid JSON object with:
- "score": integer (0-100)
- "status": string ("Pass" or "Fail")
- "message": string (Detailed feedback, including any bugs or optimizations).
"""

start = time.time()
print("Starting Mistral request...")
response = client.chat.complete(
    model="mistral-small-latest",
    messages=[{"role": "user", "content": prompt}],
    response_format={"type": "json_object"}
)
end = time.time()

print(f"Time taken: {end - start:.2f} seconds")
if response and response.choices:
    print("Response received:")
    print(response.choices[0].message.content)
else:
    print("No response")
