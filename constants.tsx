

import React from 'react';
import type { ComparisonFeature, Competitor, Testimonial, FaqItem, HowItWorksStep, BundleFeature, CashbackStage, LiveActivity, QuizQuestion, CurriculumModule, KpiItem, RiskItem, RoadmapPhase, FinancialMetric, UnitEconomics, CashbackData, CxMetric, CustomerFeedback, PnLLineItem, CxJourneyStage, CmoMetric, ChannelPerformance, CooMetric, TrainerUtilization, StrategicFunnelStage, BundleValueItem, AdditionalService, ClassFunnelMetric, BatchTimingMetric, BatchFillRateMetric, AggregateTrainerUtilizationMetric, CmoInitiative, TrainerRatingMetric, SentimentAnalysisSummary, StrategyItem, SentimentRequest } from './types';

// --- ICONS ---

// Generic & How-it-works Icons
const TestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-1.125 0-2.25 1.125-2.25 2.25v15c0 1.125 1.125 2.25 2.25 2.25h11.25c1.125 0 2.25-1.125 2.25-2.25v-9.75M14.25 9.75L16.5 12l3.75-3.75M12 2.25v5.25h5.25" /></svg>;
const DiscountIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>;
const EnrollIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-3.172 3.172a1 1 0 00.707 1.707H17.82a1 1 0 00.707-1.707l-3.172-3.172m-15.482 0A2.25 2.25 0 015.172 8.25h13.656a2.25 2.25 0 011.589 3.84l-3.172 3.172" /></svg>;

// --- NEW ICONS FOR CASHBACK CHALLENGE ---
const CashbackAttendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.908 0M18 18.72a9.094 9.094 0 01-7.5 0-9.094 9.094 0 01-7.5 0M12 12.72a3.75 3.75 0 015.908 0M12 12.72a3.75 3.75 0 00-5.908 0M15 5.25A3.75 3.75 0 0111.25 9 3.75 3.75 0 017.5 5.25 3.75 3.75 0 0111.25 1.5 3.75 3.75 0 0115 5.25z" />
  </svg>
);
const CashbackAssignmentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-1.125 0-2.25 1.125-2.25 2.25v15c0 1.125 1.125 2.25 2.25 2.25h11.25c1.125 0 2.25-1.125 2.25-2.25v-9.75M14.25 9.75L16.5 12l3.75-3.75M12 2.25v5.25h5.25" />
  </svg>
);
const CashbackScoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.373-3.626-9.75 9.75 0 00-1.373-3.626h9a9.75 9.75 0 00-1.373 3.626 9.75 9.75 0 001.373 3.626zM21 9.75A9.75 9.75 0 0112 19.5a9.75 9.75 0 01-9-9.75H3V6.375A2.625 2.625 0 015.625 3.75h12.75A2.625 2.625 0 0121 6.375V9.75z" />
  </svg>
);
const CashbackVisaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);


// Bundle & Feature Icons
const LiveClassesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const MockTestsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const AssignmentsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DoubtSolvingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CounsellingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PerformanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const RefundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const StudyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const GoalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>;
const VisaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const ValueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
const PayForResultsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CommunityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// Curriculum Icons
const ReadingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const WritingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const ListeningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h1M9 10h1M15 10h1M21 10h-1M9 15a6 6 0 1112 0v3H3v-3a6 6 0 016-6z" /></svg>;
const SpeakingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;

// Marketing Channel Icons
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.89H8.037v-2.89h2.468v-2.174c0-2.43,1.44-3.771,3.648-3.771 c1.049,0,2.163,0.196,2.163,0.196v2.483h-1.282c-1.187,0-1.57,0.751-1.57,1.51v1.84h2.79l-0.443,2.89h-2.347v7.005 C18.32,21.08,22,16.95,22,12C22,6.477,17.523,2,12,2z"></path></svg>;
const GoogleAdsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01,2C6.486,2,2,6.486,2,12.01s4.486,10.01,10.01,10.01s10.01-4.486,10.01-10.01S17.534,2,12.01,2z M12.01,20.02 c-4.425,0-8.01-3.585-8.01-8.01s3.585-8.01,8.01-8.01s8.01,3.585,8.01,8.01S16.435,20.02,12.01,20.02z"></path><path d="M12.93,12.435c0.801,0,1.547-0.323,2.083-0.852l-1.31-1.295c-0.282,0.27-0.71,0.48-1.218,0.48c-1.07,0-1.898-0.852-1.898-1.928 c0-1.063,0.828-1.928,1.898-1.928c0.521,0,0.958,0.223,1.241,0.503l1.322-1.295c-0.572-0.545-1.322-0.864-2.183-0.864 c-1.885,0-3.328,1.51-3.328,3.435c0,1.938,1.443,3.435,3.328,3.435V12.435z"></path><polygon points="17.53,11.51 16.5,11.51 16.5,10.47 15.46,10.47 15.46,11.51 14.43,11.51 14.43,12.55 15.46,12.55 15.46,13.59 16.5,13.59 16.5,12.55 17.53,12.55"></polygon></svg>;
const OrganicSearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path></svg>;
const ReferralIcon = () => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M 12 2 C 10.346 2 9 3.346 9 5 C 9 6.654 10.346 8 12 8 C 13.654 8 15 6.654 15 5 C 15 3.346 13.654 2 12 2 z M 6 9 C 4.346 9 3 10.346 3 12 C 3 13.654 4.346 15 6 15 C 7.654 15 9 13.654 9 12 C 9 10.346 7.654 9 6 9 z M 18 9 C 16.346 9 15 10.346 15 12 C 15 13.654 16.346 15 18 15 C 19.654 15 21 13.654 21 12 C 21 10.346 19.654 9 18 9 z M 12 16 C 10.346 16 9 17.346 9 19 C 9 20.654 10.346 22 12 22 C 13.654 22 15 20.654 15 19 C 15 17.346 13.654 16 12 16 z"></path></svg>;

// --- DATA CONSTANTS ---

// Comparison Table Data
export const competitors: Competitor[] = [
    { id: 'magoosh', name: 'Magoosh' },
    { id: 'bestMyTest', name: 'BestMyTest' },
    { id: 'kaplan', name: 'Kaplan' },
    { id: 'e2Language', name: 'E2 Language' },
    { id: 'edX', name: 'edX' },
    { id: 'leapScholar', name: 'Leap Scholar' },
];

