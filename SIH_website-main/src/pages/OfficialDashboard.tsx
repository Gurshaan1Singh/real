import React, { useState } from 'react';
import { MockDatabaseService } from '../services/mockDatabase';
import { Startup, ProblemStatement, AIEvaluation } from '../types/database';
import { AIEstimatorModal } from '../components/AIEstimatorModal';
import {
  Building2,
  PlusCircle,
  Calculator,
  Search,
  CheckCircle2,
  PieChart,
  BarChart3,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';

export const OfficialDashboard: React.FC = () => {
  const startups = MockDatabaseService.getStartups();
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>(
    MockDatabaseService.getProblemStatements()
  );

  const [selectedStartup, setSelectedStartup] = useState<Startup>(startups[0] || null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [estimatorStatement, setEstimatorStatement] = useState('');
  const [estimatorSector, setEstimatorSector] = useState('');

  // New problem form
  const [newProblem, setNewProblem] = useState({
    title: '',
    description: '',
    sector: 'Agriculture',
    deadline: '2026-12-31',
    expected_outcomes: '',
  });

  const evaluation: AIEvaluation | undefined = selectedStartup
    ? MockDatabaseService.getEvaluations().find((e) => e.startup_id === selectedStartup.id)
    : undefined;

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    const created = MockDatabaseService.createProblemStatement({
      official_id: 'user-official-1',
      title: newProblem.title,
      description: newProblem.description,
      sector: newProblem.sector,
      deadline: newProblem.deadline,
      expected_outcomes: newProblem.expected_outcomes,
      status: 'OPEN',
    });

    setProblemStatements(MockDatabaseService.getProblemStatements());
    setIsCreateModalOpen(false);
    setNewProblem({
      title: '',
      description: '',
      sector: 'Agriculture',
      deadline: '2026-12-31',
      expected_outcomes: '',
    });
  };

  const handleOpenEstimatorForProblem = (title: string, desc: string, sec: string) => {
    setEstimatorStatement(`${title}: ${desc}`);
    setEstimatorSector(sec);
    setIsEstimatorOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Ministry Innovation Discovery Cell
            </span>
            <span className="text-xs text-slate-500">• Government of India</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Official Discovery Portal</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Access pre-screened startup shortlists with reviewer audits and publish departmental challenges with instant AI sizing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setEstimatorStatement('Design of an affordable, surge-resistant bidirectional solar micro-inverter for rural tribal electrification');
              setEstimatorSector('CleanTech');
              setIsEstimatorOpen(true);
            }}
            className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors flex items-center space-x-2 cursor-pointer shadow-xs"
          >
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>Estimate with sih-cost-estimator</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Challenge</span>
          </button>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Empanelled Startups</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{startups.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">100% Reviewer Audited</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Active Challenges</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{problemStatements.length}</div>
          <span className="text-[10px] text-blue-600 font-semibold">Open for submissions</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Average AI Score</span>
          <div className="text-2xl font-black text-blue-600 mt-1">84.2</div>
          <span className="text-[10px] text-slate-500">Across 7 civic parameters</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Avg Pilot Capex Ask</span>
          <div className="text-2xl font-black text-slate-900 mt-1">₹68.5 L</div>
          <span className="text-[10px] text-slate-500">Validated against budget</span>
        </div>
      </div>

      {/* Main Content Grid: Shortlisted Innovations vs Department Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Shortlisted Startups */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Pre-Vetted Startup Shortlist</span>
              </h3>
              <span className="text-xs text-slate-500">{startups.length} Profiles</span>
            </div>

            <div className="space-y-3">
              {startups.map((s) => {
                const isSelected = selectedStartup?.id === s.id;
                const evalItem = MockDatabaseService.getEvaluations().find((e) => e.startup_id === s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStartup(s)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-sm text-slate-900">{s.startup_name}</h4>
                          <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-blue-100 text-blue-800">
                            {s.sector}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{s.problem_statement}</p>
                      </div>

                      <div className="text-right shrink-0 pl-3">
                        <span className="text-sm font-black text-emerald-700 block">
                          {evalItem ? `${evalItem.composite_score} pts` : '—'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          ₹{(s.funding_ask / 100000).toFixed(1)}L Ask
                        </span>
                      </div>
                    </div>

                    {isSelected && evalItem && (
                      <div className="mt-3 pt-3 border-t border-emerald-200/60 text-xs text-slate-600 space-y-2">
                        <p className="leading-relaxed">
                          <strong className="text-slate-900">Reviewer Rationale:</strong> {evalItem.written_rationale}
                        </p>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-emerald-700 font-semibold text-[11px]">
                            Recommendation: {evalItem.recommended_tier}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEstimatorForProblem(s.startup_name, s.problem_statement, s.sector);
                            }}
                            className="text-xs text-blue-700 hover:underline font-semibold flex items-center space-x-1"
                          >
                            <Calculator className="w-3.5 h-3.5" />
                            <span>Run AI Capex Validation</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Challenges Posted by Officials */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Departmental Challenges ({problemStatements.length})</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                + Post New
              </button>
            </div>

            <div className="space-y-3">
              {problemStatements.map((prob) => (
                <div key={prob.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                      {prob.sector}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Due: {prob.deadline}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{prob.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{prob.description}</p>

                  <div className="pt-2 flex justify-between items-center border-t border-slate-200 text-xs">
                    <span className="text-slate-500 font-medium">Status: {prob.status}</span>
                    <button
                      onClick={() => handleOpenEstimatorForProblem(prob.title, prob.description, prob.sector)}
                      className="px-3 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-blue-600" />
                      <span>Run sih-cost-estimator</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Problem Statement Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-slate-950 text-white p-5 flex justify-between items-center border-b border-slate-800">
              <h3 className="font-bold text-sm">Publish New Departmental Challenge</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProblem} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Challenge Title</label>
                <input
                  type="text"
                  required
                  value={newProblem.title}
                  onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                  placeholder="e.g. AI-Powered Early Pest Infestation Detection in Cotton Belts"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector</label>
                  <select
                    value={newProblem.sector}
                    onChange={(e) => setNewProblem({ ...newProblem, sector: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option>Agriculture</option>
                    <option>CleanTech</option>
                    <option>Healthcare</option>
                    <option>Infrastructure &amp; Smart Cities</option>
                    <option>Cybersecurity</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={newProblem.deadline}
                    onChange={(e) => setNewProblem({ ...newProblem, deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Challenge Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProblem.description}
                  onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                  placeholder="Detail the exact problem, constraints, and field context..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expected Deliverables &amp; Outcomes</label>
                <textarea
                  rows={2}
                  required
                  value={newProblem.expected_outcomes}
                  onChange={(e) => setNewProblem({ ...newProblem, expected_outcomes: e.target.value })}
                  placeholder="e.g. Field pilot across 5 districts with >85% recall rate..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (newProblem.title || newProblem.description) {
                      handleOpenEstimatorForProblem(newProblem.title, newProblem.description, newProblem.sector);
                    }
                  }}
                  className="text-blue-700 hover:underline font-semibold flex items-center space-x-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Preview AI Sizing</span>
                </button>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg"
                  >
                    Publish Challenge
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Estimator Modal */}
      <AIEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        initialStatement={estimatorStatement}
        initialSector={estimatorSector}
      />
    </div>
  );
};
