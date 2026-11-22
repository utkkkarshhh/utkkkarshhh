import pytest

class TestPortfolioApplication:

    def test_health_check(self, client):
        response = client.get("/api/Healthcheck")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "message" in data

    def test_home_page_ssr(self, client):
        response = client.get("/")
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
        assert "Utkarsh Bhardwaj" in response.text
        assert "NielsenIQ" in response.text
        assert "AgBe Technologies" in response.text
        assert "Master of Computer Applications" in response.text

    def test_home_page_htmx(self, client):
        response = client.get("/", headers={"HX-Request": "true", "HX-Target": "main-content"})
        assert response.status_code == 200
        assert "intro-card" in response.text
        assert "<!DOCTYPE html>" not in response.text

    def test_experience_page(self, client):
        res = client.get("/experience")
        assert res.status_code == 200
        assert "NielsenIQ" in res.text
        assert "Global Innovation Team" in res.text
        assert "FastAPI" in res.text
        assert "HTMX" in res.text
        assert "Dagster" in res.text
        assert "Prometheus" in res.text
        assert "Grafana" in res.text
        assert "AgBe Technologies" in res.text
        assert "TVS Motor Company" in res.text
        assert "Timeli LLC" in res.text

    def test_projects_page(self, client):
        res = client.get("/projects")
        assert res.status_code == 200
        # Check all 4 exact projects
        assert "Decentralized Election: Ethereum-Based BFT Voting Protocol" in res.text
        assert "Multithreaded Task Scheduler" in res.text
        assert "DocuVault: Distributed Document Management Platform" in res.text
        assert "Distributed URL Shortener (Systems Design Project)" in res.text

    def test_project_modals(self, client):
        for slug in ["decentralized-election", "multithreaded-scheduler", "docuvault", "url-shortener"]:
            res = client.get(f"/projects/{slug}")
            assert res.status_code == 200
            assert "modal-window" in res.text

        # 404 for invalid project
        res_404 = client.get("/projects/non-existent-project")
        assert res_404.status_code == 404

    def test_report_modal(self, client):
        # MCA 1st Year Major Project Report
        res_dapp = client.get("/projects/decentralized-election/report")
        assert res_dapp.status_code == 200
        assert "Project Report" in res_dapp.text
        assert "Master of Computer Applications" in res_dapp.text
        assert "mca-1st-year-project-report.pdf" in res_dapp.text

        # MCA 2nd Year Major Project Report
        res_sched = client.get("/projects/multithreaded-scheduler/report")
        assert res_sched.status_code == 200
        assert "Project Report" in res_sched.text
        assert "Task Scheduling" in res_sched.text
        assert "mca-2nd-year-project-report.pdf" in res_sched.text

        # Compatibility alias route /thesis
        res_alias = client.get("/projects/decentralized-election/thesis")
        assert res_alias.status_code == 200
        assert "Project Report" in res_alias.text

        # 404 for project without report
        res_no_report = client.get("/projects/docuvault/report")
        assert res_no_report.status_code == 404

    def test_education_page(self, client):
        res = client.get("/education")
        assert res.status_code == 200
        assert "Master of Computer Applications" in res.text
        assert "Ganga Institute of Technology and Management" in res.text
        assert "Bachelor of Computer Applications" in res.text
        assert "Maharshi Dayanand University" in res.text

    def test_skills_page(self, client):
        res = client.get("/skills")
        assert res.status_code == 200
        assert "Technical Skills" in res.text
        assert "Frameworks" in res.text
        assert "Databases" in res.text
        assert "Cloud" in res.text
        assert "Python" in res.text
        assert "Django" in res.text
        assert "FastAPI" in res.text

    def test_contact_submission(self, client):
        res = client.get("/contact")
        assert res.status_code == 200
        assert "Send a Message" in res.text

        # Submit form
        payload = "name=Dr.+Alan+Smith&email=asmith@univ.edu&subject=Graduate+Admissions&message=Interested+in+discussing+distributed+systems."
        res_post = client.post(
            "/contact",
            content=payload,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        assert res_post.status_code == 200
        assert "Message Sent Successfully" in res_post.text
        assert "Dr. Alan Smith" in res_post.text

    def test_static_assets(self, client):
        res_css = client.get("/static/css/style.css")
        assert res_css.status_code == 200
        assert "--accent" in res_css.text

        res_js = client.get("/static/js/main.js")
        assert res_js.status_code == 200
        assert "toggleTheme" in res_js.text

        res_fav = client.get("/favicon.ico")
        assert res_fav.status_code == 200

        res_pdf1 = client.get("/static/docs/mca-1st-year-project-report.pdf")
        assert res_pdf1.status_code == 200
        assert len(res_pdf1.content) > 100000

        res_pdf2 = client.get("/static/docs/mca-2nd-year-project-report.pdf")
        assert res_pdf2.status_code == 200
        assert len(res_pdf2.content) > 100000

        res_diag = client.get("/static/img/projects/url-shortener-er-diagram.png")
        assert res_diag.status_code == 200
        assert len(res_diag.content) > 1000