export const comparisonData: ComparisonFeature[] = [
    { feature: 'Price', shiksha: 'Free', magoosh: '$129', bestMyTest: '$169', kaplan: '$190', e2Language: '$339', edX: '$99', leapScholar: 'INR 20338' },
    { feature: 'Length of Online Access', shiksha: 'Unlimited', magoosh: '6 months Access', bestMyTest: '6 months Access', kaplan: '6 months Access', e2Language: '12 months Access', edX: 'Only 8 Weeks', leapScholar: '4 Weeks' },
    { feature: 'Practice Questions', shiksha: true, magoosh: true, bestMyTest: true, kaplan: true, e2Language: true, edX: true, leapScholar: true },
    { feature: 'Mock Tests', shiksha: true, magoosh: true, bestMyTest: true, kaplan: true, e2Language: true, edX: true, leapScholar: true },
    { feature: 'Recorded Video Lessons', shiksha: true, magoosh: true, bestMyTest: true, kaplan: true, e2Language: true, edX: true, leapScholar: true },
    { feature: 'Unlimited Live Class', shiksha: true, magoosh: false, bestMyTest: false, kaplan: false, e2Language: true, edX: false, leapScholar: false },
    { feature: 'Doubt Clearing Sessions', shiksha: true, magoosh: false, bestMyTest: false, kaplan: false, e2Language: false, edX: false, leapScholar: true },
    { feature: 'Live Class Duration', shiksha: '20 hours', magoosh: false, bestMyTest: false, kaplan: '15 hours', e2Language: false, edX: false, leapScholar: '30 hours' },
    { feature: 'Number of Slots', shiksha: '9 slots/ day*', magoosh: false, bestMyTest: false, kaplan: '2 slots/ day', e2Language: false, edX: '3 slots/ day', leapScholar: false },
    { feature: 'Assessment with Feedback', shiksha: '20', magoosh: false, bestMyTest: false, kaplan: false, e2Language: '5', edX: false, leapScholar: false },
    { feature: 'Practice Test Count', shiksha: '200+', magoosh: false, bestMyTest: false, kaplan: false, e2Language: '100+', edX: false, leapScholar: '100+' },
    { feature: 'Unlimited Grammar Class', shiksha: false, magoosh: false, bestMyTest: false, kaplan: false, e2Language: false, edX: false, leapScholar: true },
    { feature: 'Free Trial', shiksha: true, magoosh: true, bestMyTest: true, kaplan: true, e2Language: false, edX: false, leapScholar: false },
    { feature: 'Score Guarantee', shiksha: true, magoosh: true, bestMyTest: true, kaplan: false, e2Language: true, edX: false, leapScholar: true },
    { feature: 'Multiple Study Plans', shiksha: true, magoosh: true, bestMyTest: true, kaplan: false, e2Language: false, edX: false, leapScholar: false },
    { feature: 'Speaking Assessment', shiksha: true, magoosh: true, bestMyTest: true, kaplan: false, e2Language: true, edX: false, leapScholar: true },
    { feature: 'Writing Assessment', shiksha: true, magoosh: true, bestMyTest: true, kaplan: false, e2Language: true, edX: false, leapScholar: true },
    { feature: 'Listening Assessment', shiksha: true, magoosh: true, bestMyTest: true, kaplan: false, e2Language: true, edX: false, leapScholar: true },
    { feature: 'Reading Assessment', shiksha: true, magoosh: true, bestMyTest: true, kaplan: false, e2Language: true, edX: false, leapScholar: true },
    { feature: 'Flexible Timing', shiksha: true, magoosh: false, bestMyTest: false, kaplan: false, e2Language: false, edX: true, leapScholar: true },
    { feature: 'Flashcards Included', shiksha: false, magoosh: true, bestMyTest: true, kaplan: false, e2Language: false, edX: false, leapScholar: false },
    { feature: 'Private Facebook Study Group', shiksha: false, magoosh: true, bestMyTest: false, kaplan: false, e2Language: false, edX: false, leapScholar: false },
    { feature: 'Band Score Predictor', shiksha: false, magoosh: true, bestMyTest: false, kaplan: false, e2Language: true, edX: false, leapScholar: false },
    { feature: 'Quiz Mode & Customized Practice', shiksha: false, magoosh: true, bestMyTest: true, kaplan: true, e2Language: false, edX: false, leapScholar: true },
    { feature: 'Mobile App', shiksha: true, magoosh: true, bestMyTest: false, kaplan: true, e2Language: false, edX: true, leapScholar: false },
    { feature: 'Money Back Guarantee', shiksha: true, magoosh: true, bestMyTest: false, kaplan: false, e2Language: false, edX: false, leapScholar: false },
];

// USP Grid Data
export const uspData: HowItWorksStep[] = [
    { icon: <ValueIcon />, title: "Unbeatable Value", description: "Get premium features, live classes, and counselling for a price no one else can match." },
    { icon: <PayForResultsIcon />, title: "Pay for Results, Not Promises", description: "Our cashback challenge means we only succeed when you do. Your hard work pays you back, literally." },
    { icon: <CommunityIcon />, title: "Complete Success Ecosystem", description: "From your first mock test to your visa application, we provide a seamless support system." },
];

// How It Works Data
export const howItWorksSteps: HowItWorksStep[] = [
    { icon: <TestIcon />, title: "Take the Free Test", description: "Prove your readiness with our simple qualifying test. It takes just 15 minutes." },
    { icon: <DiscountIcon />, title: "Unlock 90% Off", description: "Score above 60% and instantly slash the price from ₹30,500 to just ₹2,999." },
    { icon: <EnrollIcon />, title: "Enroll & Start Learning", description: "Join our expert-led classes and begin your journey to acing the IELTS exam." },
];

// Testimonials Data
export const testimonialsData: Testimonial[] = [
    { 
        quote: "I am immensely thankful for the exceptional guidance and support by Prerna Mam, Shiksha Study. Through your effective teaching, strategies and tips i was able to score desired band score in a short period of time. The trainers Detailed explanation, feedback, and mock tests helped in boosting my confidence and improving my English proficiency. I successfully completed my IELTS Exam and now one step closer to pursuing my dreams. I highly recommend their services to anyone aspiring to achieve success in the IELTS examination.", 
        name: "Lokesh Rayapati, Chittoor", 
        achievement: "IELTS 6.5",
        image: "https://images.unsplash.com/photo-1628157588553-5ee30a6c5aa3?q=80&w=200&auto=format&fit=crop"
    },
    { 
        quote: "I am Prarthna Borkar, and I registered for my IELTS classes on 5 Feb 2024. would like to extend my appreciation for the thorough introduction to the course outline, objectives, and expectations. Explanations and approachable demeanour made the transition into the class seamless and comfortable for all of us. The interactive practice session and discussions facilitated a dynamic learning environment, allowing us to actively participate and learn from one another. The collaborative atmosphere fostered by your guidance and encouragement truly enhanced the overall learning experience.", 
        name: "Prarthna Borkar, Goa", 
        achievement: "IELTS 7.5",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=200&auto=format&fit=crop"
    },
];

