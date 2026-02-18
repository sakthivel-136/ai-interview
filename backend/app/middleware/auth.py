from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from app.core.config import get_settings

settings = get_settings()
security = HTTPBearer()

def get_supabase_client() -> Client:
    try:
        if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
             print(f"DEBUG ERROR: Missing Supabase config. URL: {bool(settings.SUPABASE_URL)}, Key: {bool(settings.SUPABASE_KEY)}")
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    except Exception as e:
        print(f"DEBUG ERROR: Supabase connection failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Could not connect to Supabase: {str(e)}")

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifies the JWT token from Supabase.
    Returns the user data if valid.
    """
    token = credentials.credentials
    supabase = get_supabase_client()
    
    try:
        user = supabase.auth.get_user(token)
        if not user:
             raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(user = Depends(verify_token)):
    return user
