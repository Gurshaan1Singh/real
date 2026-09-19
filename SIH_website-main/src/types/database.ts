export type UserRole = 'FOUNDER' | 'OFFICIAL' | 'REVIEWER';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  department_or_org?: string;
  phone?: string;
  is_verified: boolean;
  created_at: string;
  updated_at?: string;
}

export type StartupStage = 'IDEA' | 'PROTOTYPE' | 'REVENUE' | 'SCALING';

export type StartupStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'AI_ANALYSIS'
  | 'HUMAN_REVIEW'
  | 'SHORTLISTED'
  | 'NOT_SHORTLISTED'
  | 'NEEDS_INFO';

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
}

export interface TractionMetrics {
  users?: number;
  revenue?: number;
  pilots?: number;
  patents_applied?: number;
}

export interface Startup {
  id: string;
  founder_id: string;
  startup_name: string;
  sector: string;
  stage: StartupStage;
  problem_statement: string;
  target_market: string;
  business_model: string;
  team_details: TeamMember[];
  traction_metrics: TractionMetrics;
  funding_ask: number;
  pitch_deck_url?: string;
  video_pitch_url?: string;
  status: StartupStatus;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Patent {
  id: string;
  patent_number: string;
  title: string;
  abstract: string;
  sector: string;
  assignee: string;
  filing_country: string;
  filing_date: string;
  claims_summary: string;
  keywords: string[];
  created_at: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'AI' | 'FOUNDER';
  text: string;
  timestamp: string;
  question_category?: string;
}

export interface AIInterview {
  id: string;
  startup_id: string;
  messages: InterviewMessage[];
  counter_questions: string[];
  is_completed: boolean;
  started_at: string;
  completed_at?: string;
}

export type RecommendationTier = 'STRONG_FIT' | 'NEEDS_REVIEW' | 'NOT_A_FIT';

export interface ParameterScores {
  problem_solution_fit: number;
  market_size_viability: number;
  team_strength: number;
  originality_innovation: number;
  feasibility_scalability: number;
  clarity_consistency: number;
  government_alignment: number;
}

export interface AIEvaluation {
  id: string;
  startup_id: string;
  composite_score: number;
  parameter_scores: ParameterScores;
  patent_similarity_percentage: number;
  most_similar_patent_id?: string;
  patent_analysis_notes: string;
  written_rationale: string;
  flags_and_risks: string[];
  recommended_tier: RecommendationTier;
  evaluated_at: string;
}

export type ReviewerAction = 'APPROVE' | 'OVERRIDE_SCORE' | 'REQUEST_INFO' | 'REJECT';

export interface ReviewerAudit {
  id: string;
  startup_id: string;
  reviewer_id: string;
  action: ReviewerAction;
  previous_score?: number;
  overridden_score?: number;
  reviewer_comments: string;
  previous_status: StartupStatus;
  new_status: StartupStatus;
  created_at: string;
}

export type ProblemStatus = 'OPEN' | 'IN_REVIEW' | 'CLOSED';

export interface ProblemStatement {
  id: string;
  official_id: string;
  title: string;
  description: string;
  sector: string;
  deadline: string;
  expected_outcomes: string;
  status: ProblemStatus;
  created_at: string;
  updated_at: string;
}

export type NotificationType = 'STATUS_CHANGE' | 'INFO_REQUEST' | 'SHORTLIST_ALERT' | 'SYSTEM';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  action_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface BudgetBreakdownItem {
  category: string;
  percentage: number;
  amount_inr: number;
  justification: string;
}

export interface MilestoneItem {
  phase: string;
  title: string;
  duration_weeks: number;
  deliverables: string[];
}

export interface RiskMatrixItem {
  risk: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  probability: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface RecommendedStack {
  edge_hardware?: string[];
  backend: string[];
  frontend: string[];
  ai_ml: string[];
  cloud_infra: string[];
}

export interface AIEstimateResult {
  statement: string;
  detected_archetype: string;
  sector: string;
  domain_explanation: string;
  budget_range: {
    min_inr: number;
    expected_inr: number;
    max_inr: number;
  };
  budget_breakdown: BudgetBreakdownItem[];
  pert_timeline: {
    optimistic_months: number;
    expected_months: number;
    pessimistic_months: number;
    pert_weighted_months: number;
  };
  milestones: MilestoneItem[];
  recommended_stack: RecommendedStack;
  risk_matrix: RiskMatrixItem[];
  government_alignment_tags: string[];
  estimated_at: string;
}

export interface OverlappingClaim {
  patent_claim_number: number;
  patent_claim_snippet: string;
  user_proposal_snippet: string;
  claim_similarity_percentage: number;
}

export interface PatentMatchRecord {
  patent_id: string;
  title: string;
  assignee: string;
  filing_date: string;
  jurisdiction: string;
  abstract: string;
  similarity_percentage: number;
  overlapping_claims: OverlappingClaim[];
  key_overlapping_terms: string[];
}

export interface PatentSimilarityReport {
  proposal_title: string;
  analyzed_text_length: number;
  highest_similarity_percentage: number;
  novelty_tier: 'HIGH_NOVELTY' | 'MODERATE_SIMILARITY' | 'HIGH_COLLISION_RISK';
  novelty_summary: string;
  patentable_assessment: string;
  closest_patents: PatentMatchRecord[];
  evaluator_recommendation: string;
  analyzed_at: string;
}


