import sys
from pathlib import Path
import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.core.config import settings
from app.routes.router import router

sys.dont_write_bytecode = True

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Utkarsh Bhardwaj - Systems Engineer & CS Researcher Portfolio"
)

# Ensure static directories exist
settings.STATIC_DIR.mkdir(parents=True, exist_ok=True)

# Mount static assets
app.mount("/static", StaticFiles(directory=str(settings.STATIC_DIR)), name="static")

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    fav_path = settings.STATIC_DIR / "favicon.jpg"
    if fav_path.exists():
        return FileResponse(fav_path)
    return FileResponse(settings.STATIC_DIR / "img" / "utkarsh-logo.jpg")

# Include main router
app.include_router(router)
# Include with prefix /api so existing boilerplate tests like /api/Healthcheck continue working seamlessly
app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
