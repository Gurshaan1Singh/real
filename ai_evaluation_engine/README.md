# Dual AI Model Suite: Cost Estimator & Startup Pitch Deck Evaluator

A 100% private, copyright-clean AI suite designed for technical project cost estimation and venture capital document evaluation.

## Features

### 1. Problem Statement Cost Estimator (`cost_estimator.py`)
- Takes any project requirements or problem statement.
- Deconstructs scope into engineering tasks across disciplines (Frontend, Backend, IoT/Data, DevOps, QA).
- Estimates required hours, labor cost at your specified hourly rate, contingency risk multiplier (e.g. 15%), and annual cloud infrastructure costs.
- Generates a transparent, auditable cost sheet with total solution pricing.

### 2. Startup Pitch Deck & Document Evaluator (`startup_evaluator.py`)
- Ingests pitch decks directly from **PDF**, text, or markdown files.
- Evaluates the startup against an objective **100-Point Venture Capital Rubric**:
  - **Market & TAM (Max 20 pts)**
  - **Problem & Solution (Max 20 pts)**
  - **Traction & Metrics (Max 20 pts)**
  - **Team & Execution (Max 15 pts)**
  - **Business Model & Moat (Max 15 pts)**
  - **Financials & The Ask (Max 10 pts)**
- Outputs total score, rubric point breakdown, critical risks/red flags, top strengths, and an investment verdict (`Strong Pass`, `Watchlist`, `Investable`).

---

## Getting Started

### 1. Launch the Interactive Suite
Run the all-in-one launcher:
```bash
./venv/bin/python3 run_suite.py
```

### 2. Run Model 1 (Cost Estimator) Directly
```bash
# Using direct text input
./venv/bin/python3 cost_estimator.py --input "Build an automated inventory tracking app with barcode scanners"

# Using a problem statement file
./venv/bin/python3 cost_estimator.py --file samples/sample_problem.txt

# Custom hourly rate ($75/hr) and JSON output
./venv/bin/python3 cost_estimator.py --file samples/sample_problem.txt --rate 75 --json
```

### 3. Run Model 2 (Startup Evaluator) Directly
```bash
# Evaluate a PDF pitch deck
./venv/bin/python3 startup_evaluator.py samples/sample_pitch_deck.pdf

# Evaluate and save the report as JSON
./venv/bin/python3 startup_evaluator.py samples/sample_pitch_deck.pdf --save report.json
```

---

## Setting Up Your Local Offline AI (Ollama)

To run the models completely offline on your computer without cloud costs or copyright risks:

1. In your Linux terminal, install Ollama:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```
2. Download the fast, Apache 2.0 open-weights model:
   ```bash
   ollama run qwen2.5:3b
   ```
3. Start the local server:
   ```bash
   ollama serve
   ```

*Note: The tools feature automatic fallback and demo verification, so you can test them immediately even before starting Ollama.*