// FAQ Data
export const faqData: FaqItem[] = [
    { question: "How do I choose the best class time without overhauling my schedule?", answer: "Selecting your ideal class time is a breeze. Once you sign up, we'll show you all available slots. Pick one that fits neatly into your daily routine to ensure your IELTS preparation doesn't disrupt your other commitments. Remember, the key to effective learning is consistency, so choose a slot you can commit to regularly." },
    { question: "What exactly happens after I sign up?", answer: "Instantly after signing up, you'll receive a welcome email with a link to join our student WhatsApp group and instructions to access the student portal. You can immediately choose your batch timings and start attending live classes." },
    { question: "Is there a quick guide to getting started with Microsoft Teams for my classes?", answer: "Yes! Your welcome email includes a simple, step-by-step guide on how to install and use Microsoft Teams. We also have a short video tutorial on the student dashboard to get you comfortable with the platform before your first class." },
    { question: "Why is accepting the Microsoft Teams invite crucial?", answer: "Accepting the invite is essential as it adds you to our official class roster. This ensures you receive all class notifications, access shared materials, and can participate in class discussions and activities. It's your ticket to the classroom!" },
    { question: "How important is it to regularly check my email during the course?", answer: "Very important! We send all official communication, including schedule updates, assignment feedback, mock test results, and important announcements via email. Checking it daily ensures you never miss a beat." },
    { question: "Why should I find a quiet place for class sessions?", answer: "A quiet environment is crucial for both listening and speaking. It helps you focus completely on the lesson without distractions and allows you to participate clearly during speaking practice, which is vital for receiving accurate feedback from trainers." },
    { question: "How does joining the WhatsApp group benefit my IELTS preparation?", answer: "The WhatsApp group is your direct line to our community. You'll get instant reminders for classes, quick answers to logistical questions, and the chance to interact with fellow students. It's great for motivation and staying connected." },
    { question: "What should I do if I can't attend a scheduled class?", answer: "No problem. While we encourage live attendance for interaction, we understand that life happens. We are working on providing recordings for all classes, which will be available on your student portal within 24 hours. Just make sure to catch up before the next session!" },
];

// Cashback Challenge Data
export const cashbackStagesData: CashbackStage[] = [
    { stage: 1, icon: <CashbackAttendIcon />, task: "Attend 80% of Live Classes", reward: "Get 25% Cashback", unlocks: "Full Mock Test Suite" },
    { stage: 2, icon: <CashbackAssignmentsIcon />, task: "Complete All Sectional Assignments", reward: "Get 25% Cashback", unlocks: "Advanced Workshops" },
    { stage: 3, icon: <CashbackScoreIcon />, task: "Score 7+ Bands in 3 Mock Tests", reward: "Get 25% Cashback", unlocks: "1-on-1 Counselling" },
    { stage: 4, icon: <CashbackVisaIcon />, task: "Receive Your Student Visa", reward: "Get Final 25% Cashback", unlocks: "Your Future Abroad!" },
];

// Course Bundle Data
export const bundleFeatures: BundleFeature[] = [
    { icon: <LiveClassesIcon />, title: "20+ Hours Live Classes", description: "Interactive sessions with certified trainers covering all 4 IELTS modules.", tag: "LIVE" },
    { icon: <MockTestsIcon />, title: "Full Length Mock Tests", description: "Practice with full-length and sectional tests that simulate the real exam environment." },
    { icon: <AssignmentsIcon />, title: "200+ Practice Assignments", description: "Targeted exercises with auto-evaluation to sharpen your skills in specific areas." },
    { icon: <DoubtSolvingIcon />, title: "24/7 Doubt Solving", description: "Get your questions answered anytime via our dedicated student portal and community.", tag: "Support" },
    { icon: <PerformanceIcon />, title: "Performance Analytics", description: "Track your progress with detailed reports that highlight your strengths and weaknesses." },
    { icon: <CounsellingIcon />, title: "Study Abroad Counselling", description: "Expert guidance for university selection, applications, and visa processes after course completion.", tag: "Your Final Step" },
];

// Live Activity Feed Data
export const liveActivityData: LiveActivity[] = [
  { emoji: "✅", text: "Ravi K. just scored 7.5 in a mock test!" },
  { emoji: "🎉", text: "Priya S. unlocked 50% cashback!" },
  { emoji: "🎓", text: "Amit J. just enrolled in the prep bundle." },
  { emoji: "🔥", text: "A new live class is starting in 15 minutes." },
  { emoji: "💡", text: "Sunita M. just completed the Writing module." },

  // 📦 SALES
  { emoji: "🎉", text: "Priya S. just grabbed the IELTS bundle at ₹2,999!" },
  { emoji: "💸", text: "Rohit K. claimed the 100% money-back offer!" },
  { emoji: "🛍️", text: "Simran M. purchased the prep pack with a ₹9,000 discount!" },
  { emoji: "⚡", text: "50% cashback unlocked by Ananya V. just now!" },
  { emoji: "🕒", text: "Only 2 seats left in this week’s batch!" },

  // 📚 PREP
  { emoji: "✅", text: "Ravi K. just scored 7.5 in a mock test!" },
  { emoji: "📈", text: "Manish T. improved Reading score by 2 bands!" },
  { emoji: "🧠", text: "Kiran L. completed the Listening module today." },
  { emoji: "💬", text: "Nisha R. attended a Live Speaking Feedback class." },
  { emoji: "📚", text: "Anjali P. unlocked all 200+ practice assignments!" },

  // 🌍 VISA / COUNSELLING
  { emoji: "🌍", text: "Kabir A. booked his visa counselling session." },
  { emoji: "✈️", text: "Shruti N. just got her Canada SOP reviewed!" },
  { emoji: "📄", text: "Yash M. received LOR drafting support today." },
  { emoji: "🤝", text: "Jatin B. had a 1-on-1 with a UK counsellor." },
  { emoji: "🎯", text: "Meena R. shortlisted 3 universities with expert help." }
];

// Test Modal Quiz Data
export const quizData: QuizQuestion[] = [
    { question: "Which of the following sentences is grammatically correct?", options: ["He go to the market.", "She is going to the market.", "They goes to the market.", "I is going to the market."], correctAnswer: "She is going to the market." },
    { question: "Choose the correct synonym for 'ubiquitous'.", options: ["Rare", "Scarce", "Everywhere", "Hidden"], correctAnswer: "Everywhere" },
    { question: "The lecture was so ____ that I almost fell asleep.", options: ["Interest", "Interesting", "Boring", "Bored"], correctAnswer: "Boring" },
    { question: "I have been living in this city ____ 2015.", options: ["for", "since", "from", "at"], correctAnswer: "since" },
    { question: "If I ____ you, I would study harder for the exam.", options: ["am", "was", "were", "be"], correctAnswer: "were" },
];

