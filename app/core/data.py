"""
Portfolio and Academic Data Repository for Utkarsh Bhardwaj.
Authentic profile: Backend Software Engineer (NIQ, ex-AgBe, ex-Timeli)
and Graduate School Aspirant (Prospective MS / Ph.D. in Computer Science).
"""

from typing import Dict, List, Any

PROFILE: Dict[str, Any] = {
    "name": "Utkarsh Bhardwaj",
    "headline": "Software Engineer & Aspiring Graduate Student",
    "subheadline": "Distributed Systems · Backend Architecture · Cloud Workflows",
    "current_role": "Solution Specialist Engineer @ NielsenIQ (NIQ)",
    "current_team": "Global Innovation Team",
    "current_since": "June 2026 – Present",
    "location": "Gurugram / Delhi-NCR, India",
    "email": "utkarshbhardwajmail@gmail.com",
    "github": "https://github.com/utkkkarshhh",
    "github_handle": "utkkkarshhh",
    "linkedin": "https://linkedin.com/in/utkkkarshhh",
    "linkedin_handle": "in/utkkkarshhh",
    "portfolio_url": "https://utkarshbhardwaj.vercel.app",
    "resume_url": "https://drive.google.com/file/d/1_yizJ-QjzE6gpMkDUGLJBd_L6o3EyAtu/view?usp=sharing",
    "avatar_url": "/static/img/utkarsh-img.png",
    "about_text": (
        "I am a Backend Software Engineer currently working with the Global Innovation Team at NielsenIQ (NIQ). "
        "Previously, I spent two years building scalable, event-driven backend systems at AgBe Technologies for "
        "enterprise platforms like TVS Motor Company, and interned at US-based startup Timeli LLC.\n\n"
        "I hold a Master of Computer Applications (MCA) from Ganga Institute of Technology and Management (2022–2024) "
        "and a Bachelor of Computer Applications (BCA) from Maharshi Dayanand University (2019–2022). "
        "Alongside my engineering career, I am an aspirant preparing applications for Master's and Ph.D. programs in "
        "Computer Science, with keen academic interests in Distributed Systems, Concurrency, and Resilient Backend Infrastructure."
    ),
    "aspirations_statement": (
        "Having designed and maintained high-throughput production data pipelines processing millions of transactions in industry, "
        "I have developed a strong appreciation for the fundamental mechanics of distributed coordination, asynchronous runtimes, "
        "and systems reliability. I aspire to pursue graduate studies (MS / Ph.D.) to deepen my theoretical foundations and contribute "
        "to research in distributed systems, consensus mechanisms, and high-performance computing."
    )
}

EDUCATION: List[Dict[str, Any]] = [
    {
        "degree": "Master of Computer Applications (MCA)",
        "institution": "Ganga Institute of Technology and Management",
        "university": "Maharshi Dayanand University",
        "location": "Jhajjar, Haryana, India",
        "period": "September 2022 – July 2024",
        "courses": [
            "Data Structures and Algorithms",
            "Computer Architecture",
            "Object-Oriented Programming using Java",
            "Computer Graphics",
            "Web Development"
        ],
        "major_projects": [
            {
                "title": "Decentralized Election: Ethereum-Based BFT Voting Protocol",
                "type": "MCA 1st Year Major Project",
                "slug": "decentralized-election",
                "report_pdf": "/static/docs/mca-1st-year-project-report.pdf",
                "pages": 63
            },
            {
                "title": "Multithreaded Task Scheduler & Visualizer",
                "type": "MCA 2nd Year Major Project",
                "slug": "multithreaded-scheduler",
                "report_pdf": "/static/docs/mca-2nd-year-project-report.pdf",
                "pages": 56
            }
        ]
    },
    {
        "degree": "Bachelor of Computer Applications (BCA)",
        "institution": "Maharshi Dayanand University",
        "location": "Rohtak, Haryana, India",
        "period": "September 2019 – June 2022",
        "courses": [
            "Data Structures and Algorithms",
            "Operating Systems",
            "Database Management Systems",
            "Object-Oriented Programming",
            "Web Designing",
            "Software Engineering"
        ],
        "major_projects": []
    }
]

