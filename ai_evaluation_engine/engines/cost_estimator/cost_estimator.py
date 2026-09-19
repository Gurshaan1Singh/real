#!/usr/bin/env python3
"""
Engine 1: Technical Scope & Cost Estimator (SIH Edition)
Deconstructs problem statements into technical tasks, PERT timelines,
milestones, tech stacks, risk matrices, and INR (₹) budgets.
"""

import sys
import json
import argparse
from datetime import datetime, timezone
from typing import List, Optional
try:
    from pydantic import BaseModel, Field
except ImportError:
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
        def model_dump(self):
            return self._to_dict(self)
        def model_dump_json(self):
            return json.dumps(self.model_dump(), default=str)
        @classmethod
        def _to_dict(cls, obj):
            if isinstance(obj, list):
                return [cls._to_dict(i) for i in obj]
            elif isinstance(obj, dict):
                return {k: cls._to_dict(v) for k, v in obj.items()}
            elif hasattr(obj, "__dict__"):
                return {k: cls._to_dict(v) for k, v in obj.__dict__.items()}
            return obj

    def Field(default=None, default_factory=None, **kwargs):
        if default_factory:
            return default_factory()
        return default

try:
    import ollama
except ImportError:
    ollama = None

try:
    import httpx
except ImportError:
    httpx = None

from rich.console import Console
from rich.table import Table
from rich.panel import Panel

console = Console()

class BudgetBreakdownItem(BaseModel):
    category: str
    percentage: float
    amount_inr: float
    justification: str

class MilestoneItem(BaseModel):
    phase: str
    title: str
    weeks_from_start: int
    deliverables: List[str]
    budget_allocated_inr: float

class RecommendedStack(BaseModel):
    frontend: List[str]
    backend: List[str]
    database: List[str]
    cloud_iot: List[str]
    ai_ml: List[str]

class RiskMatrixItem(BaseModel):
    risk_description: str
    severity: str  # 'Low', 'Medium', 'High', 'Critical'
    probability: str  # 'Low', 'Medium', 'High'
    mitigation_strategy: str

class SIHAIEstimateResult(BaseModel):
    statement: str
    detected_archetype: str = Field(description="Domain classification, e.g., 'Smart Road & Infrastructure Sensing'")
    sector: str = Field(description="Industry/Government sector, e.g., 'Smart Cities & Infrastructure'")
    domain_explanation: str = Field(description="2-3 sentences explaining technical execution")
    budget_range: dict = Field(description="{'min_inr': int, 'expected_inr': int, 'max_inr': int}")
    budget_breakdown: List[BudgetBreakdownItem]
    pert_timeline: dict = Field(description="{'optimistic_months': int, 'expected_months': int, 'pessimistic_months': int, 'pert_weighted_months': float}")
    milestones: List[MilestoneItem]
    recommended_stack: RecommendedStack
    risk_matrix: List[RiskMatrixItem]
    government_alignment_tags: List[str]
    estimated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def format_inr(amount: float) -> str:
    if amount >= 10000000:
        return f"₹{amount / 10000000:.2f} Cr"
    elif amount >= 100000:
        return f"₹{amount / 100000:.2f} L"
    return f"₹{amount:,.0f}"