// Curriculum Data
export const curriculumData: CurriculumModule[] = [
    {
        id: 'reading',
        name: 'Reading',
        icon: <ReadingIcon />,
        topics: [
            { title: "Day 1: Introduction to IELTS Reading", details: "Understanding Band Scores, Enhancing Reading Skills, Task Types, Developing Effective Strategies, Identifying Common Challenges, Interactive Practice Session, Q&A and Open Discussion.", videoId: "NUIU22KcJ4Q" },
            { title: "Day 2: Mastering Multiple Choice Questions", details: "Introduction to MCQs, understanding question types, strategies for answering, common pitfalls and how to avoid them, strategic advice for success, and practice." },
            { title: "Day 3: Handling Completion Tasks", details: "Overview of completion tasks, different types of completion tasks (e.g., sentence, summary, note), common problems, tips & strategies, and practice tasks." },
            { title: "Day 4: Acing Matching Questions", details: "Purpose of matching questions, types (e.g., headings, features, sentence endings), common challenges, tips & strategies, do’s & don’ts, and practice." },
            { title: "Day 5: Reading Module Review & Practice", details: "A comprehensive overview of the IELTS Reading test, frequently asked questions, an interactive practice session covering all question types, and a final doubt-clearing and evaluation session." }
        ]
    },
    {
        id: 'writing',
        name: 'Writing',
        icon: <WritingIcon />,
        topics: [
            { title: "Day 6: Intro to Writing & Academic Task 1", details: "Understanding the test structure, delving into the four assessment criteria, overview of Academic Writing Task 1, different question types, developing effective writing strategies, and a practical exercise." },
            { title: "Day 7: Deep Dive into Writing Task 1", details: "Detailed overview of Task 1, exploring different task types (graphs, charts, diagrams), essential tips and strategies for high scores, common problems to avoid, and a Q&A session." },
            { title: "Day 8: Intro to Writing Task 2", details: "Introduction to Task 2, understanding the four assessment criteria in-depth, a step-by-step guide to essay writing, navigating through different question types, and developing effective strategies." },
            { title: "Day 9: Mastering Writing Task 2", details: "A quick overview of Task 2, briefing on assessment criteria, understanding effective essay structure, key points to remember for a high score, and practice material with Q&A." },
            { title: "Day 10: Writing Module Review & Practice", details: "Revision of assessment criteria for both tasks, points to remember for Task 1 & Task 2, doubt clearing, FAQs, and a final evaluation with feedback." }
        ]
    },
    {
        id: 'listening',
        name: 'Listening',
        icon: <ListeningIcon />,
        topics: [
            { title: "Day 11: Intro to IELTS Listening & Section 1", details: "Introduction to the Listening test, an overview of all question types, a deep dive into Form Completion & Multiple Choice Questions (MCQs), addressing common challenges, and an interactive practice session." },
            { title: "Day 12: Strategies for Section 2", details: "Introduction to Listening Section 2 (monologues), strategies and tips for handling questions, common problems faced by students, and a dedicated practice session with Q&A." },
            { title: "Day 13: Navigating Section 3 & Distractors", details: "Introduction to Listening Section 3 (academic discussions), how to identify and avoid distractors, advanced strategies and tips, common problems, and practice with Q&A." },
            { title: "Day 14: Tackling Section 4", details: "Understanding the purpose and structure of Listening Part 4 (academic lecture), strategies and tips for note-taking and answering questions, common problems, and practice with Q&A." },
            { title: "Day 15: Listening Module Review & Practice", details: "Revision of assessment criteria, key points to remember for all sections of the Listening test, a session for doubts and FAQs, and final Q&A with feedback." }
        ]
    },
    {
        id: 'speaking',
        name: 'Speaking',
        icon: <SpeakingIcon />,
        topics: [
            { title: "Day 16: Intro to Speaking & Part 1", details: "Introduction to the Speaking module, an in-depth look at assessment criteria, mastering Part 1 (Introduction & Interview), exploring common topic areas, analyzing model answers, and interactive practice." },
            { title: "Day 17: Mastering Part 2 (The Cue Card)", details: "Introduction to Speaking Part 2, understanding the purpose and preparation for cue cards, discussion of common topics, presentation of a sample answer, practice session with feedback, and strategies for improvement." },
            { title: "Day 18: Acing Part 3 (The Discussion)", details: "Overview of Speaking Part 3, purpose and preparation for follow-up questions, common topics for discussions, sample answers and practice sessions, feedback, and strategies for improvement." },
            { title: "Day 19: Full Speaking Test Practice", details: "A comprehensive overview of the full IELTS Speaking Test, with details on a full-length practice session, and an emphasis on receiving constructive feedback and identifying areas for improvement." },
            { title: "Day 20: Speaking Module Review & Fluency Tips", details: "Revision of all three parts of the Speaking test, FAQs, tips for 'Why' and 'How' questions, and focused training on pronunciation, fluency, and expressing opinions effectively." }
        ]
    },
];

// Bundle Value Data
export const bundleValueData: BundleValueItem[] = [
    { icon: "🎥", title: "Live IELTS Classes", description: "20+ hours of expert-led live training.", value: "₹8,000" },
    { icon: "📊", title: "Mock Test Suite", description: "Unlimited attempts with detailed feedback.", value: "₹4,000" },
    { icon: "✍️", title: "Practice Materials", description: "200+ assignments & video lessons.", value: "₹3,500" },
    { icon: "🌍", title: "Abroad Counselling", description: "Personalized guidance for applications and visas.", value: "₹15,000" },
];

export const additionalServicesData: AdditionalService[] = [
    { icon: '🎓', service: 'University/Course Shortlisting', description: 'Personalized shortlist based on your academic profile.' },
    { icon: '📝', service: 'Application Assistance', description: 'End-to-end help with forms, document uploads, and tracking.' },
    { icon: '✍️', service: 'SOP/LOR Proofreading', description: 'Expert review and editing of all your application essays.' },
    { icon: '💰', service: 'Scholarship Guidance', description: 'Assistance in finding and applying for relevant scholarships.' },
    { icon: '✈️', service: 'Visa Guidance & Prep', description: 'Step-by-step application support and mock interviews.' },
    { icon: '📚', service: 'Additional Test Prep', description: 'Access to free prep material for exams like TOEFL & Duolingo.' },
    { icon: '🏦', service: 'Education Loan Advice', description: 'Guidance on available loan options and the application process.' },
    { icon: '🧳', service: 'Post-Landing Support', description: 'Help with accommodation, travel, and settling into your new country.' },
    { icon: '👩‍💼', service: 'Dedicated Counselor', description: 'One-on-one support available via call, WhatsApp, or Skype.' },
    { icon: '📲', service: 'Real-Time Application Tracking', description: 'Ongoing assistance and status updates on your applications.' },
];

