#!/usr/bin/env python3
"""
Dual AI Engine Suite - Interactive CLI Launcher
Allows easy navigation and execution of:
1. Problem Statement Cost Estimator
2. Startup Pitch Deck / Document Evaluator (0-100)
"""

import os
import sys
import subprocess
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt

console = Console()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VENV_PYTHON = os.path.join(BASE_DIR, "venv", "bin", "python3")
if not os.path.exists(VENV_PYTHON):
    VENV_PYTHON = sys.executable

def check_ollama_status():
    import urllib.request
    try:
        with urllib.request.urlopen("http://localhost:11434", timeout=1.0) as res:
            if res.status == 200:
                return True
    except Exception:
        pass
    return False

def print_banner():
    status = check_ollama_status()
    engine_badge = "[bold white on dark_green] OLLAMA ENGINE: ONLINE [/bold white on dark_green]" if status else "[bold white on dark_yellow] OLLAMA ENGINE: NOT RUNNING (DEMO/VERIFICATION ACTIVE) [/bold white on dark_yellow]"
    
    console.print(Panel(
        f"[bold cyan]Dual AI Evaluation Engine[/bold cyan]\n"
        f"1. Cost Estimator for Technical Problem Statements\n"
        f"2. Startup Pitch Deck & Document Evaluator (0-100)\n\n"
        f"Status: {engine_badge}",
        title="[bold blue]AI Evaluation Suite[/bold blue]",
        border_style="blue"
    ))

def main():
    while True:
        console.clear()
        print_banner()
        console.print("[bold]Select an action:[/bold]")
        console.print("  [1] [green]Evaluate a Problem Statement[/green] (Estimate development cost & hours)")
        console.print("  [2] [blue]Evaluate a Startup Document / PDF[/blue] (100-Point VC Rubric & Score)")
        console.print("  [3] [cyan]Run Demo: Sample Problem Statement[/cyan]")
        console.print("  [4] [magenta]Run Demo: Sample Pitch Deck PDF[/magenta]")
        console.print("  [5] [yellow]View Ollama Setup Instructions[/yellow]")
        console.print("  [q] Exit\n")

        choice = Prompt.ask("Choose an option", choices=["1", "2", "3", "4", "5", "q"], default="3")

        if choice == "1":
            file_or_text = Prompt.ask("Do you want to provide a [bold]f[/bold]ile path or enter [bold]t[/bold]ext?", choices=["f", "t"], default="f")
            if file_or_text == "f":
                path = Prompt.ask("Enter path to file (.txt, .md)", default="solution.txt")
                subprocess.run([VENV_PYTHON, os.path.join(BASE_DIR, "cost_estimator.py"), "--file", path])
            else:
                text = Prompt.ask("Enter the problem statement / scope")
                subprocess.run([VENV_PYTHON, os.path.join(BASE_DIR, "cost_estimator.py"), "--input", text])
            Prompt.ask("\nPress Enter to return to menu")

        elif choice == "2":
            path = Prompt.ask("Enter path to pitch deck / file (.pdf, .txt, .md)", default="solution.txt")
            subprocess.run([VENV_PYTHON, os.path.join(BASE_DIR, "startup_evaluator.py"), path])
            Prompt.ask("\nPress Enter to return to menu")

        elif choice == "3":
            sample_path = os.path.join(BASE_DIR, "samples", "sample_problem.txt")
            subprocess.run([VENV_PYTHON, os.path.join(BASE_DIR, "cost_estimator.py"), "--file", sample_path])
            Prompt.ask("\nPress Enter to return to menu")

        elif choice == "4":
            sample_pdf = os.path.join(BASE_DIR, "samples", "sample_pitch_deck.pdf")
            subprocess.run([VENV_PYTHON, os.path.join(BASE_DIR, "startup_evaluator.py"), sample_pdf])
            Prompt.ask("\nPress Enter to return to menu")

        elif choice == "5":
            console.print("\n" + "="*60)
            console.print("[bold yellow]OLLAMA OFFLINE AI SETUP GUIDE[/bold yellow]")
            console.print("="*60)
            console.print("To run the AI models 100% locally and offline on your computer:")
            console.print("1. Install Ollama:")
            console.print("   [bold green]curl -fsSL https://ollama.com/install.sh | sh[/bold green]")
            console.print("2. Download the fast, Apache 2.0 open-weights model:")
            console.print("   [bold green]ollama run qwen2.5:3b[/bold green]")
            console.print("3. Ensure the service is running:")
            console.print("   [bold green]ollama serve[/bold green]")
            console.print("="*60 + "\n")
            Prompt.ask("Press Enter to return to menu")

        elif choice == "q":
            console.print("[dim]Exiting AI Evaluation Suite. Goodbye![/dim]")
            break

if __name__ == "__main__":
    main()