EXPERIENCE: List[Dict[str, Any]] = [
    {
        "role": "Solution Specialist Engineer",
        "company": "NielsenIQ (NIQ)",
        "team": "Global Innovation Team",
        "period": "June 8, 2026 – Present",
        "location": "Gurugram, India (Remote)",
        "summary": "Engineering scalable backend services, event-driven data pipelines, and leading application modernization initiatives within the Global Innovation Team at NIQ.",
        "achievements": [
            "Spearheading the architecture modernization of an enterprise learning & milestone platform (used globally by all NIQ employees, clients, and customers) migrating from a legacy Django monolith to a high-performance FastAPI backend with an HTMX-driven dynamic frontend.",
            "Operating in a lean, high-velocity 2-engineer modernization pod alongside senior engineering leadership, owning full-lifecycle greenfield service design while concurrently maintaining live production stability and user milestones.",
            "Architected backend services for a consolidated Out-of-System (OOS) platform, migrating and centralizing multiple standalone OOS tools into a unified, high-availability portal.",
            "Built and orchestrated resilient data pipelines using Dagster, managing large-scale data workflows and seamless read/write interactions with Azure Blob Storage on Azure cloud infrastructure.",
            "Implemented end-to-end observability, telemetry, and system metric scraping using Prometheus and Grafana for real-time performance and pipeline health monitoring.",
            "Owned deployment, operational maintenance, and feature enhancements for mission-critical legacy Out-of-System (OOS) tools hosted on remote Windows Server environments interfacing with on-premises enterprise relational databases."
        ]
    },
    {
        "role": "Software Engineer (Full-Time)",
        "company": "AgBe Technologies",
        "client": "Client: TVS Motor Company",
        "period": "July 2024 – May 29, 2026",
        "location": "Gurugram, Haryana (Hybrid)",
        "summary": "Core backend engineering delivering reliable, high-scale services and automated data workflows for TVS Motor production platforms.",
        "achievements": [
            "Built a high-throughput coupon generation pipeline using Python, Django, and PostgreSQL, processing 5M+ records via batched workflows and improving write throughput by 35% through query and indexing optimizations.",
            "Designed event-driven ingestion services on Azure using Event Grid and multi-blob triggers for MotoConnect (200K users), enabling near real-time processing and reducing manual file handling across the pipeline.",
            "Architected an event-driven ingestion platform using Azure Event Hubs and FastAPI, owning producer-consumer design, checkpointing, and containerized deployments, enabling reliable event processing across services.",
            "Implemented scalable invoice incentive processing pipelines consuming data from TVS POMS, reducing manual reconciliation overhead and improving financial processing turnaround time by 45%.",
            "Engineered a resilient job-card ingestion and sync pipeline from DMS for TruChamp (300K users, 35K DAU), improving cross-system data consistency and strengthening downstream service reliability."
        ]
    },
    {
        "role": "Software Engineer Intern",
        "company": "Timeli LLC",
        "client": "",
        "period": "January 2023 – June 2023",
        "location": "Remote (United States)",
        "summary": "Full-stack development for applicant sourcing and HR management SaaS platform.",
        "achievements": [
            "Contributed to development of an applicant-pool and HR sourcing platform using the MERN stack (MongoDB, Express, React, Node.js), supporting MVP launch and onboarding 1K+ job applicants and HR users.",
            "Designed MongoDB schemas and built RESTful Express APIs for candidate lifecycle management, improving data retrieval efficiency and enabling scalable applicant workflows.",
            "Developed responsive React dashboards with advanced search and filtering, reducing recruiter candidate discovery time by 40% during internal testing."
        ]
    }
]

