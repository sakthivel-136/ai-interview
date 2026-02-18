from fastapi import APIRouter, Depends, HTTPException, status
from app.middleware.auth import get_current_user, get_supabase_client
from pydantic import BaseModel

router = APIRouter()

class ProfileSchema(BaseModel):
    id: str
    full_name: str
    roll_number: str
    department: str
    year: int
    stats: dict | None = None

@router.get("/me", response_model=ProfileSchema)
def get_my_profile(user = Depends(get_current_user)):
    supabase = get_supabase_client()
    
    # Fetch Profile
    profile_response = supabase.table("profiles").select("*").eq("id", user.user.id).single().execute()
    
    if not profile_response.data:
         raise HTTPException(status_code=404, detail="Profile not found")

    # Fetch Stats (Optional: Join in SQL or separate query)
    stats_response = supabase.table("user_stats").select("*").eq("user_id", user.user.id).single().execute()
    
    profile_data = profile_response.data
    profile_data["stats"] = stats_response.data if stats_response.data else {}

    return profile_data
