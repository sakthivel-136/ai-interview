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
    },
    {
        id: "code-53",
        title: "Valid Anagram",
        description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase.",
        difficulty: "Easy",
        category: "Strings",
        starter_code: "def isAnagram(s, t):\n    # Write your code here\n    pass"
    },
    {
        id: "code-54",
        title: "Group Anagrams",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        difficulty: "Medium",
        category: "Hash Table",
        starter_code: "def groupAnagrams(strs):\n    # Write your code here\n    pass"
    },
    {
        id: "code-55",
        title: "Top K Frequent Elements",
        description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        difficulty: "Medium",
        category: "Heap",
        starter_code: "def topKFrequent(nums, k):\n    # Write your code here\n    pass"
    },
    {
        id: "code-56",
        title: "Product of Array Except Self",
        description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time without using the division operation.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def productExceptSelf(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-57",
        title: "Encode and Decode Strings",
        description: "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.",
        difficulty: "Medium",
        category: "Strings",
        starter_code: "def encode(strs):\n    # Write your code here\n    pass\n\ndef decode(s):\n    # Write your code here\n    pass"
    },
    {
        id: "code-58",
        title: "Longest Consecutive Sequence",
        description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def longestConsecutive(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-59",
        title: "Container With Most Water",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        difficulty: "Medium",
        category: "Two Pointers",
        starter_code: "def maxArea(height):\n    # Write your code here\n    pass"
    },
    {
        id: "code-60",
        title: "3Sum",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        difficulty: "Medium",
        category: "Two Pointers",
        starter_code: "def threeSum(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-61",
        title: "Binary Tree Level Order Traversal",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def levelOrder(root):\n    # Write your code here\n    pass"
    },
    {
        id: "code-62",
        title: "Validate Binary Search Tree",
        description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def isValidBST(root):\n    # Write your code here\n    pass"
    },
    {
        id: "code-63",
        title: "Kth Smallest Element in a BST",
        description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def kthSmallest(root, k):\n    # Write your code here\n    pass"
    },
    {
        id: "code-64",
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        description: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def buildTree(preorder, inorder):\n    # Write your code here\n    pass"
    },
    {
        id: "code-65",
        title: "Number of Islands",
        description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def numIslands(grid):\n    # Write your code here\n    pass"
    },
    {
        id: "code-66",
        title: "Clone Graph",
        description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def cloneGraph(node):\n    # Write your code here\n    pass"
    },
    {
        id: "code-67",
        title: "Course Schedule",
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites. Return true if you can finish all courses, otherwise return false.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def canFinish(numCourses, prerequisites):\n    # Write your code here\n    pass"
    },
    {
        id: "code-68",
        title: "Pacific Atlantic Water Flow",
        description: "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def pacificAtlantic(heights):\n    # Write your code here\n    pass"
    },
    {
        id: "code-69",
        title: "Coin Change",
        description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def coinChange(coins, amount):\n    # Write your code here\n    pass"
    },
    {
        id: "code-70",
        title: "Longest Increasing Subsequence",
        description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def lengthOfLIS(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-71",
        title: "Word Break",
        description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def wordBreak(s, wordDict):\n    # Write your code here\n    pass"
    },
    {
        id: "code-72",
        title: "Combination Sum",
        description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def combinationSum(candidates, target):\n    # Write your code here\n    pass"
    },
    {
        id: "code-73",
        title: "Subsets",
        description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def subsets(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-74",
        title: "Permutations",
        description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def permute(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-75",
        title: "Find Minimum in Rotated Sorted Array",
        description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.",
        difficulty: "Medium",
        category: "Binary Search",
        starter_code: "def findMin(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-76",
        title: "Search in Rotated Sorted Array",
        description: "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        difficulty: "Medium",
        category: "Binary Search",
        starter_code: "def search(nums, target):\n    # Write your code here\n    pass"
    },
    {
        id: "code-77",
        title: "Merge K Sorted Lists",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        difficulty: "Hard",
        category: "Heap",
        starter_code: "def mergeKLists(lists):\n    # Write your code here\n    pass"
    },
    {
        id: "code-78",
        title: "Reverse Nodes in k-Group",
        description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.",
        difficulty: "Hard",
        category: "Linked List",
        starter_code: "def reverseKGroup(head, k):\n    # Write your code here\n    pass"
    },
    {
        id: "code-79",
        title: "Trapping Rain Water",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        difficulty: "Hard",
        category: "Two Pointers",
        starter_code: "def trap(height):\n    # Write your code here\n    pass"
    },
    {
        id: "code-80",
        title: "Sliding Window Maximum",
        description: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. Return the max sliding window.",
        difficulty: "Hard",
        category: "Sliding Window",
        starter_code: "def maxSlidingWindow(nums, k):\n    # Write your code here\n    pass"
    },
    {
        id: "code-81",
        title: "Minimum Window Substring",
        description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
        difficulty: "Hard",
        category: "Sliding Window",
        starter_code: "def minWindow(s, t):\n    # Write your code here\n    pass"
    },
    {
        id: "code-82",
        title: "Serialize and Deserialize Binary Tree",
        description: "Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or transmitted.",
        difficulty: "Hard",
        category: "Trees",
        starter_code: "def serialize(root):\n    # Write your code here\n    pass\n\ndef deserialize(data):\n    # Write your code here\n    pass"
    },
    {
        id: "code-83",
        title: "Binary Tree Maximum Path Sum",
        description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. The path sum is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
        difficulty: "Hard",
        category: "Trees",
        starter_code: "def maxPathSum(root):\n    # Write your code here\n    pass"
    },
    {
        id: "code-84",
        title: "Word Search II",
        description: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells.",
        difficulty: "Hard",
        category: "Backtracking",
        starter_code: "def findWords(board, words):\n    # Write your code here\n    pass"
    },
    {
        id: "code-85",
        title: "Alien Dictionary",
        description: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings words from the alien language's dictionary. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules.",
        difficulty: "Hard",
        category: "Graph",
        starter_code: "def alienOrder(words):\n    # Write your code here\n    pass"
    },
    {
        id: "code-86",
        title: "Edit Distance",
        description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have three operations: Insert, Delete, Replace a character.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def minDistance(word1, word2):\n    # Write your code here\n    pass"
    },
    {
        id: "code-87",
        title: "Burst Balloons",
        description: "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. Return the maximum coins you can collect by bursting the balloons wisely.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def maxCoins(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-88",
        title: "Largest Rectangle in Histogram",
        description: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
        difficulty: "Hard",
        category: "Stacks",
        starter_code: "def largestRectangleArea(heights):\n    # Write your code here\n    pass"
    },
    {
        id: "code-89",
        title: "Maximum Frequency Stack",
        description: "Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack. Implement the FreqStack class with push and pop methods.",
        difficulty: "Hard",
        category: "Heap",
        starter_code: "class FreqStack:\n    def __init__(self):\n        # Write your code here\n        pass\n\n    def push(self, val):\n        # Write your code here\n        pass\n\n    def pop(self):\n        # Write your code here\n        pass"
    },
    {
        id: "code-90",
        title: "Find Median from Data Stream",
        description: "The MedianFinder class finds the median from a data stream. Implement addNum to add a number and findMedian to return the median of current data stream.",
        difficulty: "Hard",
        category: "Heap",
        starter_code: "class MedianFinder:\n    def __init__(self):\n        # Write your code here\n        pass\n\n    def addNum(self, num):\n        # Write your code here\n        pass\n\n    def findMedian(self):\n        # Write your code here\n        pass"
    },
    {
        id: "code-91",
        title: "Rotate Array",
        description: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def rotate(nums, k):\n    # Write your code here\n    pass"
    },
    {
        id: "code-92",
        title: "Jump Game",
        description: "You are given an integer array nums. You are initially positioned at the first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def canJump(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-93",
        title: "Gas Station",
        description: "There are n gas stations along a circular route. You are given two integer arrays gas and cost. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def canCompleteCircuit(gas, cost):\n    # Write your code here\n    pass"
    },
    {
        id: "code-94",
        title: "Partition Equal Subset Sum",
        description: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def canPartition(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-95",
        title: "Unique Paths",
        description: "There is a robot on an m x n grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time. Return the number of possible unique paths.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def uniquePaths(m, n):\n    # Write your code here\n    pass"
    },
    {
        id: "code-96",
        title: "Decode Ways",
        description: "A message containing letters from A-Z can be encoded into numbers using a mapping. Given a string s containing only digits, return the number of ways to decode it.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def numDecodings(s):\n    # Write your code here\n    pass"
    },
    {
        id: "code-97",
        title: "Sort Colors",
        description: "Given an array nums with n objects colored red, white, or blue, represented by 0, 1, and 2 respectively, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.",
        difficulty: "Medium",
        category: "Sorting",
        starter_code: "def sortColors(nums):\n    # Write your code here\n    pass"
    },
    {
        id: "code-98",
        title: "Meeting Rooms II",
        description: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
        difficulty: "Medium",
        category: "Heap",
        starter_code: "def minMeetingRooms(intervals):\n    # Write your code here\n    pass"
    },
    {
        id: "code-99",
        title: "Spiral Matrix",
        description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def spiralOrder(matrix):\n    # Write your code here\n    pass"
    },
    {
        id: "code-100",
        title: "LRU Cache",
        description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put methods. Both operations should run in O(1) average time complexity.",
        difficulty: "Hard",
        category: "Hash Table",
        starter_code: "class LRUCache:\n    def __init__(self, capacity):\n        # Write your code here\n        pass\n\n    def get(self, key):\n        # Write your code here\n        pass\n\n    def put(self, key, value):\n        # Write your code here\n        pass"
    },
    {
        id: "code-gen-8367b4aa",
        title: "Spiral Matrix Traversal with Constraints",
        description: "Given a matrix of integers, traverse it in a spiral order and return the elements in a list. However, you must skip all even numbers and only include odd numbers in the result.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def spiral_traversal(matrix):\n    pass",
        constraints: ["Matrix can be rectangular or square", "Matrix can have negative numbers"]
    },
    {
        id: "code-gen-969995db",
        title: "Binary Tree to Doubly Linked List",
        description: "Convert a binary search tree to a sorted doubly linked list in place. The left and right pointers in the tree should become the previous and next pointers in the linked list.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef convert_to_dll(root):\n    pass",
        constraints: ["The tree may have duplicate values", "The tree can be empty"]
    },
    {
        id: "code-gen-ece11eb6",
        title: "Find the Longest Substring with K Unique Characters",
        description: "Given a string, find the length of the longest substring that contains exactly K unique characters.",
        difficulty: "Hard",
        category: "Strings",
        starter_code: "def longest_substring_with_k_unique(s, k):\n    pass",
        constraints: ["String can contain only lowercase letters", "K can be zero"]
    },
    {
        id: "code-gen-92990d5e",
        title: "Minimum Number of Refueling Stops",
        description: "There are N gas stations along a highway. You start with an empty tank at one end and need to reach the other end. You are given the distances between stations and the amount of gas you can get at each station. Find the minimum number of refueling stops needed.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def min_refuel_stops(dist, capacity, gas_stations):\n    pass",
        constraints: ["Distances are given in miles", "Gas stations can be at any distance"]
    },
    {
        id: "code-gen-99611b47",
        title: "Find the Celebrity",
        description: "In a party of N people, one may be a celebrity. A celebrity is a person who does not know anyone but everyone knows them. Find the celebrity or return -1 if there is no celebrity.",
        difficulty: "Medium",
        category: "Graphs",
        starter_code: "def find_celebrity(n, knows):\n    pass",
        constraints: ["knows[i][j] = 1 if person i knows person j, else 0", "There can be at most one celebrity"]
    },
    {
        id: "code-gen-c1ed241c",
        title: "Maximum Product Subarray",
        description: "Given an integer array, find the contiguous subarray within the array (containing at least one number) which has the largest product.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def max_product_subarray(nums):\n    pass",
        constraints: ["Array can contain negative numbers", "Array can have zeros"]
    },
    {
        id: "code-gen-7f64d3a7",
        title: "Word Ladder II",
        description: "Given two words (start and end) and a dictionary, find all shortest transformation sequences from start to end, such that only one letter can be changed at a time and each intermediate word must be in the dictionary.",
        difficulty: "Hard",
        category: "Graphs",
        starter_code: "def find_ladders(begin_word, end_word, word_list):\n    pass",
        constraints: ["Words can be of any length", "Dictionary can be empty"]
    },
    {
        id: "code-gen-3fa22e9b",
        title: "Find the Duplicate Number",
        description: "Given an array of integers where each number appears once except for one number that appears twice, find the duplicate number without modifying the array and using O(1) additional space.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def find_duplicate(nums):\n    pass",
        constraints: ["Array can contain negative numbers", "Array can have zeros"]
    },
    {
        id: "code-gen-a2cbeb17",
        title: "Longest Increasing Path in a Matrix",
        description: "Given an integer matrix, find the length of the longest increasing path. From each cell, you can move to adjacent cells (up, down, left, right) with a strictly smaller value.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def longest_increasing_path(matrix):\n    pass",
        constraints: ["Matrix can be rectangular or square", "Matrix can have negative numbers"]
    },
    {
        id: "code-gen-a80b227d",
        title: "Merge Intervals",
        description: "Given a collection of intervals, merge all overlapping intervals.",
        difficulty: "Medium",
        category: "Arrays",
        starter_code: "def merge_intervals(intervals):\n    pass",
        constraints: ["Intervals can be empty", "Intervals can be overlapping"]
    },
    export const codingProblemsExtension: CodingProblem[] = [
    {
        id: "code-101",
        title: "Min Stack",
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        difficulty: "Medium",
        category: "Stacks",
        starter_code: "class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val: int) -> None:\n        pass\n    def pop(self) -> None:\n        pass\n    def top(self) -> int:\n        pass\n    def getMin(self) -> int:\n        pass"
    },
    {
        id: "code-102",
        title: "Linked List Cycle II",
        description: "Given a linked list, return the node where the cycle begins. If there is no cycle, return null.",
        difficulty: "Medium",
        category: "Linked List",
        starter_code: "def detectCycle(head):\n    pass"
    },
    {
        id: "code-103",
        title: "Reorder List",
        description: "Given a singly linked list L: L0→L1→…→Ln-1→Ln, reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…",
        difficulty: "Medium",
        category: "Linked List",
        starter_code: "def reorderList(head):\n    pass"
    },
    {
        id: "code-104",
        title: "Binary Tree Right Side View",
        description: "Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def rightSideView(root):\n    pass"
    },
    {
        id: "code-105",
        title: "House Robber",
        description: "Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def rob(nums):\n    pass"
    },
    {
        id: "code-106",
        title: "Symmetric Tree",
        description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def isSymmetric(root):\n    pass"
    },
    {
        id: "code-107",
        title: "Balanced Binary Tree",
        description: "Given a binary tree, determine if it is height-balanced.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def isBalanced(root):\n    pass"
    },
    {
        id: "code-108",
        title: "Convert Sorted List to Binary Search Tree",
        description: "Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height-balanced binary search tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def sortedListToBST(head):\n    pass"
    },
    {
        id: "code-109",
        title: "Minimum Depth of Binary Tree",
        description: "Given a binary tree, find its minimum depth.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def minDepth(root):\n    pass"
    },
    {
        id: "code-110",
        title: "Path Sum",
        description: "Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def hasPathSum(root, targetSum):\n    pass"
    },
    {
        id: "code-111",
        title: "Path Sum II",
        description: "Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where each path's sum equals targetSum.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def pathSum(root, targetSum):\n    pass"
    },
    {
        id: "code-112",
        title: "Binary Tree Paths",
        description: "Given the root of a binary tree, return all root-to-leaf paths in any order.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def binaryTreePaths(root):\n    pass"
    },
    {
        id: "code-113",
        title: "Sum Root to Leaf Numbers",
        description: "You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path represents a number. Return the total sum of all root-to-leaf numbers.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def sumNumbers(root):\n    pass"
    },
    {
        id: "code-114",
        title: "Binary Tree Level Order Traversal II",
        description: "Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def levelOrderBottom(root):\n    pass"
    },
    {
        id: "code-115",
        title: "Average of Levels in Binary Tree",
        description: "Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def averageOfLevels(root):\n    pass"
    },
    {
        id: "code-116",
        title: "Find Largest Value in Each Tree Row",
        description: "Given the root of a binary tree, return an array of the largest value in each row of the tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def largestValues(root):\n    pass"
    },
    {
        id: "code-117",
        title: "Binary Tree Tilt",
        description: "Given the root of a binary tree, return the sum of every tree node's tilt.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def findTilt(root):\n    pass"
    },
    {
        id: "code-118",
        title: "Diameter of Binary Tree",
        description: "Given the root of a binary tree, return the length of the diameter of the tree.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def diameterOfBinaryTree(root):\n    pass"
    },
    {
        id: "code-119",
        title: "Subtree of Another Tree",
        description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def isSubtree(root, subRoot):\n    pass"
    },
    {
        id: "code-120",
        title: "Merge Two Binary Trees",
        description: "You are given two binary trees root1 and root2. Merge them into a new binary tree.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def mergeTrees(root1, root2):\n    pass"
    },
    {
        id: "code-121",
        title: "Invert Binary Tree (Duplicate)",
        description: "Given the root of a binary tree, invert the tree, and return its root.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def invertTree(root):\n    pass"
    },
    {
        id: "code-122",
        title: "Construct String from Binary Tree",
        description: "Given the root of a binary tree, construct a string consisting of parenthesis and integers from a binary tree with the preorder traversal way.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def tree2str(root):\n    pass"
    },
    {
        id: "code-123",
        title: "Maximum Depth of N-ary Tree",
        description: "Given a n-ary tree, find its maximum depth.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def maxDepth(root):\n    pass"
    },
    {
        id: "code-124",
        title: "N-ary Tree Preorder Traversal",
        description: "Given the root of an n-ary tree, return the preorder traversal of its nodes' values.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def preorder(root):\n    pass"
    },
    {
        id: "code-125",
        title: "N-ary Tree Postorder Traversal",
        description: "Given the root of an n-ary tree, return the postorder traversal of its nodes' values.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def postorder(root):\n    pass"
    },
    {
        id: "code-126",
        title: "N-ary Tree Level Order Traversal",
        description: "Given an n-ary tree, return the level order traversal of its nodes' values.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def levelOrder(root):\n    pass"
    },
    {
        id: "code-127",
        title: "Populating Next Right Pointers in Each Node",
        description: "Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def connect(root):\n    pass"
    },
    {
        id: "code-128",
        title: "Populating Next Right Pointers in Each Node II",
        description: "Populate each next pointer to point to its next right node. This is for a generic binary tree, not necessarily perfect.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def connect(root):\n    pass"
    },
    {
        id: "code-129",
        title: "Lowest Common Ancestor of a Binary Tree (Duplicate)",
        description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def lowestCommonAncestor(root, p, q):\n    pass"
    },
    {
        id: "code-130",
        title: "Lowest Common Ancestor of a Binary Search Tree (Duplicate)",
        description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def lowestCommonAncestor(root, p, q):\n    pass"
    },
    {
        id: "code-131",
        title: "Delete Node in a BST",
        description: "Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference of the BST.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def deleteNode(root, key):\n    pass"
    },
    {
        id: "code-132",
        title: "Kth Smallest Element in a BST (Duplicate)",
        description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def kthSmallest(root, k):\n    pass"
    },
    {
        id: "code-133",
        title: "Validate Binary Search Tree (Duplicate)",
        description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def isValidBST(root):\n    pass"
    },
    {
        id: "code-134",
        title: "Binary Search Tree Iterator",
        description: "Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST).",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "class BSTIterator:\n    def __init__(self, root):\n        pass\n    def next(self):\n        pass\n    def hasNext(self):\n        pass"
    },
    {
        id: "code-135",
        title: "Closest Binary Search Tree Value",
        description: "Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def closestValue(root, target):\n    pass"
    },
    {
        id: "code-136",
        title: "Binary Tree Pruning",
        description: "Given the root of a binary tree, return the same tree where every subtree not containing a 1 has been removed.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def pruneTree(root):\n    pass"
    },
    {
        id: "code-137",
        title: "Search in a Binary Search Tree",
        description: "You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST that the node's value equals val and return the subtree rooted with that node.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def searchBST(root, val):\n    pass"
    },
    {
        id: "code-138",
        title: "Insert into a Binary Search Tree",
        description: "You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def insertIntoBST(root, val):\n    pass"
    },
    {
        id: "code-139",
        title: "Convert Sorted Array to Binary Search Tree (Duplicate)",
        description: "Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def sortedArrayToBST(nums):\n    pass"
    },
    {
        id: "code-140",
        title: "Count Complete Tree Nodes",
        description: "Given the root of a complete binary tree, return the number of the nodes in the tree.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def countNodes(root):\n    pass"
    },
    {
        id: "code-141",
        title: "Binary Tree Right Side View (Duplicate)",
        description: "Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def rightSideView(root):\n    pass"
    },
    {
        id: "code-142",
        title: "Second Minimum Node In a Binary Tree",
        description: "Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly two or zero sub-nodes. Return the minimum value among all nodes that are greater than the root node's value.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def findSecondMinimumValue(root):\n    pass"
    },
    {
        id: "code-143",
        title: "Maximum Binary Tree",
        description: "You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums. Build and return the maximum binary tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def constructMaximumBinaryTree(nums):\n    pass"
    },
    {
        id: "code-144",
        title: "Maximum Binary Tree II",
        description: "A maximum tree is built on an array. Given a root of a maximum tree and a value, insert the value into the tree and return the new root.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def insertIntoMaxTree(root, val):\n    pass"
    },
    {
        id: "code-145",
        title: "Trim a Binary Search Tree",
        description: "Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high].",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def trimBST(root, low, high):\n    pass"
    },
    {
        id: "code-146",
        title: "Minimum Absolute Difference in BST",
        description: "Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def getMinimumDifference(root):\n    pass"
    },
    {
        id: "code-147",
        title: "Find Mode in Binary Search Tree",
        description: "Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def findMode(root):\n    pass"
    },
    {
        id: "code-148",
        title: "Maximum Depth of Binary Tree (Duplicate)",
        description: "Given the root of a binary tree, return its maximum depth.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def maxDepth(root):\n    pass"
    },
    {
        id: "code-149",
        title: "Binary Tree Inorder Traversal (Duplicate)",
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def inorderTraversal(root):\n    pass"
    },
    {
        id: "code-150",
        title: "Binary Tree Preorder Traversal",
        description: "Given the root of a binary tree, return the preorder traversal of its nodes' values.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def preorderTraversal(root):\n    pass"
    },
    {
        id: "code-151",
        title: "Binary Tree Postorder Traversal",
        description: "Given the root of a binary tree, return the postorder traversal of its nodes' values.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def postorderTraversal(root):\n    pass"
    },
    {
        id: "code-152",
        title: "Serialize and Deserialize Binary Tree (Duplicate)",
        description: "Design an algorithm to serialize and deserialize a binary tree.",
        difficulty: "Hard",
        category: "Trees",
        starter_code: "def serialize(root):\n    pass\n\ndef deserialize(data):\n    pass"
    },
    {
        id: "code-153",
        title: "Binary Tree Level Order Traversal (Duplicate)",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def levelOrder(root):\n    pass"
    },
    {
        id: "code-154",
        title: "Binary Tree Zigzag Level Order Traversal",
        description: "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def zigzagLevelOrder(root):\n    pass"
    },
    {
        id: "code-155",
        title: "Construct Binary Tree from Preorder and Inorder Traversal (Duplicate)",
        description: "Given two integer arrays preorder and inorder, construct and return the binary tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def buildTree(preorder, inorder):\n    pass"
    },
    {
        id: "code-156",
        title: "Construct Binary Tree from Inorder and Postorder Traversal",
        description: "Given two integer arrays inorder and postorder where inorder is the inorder traversal and postorder is the postorder traversal of a binary tree, construct and return the binary tree.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def buildTree(inorder, postorder):\n    pass"
    },
    {
        id: "code-157",
        title: "Recover Binary Search Tree",
        description: "You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.",
        difficulty: "Medium",
        category: "Trees",
        starter_code: "def recoverTree(root):\n    pass"
    },
    {
        id: "code-158",
        title: "Same Tree",
        description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def isSameTree(p, q):\n    pass"
    },
    {
        id: "code-159",
        title: "Symmetric Tree (Duplicate)",
        description: "Given the root of a binary tree, check whether it is a mirror of itself.",
        difficulty: "Easy",
        category: "Trees",
        starter_code: "def isSymmetric(root):\n    pass"
    },
    {
        id: "code-160",
        title: "Unique Paths (Duplicate)",
        description: "There is a robot on an m x n grid. Return the number of possible unique paths.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def uniquePaths(m, n):\n    pass"
    },
    {
        id: "code-161",
        title: "Unique Paths II",
        description: "A robot is located at the top-left corner of a m x n grid with obstacles. Try to reach the bottom-right corner. How many unique paths?",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def uniquePathsWithObstacles(obstacleGrid):\n    pass"
    },
    {
        id: "code-162",
        title: "Minimum Path Sum",
        description: "Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def minPathSum(grid):\n    pass"
    },
    {
        id: "code-163",
        title: "Climbing Stairs (Duplicate)",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "def climbStairs(n):\n    pass"
    },
    {
        id: "code-164",
        title: "Min Cost Climbing Stairs",
        description: "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps. Return the minimum cost to reach the top.",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "def minCostClimbingStairs(cost):\n    pass"
    },
    {
        id: "code-165",
        title: "Decode Ways (Duplicate)",
        description: "A message containing letters from A-Z can be encoded into numbers. Given a string s containing only digits, return the number of ways to decode it.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def numDecodings(s):\n    pass"
    },
    {
        id: "code-166",
        title: "Coin Change (Duplicate)",
        description: "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def coinChange(coins, amount):\n    pass"
    },
    {
        id: "code-167",
        title: "Coin Change 2",
        description: "You are given an integer array coins representing coins of different denominations and an integer amount. Return the number of combinations that make up that amount.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def change(amount, coins):\n    pass"
    },
    {
        id: "code-168",
        title: "Partition Equal Subset Sum (Duplicate)",
        description: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def canPartition(nums):\n    pass"
    },
    {
        id: "code-169",
        title: "Target Sum",
        description: "You are given an integer array nums and an integer target. You want to build an expression out of nums by adding '+' or '-' before each integer and then concatenate them. Return the number of different expressions that you can build, which evaluates to target.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def findTargetSumWays(nums, target):\n    pass"
    },
    {
        id: "code-170",
        title: "Longest Increasing Subsequence (Duplicate)",
        description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def lengthOfLIS(nums):\n    pass"
    },
    {
        id: "code-171",
        title: "Number of Longest Increasing Subsequence",
        description: "Given an integer array nums, return the number of longest increasing subsequences.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def findNumberOfLIS(nums):\n    pass"
    },
    {
        id: "code-172",
        title: "Maximum Subarray (Duplicate)",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def maxSubArray(nums):\n    pass"
    },
    {
        id: "code-173",
        title: "Maximum Product Subarray (Duplicate)",
        description: "Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def maxProduct(nums):\n    pass"
    },
    {
        id: "code-174",
        title: "Best Time to Buy and Sell Stock (Duplicate)",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize profit by choosing a single day to buy and a different day in the future to sell.",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "def maxProfit(prices):\n    pass"
    },
    {
        id: "code-175",
        title: "Best Time to Buy and Sell Stock II",
        description: "You are given an array prices for which the ith element is the price of a given stock on day i. Design an algorithm to find the maximum profit.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def maxProfit(prices):\n    pass"
    },
    {
        id: "code-176",
        title: "Best Time to Buy and Sell Stock with Cooldown",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you may achieve with unlimited transactions subject to a cooldown after a sell.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def maxProfit(prices):\n    pass"
    },
    {
        id: "code-177",
        title: "Best Time to Buy and Sell Stock with Transaction Fee",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee. Return the maximum profit.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def maxProfit(prices, fee):\n    pass"
    },
    {
        id: "code-178",
        title: "Word Break (Duplicate)",
        description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def wordBreak(s, wordDict):\n    pass"
    },
    {
        id: "code-179",
        title: "Word Break II",
        description: "Given a string s and a dictionary of strings wordDict, return all possible sentences formed by segmenting s.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def wordBreak(s, wordDict):\n    pass"
    },
    {
        id: "code-180",
        title: "House Robber II",
        description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def rob(nums):\n    pass"
    },
    {
        id: "code-181",
        title: "House Robber III",
        description: "The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the root.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def rob(root):\n    pass"
    },
    {
        id: "code-182",
        title: "Perfect Squares",
        description: "Given an integer n, return the least number of perfect square numbers that sum to n.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def numSquares(n):\n    pass"
    },
    {
        id: "code-183",
        title: "Integer Break",
        description: "Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def integerBreak(n):\n    pass"
    },
    {
        id: "code-184",
        title: "Counting Bits",
        description: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "def countBits(n):\n    pass"
    },
    {
        id: "code-185",
        title: "Triangle",
        description: "Given a triangle array, return the minimum path sum from top to bottom.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def minimumTotal(triangle):\n    pass"
    },
    {
        id: "code-186",
        title: "Range Sum Query - Immutable",
        description: "Given an integer array nums, handle multiple queries of the following type: Calculate the sum of the elements of nums between indices left and right inclusive.",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "class NumArray:\n    def __init__(self, nums):\n        pass\n    def sumRange(self, left, right):\n        pass"
    },
    {
        id: "code-187",
        title: "Range Sum Query 2D - Immutable",
        description: "Given a 2D matrix matrix, handle multiple queries of the following type: Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner and lower right corner.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "class NumMatrix:\n    def __init__(self, matrix):\n        pass\n    def sumRegion(self, row1, col1, row2, col2):\n        pass"
    },
    {
        id: "code-188",
        title: "Maximum Length of Repeated Subarray",
        description: "Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def findLength(nums1, nums2):\n    pass"
    },
    {
        id: "code-189",
        title: "Edit Distance (Duplicate)",
        description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def minDistance(word1, word2):\n    pass"
    },
    {
        id: "code-190",
        title: "Distinct Subsequences",
        description: "Given two strings s and t, return the number of distinct subsequences of s which equals t.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def numDistinct(s, t):\n    pass"
    },
    {
        id: "code-191",
        title: "Interleaving String",
        description: "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starter_code: "def isInterleave(s1, s2, s3):\n    pass"
    },
    {
        id: "code-192",
        title: "Burst Balloons (Duplicate)",
        description: "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. Burst balloons to maximize coins.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starter_code: "def maxCoins(nums):\n    pass"
    },
    {
        id: "code-193",
        title: "Fibonacci Number (Duplicate)",
        description: "The Fibonacci numbers, commonly denoted F(n) form a sequence. Return F(n).",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "def fib(n):\n    pass"
    },
    {
        id: "code-194",
        title: "N-th Tribonacci Number",
        description: "The Tribonacci sequence Tn is defined as follows: T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0. Given n, return Tn.",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starter_code: "def tribonacci(n):\n    pass"
    },
    {
        id: "code-195",
        title: "Partition to K Equal Sum Subsets",
        description: "Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def canPartitionKSubsets(nums, k):\n    pass"
    },
    {
        id: "code-196",
        title: "Combination Sum (Duplicate)",
        description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def combinationSum(candidates, target):\n    pass"
    },
    {
        id: "code-197",
        title: "Combination Sum II",
        description: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def combinationSum2(candidates, target):\n    pass"
    },
    {
        id: "code-198",
        title: "Combination Sum III",
        description: "Find all valid combinations of k numbers that sum up to n such that only numbers 1 through 9 are used.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def combinationSum3(k, n):\n    pass"
    },
    {
        id: "code-199",
        title: "Subsets (Duplicate)",
        description: "Given an integer array nums of unique elements, return all possible subsets (the power set).",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def subsets(nums):\n    pass"
    },
    {
        id: "code-200",
        title: "Subsets II",
        description: "Given an integer array nums that may contain duplicates, return all possible subsets (the power set).",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def subsetsWithDup(nums):\n    pass"
    },
    {
        id: "code-201",
        title: "Permutations (Duplicate)",
        description: "Given an array nums of distinct integers, return all the possible permutations.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def permute(nums):\n    pass"
    },
    {
        id: "code-202",
        title: "Permutations II",
        description: "Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def permuteUnique(nums):\n    pass"
    },
    {
        id: "code-203",
        title: "Combinations",
        description: "Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def combine(n, k):\n    pass"
    },
    {
        id: "code-204",
        title: "Letter Combinations of a Phone Number",
        description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def letterCombinations(digits):\n    pass"
    },
    {
        id: "code-205",
        title: "Generate Parentheses",
        description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def generateParenthesis(n):\n    pass"
    },
    {
        id: "code-206",
        title: "Palindrome Partitioning",
        description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def partition(s):\n    pass"
    },
    {
        id: "code-207",
        title: "Restore IP Addresses",
        description: "Given a string s containing only digits, return all possible valid IP addresses that can be obtained by inserting dots into s.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def restoreIpAddresses(s):\n    pass"
    },
    {
        id: "code-208",
        title: "Word Search (Duplicate)",
        description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def exist(board, word):\n    pass"
    },
    {
        id: "code-209",
        title: "Word Search II",
        description: "Given an m x n board of characters and a list of strings words, return all words on the board.",
        difficulty: "Hard",
        category: "Backtracking",
        starter_code: "def findWords(board, words):\n    pass"
    },
    {
        id: "code-210",
        title: "N-Queens",
        description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions.",
        difficulty: "Hard",
        category: "Backtracking",
        starter_code: "def solveNQueens(n):\n    pass"
    },
    {
        id: "code-211",
        title: "N-Queens II",
        description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard. Given an integer n, return the number of distinct solutions.",
        difficulty: "Hard",
        category: "Backtracking",
        starter_code: "def totalNQueens(n):\n    pass"
    },
    {
        id: "code-212",
        title: "Binary Watch",
        description: "A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59). Given an integer turnedOn which represents the number of LEDs that are currently on, return all possible times.",
        difficulty: "Easy",
        category: "Backtracking",
        starter_code: "def readBinaryWatch(turnedOn):\n    pass"
    },
    {
        id: "code-213",
        title: "Factor Combinations",
        description: "Numbers can be regarded as product of its factors. Write a function that takes an integer n and return all possible combinations of its factors.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def getFactors(n):\n    pass"
    },
    {
        id: "code-214",
        title: "Split Array into Fibonacci Sequence",
        description: "Given a string num of digits, return all possible valid IP addresses that can be obtained by inserting dots into s.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "def splitIntoFibonacci(num):\n    pass"
    },
    {
        id: "code-215",
        title: "Add and Search Word - Data structure design",
        description: "Design a data structure that supports adding new words and finding if a string matches any previously added string.",
        difficulty: "Medium",
        category: "Backtracking",
        starter_code: "class WordDictionary:\n    def __init__(self):\n        pass\n    def addWord(self, word):\n        pass\n    def search(self, word):\n        pass"
    },
    {
        id: "code-216",
        title: "Number of Islands (Duplicate)",
        description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def numIslands(grid):\n    pass"
    },
    {
        id: "code-217",
        title: "Surrounded Regions",
        description: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def solve(board):\n    pass"
    },
    {
        id: "code-218",
        title: "Walls and Gates",
        description: "You are given a m x n 2D grid initialized with these three possible values: -1 (A wall), 0 (A gate), INF (Infinity - An empty room). Fill each empty room with the distance to its nearest gate.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def wallsAndGates(rooms):\n    pass"
    },
    {
        id: "code-219",
        title: "Clone Graph (Duplicate)",
        description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def cloneGraph(node):\n    pass"
    },
    {
        id: "code-220",
        title: "Pacific Atlantic Water Flow (Duplicate)",
        description: "There is an m x n rectangular island that borders both the Pacific and Atlantic oceans. Return list of grid coordinates where water can flow to both oceans.",
        difficulty: "Medium",
        category: "DFS/BFS",
        starter_code: "def pacificAtlantic(heights):\n    pass"
    },
    {
        id: "code-221",
        title: "Course Schedule (Duplicate)",
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Return true if you can finish all courses.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def canFinish(numCourses, prerequisites):\n    pass"
    },
    {
        id: "code-222",
        title: "Course Schedule II",
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Return the ordering of courses you should take to finish all courses.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def findOrder(numCourses, prerequisites):\n    pass"
    },
    {
        id: "code-223",
        title: "Graph Valid Tree",
        description: "Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check whether these edges make up a valid tree.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def validTree(n, edges):\n    pass"
    },
    {
        id: "code-224",
        title: "Number of Connected Components in an Undirected Graph",
        description: "Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to find the number of connected components in an undirected graph.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def countComponents(n, edges):\n    pass"
    },
    {
        id: "code-225",
        title: "Redundant Connection",
        description: "In this problem, a tree is an undirected graph that is connected and has no cycles. Return an edge that can be removed so that the resulting graph is a tree of n nodes.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def findRedundantConnection(edges):\n    pass"
    },
    {
        id: "code-226",
        title: "Redundant Connection II",
        description: "In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node. Return an edge that can be removed so that the resulting graph is a rooted tree of n nodes.",
        difficulty: "Hard",
        category: "Graph",
        starter_code: "def findRedundantDirectedConnection(edges):\n    pass"
    },
    {
        id: "code-227",
        title: "Word Ladder",
        description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words such that: ... Return the number of words in the shortest transformation sequence.",
        difficulty: "Hard",
        category: "Graph",
        starter_code: "def ladderLength(beginWord, endWord, wordList):\n    pass"
    },
    {
        id: "code-228",
        title: "Word Ladder II",
        description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words... Return all the shortest transformation sequences.",
        difficulty: "Hard",
        category: "Graph",
        starter_code: "def findLadders(beginWord, endWord, wordList):\n    pass"
    },
    {
        id: "code-229",
        title: "Evaluate Division",
        description: "You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Return answers to queries.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def calcEquation(equations, values, queries):\n    pass"
    },
    {
        id: "code-230",
        title: "Alien Dictionary (Duplicate)",
        description: "There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules.",
        difficulty: "Hard",
        category: "Graph",
        starter_code: "def alienOrder(words):\n    pass"
    },
    {
        id: "code-231",
        title: "Sequence Reconstruction",
        description: "Check whether the original sequence org can be uniquely reconstructed from the sequences in seqs. The org sequence is a permutation of the integers from 1 to n, with 1 ≤ n ≤ 10^4.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def sequenceReconstruction(org, seqs):\n    pass"
    },
    {
        id: "code-232",
        title: "Minimum Height Trees",
        description: "A tree is an undirected graph in which any two vertices are connected by exactly one path. Find all the MHTs and return a list of their root labels.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def findMinHeightTrees(n, edges):\n    pass"
    },
    {
        id: "code-233",
        title: "Reconstruct Itinerary",
        description: "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.",
        difficulty: "Hard",
        category: "Graph",
        starter_code: "def findItinerary(tickets):\n    pass"
    },
    {
        id: "code-234",
        title: "Accounts Merge",
        description: "Given a list of accounts where each element accounts[i] is a list of strings, where the first element is a name, and the rest are emails. Merge the accounts.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def accountsMerge(accounts):\n    pass"
    },
    {
        id: "code-235",
        title: "Critical Connections in a Network",
        description: "There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network. Return all critical connections in the network.",
        difficulty: "Hard",
        category: "Graph",
        starter_code: "def criticalConnections(n, connections):\n    pass"
    },
    {
        id: "code-236",
        title: "Is Graph Bipartite?",
        description: "There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. Return true if and only if it is bipartite.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def isBipartite(graph):\n    pass"
    },
    {
        id: "code-237",
        title: "Possible Bipartition",
        description: "We want to split a group of n people (labeled from 1 to n) into two groups of any size. Each person may dislike some other people. Return true if it is possible to split everyone into two groups.",
        difficulty: "Medium",
        category: "Graph",
        starter_code: "def possibleBipartition(n, dislikes):\n    pass"
    },
];
