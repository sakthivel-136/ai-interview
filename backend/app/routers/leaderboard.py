from fastapi import APIRouter, Depends
from app.middleware.auth import get_current_user, get_supabase_client
from typing import List
from pydantic import BaseModel

router = APIRouter()

class LeaderboardEntry(BaseModel):
    rank: int
    full_name: str
    department: str
    year: int
    total_score: float
    badges: List[str]

@router.get("/", response_model=List[LeaderboardEntry])
def get_leaderboard(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    
    # Query user_stats joined with profiles
    # user_stats has user_id FK to profiles.id
    # We select fields and nested profile data
    response = supabase.table("user_stats") \
        .select("total_score, aptitude_score, coding_score, hr_score, technical_score, profiles(full_name, department, year)") \
        .order("total_score", desc=True) \
        .limit(50) \
        .execute()
        
    entries = []
    
    if not response.data:
        return []
        
    for idx, item in enumerate(response.data):
        profile = item.get("profiles")
        # Handle case where profile might be null (though unlikely due to FK)
        if not profile: profile = {}
        
        score = float(item.get("total_score", 0))
        
        # Dynamic Badge Generation logic
        badges = []
        if score >= 90: badges.append("Elite Performer")
        elif score >= 80: badges.append("Top Talent")
        
        # Domain specific badges
        apt = item.get("aptitude_score", 0)
        code = item.get("coding_score", 0)
        hr = item.get("hr_score", 0)
        tech = item.get("technical_score", 0)
        
        if code >= 90: badges.append("Algorithm Ace")
        if tech >= 90: badges.append("Tech Guru")
        if hr >= 90: badges.append("Charismatic Lead")
        if apt >= 90: badges.append("Logic Master")
        
        # Limit badges to 3
        final_badges = badges[:3]
        
        entries.append({
            "rank": idx + 1,
            "full_name": profile.get("full_name") or "Unknown Candidate",
            "department": profile.get("department") or "General",
            "year": profile.get("year") or 0,
            "total_score": score,
            "badges": final_badges
        })
        
    return entries
