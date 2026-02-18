from fastapi import APIRouter, Depends
from app.middleware.auth import get_current_user, get_supabase_client
from pydantic import BaseModel
from typing import List

router = APIRouter()

class LeaderboardEntry(BaseModel):
    rank: int
    full_name: str
    department: str
    year: int
    total_score: float
    badges: List[str] = []

@router.get("/", response_model=List[LeaderboardEntry])
def get_leaderboard(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    
    # Check if we need to refresh stats (Optional MVP optimization: do it on read or async job)
    # For MVP: Query user_stats joined with profiles
    # Supabase join syntax: select(*, profiles(full_name, department, year))
    
    response = supabase.table("user_stats").select("total_score, profiles(full_name, department, year)").order("total_score", desc=True).limit(50).execute()
    
    leaderboard = []
    for idx, row in enumerate(response.data):
        profile = row.get("profiles") or {}
        leaderboard.append({
            "rank": idx + 1,
            "full_name": profile.get("full_name", "Unknown"),
            "department": profile.get("department", "-"),
            "year": profile.get("year", 0),
            "total_score": row.get("total_score", 0),
            "badges": ["Top 10"] if idx < 10 else [] # Mock badges
        })
    
    return leaderboard
