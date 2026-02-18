-- Seed Data for AI Interview Platform

-- 1. Insert Coding Problems
INSERT INTO public.problems (title, description, difficulty, category, test_cases, expected_output) VALUES
(
    'Two Sum',
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.',
    'Easy',
    'Arrays',
    '[{"input": "[2,7,11,15], 9", "output": "[0, 1]"}, {"input": "[3,2,4], 6", "output": "[1, 2]"}]',
    '{"type": "array", "content": "indices"}'
),
(
    'Reverse String',
    'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    'Easy',
    'Strings',
    '[{"input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]", "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"}]',
    '{"type": "array", "content": "chars"}'
),
(
    'Valid Palindrome',
    'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\nGiven a string s, return true if it is a palindrome, or false otherwise.',
    'Easy',
    'Strings',
    '[{"input": "A man, a plan, a canal: Panama", "output": "true"}, {"input": "race a car", "output": "false"}]',
    '{"type": "boolean"}'
);

-- 2. Insert Aptitude Questions
INSERT INTO public.aptitude_questions (question, options, correct_answer, difficulty) VALUES
(
    'Which number completes the series? 2, 5, 10, 17, ...',
    '["24", "26", "27", "25"]',
    '26',
    'Easy'
),
(
    'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
    '["120 metres", "180 metres", "324 metres", "150 metres"]',
    '150 metres',
    'Medium'
),
(
    'Find the odd one out: 3, 5, 11, 14, 17, 21',
    '["21", "17", "14", "3"]',
    '14',
    'Easy'
),
(
    'If A is the brother of B; B is the sister of C; and C is the father of D, how D is related to A?',
    '["Brother", "Sister", "Nephew", "Cannot be determined"]',
    'Nephew',
    'Medium'
),
(
    'A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:',
    '["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"]',
    'Rs. 698',
    'Hard'
);

-- 3. Fix Permission (Just to be sure while you are here)
GRANT ALL ON TABLE public.problems TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.aptitude_questions TO anon, authenticated, service_role;
