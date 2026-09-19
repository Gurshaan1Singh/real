import React, { useState, useEffect } from 'react';
import { AIEstimateResult } from '../types/database';
import { AIEstimatorService, formatINR } from '../services/aiEstimatorService';
import { LiveAiEngineService } from '../services/liveAiEngineService';
import {
  X,
  Sparkles,
  Calculator,
  Calendar,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface AIEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatement?: string;
  initialSector?: string;
}

export const AIEstimatorModal: React.FC<AIEstimatorModalProps> = ({
  isOpen,
  onClose,
  initialStatement = '',
  initialSector = '',
}) => {
  const [statement, setStatement] = useState(initialStatement);
  const [sector, setSector] = useState(initialSector);
  const [estimate, setEstimate] = useState<AIEstimateResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<'budget' | 'timeline' | 'stack' | 'risks'>('budget');

  useEffect(() => {
    if (initialStatement) {
      setStatement(initialStatement);
      handleCalculate(initialStatement, initialSector);
    } else if (isOpen && !estimate) {
      const defaultProb = 'Automated pothole detection using smartphone gyroscopes and vehicle dashcams';
      setStatement(defaultProb);
      handleCalculate(defaultProb, 'Infrastructure & Smart Cities');
    }
  }, [isOpen, initialStatement, initialSector]);

  const handleCalculate = async (textToEstimate?: string, sectorHint?: string) => {
    const text = textToEstimate || statement;
    if (!text.trim()) return;

    setIsCalculating(true);
    try {
      const res = await LiveAiEngineService.estimateProblemStatement(text, sectorHint || sector);
      setEstimate(res);
    } catch {
      const fallback = AIEstimatorService.estimateProblem(text, sectorHint || sector);
      setEstimate(fallback);
    } finally {
      setIsCalculating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  sih-cost-estimator
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Model: sih-cost-estimator:latest
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Powered by in-house sih-cost-estimator engine (Qwen 2.5 3B) — Granular ₹ INR Budget, PERT Timeline &amp; Risk Matrix
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search / Input Bar */}
        <div className="p-5 bg-slate-50 border-b border-slate-200">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Problem Statement / Challenge Description
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder="e.g. Low-cost smart irrigation sensors, pothole detection on highways, AI retinal screening..."
                className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
              />
              {statement && (
                <button
                  onClick={() => setStatement('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => handleCalculate()}
              disabled={isCalculating || !statement.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              {isCalculating ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run sih-cost-estimator</span>
                </>
              )}
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="text-[11px] text-slate-500 font-medium mr-1">Quick Presets:</span>
            {[
              { label: 'Pothole CV Detection', text: 'Automated pothole detection using smartphone gyroscopes and vehicle dashcams' },
              { label: 'Smart Canal Irrigation', text: 'IoT-enabled ultrasonic flowmeters and canal gate automation for precision irrigation' },
              { label: 'Rural Solar Micro-Inverter', text: 'Indigenous high-efficiency solar micro-inverter for rural tribal electrification' },
              { label: 'Pink Bollworm Trap', text: 'AI-powered early pest infestation detection in cotton belts via smart pheromone traps' },
              { label: 'PHC Retinal Screening', text: 'AI-assisted retinal screening device for diabetic retinopathy at Primary Health Centers' },
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setStatement(preset.text);
                  handleCalculate(preset.text);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {estimate && (
            <>
              {/* Archetype & Overview Banner */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-slate-50 border border-blue-200/80 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white">
                        {estimate.sector}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Archetype: {estimate.detected_archetype}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {estimate.detected_archetype}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                      {estimate.domain_explanation}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 self-start">
                    {estimate.government_alignment_tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3-Card Summary Metric Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                  <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
                      <span>Expected Grant / Capex</span>
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {formatINR(estimate.budget_range.expected_inr)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                      <span>Min: {formatINR(estimate.budget_range.min_inr)}</span>
                      <span>Max: {formatINR(estimate.budget_range.max_inr)}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
                      <span>PERT Expected Duration</span>
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {estimate.pert_timeline.pert_weighted_months} <span className="text-sm font-semibold text-slate-600">months</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                      <span>Optimistic: {estimate.pert_timeline.optimistic_months}m</span>
                      <span>Pessimistic: {estimate.pert_timeline.pessimistic_months}m</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
                      <span>Execution Milestones</span>
                      <Calendar className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {estimate.milestones.length} <span className="text-sm font-semibold text-slate-600">Phases</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {estimate.milestones.reduce((acc, m) => acc + m.duration_weeks, 0)} total weeks to state rollout
                    </div>
                  </div>
                </div>
              </div>

              {/* Subnav Tabs */}
              <div className="flex border-b border-slate-200 space-x-6 text-sm font-medium">
                <button
                  onClick={() => setActiveTab('budget')}
                  className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'budget'
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calculator className="w-4 h-4" />
                  <span>Granular Budget ({formatINR(estimate.budget_range.expected_inr)})</span>
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'timeline'
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>PERT Timeline &amp; Milestones</span>
                </button>
                <button
                  onClick={() => setActiveTab('stack')}
                  className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'stack'
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Architecture Stack</span>
                </button>
                <button
                  onClick={() => setActiveTab('risks')}
                  className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
                    activeTab === 'risks'
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Risk Matrix &amp; Mitigations ({estimate.risk_matrix.length})</span>
                </button>
              </div>

              {/* Tab 1: Granular Budget Breakdown */}
              {activeTab === 'budget' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Itemized allocation based on domain requirements</span>
                    <span className="font-semibold text-slate-700">Total: 100% ({formatINR(estimate.budget_range.expected_inr)})</span>
                  </div>

                  <div className="space-y-3">
                    {estimate.budget_breakdown.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-semibold text-sm text-slate-900">{item.category}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                              {item.percentage}%
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              {formatINR(item.amount_inr)}
                            </span>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          <span className="font-medium text-slate-700">Justification:</span> {item.justification}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: PERT Timeline & Milestones */}
              {activeTab === 'timeline' && (
                <div className="space-y-5">
                  <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                        PERT 3-Point Formula: (O + 4M + P) / 6
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Weighted Expected Duration: <span className="font-bold text-slate-900">{estimate.pert_timeline.pert_weighted_months} months</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs font-medium text-slate-700">
                      <div>Optimistic (O): <span className="font-bold text-emerald-600">{estimate.pert_timeline.optimistic_months}m</span></div>
                      <div>Expected (M): <span className="font-bold text-blue-600">{estimate.pert_timeline.expected_months}m</span></div>
                      <div>Pessimistic (P): <span className="font-bold text-amber-600">{estimate.pert_timeline.pessimistic_months}m</span></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {estimate.milestones.map((m, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-bold">
                              {m.phase}
                            </span>
                            <h4 className="font-bold text-sm text-slate-900">{m.title}</h4>
                          </div>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                            {m.duration_weeks} Weeks
                          </span>
                        </div>

                        <div className="mt-2 pl-2 border-l-2 border-blue-500 space-y-1">
                          {m.deliverables.map((d, dIdx) => (
                            <div key={dIdx} className="text-xs text-slate-700 flex items-center space-x-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Recommended Architecture Stack */}
              {activeTab === 'stack' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {estimate.recommended_stack.edge_hardware && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <span>Edge &amp; Hardware Devices</span>
                      </div>
                      <ul className="space-y-1.5">
                        {estimate.recommended_stack.edge_hardware.map((item, i) => (
                          <li key={i} className="text-xs text-slate-800 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md font-mono">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <span>Backend &amp; Data Pipeline</span>
                    </div>
                    <ul className="space-y-1.5">
                      {estimate.recommended_stack.backend.map((item, i) => (
                        <li key={i} className="text-xs text-slate-800 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md font-mono">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>AI &amp; Machine Learning Engines</span>
                    </div>
                    <ul className="space-y-1.5">
                      {estimate.recommended_stack.ai_ml.map((item, i) => (
                        <li key={i} className="text-xs text-slate-800 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md font-mono">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                      <span>Cloud, Sovereign Hosting &amp; Monitoring</span>
                    </div>
                    <ul className="space-y-1.5">
                      {estimate.recommended_stack.cloud_infra.map((item, i) => (
                        <li key={i} className="text-xs text-slate-800 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md font-mono">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 4: Risk Matrix & Mitigations */}
              {activeTab === 'risks' && (
                <div className="space-y-3">
                  {estimate.risk_matrix.map((r, idx) => {
                    const severityColors = {
                      Low: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                      Medium: 'bg-amber-100 text-amber-800 border-amber-300',
                      High: 'bg-rose-100 text-rose-800 border-rose-300',
                      Critical: 'bg-red-200 text-red-900 border-red-400 font-bold',
                    }[r.severity];

                    return (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                            <h4 className="text-sm font-bold text-slate-900">{r.risk}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[11px] text-slate-500">
                              Prob: <strong className="text-slate-700">{r.probability}</strong>
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${severityColors}`}>
                              {r.severity} Severity
                            </span>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-700 border border-slate-200/80">
                          <strong className="text-slate-900">Government Mitigation Protocol:</strong> {r.mitigation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <div>
            Powered by DPIIT Innovation Sizing Heuristics • Real-time Indian Public Sector Context
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Sizing View
          </button>
        </div>
      </div>
    </div>
  );
};
