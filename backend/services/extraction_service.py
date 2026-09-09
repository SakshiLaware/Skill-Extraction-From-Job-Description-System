"""
Core extraction service. Wraps Dictionary, Regex, NER, and Transformer
methods so /extract and /compare endpoints reuse identical logic.
"""
import time
from .skill_taxonomy import (
    extract_skills_dictionary,
    extract_skills_regex,
    skills_with_categories,
    SKILL_TAXONOMY,
    normalize_skill,
)

# ---------- Dictionary ----------
def run_dictionary(text: str):
    t0 = time.perf_counter()
    skills = extract_skills_dictionary(text)
    elapsed_ms = (time.perf_counter() - t0) * 1000
    return {"method": "dictionary", "skills": skills_with_categories(skills),
            "processing_time_ms": round(elapsed_ms, 3), "available": True, "error": None}


# ---------- Regex ----------
def run_regex(text: str):
    t0 = time.perf_counter()
    skills = extract_skills_regex(text)
    elapsed_ms = (time.perf_counter() - t0) * 1000
    return {"method": "regex", "skills": skills_with_categories(skills),
            "processing_time_ms": round(elapsed_ms, 3), "available": True, "error": None}


# ---------- NER (spaCy) — loaded once, lazily, on first use ----------
_nlp_ner = None
_taxonomy_lower_map = None

def _get_ner_model():
    global _nlp_ner, _taxonomy_lower_map
    if _nlp_ner is None:
        import spacy
        _nlp_ner = spacy.load("en_core_web_sm")
        _taxonomy_lower_map = {}
        for skill, info in SKILL_TAXONOMY.items():
            _taxonomy_lower_map[skill.lower()] = skill
            for a in info["aliases"]:
                _taxonomy_lower_map[a.lower()] = skill
    return _nlp_ner, _taxonomy_lower_map


def run_ner(text: str):
    try:
        nlp, taxonomy_lower_map = _get_ner_model()
    except (ImportError, OSError) as e:
        return {"method": "ner", "skills": [], "processing_time_ms": None,
                "available": False, "error": f"spaCy not set up: {e}"}

    t0 = time.perf_counter()
    doc = nlp(text)
    found = set()
    for ent in doc.ents:
        key = ent.text.lower().strip()
        if key in taxonomy_lower_map:
            found.add(taxonomy_lower_map[key])
    found |= set(extract_skills_dictionary(text))  # supplement -- general NER alone misses most tech terms
    elapsed_ms = (time.perf_counter() - t0) * 1000
    return {"method": "ner", "skills": skills_with_categories(sorted(found)),
            "processing_time_ms": round(elapsed_ms, 3), "available": True, "error": None}


# ---------- Transformer (Hugging Face) — loaded once, lazily, on first use ----------
_ner_pipe = None

def _get_transformer_pipeline():
    global _ner_pipe
    if _ner_pipe is None:
        from transformers import pipeline
        _ner_pipe = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
    return _ner_pipe


def run_transformer(text: str):
    try:
        pipe = _get_transformer_pipeline()
        _, taxonomy_lower_map = _get_ner_model()  # reuse taxonomy map, loads spaCy too if not already
    except ImportError as e:
        return {"method": "transformer", "skills": [], "processing_time_ms": None,
                "available": False, "error": f"transformers/torch not installed: {e}"}

    t0 = time.perf_counter()
    ents = pipe(text[:512])  # truncate -- model has a token limit
    found = set()
    for e in ents:
        key = e["word"].lower().strip()
        if key in taxonomy_lower_map:
            found.add(taxonomy_lower_map[key])
    found |= set(extract_skills_dictionary(text))  # supplement -- same reasoning as NER
    elapsed_ms = (time.perf_counter() - t0) * 1000
    return {"method": "transformer", "skills": skills_with_categories(sorted(found)),
            "processing_time_ms": round(elapsed_ms, 3), "available": True, "error": None}


def run_comparison(text: str):
    """Run every method available on this backend instance."""
    return [run_dictionary(text), run_regex(text), run_ner(text), run_transformer(text)]