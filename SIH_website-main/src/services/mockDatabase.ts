import {
  User,
  Startup,
  Patent,
  AIInterview,
  AIEvaluation,
  ReviewerAudit,
  ProblemStatement,
  Notification,
} from '../types/database';

export const SEED_USERS: User[] = [
  {
    id: 'user-founder-1',
    email: 'founder@krishi-drones.in',
    role: 'FOUNDER',
    full_name: 'Aarav Patel',
    department_or_org: 'AeroKrishi Technologies',
    phone: '+91 98765 43210',
    is_verified: true,
    created_at: '2026-08-01T09:00:00Z',
  },
  {
    id: 'user-official-1',
    email: 'official@meity.gov.in',
    role: 'OFFICIAL',
    full_name: 'Dr. Ramesh Verma',
    department_or_org: 'Ministry of Electronics & Information Technology',
    phone: '+91 11 2436 0000',
    is_verified: true,
    created_at: '2026-07-15T10:00:00Z',
  },
  {
    id: 'user-reviewer-1',
    email: 'reviewer.neha@meity-audits.gov.in',
    role: 'REVIEWER',
    full_name: 'Neha Sen (Senior Innovation Analyst)',
    department_or_org: 'National Startup Assessment Directorate',
    phone: '+91 11 2436 1122',
    is_verified: true,
    created_at: '2026-07-20T11:00:00Z',
  },
];

export const SEED_PATENTS: Patent[] = [
  {
    id: 'pat-001',
    patent_number: 'IN-PAT-2023-0912',
    title: 'Autonomous Drone System for Precision Agricultural Spraying with Multispectral Crop Health Mapping',
    abstract: 'A method and apparatus for UAV-based precision spraying in paddy and wheat crops using normalized difference vegetation index (NDVI) sensors mounted on a hexacopter frame with dynamic flow-rate nozzle control.',
    sector: 'Agriculture',
    assignee: 'AgrioRobotics India Pvt Ltd',
    filing_country: 'IN',
    filing_date: '2023-04-12',
    claims_summary: 'Claims include autonomous waypoint flight paths, real-time chlorophyll fluorescence sensing, and chemical dispersal modulation via pulse-width injection valves.',
    keywords: ['drone', 'precision agriculture', 'multispectral', 'spraying', 'crop mapping', 'uav'],
    created_at: '2023-05-01T00:00:00Z',
  },
  {
    id: 'pat-002',
    patent_number: 'IN-PAT-2022-4410',
    title: 'Decentralized Cold Chain Logistics Monitoring Using IoT Low-Power Sensors and Smart Contracts',
    abstract: 'An integrated tracking system providing cryptographic proof of temperature and humidity integrity for pharmaceutical vaccines and perishables in transit across rural corridors.',
    sector: 'Logistics',
    assignee: 'Bharat SupplyChain Solutions',
    filing_country: 'IN',
    filing_date: '2022-11-20',
    claims_summary: 'Tamper-proof BLE beacon with solar scavenging, zero-knowledge verification of transit adherence, and automated penalty disbursement.',
    keywords: ['cold chain', 'iot', 'sensors', 'temperature monitoring', 'smart contracts', 'logistics'],
    created_at: '2022-12-05T00:00:00Z',
  },
  {
    id: 'pat-003',
    patent_number: 'IN-PAT-2024-1189',
    title: 'AI-Assisted Retinal Screening Device for Diabetic Retinopathy at Primary Health Centers',
    abstract: 'A handheld fundus imaging device equipped with edge-inference convolutional neural network for rapid staging of microaneurysms without pupil dilation.',
    sector: 'Healthcare',
    assignee: 'VisionCare Tech',
    filing_country: 'IN',
    filing_date: '2024-02-14',
    claims_summary: 'Optical split-path illumination, embedded neural network accelerator, offline tele-ophthalmology triage scoring.',
    keywords: ['retinal screening', 'diabetic retinopathy', 'edge ai', 'telehealth', 'portable medical device'],
    created_at: '2024-03-01T00:00:00Z',
  },
  {
    id: 'pat-004',
    patent_number: 'IN-PAT-2023-8821',
    title: 'Low-Cost Grid-Scale Zinc-Air Flow Battery Membrane with Enhanced Cyclical Stability',
    abstract: 'An alkaline-resistant polymer electrolyte membrane designed for extended cathode lifetime in decentralized renewable microgrid storage.',
    sector: 'CleanTech',
    assignee: 'CleanPower Labs',
    filing_country: 'IN',
    filing_date: '2023-08-30',
    claims_summary: 'Cross-linked PVA-silica nanocomposite matrix preventing zinc dendrite puncture over 4000 continuous charge cycles.',
    keywords: ['energy storage', 'zinc-air battery', 'renewable grid', 'flow battery', 'clean energy'],
    created_at: '2023-09-15T00:00:00Z',
  },
];

