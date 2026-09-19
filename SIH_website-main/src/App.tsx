import React, { useState, useEffect } from 'react';
import { User } from './types/database';
import { MockDatabaseService } from './services/mockDatabase';
import { CivicHeader } from './components/CivicHeader';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { FounderDashboard } from './pages/FounderDashboard';
import { ReviewerDashboard } from './pages/ReviewerDashboard';
import { OfficialDashboard } from './pages/OfficialDashboard';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';
import { AIEstimatorModal } from './components/AIEstimatorModal';
import { ShieldAlert } from 'lucide-react';

export function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    MockDatabaseService.initDatabase();
    return MockDatabaseService.getCurrentUser();
  });
  const [activeTab, setActiveTab] = useState<'login' | 'landing' | 'founder' | 'reviewer' | 'official'>('login');
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [rbacAlert, setRbacAlert] = useState<string | null>(null);

  useEffect(() => {
    MockDatabaseService.initDatabase();
  }, []);

  const handleUserChange = (user: User) => {
    MockDatabaseService.setCurrentUser(user);
    setCurrentUser(user);
  };

  const handleLoginSuccess = (user: User, destinationTab: 'founder' | 'reviewer' | 'official') => {
    handleUserChange(user);
    // Directly direct user to their permitted home dashboard
    if (user.role === 'OFFICIAL') {
      setActiveTab('official');
    } else if (user.role === 'REVIEWER') {
      setActiveTab(destinationTab);
    } else {
      setActiveTab(destinationTab);
    }
  };

  // STRICT RBAC TAB ACCESS GUARD
  const safeSetActiveTab = (tab: 'login' | 'landing' | 'founder' | 'reviewer' | 'official') => {
    if (tab === 'login') {
      setActiveTab('login');
      return;
    }

    const role = currentUser?.role;

    // Rule 1: Official can ONLY see Official Dashboard
    if (role === 'OFFICIAL') {
      if (tab !== 'official') {
        setRbacAlert('Access Denied: Government Officials are restricted strictly to the Official Dashboard.');
        setTimeout(() => setRbacAlert(null), 3500);
        setActiveTab('official');
        return;
      }
    }

    // Rule 2: Founder can ONLY see Public Portal & Citizen Founder Dashboard
    if (role === 'FOUNDER') {
      if (tab !== 'landing' && tab !== 'founder') {
        setRbacAlert('Access Denied: Citizen Founders are restricted to the Public Portal and Founder Dashboard.');
        setTimeout(() => setRbacAlert(null), 3500);
        setActiveTab('founder');
        return;
      }
    }

    // Rule 3: Reviewer can see Public Portal, Citizen Founder, and Reviewer (Cannot see Official)
    if (role === 'REVIEWER') {
      if (tab === 'official') {
        setRbacAlert('Access Denied: Reviewers cannot access the Government Official Executive Terminal.');
        setTimeout(() => setRbacAlert(null), 3500);
        setActiveTab('reviewer');
        return;
      }
    }

    // Rule 4: Guest / Visitor
    if (!role) {
      if (tab !== 'landing') {
        setActiveTab('login');
        return;
      }
    }

    setActiveTab(tab);
  };

  if (activeTab === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={() => {
          // Guest mode: clear role & go to landing
          MockDatabaseService.setCurrentUser({
            id: 'guest',
            email: 'guest@citizen.in',
            role: 'FOUNDER', // fallback guest role
            full_name: 'Citizen Guest',
            is_verified: false,
            created_at: new Date().toISOString(),
          });
          setActiveTab('landing');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <CivicHeader
        currentUser={currentUser}
        onUserChange={handleUserChange}
        activeTab={activeTab}
        setActiveTab={safeSetActiveTab}
        onOpenFlowDiagram={() => setIsFlowModalOpen(true)}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onLogout={() => setActiveTab('login')}
      />

      {/* RBAC Violation Notice Banner */}
      {rbacAlert && (
        <div className="bg-rose-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md animate-in slide-in-from-top duration-200">
          <div className="flex items-center space-x-2 max-w-7xl mx-auto w-full">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{rbacAlert}</span>
          </div>
          <button onClick={() => setRbacAlert(null)} className="text-white hover:text-rose-200">
            ✕
          </button>
        </div>
      )}

      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onApplyNow={() => {
              const founder = MockDatabaseService.getUsers().find((u) => u.role === 'FOUNDER')!;
              handleUserChange(founder);
              safeSetActiveTab('founder');
            }}
            onExploreProblems={() => {
              const element = document.getElementById('open-problems');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        )}

        {activeTab === 'founder' && <FounderDashboard />}
        {activeTab === 'reviewer' && <ReviewerDashboard />}
        {activeTab === 'official' && <OfficialDashboard />}
      </main>

      {/* Modals */}
      <SystemArchitectureModal
        isOpen={isFlowModalOpen}
        onClose={() => setIsFlowModalOpen(false)}
      />

      <AIEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-slate-200">
              Government Startup &amp; Innovation Portal (GSP)
            </div>
            <p className="text-[11px] text-slate-500">
              Department for Promotion of Industry and Internal Trade (DPIIT) • Ministry of Commerce and Industry
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button
              onClick={() => setActiveTab('login')}
              className="text-amber-400 hover:underline cursor-pointer font-semibold"
            >
              Switch Body / Login
            </button>
            <span>•</span>
            <button
              onClick={() => setIsEstimatorOpen(true)}
              className="text-blue-400 hover:underline cursor-pointer font-semibold"
            >
              AI Problem Sizing
            </button>
            <span>•</span>
            <button
              onClick={() => setIsFlowModalOpen(true)}
              className="text-slate-300 hover:underline cursor-pointer"
            >
              System Flow Diagram
            </button>
            <span>•</span>
            <span className="text-slate-400">WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span className="text-slate-400">DPDPA 2023 Certified</span>
            <span>•</span>
            <span className="text-emerald-400">Database: Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
