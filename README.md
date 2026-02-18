# VANTAGE — AI Interview Intelligence Platform

An AI-powered interview preparation platform with mock interviews, coding practice, aptitude tests, HR rounds, and a college leaderboard.

---

## 🏗️ Project Structure

```
ai-interview-platform/
├── frontend/          # Next.js 16 app (deployed on Vercel)
├── backend/           # FastAPI Python app (deployed on Render)
├── vercel.json        # Vercel deployment config
└── render.yaml        # Render deployment config
```

---

## 🚀 Deployment Guide

### Step 1 — Deploy Backend on Render

1. Go to [render.com](https://render.com) → Sign up / Log in with GitHub
2. Click **New → Web Service**
3. Connect your GitHub repo: `sakthivel-136/ai-interview`
4. Select branch: `version1`
5. Render will auto-detect `render.yaml` — click **Apply**
6. In the Render dashboard, go to **Environment** and add these variables:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Your Supabase **service role** key |
| `MISTRAL_API_KEY` | Your Mistral AI API key |
| `MISTRAL_MODEL` | `mistral-small-latest` |
| `FRONTEND_URL` | *(leave blank for now, fill after Vercel deploy)* |

7. Click **Save Changes** → Render will build and deploy
8. Copy your Render URL (e.g. `https://vantage-backend.onrender.com`)

---

### Step 2 — Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up / Log in with GitHub
2. Click **Add New → Project**
3. Import your GitHub repo: `sakthivel-136/ai-interview`
4. Vercel will detect `vercel.json` and set `frontend/` as root automatically
5. In **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase **anon** key |
| `NEXT_PUBLIC_API_URL` | Your Render backend URL (from Step 1) |
| `NEXT_PUBLIC_BACKEND_URL` | Your Render backend URL (from Step 1) |

6. Click **Deploy**
7. Copy your Vercel URL (e.g. `https://your-app.vercel.app`)

---

### Step 3 — Connect Frontend ↔ Backend

1. Go back to **Render dashboard → your backend service → Environment**
2. Set `FRONTEND_URL` = your Vercel URL (e.g. `https://your-app.vercel.app`)
3. Click **Save** → Render will redeploy automatically

✅ Your app is now fully live!

---

## 💻 Local Development

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Fill in your values
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local      # Fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

See `backend/.env.example` and `frontend/.env.example` for all required variables.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TailwindCSS 4 |
| Backend | FastAPI, Python 3.11 |
| Database & Auth | Supabase (PostgreSQL) |
| AI | Mistral AI |
| Hosting | Vercel (frontend) + Render (backend) |
