import os
import ast
import csv
from fastapi import APIRouter, Query

router = APIRouter(prefix="/api", tags=["jobs"])

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "output", "final_skill_dataset.csv")


def _load_rows():
    if not os.path.exists(DATA_PATH):
        return []
    with open(DATA_PATH, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        try:
            r["extracted_skills"] = ast.literal_eval(r.get("extracted_skills", "[]"))
        except (ValueError, SyntaxError):
            r["extracted_skills"] = []
    return rows


@router.get("/jobs")
def list_jobs(
    q: str | None = Query(None, description="Search job title"),
    location: str | None = None,
    skill: str | None = None,
    limit: int = 50,
    offset: int = 0,
):
    rows = _load_rows()
    if q:
        rows = [r for r in rows if q.lower() in r.get("title", "").lower()]
    if location:
        rows = [r for r in rows if location.lower() in r.get("location", "").lower()]
    if skill:
        rows = [r for r in rows if skill.lower() in [s.lower() for s in r.get("extracted_skills", [])]]

    total = len(rows)
    page = rows[offset: offset + limit]
    return {"total": total, "limit": limit, "offset": offset, "jobs": page}


@router.get("/jobs/{job_id}")
def get_job(job_id: str):
    rows = _load_rows()
    for r in rows:
        if str(r.get("job_id")) == str(job_id):
            return r
    return {"error": "job not found"}
from fastapi import Query
from services.analytics_service import get_skills_for_role

@router.get("/role-skills")
def role_skills(role: str = Query(..., min_length=2)):
    return get_skills_for_role(role)