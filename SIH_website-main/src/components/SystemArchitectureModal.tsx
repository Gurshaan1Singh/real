import React from 'react';
import { X, ShieldCheck, Sparkles, Building2, UserCheck, ArrowRight, Database, FileText } from 'lucide-react';

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-950 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-500/30">
                System Workflow
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                National Innovation Platform Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              End-to-end data lifecycle: From Citizen Founder submission to Human-in-the-Loop oversight and Ministry shortlisting.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Visual Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase mb-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Citizen Founder</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Proposal &amp; AI Interview</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Founder submits project metrics, financials, and responds to adaptive AI counter-questions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-[11px] text-blue-700 font-semibold">
                <span>Status: AI_ANALYSIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase mb-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>AI Evaluator</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Prior-Art &amp; Scoring</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluates 7 parameters, runs patent novelty checks against national database, drafts recommendation tier.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-700 font-semibold">
                <span>Recommendation Tier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-purple-700 font-bold text-xs uppercase mb-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Reviewer (HITL)</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Analyst Audit &amp; Override</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Human analysts audit interview transcripts, verify claimed revenues, approve or override scores with immutable logs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-[11px] text-purple-700 font-semibold">
                <span>Decision Audit Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase mb-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
                  <span>Gov Official</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Empanelment &amp; Pilot</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ministry heads access pre-vetted shortlists, publish problem statements with AI estimation, and issue pilot contracts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                <span>Status: SHORTLISTED</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Constitutional / Statutory Guarantees */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Statutory Compliance &amp; Accountability Safeguards</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-1">Human-in-the-Loop Law</strong>
                No startup is ever rejected or shortlisted solely by an AI algorithm. A certified government analyst must review and sign off.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-1">DPDPA 2023 Enforced</strong>
                Founder intellectual property, proprietary financial statements, and pitch decks are encrypted at rest and never made public.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-1">Immutable Audit Trail</strong>
                Every score adjustment, reviewer rationale, and status transition is cryptographically logged with reviewer ID and timestamp.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Flow Diagram
          </button>
        </div>
      </div>
    </div>
  );
};
