#!/bin/bash
# Smart India Hackathon 2026 - Master Launcher for Backend & Website

echo "=================================================================="
echo "  🇮🇳 STARTING SMART INDIA HACKATHON 2026 PLATFORM"
echo "=================================================================="

# Function to clean up background processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

# 1. Start Python SMS & AI Backend Server
echo "🚀 [1/2] Starting Python SMS & AI Engine on http://localhost:8000 ..."
cd /home/gurshaan/.gemini/antigravity/scratch/ai_evaluation_engine
./run_sms_server.sh &
BACKEND_PID=$!

sleep 1

# 2. Start React Frontend Website
echo "🌐 [2/2] Starting React Frontend on http://localhost:5173 ..."
cd /home/gurshaan/.gemini/antigravity/scratch/SIH_website-main
npm run dev

# Wait for background server
wait $BACKEND_PID