// --- C-SUITE DASHBOARD DATA (NEWLY UPDATED) ---

// CEO Data
export const kpiData: KpiItem[] = [
  { stage: 'Traffic', kpi: 'Weekly Registrations', target: '1,000', value: '1,100', status: 'good' },
  { stage: 'Filter', kpi: 'Test Attempt Rate', target: '50%', value: '50%', status: 'good' },
  { stage: 'Filter', kpi: 'Test Pass %', target: '60%', value: '60%', status: 'good' },
  { stage: 'Join', kpi: 'Test-pass to Class-Join %', target: '100%', value: '100%', status: 'good' },
  { stage: 'Retention', kpi: 'Module Completion %', target: '20%', value: '20%', status: 'good' },
  { stage: 'Feedback', kpi: 'Trainer NPS', target: '>90', value: '+94', status: 'good' },
  { stage: 'Conversion Prep', kpi: 'College Interest', target: '30%', value: '30%', status: 'warning' },
];
export const riskData: RiskItem[] = [
  { title: 'Market Saturation', level: 'Medium', risk: 'Increased competition from low-cost providers could drive up CAC.', mitigation: 'Double down on the "Pay for Results" USP and highlight the complete value bundle (counselling).', mitigationStatus: 'In Progress' },
  { title: 'Low Student Engagement', level: 'High', risk: 'Students drop off before completing the Cashback Challenge, hurting LTV and brand reputation.', mitigation: 'Gamify the learning path with clear milestones and proactive engagement from trainers.', mitigationStatus: 'Planned' },
  { title: 'Trainer Churn', level: 'Low', risk: 'Losing high-NPS certified trainers can impact service quality.', mitigation: 'Implement a competitive compensation package and a clear career growth path.', mitigationStatus: 'Implemented' },
  { title: 'Visa Policy Changes', level: 'Medium', risk: 'Changes in key countries (Canada, US) could reduce demand for IELTS prep.', mitigation: 'Diversify counselling services to include more countries and alternative pathways.', mitigationStatus: 'Planned' },
];
export const roadmapData: RoadmapPhase[] = [
  { title: 'Phase 1: Core Product Launch', status: 'Completed', description: 'Launched the initial IELTS Prep Bundle with live classes, mock tests, and the Cashback Challenge v1.', keyFeatures: ['Live Classes via MSTeams', 'Basic Mock Test Platform', 'Manual Cashback Tracking'] },
  { title: 'Phase 2: Engagement & Automation', status: 'In Progress', description: 'Automate student journey and improve engagement with better tools and data.', keyFeatures: ['CRM Integration for lead tracking', 'Automated progress notifications', 'Gamified student dashboard'] },
  { title: 'Phase 3: Scale & Expansion', status: 'Planned', description: 'Expand service offerings and scale operations to capture a larger market share.', keyFeatures: ['Launch PTE & Duolingo Prep Bundles', 'AI-powered speaking/writing evaluation tool', 'Mobile App for on-the-go learning'] },
];
export const funnelConversionData = [
  { stage: 'Total Registrations', conversion: '100%', weekly: '1,000', monthly: '4,000', notes: 'Website, Counselling, B2B' },
  { stage: 'English Test Attempts', conversion: '50%', weekly: '500', monthly: '2,000', notes: 'Flexi-Quiz to get serious learners' },
  { stage: 'Test Passed (≥75%)', conversion: '60%', weekly: '300', monthly: '1,200', notes: 'Qualified learners for class' },
  { stage: 'Class Joined (Capacity)', conversion: '100%', weekly: '360', monthly: '1,440', notes: 'Hard cap including new/repeat learners' },
  { stage: 'Module Completion (5 classes)', conversion: '18.75%', weekly: '68', monthly: '270', notes: 'Key retention metric' },
];
export const postCompletionFunnelData = [
    { stage: 'Completed IELTS Module', conversion: '-', weekly: '72', monthly: '288', notes: 'Pool of qualified candidates for upsell' },
    { stage: 'Expressed Interest in College', conversion: '30%', weekly: '22', monthly: '86', notes: 'Tagged "intent-to-apply" via outreach' },
    { stage: 'Submitted Docs/Application', conversion: '60%', weekly: '13', monthly: '52', notes: 'Uploaded SOP, LOR, etc.' },
    { stage: 'College Offer Letter Received', conversion: '80%', weekly: '10', monthly: '42', notes: 'Based on partner conversion rates' },
    { stage: 'Visa Approved (Final)', conversion: '75%', weekly: '8', monthly: '32', notes: 'Final monetizable outcome' },
];
export const strategicFunnelData: StrategicFunnelStage[] = [
  { stage: 'Registrations > Test Attempts', conversion: '50%', weekly: '1,000 -> 500', monthly: '4,000 -> 2,000', notes: 'Initial Drop-off', painPoint: "50% of registered leads don't attempt the initial filter test, leaking potential customers.", strategy: "Implement automated WhatsApp/email reminders within 12 hours. Counsellors to call non-attempters to understand friction.", ask: "Counsellor time for follow-up & CRM automation budget." },
  { stage: 'Test Attempts > Test Passed', conversion: '60%', weekly: '500 -> 300', monthly: '2,000 -> 1,200', notes: 'Lead Qualification', painPoint: "We need a path for interested but unqualified leads to prevent losing them forever.", strategy: "Use the Flexi-Quiz as a hard gate. Automatically enroll failed users into a free weekly webinar series for re-engagement and a retry opportunity.", ask: "Dev resources for quiz-to-webinar logic & content for webinars." },
  { stage: 'Test Passed > Module Completion', conversion: '20%', weekly: '360 -> 72', monthly: '1,440 -> 288', notes: 'Core Engagement', painPoint: "Qualified leads are not staying engaged enough to complete a full module.", strategy: "Gate access to materials (notes, mock tests) based on class attendance. Implement a 'disengaged' flag after 2 missed classes for immediate counsellor intervention.", ask: "Automated content gating logic & counsellor time for retention calls." },
];
export const strategicPostCompletionFunnelData: StrategicFunnelStage[] = [
  { stage: 'Module Completion > College Interest', conversion: '30%', weekly: '72 -> 22', monthly: '288 -> 86', notes: 'Upsell Opportunity', painPoint: "Students are unaware of the free counselling included or don't see the value.", strategy: "Trigger an automated email & WhatsApp campaign the moment a student completes a module, showcasing counsellor profiles and success stories.", ask: "Content and CRM resources to build the nurture campaign." },
  { stage: 'Docs Submitted > Visa Approved', conversion: '~60%', weekly: '13 -> 8', monthly: '52 -> 32', notes: 'Final Conversion', painPoint: "Students are overwhelmed by the documentation process, causing delays or drop-offs.", strategy: "Create step-by-step visa documentation checklists for top 5 countries. Offer 1:1 doc review sessions as a premium service or reward.", ask: "Counsellor time allocation for reviews and content creation." },
];

