#!/usr/bin/env python3
"""
Problem Statement Cost Estimator
Evaluates a project scope or problem statement, breaks it down into technical components,
estimates hours, infrastructure costs, and risk multipliers, and calculates the total solution cost.
"""

import os
import sys
import json
import argparse
from typing import List, Optional
from pydantic import BaseModel, Field
import ollama
import httpx
from rich.console import Console
from rich.table import Table
from rich.panel import Panel

console = Console()

class TaskItem(BaseModel):
    category: str = Field(description="Category: Frontend, Backend, Database/Data, AI/ML, DevOps, QA, or Project Management")
    task_name: str = Field(description="Clear title of the feature or technical task")
    description: str = Field(description="Brief explanation of work involved")
    estimated_hours: float = Field(description="Estimated engineering hours to complete this task")
    hourly_rate: float = Field(default=1500.0, description="Standard hourly rate in INR (₹)")

class ProjectCostEstimate(BaseModel):
    project_title: str = Field(description="Concise, descriptive project name")
    executive_summary: str = Field(description="2-3 sentence overview of the technical solution")
    complexity_level: str = Field(description="Low, Medium, High, or Enterprise")
    delivery_timeline_weeks: int = Field(description="Estimated calendar weeks from kickoff to production delivery")
    tasks: List[TaskItem] = Field(description="Detailed breakdown of tasks across disciplines")
    monthly_infrastructure_cost: float = Field(description="Estimated monthly hosting, cloud, and DB costs in INR (₹)")
    contingency_percentage: float = Field(default=15.0, description="Contingency buffer for scope creep / risks (e.g. 15%)")
    key_assumptions: List[str] = Field(description="Core technical assumptions made during estimation")
    risk_factors: List[str] = Field(description="Technical or operational risks that could affect timeline or cost")

    @property
    def total_labor_hours(self) -> float:
        return sum(t.estimated_hours for t in self.tasks)

    @property
    def total_labor_cost(self) -> float:
        return sum(t.estimated_hours * t.hourly_rate for t in self.tasks)

    @property
    def contingency_cost(self) -> float:
        return self.total_labor_cost * (self.contingency_percentage / 100.0)

    @property
    def annual_infrastructure_cost(self) -> float:
        return self.monthly_infrastructure_cost * 12.0

    @property
    def total_solution_cost(self) -> float:
        return self.total_labor_cost + self.contingency_cost + self.annual_infrastructure_cost


def resolve_file_path(file_path: str) -> str:
    """Finds file across common project and user directories."""
    candidates = [
        file_path,
        os.path.expanduser(file_path),
        os.path.join(os.getcwd(), file_path),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), file_path),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "samples", file_path),
        os.path.join("/home/gurshaan", file_path),
        os.path.join("/home/gurshaan/.gemini/antigravity/scratch/ai_evaluation_engine", file_path),
        os.path.join("/home/gurshaan/.gemini/antigravity/scratch/SIH_website-main", file_path),
    ]
    for c in candidates:
        if os.path.exists(c) and os.path.isfile(c):
            return c
    return file_path


