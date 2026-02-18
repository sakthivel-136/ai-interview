# AI Interview Platform

A comprehensive platform for AI-driven mock interviews, featuring aptitude tests, coding challenges, and resume analysis.

## Project Structure
- **/frontend**: Next.js application for the user interface.
- **/backend**: FastAPI service for AI processing and database management.

## Key Features
- **Aptitude Mock Interviews**: Dynamic aptitude rounds with real-time feedback.
- **Coding Arena**: Interactive coding environment for technical interviews.
- **Resume Analysis**: AI-powered resume screening and feedback.
- **Performance Analytics**: Detailed breakdown of interview performance.

## Getting Started

### Backend Setup
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Set up `.env` file
4. Run server: `uvicorn app.main:app --reload`

### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Set up `.env.local` file
4. Run development server: `npm run dev`

## Technologies Used
- **Frontend**: Next.js, Tailwind CSS, TypeScript, Supabase Auth/Client.
- **Backend**: FastAPI, Python, SQLAlchemy/Supabase.
- **AI**: Google Gemini Pro, OpenAI GPT-4.
