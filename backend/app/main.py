from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(title=settings.PROJECT_NAME)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow localhost for dev + the deployed Vercel frontend URL for production.
# Set FRONTEND_URL env var on Render to your Vercel URL (e.g. https://your-app.vercel.app)
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Add production Vercel URL if configured
if settings.FRONTEND_URL and settings.FRONTEND_URL not in allowed_origins:
    allowed_origins.append(settings.FRONTEND_URL)
    # Also allow without trailing slash variant
    allowed_origins.append(settings.FRONTEND_URL.rstrip("/"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
from app.routers import profile, problems, mock, leaderboard, resume

app.include_router(profile.router, prefix="/profile", tags=["profile"])
app.include_router(problems.router, prefix="/problems", tags=["problems"])
app.include_router(mock.router, prefix="/mock", tags=["mock"])
app.include_router(leaderboard.router, prefix="/leaderboard", tags=["leaderboard"])
app.include_router(resume.router, prefix="/resume", tags=["resume"])

# ── Health endpoints ──────────────────────────────────────────────────────────
@app.get("/")
def read_root():
    return {"message": "VANTAGE Intelligence Platform API", "status": "online"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
