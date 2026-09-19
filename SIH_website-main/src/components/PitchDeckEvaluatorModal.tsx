import React, { useState } from 'react';
import { AIEvaluation } from '../types/database';
import { LiveAiEngineService } from '../services/liveAiEngineService';
import {
  X,
  UploadCloud,
  FileText,
  Award,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  BarChart3,
  Lightbulb,
} from 'lucide-react';

interface PitchDeckEvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  startupId?: string;
  onEvaluationComplete?: (evaluation: AIEvaluation) => void;
}

export const PitchDeckEvaluatorModal: React.FC<PitchDeckEvaluatorModalProps> = ({
  isOpen,
  onClose,
  startupId = 'startup_current',
  onEvaluationComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      let evalResult: AIEvaluation;

      if (inputMode === 'upload' && selectedFile) {
        // Read file as Base64 for PDF or Text
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });

        evalResult = await LiveAiEngineService.evaluateStartupPitchDeck({
          base64Pdf: base64Data,
          startupId,
        });
      } else {
        const text = pastedText.trim() || 'AuraMed AI: Autonomous Clinical Documentation & Real-Time Automated Billing for Hospitals.';
        evalResult = await LiveAiEngineService.evaluateStartupPitchDeck({
          content: text,
          startupId,
        });
      }

      setEvaluation(evalResult);
      if (onEvaluationComplete) {
        onEvaluationComplete(evalResult);
      }
    } catch (err) {
      console.error('Failed to evaluate pitch deck:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSamplePitchDeck = () => {
    setInputMode('paste');
    setPastedText(
      `AuraMed AI: Autonomous Clinical Documentation & ICD-10 Coding for Hospitals\n\n` +
      `PROBLEM:\n` +
      `- Physicians spend 16+ hours/week on EHR data entry and billing codes.\n` +
      `- Over ₹2.3 Lakh Crores in revenue is lost annually by hospital networks due to downcoding and claim rejections.\n\n` +
      `SOLUTION:\n` +
      `- Ambient AI intelligence listens to patient consultations and generates structured SOAP notes.\n` +
      `- 98.4% auditor-certified coding accuracy directly mapped into Epic and Cerner workflows.\n\n` +
      `TRACTION:\n` +
      `- 8 Paid Hospital Network Pilots (420 active clinical practitioners, ₹5.2 Crores ARR, 7.7x YoY growth).\n` +
      `- 134% Net Revenue Retention with 0% logo churn over 9 months.\n\n` +
      `THE ASK:\n` +
      `- Raising ₹25 Crores Seed Financing to scale engineering and hospital integrations.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-800/80 rounded-xl border border-blue-700/50 shadow-inner">
              <Award className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                sih-pitch-evaluator
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-blue-700/80 text-blue-200 px-2 py-0.5 rounded-full border border-blue-600">
                  Model: sih-pitch-evaluator:latest
                </span>
              </h2>
              <p className="text-xs text-blue-200 font-medium">
                Powered by in-house sih-pitch-evaluator engine (Qwen 2.5 3B) — 7-Pillar VC Rubric &amp; Patent Novelty
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-blue-200 hover:text-white hover:bg-blue-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          {!evaluation ? (
            <div className="space-y-6">
              {/* Tab Selector */}
              <div className="flex gap-2 border-b border-slate-200 pb-2">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                    inputMode === 'upload'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <UploadCloud className="w-4 h-4 inline mr-2" />
                  Upload PDF Pitch Deck
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('paste')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                    inputMode === 'paste'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Paste Text / Proposal
                </button>
                <button
                  type="button"
                  onClick={loadSamplePitchDeck}
                  className="ml-auto px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Load Sample Deck (AuraMed AI)
                </button>
              </div>

              {inputMode === 'upload' ? (
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-white hover:border-blue-500 transition-all">
                  <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 text-base mb-1">
                    {selectedFile ? selectedFile.name : 'Select or drag your pitch deck here'}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Supports PDF, TXT, or MD documents up to 25MB
                  </p>
                  <label className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs">
                    <span>Browse Computer</span>
                    <input
                      type="file"
                      accept=".pdf,.txt,.md"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {selectedFile && (
                    <p className="mt-3 text-xs text-green-700 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Ready for AI Analysis ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Paste Pitch Deck Content / Executive Summary
                  </label>
                  <textarea
                    rows={8}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste problem statement, market size, traction metrics, team credentials, and funding ask..."
                    className="w-full text-xs font-mono p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              )}

              {/* Analyze Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={isAnalyzing || (inputMode === 'upload' && !selectedFile && !pastedText)}
                  onClick={handleAnalyze}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Evaluating via Local AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Run sih-pitch-evaluator
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Score Header Card */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                        evaluation.recommended_tier === 'STRONG_FIT'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : evaluation.recommended_tier === 'NEEDS_REVIEW'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {evaluation.recommended_tier.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">
                      ID: {evaluation.startup_id}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Venture Capital Evaluation Summary
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {evaluation.written_rationale}
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-xs border border-white/10 shrink-0">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">
                      {evaluation.composite_score}
                      <span className="text-xs text-slate-400 font-normal"> / 100</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                      Composite Score
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl font-black text-cyan-300">
                      {evaluation.patent_similarity_percentage}%
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                      Prior-Art Overlap
                    </div>
                  </div>
                </div>
              </div>

              {/* 7-Pillar Parameter Scores */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  7-Pillar Scoring Breakdown (Each out of 100)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(evaluation.parameter_scores).map(([key, val]) => {
                    const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                    const score = typeof val === 'number' ? val : 0;
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{label}</span>
                          <span className="font-bold text-slate-900">{score} / 100</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              score >= 80
                                ? 'bg-emerald-500'
                                : score >= 60
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Patent & Risks Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Patent Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Novelty &amp; Patent Analysis
                  </h4>
                  <p className="text-xs text-slate-600">
                    {evaluation.patent_analysis_notes}
                  </p>
                  {evaluation.most_similar_patent_id && (
                    <div className="pt-2 text-[11px] text-slate-500">
                      Closest Reference: <span className="font-mono font-bold text-slate-800">{evaluation.most_similar_patent_id}</span>
                    </div>
                  )}
                </div>

                {/* Risks Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    Identified Vulnerabilities &amp; Risks
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {evaluation.flags_and_risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Re-evaluate Button */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setEvaluation(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  ← Evaluate Another Pitch Deck
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Done &amp; Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
