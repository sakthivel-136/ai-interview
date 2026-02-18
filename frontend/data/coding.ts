export interface CodingProblem {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    starter_code: string;
    constraints?: string[];
}

export const codingProblems: CodingProblem[] = [
    {
        id: "code-1",
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        difficulty: "Easy",
        category: "Arrays",
        starter_code: "def twoSum(nums, target):\n    # Write your code here\n    pass",
        constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"]
    },
    {
        id: "code-2",
        title: "Reverse Integer",
        description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
        difficulty: "Medium",
        category: "Math",
        starter_code: "def reverse(x):\n    # Write your code here\n    pass"
    },
    {
        id: "code-3",
        title: "Palindrome Number",
        description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
        difficulty: "Easy",
        category: "Math",
        starter_code: "def isPalindrome(x):\n    # Write your code here\n    pass"
    },
    {
        id: "code-4",
        title: "Longest Common Prefix",
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \"\".",
        difficulty: "Easy",
        category: "Strings",
        starter_code: "def longestCommonPrefix(strs):\n    # Write your code here\n    pass"
    },
    {
        id: "code-5",
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        difficulty: "Easy",
        category: "Stacks",
        starter_code: "def isValid(s):\n    # Write your code here\n    pass"
    },
    {
        id: "code-6",
        title: "Merge Two Sorted Lists",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
        difficulty: "Easy",
        category: "Linked List",
        starter_code: "def mergeTwoLists(list1, list2):\n    # Write your code here\n    pass"
    },
    {
        id: "code-7",
        title: "Remove Duplicates from Sorted Array",
        description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.",
        difficulty: "Easy",
        category: "Arrays",
        starter_code: "def removeDuplicates(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-8",
        title: "Maximum Subarray",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        difficulty: "Medium",
        category: "Divide and Conquer",
        starter_code: "def maxSubArray(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-9",
        title: "Climbing Stairs",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "def climbStairs(n):\n    # Write your code here\n    pass"
    },
    {
        id: "code-10",
        title: "Binary Tree Inorder Traversal",
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def inorderTraversal(root):\n    # Write your code here\n    pass"
    },
    {
        id: "code-11",
        title: "Maximum Depth of Binary Tree",
        description: "Given the root of a binary tree, return its maximum depth.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def maxDepth(root):\n    # Write your code here\n    pass"
    },
    {
        id: "code-12",
        title: "Single Number",
        description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
        difficulty: "Easy",
        category: "Hash Table",
        starter_code: "def singleNumber(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-13",
        title: "Linked List Cycle",
        description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
        difficulty: "Easy",
        category: "Linked List",
        starter_code: "def hasCycle(head):\n    # Write your code here\n    pass"
    },
    {
        id: "code-14",
        title: "Best Time to Buy and Sell Stock",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        difficulty: "Easy",
        category: "Arrays",
        starter_code: "def maxProfit(prices):\n    # Write your code here\n    pass"
    },
    {
        id: "code-15",
        title: "Implement Queue using Stacks",
        description: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).",
        difficulty: "Easy",
        category: "Stacks",
        starter_code: "class MyQueue:\n    def __init__(self):\n        pass\n    def push(self, x):\n        pass\n    def pop(self):\n        pass\n    def peek(self):\n        pass\n    def empty(self):\n        pass"
    },
    {
        id: "code-16",
        title: "Invert Binary Tree",
        description: "Given the root of a binary tree, invert the tree, and return its root.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def invertTree(root):\n    # Write your code here\n    pass"
    },
    {
        id: "code-17",
        title: "Lowest Common Ancestor of a BST",
        description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def lowestCommonAncestor(root, p, q):\n    # Write your code here\n    pass"
    },
    {
        id: "code-18",
        title: "Valid Anagram",
        description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        difficulty: "Easy",
        category: "Strings",
        starter_code: "def isAnagram(s, t):\n    # Write your code here\n    pass"
    },
    {
        id: "code-19",
        title: "Binary Search",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
        difficulty: "Easy",
        category: "Binary Search",
        starter_code: "def search(nums, target):\n    # Write your code here\n    pass"
    },
    {
        id: "code-20",
        title: "Reverse String",
        description: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
        difficulty: "Easy",
        category: "Two Pointers",
        starter_code: "def reverseString(s):\n    # Write your code here\n    pass"
    },
    {
        id: "code-21",
        title: "Contains Duplicate",
        description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        difficulty: "Easy",
        category: "Arrays",
        starter_code: "def containsDuplicate(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-22",
        title: "Fizz Buzz",
        description: "Given an integer n, return a string array answer (1-indexed) where answer[i] is \"FizzBuzz\" if i is divisible by 3 and 5, \"Fizz\" if i is divisible by 3, \"Buzz\" if i is divisible by 5, or i if none of the above.",
        difficulty: "Easy",
        category: "Math",
        starter_code: "def fizzBuzz(n):\n    # Write your code here\n    pass"
    },
    {
        id: "code-23",
        title: "Majority Element",
        description: "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.",
        difficulty: "Easy",
        category: "Arrays",
        starter_code: "def majorityElement(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-24",
        title: "Move Zeroes",
        description: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.",
        difficulty: "Easy",
        category: "Two Pointers",
        starter_code: "def moveZeroes(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-25",
        title: "Intersection of Two Arrays II",
        description: "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.",
        difficulty: "Easy",
        category: "Hash Table",
        starter_code: "def intersect(nums1, nums2):\n    # Write your code here\n    pass"
    },
    {
        id: "code-26",
        title: "Valid Palindrome",
        description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
        difficulty: "Easy",
        category: "Two Pointers",
        starter_code: "def isPalindrome(s):\n    # Write your code here\n    pass"
    },
    {
        id: "code-27",
        title: "Missing Number",
        description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
        difficulty: "Easy",
        category: "Bit Manipulation",
        starter_code: "def missingNumber(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-28",
        title: "Power of Three",
        description: "Given an integer n, return true if it is a power of three. Otherwise, return false. An integer n is a power of three, if there exists an integer x such that n == 3^x.",
        difficulty: "Easy",
        category: "Math",
        starter_code: "def isPowerOfThree(n):\n    # Write your code here\n    pass"
    },
    {
        id: "code-29",
        title: "Convert Sorted Array to BST",
        description: "Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def sortedArrayToBST(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-30",
        title: "Kth Largest Element in a Stream",
        description: "Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
        difficulty: "Easy",
        category: "Heap",
        starter_code: "class KthLargest:\n    def __init__(self, k, nums):\n        pass\n    def add(self, val):\n        pass"
    },
    {
        id: "code-31",
        title: "Sum of Two Integers",
        description: "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
        difficulty: "Medium",
        category: "Bit Manipulation",
        starter_code: "def getSum(a, b):\n    # Write your code here\n    pass"
    },
    {
        id: "code-32",
        title: "Matrix Zeroes",
        description: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's. Do it in place.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def setZeroes(matrix):\n    # Write your code here\n    pass"
    },
    {
        id: "code-33",
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "Medium",
        category: "Hash Table",
        starter_code: "def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass"
    },
    {
        id: "code-34",
        title: "Group Anagrams",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        difficulty: "Medium",
        category: "Hash Table",
        starter_code: "def groupAnagrams(strs):\n    # Write your code here\n    pass"
    },
    {
        id: "code-35",
        title: "Top K Frequent Elements",
        description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        difficulty: "Medium",
        category: "Heap",
        starter_code: "def topKFrequent(nums, k):\n    # Write your code here\n    pass"
    },
    {
        id: "code-36",
        title: "Product of Array Except Self",
        description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def productExceptSelf(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-37",
        title: "3Sum",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        difficulty: "Medium",
        category: "Two Pointers",
        starter_code: "def threeSum(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-38",
        title: "Container With Most Water",
        description: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        difficulty: "Medium",
        category: "Two Pointers",
        starter_code: "def maxArea(height):\n    # Write your code here\n    pass"
    },
    {
        id: "code-39",
        title: "Merge Intervals",
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        difficulty: "Medium",
        category: "Sorting",
        starter_code: "def merge(intervals):\n    # Write your code here\n    pass"
    },
    {
        id: "code-40",
        title: "Search in Rotated Sorted Array",
        description: "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        difficulty: "Medium",
        category: "Binary Search",
        starter_code: "def search(nums, target):\n    # Write your code here\n    pass"
    },
    {
        id: "code-41",
        title: "Find Minimum in Rotated Sorted Array",
        description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element of this array.",
        difficulty: "Medium",
        category: "Binary Search",
        starter_code: "def findMin(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-42",
        title: "Longest Repeating Character Replacement",
        description: "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. Perform at most k operations.",
        difficulty: "Medium",
        category: "Sliding Window",
        starter_code: "def characterReplacement(s, k):\n    # Write your code here\n    pass"
    },
    {
        id: "code-43",
        title: "Spiral Matrix",
        description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def spiralOrder(matrix):\n    # Write your code here\n    pass"
    },
    {
        id: "code-44",
        title: "Rotate Image",
        description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def rotate(matrix):\n    # Write your code here\n    pass"
    },
    {
        id: "code-45",
        title: "Word Search",
        description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def exist(board, word):\n    # Write your code here\n    pass"
    },
    {
        id: "code-46",
        title: "Number of Islands",
        description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def numIslands(grid):\n    # Write your code here\n    pass"
    },
    {
        id: "code-47",
        title: "Course Schedule",
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Some courses may have prerequisites. Return true if you can finish all courses.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def canFinish(numCourses, prerequisites):\n    # Write your code here\n    pass"
    },
    {
        id: "code-48",
        title: "Coin Change",
        description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def coinChange(coins, amount):\n    # Write your code here\n    pass"
    },
    {
        id: "code-49",
        title: "Subsets",
        description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def subsets(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-50",
        title: "Word Break",
        description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def wordBreak(s, wordDict):\n    # Write your code here\n    pass"
    },
    {
        id: "code-51",
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        difficulty: "Hard",
        category: "Binary Search",
        starter_code: "def findMedianSortedArrays(nums1, nums2):\n    # Write your code here\n    pass"
    },
    {
        id: "code-52",
        title: "Fibonacci Number",
        description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.",
        difficulty: "Easy",
        category: "Math/Dynamic Programming",
        starter_code: "def fib(n):\n    # Write your code here\n    pass"
    }
];
