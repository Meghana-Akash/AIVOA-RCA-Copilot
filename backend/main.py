from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def home():
    return {"status": "AIVOA RCA Backend READY!"}

@app.post("/api/analyze")
async def analyze():
    return {
        "batch": "API-2024-112-B",
        "whys": ["Why1: Purity 97.8% - Spec NLT 99.0%", "Why2: Reactor temp 65C not 60C", "Why3: Sensor TE-101 drift", "Why4: PM overdue 30 days", "Why5: CMMS not linked to MES"],
        "fishbone": {"Man": "Missed alert", "Machine": "Sensor drift", "Method": "No MES link"},
        "capa": ["Quarantine batch", "Recalibrate sensor", "Integrate CMMS+MES"],
        "evidence_missing": ["Calibration cert", "Training record"]
    }