export const SEED_PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: 'prob-001',
    official_id: 'user-official-1',
    title: 'AI-Powered Early Pest Infestation Detection in Cotton Belts',
    description: 'Seeking low-cost automated hardware or smartphone camera solutions that can identify pink bollworm infestation in cotton farms before visual foliage damage occurs.',
    sector: 'Agriculture',
    deadline: '2026-11-30',
    expected_outcomes: 'Field pilot across 5 districts in Maharashtra & Gujarat with >85% recall rate and offline processing capability.',
    status: 'OPEN',
    created_at: '2026-08-10T10:00:00Z',
    updated_at: '2026-08-10T10:00:00Z',
  },
  {
    id: 'prob-002',
    official_id: 'user-official-1',
    title: 'Indigenous High-Efficiency Solar Micro-Inverter for Rural Micro-Grids',
    description: 'Design and deployment of an affordable, surge-resistant bidirectional micro-inverter with 98% efficiency to support decentralized tribal village electrification.',
    sector: 'CleanTech',
    deadline: '2026-12-15',
    expected_outcomes: 'Functional prototype tested under extreme thermal variations (-5°C to 50°C) with MTBF exceeding 10 years.',
    status: 'OPEN',
    created_at: '2026-08-14T11:00:00Z',
    updated_at: '2026-08-14T11:00:00Z',
  },
  {
    id: 'prob-003',
    official_id: 'user-official-1',
    title: 'Interoperable Smart Electronic Health Record Gateway for PHCs',
    description: 'Lightweight FHIR-compliant offline-first data sync tool for rural Anganwadi workers and primary health centers with low connectivity.',
    sector: 'Healthcare',
    deadline: '2026-10-25',
    expected_outcomes: 'Bi-directional ABHA registry synchronization with local cache encryption.',
    status: 'OPEN',
    created_at: '2026-08-05T09:00:00Z',
    updated_at: '2026-08-05T09:00:00Z',
  },
];