PROJECTS: List[Dict[str, Any]] = [
    {
        "slug": "decentralized-election",
        "name": "Decentralized Election: Ethereum-Based BFT Voting Protocol",
        "category": "Academic Project (MCA 1st Year Major)",
        "academic_tag": "MCA 1st Year Major Project",
        "has_report": True,
        "has_thesis": True,
        "report_title": "Decentralized Election: Ethereum-Based BFT Voting Protocol (Project Report)",
        "report_pdf": "/static/docs/mca-1st-year-project-report.pdf",
        "report_pages": 63,
        "summary": "A decentralized voting application built on Ethereum smart contracts to ensure transparent, immutable, and tamper-resistant election processes.",
        "problem": "Traditional electronic voting systems introduce single points of failure, vulnerable databases, and opaque centralized audit logs that undermine voter trust.",
        "architecture": "Implemented using Solidity smart contracts deployed on Ethereum. Utilizes deterministic state transitions, cryptographic keypair authorization for voter registration, and on-chain vote counting to guarantee ballot immutability. Interfaced with a React.js client via Web3.js.",
        "tech_stack": ["Solidity", "Ethereum", "Web3.js", "React.js", "Node.js", "Truffle"],
        "highlights": [
            "Enforces one-person-one-vote invariant via cryptographically hashed voter registry",
            "Eliminates central ballot tallying authority through automated smart contract execution",
            "Provides public, verifiable election audit trails on the blockchain ledger",
            "Complete 63-page academic major project report embedded"
        ],
        "github": "https://github.com/utkkkarshhh/ghost-mail",
        "demo": "https://ghost-mail.vercel.app/"
    },
    {
        "slug": "multithreaded-scheduler",
        "name": "Multithreaded Task Scheduler & Scheduling Visualizer",
        "category": "Academic Project (MCA 2nd Year Major)",
        "academic_tag": "MCA 2nd Year Major Project",
        "has_report": True,
        "has_thesis": True,
        "report_title": "Performance Optimization and Concurrency Control in Multithreaded Task Scheduling Systems (Project Report)",
        "report_pdf": "/static/docs/mca-2nd-year-project-report.pdf",
        "report_pages": 56,
        "summary": "A real-time task orchestration, prioritization, and visualization platform designed to model and monitor concurrent workloads with low latency.",
        "problem": "Unmanaged thread creation causes severe context-switching overhead and CPU contention. Efficient systems require structured thread pools, priority queues, and real-time visualization of task states.",
        "architecture": "Built with Core Java concurrency mechanisms and modernized with a FastAPI & Redis task queuing visualizer. Implemented priority-based bulk task dispatching, thread-safe blocking queues, and WebSocket connections for streaming execution metrics to a React dashboard.",
        "tech_stack": ["Core Java", "FastAPI", "Python", "Redis", "React.js", "WebSockets"],
        "highlights": [
            "Achieved 35% faster task throughput under high-concurrency simulation scenarios",
            "Implemented priority-based task dispatching with worker thread pool management",
            "Live monitoring of thousands of concurrent simulated workloads via WebSockets",
            "Complete 56-page MCA final major project report embedded"
        ],
        "github": "https://github.com/utkkkarshhh/ghost-mail",
        "demo": ""
    },
    {
        "slug": "docuvault",
        "name": "DocuVault: Distributed Document Management Platform",
        "category": "Systems & Distributed Storage",
        "academic_tag": "Production Systems Design",
        "has_report": False,
        "has_thesis": False,
        "report_title": "",
        "report_pdf": "",
        "report_pages": 0,
        "summary": "A secure, distributed document management platform featuring asynchronous processing, background conversion pipelines, and decoupled microservices.",
        "problem": "Handling compute-intensive document conversions (PDF/OCR/parsing) synchronously blocks web workers and degrades user-facing API responsiveness under high upload volume.",
        "architecture": "Architected using Django and Celery for distributed asynchronous job processing with Redis as the broker. Isolated document conversion workloads into dedicated microservices, reducing synchronous endpoint latency and ensuring fault isolation.",
        "tech_stack": ["Python", "Django", "Celery", "Redis", "PostgreSQL", "Docker"],
        "highlights": [
            "Improved document handling throughput by 2X under peak concurrent load",
            "Designed a scalable document conversion pipeline that reduced synchronous API latency by 60%",
            "Architected a dedicated document management microservice for fault isolation across services"
        ],
        "github": "https://github.com/utkkkarshhh",
        "demo": ""
    },
    {
        "slug": "url-shortener",
        "name": "Distributed URL Shortener (Systems Design Project)",
        "category": "Systems & Distributed Storage",
        "academic_tag": "Systems Design Project",
        "has_report": False,
        "has_thesis": False,
        "report_title": "",
        "report_pdf": "",
        "report_pages": 0,
        "er_diagram": "/static/img/projects/url-shortener-er-diagram.png",
        "summary": "High-throughput distributed URL shortening service built with FastAPI, Docker, and DynamoDB demonstrating collision-resistant ID generation, database indexing, and low-latency redirects.",
        "problem": "High read-to-write ratios (100:1), unique alphanumeric key collisions, and redirect latency demand efficient database key mapping, custom aliases, and expiration management.",
        "architecture": "Engineered with FastAPI, Docker, and DynamoDB (using AWS NoSQL Workbench). Generates 10-digit alphanumeric unique IDs mapped in a dedicated url_mapping table, with duplicate URL deduplication, TTL expiration enforcement, and fast lookup endpoints.",
        "tech_stack": ["FastAPI", "Docker", "DynamoDB", "Python", "REST APIs", "System Design"],
        "highlights": [
            "10-digit alphanumeric collision-resistant key generation with optional custom alias",
            "DynamoDB key-value schema optimized for single-digit millisecond redirect lookups",
            "Complete system architectural documentation and ER Diagram embedded",
            "URL deduplication policy preventing duplicate short-link creation for identical active targets"
        ],
        "github": "https://github.com/utkkkarshhh",
        "demo": ""
    }
]

