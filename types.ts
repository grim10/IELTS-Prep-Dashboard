
import { ReactNode } from 'react';

export interface Competitor {
    id: keyof Omit<ComparisonFeature, 'feature' | 'shiksha'>;
    name: string;
}

export interface ComparisonFeature {
    feature: string;
    shiksha: string | boolean;
    magoosh: string | boolean;
    bestMyTest: string | boolean;
    kaplan: string | boolean;
    e2Language: string | boolean;
    edX: string | boolean;
    leapScholar: string | boolean;
}

export interface HowItWorksStep {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface CashbackStage {
  stage: number;
  icon: ReactNode;
  task: string;
  reward: string;
  unlocks: string;
}

export interface BundleFeature {
    icon: ReactNode;
    title: string;
    description: string;
    tag?: string;
}

export interface BundleValueItem {
    icon: ReactNode;
    title: string;
    description: string;
    value: string;
}

export interface AdditionalService {
  icon: string;
  service: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  achievement: string;
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LiveActivity {
    emoji: string;
    text: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface CurriculumTopic {
    title: string;
    details: string;
    videoId?: string;
}

export interface CurriculumModule {
    id: 'speaking' | 'writing' | 'reading' | 'listening';
    name: string;
    icon: ReactNode;
    topics: CurriculumTopic[];
}

export interface KpiItem {
  stage: string;
  kpi: string;
  target: string;
  value: string;
  status: 'good' | 'warning' | 'danger';
}

export interface RiskItem {
  title: string;
  level: 'High' | 'Medium' | 'Low';
  risk: string;
  mitigation: string;
  mitigationStatus: 'Planned' | 'In Progress' | 'Implemented';
}

export interface RoadmapPhase {
  title: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  description: string;
  keyFeatures?: string[];
}

// Types for C-Suite Dashboards
export interface FinancialMetric {
    metric: string;
    value: string;
    note?: string;
    status: 'good' | 'warning' | 'danger';
}

export interface UnitEconomics {
    ltv: number;
    cac: number;
    ratio: number;
    note: string;
}

export interface CashbackData {
    title: string;
    value: string;
    description: string;
}

export interface CxMetric {
    metric: string;
    value: string;
    target: string;
    trend: 'up' | 'down' | 'stable';
}

export interface CustomerFeedback {
    type: 'Praise' | 'Pain Point';
    quote: string;
    persona: string;
}

export interface PnLLineItem {
  category: string;
  item: string;
  amount: number;
  isSubItem?: boolean;
  isTotal?: boolean;
}

export interface CxJourneyStage {
  stage: string;
  actions: string;
  emotion: 'Curious' | 'Anxious' | 'Excited' | 'Engaged' | 'Proud' | 'Confident';
  status: 'good' | 'warning' | 'danger';
  frictionPoints: string[];
  delightOpportunities: string[];
  initiatives: CxInitiative[];
}

export interface CxInitiative {
  initiative: string;
  status: 'Live' | 'In Progress' | 'Planned';
}

export interface CmoMetric {
    metric: string;
    value: string;
    note: string;
    trend: 'up' | 'down' | 'stable';
}

export interface ChannelPerformance {
    channel: string;
    icon: React.ReactNode;
    leads: number;
    cpl: number; // Cost Per Lead
    conversionRate: number;
    color: string;
}

export interface CooMetric {
    metric: string;
    value: string;
    target: string;
    status: 'good' | 'warning' | 'danger';
}

export interface TrainerUtilization {
    name: string;
    sessions: number;
    avgNps: number;
    status: 'Active' | 'Onboarding' | 'On Leave';
}

export interface StrategicFunnelStage {
  stage: string;
  conversion: string;
  weekly: string;
  monthly: string;
  notes: string;
  painPoint: string;
  strategy: string;
  ask: string;
}

export interface DataConsistencyAlert {
  metric: string;
  locations: [string, string];
  values: [string | number, string | number];
  message: string;
}

export interface ClassFunnelMetric {
  stage: string;
  count: number;
  percentage?: number;
}

export interface BatchTimingMetric {
  timing: string;
  avgLearners: number;
}

export interface BatchFillRateMetric {
  timing: string;
  avgLearners: number;
  fillRate: string;
}

export interface AggregateTrainerUtilizationMetric {
  item: string;
  hours: number;
  percentage?: string;
}

export interface CmoInitiative {
  initiative: string;
  rationale: string;
  status: 'Live' | 'In Progress' | 'Planned';
  impacts: string;
}

export interface TrainerRatingMetric {
  name: string;
  totalResponses: number;
  effectiveness: number;
  engagement: number;
  clarity: number;
  approachability: number;
  familiarity: number;
}

// Types for Sentiment Analysis
export interface SentimentData {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  count: number;
  percentage: string;
  color: string;
}

export interface SentimentQualitativeFeedback {
    title: string;
    icon: string;
    examples: string[];
    themes: string[];
}

export interface SentimentRequest {
    theme: string;
    status: 'Delivered' | 'Planning';
}

export interface SentimentAnalysisSummary {
    totalResponses: number;
    breakdown: SentimentData[];
    positive: SentimentQualitativeFeedback;
    negative: SentimentQualitativeFeedback;
    requests: {
        title: string;
        icon: string;
        themes: SentimentRequest[];
    };
    issue: {
        title: string;
        icon: string;
        summary: string;
        themes: string[];
    };
}

export interface StrategyItem {
  area: string;
  objective: string;
  initiatives: {
    name: string;
    status: 'In Progress' | 'Planned' | 'Completed';
    details: string;
  }[];
}