export const SEED_STARTUPS: Startup[] = [
  {
    id: 'startup-001',
    founder_id: 'user-founder-1',
    startup_name: 'AeroKrishi Micro-Sprayers',
    sector: 'Agriculture',
    stage: 'PROTOTYPE',
    problem_statement: 'Excessive pesticide usage and acute labor shortage in paddy farming leading to chemical runoff and high cultivation costs.',
    target_market: 'Small and marginal farmers across Punjab, Haryana, and Andhra Pradesh; 14 million hectares target addressable market.',
    business_model: 'FaaS (Farming as a Service) pay-per-acre spray model via village level entrepreneurs (VLEs) and direct hardware sales.',
    team_details: [
      { name: 'Aarav Patel', role: 'Founder & CEO', experience: 'Ex-ISRO Avionics Engineer, 6 yrs UAV systems' },
      { name: 'Dr. Sunita Rao', role: 'Chief Agronomist', experience: '12 yrs IARI research in pest resistance' },
    ],
    traction_metrics: {
      users: 450,
      revenue: 850000,
      pilots: 4,
      patents_applied: 1,
    },
    funding_ask: 3500000,
    pitch_deck_url: 'https://storage.gov.in/portal/decks/aerokrishi_deck.pdf',
    video_pitch_url: 'https://storage.gov.in/portal/videos/aerokrishi_demo.mp4',
    status: 'HUMAN_REVIEW',
    submitted_at: '2026-09-02T14:30:00Z',
    created_at: '2026-09-01T10:00:00Z',
    updated_at: '2026-09-03T16:00:00Z',
  },
  {
    id: 'startup-002',
    founder_id: 'user-founder-1',
    startup_name: 'BioVolt Storage',
    sector: 'CleanTech',
    stage: 'REVENUE',
    problem_statement: 'Lack of safe, fire-resistant non-lithium energy storage solutions for community solar installations in tier-2/3 regions.',
    target_market: 'Discoms, rooftop commercial solar aggregators, telecom tower operators.',
    business_model: 'B2B equipment leasing and turnkey storage contracts with remote battery management subscription.',
    team_details: [
      { name: 'Vikram Joshi', role: 'Co-Founder & CTO', experience: 'PhD Electrochemistry, IIT Bombay' },
      { name: 'Priya Nambiar', role: 'COO', experience: 'Ex-Tata Power Supply Chain lead' },
    ],
    traction_metrics: {
      users: 22,
      revenue: 4200000,
      pilots: 8,
      patents_applied: 2,
    },
    funding_ask: 12000000,
    pitch_deck_url: 'https://storage.gov.in/portal/decks/biovolt_deck.pdf',
    video_pitch_url: '',
    status: 'SHORTLISTED',
    submitted_at: '2026-08-20T11:00:00Z',
    created_at: '2026-08-18T10:00:00Z',
    updated_at: '2026-08-25T15:30:00Z',
  },
];

export const SEED_EVALUATIONS: AIEvaluation[] = [
  {
    id: 'eval-001',
    startup_id: 'startup-001',
    composite_score: 84.5,
    parameter_scores: {
      problem_solution_fit: 88,
      market_size_viability: 82,
      team_strength: 90,
      originality_innovation: 71,
      feasibility_scalability: 85,
      clarity_consistency: 86,
      government_alignment: 91,
    },
    patent_similarity_percentage: 64.2,
    most_similar_patent_id: 'pat-001',
    patent_analysis_notes: 'Moderate to high overlap with IN-PAT-2023-0912 regarding UAV multispectral spraying mechanisms. However, AeroKrishi incorporates unique edge-AI insect sound harmonics and lower mass airframe claims.',
    written_rationale: 'Strong technical credentials and clear alignment with national agriculture modernization missions. The team demonstrates high domain knowledge during counter-questioning. Patent similarity is elevated (64.2%) — recommended for technical human reviewer validation before official shortlisting.',
    flags_and_risks: [
      '64.2% patent overlap detected with IN-PAT-2023-0912 (AgrioRobotics)',
      'Requires DGCA Type Certificate compliance for drone payloads > 10kg',
    ],
    recommended_tier: 'STRONG_FIT',
    evaluated_at: '2026-09-02T15:00:00Z',
  },
  {
    id: 'eval-002',
    startup_id: 'startup-002',
    composite_score: 91.0,
    parameter_scores: {
      problem_solution_fit: 94,
      market_size_viability: 92,
      team_strength: 95,
      originality_innovation: 88,
      feasibility_scalability: 89,
      clarity_consistency: 90,
      government_alignment: 95,
    },
    patent_similarity_percentage: 24.5,
    most_similar_patent_id: 'pat-004',
    patent_analysis_notes: 'Low similarity (24.5%) with existing patents. Proprietary bio-gel electrolyte provides clear novelty differentiation over traditional zinc-air flow designs.',
    written_rationale: 'Exceptional traction metrics with commercial contracts active. Solves critical national import dependency on lithium cell chemistry. Human reviewer approved recommendation.',
    flags_and_risks: [],
    recommended_tier: 'STRONG_FIT',
    evaluated_at: '2026-08-21T09:00:00Z',
  },
];

