#!/bin/bash
# Smart India Hackathon 2026 - Real Cellular SMS & AI Engine Server
cd "$(dirname "$0")"

export FAST2SMS_API_KEY="${FAST2SMS_API_KEY:-MbKLPHlh536aROWX1Gy8iDY4QTgz9wtZxpBEN2UoqdjVIC0muSTz6jZQRam35bnFNEcliYBVqLPyuAfO}"

echo "=================================================================="
echo "  🇮🇳 SMART INDIA HACKATHON 2026 - REAL CELLULAR SMS SERVER"
echo "=================================================================="
echo "  🟢 Fast2SMS Gateway Active: Key Loaded (${FAST2SMS_API_KEY:0:8}...)"
echo "  📱 Real SMS Route: 'otp' API (DLT Exempt / Instant Delivery)"
echo "  🚀 Starting Server on http://localhost:8000 ..."
echo "=================================================================="

./venv/bin/python3 sih_api_server.py
