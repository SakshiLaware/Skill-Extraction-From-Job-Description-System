from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



from routes import extraction, jobs, analytics

app = FastAPI(
    title="Skill Extraction API",
    description="Extracts and analyzes skills from job descriptions using multiple NLP/ML/LLM methods.",
    version="1.0.0",
)

# Vite's default dev server port
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(extraction.router)
app.include_router(jobs.router)
app.include_router(analytics.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "skill-extraction-api"}


@app.get("/health")
def health():
    return {"status": "healthy"}
