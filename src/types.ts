export type Industry = 'SaaS' | 'E-commerce' | 'Manufacturing' | 'Consulting' | 'Healthcare';

export interface BusinessProfile {
  name: string;
  industry: Industry;
  employees: number;
  monthlyRevenue: number;
  goals: string[];
}

export interface MetricPoint {
  date: string; // e.g. "2026-01"
  label: string; // e.g. "Jan"
  revenue: number;
  profit: number;
  expenses: number;
  cashFlow: number;
  customers: number;
}

export interface Goal {
  id: string;
  title: string;
  type: 'revenue' | 'expenses' | 'branch' | 'hiring' | 'product_launch' | 'other';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  progress: number;
  estimatedCompletion: string;
  status: 'on_track' | 'at_risk' | 'completed';
}

export interface SmartAlert {
  id: string;
  type: 'revenue_slow' | 'expenses_rise' | 'cashflow_risk' | 'inventory_shortage' | 'customer_decline';
  title: string;
  message: string;
  severity: 'warning' | 'error' | 'info';
  recommendation: string;
  impactOnScore: number;
}

export interface AIInsight {
  id: string;
  category: 'win' | 'improvement' | 'risk' | 'opportunity' | 'forecast';
  title: string;
  what: string;
  why: string;
  recommendation: string;
  estimatedImpact: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface OnboardingState {
  step: number;
  accountCreated: boolean;
  businessName: string;
  industry: Industry;
  employees: number;
  monthlyRevenue: number;
  goals: string[];
  generatingReport: boolean;
  onboardingFinished: boolean;
  userName?: string;
  userEmail?: string;
  userPassword?: string;
}

export interface InvestorReport {
  id: string;
  title: string;
  date: string;
  organization: string;
  executiveSummary: string;
  healthScore: number;
  forecastSummary: string;
  recommendations: string[];
}
