import React from 'react';
import { User } from '../types/database';
import {
  ShieldCheck,
  Building2,
  Sparkles,
  Calculator,
  GitBranch,
  LogOut,
  User as UserIcon,
  Home,
  CheckCircle,
} from 'lucide-react';

interface CivicHeaderProps {
  currentUser: User;
  onUserChange: (user: User) => void;
  activeTab: 'login' | 'landing' | 'founder' | 'reviewer' | 'official';
  setActiveTab: (tab: 'login' | 'landing' | 'founder' | 'reviewer' | 'official') => void;
  onOpenFlowDiagram: () => void;
  onOpenEstimator?: () => void;
  onLogout: () => void;
}

export const CivicHeader: React.FC<CivicHeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenFlowDiagram,
  onOpenEstimator,
  onLogout,
}) => {
  const role = currentUser?.role;

  // STRICT RBAC TAB VISIBILITY MATRIX
  // Founder: landing, founder
  // Official: official only
  // Reviewer: landing, founder, reviewer
  // Guest: landing, login
  const navItems = [
    {
      id: 'landing' as const,
      label: 'Public Portal',
      icon: Home,
      allowed: role === 'FOUNDER' || role === 'REVIEWER' || !role,
    },
    {
      id: 'founder' as const,
      label: 'Citizen Founder',
      icon: Sparkles,
      allowed: role === 'FOUNDER' || role === 'REVIEWER',
    },
    {
      id: 'official' as const,
      label: 'Government Official',
      icon: Building2,
      allowed: role === 'OFFICIAL',
    },
    {
      id: 'reviewer' as const,
      label: 'HITL Reviewer',
      icon: ShieldCheck,
      allowed: role === 'REVIEWER',
    },
  ].filter((item) => item.allowed);

  const roleTheme = {
    FOUNDER: {
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
      label: 'Citizen Founder',
      icon: Sparkles,
    },
    OFFICIAL: {
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      label: 'Government Official',
      icon: Building2,
    },
    REVIEWER: {
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      label: 'HITL Reviewer Analyst',
      icon: ShieldCheck,
    },
  }[role] || {
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-300',
    label: 'Guest Visitor',
    icon: UserIcon,
  };

  const RoleIcon = roleTheme.icon;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Gov Strip */}
      <div className="bg-slate-950 text-slate-300 text-[11px] px-4 sm:px-6 py-1.5 flex flex-wrap justify-between items-center border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wider text-slate-200">
            GOVERNMENT OF INDIA • NATIONAL STARTUP &amp; INNOVATION DISCOVERY PORTAL
          </span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400 text-[10px]">
          <span>DPIIT Empanelled</span>
          <span>•</span>
          <span>DPDPA 2023 Compliant</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">RBAC Security Active</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Portal Title */}
          <div
            onClick={() => {
              if (role === 'OFFICIAL') {
                setActiveTab('official');
              } else {
                setActiveTab('landing');
              }
            }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-950 to-blue-900 flex items-center justify-center text-white font-black shadow-sm text-lg tracking-tighter border border-slate-700">
              ⛛
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base">GovBridge</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                  GSP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                National Innovation Discovery &amp; Procurement Platform
              </p>
            </div>
          </div>

          {/* Strict Role-Based Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions & User Session */}
          <div className="flex items-center space-x-3">
            {/* AI Estimator Modal Launch Button */}
            {onOpenEstimator && (
              <button
                onClick={onOpenEstimator}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition-colors cursor-pointer"
                title="AI Cost & Timeline Estimator"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Estimator</span>
              </button>
            )}

            {/* Architecture Flow Diagram */}
            <button
              onClick={onOpenFlowDiagram}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-medium transition-colors cursor-pointer"
              title="View Platform Workflow"
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-500" />
              <span>Flow</span>
            </button>

            {/* User Role Card & Switcher */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.full_name || 'Guest User'}
                </div>
                <div className="flex items-center justify-end space-x-1 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold border ${roleTheme.badgeBg}`}>
                    {roleTheme.label}
                  </span>
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                <RoleIcon className="w-4 h-4 text-slate-700" />
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Switch Body / Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden py-2 border-t border-slate-100 flex items-center justify-between gap-1 overflow-x-auto">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-100'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {onOpenEstimator && (
            <button
              onClick={onOpenEstimator}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium"
            >
              <Calculator className="w-3 h-3" />
              <span>AI</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