export const SEED_REVIEWER_AUDITS: ReviewerAudit[] = [
  {
    id: 'audit-001',
    startup_id: 'startup-002',
    reviewer_id: 'user-reviewer-1',
    action: 'APPROVE',
    previous_score: 91.0,
    overridden_score: 91.0,
    reviewer_comments: 'Verified laboratory thermal stress test reports and B2B vendor letters of intent. Patent novelty search cleared by panel. Approved for Government Official Shortlist.',
    previous_status: 'AI_ANALYSIS',
    new_status: 'SHORTLISTED',
    created_at: '2026-08-25T15:30:00Z',
  },
];

export const SEED_INTERVIEWS: AIInterview[] = [
  {
    id: 'interview-001',
    startup_id: 'startup-001',
    is_completed: true,
    started_at: '2026-09-02T14:35:00Z',
    completed_at: '2026-09-02T14:55:00Z',
    counter_questions: [
      'How does your spraying calibration adapt to wind drift in open paddy fields?',
      'What is your unit economics per acre compared to traditional manual labor spraying in Punjab?',
      'Have you conducted prior art searches against existing UAV spray nozzle patents (specifically IN-PAT-2023-0912)?',
    ],
    messages: [
      {
        id: 'msg-1',
        sender: 'AI',
        text: 'Welcome Aarav. I have parsed your submission for AeroKrishi Micro-Sprayers. To assist the evaluation committee, I will ask a few clarifying counter-questions. First: How does your spraying calibration adapt to wind drift in open paddy fields?',
        timestamp: '2026-09-02T14:36:00Z',
        question_category: 'Technical Feasibility',
      },
      {
        id: 'msg-2',
        sender: 'FOUNDER',
        text: 'We use an onboard anemometer integrated into our micro-controller which dynamically adjusts droplet size from 150 to 350 microns and tilts the rotary spray nozzles into the wind vector in real time.',
        timestamp: '2026-09-02T14:40:00Z',
      },
      {
        id: 'msg-3',
        sender: 'AI',
        text: 'Understood. Now regarding unit economics: Manual labor in Punjab costs approx ₹400-500 per acre with 4-5 hours spent. What is your unit cost and turnaround time?',
        timestamp: '2026-09-02T14:42:00Z',
        question_category: 'Unit Economics & Market Viability',
      },
      {
        id: 'msg-4',
        sender: 'FOUNDER',
        text: 'Our service charge is ₹280 per acre with completion in under 12 minutes. The farmer saves 40% in chemical costs due to zero over-spray and achieves 6x faster turnaround.',
        timestamp: '2026-09-02T14:46:00Z',
      },
      {
        id: 'msg-5',
        sender: 'AI',
        text: 'Patent check alert: Our system detected an existing patent IN-PAT-2023-0912 on multispectral UAV spraying. How does your IP differ?',
        timestamp: '2026-09-02T14:48:00Z',
        question_category: 'Patent & Novelty',
      },
      {
        id: 'msg-6',
        sender: 'FOUNDER',
        text: 'AgrioRobotics relies on heavy optical cameras and NIR sensors. We instead use acoustic resonance sensor arrays to identify pest vibrations directly at lower hardware weight and cost, which is distinct from their optical claims.',
        timestamp: '2026-09-02T14:52:00Z',
      },
      {
        id: 'msg-7',
        sender: 'AI',
        text: 'Thank you for these detailed clarifications. I have logged your responses into your evaluation dossier for the Human Reviewer panel.',
        timestamp: '2026-09-02T14:55:00Z',
      },
    ],
  },
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    user_id: 'user-founder-1',
    title: 'AI Analysis Completed',
    message: 'Your application for AeroKrishi Micro-Sprayers has completed AI parameter scoring and is now in the Human Review queue.',
    type: 'STATUS_CHANGE',
    action_url: '/founder/tracker',
    is_read: false,
    created_at: '2026-09-02T15:02:00Z',
  },
  {
    id: 'notif-002',
    user_id: 'user-reviewer-1',
    title: 'New Submission for Audit',
    message: 'AeroKrishi Micro-Sprayers (Agriculture) requires your review. Patent overlap flag: 64.2%.',
    type: 'INFO_REQUEST',
    action_url: '/reviewer/queue',
    is_read: false,
    created_at: '2026-09-02T15:05:00Z',
  },
  {
    id: 'notif-003',
    user_id: 'user-official-1',
    title: 'New Shortlisted Startup Available',
    message: 'BioVolt Storage has been reviewed and approved for official government discovery in CleanTech.',
    type: 'SHORTLIST_ALERT',
    action_url: '/official/shortlist',
    is_read: true,
    created_at: '2026-08-25T15:35:00Z',
  },
];