def estimate_problem(
    statement: str,
    sector_hint: str = "",
    model_name: str = "sih-cost-estimator"
) -> SIHAIEstimateResult:
    """Invokes local Qwen AI via Ollama to generate an INR-denominated SIH technical estimate."""
    prompt = f"""
    You are the Senior Technical Solutions Architect and Evaluation Committee Lead for Smart India Hackathon (SIH).
    Analyze the following problem statement and calculate a realistic engineering budget in Indian Rupees (INR ₹),
    PERT timeline, milestone plan, tech stack, and risk matrix.

    PROBLEM STATEMENT:
    {statement}

    SECTOR HINT (if any):
    {sector_hint}

    Return ONLY a valid JSON object matching this schema:
    {json.dumps(SIHAIEstimateResult.model_json_schema(), indent=2)}
    """

    try:
        try:
            response = ollama.chat(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
                format="json"
            )
        except Exception:
            response = ollama.chat(
                model="qwen2.5:3b",
                messages=[{"role": "user", "content": prompt}],
                format="json"
            )
        content = response['message']['content']
        data = json.loads(content)
        return SIHAIEstimateResult(**data)
    except Exception as e:
        console.print(f"[bold yellow]Ollama connection notice:[/bold yellow] {e}")
        console.print("[dim]Returning standard archetype calculation...[/dim]")
        # Safe fallback matching schema
        total_exp = 3500000.0
        return SIHAIEstimateResult(
            statement=statement,
            detected_archetype="Industrial IoT & Intelligent Monitoring",
            sector=sector_hint or "Hardware & Automation",
            domain_explanation="Comprehensive full-stack architecture combining edge sensors, microservices backend, and administrative dashboards.",
            budget_range={"min_inr": 2400000, "expected_inr": 3500000, "max_inr": 5000000},
            budget_breakdown=[
                BudgetBreakdownItem(category="Edge Hardware & Sensors", percentage=28, amount_inr=980000, justification="Microcontrollers, sensor calibration, enclosure design"),
                BudgetBreakdownItem(category="Cloud Backend & Event Pipeline", percentage=25, amount_inr=875000, justification="FastAPI / Node backend, database, authentication, message brokers"),
                BudgetBreakdownItem(category="Frontend & Mobile App", percentage=22, amount_inr=770000, justification="React/Vite admin dashboard and mobile client interface"),
                BudgetBreakdownItem(category="AI/ML Inference Pipeline", percentage=15, amount_inr=525000, justification="Model optimization, edge quantization, and telemetry analytics"),
                BudgetBreakdownItem(category="Contingency & Testing", percentage=10, amount_inr=350000, justification="Field pilots, certifications, and unforeseen scope adjustments")
            ],
            pert_timeline={"optimistic_months": 4, "expected_months": 6, "pessimistic_months": 9, "pert_weighted_months": 6.2},
            milestones=[
                MilestoneItem(phase="Phase 1", title="System Architecture & Edge Prototyping", weeks_from_start=4, deliverables=["PCB design", "Firmware prototype"], budget_allocated_inr=800000),
                MilestoneItem(phase="Phase 2", title="Core Cloud Pipeline & API Integration", weeks_from_start=8, deliverables=["REST API", "Database schema", "Auth"], budget_allocated_inr=1200000),
                MilestoneItem(phase="Phase 3", title="Pilot Deployment & Field Testing", weeks_from_start=16, deliverables=["Live field pilot", "Security audit"], budget_allocated_inr=1500000)
            ],
            recommended_stack=RecommendedStack(
                frontend=["React 19", "Tailwind CSS", "Vite"],
                backend=["Python FastAPI", "Node.js"],
                database=["PostgreSQL", "Redis"],
                cloud_iot=["Docker", "AWS IoT Core", "MQTT"],
                ai_ml=["Qwen 2.5", "PyTorch", "ONNX"]
            ),
            risk_matrix=[
                RiskMatrixItem(risk_description="Hardware sensor calibration drift in outdoor weather", severity="High", probability="Medium", mitigation_strategy="Include temperature-compensated sensors and weekly auto-zeroing routine"),
                RiskMatrixItem(risk_description="Network connectivity drops in remote operational areas", severity="Medium", probability="High", mitigation_strategy="Implement local SQLite offline cache on edge devices with sync queue")
            ],
            government_alignment_tags=["Digital India", "Make In India", "Smart Cities Mission"]
        )


def display_sih_estimate(res: SIHAIEstimateResult):
    console.print("\n")
    console.print(Panel(
        f"[bold cyan]{res.detected_archetype}[/bold cyan] ({res.sector})\n"
        f"[dim]{res.domain_explanation}[/dim]\n\n"
        f"Budget Estimate: [bold green]{format_inr(res.budget_range['expected_inr'])}[/bold green] "
        f"[dim](Range: {format_inr(res.budget_range['min_inr'])} - {format_inr(res.budget_range['max_inr'])})[/dim]   |   "
        f"PERT Timeline: [bold yellow]{res.pert_timeline['pert_weighted_months']:.1f} Months[/bold yellow]",
        title="[bold green]SIH AI PROBLEM STATEMENT ESTIMATE[/bold green]",
        border_style="green"
    ))

    # Budget Breakdown
    t = Table(title="Cost Breakdown (INR ₹)", show_header=True, header_style="bold magenta")
    t.add_column("Category", style="cyan")
    t.add_column("Allocated", justify="right", style="bold green")
    t.add_column("Share", justify="right", style="yellow")
    t.add_column("Justification", style="dim")

    for item in res.budget_breakdown:
        t.add_row(item.category, format_inr(item.amount_inr), f"{item.percentage:.0f}%", item.justification)
    console.print(t)

    # Tech Stack
    console.print("\n[bold cyan]Recommended Tech Stack:[/bold cyan]")
    console.print(f"  • Frontend: {', '.join(res.recommended_stack.frontend)}")
    console.print(f"  • Backend:  {', '.join(res.recommended_stack.backend)}")
    console.print(f"  • Database: {', '.join(res.recommended_stack.database)}")
    console.print(f"  • AI/ML:    {', '.join(res.recommended_stack.ai_ml)}")
    console.print(f"  • IoT/Cloud:{', '.join(res.recommended_stack.cloud_iot)}")

    console.print("\n[bold yellow]Government Scheme Alignment:[/bold yellow] " + ", ".join(res.government_alignment_tags))
    console.print("\n")


def main():
    parser = argparse.ArgumentParser(description="Estimate budget and timeline for SIH Problem Statements.")
    parser.add_argument("--input", "-i", type=str, help="Problem statement text")
    parser.add_argument("--file", "-f", type=str, help="File containing problem statement")
    parser.add_argument("--sector", "-s", type=str, default="", help="Sector hint (optional)")
    parser.add_argument("--json", action="store_true", help="Output raw JSON")

    args = parser.parse_args()
    text = args.input or ""
    if args.file:
        with open(args.file, "r", encoding="utf-8") as f:
            text = f.read()

    if not text:
        text = "Automated pavement crack and pothole detection using mobile cameras on municipal buses"

    res = estimate_problem(text, sector_hint=args.sector)
    if args.json:
        print(res.model_dump_json(indent=2))
    else:
        display_sih_estimate(res)

if __name__ == "__main__":
    main()
