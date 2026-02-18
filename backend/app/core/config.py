from pydantic_settings import BaseSettings
from functools import lru_cache
from dotenv import load_dotenv
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

class Settings(BaseSettings):
    PROJECT_NAME: str = "VANTAGE Intelligence Platform"
    API_V1_STR: str = "/api/v1"
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_API_KEYS: str = os.getenv("GEMINI_API_KEYS", "") # Comma separated keys
    MISTRAL_API_KEY: str = os.getenv("MISTRAL_API_KEY", "")
    MISTRAL_MODEL: str = os.getenv("MISTRAL_MODEL", "mistral-small-latest")
    
    model_config = {"env_file": ".env", "extra": "ignore"}

@lru_cache()
def get_settings():
    return Settings()