const STORAGE_KEYS = {
  USERS: 'gsp_users',
  STARTUPS: 'gsp_startups',
  PATENTS: 'gsp_patents',
  INTERVIEWS: 'gsp_interviews',
  EVALUATIONS: 'gsp_evaluations',
  AUDITS: 'gsp_audits',
  PROBLEM_STATEMENTS: 'gsp_problem_statements',
  NOTIFICATIONS: 'gsp_notifications',
  CURRENT_USER: 'gsp_current_user',
};

export class MockDatabaseService {
  private static initCollection<T>(key: string, seed: T[]): T[] {
    const existing = localStorage.getItem(key);
    if (!existing) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    try {
      return JSON.parse(existing);
    } catch {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
  }

  public static initDatabase() {
    this.initCollection(STORAGE_KEYS.USERS, SEED_USERS);
    this.initCollection(STORAGE_KEYS.STARTUPS, SEED_STARTUPS);
    this.initCollection(STORAGE_KEYS.PATENTS, SEED_PATENTS);
    this.initCollection(STORAGE_KEYS.INTERVIEWS, SEED_INTERVIEWS);
    this.initCollection(STORAGE_KEYS.EVALUATIONS, SEED_EVALUATIONS);
    this.initCollection(STORAGE_KEYS.AUDITS, SEED_REVIEWER_AUDITS);
    this.initCollection(STORAGE_KEYS.PROBLEM_STATEMENTS, SEED_PROBLEM_STATEMENTS);
    this.initCollection(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(SEED_USERS[0]));
    }
  }

  public static getCurrentUser(): User {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : SEED_USERS[0];
  }

  public static setCurrentUser(user: User) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  public static getUsers(): User[] {
    return this.initCollection(STORAGE_KEYS.USERS, SEED_USERS);
  }

  public static getStartups(): Startup[] {
    return this.initCollection(STORAGE_KEYS.STARTUPS, SEED_STARTUPS);
  }

  public static getStartupById(id: string): Startup | undefined {
    return this.getStartups().find((s) => s.id === id);
  }

  public static saveStartup(startup: Startup): Startup {
    const startups = this.getStartups();
    const index = startups.findIndex((s) => s.id === startup.id);
    if (index >= 0) {
      startups[index] = { ...startup, updated_at: new Date().toISOString() };
    } else {
      startups.push(startup);
    }
    localStorage.setItem(STORAGE_KEYS.STARTUPS, JSON.stringify(startups));
    return startup;
  }

