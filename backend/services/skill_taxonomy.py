"""
Shared skill taxonomy + dictionary/regex extraction logic.
This mirrors notebooks/Skill_Extraction_Complete.ipynb Sections 5, 7, 8, 18
so the backend, notebook, and Power BI dataset all agree on the same
canonical skill names and categories.
"""
import re
import csv
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data")


def load_taxonomy():
    """Load skill_taxonomy.csv produced by the notebook. Falls back to a
    small built-in taxonomy if the notebook hasn't been run yet, so the
    backend can still start standalone."""
    path = os.path.join(DATA_DIR, "processed", "skill_taxonomy.csv")
    taxonomy = {}
    if os.path.exists(path):
        with open(path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                aliases = [a.strip() for a in row["aliases"].split(",") if a.strip()]
                taxonomy[row["skill"]] = {"category": row["category"], "aliases": aliases}
    else:
        taxonomy = {
            "Python": {"category": "Programming Language", "aliases": ["python3", "python 3"]},
            "SQL": {"category": "Database", "aliases": ["structured query language"]},
            "AWS": {"category": "Cloud", "aliases": ["amazon web services"]},
            "Power BI": {"category": "Data Analytics", "aliases": ["powerbi", "power-bi"]},
        }
    return taxonomy


SKILL_TAXONOMY = load_taxonomy()

REGEX_SKILLS = {
    "Python": r"\bpython(?:\s*3)?(?:\s+programming)?\b",
    "Machine Learning": r"\bmachine[\s\-]?learning\b",
    "Deep Learning": r"\bdeep[\s\-]?learning\b",
    "Natural Language Processing": r"\bnatural language processing\b|\bnlp\b",
    "Power BI": r"\bpower[\s\-]?bi\b",
    "Data Science": r"\bdata[\s\-]?science\b",
    "SQL": r"\bsql\b",
    "AWS": r"\baws\b|\bamazon web services\b",
    "Cloud Computing": r"\bcloud computing\b",
    "Computer Vision": r"\bcomputer vision\b",
}
_REGEX_COMPILED = {k: re.compile(v, re.IGNORECASE) for k, v in REGEX_SKILLS.items()}


def _build_pattern_map(taxonomy):
    patterns = {}
    for skill, info in taxonomy.items():
        terms = [skill.lower()] + [a.lower() for a in info["aliases"]]
        patterns[skill] = [
            re.compile(r"(?<![a-zA-Z0-9])" + re.escape(t) + r"(?![a-zA-Z0-9])") for t in terms
        ]
    return patterns


_PATTERN_MAP = _build_pattern_map(SKILL_TAXONOMY)

_ALIAS_TO_CANONICAL = {}
for _skill, _info in SKILL_TAXONOMY.items():
    _ALIAS_TO_CANONICAL[_skill.lower()] = _skill
    for _a in _info["aliases"]:
        _ALIAS_TO_CANONICAL[_a.lower()] = _skill


def normalize_skill(raw_skill: str) -> str:
    key = re.sub(r"[^a-z0-9\s]", "", raw_skill.lower()).strip()
    return _ALIAS_TO_CANONICAL.get(key, raw_skill)


def extract_skills_dictionary(text: str):
    text = (text or "").lower()
    found = set()
    for skill, patterns in _PATTERN_MAP.items():
        for p in patterns:
            if p.search(text):
                found.add(skill)
                break
    return sorted(found)


def extract_skills_regex(text: str):
    text = text or ""
    return sorted([skill for skill, pat in _REGEX_COMPILED.items() if pat.search(text)])


def skill_category(skill: str) -> str:
    return SKILL_TAXONOMY.get(skill, {}).get("category", "Other")


def skills_with_categories(skills):
    return [{"skill": s, "category": skill_category(s)} for s in skills]
