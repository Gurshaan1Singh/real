import React, { useState } from 'react';
import { MockDatabaseService } from '../services/mockDatabase';
import { ProblemStatement } from '../types/database';
import { AIEstimatorModal } from '../components/AIEstimatorModal';
import {
  Sparkles,
  Building2,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Calendar,
  Layers,
  Search,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface LandingPageProps {
  onApplyNow: () => void;
  onExploreProblems: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onApplyNow, onExploreProblems }) => {
  const problems = MockDatabaseService.getProblemStatements();
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');

  const sectors = ['ALL', 'Agriculture', 'CleanTech', 'Healthcare', 'Infrastructure & Smart Cities'];

  const filteredProblems = problems.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || p.sector.toLowerCase() === selectedSector.toLowerCase();
    return matchesQuery && matchesSector;
  });

  const handleOpenEstimate = (prob: ProblemStatement) => {
    setSelectedProblem(prob);
    setIsEstimatorOpen(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>DPIIT National Innovation Discovery Initiative</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              One record of your startup,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                visible to the officials
              </span>{' '}
              who can back it.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Submit your startup once. An AI reviewer conducts the deep technical inquiry, a certified human analyst verifies the judgment, and your profile is shortlisted for ministry procurement — with full reasoning attached.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onApplyNow}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Submit Your Startup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedProblem(null);
                  setIsEstimatorOpen(true);
                }}
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>AI Problem Sizing Engine</span>
              </button>
            </div>
          </div>

          {/* Quick Flow Panel */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Accountable Governance Flow</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">STEP 1 - 4</span>
            </div>

            <ol className="space-y-4 mt-5 text-xs text-slate-300">
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-white block font-semibold">Founder Submits &amp; AI Chats</strong>
                  <span>Founder completes adaptive counter-questions clarifying unit economics and differentiation.</span>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-white block font-semibold">AI Scoring &amp; Patent Prior-Art</strong>
                  <span>Simulates multi-parameter scoring and compares novelty against registered patents.</span>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-white block font-semibold">Human Reviewer (HITL) Check</strong>
                  <span>Independent analyst audits recommendations, overrides scores if needed, and records rationale.</span>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </span>
                <div>
                  <strong className="text-white block font-semibold">Ministry Discovery &amp; Pilots</strong>
                  <span>Empanelled government officials access shortlisted innovations for state contracts.</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* AI Estimator Callout Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl border border-blue-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Public Civic Sizing Tool</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Have a civic problem statement? Get an instant AI project size estimate.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our dynamic sizing engine provides realistic grant budgets (Min/Expected/Max), itemized CAPEX/OPEX breakdowns, 3-point PERT schedules, and risk matrices tailored for Indian public sector procurement.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProblem(null);
              setIsEstimatorOpen(true);
            }}
            className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Open AI Estimator</span>
          </button>
        </div>
      </section>

      {/* Open Problem Statements Section */}
      <section id="open-problems" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Active Ministry Challenges
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Open Problem Statements
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Government departments post specific challenges here. Any citizen founder or startup can apply with a solution.
            </p>
          </div>

          {/* Search & Sector Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((prob) => (
            <div
              key={prob.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {prob.sector}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Deadline: {prob.deadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {prob.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {prob.description}
                </p>

                <div className="bg-slate-50 rounded-xl p-3 text-xs border border-slate-100">
                  <strong className="text-slate-800 block mb-0.5">Expected Outcomes:</strong>
                  <span className="text-slate-600">{prob.expected_outcomes}</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenEstimate(prob)}
                  className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Cost &amp; Timeline</span>
                </button>

                <button
                  onClick={onApplyNow}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Explainers */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Three Bodies, One Accountable Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Strict role-based segregation ensures transparency and data privacy at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Citizen Founder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submits startup profiles, answers AI clarifying inquiries, tracks application lifecycle from Draft to Shortlist, and reviews patent novelty cards.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Reviewer (HITL)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A government-appointed analyst who validates AI recommendations, audits founder chat transcripts, and approves or overrides scores before ministry exposure.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Government Official</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ministry leaders who publish challenges, discover pre-screened startup shortlists with complete audit trails, and issue commercial pilot contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Estimator Modal Component */}
      <AIEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        initialStatement={selectedProblem ? `${selectedProblem.title}: ${selectedProblem.description}` : ''}
        initialSector={selectedProblem?.sector}
      />
    </div>
  );
};
