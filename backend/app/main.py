from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
# from app.routers import auth, profile, problems, submissions, mock  # Import routers as we create them

settings = get_settings()

app = FastAPI(title=settings.PROJECT_NAME)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://0.0.0.0:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"DEBUG: {request.method} {request.url}")
    print(f"DEBUG: Headers: {dict(request.headers)}")
    try:
        response = await call_next(request)
        print(f"DEBUG: Status: {response.status_code}")
        return response
    except Exception as e:
        print(f"DEBUG: ERROR in request processing: {str(e)}")
        raise e

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Interview Intelligence Platform API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

from app.routers import profile, problems, mock, leaderboard, resume

app.include_router(profile.router, prefix="/profile", tags=["profile"])
app.include_router(problems.router, prefix="/problems", tags=["problems"])
app.include_router(mock.router, prefix="/mock", tags=["mock"])
app.include_router(leaderboard.router, prefix="/leaderboard", tags=["leaderboard"])
app.include_router(resume.router, prefix="/resume", tags=["resume"])
