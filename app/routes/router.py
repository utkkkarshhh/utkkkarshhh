import urllib.parse
from typing import Optional
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.core.config import settings
from app.core.data import (
    PROFILE,
    EDUCATION,
    EXPERIENCE,
    PROJECTS,
    SKILLS,
    RESEARCH_INTERESTS,
)

router = APIRouter()
templates = Jinja2Templates(directory=str(settings.TEMPLATES_DIR))


def is_htmx(request: Request) -> bool:
    return request.headers.get("HX-Request", "").lower() == "true"


async def get_form_data(request: Request) -> dict:
    body = await request.body()
    decoded = body.decode("utf-8", errors="replace")
    parsed = urllib.parse.parse_qs(decoded)
    return {k: v[0] if len(v) == 1 else v for k, v in parsed.items()}


@router.get("/Healthcheck")
async def healthcheck():
    from app.managers.healthcheck_manager import HealthcheckManager
    return await HealthcheckManager.get_health_status()


@router.get("/", response_class=HTMLResponse)
async def page_about(request: Request):
    context = {
        "profile": PROFILE,
        "active_tab": "about",
        "experience": EXPERIENCE,
        "education": EDUCATION,
        "projects": PROJECTS,
        "skills": SKILLS,
        "research_interests": RESEARCH_INTERESTS,
    }
    if is_htmx(request) and request.headers.get("HX-Target") == "main-content":
        return templates.TemplateResponse(request=request, name="partials/overview.html", context=context)
    return templates.TemplateResponse(request=request, name="index.html", context=context)


@router.get("/experience", response_class=HTMLResponse)
async def page_experience(request: Request):
    context = {
        "profile": PROFILE,
        "active_tab": "experience",
        "experience": EXPERIENCE,
    }
    if is_htmx(request) and request.headers.get("HX-Target") == "main-content":
        return templates.TemplateResponse(request=request, name="partials/experience.html", context=context)
    return templates.TemplateResponse(request=request, name="index.html", context=context)


@router.get("/projects", response_class=HTMLResponse)
async def page_projects(request: Request):
    context = {
        "profile": PROFILE,
        "active_tab": "projects",
        "projects": PROJECTS,
    }
    if is_htmx(request) and request.headers.get("HX-Target") == "main-content":
        return templates.TemplateResponse(request=request, name="partials/projects.html", context=context)
    return templates.TemplateResponse(request=request, name="index.html", context=context)


@router.get("/projects/{slug}", response_class=HTMLResponse)
async def get_project_modal(request: Request, slug: str):
    project = next((p for p in PROJECTS if p["slug"] == slug), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return templates.TemplateResponse(
        request=request,
        name="partials/project_modal.html",
        context={"project": project}
    )


@router.get("/projects/{slug}/report", response_class=HTMLResponse)
@router.get("/projects/{slug}/thesis", response_class=HTMLResponse)
async def get_report_modal(request: Request, slug: str):
    project = next((p for p in PROJECTS if p["slug"] == slug and (p.get("has_report") or p.get("has_thesis"))), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project report not available for this project.")
    
    return templates.TemplateResponse(
        request=request,
        name="partials/report_modal.html",
        context={"project": project, "profile": PROFILE}
    )


@router.get("/education", response_class=HTMLResponse)
async def page_education(request: Request):
    context = {
        "profile": PROFILE,
        "active_tab": "education",
        "education": EDUCATION,
        "research_interests": RESEARCH_INTERESTS,
    }
    if is_htmx(request) and request.headers.get("HX-Target") == "main-content":
        return templates.TemplateResponse(request=request, name="partials/education.html", context=context)
    return templates.TemplateResponse(request=request, name="index.html", context=context)


@router.get("/skills", response_class=HTMLResponse)
async def page_skills(request: Request):
    context = {
        "profile": PROFILE,
        "active_tab": "skills",
        "skills": SKILLS,
    }
    if is_htmx(request) and request.headers.get("HX-Target") == "main-content":
        return templates.TemplateResponse(request=request, name="partials/skills.html", context=context)
    return templates.TemplateResponse(request=request, name="index.html", context=context)


@router.get("/contact", response_class=HTMLResponse)
async def page_contact(request: Request):
    context = {
        "profile": PROFILE,
        "active_tab": "contact",
    }
    if is_htmx(request) and request.headers.get("HX-Target") == "main-content":
        return templates.TemplateResponse(request=request, name="partials/contact.html", context=context)
    return templates.TemplateResponse(request=request, name="index.html", context=context)


@router.post("/contact", response_class=HTMLResponse)
async def submit_contact(request: Request):
    data = await get_form_data(request)
    name = data.get("name", "").strip() or "Guest"
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip() or "General Inquiry"
    message = data.get("message", "").strip()

    return templates.TemplateResponse(
        request=request,
        name="partials/contact_result.html",
        context={
            "name": name,
            "email": email,
            "subject": subject,
            "message": message,
            "success": True
        }
    )
