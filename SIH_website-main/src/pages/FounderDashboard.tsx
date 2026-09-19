import React, { useState } from 'react';
import { MockDatabaseService } from '../services/mockDatabase';
import { Startup, AIInterview, AIEvaluation } from '../types/database';
import { PitchDeckEvaluatorModal } from '../components/PitchDeckEvaluatorModal';
import {
  Sparkles,
  Send,
  FileCheck2,
  AlertCircle,
  PlusCircle,
  Calculator,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

export const FounderDashboard: React.FC = () => {
  const startups = MockDatabaseService.getStartups();
  const [selectedStartup, setSelectedStartup] = useState<Startup>(startups[0] || null);
  const [isNewStartupModalOpen, setIsNewStartupModalOpen] = useState(false);
  const [isDeckEvaluatorOpen, setIsDeckEvaluatorOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    startup_name: '',
    sector: 'Agriculture',
    stage: 'PROTOTYPE' as const,
    problem_statement: '',
    target_market: '',
    business_model: '',
    funding_ask: 5000000,
    team_lead: '',
  });

  // Chat message draft
  const [chatDraft, setChatDraft] = useState('');

  // Fetch AI evaluation and interview for selected startup
  const evaluation: AIEvaluation | undefined = selectedStartup
    ? MockDatabaseService.getEvaluations().find((e) => e.startup_id === selectedStartup.id)
    : undefined;

  const interview: AIInterview | undefined = selectedStartup
    ? MockDatabaseService.getInterviews().find((i) => i.startup_id === selectedStartup.id)
    : undefined;

  const handleSendMessage = () => {
    if (!chatDraft.trim() || !interview) return;

    MockDatabaseService.sendInterviewMessage(interview.id, 'FOUNDER', chatDraft.trim());
    setChatDraft('');

    // Trigger AI response after short delay
    setTimeout(() => {
      MockDatabaseService.sendInterviewMessage(
        interview.id,
        'AI',
        'Your response regarding regulatory feasibility and market adoption has been logged into the Human-in-the-Loop review dossier.'
      );
      // Force refresh state
      setSelectedStartup({ ...selectedStartup });
    }, 600);
  };

  const handleCreateStartup = (e: React.FormEvent) => {
    e.preventDefault();
    const newStartup = MockDatabaseService.createStartup({
      founder_id: 'user-founder-1',
      startup_name: formData.startup_name,
      sector: formData.sector,
      stage: formData.stage,
      problem_statement: formData.problem_statement,
      target_market: formData.target_market,
      business_model: formData.business_model,
      funding_ask: Number(formData.funding_ask),
      team_details: [{ name: formData.team_lead || 'Lead Founder', role: 'Founder & CEO', experience: '5+ years' }],
      traction_metrics: { pilots: 2, users: 400 },
      status: 'SUBMITTED',
    });

    // Run AI Evaluation
    MockDatabaseService.simulateAIEvaluation(newStartup);

    setSelectedStartup(newStartup);
    setIsNewStartupModalOpen(false);
  };

  const statusSteps = ['SUBMITTED', 'AI_ANALYSIS', 'HUMAN_REVIEW', 'SHORTLISTED'];

  const getStepIndex = (status: string) => {
    const idx = statusSteps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              DPIIT Registered Innovator
            </span>
            <span className="text-xs text-slate-500">• Bharat Startup Ecosystem</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Citizen Founder Command Console</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Manage your startup profile, complete adaptive AI inquiries, and validate proposal economics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDeckEvaluatorOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Evaluate with sih-pitch-evaluator</span>
          </button>

          <button
            onClick={() => setIsNewStartupModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Submission</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Selector & Tracker / Right AI Interview & Patent Novelty */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Startup Selector & Application Tracker */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Startup Selector List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Your Registered Startups ({startups.length})
            </h3>

            <div className="space-y-2.5">
              {startups.map((s) => {
                const isSelected = selectedStartup?.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStartup(s)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{s.startup_name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{s.sector} • {s.stage}</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                        {s.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Lifecycle Stepper */}
          {selectedStartup && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Application Lifecycle Tracker
              </h3>

              <div className="space-y-3">
                {statusSteps.map((step, idx) => {
                  const currentIdx = getStepIndex(selectedStartup.status);
                  const isDone = idx < currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={step} className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          {step === 'SUBMITTED' && 'Profile Submitted'}
                          {step === 'AI_ANALYSIS' && 'AI Scoring & Prior-Art Novelty Check'}
                          {step === 'HUMAN_REVIEW' && 'Under Human Reviewer Audit (HITL)'}
                          {step === 'SHORTLISTED' && 'Government Shortlisted'}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {step === 'SUBMITTED' && 'Initial dossier recorded with DPIIT.'}
                          {step === 'AI_ANALYSIS' && 'Automated parameters evaluated across 7 criteria.'}
                          {step === 'HUMAN_REVIEW' && 'Government-appointed analyst reviewing chat transcripts.'}
                          {step === 'SHORTLISTED' && 'Visible to Ministry procurement officers.'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Startup Financial Ask */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Declared Funding Ask:</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  ₹{(selectedStartup.funding_ask / 100000).toFixed(1)} Lakhs
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Interview & Patent Novelty */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Patent Novelty & AI Evaluation Summary Card */}
          {evaluation && (
            <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-sm text-slate-900">
                    AI Prior-Art &amp; Novelty Analysis
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {evaluation.recommended_tier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block mb-1">Composite AI Score</span>
                  <div className="text-2xl font-black text-blue-600">
                    {evaluation.composite_score} <span className="text-xs font-medium text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block mb-1">Patent Prior-Art Similarity</span>
                  <div className="text-2xl font-black text-amber-600">
                    {evaluation.patent_similarity_percentage}%
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200">
                <strong className="text-slate-900">Analyst Note:</strong> {evaluation.patent_analysis_notes}
              </p>
            </div>
          )}

          {/* Interactive AI Clarifying Interview Chat */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col h-[420px]">
            <div className="bg-slate-950 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Adaptive AI Interviewer
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Addressing technical and regulatory inquiries for the review committee
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                Live Session
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {interview?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'FOUNDER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'FOUNDER'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'AI' && (
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Inquiry</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-slate-400 mt-1 block text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                value={chatDraft}
                onChange={(e) => setChatDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response to the AI inquiry..."
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatDraft.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Startup Profile Submission Modal */}
      {isNewStartupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-slate-950 text-white p-5 flex justify-between items-center border-b border-slate-800">
              <h3 className="font-bold text-sm">New Startup Profile Submission</h3>
              <button
                onClick={() => setIsNewStartupModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStartup} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Startup Name</label>
                <input
                  type="text"
                  required
                  value={formData.startup_name}
                  onChange={(e) => setFormData({ ...formData, startup_name: e.target.value })}
                  placeholder="e.g. AeroKrishi Technologies"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option>Agriculture</option>
                    <option>CleanTech</option>
                    <option>Healthcare</option>
                    <option>Infrastructure &amp; Smart Cities</option>
                    <option>Cybersecurity</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="IDEA">Idea</option>
                    <option value="PROTOTYPE">Prototype</option>
                    <option value="REVENUE">Revenue</option>
                    <option value="SCALING">Scaling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Problem Statement &amp; Solution</label>
                <textarea
                  rows={3}
                  required
                  value={formData.problem_statement}
                  onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
                  placeholder="Describe the critical civic challenge and your technical novelty..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Market &amp; Model</label>
                  <input
                    type="text"
                    value={formData.target_market}
                    onChange={(e) => setFormData({ ...formData, target_market: e.target.value })}
                    placeholder="e.g. 140M smallholder farmers"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Funding Ask (INR)</label>
                  <input
                    type="number"
                    value={formData.funding_ask}
                    onChange={(e) => setFormData({ ...formData, funding_ask: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNewStartupModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg"
                >
                  Submit &amp; Run AI Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Pitch Deck & Proposal Evaluator Modal (100-Point VC Rubric) */}
      <PitchDeckEvaluatorModal
        isOpen={isDeckEvaluatorOpen}
        onClose={() => setIsDeckEvaluatorOpen(false)}
        startupId={selectedStartup?.id || 'startup_current'}
      />
    </div>
  );
};
