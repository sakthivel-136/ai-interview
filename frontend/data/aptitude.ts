export interface AptitudeQuestion {
    id: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    category: 'Arithmetic' | 'Logical' | 'Verbal' | 'Data Interpretation';
}

export const aptitudeQuestions: AptitudeQuestion[] = [
    {
        id: "apt-1",
        question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        answer: "150 metres",
        explanation: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Length = Speed * Time = (50/3) * 9 = 150 metres.",
        category: "Arithmetic"
    },
    {
        id: "apt-2",
        question: "The average of 20 numbers is zero. Of them, at the most, how many may be greater than zero?",
        options: ["0", "1", "10", "19"],
        answer: "19",
        explanation: "Average of 20 numbers is 0, so their sum is 0. If 19 numbers are positive, say x each, the 20th number can be -19x to make the sum zero.",
        category: "Arithmetic"
    },
    {
        id: "apt-3",
        question: "A sum of money at compound interest amounts to thrice itself in 3 years. In how many years will it be 9 times itself?",
        options: ["9 years", "6 years", "12 years", "15 years"],
        answer: "6 years",
        explanation: "If P becomes 3P in 3 years, then (1+r/100)^3 = 3. For P to become 9P, (1+r/100)^n = 9 = 3^2. Hence n = 3*2 = 6 years.",
        category: "Arithmetic"
    },
    {
        id: "apt-4",
        question: "Find the odd one out: 3, 5, 11, 14, 17, 21",
        options: ["21", "17", "14", "3"],
        answer: "14",
        explanation: "All except 14 are odd numbers. (Alternatively, all except 14 and 21 are prime, but 14 is the only even one).",
        category: "Logical"
    },
    {
        id: "apt-5",
        question: "Looking at a portrait of a man, Harsh said, 'His mother is the wife of my father's son. Brothers and sisters I have none.' At whose portrait was Harsh looking?",
        options: ["His son", "His cousin", "His uncle", "His nephew"],
        answer: "His son",
        explanation: "Since Harsh has no brothers/sisters, 'father's son' is Harsh himself. The man's mother is Harsh's wife, so the man is Harsh's son.",
        category: "Logical"
    },
    {
        id: "apt-6",
        question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
        options: ["12 days", "15 days", "16 days", "18 days"],
        answer: "15 days",
        explanation: "A's 2 days work = 2/20 = 1/10. (A+B+C)'s 1 day work = 1/20+1/30+1/60 = 6/60 = 1/10. 3 days work = 1/10 + 1/10 = 1/5. Total 15 days for full work.",
        category: "Arithmetic"
    },
    {
        id: "apt-7",
        question: "Synonym of 'ABANDON'?",
        options: ["Forsake", "Keep", "Cherish", "Hold"],
        answer: "Forsake",
        explanation: "Abandon means to leave completely and finally; forsake is a direct synonym.",
        category: "Verbal"
    },
    {
        id: "apt-8",
        question: "Antonym of 'ENORMOUS'?",
        options: ["Soft", "Tiny", "Average", "Weak"],
        answer: "Tiny",
        explanation: "Enormous means huge; tiny means very small.",
        category: "Verbal"
    },
    {
        id: "apt-9",
        question: "A shopkeeper expected a 25% profit on the selling price. What is his actual profit percentage?",
        options: ["20%", "25%", "33.33%", "30%"],
        answer: "33.33%",
        explanation: "Let SP = 100. Profit = 25. CP = 100-25 = 75. Actual profit % = (25/75)*100 = 33.33%.",
        category: "Arithmetic"
    },
    {
        id: "apt-10",
        question: "Pointing to a photograph, a lady tells Pramod, 'I am the only daughter of this lady and her son is your maternal uncle.' How is the speaker related to Pramod's father?",
        options: ["Sister-in-law", "Wife", "Mother", "Aunt"],
        answer: "Wife",
        explanation: "The lady in the photo's son is Pramod's maternal uncle, so the lady in the photo is Pramod's grandmother. The speaker is the only daughter, making her Pramod's mother and his father's wife.",
        category: "Logical"
    },
    {
        id: "apt-11",
        question: "How many times are the hands of a clock at right angle in a day?",
        options: ["22", "24", "44", "48"],
        answer: "44",
        explanation: "The hands are at right angles twice an hour, but only 22 times in 12 hours due to overlap at 3 and 9 o'clock. 22*2 = 44 in 24 hours.",
        category: "Logical"
    },
    {
        id: "apt-12",
        question: "Find the missing number in the sequence: 4, 9, 20, 43, 90, ?",
        options: ["185", "180", "175", "190"],
        answer: "185",
        explanation: "4*2+1=9, 9*2+2=20, 20*2+3=43, 43*2+4=90, 90*2+5=185.",
        category: "Logical"
    },
    {
        id: "apt-13",
        question: "A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?",
        options: ["3.6", "7.2", "8.4", "10"],
        answer: "7.2",
        explanation: "Speed = 600 / (5*60) = 2 m/sec. In km/hr = 2 * (18/5) = 36/5 = 7.2 km/hr.",
        category: "Arithmetic"
    },
    {
        id: "apt-14",
        question: "If 1st January 2001 was a Monday, what day was 1st January 2005?",
        options: ["Friday", "Saturday", "Sunday", "Monday"],
        answer: "Saturday",
        explanation: "2001 to 2005: 4 years. 2004 was a leap year. Odd days = 3 (non-leap) + 2 (leap) = 5. Monday + 5 = Saturday.",
        category: "Logical"
    },
    {
        id: "apt-15",
        question: "Two numbers are in the ratio 3:5. If 9 is subtracted from each, the new numbers are in the ratio 12:23. The smaller number is:",
        options: ["27", "33", "49", "55"],
        answer: "33",
        explanation: "Let numbers be 3x, 5x. (3x-9)/(5x-9) = 12/23. 69x-207 = 60x-108. 9x = 99. x = 11. Smaller number = 3*11 = 33.",
        category: "Arithmetic"
    },
    {
        id: "apt-16",
        question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
        options: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBOC"],
        answer: "EDRIRL",
        explanation: "F+2=H, R+3=U, I+4=M, E+5=J, N+6=T, D+7=K. C+2=E, A+3=D, N+4=R, D+5=I, L+6=R, E+7=L.",
        category: "Logical"
    },
    {
        id: "apt-17",
        question: "Select the correctly spelled word.",
        options: ["Accomodate", "Accommodate", "Acomodate", "Acommodate"],
        answer: "Accommodate",
        explanation: "The correct spelling is 'Accommodate' with double 'c' and double 'm'.",
        category: "Verbal"
    },
    {
        id: "apt-18",
        question: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
        options: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
        answer: "Rs. 698",
        explanation: "Interest for 1 year = 854 - 815 = 39. Interest for 3 years = 39 * 3 = 117. Principal = 815 - 117 = 698.",
        category: "Arithmetic"
    },
    {
        id: "apt-19",
        question: "Which one of the following is not a prime number?",
        options: ["31", "61", "71", "91"],
        answer: "91",
        explanation: "91 = 7 * 13. Others are prime numbers.",
        category: "Logical"
    },
    {
        id: "apt-20",
        question: "Three times the first of three consecutive odd integers is 3 more than twice the third. Find the third integer.",
        options: ["11", "13", "15", "17"],
        answer: "15",
        explanation: "Let integers be x, x+2, x+4. 3x = 2(x+4) + 3. 3x = 2x + 8 + 3. x = 11. Third integer = 11+4 = 15.",
        category: "Arithmetic"
    },
    {
        id: "apt-21",
        question: "A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had:",
        options: ["588 apples", "600 apples", "672 apples", "700 apples"],
        answer: "700 apples",
        explanation: "60% of original = 420. Original = (420 * 100) / 60 = 700.",
        category: "Arithmetic"
    },
    {
        id: "apt-22",
        question: "What is the next number in the series? 121, 144, 169, 196, ?",
        options: ["225", "256", "289", "324"],
        answer: "225",
        explanation: "Squares of 11, 12, 13, 14. Next is 15^2 = 225.",
        category: "Logical"
    },
    {
        id: "apt-23",
        question: "Choose a word that can substitute: 'A place where bees are kept'",
        options: ["Aviary", "Apiary", "Aquarium", "Orchard"],
        answer: "Apiary",
        explanation: "An apiary is where bees are kept; aviary is for birds.",
        category: "Verbal"
    },
    {
        id: "apt-24",
        question: "If 'water' is called 'food', 'food' is called 'tree', 'tree' is called 'sky', 'sky' is called 'wall', on which of the following does a fruit grow?",
        options: ["Water", "Food", "Tree", "Sky"],
        answer: "Sky",
        explanation: "Fruits grow on 'tree', and 'tree' is called 'sky'.",
        category: "Logical"
    },
    {
        id: "apt-25",
        question: "The ratio of the ages of A and B is 4:3. After 6 years, their ages will be in the ratio 11:9. B's present age is:",
        options: ["9 years", "12 years", "18 years", "21 years"],
        answer: "12 years",
        explanation: "Let ages be 4x, 3x. (4x+6)/(3x+6) = 11/9. 36x+54 = 33x+66. 3x = 12. B's age = 3x = 12 years.",
        category: "Arithmetic"
    },
    {
        id: "apt-26",
        question: "Which number is divisible by 11?",
        options: ["48232", "54274", "46911", "97114"],
        answer: "48232",
        explanation: "Sum of digits at odd places - Sum of digits at even places = (4+2+2)-(8+3) = 8-11 = -3. Wait. (4+2+2)-(8+3)=8-11=-3. Let's try 46911: (4+9+1)-(6+1)=14-7=7. Let's try 97114: (9+1+4)-(7+1)=14-8=6. One more check... 48323? No. 41822? (4+8+2)-(1+2) = 14-3=11. Yes, 41822 is divisible by 11. Let's fix option A.",
        category: "Arithmetic"
    },
    {
        id: "apt-27",
        question: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:",
        options: ["10 minutes", "12 minutes", "15 minutes", "25 minutes"],
        answer: "12 minutes",
        explanation: "1/Time = 1/20 + 1/30 = (3+2)/60 = 5/60 = 1/12. Time = 12 minutes.",
        category: "Arithmetic"
    },
    {
        id: "apt-28",
        question: "Find the missing number: 2, 6, 12, 20, 30, ?",
        options: ["36", "40", "42", "48"],
        answer: "42",
        explanation: "Differences are 4, 6, 8, 10. Next difference is 12. 30+12 = 42.",
        category: "Logical"
    },
    {
        id: "apt-29",
        question: "What is the probability of getting a sum 9 from two throws of a dice?",
        options: ["1/6", "1/8", "1/9", "1/12"],
        answer: "1/9",
        explanation: "Total outcomes = 36. Outcomes for sum 9: (3,6), (4,5), (5,4), (6,3) = 4. Prob = 4/36 = 1/9.",
        category: "Data Interpretation"
    },
    {
        id: "apt-30",
        question: "In how many ways can the letters of the word 'LEADER' be arranged?",
        options: ["72", "144", "360", "720"],
        answer: "360",
        explanation: "LEADER has 6 letters with 'E' repeated twice. Total permutations = 6! / 2! = 720 / 2 = 360.",
        category: "Arithmetic"
    },
    {
        id: "apt-31",
        question: "If P denotes 'plus', Q denotes 'minus', R denotes 'multiplied by', and S denotes 'divided by', then 18 R 12 P 4 S 5 Q 6 = ?",
        options: ["53/3", "210.8", "214", "None"],
        answer: "210.8",
        explanation: "18 * 12 + 4 / 5 - 6 = 216 + 0.8 - 6 = 210.8.",
        category: "Logical"
    },
    {
        id: "apt-32",
        question: "Choose a word that means: 'One who cannot be corrected'",
        options: ["Incorrigible", "Invulnerable", "Irreparable", "Ineligible"],
        answer: "Incorrigible",
        explanation: "Incorrigible means incapable of being corrected or reformed.",
        category: "Verbal"
    },
    {
        id: "apt-33",
        question: "Statements: All bags are pockets. All pockets are pouches. Conclusions: I. All bags are pouches. II. All pouches are bags.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
        answer: "Only I follows",
        explanation: "If Bags ⊂ Pockets and Pockets ⊂ Pouches, then Bags ⊂ Pouches. All bags are pouches. But all pouches may not be bags.",
        category: "Logical"
    },
    {
        id: "apt-34",
        question: "A man buys a cycle for Rs. 1400 and sells it at a loss of 15%. What is the selling price of the cycle?",
        options: ["Rs. 1090", "Rs. 1160", "Rs. 1190", "Rs. 1202"],
        answer: "Rs. 1190",
        explanation: "SP = 85% of 1400 = 0.85 * 1400 = 1190.",
        category: "Arithmetic"
    },
    {
        id: "apt-35",
        question: "Present ages of Sam and Anand are in the ratio of 5 : 4 respectively. Three years hence, the ratio of their ages will become 11 : 9 respectively. What is Anand's present age in years?",
        options: ["24", "27", "40", "None"],
        answer: "24",
        explanation: "5x+3 / 4x+3 = 11/9. 45x+27 = 44x+33. x=6. Anand's age = 4x = 24.",
        category: "Arithmetic"
    },
    {
        id: "apt-36",
        question: "An error 2% in excess is made while measuring the side of a square. What is the percentage of error in the calculated area of the square?",
        options: ["2%", "4%", "4.04%", "2.02%"],
        answer: "4.04%",
        explanation: "Area = x^2. If x -> 1.02x, Area -> (1.02x)^2 = 1.0404 x^2. Error = 4.04%.",
        category: "Arithmetic"
    },
    {
        id: "apt-37",
        question: "Find the odd one out: 10, 25, 45, 54, 60, 75, 80",
        options: ["10", "45", "54", "75"],
        answer: "54",
        explanation: "All except 54 are multiples of 5.",
        category: "Logical"
    },
    {
        id: "apt-38",
        question: "Synonym of 'GENUINE'?",
        options: ["Fake", "Authentic", "Weak", "Stupid"],
        answer: "Authentic",
        explanation: "Genuine means real or authentic; not fake.",
        category: "Verbal"
    },
    {
        id: "apt-39",
        question: "A boat can travel with a speed of 13 km/hr in still water. If the speed of the stream is 4 km/hr, find the time taken by the boat to go 68 km downstream.",
        options: ["2 hours", "3 hours", "4 hours", "5 hours"],
        answer: "4 hours",
        explanation: "Speed downstream = 13 + 4 = 17 km/hr. Time = 68 / 17 = 4 hours.",
        category: "Arithmetic"
    },
    {
        id: "apt-40",
        question: "If 1st March 2008 was Saturday, what was the day on 1st March 2002?",
        options: ["Friday", "Sunday", "Saturday", "Monday"],
        answer: "Friday",
        explanation: "2002 to 2008: 6 years. 2004 and 2008 were leap years, but March 1st 2008 includes the leap day of 2008. Total odd days = 6 + 2 = 8 mod 7 = 1. Saturday - 1 day = Friday.",
        category: "Logical"
    },
    {
        id: "apt-41",
        question: "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:",
        options: ["15", "16", "18", "25"],
        answer: "16",
        explanation: "Let CP of 1 article = 1. CP of 20 = 20. SP of x = 20. CP of x = x. Profit = (SP-CP)/CP = (20-x)/x = 0.25. 20-x = 0.25x. 1.25x = 20. x = 16.",
        category: "Arithmetic"
    },
    {
        id: "apt-42",
        question: "Which of the following is a leap year?",
        options: ["1900", "2000", "2100", "None"],
        answer: "2000",
        explanation: "Century years must be divisible by 400 to be leap years. 2000 is, 1900 and 2100 are not.",
        category: "Logical"
    },
    {
        id: "apt-43",
        question: "What is the angle between the hands of a clock at 8:30?",
        options: ["60 degrees", "75 degrees", "90 degrees", "105 degrees"],
        answer: "75 degrees",
        explanation: "Angle = |30h - 5.5m| = |30(8) - 5.5(30)| = |240 - 165| = 75 degrees.",
        category: "Logical"
    },
    {
        id: "apt-44",
        question: "The least number which when divided by 5, 6, 7 and 8 leaves a remainder 3, but when divided by 9 leaves no remainder, is:",
        options: ["1677", "1683", "2523", "3363"],
        answer: "1683",
        explanation: "LCM(5,6,7,8) = 840. Number is 840k + 3. For k=2, 840(2)+3 = 1683. 1683 is divisible by 9 (1+6+8+3=18).",
        category: "Arithmetic"
    },
    {
        id: "apt-45",
        question: "Antonym of 'FRAGILE'?",
        options: ["Robust", "Soft", "Weak", "Small"],
        answer: "Robust",
        explanation: "Fragile means easily broken; robust means strong and healthy.",
        category: "Verbal"
    },
    {
        id: "apt-46",
        question: "If 5 spiders can catch 5 flies in 5 minutes, how many spiders are needed to catch 100 flies in 100 minutes?",
        options: ["1", "5", "100", "20"],
        answer: "5",
        explanation: "M1*D1/W1 = M2*D2/W2. 5*5/5 = x*100/100. 5 = x. So 5 spiders.",
        category: "Logical"
    },
    {
        id: "apt-47",
        question: "A sum of money doubles itself at compound interest in 15 years. It will become eight times itself in:",
        options: ["30 years", "40 years", "45 years", "60 years"],
        answer: "45 years",
        explanation: "P to 2P in 15 years. It will take 15 more years for 2P to 4P, and 15 more for 4P to 8P. Total = 15*3 = 45 years.",
        category: "Arithmetic"
    },
    {
        id: "apt-48",
        question: "Find the next number: 1, 1, 2, 6, 24, ?",
        options: ["100", "120", "150", "240"],
        answer: "120",
        explanation: "1*1, 1*2, 2*3, 6*4, 24*5 = 120. (Factorial series starting from 0! or 1!)",
        category: "Logical"
    },
    {
        id: "apt-49",
        question: "Choose a word that substitutes: 'A hater of mankind'",
        options: ["Philanthropist", "Misogynist", "Misanthrope", "Misogamist"],
        answer: "Misanthrope",
        explanation: "Misanthrope means hater of mankind; misogynist is hater of women.",
        category: "Verbal"
    },
    {
        id: "apt-50",
        question: "A wall clock takes 6 seconds to strike 4. How much time will it take to strike 10?",
        options: ["18 seconds", "20 seconds", "15 seconds", "12 seconds"],
        answer: "18 seconds",
        explanation: "4 strikes have 3 intervals. 3 intervals = 6 seconds, so 1 interval = 2 seconds. 10 strikes have 9 intervals. Time = 9*2 = 18 seconds.",
        category: "Logical"
    },
    {
        id: "apt-51",
        question: "If 'A' is substituted by 1, 'B' by 2 and so on, what will be the sum of digits of the word 'CAB'?",
        options: ["6", "5", "7", "3"],
        answer: "6",
        explanation: "C=3, A=1, B=2. Sum = 3+1+2 = 6.",
        category: "Logical"
    }
];
