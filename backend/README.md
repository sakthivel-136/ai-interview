# AI Interview Platform - Backend

This is the backend service for the AI Interview Platform.

## Technology Stack
- **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python 3.8+.
- **Supabase**: Open source Firebase alternative.
- **Python**: 3.10+
- **OpenAI/Gemini**: AI models for interview analysis and feedback.

## Setup Instructions

1. **Prerequisites**
   - Python 3.10 or higher
   - Virtual Environment (recommended)

2. **Installation**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   pip install -r requirements.txt
   ```

3. **Environment Variables**
   Create a `.env` file in the `backend/` directory with the following:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   GEMINI_API_KEY=your_gemini_api_key
   # Add any other required keys
   ```

4. **Running the Server**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

## API Documentation
Once the server is running, you can access the interactive API docs at:
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)
