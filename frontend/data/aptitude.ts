export interface AptitudeQuestion {
    id: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    category: 'Arithmetic' | 'Logical' | 'Verbal' | 'Data Interpretation';
}

export const aptitudeQuestions: AptitudeQuestion[] = [
    { id: "apt-1", question: "A train running at 60 km/hr crosses a pole in 9 seconds. Length of the train?", options: ["120 m", "180 m", "324 m", "150 m"], answer: "150 m", explanation: "Speed=50/3 m/s. Length=(50/3)*9=150 m.", category: "Arithmetic" },
    { id: "apt-2", question: "Average of 20 numbers is zero. At most how many may be greater than zero?", options: ["0", "1", "10", "19"], answer: "19", explanation: "Sum=0. If 19 are positive, 20th can be their negative sum.", category: "Arithmetic" },
    { id: "apt-3", question: "Money triples at compound interest in 3 years. In how many years will it be 9 times?", options: ["9", "6", "12", "15"], answer: "6", explanation: "3P in 3 yrs → 9P=3² in 6 yrs.", category: "Arithmetic" },
    { id: "apt-4", question: "Shopkeeper expects 25% profit on selling price. Actual profit %?", options: ["20%", "25%", "33.33%", "30%"], answer: "33.33%", explanation: "SP=100, Profit=25, CP=75. Profit%=25/75*100=33.33%.", category: "Arithmetic" },
    { id: "apt-5", question: "Simple interest amounts to Rs.815 in 3 years and Rs.854 in 4 years. The sum is:", options: ["Rs.650", "Rs.690", "Rs.698", "Rs.700"], answer: "Rs.698", explanation: "SI/yr=39. SI 3yrs=117. P=815-117=698.", category: "Arithmetic" },
    { id: "apt-6", question: "A person crosses a 600 m street in 5 minutes. Speed in km/hr?", options: ["3.6", "7.2", "8.4", "10"], answer: "7.2", explanation: "2 m/s = 7.2 km/hr.", category: "Arithmetic" },
    { id: "apt-7", question: "Numbers in ratio 3:5. If 9 subtracted from each, ratio becomes 12:23. Smaller number:", options: ["27", "33", "49", "55"], answer: "33", explanation: "(3x-9)/(5x-9)=12/23 → x=11. Smaller=33.", category: "Arithmetic" },
    { id: "apt-8", question: "Ages of A and B in ratio 4:3. After 6 years ratio is 11:9. B's present age:", options: ["9", "12", "18", "21"], answer: "12", explanation: "(4x+6)/(3x+6)=11/9 → x=4. B=12.", category: "Arithmetic" },
    { id: "apt-9", question: "Cycle bought for Rs.1400, sold at 15% loss. Selling price:", options: ["Rs.1090", "Rs.1160", "Rs.1190", "Rs.1202"], answer: "Rs.1190", explanation: "SP=85%*1400=1190.", category: "Arithmetic" },
    { id: "apt-10", question: "Pipes A and B fill a tank in 20 and 30 minutes. Together they fill in:", options: ["10 min", "12 min", "15 min", "25 min"], answer: "12 min", explanation: "1/20+1/30=1/12. Time=12 min.", category: "Arithmetic" },
    { id: "apt-11", question: "Boat speed 13 km/hr in still water, stream 4 km/hr. Time to go 68 km downstream:", options: ["2 hrs", "3 hrs", "4 hrs", "5 hrs"], answer: "4 hrs", explanation: "Downstream=17 km/hr. 68/17=4 hrs.", category: "Arithmetic" },
    { id: "apt-12", question: "CP of 20 articles = SP of x articles. Profit 25%. Value of x:", options: ["15", "16", "18", "25"], answer: "16", explanation: "(20-x)/x=0.25 → x=16.", category: "Arithmetic" },
    { id: "apt-13", question: "Money doubles at CI in 15 years. It becomes 8 times in:", options: ["30", "40", "45", "60"], answer: "45", explanation: "2P in 15 yrs → 8P in 45 yrs.", category: "Arithmetic" },
    { id: "apt-14", question: "Fruit seller sells 40% apples and still has 420. Originally he had:", options: ["588", "600", "672", "700"], answer: "700", explanation: "60%=420 → 100%=700.", category: "Arithmetic" },
    { id: "apt-15", question: "Letters of 'LEADER' can be arranged in how many ways?", options: ["72", "144", "360", "720"], answer: "360", explanation: "6!/2!=360.", category: "Arithmetic" },
    { id: "apt-16", question: "A, B, C do work in 20, 30, 60 days. A assisted by B and C every 3rd day. Days to complete:", options: ["12", "15", "16", "18"], answer: "15", explanation: "Every 3 days = 1/5 work. Total=15 days.", category: "Arithmetic" },
    { id: "apt-17", question: "2% excess error in measuring side of square. % error in area:", options: ["2%", "4%", "4.04%", "2.02%"], answer: "4.04%", explanation: "(1.02)²=1.0404. Error=4.04%.", category: "Arithmetic" },
    { id: "apt-18", question: "Ages of Sam and Anand in ratio 5:4. After 3 years ratio 11:9. Anand's age:", options: ["24", "27", "40", "None"], answer: "24", explanation: "x=6. Anand=4*6=24.", category: "Arithmetic" },
    { id: "apt-19", question: "Clock takes 6 seconds to strike 4. Time to strike 10:", options: ["18 s", "20 s", "15 s", "12 s"], answer: "18 s", explanation: "3 intervals=6s. 9 intervals=18s.", category: "Arithmetic" },
    { id: "apt-20", question: "Least number divisible by 5,6,7,8 leaving remainder 3, divisible by 9:", options: ["1677", "1683", "2523", "3363"], answer: "1683", explanation: "LCM=840. 840*2+3=1683. Digit sum=18.", category: "Arithmetic" },
    { id: "apt-21", question: "3 times first of 3 consecutive odd integers is 3 more than twice the third. Third integer:", options: ["11", "13", "15", "17"], answer: "15", explanation: "3x=2(x+4)+3 → x=11. Third=15.", category: "Arithmetic" },
    { id: "apt-22", question: "Probability of getting sum 9 from two dice throws:", options: ["1/6", "1/8", "1/9", "1/12"], answer: "1/9", explanation: "4 outcomes out of 36 = 1/9.", category: "Arithmetic" },
    { id: "apt-23", question: "Train 125 m long passes a man running at 5 km/hr in same direction in 10 s. Train speed:", options: ["45", "50", "54", "55"], answer: "50 km/hr", explanation: "Relative=12.5 m/s=45 km/hr. Train=45+5=50.", category: "Arithmetic" },
    { id: "apt-24", question: "A does work in 15 days, B in 20 days. Work together 4 days, A leaves. B finishes in:", options: ["10", "12", "15", "20"], answer: "10 days", explanation: "4 days work=7/15. Remaining=8/15. B=8/15*20≈10.67≈10 days.", category: "Arithmetic" },
    { id: "apt-25", question: "SI on a sum for 5 years at 9% p.a. is Rs.4016.25. The sum is:", options: ["Rs.4462.50", "Rs.8032.50", "Rs.8900", "Rs.8925"], answer: "Rs.8925", explanation: "P=4016.25*100/45=8925.", category: "Arithmetic" },
    { id: "apt-26", question: "Difference between CI and SI on Rs.1200 for 2 years at 10% p.a.:", options: ["Rs.12", "Rs.14", "Rs.16", "Rs.18"], answer: "Rs.12", explanation: "CI=252, SI=240. Diff=12.", category: "Arithmetic" },
    { id: "apt-27", question: "A 270 m train at 120 km/hr crosses another at 80 km/hr in opposite direction in 9 s. Second train length:", options: ["230 m", "240 m", "260 m", "280 m"], answer: "230 m", explanation: "Relative=200 km/hr=500/9 m/s. Total=500. Second=230.", category: "Arithmetic" },
    { id: "apt-28", question: "6 men and 8 boys do work in 10 days; 26 men and 48 boys in 2 days. 15 men and 20 boys finish in:", options: ["4", "5", "6", "7"], answer: "4 days", explanation: "1m=1/100, 1b=1/200. 15m+20b=1/4. 4 days.", category: "Arithmetic" },
    { id: "apt-29", question: "Find the odd one out: 3, 5, 11, 14, 17, 21", options: ["21", "17", "14", "3"], answer: "14", explanation: "All except 14 are odd numbers.", category: "Logical" },
    { id: "apt-30", question: "Harsh looks at a portrait: 'His mother is the wife of my father's son. No siblings.' Whose portrait?", options: ["His son", "His cousin", "His uncle", "His nephew"], answer: "His son", explanation: "Father's son=Harsh. Man's mother=Harsh's wife. Man=Harsh's son.", category: "Logical" },
    { id: "apt-31", question: "How many times are clock hands at right angle in a day?", options: ["22", "24", "44", "48"], answer: "44", explanation: "22 times in 12 hrs × 2 = 44.", category: "Logical" },
    { id: "apt-32", question: "Find the missing number: 4, 9, 20, 43, 90, ?", options: ["185", "180", "175", "190"], answer: "185", explanation: "Pattern: *2+1,+2,+3,+4,+5. 90*2+5=185.", category: "Logical" },
    { id: "apt-33", question: "1st January 2001 was Monday. What day was 1st January 2005?", options: ["Friday", "Saturday", "Sunday", "Monday"], answer: "Saturday", explanation: "4 years, 2004 leap. Odd days=5. Mon+5=Sat.", category: "Logical" },
    { id: "apt-34", question: "FRIEND coded as HUMJTK. How is CANDLE coded?", options: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBOC"], answer: "EDRIRL", explanation: "Shift +2,+3,+4,+5,+6,+7. C→E,A→D,N→R,D→I,L→R,E→L.", category: "Logical" },
    { id: "apt-35", question: "All bags are pockets. All pockets are pouches. Conclusion: I. All bags are pouches. II. All pouches are bags.", options: ["Only I", "Only II", "Both", "Neither"], answer: "Only I", explanation: "Bags⊂Pockets⊂Pouches. I is true, II is not.", category: "Logical" },
    { id: "apt-36", question: "Find the odd one out: 10, 25, 45, 54, 60, 75, 80", options: ["10", "45", "54", "75"], answer: "54", explanation: "All except 54 are multiples of 5.", category: "Logical" },
    { id: "apt-37", question: "Next number: 121, 144, 169, 196, ?", options: ["225", "256", "289", "324"], answer: "225", explanation: "11²,12²,13²,14²,15²=225.", category: "Logical" },
    { id: "apt-38", question: "'Tree' is called 'sky'. On which does a fruit grow?", options: ["Water", "Food", "Tree", "Sky"], answer: "Sky", explanation: "Fruits grow on tree, and tree is called sky.", category: "Logical" },
    { id: "apt-39", question: "18 R 12 P 4 S 5 Q 6 = ? (R=*, P=+, S=/, Q=-)", options: ["53/3", "210.8", "214", "None"], answer: "210.8", explanation: "18*12+4/5-6=216+0.8-6=210.8.", category: "Logical" },
    { id: "apt-40", question: "Which is a leap year?", options: ["1900", "2000", "2100", "None"], answer: "2000", explanation: "Century years divisible by 400 are leap years.", category: "Logical" },
    { id: "apt-41", question: "Angle between clock hands at 8:30?", options: ["60°", "75°", "90°", "105°"], answer: "75°", explanation: "|30*8-5.5*30|=|240-165|=75°.", category: "Logical" },
    { id: "apt-42", question: "Find the missing number: 2, 6, 12, 20, 30, ?", options: ["36", "40", "42", "48"], answer: "42", explanation: "Differences: 4,6,8,10,12. 30+12=42.", category: "Logical" },
    { id: "apt-43", question: "Next number: 1, 1, 2, 6, 24, ?", options: ["100", "120", "150", "240"], answer: "120", explanation: "Factorials: 5!=120.", category: "Logical" },
    { id: "apt-44", question: "5 spiders catch 5 flies in 5 minutes. Spiders needed to catch 100 flies in 100 minutes:", options: ["1", "5", "100", "20"], answer: "5", explanation: "1 spider catches 20 flies in 100 min. 5 spiders catch 100.", category: "Logical" },
    { id: "apt-45", question: "Sum of digits of 'CAB' (A=1, B=2, C=3...)?", options: ["6", "5", "7", "3"], answer: "6", explanation: "C=3,A=1,B=2. Sum=6.", category: "Logical" },
    { id: "apt-46", question: "Pointing to a photo, lady says 'I am the only daughter of this lady and her son is your maternal uncle.' How is speaker related to Pramod's father?", options: ["Sister-in-law", "Wife", "Mother", "Aunt"], answer: "Wife", explanation: "Speaker is Pramod's mother = Pramod's father's wife.", category: "Logical" },
    { id: "apt-47", question: "Which is NOT divisible by 11: 121, 132, 143, 145?", options: ["121", "132", "143", "145"], answer: "145", explanation: "121=11², 132=11*12, 143=11*13. 145 is not.", category: "Logical" },
    { id: "apt-48", question: "1st March 2008 was Saturday. Day on 1st March 2002?", options: ["Friday", "Sunday", "Saturday", "Monday"], answer: "Friday", explanation: "6 yrs back, 2 leap years. Odd days=8 mod 7=1. Sat-1=Fri.", category: "Logical" },
    { id: "apt-49", question: "Clock shows 3:15. Angle between hour and minute hands?", options: ["0°", "7.5°", "15°", "22.5°"], answer: "7.5°", explanation: "|30*3-5.5*15|=|90-82.5|=7.5°.", category: "Logical" },
    { id: "apt-50", question: "Rajan is 10th from left, Suresh 9th from right. After exchange, Rajan is 15th from left. Total boys:", options: ["23", "24", "25", "26"], answer: "23", explanation: "Suresh's position from left = n-8 = 15. n=23.", category: "Logical" },
    { id: "apt-51", question: "Which is not a prime number: 31, 61, 71, 91?", options: ["31", "61", "71", "91"], answer: "91", explanation: "91=7*13.", category: "Logical" },
    { id: "apt-52", question: "Find the missing: 8, 27, 64, 125, ?", options: ["196", "216", "225", "256"], answer: "216", explanation: "2³,3³,4³,5³,6³=216.", category: "Logical" },
    { id: "apt-53", question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?", options: ["Grandmother", "Granddaughter", "Daughter", "Niece"], answer: "Granddaughter", explanation: "A→C's daughter→D's granddaughter.", category: "Logical" },
    { id: "apt-54", question: "Synonym of 'ABANDON'?", options: ["Forsake", "Keep", "Cherish", "Hold"], answer: "Forsake", explanation: "Abandon = forsake.", category: "Verbal" },
    { id: "apt-55", question: "Antonym of 'ENORMOUS'?", options: ["Soft", "Tiny", "Average", "Weak"], answer: "Tiny", explanation: "Enormous = huge; tiny = very small.", category: "Verbal" },
    { id: "apt-56", question: "Correctly spelled word:", options: ["Accomodate", "Accommodate", "Acomodate", "Acommodate"], answer: "Accommodate", explanation: "Double 'c' and double 'm'.", category: "Verbal" },
    { id: "apt-57", question: "Word for: 'A place where bees are kept'", options: ["Aviary", "Apiary", "Aquarium", "Orchard"], answer: "Apiary", explanation: "Apiary = place for bees.", category: "Verbal" },
    { id: "apt-58", question: "Word for: 'One who cannot be corrected'", options: ["Incorrigible", "Invulnerable", "Irreparable", "Ineligible"], answer: "Incorrigible", explanation: "Incorrigible = cannot be corrected.", category: "Verbal" },
    { id: "apt-59", question: "Synonym of 'GENUINE'?", options: ["Fake", "Authentic", "Weak", "Stupid"], answer: "Authentic", explanation: "Genuine = authentic.", category: "Verbal" },
    { id: "apt-60", question: "Antonym of 'FRAGILE'?", options: ["Robust", "Soft", "Weak", "Small"], answer: "Robust", explanation: "Fragile = easily broken; robust = strong.", category: "Verbal" },
    { id: "apt-61", question: "Word for: 'A hater of mankind'", options: ["Philanthropist", "Misogynist", "Misanthrope", "Misogamist"], answer: "Misanthrope", explanation: "Misanthrope = hater of mankind.", category: "Verbal" },
    { id: "apt-62", question: "Synonym of 'LUCID'?", options: ["Murky", "Clear", "Dull", "Confused"], answer: "Clear", explanation: "Lucid = clear.", category: "Verbal" },
    { id: "apt-63", question: "Antonym of 'VERBOSE'?", options: ["Talkative", "Concise", "Wordy", "Lengthy"], answer: "Concise", explanation: "Verbose = wordy; concise = brief.", category: "Verbal" },
    { id: "apt-64", question: "Correctly spelled word:", options: ["Occurance", "Occurrence", "Occurence", "Ocurrence"], answer: "Occurrence", explanation: "Double 'c' and double 'r'.", category: "Verbal" },
    { id: "apt-65", question: "Synonym of 'EPHEMERAL'?", options: ["Permanent", "Transient", "Eternal", "Lasting"], answer: "Transient", explanation: "Ephemeral = short-lived = transient.", category: "Verbal" },
    { id: "apt-66", question: "Antonym of 'BENEVOLENT'?", options: ["Kind", "Generous", "Malevolent", "Charitable"], answer: "Malevolent", explanation: "Benevolent = kind; malevolent = evil.", category: "Verbal" },
    { id: "apt-67", question: "Word for: 'One who studies the stars'", options: ["Astrologer", "Astronomer", "Astrophysicist", "Cosmologist"], answer: "Astronomer", explanation: "Astronomer = scientist studying stars.", category: "Verbal" },
    { id: "apt-68", question: "Synonym of 'PERNICIOUS'?", options: ["Harmless", "Beneficial", "Harmful", "Neutral"], answer: "Harmful", explanation: "Pernicious = harmful.", category: "Verbal" },
    { id: "apt-69", question: "Antonym of 'TACITURN'?", options: ["Silent", "Reserved", "Talkative", "Shy"], answer: "Talkative", explanation: "Taciturn = reserved; talkative is the antonym.", category: "Verbal" },
    { id: "apt-70", question: "Synonym of 'SAGACIOUS'?", options: ["Foolish", "Wise", "Reckless", "Ignorant"], answer: "Wise", explanation: "Sagacious = having good judgment = wise.", category: "Verbal" },
    { id: "apt-71", question: "In a class of 60 students, 40% are girls. How many boys?", options: ["24", "36", "40", "20"], answer: "36", explanation: "Girls=24. Boys=60-24=36.", category: "Data Interpretation" },
    { id: "apt-72", question: "Revenue grew from Rs.50L to Rs.75L. Percentage increase?", options: ["25%", "33.33%", "50%", "66.67%"], answer: "50%", explanation: "25/50*100=50%.", category: "Data Interpretation" },
    { id: "apt-73", question: "A sector represents 25% of total in a pie chart. Central angle?", options: ["45°", "60°", "90°", "120°"], answer: "90°", explanation: "25% of 360°=90°.", category: "Data Interpretation" },
    { id: "apt-74", question: "Average marks of 5 students is 60. One scoring 80 is removed. New average:", options: ["50", "55", "57.5", "60"], answer: "55", explanation: "Total=300. New=220. Avg=220/4=55.", category: "Data Interpretation" },
    { id: "apt-75", question: "Sales: Jan=200, Feb=250, Mar=300, Apr=350. Average monthly sales:", options: ["275", "280", "285", "300"], answer: "275", explanation: "(200+250+300+350)/4=275.", category: "Data Interpretation" },
    { id: "apt-76", question: "Ratio of boys to girls is 3:2, total 600 students. Girls:", options: ["200", "240", "360", "400"], answer: "240", explanation: "2/5*600=240.", category: "Data Interpretation" },
    { id: "apt-77", question: "Profit: A=Rs.500, B=Rs.300, C=Rs.200. % of total profit from A:", options: ["40%", "45%", "50%", "55%"], answer: "50%", explanation: "500/1000*100=50%.", category: "Data Interpretation" },
    { id: "apt-78", question: "Scores: 75, 80, 90, 85, 70. Median score:", options: ["75", "80", "85", "90"], answer: "80", explanation: "Sorted: 70,75,80,85,90. Median=80.", category: "Data Interpretation" },
    { id: "apt-79", question: "Population: 2010=10M, 2020=15M. Growth from 2010 to 2020:", options: ["20%", "25%", "50%", "66.67%"], answer: "50%", explanation: "(15-10)/10*100=50%.", category: "Data Interpretation" },
    { id: "apt-80", question: "200 people: 60% prefer tea, 40% prefer coffee. How many more prefer tea?", options: ["20", "30", "40", "50"], answer: "40", explanation: "Tea=120, Coffee=80. Diff=40.", category: "Data Interpretation" },
    { id: "apt-81", question: "Mode of {3, 5, 7, 5, 9, 3, 5}:", options: ["3", "5", "7", "9"], answer: "5", explanation: "5 appears 3 times.", category: "Data Interpretation" },
    { id: "apt-82", question: "Company spends 30% on salaries. Total expenditure Rs.4L. Salary expenditure:", options: ["Rs.80,000", "Rs.1,00,000", "Rs.1,20,000", "Rs.1,50,000"], answer: "Rs.1,20,000", explanation: "30% of 4,00,000=1,20,000.", category: "Data Interpretation" },
    { id: "apt-83", question: "Mean of 10 numbers is 50. One number added, new mean is 52. Added number:", options: ["60", "70", "72", "80"], answer: "72", explanation: "New sum=572. Added=572-500=72.", category: "Data Interpretation" },
    { id: "apt-84", question: "Pie chart: HR=90°, Finance=60°, IT=120°. Angle for Marketing:", options: ["60°", "90°", "120°", "150°"], answer: "90°", explanation: "360-90-60-120=90°.", category: "Data Interpretation" },
    { id: "apt-85", question: "Sales: Q1=2L, Q2=3L, Q3=2.5L, Q4=4L. Total annual sales:", options: ["10L", "11L", "11.5L", "12L"], answer: "11.5L", explanation: "2+3+2.5+4=11.5L.", category: "Data Interpretation" },
    { id: "apt-86", question: "Dataset: 10, 20, 30, 40, 50. Range:", options: ["30", "40", "50", "60"], answer: "40", explanation: "Range=50-10=40.", category: "Data Interpretation" },
    { id: "apt-87", question: "Student scored 65% in 200-mark exam. Marks scored:", options: ["120", "125", "130", "135"], answer: "130", explanation: "65% of 200=130.", category: "Data Interpretation" },
    { id: "apt-88", question: "30 students scored 60-70, 10 scored 70-80, 15 scored 80-90. % scored above 70:", options: ["50%", "60%", "75%", "83.33%"], answer: "83.33%", explanation: "Wait — 5 scored 60-70, 10 scored 70-80, 15 scored 80-90. Total=30. Above 70=25. 25/30*100=83.33%.", category: "Data Interpretation" },
    { id: "apt-89", question: "Expenses: Food=5000, Transport=2000, Entertainment=1000, Others=2000. Fraction on food:", options: ["1/2", "1/3", "1/4", "2/5"], answer: "1/2", explanation: "Total=10000. Food=5000=1/2.", category: "Data Interpretation" },
    { id: "apt-90", question: "Variance of a dataset is 25. Standard deviation:", options: ["3", "4", "5", "6"], answer: "5", explanation: "SD=√25=5.", category: "Data Interpretation" },
    { id: "apt-91", question: "Company profit for 5 years: 10L, 12L, 15L, 11L, 17L. Average profit:", options: ["12L", "13L", "14L", "15L"], answer: "13L", explanation: "65/5=13L.", category: "Data Interpretation" },
    { id: "apt-92", question: "30 students play cricket, 20 play football, 10 play both. Students playing at least one sport:", options: ["30", "40", "50", "60"], answer: "40", explanation: "Union=30+20-10=40.", category: "Data Interpretation" },
    { id: "apt-93", question: "Pie chart has 4 equal sectors. Central angle of each:", options: ["45°", "60°", "90°", "120°"], answer: "90°", explanation: "360/4=90°.", category: "Data Interpretation" },
    { id: "apt-94", question: "3 out of 15 products are defective. Probability of picking a non-defective product:", options: ["1/5", "4/5", "2/5", "3/5"], answer: "4/5", explanation: "12/15=4/5.", category: "Data Interpretation" },
    { id: "apt-95", question: "Sales: 2020=80 units, 2021=120 units. % change from 2020 to 2021:", options: ["25%", "33.33%", "50%", "66.67%"], answer: "50%", explanation: "(120-80)/80*100=50%.", category: "Data Interpretation" },
    { id: "apt-96", question: "Weighted average with weights 2,3,5 and scores 70,80,90:", options: ["80", "82", "83", "85"], answer: "83", explanation: "(140+240+450)/10=83.", category: "Data Interpretation" },
    { id: "apt-97", question: "5 values: 10, 20, 30, 40, and one unknown. Mean=25. Unknown value:", options: ["20", "25", "30", "35"], answer: "25", explanation: "Sum=125. Unknown=125-100=25.", category: "Data Interpretation" },
    { id: "apt-98", question: "40% of 500 respondents preferred Brand A. How many?", options: ["150", "175", "200", "250"], answer: "200", explanation: "40% of 500=200.", category: "Data Interpretation" },
    { id: "apt-99", question: "Temperatures: Mon=20°C, Tue=22°C, Wed=25°C, Thu=23°C, Fri=21°C. Average:", options: ["21°C", "22°C", "22.2°C", "23°C"], answer: "22.2°C", explanation: "111/5=22.2°C.", category: "Data Interpretation" },
    { id: "apt-100", question: "Dataset: {2, 4, 4, 4, 5, 5, 7, 9}. Mean:", options: ["4", "5", "5.5", "6"], answer: "5", explanation: "40/8=5.", category: "Data Interpretation" },

    { 
        id: "apt-gen-334a5b", 
        question: "If a train travels 300 km in 5 hours, what is its average speed in km/h?", 
        options: ["60 km/h", "65 km/h", "70 km/h", "75 km/h"], 
        answer: "60 km/h", 
        explanation: "To find the average speed, divide the total distance by the total time. 300 km / 5 hours = 60 km/h.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-7dccf1", 
        question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If all Bloops are Razzies and all Razzies are Lazzies, then by transitivity, all Bloops must be Lazzies.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-12d8e9", 
        question: "Choose the word that is most opposite in meaning to 'Ephemeral':", 
        options: ["Permanent", "Temporary", "Fleeting", "Transient"], 
        answer: "Permanent", 
        explanation: "'Ephemeral' means lasting for a very short time, so its opposite is 'Permanent'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-a4d10e", 
        question: "If the ratio of the number of boys to girls in a class is 3:2 and there are 30 students in total, how many girls are there?", 
        options: ["12", "18", "15", "10"], 
        answer: "12", 
        explanation: "The ratio 3:2 means for every 3 boys, there are 2 girls. Total parts = 3 + 2 = 5. Number of girls = (2/5) * 30 = 12.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-c753d7", 
        question: "If it rains, the ground will get wet. The ground is wet. Did it rain?", 
        options: ["Yes", "No", "Maybe", "Not necessarily"], 
        answer: "Not necessarily", 
        explanation: "The ground could be wet for other reasons, such as a sprinkler or a spill. Therefore, it is not necessarily true that it rained.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-c0dce3", 
        question: "Choose the word that is most similar in meaning to 'Loquacious':", 
        options: ["Reserved", "Talkative", "Silent", "Reticent"], 
        answer: "Talkative", 
        explanation: "'Loquacious' means tending to talk a lot, so its synonym is 'Talkative'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-34b861", 
        question: "A car travels from A to B at a speed of 40 km/h and returns from B to A at 60 km/h. What is the average speed for the entire journey?", 
        options: ["45 km/h", "48 km/h", "50 km/h", "55 km/h"], 
        answer: "48 km/h", 
        explanation: "To find the average speed for the entire journey, use the harmonic mean formula: 2 * (40 * 60) / (40 + 60) = 48 km/h.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-b6e48a", 
        question: "If all A are B, and all B are C, then some A are C. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If all A are B and all B are C, then by transitivity, all A must be C. Therefore, some A are definitely C.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-41328b", 
        question: "Choose the word that is most opposite in meaning to 'Meticulous':", 
        options: ["Careful", "Sloppy", "Precise", "Accurate"], 
        answer: "Sloppy", 
        explanation: "'Meticulous' means very careful and precise, so its opposite is 'Sloppy'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-939101", 
        question: "If a rectangle has a length of 8 cm and a width of 5 cm, what is its area?", 
        options: ["13 cm\u00b2", "24 cm\u00b2", "30 cm\u00b2", "40 cm\u00b2"], 
        answer: "40 cm²", 
        explanation: "The area of a rectangle is calculated by multiplying its length by its width. 8 cm * 5 cm = 40 cm².", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-99bb1a", 
        question: "If no X are Y and some Y are Z, then some Z are not X. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If no X are Y and some Y are Z, then those Y that are Z cannot be X. Therefore, some Z are not X.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-f10caf", 
        question: "Choose the word that is most similar in meaning to 'Ebullient':", 
        options: ["Gloomy", "Cheerful", "Sad", "Depressed"], 
        answer: "Cheerful", 
        explanation: "'Ebullient' means full of enthusiasm, so its synonym is 'Cheerful'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-d9c547", 
        question: "If a circle has a radius of 7 cm, what is its circumference?", 
        options: ["14 cm", "22 cm", "44 cm", "154 cm"], 
        answer: "44 cm", 
        explanation: "The circumference of a circle is calculated by multiplying the radius by 2π. 2 * 7 * π ≈ 44 cm.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-d02a01", 
        question: "If some A are B and all B are C, then some A are C. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If some A are B and all B are C, then those A that are B must also be C. Therefore, some A are C.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-aaedc8", 
        question: "Choose the word that is most opposite in meaning to 'Voracious':", 
        options: ["Hungry", "Ravenous", "Indifferent", "Appetite"], 
        answer: "Indifferent", 
        explanation: "'Voracious' means having a huge appetite, so its opposite is 'Indifferent'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-623c0e", 
        question: "If a triangle has sides of lengths 3 cm, 4 cm, and 5 cm, what type of triangle is it?", 
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"], 
        answer: "Right-angled", 
        explanation: "A triangle with sides 3 cm, 4 cm, and 5 cm is a right-angled triangle because it satisfies the Pythagorean theorem (3² + 4² = 5²).", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-ad8e1a", 
        question: "If all X are Y and some Y are not Z, then some X are not Z. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If all X are Y and some Y are not Z, then those Y that are not Z cannot be X. Therefore, some X are not Z.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-7d9f86", 
        question: "Choose the word that is most similar in meaning to 'Pusillanimous':", 
        options: ["Brave", "Cowardly", "Fearless", "Daring"], 
        answer: "Cowardly", 
        explanation: "'Pusillanimous' means lacking courage or resolution, so its synonym is 'Cowardly'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-922326", 
        question: "If a square has a side length of 6 cm, what is its area?", 
        options: ["12 cm\u00b2", "24 cm\u00b2", "36 cm\u00b2", "48 cm\u00b2"], 
        answer: "36 cm²", 
        explanation: "The area of a square is calculated by squaring the length of one of its sides. 6 cm * 6 cm = 36 cm².", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-9926c5", 
        question: "If no A are B and some B are C, then some C are not A. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If no A are B and some B are C, then those B that are C cannot be A. Therefore, some C are not A.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-b96a87", 
        question: "Choose the word that is most opposite in meaning to 'Magnanimous':", 
        options: ["Generous", "Stingy", "Kind", "Charitable"], 
        answer: "Stingy", 
        explanation: "'Magnanimous' means generous or forgiving, so its opposite is 'Stingy'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-003fd7", 
        question: "If a rectangle has a length of 10 cm and a width of 6 cm, what is its perimeter?", 
        options: ["22 cm", "28 cm", "32 cm", "36 cm"], 
        answer: "32 cm", 
        explanation: "The perimeter of a rectangle is calculated by adding twice the length and twice the width. 2 * 10 cm + 2 * 6 cm = 32 cm.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-4440bf", 
        question: "If some A are B and no B are C, then some A are not C. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If some A are B and no B are C, then those A that are B cannot be C. Therefore, some A are not C.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-434f68", 
        question: "Choose the word that is most similar in meaning to 'Quixotic':", 
        options: ["Practical", "Realistic", "Idealistic", "Sensible"], 
        answer: "Idealistic", 
        explanation: "'Quixotic' means extremely idealistic, so its synonym is 'Idealistic'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-f6ae04", 
        question: "If a triangle has sides of lengths 5 cm, 5 cm, and 8 cm, what type of triangle is it?", 
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"], 
        answer: "Isosceles", 
        explanation: "A triangle with two sides of equal length is an isosceles triangle. In this case, the sides of lengths 5 cm and 5 cm make it isosceles.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-d3beb3", 
        question: "If all X are Y and some Y are not Z, then some X are not Z. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If all X are Y and some Y are not Z, then those X that are Y but not Z cannot be Z. Therefore, some X are not Z.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-b98282", 
        question: "Choose the word that is most opposite in meaning to 'Pernicious':", 
        options: ["Harmful", "Beneficial", "Damaging", "Detrimental"], 
        answer: "Beneficial", 
        explanation: "'Pernicious' means harmful or damaging, so its opposite is 'Beneficial'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-c7c480", 
        question: "If a circle has a diameter of 14 cm, what is its area?", 
        options: ["19 cm\u00b2", "38 cm\u00b2", "77 cm\u00b2", "154 cm\u00b2"], 
        answer: "154 cm²", 
        explanation: "The area of a circle is calculated by squaring the radius and multiplying by π. The radius is half the diameter, so 7 cm * 7 cm * π ≈ 154 cm².", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-fffde6", 
        question: "If some A are B and all B are C, then some A are C. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If some A are B and all B are C, then those A that are B must also be C. Therefore, some A are C.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-427f73", 
        question: "Choose the word that is most similar in meaning to 'Sycophant':", 
        options: ["Critic", "Flatterer", "Detractor", "Adversary"], 
        answer: "Flatterer", 
        explanation: "'Sycophant' means a person who acts obsequiously toward someone important in order to gain advantage, so its synonym is 'Flatterer'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-b4ab50", 
        question: "If a square has a perimeter of 40 cm, what is the length of one of its sides?", 
        options: ["8 cm", "10 cm", "12 cm", "15 cm"], 
        answer: "10 cm", 
        explanation: "The perimeter of a square is calculated by multiplying the length of one side by 4. To find the length of one side, divide the perimeter by 4. 40 cm / 4 = 10 cm.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-f2cdd6", 
        question: "If no X are Y and some Y are Z, then some Z are not X. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If no X are Y and some Y are Z, then those Y that are Z cannot be X. Therefore, some Z are not X.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-855a3e", 
        question: "Choose the word that is most opposite in meaning to 'Parsimonious':", 
        options: ["Generous", "Stingy", "Frugal", "Thrifty"], 
        answer: "Generous", 
        explanation: "'Parsimonious' means unwilling to spend money or use resources; stingy, so its opposite is 'Generous'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-c03862", 
        question: "If a rectangle has a length of 12 cm and a width of 7 cm, what is its area?", 
        options: ["19 cm\u00b2", "24 cm\u00b2", "84 cm\u00b2", "98 cm\u00b2"], 
        answer: "84 cm²", 
        explanation: "The area of a rectangle is calculated by multiplying its length by its width. 12 cm * 7 cm = 84 cm².", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-ebc01e", 
        question: "If all X are Y and some Y are not Z, then some X are not Z. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If all X are Y and some Y are not Z, then those X that are Y but not Z cannot be Z. Therefore, some X are not Z.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-b5ee50", 
        question: "Choose the word that is most similar in meaning to 'Capricious':", 
        options: ["Steady", "Consistent", "Unpredictable", "Reliable"], 
        answer: "Unpredictable", 
        explanation: "'Capricious' means given to sudden and unaccountable changes of mood or behavior, so its synonym is 'Unpredictable'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-37cb5d", 
        question: "If a triangle has sides of lengths 7 cm, 7 cm, and 7 cm, what type of triangle is it?", 
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"], 
        answer: "Equilateral", 
        explanation: "A triangle with all three sides of equal length is an equilateral triangle.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-90810a", 
        question: "If some A are B and no B are C, then some A are not C. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If some A are B and no B are C, then those A that are B cannot be C. Therefore, some A are not C.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-bd12b7", 
        question: "Choose the word that is most opposite in meaning to 'Intransigent':", 
        options: ["Flexible", "Stubborn", "Uncompromising", "Adaptable"], 
        answer: "Flexible", 
        explanation: "'Intransigent' means refusing to change one's views or to agree about something, so its opposite is 'Flexible'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-0fca2f", 
        question: "If a circle has a radius of 5 cm, what is its circumference?", 
        options: ["10 cm", "20 cm", "30 cm", "40 cm"], 
        answer: "20 cm", 
        explanation: "The circumference of a circle is calculated by multiplying the radius by 2π. 2 * 5 * π ≈ 20 cm.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-fc211a", 
        question: "If all X are Y and some Y are not Z, then some X are not Z. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If all X are Y and some Y are not Z, then those X that are Y but not Z cannot be Z. Therefore, some X are not Z.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-c97cbb", 
        question: "Choose the word that is most similar in meaning to 'Mellifluous':", 
        options: ["Harsh", "Harmonious", "Discordant", "Gritty"], 
        answer: "Harmonious", 
        explanation: "'Mellifluous' means sweet or musical; pleasant to hear, so its synonym is 'Harmonious'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-d192d8", 
        question: "If a rectangle has a length of 9 cm and a width of 4 cm, what is its perimeter?", 
        options: ["18 cm", "26 cm", "30 cm", "36 cm"], 
        answer: "26 cm", 
        explanation: "The perimeter of a rectangle is calculated by adding twice the length and twice the width. 2 * 9 cm + 2 * 4 cm = 26 cm.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-b953d0", 
        question: "If some A are B and all B are C, then some A are C. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If some A are B and all B are C, then those A that are B must also be C. Therefore, some A are C.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-8d1d09", 
        question: "Choose the word that is most opposite in meaning to 'Pusillanimous':", 
        options: ["Brave", "Cowardly", "Fearless", "Daring"], 
        answer: "Brave", 
        explanation: "'Pusillanimous' means lacking courage or resolution, so its opposite is 'Brave'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-083a3f", 
        question: "If a triangle has sides of lengths 6 cm, 8 cm, and 10 cm, what type of triangle is it?", 
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"], 
        answer: "Right-angled", 
        explanation: "A triangle with sides 6 cm, 8 cm, and 10 cm is a right-angled triangle because it satisfies the Pythagorean theorem (6² + 8² = 10²).", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-cefdba", 
        question: "If no X are Y and some Y are Z, then some Z are not X. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If no X are Y and some Y are Z, then those Y that are Z cannot be X. Therefore, some Z are not X.", 
        category: "Logical" 
    },
    { 
        id: "apt-gen-ee8fbd", 
        question: "Choose the word that is most similar in meaning to 'Quixotic':", 
        options: ["Practical", "Realistic", "Idealistic", "Sensible"], 
        answer: "Idealistic", 
        explanation: "'Quixotic' means extremely idealistic, so its synonym is 'Idealistic'.", 
        category: "Verbal" 
    },
    { 
        id: "apt-gen-fc7aa6", 
        question: "If a square has a side length of 8 cm, what is its perimeter?", 
        options: ["16 cm", "24 cm", "32 cm", "40 cm"], 
        answer: "32 cm", 
        explanation: "The perimeter of a square is calculated by multiplying the length of one side by 4. 8 cm * 4 = 32 cm.", 
        category: "Arithmetic" 
    },
    { 
        id: "apt-gen-a660aa", 
        question: "If all X are Y and some Y are not Z, then some X are not Z. True or False?", 
        options: ["True", "False", "Sometimes", "Not enough information"], 
        answer: "True", 
        explanation: "If all X are Y and some Y are not Z, then those X that are Y but not Z cannot be Z. Therefore, some X are not Z.", 
        category: "Logical" 
    },
];