def get_mock_estimate(problem_statement: str, default_rate: float) -> ProjectCostEstimate:
    """Returns a tailored structured estimate for demo/testing when Ollama is offline or testing."""
    lowered = problem_statement.lower()

    if any(k in lowered for k in ["drone", "traffic", "pothole", "mapping", "uav", "road"]):
        return ProjectCostEstimate(
            project_title="AeroCivic - Drone Traffic Monitoring & Pothole Mapping System",
            executive_summary="An aerial surveillance and computer vision platform utilizing autonomous drones to detect traffic congestion, map urban road corridors, and identify asphalt potholes with GIS geotagging.",
            complexity_level="High",
            delivery_timeline_weeks=12,
            tasks=[
                TaskItem(
                    category="Frontend / UI",
                    task_name="Traffic Monitoring & Aerial Map Dashboard",
                    description="Real-time web control room displaying drone video streams, interactive map layer with live traffic bottlenecks, and geotagged pothole markers.",
                    estimated_hours=80.0,
                    hourly_rate=default_rate
                ),
                TaskItem(
                    category="Backend & Video",
                    task_name="UAV Telemetry Ingestion & Video Stream Engine",
                    description="High-throughput WebRTC / RTSP live stream processor, MavLink drone telemetry receiver, and Redis event bus.",
                    estimated_hours=105.0,
                    hourly_rate=default_rate
                ),
                TaskItem(
                    category="AI / ML",
                    task_name="Pothole & Traffic Defect YOLOv8 Computer Vision Pipeline",
                    description="Custom edge-deployable deep learning object detector for asphalt cracks, road potholes, and vehicular density tracking.",
                    estimated_hours=115.0,
                    hourly_rate=default_rate
                ),
                TaskItem(
                    category="GIS / Mapping",
                    task_name="Orthomosaic Aerial Stitching & Map Tile Pipeline",
                    description="Automated photogrammetry image stitching, geo-referencing, and WMS/GeoJSON export for city municipal GIS platforms.",
                    estimated_hours=90.0,
                    hourly_rate=default_rate
                ),
                TaskItem(
                    category="Embedded & Drone",
                    task_name="Drone Companion Computer (Jetson) & MavLink Bridge",
                    description="ROS2/MavROS communications node on drone onboard computer for autonomous route triggers and edge defect filtering.",
                    estimated_hours=75.0,
                    hourly_rate=default_rate
                ),
                TaskItem(
                    category="DevOps / Cloud",
                    task_name="Containerized Microservices & GPU Cloud Pipeline",
                    description="Dockerized processing workers, PostgreSQL/PostGIS spatial database, CI/CD pipeline, and cloud deployment.",
                    estimated_hours=65.0,
                    hourly_rate=default_rate
                ),
                TaskItem(
                    category="QA & Safety",
                    task_name="Flight Safety Trials, GPS Accuracy & Civil Compliance Audit",
                    description="End-to-end field testing, fail-safe return-to-home verification, sub-meter GPS calibration, and security audit.",
                    estimated_hours=70.0,
                    hourly_rate=default_rate
                )
            ],
            monthly_infrastructure_cost=35000.0,
            contingency_percentage=15.0,
            key_assumptions=[
                "Drones utilize standard MavLink protocol with RTK GPS for sub-meter geotagging.",
                "Live video streams are downsampled to 1080p 30fps for real-time edge/cloud inference.",
                "Local municipal GIS servers support standard WMS/GeoJSON layer overlays."
            ],
            risk_factors=[
                "High ambient solar glare affecting camera contrast during midday pothole scans.",
                "Cellular 4G/5G video stream latency in high-density urban canyons.",
                "DGCA flight corridor restrictions requiring geofenced waypoint automation."
            ]
        )

    # Default / General project estimate
    return ProjectCostEstimate(
        project_title="SmartLogistics - Real-time Warehouse & Dispatch Platform",
        executive_summary="An end-to-end industrial IoT and dispatch management system with real-time tablet interfaces, automated SAP ERP reconciliation, and high-throughput event ingestion.",
        complexity_level="High",
        delivery_timeline_weeks=14,
        tasks=[
            TaskItem(
                category="Frontend / UI",
                task_name="Warehouse Floor Tablet App (PWA)",
                description="Responsive offline-first tablet UI for pallet barcode/RFID scanning, shelf assignment, and dock check-in.",
                estimated_hours=90.0,
                hourly_rate=default_rate
            ),
            TaskItem(
                category="Frontend / UI",
                task_name="Operations & Dispatch Dashboard",
                description="Real-time operations control room showing dock statuses, active pick lists, and inventory aging metrics.",
                estimated_hours=75.0,
                hourly_rate=default_rate
            ),
            TaskItem(
                category="Backend & IoT",
                task_name="IoT Ingestion Engine & Event Pipeline",
                description="MQTT/WebSocket broker handling 500+ scan events/min with Redis deduplication and validation.",
                estimated_hours=110.0,
                hourly_rate=default_rate
            ),
            TaskItem(
                category="Database / Data",
                task_name="PostgreSQL Schema & Immutable Audit Log",
                description="Partitioned relational schema, transactional integrity, and tamper-evident history for every pallet movement.",
                estimated_hours=60.0,
                hourly_rate=default_rate
            ),
            TaskItem(
                category="Integrations",
                task_name="SAP ERP Bi-directional Sync Adapter",
                description="REST & batch synchronization adapter with automated conflict resolution and retry queues.",
                estimated_hours=85.0,
                hourly_rate=default_rate
            ),
            TaskItem(
                category="DevOps / Cloud",
                task_name="Containerized Infrastructure & CI/CD",
                description="Dockerized microservices, Terraform infrastructure-as-code, GitHub Actions CI/CD, and staging/prod environments.",
                estimated_hours=65.0,
                hourly_rate=default_rate
            ),
            TaskItem(
                category="QA & Security",
                task_name="Automated Testing & Security Hardening",
                description="End-to-end integration tests, load testing for 2x peak event volume, and role-based access control audit.",
                estimated_hours=70.0,
                hourly_rate=default_rate
            )
        ],
        monthly_infrastructure_cost=30000.0,
        contingency_percentage=15.0,
        key_assumptions=[
            "Fixed RFID scanners provide standardized network payloads over MQTT/HTTP.",
            "SAP ERP staging sandbox is accessible for testing with established API endpoints.",
            "Warehouse Wi-Fi provides minimum 90% floor coverage with offline queue fallback."
        ],
        risk_factors=[
            "SAP API rate limits during end-of-day batch synchronization.",
            "Wi-Fi dead zones on the warehouse floor requiring robust local SQLite caching on tablets.",
            "Hardware firmware incompatibilities across different dock reader models."
        ]
    )


