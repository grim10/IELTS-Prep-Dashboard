
import React, { useState, useEffect, useMemo } from 'react';
import { funnelConversionData, cmoMetricsData, pnlData } from '../../constants';
import type { RiskItem, RoadmapPhase, FinancialMetric, UnitEconomics, CashbackData, CxMetric, CustomerFeedback, PnLLineItem, CxJourneyStage, CxInitiative, CmoMetric, ChannelPerformance, CooMetric, TrainerUtilization, DataConsistencyAlert, StrategicFunnelStage, ClassFunnelMetric, BatchTimingMetric, BatchFillRateMetric, AggregateTrainerUtilizationMetric, CmoInitiative, TrainerRatingMetric, SentimentAnalysisSummary, KpiItem, StrategyItem } from '../../types';

// --- Reusable & Common Components ---
export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-3xl font-extrabold text-slate-900 mt-10 mb-6 border-b-2 pb-3 border-slate-200">{children}</h2>;
export const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">{children}</h3>;
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={`bg-white p-6 rounded-xl my-4 border border-slate-200 shadow-sm ${className}`}>{children}</div>;
export const TabButton: React.FC<{ title: string; active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ title, active, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-md transition-all duration-200 ${
            active ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
        }`}
    >
        {icon}
        {title}
    </button>
);
export const FunnelTable: React.FC<{ data: any[], headers: string[] }> = ({ data, headers }) => (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    {headers.map(header => <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{header}</th>)}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {data.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                        {Object.values(row).map((cell: any, cellIndex: number) => <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export const StatCard: React.FC<{ title: string; value: string; target?: string; status?: 'good' | 'warning' | 'danger'; trend?: 'up' | 'down' | 'stable'; note?: string }> = ({ title, value, target, status, trend, note }) => {
    const statusClasses = {
        good: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
        warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
        danger: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
    };
    const trendIcons = { up: '▲', down: '▼', stable: '–' };
    const currentStatus = status ? statusClasses[status] : { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700' };

    return (
        <div className={`p-5 rounded-xl border ${currentStatus.bg} ${currentStatus.border}`}>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-extrabold text-slate-800">{value}</p>
                {trend && <p className={`text-md font-bold ${currentStatus.text}`}>{trendIcons[trend]}</p>}
            </div>
            {target && <p className="text-xs text-slate-500 mt-1">Target: {target}</p>}
            {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}
        </div>
    );
};

// --- NEW Data Consistency Checker ---
export const DataConsistencyChecker: React.FC = () => {
    const [alerts, setAlerts] = useState<DataConsistencyAlert[]>([]);
    const [isConsistent, setIsConsistent] = useState(true);

    useEffect(() => {
        const checkData = () => {
            const newAlerts: DataConsistencyAlert[] = [];

            // Check 1: Paying Students (CEO Funnel vs CFO P&L)
            // Revenue is driven by students who complete modules, so we compare monthly module completers with the P&L student count.
            const funnelStudentsStr = funnelConversionData.find(d => d.stage.includes('Module Completion'))?.monthly;
            const funnelStudents = funnelStudentsStr ? parseInt(funnelStudentsStr.replace(/,/g, ''), 10) : 0;
            const pnlStudentsStr = pnlData.find(d => d.item.includes('students'))?.item;
            const pnlStudentsMatch = pnlStudentsStr ? pnlStudentsStr.match(/\((\d+)/) : null;
            const pnlStudents = pnlStudentsMatch ? parseInt(pnlStudentsMatch[1], 10) : 0;

            if (funnelStudents !== pnlStudents) {
                newAlerts.push({
                    metric: 'Paying Students (Monthly)',
                    locations: ['CEO Funnel (Completers)', 'CFO P&L'],
                    values: [funnelStudents, pnlStudents],
                    message: `The CEO dashboard shows ${funnelStudents} students completing modules monthly, but the CFO P&L is calculated based on ${pnlStudents}. This affects revenue and profit calculations.`
                });
            }
            
            // Check 2: Monthly Leads (CEO Funnel vs CMO Dashboard)
            const cmoLeadsMetric = cmoMetricsData.find(d => d.metric.toLowerCase().includes('total') && d.metric.toLowerCase().includes('leads'));
            const cmoLeadsStr = cmoLeadsMetric?.value.replace(/,/g, '');
            const cmoLeads = cmoLeadsStr ? parseInt(cmoLeadsStr, 10) : 0;
            const funnelMonthlyLeadsStr = funnelConversionData[0].monthly.replace(/,/g, '');
            const funnelMonthlyLeads = funnelMonthlyLeadsStr ? parseInt(funnelMonthlyLeadsStr, 10) : 0;

            if (cmoLeads !== funnelMonthlyLeads) {
                 newAlerts.push({
                    metric: 'Total Monthly Leads',
                    locations: ['CMO Dashboard', 'CEO Funnel'],
                    values: [cmoLeads, funnelMonthlyLeads],
                    message: `CMO dashboard shows total leads of ${cmoLeads}, which does not match the monthly lead volume of ${funnelMonthlyLeads} from the CEO funnel.`
                });
            }

            setAlerts(newAlerts);
            setIsConsistent(newAlerts.length === 0);
        };
        checkData();
    }, []);

    if (isConsistent) {
        return (
            <div className="p-4 mb-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                    <h4 className="font-bold text-emerald-800">Data Consistent</h4>
                    <p className="text-sm text-emerald-700">All cross-dashboard metrics are aligned. Reports are reliable.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 mb-6 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-3 mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                 <h4 className="font-bold text-red-800">Data Consistency Alert</h4>
            </div>
            <div className="space-y-3">
                {alerts.map(alert => (
                     <div key={alert.metric} className="text-sm text-red-700 border-l-4 border-red-400 pl-3">
                        <p><strong>Discrepancy in:</strong> {alert.metric}</p>
                        <p><strong>Value in {alert.locations[0]}:</strong> <span className="font-mono font-bold">{alert.values[0]}</span></p>
                        <p><strong>Value in {alert.locations[1]}:</strong> <span className="font-mono font-bold">{alert.values[1]}</span></p>
                        <p className="mt-1"><strong>Impact:</strong> {alert.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const StrategicFunnelTable: React.FC<{ data: StrategicFunnelStage[] }> = ({ data }) => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const toggleRow = (index: number) => setExpandedRow(expandedRow === index ? null : index);

    return (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-[35%]">Funnel Stage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Conversion %</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Weekly Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Monthly Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {data.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleRow(index)} className="cursor-pointer hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap"><div className="font-bold text-slate-800">{row.stage}</div><div className="text-xs text-slate-500">{row.notes}</div></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{row.conversion}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{row.weekly}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{row.monthly}</td>
                                <td className="px-6 py-4"><svg className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${expandedRow === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></td>
                            </tr>
                            {expandedRow === index && (
                                <tr>
                                    <td colSpan={5} className="p-0">
                                        <div className="p-6 bg-slate-100/60">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div><h5 className="font-bold text-sm text-red-700 mb-1">Pain Point</h5><p className="text-sm text-slate-700">{row.painPoint}</p></div>
                                                <div><h5 className="font-bold text-sm text-emerald-700 mb-1">Strategy</h5><p className="text-sm text-slate-700">{row.strategy}</p></div>
                                                <div><h5 className="font-bold text-sm text-blue-700 mb-1">The Ask</h5><p className="text-sm text-slate-700">{row.ask}</p></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const KpiTableWithProgress: React.FC<{ data: KpiItem[] }> = ({ data }) => {
    const getStatusIndicator = (status: 'good' | 'warning' | 'danger') => {
        const classes = {
            good: 'bg-emerald-100 text-emerald-800',
            warning: 'bg-amber-100 text-amber-800',
            danger: 'bg-red-100 text-red-800',
        };
        const text = { good: 'On Track', warning: 'At Risk', danger: 'Needs Attention' }
        return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${classes[status]}`}>{text[status]}</span>;
    };
    const parseValue = (val: string): number => parseFloat(val.replace(/[^\d.]/g, ''));

    return (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/4">KPI</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/2">Performance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/4">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {data.map(item => {
                        const currentValue = parseValue(item.value);
                        const targetValue = parseValue(item.target);
                        const progress = targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
                        const progressColor = item.status === 'good' ? 'bg-emerald-500' : item.status === 'warning' ? 'bg-amber-500' : 'bg-red-500';

                        return (
                            <tr key={item.kpi} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-800">{item.kpi}</p>
                                    <p className="text-xs text-slate-500">{item.stage}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                                            <div className={`${progressColor} h-2.5 rounded-full`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                        </div>
                                        <div className="flex items-baseline gap-1.5 min-w-[100px]">
                                            <span className="text-sm font-extrabold text-slate-800">{item.value}</span>
                                            <span className="text-xs text-slate-500">/ {item.target}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">{getStatusIndicator(item.status)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export const RiskCard: React.FC<{ item: RiskItem }> = ({ item }) => {
    const levelClasses = {
        High: 'bg-red-100 text-red-800 border-red-500',
        Medium: 'bg-amber-100 text-amber-800 border-amber-500',
        Low: 'bg-slate-100 text-slate-800 border-slate-500',
    };
    const statusClasses = {
        'In Progress': 'bg-blue-100 text-blue-800',
        Implemented: 'bg-emerald-100 text-emerald-800',
        Planned: 'bg-slate-200 text-slate-800',
    };

    return (
        <Card className={`border-l-4 ${levelClasses[item.level]}`}>
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${levelClasses[item.level]}`}>{item.level} Risk</span>
            </div>
            <p className="my-2 text-slate-600"><strong>Risk:</strong> {item.risk}</p>
            <p className="my-2 text-slate-600"><strong>Mitigation:</strong> {item.mitigation}</p>
            <div className="mt-4 pt-4 border-t border-slate-200">
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${statusClasses[item.mitigationStatus]}`}>
                    Status: {item.mitigationStatus}
                </span>
            </div>
        </Card>
    );
};
export const RoadmapTimeline: React.FC<{ data: RoadmapPhase[] }> = ({ data }) => {
    const statusClasses = {
      Completed: { bg: 'bg-emerald-600', text: 'text-emerald-100' },
      'In Progress': { bg: 'bg-blue-600', text: 'text-blue-100' },
      Planned: { bg: 'bg-slate-400', text: 'text-slate-800' },
    };
    
    return (
        <div className="space-y-8 border-l-2 border-slate-200 ml-3">
            {data.map((phase, index) => {
                const currentStatus = statusClasses[phase.status];
                return (
                    <div key={index} className="pl-8 relative">
                        <div className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center ${currentStatus.bg}`}>
                            {phase.status === 'Completed' && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            {phase.status === 'In Progress' && <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>}
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${currentStatus.bg} ${currentStatus.text}`}>{phase.status}</span>
                        <h4 className="font-bold text-xl text-slate-800 mt-1">{phase.title}</h4>
                        <p className="text-slate-600 mt-2">{phase.description}</p>
                        {phase.keyFeatures && (
                            <div className="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <h5 className="font-bold text-sm text-slate-700 mb-2">Key Features:</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                    {phase.keyFeatures.map(f => <li key={f}>{f}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
export const FunnelVisualization: React.FC<{ data: any[] }> = ({ data }) => {
    const colors = [
        'from-slate-700 to-slate-800',
        'from-slate-600 to-slate-700',
        'from-slate-500 to-slate-600',
        'from-emerald-700 to-emerald-800',
        'from-emerald-600 to-emerald-700',
    ];

    return (
        <div className="space-y-1 mt-4">
            {data.map((item, index) => (
                <div key={item.stage} className="flex flex-col items-center">
                    <div
                        className={`w-full bg-gradient-to-r ${colors[index % colors.length]} text-white rounded-lg shadow-md transition-all duration-300`}
                        style={{ maxWidth: `${100 - index * 8}%` }}
                    >
                        <div className="p-3 sm:p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-sm sm:text-base">{item.stage}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-extrabold text-lg sm:text-xl">{item.weekly}</p>
                                <p className="text-xs text-white/80">Weekly</p>
                            </div>
                        </div>
                    </div>
                    {index < data.length - 1 && (
                        <div className="flex items-center my-2 text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                             <span className="ml-2 font-bold text-emerald-600 text-sm bg-emerald-100 px-2 py-0.5 rounded-full">{data[index + 1].conversion} conversion</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
export const RoleSwitcher: React.FC<{ activeRole: string; setActiveRole: (role: 'ceo' | 'cfo' | 'cxo' | 'cmo' | 'coo') => void; }> = ({ activeRole, setActiveRole }) => {
    const roles = [
        { id: 'ceo', name: 'CEO', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg> },
        { id: 'cfo', name: 'CFO', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 004 0V7.15a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.308a2.5 2.5 0 004 0V7.15a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.308a2.5 2.5 0 004 0V7.15a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.308a2.5 2.5 0 004 0V7.15a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v1.259a2.5 2.5 0 00-2.5-2.5h-1.353a2.5 2.5 0 00-2.287-1.299A2.5 2.5 0 0010 2.5H8.647a2.5 2.5 0 00-2.287 1.299H5a2.5 2.5 0 00-2.5 2.5v1.259a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5V7.15c0-1.1.9-2 2-2h1.433c.334-.44.86-.718 1.434-.718s1.1.278 1.433.718zM2 12.5a.5.5 0 01.5-.5h15a.5.5 0 010 1H2.5a.5.5 0 01-.5-.5zM2 15.5a.5.5 0 01.5-.5h15a.5.5 0 010 1H2.5a.5.5 0 01-.5-.5z" /></svg> },
        { id: 'cxo', name: 'CXO', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> },
        { id: 'cmo', name: 'CMO', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" /></svg> },
        { id: 'coo', name: 'COO', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg> },
    ];
    return (
        <div className="bg-slate-200 rounded-lg p-1 flex space-x-1">
            {roles.map(role => (
                 <button key={role.id} onClick={() => setActiveRole(role.id as any)} className={`w-full flex justify-center items-center gap-2 text-sm font-bold py-2 px-3 rounded-md transition-all duration-300 ${activeRole === role.id ? 'bg-white text-slate-800 shadow-md' : 'bg-transparent text-slate-500 hover:text-slate-800'}`}>
                    {role.icon}
                    <span className="hidden sm:inline">{role.name}</span>
                 </button>
            ))}
        </div>
    );
};


export const StrategyView: React.FC<{ title: string; description: string; data: StrategyItem[] }> = ({ title, description, data }) => {
    const statusClasses = { 'In Progress': 'bg-blue-100 text-blue-800', Completed: 'bg-emerald-100 text-emerald-800', Planned: 'bg-slate-200 text-slate-800' };

    return (
        <div className="mt-6">
            <SectionTitle>{title}</SectionTitle>
            <p className="text-slate-600 mb-6 -mt-4">{description}</p>
            <div className="space-y-8">
                {data.map(area => (
                    <Card key={area.area}>
                        <SubTitle>{area.area}</SubTitle>
                        <p className="text-slate-600 -mt-2 mb-6">{area.objective}</p>
                        <div className="space-y-4">
                            {area.initiatives.map(initiative => (
                                <div key={initiative.name} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex justify-between items-start">
                                        <h5 className="font-bold text-md text-slate-800">{initiative.name}</h5>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusClasses[initiative.status]}`}>{initiative.status}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">{initiative.details}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export const RisksView: React.FC<{ title: string; description: string; data: RiskItem[] }> = ({ title, description, data }) => (
    <div className="mt-6">
        <SectionTitle>{title}</SectionTitle>
        <p className="text-slate-600 mb-6 -mt-4">{description}</p>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {data.map(item => <RiskCard key={item.title} item={item} />)}
        </div>
    </div>
);
