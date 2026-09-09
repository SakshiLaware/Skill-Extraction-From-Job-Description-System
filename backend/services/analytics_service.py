"""
Analytics service: powers GET /api/analytics for the React dashboard.
Reads the notebook's consolidated output (data/output/final_skill_dataset.csv)
so the dashboard, Power BI, and notebook all show the same numbers.
"""
import os
import ast
import csv
from collections import Counter

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "output", "final_skill_dataset.csv")


def _load_rows():
    if not os.path.exists(DATA_PATH):
        return []
    with open(DATA_PATH, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def get_analytics():
    rows = _load_rows()
    if not rows:
        return {
            "total_jobs": 0, "unique_skills": 0, "top_skill": None,
            "top_job_role": None, "top_skills": [], "jobs_by_role": [],
            "note": "Run the notebook first to generate data/output/final_skill_dataset.csv",
        }

    all_skills = []
    roles = Counter()
    for row in rows:
        try:
            skills = ast.literal_eval(row.get("extracted_skills", "[]"))
        except (ValueError, SyntaxError):
            skills = []
        all_skills.extend(skills)
        roles[row.get("title", "Unknown")] += 1

    skill_counts = Counter(all_skills)
    top_skills = [{"skill": s, "count": c} for s, c in skill_counts.most_common(20)]
    top_roles = [{"role": r, "count": c} for r, c in roles.most_common(10)]

    return {
        "total_jobs": len(rows),
        "unique_skills": len(skill_counts),
        "top_skill": top_skills[0]["skill"] if top_skills else None,
        "top_job_role": top_roles[0]["role"] if top_roles else None,
        "top_skills": top_skills,
        "jobs_by_role": top_roles,
    }
from collections import Counter
from .skill_taxonomy import skill_category

def get_skills_for_role(role_query: str, top_n: int = 15):
    rows = _load_rows()
    role_query_lower = role_query.strip().lower()
    matched = [r for r in rows if role_query_lower in r.get("title", "").lower()]

    if not matched:
        return {"role": role_query, "matched_postings": 0, "skills": []}

    all_skills = []
    for row in matched:
        try:
            skills = ast.literal_eval(row.get("extracted_skills", "[]"))
        except (ValueError, SyntaxError):
            skills = []
        all_skills.extend(skills)

    counts = Counter(all_skills)
    top = counts.most_common(top_n)
    return {
        "role": role_query,
        "matched_postings": len(matched),
        "skills": [{"skill": s, "count": c, "category": skill_category(s)} for s, c in top],
    }