def estimate_problem_statement(
    problem_statement: str,
    default_rate: float = 50.0,
    model_name: str = "qwen2.5:3b",
    demo_mode: bool = False
) -> ProjectCostEstimate:
    """Analyze a problem statement and generate a structured cost breakdown."""

    if demo_mode:
        console.print("[dim yellow]Running in Demo Mode (Simulated AI Engine)...[/dim yellow]")
        return get_mock_estimate(problem_statement, default_rate)

    prompt = f"""
    You are an expert Senior Software Solutions Architect and Technical Project Estimator.
    Analyze the following client problem statement / project scope.
    Deconstruct it into realistic engineering tasks across disciplines (Frontend, Backend, Database/Data, AI/ML, DevOps, QA, Project Management).
    Be realistic with hours, infrastructure needs, and timelines for production-ready software.
    Use an hourly engineering rate of ₹{default_rate}/hr. All monetary estimates must be in Indian Rupees (INR ₹).

    PROBLEM STATEMENT:
    {problem_statement}

    Return ONLY a valid JSON object strictly matching this schema:
    {json.dumps(ProjectCostEstimate.model_json_schema(), indent=2)}
    """

    try:
        with console.status(f"[bold green]Analyzing problem statement with local AI model ({model_name})..."):
            response = ollama.chat(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
                format="json"
            )

        content = response['message']['content']
        raw_data = json.loads(content)
        return ProjectCostEstimate(**raw_data)

    except (httpx.ConnectError, ConnectionRefusedError):
        console.print("\n[bold yellow]Notice:[/bold yellow] Ollama server is not running on http://localhost:11434.")
        console.print("[dim]To start your local offline AI model:[/dim]")
        console.print("  1. Run [bold green]ollama serve[/bold green] in a terminal")
        console.print("  2. Ensure model is downloaded: [bold green]ollama pull qwen2.5:3b[/bold green]\n")
        console.print("[cyan]Falling back to verification demo evaluation...[/cyan]\n")
        return get_mock_estimate(problem_statement, default_rate)

    except Exception as e:
        console.print(f"[bold red]Model processing error:[/bold red] {e}")
        console.print("[cyan]Showing verification demo evaluation...[/cyan]\n")
        return get_mock_estimate(problem_statement, default_rate)