  public static createStartup(startup: Omit<Startup, 'id' | 'created_at' | 'updated_at'>): Startup {
    const newStartup: Startup = {
      ...startup,
      id: `startup-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return this.saveStartup(newStartup);
  }

  public static sendInterviewMessage(interviewId: string, sender: 'AI' | 'FOUNDER', text: string): AIInterview | undefined {
    const interviews = this.getInterviews();
    const interview = interviews.find((i) => i.id === interviewId);
    if (!interview) return undefined;
    interview.messages.push({
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender,
      text,
      timestamp: new Date().toISOString(),
    });
    return this.saveInterview(interview);
  }

  public static saveAudit(audit: Omit<ReviewerAudit, 'id' | 'created_at'>): ReviewerAudit {
    return this.recordReviewerAudit(audit);
  }

  public static getPatents(): Patent[] {
    return this.initCollection(STORAGE_KEYS.PATENTS, SEED_PATENTS);
  }

  public static getInterviews(): AIInterview[] {
    return this.initCollection(STORAGE_KEYS.INTERVIEWS, SEED_INTERVIEWS);
  }

  public static getInterviewByStartupId(startupId: string): AIInterview | undefined {
    return this.getInterviews().find((i) => i.startup_id === startupId);
  }

  public static saveInterview(interview: AIInterview): AIInterview {
    const interviews = this.getInterviews();
    const index = interviews.findIndex((i) => i.id === interview.id);
    if (index >= 0) {
      interviews[index] = interview;
    } else {
      interviews.push(interview);
    }
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
    return interview;
  }

  public static getEvaluations(): AIEvaluation[] {
    return this.initCollection(STORAGE_KEYS.EVALUATIONS, SEED_EVALUATIONS);
  }

  public static getEvaluationByStartupId(startupId: string): AIEvaluation | undefined {
    return this.getEvaluations().find((e) => e.startup_id === startupId);
  }

  public static saveEvaluation(evalData: AIEvaluation): AIEvaluation {
    const evals = this.getEvaluations();
    const index = evals.findIndex((e) => e.id === evalData.id);
    if (index >= 0) {
      evals[index] = evalData;
    } else {
      evals.push(evalData);
    }
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(evals));
    return evalData;
  }

  public static getAudits(): ReviewerAudit[] {
    return this.initCollection(STORAGE_KEYS.AUDITS, SEED_REVIEWER_AUDITS);
  }

  public static recordReviewerAudit(audit: Omit<ReviewerAudit, 'id' | 'created_at'>): ReviewerAudit {
    const audits = this.getAudits();
    const newAudit: ReviewerAudit = {
      ...audit,
      id: `audit-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    audits.unshift(newAudit);
    localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify(audits));

    const startup = this.getStartupById(audit.startup_id);
    if (startup) {
      startup.status = audit.new_status;
      this.saveStartup(startup);
    }

    if (audit.action === 'OVERRIDE_SCORE' && audit.overridden_score !== undefined) {
      const evaluation = this.getEvaluationByStartupId(audit.startup_id);
      if (evaluation) {
        evaluation.composite_score = audit.overridden_score;
        this.saveEvaluation(evaluation);
      }
    }

    if (startup) {
      this.addNotification({
        user_id: startup.founder_id,
        title: `Status Update: ${audit.new_status}`,
        message: `Reviewer decision: ${audit.reviewer_comments}`,
        type: 'STATUS_CHANGE',
        action_url: '/founder/tracker',
        is_read: false,
      });
    }

    return newAudit;
  }

  public static getProblemStatements(): ProblemStatement[] {
    return this.initCollection(STORAGE_KEYS.PROBLEM_STATEMENTS, SEED_PROBLEM_STATEMENTS);
  }

