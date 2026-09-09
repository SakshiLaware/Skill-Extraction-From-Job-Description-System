from fastapi import APIRouter, HTTPException
from schemas.extraction import ExtractRequest, ExtractResponse, CompareRequest, CompareResponse
from services.extraction_service import run_dictionary, run_regex, run_comparison

router = APIRouter(prefix="/api", tags=["extraction"])


@router.post("/extract", response_model=ExtractResponse)
def extract(payload: ExtractRequest):
    if not payload.job_description or not payload.job_description.strip():
        raise HTTPException(status_code=400, detail="job_description must not be empty")

    result = run_dictionary(payload.job_description)
    return ExtractResponse(
        skills=result["skills"],
        method="dictionary",
        processing_time_ms=result["processing_time_ms"],
    )


@router.post("/compare", response_model=CompareResponse)
def compare(payload: CompareRequest):
    if not payload.job_description or not payload.job_description.strip():
        raise HTTPException(status_code=400, detail="job_description must not be empty")

    results = run_comparison(payload.job_description)
    return CompareResponse(results=results)