// CFO Data
export const financialMetricsData: FinancialMetric[] = [
  { metric: 'Monthly Revenue', value: '₹8,09,730', note: 'Based on 270 new students', status: 'good' },
  { metric: 'Gross Profit Margin', value: '66.2%', note: 'Healthy margin after trainer costs', status: 'good' },
  { metric: 'Net Profit Margin', value: '18.7%', note: 'After all OpEx and marketing', status: 'warning' },
  { metric: 'Cash Burn', value: '-₹1,51,730', note: 'Monthly operating profit', status: 'good' },
];
export const pnlData: PnLLineItem[] = [
  { category: 'Revenue', item: 'Course Fees (270 students)', amount: 809730 },
  { category: 'Revenue Total', item: 'Total Revenue', amount: 809730, isTotal: true },
  { category: 'COGS', item: 'Trainer Salaries', amount: -273375, isSubItem: true },
  { category: 'COGS Total', item: 'Total COGS', amount: -273375, isTotal: true },
  { category: 'Gross Profit', item: 'Gross Profit', amount: 536355, isTotal: true },
  { category: 'Operating Expenses', item: 'Marketing & Advertising', amount: -200000, isSubItem: true },
  { category: 'Operating Expenses', item: 'Counsellor Salaries', amount: -100000, isSubItem: true },
  { category: 'Operating Expenses', item: 'Cashback Reserve (22%)', amount: -40078, isSubItem: true },
  { category: 'Operating Expenses', item: 'Software & Tools', amount: -25000, isSubItem: true },
  { category: 'Operating Expenses', item: 'Overhead', amount: -19547, isSubItem: true },
  { category: 'Operating Expenses Total', item: 'Total Operating Expenses', amount: -384625, isTotal: true },
  { category: 'Net Profit', item: 'Net Profit', amount: 151730, isTotal: true },
];
export const unitEconomicsData: UnitEconomics = { ltv: 4500, cac: 1111, ratio: 4.05, note: 'LTV is strong due to high conversion to counselling services post-course.' };
export const cashbackFinancialsData: CashbackData[] = [
  { title: 'Projected Completion Rate', value: '22%', description: 'Based on current engagement data' },
  { title: 'Monthly Cashback Liability', value: '₹40,078', description: 'Amount set aside for future payouts' },
  { title: 'Actual Payout (Last Month)', value: '₹29,990', description: 'Reflects 10 students completing the challenge' },
];

// CXO Data
export const cxMetricsData: CxMetric[] = [
  { metric: 'Avg. Trainer NPS', value: '+92', target: '+90', trend: 'up' },
  { metric: 'Student Satisfaction (CSAT)', value: '-', target: '90%', trend: 'up' },
  { metric: 'Avg. Response Time (Support)', value: '-', target: '< 1 hours', trend: 'up' },
  { metric: 'Module Completion Rate', value: '9.05%', target: '20%', trend: 'down' },
];
export const customerFeedbackData: CustomerFeedback[] = [
  { type: 'Praise', quote: "I am immensely thankful for the exceptional guidance... The trainers' detailed explanation, feedback, and mock tests helped in boosting my confidence.", persona: 'Lokesh R.' },
  { type: 'Praise', quote: "The interactive practice session and discussions facilitated a dynamic learning environment... The collaborative atmosphere... truly enhanced the overall learning experience.", persona: 'Prarthna B.' },
  { type: 'Pain Point', quote: 'I wish I could get feedback on my writing assignments faster. Sometimes I wait 2 days.', persona: 'Working Professional Persona' },
  { type: 'Pain Point', quote: 'It was hard to find the link for the recorded classes. It should be on the main dashboard.', persona: 'New Student Persona' },
];
export const cxJourneyMapData: CxJourneyStage[] = [
  { stage: 'Awareness & Consideration', actions: 'Sees ad, visits landing page, takes free test', emotion: 'Curious', status: 'good', frictionPoints: ['Unclear value prop on ads'], delightOpportunities: ['Highlight "final price ₹0" more'], initiatives: [{ initiative: "A/B Test Ad Creatives", status: 'Live' }] },
  { stage: 'Onboarding', actions: 'Enrolls, receives welcome email, joins first class', emotion: 'Excited', status: 'good', frictionPoints: ['Delay in getting batch link'], delightOpportunities: ['Instant WhatsApp with batch details'], initiatives: [{ initiative: "WhatsApp API Integration", status: 'In Progress' }] },
  { stage: 'Learning & Engagement', actions: 'Attends classes, does assignments, takes mocks', emotion: 'Engaged', status: 'warning', frictionPoints: ['Loses motivation mid-way', 'Unsure of progress'], delightOpportunities: ['Weekly progress reports', 'Celebrate small wins (e.g., module completion)'], initiatives: [{ initiative: "Gamified Dashboard", status: 'Planned' }] },
  { stage: 'Post-Completion', actions: 'Finishes curriculum, books counselling, applies for visa', emotion: 'Confident', status: 'danger', frictionPoints: ['Students forget about free counselling', 'Visa process is confusing'], delightOpportunities: ['Proactive outreach from counsellors', 'Visa documentation templates'], initiatives: [{ initiative: "Post-Course Email Nurture", status: 'Planned' }] },
];
export const cxoStrategyData: StrategyItem[] = [
  {
    area: 'Early Student Retention (Class 1-5)',
    objective: 'Increase Class 1-5 module completion rate from 20% to a target of 40% to reduce early churn.',
    initiatives: [
      { name: "'First-5' Streak Gamification", status: 'Planned', details: 'Award a dashboard badge and a small reward (e.g., exclusive workshop access) for attending the first 5 classes consecutively.' },
      { name: 'Proactive Trainer Check-in', status: 'In Progress', details: 'Mandate trainers to send a personalized WhatsApp to each new student after their first class to build rapport and answer initial questions.' },
      { name: 'Onboarding Video Series', status: 'Completed', details: 'Create short, engaging videos explaining how to use the platform, access materials, and join classes, available on the dashboard for new users.' },
    ],
  },
  {
    area: 'Feedback Loop Optimization',
    objective: 'Reduce the average resolution time for negative student feedback from 48 hours to 12 hours.',
    initiatives: [
      { name: 'Automated Feedback Tagging & Routing', status: 'In Progress', details: 'Use sentiment analysis to automatically tag feedback as "Praise", "Issue", or "Suggestion" and route it directly to the relevant trainer or operations channel.' },
      { name: 'Implement "Rate This Class" Feature', status: 'Planned', details: 'Add a quick 1-5 star rating pop-up after each live class to gather immediate, low-friction feedback on session quality.' },
    ],
  },
];
export const cxoRiskData: RiskItem[] = [
  {
    title: 'Onboarding Overwhelm',
    level: 'Medium',
    risk: 'New students are presented with too much information (dashboard, materials, schedule) at once, leading to confusion and early drop-off.',
    mitigation: 'Implement a guided, step-by-step onboarding checklist on the student dashboard that unlocks new sections as the student completes initial tasks.',
    mitigationStatus: 'Planned',
  },
  {
    title: 'Inconsistent Trainer Experience',
    level: 'High',
    risk: 'Significant variations in teaching style, energy, or adherence to the curriculum between trainers can lead to student dissatisfaction and brand damage.',
    mitigation: 'Standardize the lesson plans for the first 3 classes of any module. Implement a mandatory peer-review program where trainers observe each other once a month.',
    mitigationStatus: 'In Progress',
  },
];

