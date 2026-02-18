-- 1. Create RPC for Random Aptitude Questions
CREATE OR REPLACE FUNCTION public.get_random_aptitude_questions(limit_count int)
RETURNS SETOF public.aptitude_questions AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.aptitude_questions
  ORDER BY random()
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Add starter_code column if not exists (insurance)
ALTER TABLE public.problems ADD COLUMN IF NOT EXISTS starter_code TEXT;

-- 3. Insert 5 High-Quality Practice Problem Examples
-- We delete existing ones with these titles to avoid duplicates during re-runs
DELETE FROM public.problems WHERE title IN ('Two Sum', 'Reverse String', 'Valid Parentheses', 'Fibonacci Number', 'Maximum Subarray');

INSERT INTO public.problems (title, description, difficulty, category, test_cases, starter_code)
VALUES 
(
    'Two Sum', 
    'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution.\n\n**Example:**\nInput: `nums = [2,7,11,15], target = 9`\nOutput: `[0,1]`', 
    'Easy', 
    'Arrays', 
    '[{"input": "[2,7,11,15], 9", "output": "[0,1]"}]',
    'def twoSum(nums, target):\n    # Write your code here\n    pass'
),
(
    'Reverse String', 
    'Write a function that reverses a string. The input string is given as an array of characters `s`.\n\n**Example:**\nInput: `s = ["h","e","l","l","o"]`\nOutput: `["o","l","l","e","h"]`', 
    'Easy', 
    'Strings', 
    '[{"input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]", "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"}]',
    'def reverseString(s):\n    # Do not return anything, modify s in-place instead.\n    pass'
),
(
    'Valid Parentheses', 
    'Given a string `s` containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.\n\nAn input string is valid if brackets are closed in the correct order.', 
    'Easy', 
    'Stacks', 
    '[{"input": "()[]{}", "output": "true"}]',
    'def isValid(s):\n    # Write your code here\n    pass'
),
(
    'Fibonacci Number', 
    'The Fibonacci numbers, commonly denoted `F(n)` form a sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.\n\n**Example:**\nInput: `n = 2`\nOutput: `1` (F(2) = F(1) + F(0) = 1 + 0)', 
    'Easy', 
    'Dynamic Programming', 
    '[{"input": "2", "output": "1"}]',
    'def fib(n):\n    # Write your code here\n    pass'
),
(
    'Maximum Subarray', 
    'Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\n**Example:**\nInput: `nums = [-2,1,-3,4,-1,2,1,-5,4]`\nOutput: `6` (Subarray [4,-1,2,1] has the largest sum)', 
    'Medium', 
    'Arrays', 
    '[{"input": "[-2,1,-3,4,-1,2,1,-5,4]", "output": "6"}]',
    'def maxSubArray(nums):\n    # Write your code here\n    pass'
);