SKILLS: Dict[str, List[str]] = {
    "Technical Skills": ["Python", "JavaScript (ES6)", "Core Java", "HTML5", "CSS3", "SQL"],
    "Frameworks & Libraries": ["FastAPI", "HTMX", "Django", "Django REST Framework (DRF)", "Dagster", "Node.js", "Express.js", "React.js", "Celery"],
    "Databases & Caching": ["PostgreSQL", "Redis", "DynamoDB", "MongoDB", "Firebase"],
    "Cloud & DevOps": ["Azure Event Hubs", "Azure Event Grid", "Azure Functions", "Azure Blob Storage", "Azure Kubernetes Service (AKS)", "Docker", "Windows Server (On-Prem DBs)"],
    "Developer Tools & Observability": ["Prometheus", "Grafana", "Git & GitHub", "Linux / Bash", "Postman", "Swagger", "JMeter", "Truffle Suite"],
    "Core Concepts": ["System Design", "Distributed Systems", "Object-Oriented Programming (OOP)", "RESTful APIs", "Microservices", "Concurrency & Threading", "SOLID Principles", "SDLC"]
}

RESEARCH_INTERESTS: List[Dict[str, str]] = [
    {
        "topic": "Distributed Systems & Consensus",
        "description": "Fault tolerance, replication strategies (Paxos, Raft, PBFT variants), partition tolerance, and consistency models under network latency."
    },
    {
        "topic": "Concurrency & Asynchronous Runtimes",
        "description": "Event-loop mechanics, coroutine scheduling, thread-pool optimization, and non-blocking I/O multiplexing in high-throughput backends."
    },
    {
        "topic": "Resilient Data Infrastructure",
        "description": "Event-driven stream ingestion (Event Hubs, Kafka), distributed caching topologies (Redis), and transactional database optimizations."
    }
]