// CMO Data
export const cmoMetricsData: CmoMetric[] = [
  { metric: 'Total Monthly Leads', value: '4,000', note: 'From all channels', trend: 'up' },
  { metric: 'Blended CAC', value: '₹1,111', note: 'Across all new students', trend: 'stable' },
  { metric: 'MQL to SQL Conversion', value: '60%', note: 'Test Passed Rate', trend: 'up' },
  { metric: 'Marketing ROI', value: '265%', note: '(Revenue - Mktg Cost) / Mktg Cost', trend: 'up' },
];
export const channelPerformanceData: ChannelPerformance[] = [
  { channel: 'Facebook Ads', icon: <FacebookIcon />, leads: 2000, cpl: 15, conversionRate: 1.8, color: '#1877F2' },
  { channel: 'Google Ads', icon: <GoogleAdsIcon />, leads: 1200, cpl: 25, conversionRate: 2.2, color: '#4285F4' },
  { channel: 'Organic Search', icon: <OrganicSearchIcon />, leads: 600, cpl: 0, conversionRate: 3.1, color: '#34A853' },
  { channel: 'Referrals', icon: <ReferralIcon />, leads: 200, cpl: 0, conversionRate: 5.5, color: '#FBBC05' },
];
export const cmoInitiativesData: CmoInitiative[] = [
    { initiative: "Launch Referral Program", rationale: "Leverage high NPS scores to acquire high-quality, low-CAC leads.", status: 'Planned', impacts: "CAC, Leads" },
    { initiative: "Targeted 'Working Professional' Campaign", rationale: "Address the time-poor persona by highlighting flexible batch timings on LinkedIn.", status: 'In Progress', impacts: "Leads, CPL" },
    { initiative: "Create Video Testimonials", rationale: "Social proof is more powerful than ads. Showcase real success stories.", status: 'Live', impacts: "Conversion Rate" },
];
export const cmoStrategyData: StrategyItem[] = [
  {
    area: 'Top-of-Funnel Conversion (Traffic to Registration)',
    objective: 'Increase the website traffic to registration conversion rate from its current baseline to a target of 5% within the next quarter.',
    initiatives: [
      { name: 'A/B Test Landing Page Hero Section', status: 'In Progress', details: 'Test the current value proposition ("75% Off + Cashback") against a social proof-focused headline ("Join 5,000+ Successful Students").' },
      { name: 'Launch Persona-Specific Ad Campaigns', status: 'Planned', details: 'Create distinct ad campaigns on Facebook and LinkedIn for "Working Vikram" (focus on flexible timings) and "Ambitious Ananya" (focus on university admissions).' },
      { name: 'Simplify Registration Form', status: 'Completed', details: 'Reduced the number of required fields in the registration form from 5 to 3, which has already improved form completion rate by 15%.' },
    ],
  },
  {
    area: 'Brand & Community Building for Retention',
    objective: 'Leverage marketing channels to build a stronger community, fostering retention and generating high-quality referral leads.',
    initiatives: [
      { name: 'Launch Video Testimonial Campaign', status: 'In Progress', details: 'Produce and promote short video testimonials from students who have completed the Cashback Challenge to be used in ad campaigns and on the landing page.' },
      { name: 'Create "Prep-Buddy" Referral Program', status: 'Planned', details: 'Develop a simple referral system where existing students get a bonus (e.g., Amazon voucher) for referring friends who successfully enroll in the course.' },
    ],
  },
];
export const cmoRiskData: RiskItem[] = [
  {
    title: 'Ad Fatigue',
    level: 'Medium',
    risk: 'Over-exposure of the same ad creatives on social media can lead to banner blindness and a declining click-through rate (CTR).',
    mitigation: 'Implement a mandatory 2-week creative refresh cycle for all top-spending ad campaigns. Introduce user-generated content (testimonials) into the ad mix.',
    mitigationStatus: 'In Progress',
  },
  {
    title: 'Rising Cost Per Lead (CPL)',
    level: 'High',
    risk: 'Increased competition on primary ad platforms (Meta, Google) is driving up CPL, which could negatively impact the overall Customer Acquisition Cost (CAC).',
    mitigation: 'Diversify marketing channels by investing more in SEO to boost high-converting organic search traffic. Develop targeted blog content around long-tail IELTS-related keywords.',
    mitigationStatus: 'Planned',
  },
];

