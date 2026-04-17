export type StudentYear = 'year1' | 'year2' | 'year3' | 'year4';

export interface IdeaAnalysis {
  score: {
    urgency: number;
    feasibility: number;
    profitability: number;
  };
  verdict: 'KHẢ THI' | 'CẦN CHỈNH SỬA' | 'RỦI RO CAO';
  fatal_flaw: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  feedback: string;
  roadmap: {
    year: string;
    goal: string;
    tasks: string[];
    skills: string[];
  };
  legal_checklist: {
    phase: string;
    suitable_type: string;
    steps: { step: string; details: string }[];
    specialized_licenses: string[];
    sample_clauses: string[];
  };
}

export interface Idea extends IdeaAnalysis {
  id: string;
  title: string;
  description: string;
  studentYear: StudentYear;
  timestamp: number;
}

export interface MarketingPlan {
  platform: string;
  contentIdea: string;
  frequency: string;
  estimatedCost: string;
  action_items?: string[];
  seven_day_schedule?: {
    day: string;
    channel: string;
    content: string;
    budget: string;
  }[];
}

export interface FinancialPlan {
  break_even_point: string;
  payback_period: string;
  burn_rate: string;
  margin_analysis: string;
  advice: string;
}

export interface WorkshopAnalysis {
  marketing: MarketingPlan[];
  financial: FinancialPlan;
}

export interface NavigationState {
  currentTab: 'home' | 'idealab' | 'workshop' | 'legal';
}
