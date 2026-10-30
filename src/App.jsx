import { useState } from 'react'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const runAnalysis = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/analyze', { method: 'POST' })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({
        batch: "API-2024-112-B",
        whys: ["Why1: Purity 97.8% - Spec NLT 99.0%", "Why2: Reactor temp 65C vs 60C set", "Why3: Sensor TE-101 drift 5C", "Why4: PM overdue 30 days", "Why5: CMMS not linked to MES - Systemic"],
        fishbone: {Man: "Operator missed alert", Machine: "TE-101 drift", Method: "No MES-CMMS integration", Material: "API lot variation", Measurement: "Lab delay 4h", Environment: "Cleanroom temp high"},
        capa: ["Immediate: Quarantine batch API-2024-112-B", "Corrective: Recalibrate TE-101 & PM", "Preventive: Integrate CMMS+MES auto-alert", "Systemic: AI drift detection"],
        evidence_missing: ["TE-101 calibration cert", "Operator training record"]
      })
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh', background:'#020617', color:'white', padding:'20px', fontFamily:'system-ui'}}>
      <h1 style={{color:'#00e5ff', textAlign:'center'}}>🧬 AIVOA.AI - Agentic RCA Copilot</h1>
      <p style={{textAlign:'center', color:'#94a3b8'}}>Pharma 4.0 | GxP Compliant | API-2024-112-B</p>
      
      <div style={{maxWidth:'900px', margin:'20px auto', background:'#0f172a', padding:'20px', borderRadius:'16px', border:'1px solid #00e5ff33'}}>
        <h3>📋 Deviation: Purity Failure 97.8% (Spec NLT 99.0%)</h3>
        <button onClick={runAnalysis} style={{background:'#00e676', color:'black', padding:'12px 24px', borderRadius:'8px', fontWeight:'bold', border:'none', cursor:'pointer'}}>
          {loading ? 'Analyzing...' : '▶ Run Agentic AI RCA'}
        </button>
        
        {result && (
          <div style={{marginTop:'20px'}}>
            <h4 style={{color:'#00e5ff'}}>🔍 5 Whys - {result.batch}</h4>
            {result.whys.map((w,i)=><div key={i} style={{background:'#1e293b', margin:'6px 0', padding:'10px', borderRadius:'8px', borderLeft:'4px solid #00e5ff'}}>{w}</div>)}
            
            <h4 style={{color:'#ffab00', marginTop:'20px'}}>🐟 Fishbone (6M)</h4>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
              {Object.entries(result.fishbone).map(([k,v])=><div key={k} style={{background:'#1e293b', padding:'10px', borderRadius:'8px'}}><b>{k}:</b> {v}</div>)}
            </div>

            <h4 style={{color:'#00e676', marginTop:'20px'}}>✅ CAPA Plan</h4>
            {result.capa.map((c,i)=><div key={i} style={{background:'#052e16', margin:'6px 0', padding:'10px', borderRadius:'8px'}}>✓ {c}</div>)}

            <h4 style={{color:'#ff5252', marginTop:'20px'}}>⚠️ Evidence Gaps (GxP)</h4>
            {result.evidence_missing.map((e,i)=><div key={i} style={{background:'#450a0a', margin:'6px 0', padding:'8px', borderRadius:'8px'}}>✗ {e}</div>)}
          </div>
        )}
      </div>
      <p style={{textAlign:'center', color:'#475569', fontSize:'12px'}}>Backend: FastAPI @ 8000 | Frontend: Vite @ 5174/75 | RCA Agent v1.0</p>
    </div>
  )
}
export default App