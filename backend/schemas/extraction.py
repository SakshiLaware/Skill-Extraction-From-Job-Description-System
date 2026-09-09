from pydantic import BaseModel
from typing import Optional


class ExtractRequest(BaseModel):
    job_description: str


class SkillItem(BaseModel):
    skill: str
    category: str


class ExtractResponse(BaseModel):
    skills: list[SkillItem]
    method: str
    processing_time_ms: Optional[float] = None


class CompareRequest(BaseModel):
    job_description: str


class MethodResult(BaseModel):
    method: str
    skills: list[SkillItem]
    processing_time_ms: Optional[float] = None
    available: Optional[bool] = True
    error: Optional[str] = None


class CompareResponse(BaseModel):
    results: list[MethodResult]