// COO Data
export const cooMetricsData: CooMetric[] = [
  { metric: 'Trainer Utilization', value: '85%', target: '90%', status: 'good' },
  { metric: 'Avg. Class Fill Rate', value: '78%', target: '85%', status: 'warning' },
];
export const trainerUtilizationData: TrainerUtilization[] = [
  { name: 'Prerna Kalra', sessions: 12, avgNps: 93, status: 'Active' },
  { name: 'Taru Thakur', sessions: 10, avgNps: 90, status: 'Active' },
  { name: 'Pallavi Rani', sessions: 11, avgNps: 93, status: 'Active' },
  { name: 'New Trainer', sessions: 0, avgNps: 0, status: 'Onboarding' },
];
export const trainerRatingData: TrainerRatingMetric[] = [
  { name: 'Prerna Kalra', totalResponses: 540, effectiveness: 4.9, engagement: 4.8, clarity: 4.7, approachability: 4.9, familiarity: 4.8 },
  { name: 'Taru Thakur', totalResponses: 495, effectiveness: 4.7, engagement: 4.9, clarity: 4.8, approachability: 4.7, familiarity: 4.6 },
  { name: 'Pallavi Rani', totalResponses: 580, effectiveness: 4.8, engagement: 4.7, clarity: 4.9, approachability: 4.8, familiarity: 4.9 },
];
export const weekdayFunnelData: ClassFunnelMetric[] = [
  { stage: 'Total People who have registered', count: 1098 },
  { stage: 'Total People who attended atleast 1 class', count: 398, percentage: 36.25 },
  { stage: 'Total People who completed at least 1 module and attended atleast 5 class', count: 27, percentage: 6.78 },
];
export const weekendFunnelData: ClassFunnelMetric[] = [
  { stage: 'Total People who have registered', count: 747 },
  { stage: 'Total People who attended atleast 1 class', count: 312, percentage: 41.77 },
  { stage: 'Total People who completed at least 1 module', count: 140, percentage: 44.87 },
];
export const batchFillRateData: BatchFillRateMetric[] = [
  { timing: "6-7 PM (R)", avgLearners: 10, fillRate: "31.67%" },
  { timing: "4-5 PM (R)", avgLearners: 7, fillRate: "22.50%" },
  { timing: "2-4 PM (TOEFL)", avgLearners: 33, fillRate: "111.11%" },
  { timing: "12-1 PM (R)", avgLearners: 5, fillRate: "15.00%" },
  { timing: "11-12 PM (R)", avgLearners: 5, fillRate: "15.83%" },
  { timing: "11-1.30 PM (IELTS)", avgLearners: 10, fillRate: "32.22%" },
  { timing: "Total (15 Batches)", avgLearners: 69, fillRate: "15.22%" },
];
export const aggregateTrainerUtilizationData: AggregateTrainerUtilizationMetric[] = [
  { item: 'Total Monthly Working Hours', hours: 480 },
  { item: 'Dedicated Training (In Class)', hours: 240 },
  { item: 'Actual Training (In Class)', hours: 112, percentage: '46.67%' },
  { item: 'Dedicated Prep Material', hours: 240 },
  { item: 'Actual Prep Material', hours: 350, percentage: '145.83%' },
  { item: 'Total Utilized Hours (Actual)', hours: 462 },
  { item: 'Overall Utilization', hours: 462, percentage: '96.25%' },
];
export const cooStrategyData: StrategyItem[] = [
  {
    area: 'Trainer & Class Management',
    objective: 'Maximize trainer effectiveness and student satisfaction while maintaining operational scalability.',
    initiatives: [
      { name: 'Dynamic Batch Consolidation', status: 'Planned', details: 'Develop a system to automatically recommend merging batches with fill rates below 40% to improve class dynamics and trainer utilization.' },
      { name: 'Standardized Prep Material Library', status: 'In Progress', details: 'Create a central repository of pre-approved lesson plans and materials to reduce individual trainer prep time from 145% to a target of 110% of dedicated hours.' },
      { name: 'Automated Attendance Tracking', status: 'Planned', details: 'Integrate MSTeams API to auto-log attendance, freeing up trainer time and providing real-time data for engagement tracking.' },
    ],
  },
  {
    area: 'Student Experience & Operations',
    objective: 'Streamline the student operational journey to reduce friction and improve retention.',
    initiatives: [
      { name: 'Feedback Loop Automation', status: 'In Progress', details: 'Tag and route student feedback from surveys directly to relevant trainer dashboards for faster response and quality improvement.' },
      { name: 'Proactive No-Show Intervention', status: 'Planned', details: 'Trigger automated alerts to counsellors when a student misses two consecutive classes, enabling prompt intervention.' },
    ],
  },
];
export const cooRiskData: RiskItem[] = [
  {
    title: 'Trainer Burnout',
    level: 'High',
    risk: 'Prep material creation takes 146% of allocated time, leading to overwork, potential quality decline, and high trainer churn.',
    mitigation: 'Prioritize and accelerate the "Standardized Prep Material Library" initiative. Allocate a dedicated content team to support trainers.',
    mitigationStatus: 'In Progress',
  },
  {
    title: 'Poor Class Experience',
    level: 'Medium',
    risk: 'Low batch fill rates (avg. 15%) in some slots lead to poor student interaction and perceived low value.',
    mitigation: 'Implement dynamic batch consolidation for slots below 40% fill rate. A/B test offering 1-on-1 credits for students in cancelled batches.',
    mitigationStatus: 'Planned',
  },
  {
    title: 'Data Inaccuracy in Rosters',
    level: 'Low',
    risk: 'Manual management of class rosters can lead to incorrect class invites and student frustration.',
    mitigation: 'Fast-track "Automated Attendance Tracking" and link roster management directly to the CRM.',
    mitigationStatus: 'Planned',
  },
];

export const sentimentAnalysisSummaryData: SentimentAnalysisSummary = {
  totalResponses: 1615,
  breakdown: [
    { sentiment: 'Positive', count: 634, percentage: '~39%', color: 'bg-emerald-500' },
    { sentiment: 'Neutral', count: 958, percentage: '~60%', color: 'bg-slate-400' },
    { sentiment: 'Negative', count: 23, percentage: '~1%', color: 'bg-red-500' },
  ],
  positive: {
    title: "What Learners Liked",
    icon: "👍",
    examples: [`"Nice"`, `"Good"`, `"The content of reading sessions was great and well explained."`],
    themes: ["Clear and structured explanation", "Helpful session content (especially Reading)", "Engaging instructors", "Step-by-step teaching"],
  },
  negative: {
    title: "What Learners Struggled With",
    icon: "👎",
    examples: [`"The session is not much clear, it’s a little difficult to follow."`, `"The question-answer round was confusing."`, `"Too fast, no time to process or practice."`],
    themes: ["Pacing is too fast", "Lack of practical question-solving during class", "Some sessions lack clarity (especially among beginner-level learners)"],
  },
  requests: {
    title: "What Learners Want",
    icon: "📢",
    themes: [
        { theme: "Live doubt-solving & more Q&A time", status: 'Delivered' },
        { theme: "More speaking and writing practice", status: 'Delivered' },
        { theme: "Homework or post-class revision material", status: 'Delivered' },
        { theme: "Batch timing flexibility", status: 'Delivered' },
        { theme: "Recording access for missed sessions", status: 'Planning' },
    ],
  },
   issue: {
    title: "Ongoing Issue",
    icon: "⚠️",
    summary: "Although negative feedback is minimal, clarity and pace are the biggest friction points. Learners are requesting:",
    themes: ["Slower pace in complex topics", "Better engagement during Q&A", "Practice tasks during class, not just homework"],
  },
};