export interface LeaderboardEntry {
    rank: number
    full_name: string
    department: string
    year: number
    total_score: number
    badges: string[]
}

// These MUST match exactly the values in the profile-setup registration form
export const DEPARTMENTS = [
    'CSE',
    'ECE',
    'EEE',
    'IT',
    'Mechanical',
    'Civil',
]

export const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, full_name: "Aarav Sharma", department: "CSE", year: 4, total_score: 98.5, badges: ["Algorithm Master", "System Design Expert"] },
    { rank: 2, full_name: "Priya Patel", department: "IT", year: 3, total_score: 95.2, badges: ["Bug Hunter", "Clean Code Advocate"] },
    { rank: 3, full_name: "Vikram Singh", department: "ECE", year: 4, total_score: 92.8, badges: ["Hardware Pro", "Logic Guru"] },
    { rank: 4, full_name: "Ananya Iyer", department: "CSE", year: 2, total_score: 91.4, badges: ["Data Wizard", "ML Pioneer"] },
    { rank: 5, full_name: "Rohan Gupta", department: "CSE", year: 3, total_score: 89.1, badges: ["Fast Learner"] },
    { rank: 6, full_name: "Sneha Reddy", department: "IT", year: 4, total_score: 87.6, badges: ["Full Stack Dev"] },
    { rank: 7, full_name: "Arjun Nair", department: "CSE", year: 3, total_score: 86.3, badges: ["Analytics Pro"] },
    { rank: 8, full_name: "Kavya Menon", department: "CSE", year: 2, total_score: 85.9, badges: ["Competitive Coder"] },
    { rank: 9, full_name: "Rahul Verma", department: "EEE", year: 4, total_score: 84.7, badges: ["Circuit Wizard"] },
    { rank: 10, full_name: "Divya Krishnan", department: "ECE", year: 3, total_score: 83.5, badges: ["Signal Expert"] },
    { rank: 11, full_name: "Siddharth Joshi", department: "CSE", year: 4, total_score: 82.2, badges: ["Open Source Hero"] },
    { rank: 12, full_name: "Pooja Agarwal", department: "IT", year: 2, total_score: 81.8, badges: ["UI/UX Specialist"] },
    { rank: 13, full_name: "Karthik Subramanian", department: "CSE", year: 4, total_score: 80.4, badges: ["Deep Learning Expert"] },
    { rank: 14, full_name: "Meera Pillai", department: "Mechanical", year: 3, total_score: 79.1, badges: ["Design Thinker"] },
    { rank: 15, full_name: "Aditya Bhatt", department: "CSE", year: 3, total_score: 78.6, badges: ["Backend Architect"] },
    { rank: 16, full_name: "Riya Shah", department: "IT", year: 4, total_score: 77.3, badges: ["Cloud Native"] },
    { rank: 17, full_name: "Nikhil Desai", department: "EEE", year: 2, total_score: 76.9, badges: ["Embedded Systems"] },
    { rank: 18, full_name: "Tanvi Kulkarni", department: "CSE", year: 3, total_score: 75.5, badges: ["Data Storyteller"] },
    { rank: 19, full_name: "Varun Malhotra", department: "Civil", year: 4, total_score: 74.2, badges: ["Structural Analyst"] },
    { rank: 20, full_name: "Ishaan Bose", department: "CSE", year: 2, total_score: 73.8, badges: ["Security Researcher"] },
    { rank: 21, full_name: "Nandini Rao", department: "ECE", year: 4, total_score: 72.5, badges: ["VLSI Designer"] },
    { rank: 22, full_name: "Harsh Tiwari", department: "IT", year: 3, total_score: 71.1, badges: ["DevOps Champion"] },
    { rank: 23, full_name: "Shreya Banerjee", department: "CSE", year: 2, total_score: 70.4, badges: ["NLP Enthusiast"] },
    { rank: 24, full_name: "Manish Pandey", department: "Mechanical", year: 4, total_score: 69.7, badges: ["CAD Expert"] },
    { rank: 25, full_name: "Priyanka Choudhary", department: "CSE", year: 3, total_score: 68.9, badges: ["Mobile Developer"] },
    { rank: 26, full_name: "Akash Srivastava", department: "EEE", year: 4, total_score: 67.3, badges: ["Power Systems"] },
    { rank: 27, full_name: "Simran Kaur", department: "IT", year: 2, total_score: 66.8, badges: ["Agile Practitioner"] },
    { rank: 28, full_name: "Deepak Yadav", department: "Civil", year: 3, total_score: 65.4, badges: ["GIS Specialist"] },
    { rank: 29, full_name: "Anjali Mishra", department: "ECE", year: 4, total_score: 64.1, badges: ["BI Developer"] },
    { rank: 30, full_name: "Rajesh Kumar", department: "CSE", year: 4, total_score: 63.5, badges: ["Game Developer"] },
];