def display_estimate(estimate: ProjectCostEstimate):
    """Render a clean, rich CLI dashboard of the estimate in Indian Rupees (INR ₹)."""
    console.print("\n")
    console.print(Panel(
        f"[bold cyan]{estimate.project_title}[/bold cyan]\n"
        f"[dim]{estimate.executive_summary}[/dim]\n\n"
        f"[yellow]Complexity:[/yellow] [bold]{estimate.complexity_level}[/bold]   |   "
        f"[yellow]Est. Timeline:[/yellow] [bold]{estimate.delivery_timeline_weeks} weeks[/bold]   |   "
        f"[yellow]Total Dev Hours:[/yellow] [bold]{estimate.total_labor_hours:,.1f} hrs[/bold]",
        title="[bold green]PROJECT COST & SCOPE EVALUATION (INR ₹)[/bold green]",
        border_style="green"
    ))

    # Task Breakdown Table
    table = Table(title="Technical Tasks Breakdown (INR ₹)", show_header=True, header_style="bold magenta")
    table.add_column("Category", style="cyan", width=18)
    table.add_column("Task & Description", style="white")
    table.add_column("Hours", justify="right", style="yellow")
    table.add_column("Rate", justify="right", style="dim")
    table.add_column("Subtotal (INR)", justify="right", style="bold green")

    for task in estimate.tasks:
        subtotal = task.estimated_hours * task.hourly_rate
        desc = f"[bold]{task.task_name}[/bold]\n[dim]{task.description}[/dim]"
        table.add_row(
            task.category,
            desc,
            f"{task.estimated_hours:,.1f}h",
            f"₹{task.hourly_rate:,.0f}/h",
            f"₹{subtotal:,.2f}"
        )

    console.print(table)

    # Cost Summary Table
    summary_table = Table(title="Cost Summary & Totals (INR ₹)", show_header=False, border_style="blue")
    summary_table.add_column("Line Item", style="bold")
    summary_table.add_column("Details", style="dim")
    summary_table.add_column("Amount (INR)", justify="right", style="bold green")

    lakhs_total = estimate.total_solution_cost / 100000.0

    summary_table.add_row(
        "Base Engineering Labor",
        f"{estimate.total_labor_hours:,.1f} hours @ ₹{estimate.tasks[0].hourly_rate if estimate.tasks else 1500:.0f}/hr avg",
        f"₹{estimate.total_labor_cost:,.2f}"
    )
    summary_table.add_row(
        f"Contingency Risk Buffer ({estimate.contingency_percentage:.0f}%)",
        "Unforeseen scope expansion, edge cases, integration delays",
        f"₹{estimate.contingency_cost:,.2f}"
    )
    summary_table.add_row(
        "Cloud Infrastructure (1 Year)",
        f"₹{estimate.monthly_infrastructure_cost:,.2f}/mo (Cloud GPU, Hosting, DB, API quotas)",
        f"₹{estimate.annual_infrastructure_cost:,.2f}"
    )
    summary_table.add_section()
    summary_table.add_row(
        "[bold white]TOTAL ESTIMATED SOLUTION COST[/bold white]",
        f"[bold white]First Year Total (~₹{lakhs_total:.2f} Lakhs INR)[/bold white]",
        f"[bold bright_green]₹{estimate.total_solution_cost:,.2f}[/bold bright_green]"
    )

    console.print(summary_table)

    # Key Assumptions & Risks
    if estimate.key_assumptions:
        console.print("\n[bold cyan]Key Architectural Assumptions:[/bold cyan]")
        for assumption in estimate.key_assumptions:
            console.print(f"  • {assumption}")

    if estimate.risk_factors:
        console.print("\n[bold red]Identified Risk Factors:[/bold red]")
        for risk in estimate.risk_factors:
            console.print(f"  ⚠ {risk}")

    console.print("\n")


def main():
    parser = argparse.ArgumentParser(description="Estimate engineering cost from a problem statement in Indian Rupees (INR).")
    parser.add_argument("--input", "-i", type=str, help="Problem statement text directly.")
    parser.add_argument("--file", "-f", type=str, help="Path to text or markdown file containing problem statement.")
    parser.add_argument("--rate", "-r", type=float, default=1500.0, help="Default hourly engineering rate in INR ₹ (default: 1500.0).")
    parser.add_argument("--model", "-m", type=str, default="qwen2.5:3b", help="Local Ollama model name (default: qwen2.5:3b).")
    parser.add_argument("--demo", action="store_true", help="Run with demo data to test schema and tables without model.")
    parser.add_argument("--json", action="store_true", help="Output raw JSON instead of formatted tables.")

    args = parser.parse_args()

    problem_text = ""
    if args.input:
        problem_text = args.input
    elif args.file:
        resolved = resolve_file_path(args.file)
        if not os.path.exists(resolved):
            console.print(f"\n[bold red]Error: File not found:[/bold red] '{args.file}'")
            console.print(f"[dim]Checked: current directory, /home/gurshaan, and samples.[/dim]")
            console.print(f"[yellow]Available sample files:[/yellow] samples/sample_problem.txt, solution.txt\n")
            sys.exit(1)
        with open(resolved, "r", encoding="utf-8", errors="replace") as f:
            problem_text = f.read().strip()
    elif args.demo:
        problem_text = "SmartLogistics Warehouse Tracking Demo"
    else:
        console.print("[bold cyan]Enter problem statement / project scope (press Ctrl+D or type EOF when finished):[/bold cyan]\n")
        lines = []
        try:
            while True:
                line = input()
                if line.strip() == "EOF":
                    break
                lines.append(line)
        except EOFError:
            pass
        problem_text = "\n".join(lines).strip()

    if not problem_text:
        console.print("[bold red]Error:[/bold red] No problem statement provided.")
        sys.exit(1)

    estimate = estimate_problem_statement(
        problem_statement=problem_text,
        default_rate=args.rate,
        model_name=args.model,
        demo_mode=args.demo
    )

    if args.json:
        print(estimate.model_dump_json(indent=2))
    else:
        display_estimate(estimate)


if __name__ == "__main__":
    main()
