# 🇮🇳 Smart India Hackathon 2026 - AI Evaluation & Civic Platform

An end-to-end intelligent platform engineered for **Smart India Hackathon (SIH 2026)**. It combines a **modern React frontend**, a **Python local AI engine**, and a **real-time cellular SMS OTP authentication gateway**.

---

## 🚀 Key Highlights & Architecture

### 1. 🌐 Modern Civic Web Portal (`SIH_website-main`)
- **React 19 + TypeScript + Vite + Tailwind CSS**
- **Aadhaar CIDR Auto-detection**: Simulates UIDAI identity linking.
- **Real Cellular SMS Gateway**: Sends real OTPs directly to mobile devices via Fast2SMS API.
- **Role-based Dashboards**: Tailored views for Founders, Evaluators/Reviewers, and Government Officials.
- **Interactive Modals**: Real-time Cost Estimation and 100-Point Pitch Deck Evaluation.

### 2. 🧠 In-House AI Evaluation Models (`ai_evaluation_engine`)
- **Model 1 — Technical Scope & Cost Estimator (`cost_estimator.py`)**:
  - Automatically parses project problem statements (e.g. UAV traffic & pothole detection).
  - Generates role-based work hour distributions, PERT timelines, risk matrices, and cloud infrastructure costs.
  - Formatted strictly in **Indian Rupees (₹ Lakhs / ₹ INR)**.
- **Model 2 — Venture Capital Pitch Deck Evaluator (`startup_evaluator.py`)**:
  - Scores PDF or text pitch decks against a rigorous **100-Point Rubric** across 6 core pillars:
    1. Market & TAM (₹ Lakh Crores)
    2. Problem & Solution
    3. Traction & Metrics (₹ Crores ARR)
    4. Team & Execution
    5. Business Model & Moat (Unit economics & margins)
    6. Financials & Seed Funding Ask (₹ Lakhs / ₹ Crores)
  - Evaluates prior art and patent novelty overlap.
- **Model 3 — BGE-M3 Patent Prior-Art & Novelty Matcher (`patent_matcher.py` & `patentMatcherService.ts`)**:
  - Compares submitted solutions & pitch decks against 8 registered Indian Patent Office (IPO) and international patents.
  - Computes exact BGE-M3 semantic vector similarity, dense-sparse claim matching, and Indian Patent Act Section 3(k) guidance.
  - Exclusively integrated into the Evaluator Moderation Console with both in-browser and zero-dependency Python execution.

---

## 📂 Project Structure

```
├── SIH_website-main/          # React 19 Frontend Web Application
│   ├── src/                   # Components, Dashboards, and API Services
│   ├── package.json           # Frontend dependencies (Lucide, Tailwind, Vite)
│   └── .gitignore
├── ai_evaluation_engine/      # Python AI Engine & Backend Server
│   ├── cost_estimator.py      # Technical Scope & ₹ INR Cost Estimator
│   ├── startup_evaluator.py   # 100-Point VC Pitch Deck Evaluator
│   ├── sih_api_server.py      # REST API & Real SMS Gateway Server
│   ├── run_sms_server.sh      # Backend launcher script
│   ├── solution.txt           # Sample project proposal scope
│   └── samples/               # Sample pitch decks (.txt, .pdf)
├── start_all.sh               # Master script to run Frontend + Backend together
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Launch Everything (Website + Backend + SMS Gateway)
Run the master script:
```bash
./start_all.sh
```
- **Web Portal**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:8000](http://localhost:8000)

---

### 2. Run the AI Models in Terminal (CLI Mode)

#### A. Run the Cost & Scope Estimator:
```bash
cd ai_evaluation_engine
./venv/bin/python3 cost_estimator.py --file solution.txt
```

#### B. Run the 100-Point Startup Evaluator:
```bash
cd ai_evaluation_engine
./venv/bin/python3 startup_evaluator.py solution.txt
```

---

## 🔐 Configuration & Environment Variables

- **Fast2SMS API Key**: Set in `ai_evaluation_engine/run_sms_server.sh` or as an environment variable:
  ```bash
  export FAST2SMS_API_KEY="your_api_key_here"
  ```
- **Local Ollama Model (Optional for offline local weights)**:
  ```bash
  ollama serve
  ollama pull qwen2.5:3b
  ```
*(Note: If Ollama is offline, the system includes built-in deterministic verification baselines so your live demonstration never crashes).*

---

## 📜 License & Acknowledgments
Developed for **Smart India Hackathon 2026**. Designed for civic infrastructure sensing and automated startup evaluation.
