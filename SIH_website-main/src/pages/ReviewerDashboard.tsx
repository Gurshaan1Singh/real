import React, { useState } from 'react';
import { MockDatabaseService } from '../services/mockDatabase';
import { Startup, AIEvaluation, AIInterview, ReviewerAudit } from '../types/database';
import { AIEstimatorModal } from '../components/AIEstimatorModal';
import { PitchDeckEvaluatorModal } from '../components/PitchDeckEvaluatorModal';
import { PatentSimilarityModal } from '../components/PatentSimilarityModal';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sliders,
  FileText,
  Clock,
  Sparkles,
  History,
  Award,
  Calculator,
  Scale,
  SearchCode,
  ShieldAlert,
} from 'lucide-react';

export const ReviewerDashboard: React.FC = () => {
  const startups = MockDatabaseService.getStartups();
  const [selectedStartup, setSelectedStartup] = useState<Startup>(startups[0] || null);
  const [scoreOverride, setScoreOverride] = useState<number | ''>('');
  const [reviewerComment, setReviewerComment] = useState('');
  const [audits, setAudits] = useState<ReviewerAudit[]>(MockDatabaseService.getAudits());
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isDeckEvaluatorOpen, setIsDeckEvaluatorOpen] = useState(false);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);

  const evaluation: AIEvaluation | undefined = selectedStartup
    ? MockDatabaseService.getEvaluations().find((e) => e.startup_id === selectedStartup.id)
    : undefined;

  const interview: AIInterview | undefined = selectedStartup
    ? MockDatabaseService.getInterviews().find((i) => i.startup_id === selectedStartup.id)
    : undefined;

  const handleDecision = (action: 'APPROVE' | 'OVERRIDE_SCORE' | 'REQUEST_INFO' | 'REJECT') => {
    if (!selectedStartup) return;

    const newStatus =
      action === 'APPROVE'
        ? 'SHORTLISTED'
        : action === 'REJECT'
        ? 'NOT_SHORTLISTED'
        : action === 'REQUEST_INFO'
        ? 'NEEDS_INFO'
        : selectedStartup.status;

    const audit = MockDatabaseService.saveAudit({
      startup_id: selectedStartup.id,
      reviewer_id: 'user-reviewer-1',
      action,
      previous_score: evaluation?.composite_score,
      overridden_score: typeof scoreOverride === 'number' ? scoreOverride : undefined,
      reviewer_comments: reviewerComment || `Analyst decision: ${action} with confirmed audit parameters.`,
      previous_status: selectedStartup.status,
      new_status: newStatus,
    });

    setAudits(MockDatabaseService.getAudits());
    setSelectedStartup({ ...selectedStartup, status: newStatus });
    setReviewerComment('');
    setScoreOverride('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              National Startup Assessment Directorate
            </span>
            <span className="text-xs text-slate-500">• Human-in-the-Loop Oversight</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Reviewer Moderation Console</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Audit AI evaluations, inspect founder counter-question transcripts, and approve proposals for ministry visibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsPatentModalOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Scan with BGE-M3 Patent AI</span>
          </button>
          <button
            type="button"
            onClick={() => setIsDeckEvaluatorOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Audit with sih-pitch-evaluator</span>
          </button>
          <button
            type="button"
            onClick={() => setIsEstimatorOpen(true)}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-emerald-200" />
            <span>Estimate with sih-cost-estimator</span>
          </button>
          <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Statutory Reviewer Sign-off Enforced</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Audit Queue / Right Details & Override Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Review Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Submissions Pending Audit ({startups.length})
            </h3>

            <div className="space-y-2.5">
              {startups.map((s) => {
                const isSelected = selectedStartup?.id === s.id;
                const evalItem = MockDatabaseService.getEvaluations().find((e) => e.startup_id === s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedStartup(s);
                      setScoreOverride(evalItem?.composite_score || '');
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/40 shadow-xs ring-1 ring-amber-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{s.startup_name}</h4>
                        <p className="text-xs text-slate-500">{s.sector} • ₹{(s.funding_ask / 100000).toFixed(1)}L Ask</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-blue-600 block">
                          {evalItem ? `${evalItem.composite_score} pts` : 'Pending'}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium">
                          {s.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Audit, Transcript & Override Actions */}
        <div className="lg:col-span-8 space-y-6">
          {selectedStartup && (
            <>
              {/* Proposal Header */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {selectedStartup.sector} • {selectedStartup.stage}
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                      {selectedStartup.startup_name}
                    </h2>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 self-start">
                    Status: {selectedStartup.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-slate-800 block mb-1">Problem Statement:</strong>
                  {selectedStartup.problem_statement}
                </p>

                {/* AI 7-Parameter Scores Breakdown */}
                {evaluation && (
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900 uppercase tracking-wider">
                        AI Parameter Scorecard
                      </span>
                      <span className="text-xs font-bold text-blue-600">
                        Composite: {evaluation.composite_score} / 100
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      {Object.entries(evaluation.parameter_scores).map(([key, score]) => (
                        <div key={key} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-500 capitalize block mb-0.5">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm">{score} / 100</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* BGE-M3 Patent Novelty & Prior-Art Card (Evaluator Only) */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white border border-indigo-900/50 rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-indigo-400">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-black tracking-tight text-white flex items-center gap-2">
                          BGE-M3 Patent Prior-Art &amp; Novelty Score
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Evaluator Only
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Evaluates proposal novelty and legal prior-art overlap against Indian Patent Office (IPO) &amp; WIPO databases.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPatentModalOpen(true)}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <SearchCode className="w-4 h-4 text-indigo-200" />
                    <span>Open Full BGE-M3 Claim Audit</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        Prior-Art Overlap
                      </span>
                      <span className="text-xl font-black text-amber-400">
                        {evaluation?.patent_similarity_percentage || 27.6}%
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      MODERATE OVERLAP
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                      Closest Registered Patent
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-300 block truncate">
                      {evaluation?.most_similar_patent_id || 'IN-202311045902-A'}
                    </span>
                    <span className="text-[9px] text-slate-400">IPO Chennai • IIT Madras</span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                      Section 3(k) Guidance
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold block">
                      Patentable with Claim Narrowing
                    </span>
                    <span className="text-[9px] text-slate-400">FTO disclosure recommended</span>
                  </div>
                </div>
              </div>

              {/* Founder Interview Transcripts */}
              {interview && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Recorded Founder Interview Transcript
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {interview.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`p-3 rounded-xl text-xs ${
                          m.sender === 'AI'
                            ? 'bg-slate-50 border border-slate-200 text-slate-700'
                            : 'bg-amber-50/60 border border-amber-200 text-slate-900 font-medium'
                        }`}
                      >
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                          <span>{m.sender === 'AI' ? 'AI Question' : 'Founder Reply'}</span>
                          <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p>{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviewer Action Console */}
              <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold tracking-tight">Analyst Override &amp; Approval Console</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Reviewer ID: user-reviewer-1
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Override Composite Score (Optional)
                    </label>
                    <input
                      type="number"
                      value={scoreOverride}
                      onChange={(e) => setScoreOverride(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder={String(evaluation?.composite_score || 85)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Mandatory Audit Comment / Rationale</label>
                    <input
                      type="text"
                      value={reviewerComment}
                      onChange={(e) => setReviewerComment(e.target.value)}
                      placeholder="e.g. Verified ARR invoices; technical claims validated."
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleDecision('APPROVE')}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve for Shortlist</span>
                  </button>

                  <button
                    onClick={() => handleDecision('REQUEST_INFO')}
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Request More Info</span>
                  </button>

                  <button
                    onClick={() => handleDecision('REJECT')}
                    className="px-4 py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Proposal</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Immutable Audit Trail */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-slate-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Public Reviewer Decision Audit Log ({audits.length})
              </h3>
            </div>

            <div className="space-y-2.5">
              {audits.map((a) => (
                <div key={a.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">
                      Action: {a.action} → <strong className="text-emerald-700">{a.new_status}</strong>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-600">{a.reviewer_comments}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Estimator Modal (Cost, Timeline & Budget Sizing) */}
      <AIEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        initialStatement={selectedStartup ? `${selectedStartup.startup_name}: ${selectedStartup.problem_statement}` : ''}
        initialSector={selectedStartup?.sector || ''}
      />

      {/* PDF Pitch Deck & Proposal Evaluator Modal (100-Point VC Rubric) */}
      <PitchDeckEvaluatorModal
        isOpen={isDeckEvaluatorOpen}
        onClose={() => setIsDeckEvaluatorOpen(false)}
        startupId={selectedStartup?.id || 'startup_current'}
      />

      {/* BGE-M3 Patent Prior-Art & Novelty Modal (Evaluator Only) */}
      <PatentSimilarityModal
        isOpen={isPatentModalOpen}
        onClose={() => setIsPatentModalOpen(false)}
        initialSolutionText={selectedStartup ? `${selectedStartup.startup_name}: ${selectedStartup.problem_statement}` : ''}
        initialStartupName={selectedStartup?.startup_name || ''}
      />
    </div>
  );
};