  public static createProblemStatement(prob: Omit<ProblemStatement, 'id' | 'created_at' | 'updated_at'>): ProblemStatement {
    const statements = this.getProblemStatements();
    const newStatement: ProblemStatement = {
      ...prob,
      id: `prob-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    statements.unshift(newStatement);
    localStorage.setItem(STORAGE_KEYS.PROBLEM_STATEMENTS, JSON.stringify(statements));
    return newStatement;
  }

  public static getNotifications(userId?: string): Notification[] {
    const notifs = this.initCollection(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    if (userId) {
      return notifs.filter((n) => n.user_id === userId);
    }
    return notifs;
  }

  public static addNotification(notif: Omit<Notification, 'id' | 'created_at'>): Notification {
    const notifs = this.getNotifications();
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    return newNotif;
  }

  public static markNotificationRead(id: string) {
    const notifs = this.getNotifications();
    const target = notifs.find((n) => n.id === id);
    if (target) {
      target.is_read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    }
  }

  public static simulateAIEvaluation(startup: Startup): { evaluation: AIEvaluation; interview: AIInterview } {
    const patents = this.getPatents();
    let highestSim = 15.0;
    let matchingPatent = patents[0];
    const problemLower = (startup.problem_statement + ' ' + startup.target_market).toLowerCase();
    
    patents.forEach((p) => {
      let sim = 20;
      if (p.sector.toLowerCase() === startup.sector.toLowerCase()) {
        sim += 25;
      }
      p.keywords.forEach((kw) => {
        if (problemLower.includes(kw.toLowerCase())) {
          sim += 12;
        }
      });
      if (sim > highestSim) {
        highestSim = Math.min(sim, 88);
        matchingPatent = p;
      }
    });

    const paramScores = {
      problem_solution_fit: Math.floor(Math.random() * 15) + 80,
      market_size_viability: Math.floor(Math.random() * 20) + 75,
      team_strength: Math.floor(Math.random() * 15) + 82,
      originality_innovation: highestSim > 60 ? Math.floor(Math.random() * 15) + 65 : Math.floor(Math.random() * 12) + 85,
      feasibility_scalability: Math.floor(Math.random() * 15) + 80,
      clarity_consistency: Math.floor(Math.random() * 12) + 84,
      government_alignment: Math.floor(Math.random() * 12) + 85,
    };

    const compositeScore = Number(
      (
        Object.values(paramScores).reduce((a, b) => a + b, 0) /
        Object.values(paramScores).length
      ).toFixed(1)
    );

    const flags: string[] = [];
    if (highestSim > 60) {
      flags.push(`High prior-art similarity (${highestSim}%) identified with ${matchingPatent.patent_number}`);
    }
    if (startup.funding_ask > 10000000 && startup.stage === 'IDEA') {
      flags.push('High capital ask for idea stage requires itemized capex audit');
    }

    const tier = compositeScore >= 80 ? 'STRONG_FIT' : compositeScore >= 65 ? 'NEEDS_REVIEW' : 'NOT_A_FIT';

    const evaluation: AIEvaluation = {
      id: `eval-${Date.now()}`,
      startup_id: startup.id,
      composite_score: compositeScore,
      parameter_scores: paramScores,
      patent_similarity_percentage: highestSim,
      most_similar_patent_id: matchingPatent.id,
      patent_analysis_notes: `Comparison against ${matchingPatent.patent_number} (${matchingPatent.title}): Claims overlap in domain mechanics. Founder responses during AI interview show domain novelty in execution.`,
      written_rationale: `Startup ${startup.startup_name} in ${startup.sector} exhibits strong technical competence (${paramScores.team_strength}/100) and problem-solution alignment. Evaluated as ${tier} recommendation for Human Reviewer oversight.`,
      flags_and_risks: flags,
      recommended_tier: tier,
      evaluated_at: new Date().toISOString(),
    };

    const counterQuestions = [
      `How does ${startup.startup_name} plan to overcome regulatory compliance requirements in ${startup.sector}?`,
      `What is your customer acquisition cost (CAC) and customer lifetime value (LTV) projection over the next 18 months?`,
      `How does your technology differentiate from patent ${matchingPatent.patent_number} held by ${matchingPatent.assignee}?`,
    ];

    const interview: AIInterview = {
      id: `interview-${Date.now()}`,
      startup_id: startup.id,
      counter_questions: counterQuestions,
      is_completed: false,
      started_at: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'AI',
          text: `Greetings ${startup.team_details[0]?.name || 'Founder'}. I have ingested the submission for ${startup.startup_name}. To assist the government review committee, please answer our first counter-question: ${counterQuestions[0]}`,
          timestamp: new Date().toISOString(),
          question_category: 'Regulatory & Feasibility',
        },
      ],
    };

    this.saveEvaluation(evaluation);
    this.saveInterview(interview);

    startup.status = 'AI_ANALYSIS';
    this.saveStartup(startup);

    return { evaluation, interview };
  }
}
