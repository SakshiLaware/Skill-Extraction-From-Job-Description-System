from fastapi import APIRouter
from services.analytics_service import get_analytics

router = APIRouter(prefix="/api", tags=["analytics"])


@router.get("/analytics")
def analytics():
    return get_analytics()
