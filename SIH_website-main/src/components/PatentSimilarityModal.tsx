import React, { useState, useEffect } from 'react';
import { PatentSimilarityReport } from '../types/database';
import { LiveAiEngineService } from '../services/liveAiEngineService';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileSearch,
  Cpu,
  Layers,
  ExternalLink,
  Upload,
  RefreshCw,
  FileText,
  Scale,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface PatentSimilarityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSolutionText?: string;
  initialStartupName?: string;
}

export const PatentSimilarityModal: React.FC<PatentSimilarityModalProps> = ({
  isOpen,
  onClose,
  initialSolutionText = '',
  initialStartupName = '',
}) => {
  const [solutionText, setSolutionText] = useState(initialSolutionText);
  const [startupName, setStartupName] = useState(initialStartupName);
  const [report, setReport] = useState<PatentSimilarityReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'custom'>('audit');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      const textToScan =
        initialSolutionText ||
        'we are going to search places by drone where the traffic get slows finding potholes and also do mapping';
      setSolutionText(textToScan);
      setStartupName(initialStartupName || 'AeroCivic Drone Intelligence');
      handleScan(textToScan, initialStartupName || 'AeroCivic Drone Intelligence');
    }
  }, [isOpen, initialSolutionText, initialStartupName]);

  const handleScan = async (text: string, title?: string, file?: File | null) => {
    setIsScanning(true);
    try {
      let base64Data = '';
      let effectiveText = text;

      if (file) {
        // If file is plain text or markdown, ensure we read plain text
        if (file.name.endsWith('.txt') || file.name.endsWith('.md') || file.type.includes('text')) {
          try {
            const fText = await file.text();
            if (fText.trim()) {
              effectiveText = fText;
              setSolutionText(fText);
            }
          } catch (e) {
            console.warn('Text file read error:', e);
          }
        }

        base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // Fallback text extraction for PDF if effectiveText is empty
        if (!effectiveText || effectiveText.trim() === '') {
          try {
            const buffer = await file.arrayBuffer();
            const raw = new TextDecoder('latin1').decode(buffer);
            const matches = raw.match(/[A-Za-z0-9\s.,;:'"()/-]{6,}/g);
            if (matches && matches.length > 5) {
              effectiveText = matches.slice(0, 100).join(' ');
            }
          } catch (e) {
            console.warn('PDF string extraction fallback:', e);
          }
        }
      }

      const scanTitle = title || startupName || (file ? file.name.replace(/\.[^/.]+$/, '') : 'Submitted Pitch Solution');

      const res = await LiveAiEngineService.checkPatentSimilarity({
        content: effectiveText,
        base64Pdf: base64Data,
        proposalTitle: scanTitle,
      });
      setReport(res);
    } catch (err) {
      console.error('Patent scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  if (!isOpen) return null;

  const simPct = report?.highest_similarity_percentage || 0;
  const isNovel = simPct < 25.0;
  const isModerate = simPct >= 25.0 && simPct <= 50.0;
  const isRisk = simPct > 50.0;

  const tierBadgeColor = isNovel
    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    : isModerate
    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

  const gaugeStrokeColor = isNovel
    ? '#10b981'
    : isModerate
    ? '#f59e0b'
    : '#f43f5e';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  BGE-M3 Patent Prior-Art &amp; Novelty Engine
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    Model: bge-m3:dense-sparse
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    🔒 Evaluator Console Only
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Indian Patent Office (IPO) &amp; WIPO Prior-Art Collision Detector with Granular Claim Matching
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-950/60 px-6 py-3 flex items-center justify-between border-b border-slate-800/80 text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Audit Selected Proposal
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Scan Custom Solution / Upload PDF
            </button>
          </div>

          <button
            onClick={() => handleScan(solutionText, startupName, selectedFile)}
            disabled={isScanning}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{isScanning ? 'Calculating Vector Overlap...' : 'Re-Run BGE-M3 Scan'}</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Custom Input Tab View */}
          {activeTab === 'custom' && (
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-300 block">
                      Paste Candidate Proposal / Solution Scope:
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {solutionText ? `${solutionText.length} chars` : 'empty'}
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={solutionText}
                    onChange={(e) => setSolutionText(e.target.value)}
                    placeholder="Enter technical description, claims, or problem statement to scan against registered patents..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
                  />
                </div>

                <div className="sm:w-64 space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Or Upload Pitch Solution (.txt, .pdf, .md):
                  </label>
                  <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-900/50 h-[105px]">
                    <Upload className="w-5 h-5 text-indigo-400 mb-1" />
                    <span className="text-[11px] font-bold text-slate-300 truncate max-w-[200px]">
                      {selectedFile ? selectedFile.name : 'Choose Pitch Deck / File'}
                    </span>
                    <span className="text-[9px] text-slate-500 mt-0.5">Max 15MB • TXT / MD / PDF</span>
                    <input
                      type="file"
                      accept=".pdf,.txt,.md"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          const inferredName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
                          const formattedTitle = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);
                          setStartupName(formattedTitle);

                          if (file.name.endsWith('.txt') || file.name.endsWith('.md') || file.type.includes('text')) {
                            try {
                              const text = await file.text();
                              setSolutionText(text);
                              handleScan(text, formattedTitle, file);
                            } catch (err) {
                              console.error('Failed reading file text:', err);
                            }
                          } else {
                            handleScan(solutionText, formattedTitle, file);
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Quick Test Scenario Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] border-t border-slate-800/80">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mr-1">
                  Preset Test Scenarios:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const txt = "SOUNDGUARD: AI-powered acoustic water pipeline leakage detection and localization system using vibration sensors, edge signal analysis, and municipal SCADA telemetry to pinpoint underground pipe breaches and water loss before excavation.";
                    setSolutionText(txt);
                    setStartupName("SoundGuard Water Pipeline Leakage");
                    handleScan(txt, "SoundGuard Water Pipeline Leakage");
                  }}
                  className="px-2.5 py-1 bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 rounded-lg border border-indigo-800/50 cursor-pointer font-semibold transition-colors"
                >
                  💧 Water Leakage (NEERI Overlap)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const txt = "AEROKRISHI: Automated unmanned aerial spraying system with precision crop canopy sensing, electrostatic micro-nozzles, and variable-rate flow controllers to minimize pesticide runoff in paddy and cotton cultivation.";
                    setSolutionText(txt);
                    setStartupName("AeroKrishi Agri Spraying Drone");
                    handleScan(txt, "AeroKrishi Agri Spraying Drone");
                  }}
                  className="px-2.5 py-1 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 rounded-lg border border-emerald-800/50 cursor-pointer font-semibold transition-colors"
                >
                  🌾 Agri Spraying Drone (ICAR Overlap)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const txt = "AeroCivic: Edge-AI powered aerial drone fleet for urban traffic congestion bottleneck identification, vehicle count telemetry, and dynamic traffic light signal timing adjustments.";
                    setSolutionText(txt);
                    setStartupName("AeroCivic Urban Drone Fleet");
                    handleScan(txt, "AeroCivic Urban Drone Fleet");
                  }}
                  className="px-2.5 py-1 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 rounded-lg border border-amber-800/50 cursor-pointer font-semibold transition-colors"
                >
                  🚦 Urban Traffic Drone (IIT-M Overlap)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const txt = "QuantumShield: Biodegradable marine alginate seaweed polymer film designed for room-temperature quantum bit electromagnetic coherence shielding and cryostat thermal insulation.";
                    setSolutionText(txt);
                    setStartupName("QuantumShield Alginate Matrix");
                    handleScan(txt, "QuantumShield Alginate Matrix");
                  }}
                  className="px-2.5 py-1 bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 rounded-lg border border-purple-800/50 cursor-pointer font-semibold transition-colors"
                >
                  ✨ Quantum BioShield (High Novelty)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSolutionText('');
                    setSelectedFile(null);
                  }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg border border-slate-700 cursor-pointer transition-colors text-[10px]"
                >
                  Clear
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleScan(solutionText, startupName, selectedFile)}
                  disabled={isScanning}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-colors cursor-pointer"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>{isScanning ? 'Executing BGE-M3 Vector Match...' : 'Execute BGE-M3 Prior-Art Audit'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Result Dashboard */}
          {report && (
            <div className="space-y-6">
              
              {/* Score & Verdict Banner */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                
                {/* Overlap Percentage Meter */}
                <div className="md:col-span-4 bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Peak Prior-Art Overlap
                  </div>
                  
                  {/* Circular Percentage Meter */}
                  <div className="relative w-36 h-36 flex items-center justify-center my-2">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="#1e293b"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke={gaugeStrokeColor}
                        strokeWidth="10"
                        strokeDasharray={264}
                        strokeDashoffset={264 - (264 * Math.min(simPct, 100)) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white tracking-tight">
                        {simPct}%
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        Similarity
                      </span>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-black border mt-1 ${tierBadgeColor}`}>
                    {report.novelty_tier.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Analysis & Legal Recommendation */}
                <div className="md:col-span-8 bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3.5">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>BGE-M3 Semantic Vector Assessment</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-700">
                        Audited Proposal: <strong className="text-white">{report.proposal_title}</strong> ({report.analyzed_text_length} chars)
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {report.novelty_summary}
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-amber-400 font-bold block mb-0.5 text-[11px]">
                        ⚖️ Patentability Guidance (IPO Section 3k Analysis):
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {report.patentable_assessment}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40">
                      <span className="text-indigo-300 font-bold block mb-0.5 text-[11px]">
                        🛡️ Statutory Evaluator Action:
                      </span>
                      <p className="text-indigo-200 text-[11px] leading-relaxed">
                        {report.evaluator_recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closest Registered Patents */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Top Registered Patents in Indian &amp; Global Databases ({report.closest_patents.length})</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">
                    Source: Indian Patent Office (IPO) / WIPO Prior-Art Register
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {report.closest_patents.map((pat, idx) => {
                    const patCol =
                      pat.similarity_percentage > 50
                        ? 'text-rose-400 border-rose-500/40'
                        : pat.similarity_percentage >= 25
                        ? 'text-amber-400 border-amber-500/40'
                        : 'text-emerald-400 border-emerald-500/40';

                    return (
                      <div
                        key={pat.patent_id}
                        className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition-colors flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-slate-300">
                              #{idx + 1} {pat.patent_id}
                            </span>
                            <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${patCol}`}>
                              {pat.similarity_percentage}% match
                            </span>
                          </div>

                          <h5 className="font-bold text-xs text-white line-clamp-2 leading-snug">
                            {pat.title}
                          </h5>

                          <p className="text-[10px] text-slate-400 line-clamp-1">
                            🏢 {pat.assignee}
                          </p>

                          <p className="text-[10px] text-slate-500 line-clamp-3 leading-relaxed">
                            {pat.abstract}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
                          <span>📅 Filed: {pat.filing_date}</span>
                          <span className="font-bold text-indigo-400">{pat.jurisdiction.split(' ')[0]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Granular Claim Comparison (Top Match) */}
              {report.closest_patents[0]?.overlapping_claims?.length > 0 && (
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Granular Claim Overlap Breakdown ({report.closest_patents[0].patent_id})</span>
                  </div>

                  <div className="space-y-3">
                    {report.closest_patents[0].overlapping_claims.map((claim) => (
                      <div
                        key={claim.patent_claim_number}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2"
                      >
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-indigo-300">
                            Registered Patent Claim #{claim.patent_claim_number}
                          </span>
                          <span className="text-amber-400">
                            {claim.claim_similarity_percentage}% Claim Overlap
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                          "{claim.patent_claim_snippet}"
                        </p>

                        <div className="text-[10px] text-slate-400 pt-1">
                          <strong className="text-emerald-400 font-bold">Applicant Proposal Scope: </strong>
                          "{claim.user_proposal_snippet}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-500 text-[11px]">
            Statutory AI audit tool for Smart India Hackathon Evaluators. Confidential &amp; Protected.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Audit Window
          </button>
        </div>

      </div>
    </div>
  );
};
