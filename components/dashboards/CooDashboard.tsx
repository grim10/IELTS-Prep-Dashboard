
import React, { useState, useMemo } from 'react';
import { cooMetricsData, trainerUtilizationData, trainerRatingData, weekdayFunnelData, weekendFunnelData, batchFillRateData, aggregateTrainerUtilizationData, cooStrategyData, cooRiskData } from '../../constants';
import type { CooMetric, TrainerUtilization, TrainerRatingMetric, ClassFunnelMetric, BatchFillRateMetric, AggregateTrainerUtilizationMetric, RiskItem, StrategyItem } from '../../types';
import { SectionTitle, SubTitle, Card, TabButton, FunnelTable, StatCard, DataConsistencyChecker, StrategyView, RisksView } from './SharedComponents';

const ClassFunnel: React.FC<{ title: string; data: ClassFunnelMetric[], maxRegistered: number }> = ({ title, data, maxRegistered }) => {
    return (
        <div>
            <h4 className="font-bold text-lg text-slate-700 mb-3 text-center">{title}</h4>
            <div className="space-y-4">
                {data.map((item, index) => {
                    const funnelPercentage = maxRegistered > 0 ? (item.count / maxRegistered) * 100 : 0;
                    return (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-sm font-semibold text-slate-800">{item.stage}</span>
                                <span className="font-mono text-lg font-bold text-slate-900">{item.count.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${funnelPercentage}%` }}></div>
                            </div>
                            {item.percentage !== undefined && (
                                <p className="text-right text-xs text-slate-500 mt-1">
                                    <span className="font-bold text-emerald-700">{item.percentage.toFixed(2)}%</span> conversion
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const BatchFillRateTable: React.FC<{ data: BatchFillRateMetric[] }> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Batch Timing</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Learners</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/3">Fill Rate</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {data.map(item => {
                        const fillRateNum = parseFloat(item.fillRate);
                        const isTotal = item.timing.toLowerCase().includes('total');
                        
                        let progressColor;
                        if (fillRateNum > 100) progressColor = 'bg-emerald-700'; // Higher shade of green for overfilled
                        else if (fillRateNum >= 80) progressColor = 'bg-emerald-500'; // Green for well-filled
                        else if (fillRateNum >= 40) progressColor = 'bg-amber-500'; // Orange for average
                        else progressColor = 'bg-red-500'; // Red for under-utilized
                        
                        return (
                            <tr key={item.timing} className={isTotal ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50/50'}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">{item.timing}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-right font-mono text-sm text-slate-700">{item.avgLearners}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="w-full bg-slate-200 rounded-full h-4">
                                            <div className={`${progressColor} h-4 rounded-full`} style={{ width: `${Math.min(fillRateNum, 100)}%` }}></div>
                                        </div>
                                        <span className="font-mono text-sm font-semibold w-16 text-right text-slate-800">{item.fillRate}</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
const TrainerUtilizationVisual: React.FC<{ data: AggregateTrainerUtilizationMetric[] }> = ({ data }) => {
    const dedicatedTraining = data.find(d => d.item === 'Dedicated Training (In Class)')?.hours || 0;
    const actualTraining = data.find(d => d.item === 'Actual Training (In Class)')?.hours || 0;
    const dedicatedPrep = data.find(d => d.item === 'Dedicated Prep Material')?.hours || 0;
    const actualPrep = data.find(d => d.item === 'Actual Prep Material')?.hours || 0;
    const totalHours = data.find(d => d.item === 'Total Monthly Working Hours')?.hours || 0;
    const totalUtilized = data.find(d => d.item === 'Total Utilized Hours (Actual)')?.hours || 0;

    const trainingUtilization = dedicatedTraining > 0 ? (actualTraining / dedicatedTraining) * 100 : 0;
    const prepUtilization = dedicatedPrep > 0 ? (actualPrep / dedicatedPrep) * 100 : 0;
    const overallUtilization = totalHours > 0 ? (totalUtilized / totalHours) * 100 : 0;

    const UtilizationCard: React.FC<{
        title: string;
        dedicated: number;
        actual: number;
        utilization: number;
        insight: string;
    }> = ({ title, dedicated, actual, utilization, insight }) => {
        const isOver = utilization > 100;
        const barWidth = isOver ? 100 : utilization;
        
        let barColor = 'bg-amber-400';
        let textColor = 'text-amber-700';
        if (isOver) {
            barColor = 'bg-red-500';
            textColor = 'text-red-600';
        } else if (utilization >= 80) {
            barColor = 'bg-emerald-500';
            textColor = 'text-emerald-600';
        }

        return (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold text-md text-slate-800">{title}</h5>
                    <span className={`font-extrabold text-xl ${textColor}`}>{utilization.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 relative">
                    <div className={`${barColor} h-4 rounded-full`} style={{ width: `${barWidth}%` }}></div>
                    {isOver && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold tracking-wider">OVER-ALLOCATED</span>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-baseline mt-2 text-sm">
                    <span className="font-medium text-slate-600">Actual: <span className="font-bold text-slate-800">{actual} hrs</span></span>
                    <span className="font-medium text-slate-500">Dedicated: {dedicated} hrs</span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 italic">
                    <span className="font-bold not-italic text-slate-700">💡 Insight: </span>{insight}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
             <UtilizationCard 
                title="In-Class Training" 
                dedicated={dedicatedTraining} 
                actual={actualTraining} 
                utilization={trainingUtilization}
                insight="Significant spare capacity available. Can handle more batches without increasing headcount."
            />
            <UtilizationCard 
                title="Prep Material Creation" 
                dedicated={dedicatedPrep} 
                actual={actualPrep} 
                utilization={prepUtilization}
                insight="Prep time is severely underestimated. Time left from non-performing batches are being used in prep material creation."
            />
            <div className="bg-slate-800 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="font-bold">Overall Utilization</span>
                    <span className="font-mono font-bold text-lg">{overallUtilization.toFixed(1)}%</span>
                </div>
                 <div className="flex justify-between items-baseline text-sm text-slate-300">
                    <span>Total Utilized Hours</span>
                    <span>{totalUtilized} / {totalHours} hrs</span>
                </div>
            </div>
        </div>
    );
};
const TrainerRatingTable: React.FC<{ data: TrainerRatingMetric[] }> = ({ data }) => {
    const headers = [ 'Effectiveness', 'Engagement', 'Clarity', 'Approachability', 'Familiarity', 'Overall Avg.', 'Simulated NPS' ];
    
    const totals = useMemo(() => {
        const initialTotals = {
            totalResponses: 0, effectiveness: 0, engagement: 0, clarity: 0, approachability: 0, familiarity: 0,
        };
        data.forEach(d => {
            initialTotals.totalResponses += d.totalResponses;
            initialTotals.effectiveness += d.effectiveness * d.totalResponses;
            initialTotals.engagement += d.engagement * d.totalResponses;
            initialTotals.clarity += d.clarity * d.totalResponses;
            initialTotals.approachability += d.approachability * d.totalResponses;
            initialTotals.familiarity += d.familiarity * d.totalResponses;
        });
        const grandTotalAvg = (initialTotals.effectiveness + initialTotals.engagement + initialTotals.clarity + initialTotals.approachability + initialTotals.familiarity) / (initialTotals.totalResponses * 5);
        return { ...initialTotals, grandTotalAvg };
    }, [data]);

    const calculateMetrics = (trainer: TrainerRatingMetric) => {
        const avgRating = (trainer.effectiveness + trainer.engagement + trainer.clarity + trainer.approachability + trainer.familiarity) / 5;
        let npsScore;
        if (avgRating > 4.5) npsScore = 80 + (avgRating - 4.5) * 40;
        else if (avgRating >= 4.3) npsScore = 50;
        else npsScore = 20;
        return { avgRating: avgRating.toFixed(2), npsScore: `+${Math.round(npsScore)}` };
    };

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full"><thead className="bg-slate-50">
            <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trainer</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Responses</th>
                {headers.map(h => <th key={h} className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>)}
            </tr>
        </thead><tbody className="bg-white divide-y divide-slate-200">
            {data.map(trainer => {
                const { avgRating, npsScore } = calculateMetrics(trainer);
                return(
                <tr key={trainer.name} className="hover:bg-slate-50/50">
                    <td className="px-3 py-4 whitespace-nowrap font-bold text-slate-700">{trainer.name}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm text-slate-600">{trainer.totalResponses}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm text-slate-600">{trainer.effectiveness.toFixed(1)}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm text-slate-600">{trainer.engagement.toFixed(1)}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm text-slate-600">{trainer.clarity.toFixed(1)}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm text-slate-600">{trainer.approachability.toFixed(1)}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm text-slate-600">{trainer.familiarity.toFixed(1)}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm font-bold text-slate-800">{avgRating}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm font-bold text-emerald-700">{npsScore}</td>
                </tr>
            )})}
            <tr className="bg-slate-100 font-bold">
                <td className="px-3 py-4 text-slate-800">Grand Total</td>
                <td className="px-3 py-4 text-right font-mono text-sm text-slate-800">{totals.totalResponses.toLocaleString()}</td>
                <td className="px-3 py-4 text-right font-mono text-sm text-slate-800">{(totals.effectiveness/totals.totalResponses).toFixed(2)}</td>
                <td className="px-3 py-4 text-right font-mono text-sm text-slate-800">{(totals.engagement/totals.totalResponses).toFixed(2)}</td>
                <td className="px-3 py-4 text-right font-mono text-sm text-slate-800">{(totals.clarity/totals.totalResponses).toFixed(2)}</td>
                <td className="px-3 py-4 text-right font-mono text-sm text-slate-800">{(totals.approachability/totals.totalResponses).toFixed(2)}</td>
                <td className="px-3 py-4 text-right font-mono text-sm text-slate-800">{(totals.familiarity/totals.totalResponses).toFixed(2)}</td>
                <td className="px-3 py-4 text-right font-mono text-sm text-slate-800">{totals.grandTotalAvg.toFixed(2)}</td>
                <td className="px-3 py-4"></td>
            </tr>
        </tbody></table>
    </div>
    )
};
const TrainerUtilizationTable: React.FC<{data: TrainerUtilization[]}> = ({data}) => {
    const statusClasses = { Active: 'bg-emerald-100 text-emerald-800', Onboarding: 'bg-blue-100 text-blue-800', 'On Leave': 'bg-slate-200 text-slate-800' };
    return (<div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200"><thead className="bg-slate-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trainer</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Sessions / Week</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. NPS</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
        </thead><tbody className="bg-white divide-y divide-slate-200">
            {data.map(item => (
                <tr key={item.name} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-slate-600">{item.sessions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-slate-600">{item.avgNps > 0 ? `+${item.avgNps}` : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[item.status]}`}>{item.status}</span></td>
                </tr>
            ))}
        </tbody></table>
    </div>);
};

const CooMainDashboard: React.FC = () => {
    const { raciData } = useMemo(() => ({
        raciData: {
            englishTest: [ { task: 'Maintain Flexi-Quiz logic', r: 'Product', a: 'Ops', c: 'Trainers', i: '–' }, { task: 'Send test link + reminders', r: 'Counsellor', a: 'Counsellor', c: '–', i: '–' }, { task: 'Track test attempts/scores', r: 'Animesh', a: 'Animesh', c: '–', i: '–' }, { task: 'Design question bank', r: 'Trainers', a: 'Trainers', c: '–', i: '–' }, ],
            webinars: [ { task: 'Schedule and moderate weekly webinar', r: 'Product', a: 'Trainer', c: 'Counsellor', i: '–' }, { task: 'Share webinar recordings', r: 'Counsellor', a: 'Counsellor', c: 'Product', i: '–' }, { task: 'Maintain retry eligibility list', r: 'Animesh', a: 'Counsellor', c: 'Product', i: '–' }, ],
            classDesign: [ { task: 'Conduct scheduled sessions', r: 'Trainer', a: 'Trainer', c: '–', i: '–' }, { task: 'Manage class rosters', r: 'Animesh', a: 'Product', c: 'Trainer', i: '' }, { task: 'Send Class invites & reminders', r: 'Animesh', a: 'Product', c: 'Trainers', i: '' }, { task: 'Mark attendance & escalate no-shows', r: 'Trainer', a: 'Trainer', c: 'Animesh', i: 'Counsellor' }, { task: 'Share session recordings', r: 'Animesh', a: 'Animesh', c: '–', i: 'Counsellor' }, { task: 'Assign and track assignments', r: 'Trainer', a: 'Trainer', c: 'Counsellor', i: '–' }, ]
        }
    }), []);
    const maxRegistered = Math.max(weekdayFunnelData[0]?.count || 0, weekendFunnelData[0]?.count || 0);

    const StrengthIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const ConcernIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    );

    const InefficiencyIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.108 1.204l.527.738c.32.447.27.96-.12 1.45l-.773.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205-.108l-.737.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272.806.108 1.204-.165-.397-.505-.71-.93.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.093c0 .55.398-1.02.94-1.11l.894-.149c.424-.07.764-.383.93-.78.165-.398-.143-.854-.108-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.806.272 1.204.108.397.165.71.505.78-.93l.15-.894z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    const overviewCards = [
        {
            icon: <StrengthIcon />,
            title: "Strength: Elite Trainers & Solid Structure",
            description: "Our core operations are strong, anchored by high-performing trainers (avg. 4.8/5 rating, +92 NPS). Quality delivery is a solved problem.",
            style: "bg-emerald-50 border-emerald-200"
        },
        {
            icon: <ConcernIcon />,
            title: "Primary Concern: High Student Churn",
            description: "Our biggest leak is the massive drop-off after the first class. Only 7% (weekday) vs 45% (weekend) of attendees complete a full module. This is our top priority to fix.",
            style: "bg-red-50 border-red-200"
        },
        {
            icon: <InefficiencyIcon />,
            title: "Key Inefficiencies: Mismatched Resources",
            description: "Trainer prep time is at a critical 145.8% of allocated hours, while in-class time is only 46.7% utilized, caused by a low 15.22% avg. batch fill rate.",
            style: "bg-amber-50 border-amber-200"
        }
    ];

    const RetentionIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" /></svg>);
    const SustainabilityIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
    const EfficiencyIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.12-.34-.014-.708-.341-.832z" /></svg>);
    const QualityIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.419c.47 0 .682.636.328.957l-4.387 3.185a.562.562 0 00-.182.557l1.635 5.419a.562.562 0 01-.815.636l-4.386-3.185a.563.563 0 00-.557 0l-4.387 3.185a.562.562 0 01-.815-.636l1.635-5.419a.562.562 0 00-.182-.557l-4.387-3.185a.562.562 0 01.328-.957h5.419a.563.563 0 00.475-.31l2.125-5.111z" /></svg>);

    const KeyMetricCard: React.FC<{
        icon: React.ReactElement<{ className?: string }>;
        title: string;
        value: string;
        target: string;
        status: 'good' | 'warning' | 'danger';
        note: string;
    }> = ({ icon, title, value, target, status, note }) => {
        const statusClasses = {
            good: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-800', progress: 'bg-emerald-500' },
            warning: { border: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-800', progress: 'bg-amber-500' },
            danger: { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-800', progress: 'bg-red-500' },
        };
        const currentStatus = statusClasses[status];
        const currentValueNum = parseFloat(value.replace(/[^\d.]/g, ''));
        const targetValueNum = parseFloat(target.replace(/[^\d.]/g, ''));
        let progress = 0;
        if (targetValueNum > 0) {
            progress = (currentValueNum / targetValueNum) * 100;
        }
        
        return (
            <div className={`p-6 rounded-2xl border-2 flex flex-col h-full ${currentStatus.border} ${currentStatus.bg}`}>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{React.cloneElement(icon, { className: `h-8 w-8 ${currentStatus.text}` })}</div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-900">{title}</h4>
                        <p className={`text-sm font-semibold ${currentStatus.text}`}>Target: {target}</p>
                    </div>
                </div>
                <div className="my-4 flex-grow flex items-center justify-center">
                    <p className="text-5xl font-extrabold text-slate-800">{value}</p>
                </div>
                <div className="w-full bg-slate-200/70 rounded-full h-2 my-2">
                    <div className={`${currentStatus.progress} h-2 rounded-full`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
                </div>
                <p className="text-xs text-slate-600 text-center">{note}</p>
            </div>
        );
    };

    const top4Metrics = [
        { icon: <RetentionIcon />, title: "Student Retention: Module Completion", value: "9.05%", target: "20%", status: 'danger' as 'danger', note: "% of students who attended the class and completed at least 1 module. The biggest leak in our funnel." },
        { icon: <SustainabilityIcon />, title: "Trainer: Prep Time", value: "145.8%", target: "100%", status: 'danger' as 'danger', note: "Tracks trainer workload. Values over 100% indicate unsustainable prep time and burnout risk. High values indicate their training time being utilised to create prep." },
        { icon: <EfficiencyIcon />, title: "Resource Efficiency: Batch Fill Rate", value: "15.2%", target: "40%", status: 'danger' as 'danger', note: "Indicates how effectively we use our trainers' in-class time. Low rates mean wasted resources." },
        { icon: <QualityIcon />, title: "Quality Foundation: Trainer NPS", value: "+92", target: "> +90", status: 'good' as 'good', note: "Our core strength. Measures the quality of our service delivery, which drives satisfaction." },
    ]

    return (
        <div className="mt-6 space-y-8">
            <Card>
                <SubTitle>Operational Efficiency Overview</SubTitle>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {overviewCards.map(card => (
                        <div key={card.title} className={`p-6 rounded-xl border-l-4 ${card.style}`}>
                            <div className="flex items-start gap-4">
                                {card.icon}
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800">{card.title}</h4>
                                    <p className="text-slate-700 mt-2">{card.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <SubTitle>Operational Success Metrics</SubTitle>
                <p className="text-slate-600 mb-6 -mt-2">These are the most critical data points to monitor for operational health and success.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {top4Metrics.map(metric => <KeyMetricCard key={metric.title} {...metric} />)}
                </div>
            </Card>

            <Card>
                <SubTitle>Class Engagement & Funnels</SubTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
                   <ClassFunnel title="Weekday Engagement Funnel" data={weekdayFunnelData} maxRegistered={maxRegistered} />
                   <ClassFunnel title="Weekend Engagement Funnel" data={weekendFunnelData} maxRegistered={maxRegistered} />
                </div>
            </Card>
            <Card>
                <SubTitle>Batch Performance & Utilization</SubTitle>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-lg text-slate-700 mb-3">Batch Fill Rate (Last 4 Weeks Avg.)</h4>
                        <p className="text-sm text-slate-500 mb-4 -mt-2">Highlights popular slots or those needing consolidation. Max capacity is 30 students/batch.</p>
                        <BatchFillRateTable data={batchFillRateData} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-700 mb-3">Aggregate Trainer Utilization (Monthly)</h4>
                        <p className="text-sm text-slate-500 mb-4 -mt-2">Visual breakdown of dedicated vs. actual hours spent, revealing key operational insights.</p>
                        <TrainerUtilizationVisual data={aggregateTrainerUtilizationData} />
                    </div>
                </div>
            </Card>
            <Card>
                <SubTitle>Individual Trainer Roster & Performance</SubTitle>
                <TrainerUtilizationTable data={trainerUtilizationData} />
            </Card>
            <Card>
                <SubTitle>Detailed Trainer Ratings & NPS</SubTitle>
                <p className="text-slate-600 mb-4 -mt-2">Granular breakdown of trainer performance from student feedback.</p>
                <TrainerRatingTable data={trainerRatingData} />
            </Card>
            <Card>
                <SubTitle>Process Ownership (RACI Charts)</SubTitle>
                <div className="space-y-6">
                    <div><h4 className="font-bold text-lg text-slate-700 mb-2">English Test Filter</h4><FunnelTable data={raciData.englishTest} headers={['Task', 'R', 'A', 'C', 'I']} /></div>
                    <div><h4 className="font-bold text-lg text-slate-700 mb-2">Weekly Webinars</h4><FunnelTable data={raciData.webinars} headers={['Task', 'R', 'A', 'C', 'I']} /></div>
                    <div><h4 className="font-bold text-lg text-slate-700 mb-2">IELTS Class Design</h4><FunnelTable data={raciData.classDesign} headers={['Task', 'R', 'A', 'C', 'I']} /></div>
                </div>
            </Card>
        </div>
    );
};

const CooDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const tabs = [
        { id: 'dashboard', title: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
        { id: 'strategy', title: 'Strategy', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg> },
        { id: 'risks', title: 'Risks', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg> },
    ];

    const renderCooContent = () => {
        switch (activeTab) {
            case 'strategy': return <StrategyView title="⚙️ Operational Strategy" description="Initiatives to enhance efficiency, quality, and scalability of our service delivery." data={cooStrategyData} />;
            case 'risks': return <RisksView title="⚠️ Operational Risks" description="Identifying and mitigating risks that could impact service quality and operational health." data={cooRiskData} />;
            default: return <CooMainDashboard />;
        }
    };

    return (
        <>
            <div className="border-b border-slate-200 mb-6">
                <div className="flex space-x-1 sm:space-x-2 flex-wrap">
                    {tabs.map(tab => <TabButton key={tab.id} title={tab.title} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} icon={tab.icon}/>)}
                </div>
            </div>
             <DataConsistencyChecker />
            <div>{renderCooContent()}</div>
        </>
    );
};

export default CooDashboard;
