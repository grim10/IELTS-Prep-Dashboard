
import React, { useState } from 'react';
import { cxMetricsData, customerFeedbackData, cxJourneyMapData, sentimentAnalysisSummaryData, cxoStrategyData, cxoRiskData } from '../../constants';
import type { CxMetric, CustomerFeedback, CxJourneyStage, CxInitiative, SentimentAnalysisSummary, SentimentRequest } from '../../types';
import { SubTitle, Card, DataConsistencyChecker, TabButton, StrategyView, RisksView } from './SharedComponents';

const QualitativeFeedbackTabs: React.FC<{data: SentimentAnalysisSummary}> = ({data}) => {
    const [activeTab, setActiveTab] = useState('positive');

    const statusClasses = { Delivered: 'bg-emerald-100 text-emerald-800', Planning: 'bg-blue-100 text-blue-800' };

    const tabs = [
        { id: 'positive', title: data.positive.title, icon: data.positive.icon },
        { id: 'negative', title: data.negative.title, icon: data.negative.icon },
        { id: 'requests', title: data.requests.title, icon: data.requests.icon },
        { id: 'issue', title: data.issue.title, icon: data.issue.icon, alert: true },
    ]

    const renderContent = () => {
        switch(activeTab) {
            case 'positive':
                return (
                    <div className="text-sm space-y-3">
                        <p className="text-slate-500 italic">Examples: {data.positive.examples.join(', ')}</p>
                        <p className="font-semibold text-slate-700">Common themes:</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                            {data.positive.themes.map(theme => <li key={theme}>{theme}</li>)}
                        </ul>
                    </div>
                );
            case 'negative':
                 return (
                    <div className="text-sm space-y-3">
                        <p className="text-slate-500 italic">Examples: {data.negative.examples.join(', ')}</p>
                        <p className="font-semibold text-slate-700">Recurring complaints:</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                            {data.negative.themes.map(theme => <li key={theme}>{theme}</li>)}
                        </ul>
                    </div>
                );
            case 'requests':
                return (
                     <ul className="space-y-2">
                        {data.requests.themes.map((request: SentimentRequest) => ( // Cast to SentimentRequest
                            <li key={request.theme} className="flex justify-between items-center text-sm text-slate-700 p-2 bg-slate-100 rounded-md">
                                <span>{request.theme}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusClasses[request.status]}`}>{request.status}</span>
                            </li>
                        ))}
                    </ul>
                );
            case 'issue':
                return (
                     <div className="text-sm space-y-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <p className="text-red-700 mb-2">{data.issue.summary}</p>
                        <ul className="list-disc list-inside space-y-1 text-red-700 pl-2">
                            {data.issue.themes.map(theme => <li key={theme}>{theme}</li>)}
                        </ul>
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="mt-6">
            <div className="flex border-b border-slate-200 mb-4 overflow-x-auto">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-shrink-0 flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-colors duration-200 ${
                        activeTab === tab.id 
                        ? (tab.alert ? 'border-red-500 text-red-600' : 'border-emerald-500 text-emerald-600')
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}>
                        <span>{tab.icon}</span>
                        <span>{tab.title}</span>
                    </button>
                ))}
            </div>
            {renderContent()}
        </div>
    )
}

export const SentimentAnalysisCard: React.FC<{ data: SentimentAnalysisSummary }> = ({ data }) => {
    return (
        <Card>
            <SubTitle>✅ Learner Sentiment Analysis</SubTitle>
            <p className="text-slate-600 mb-6 -mt-2">Summary from {data.totalResponses.toLocaleString('en-IN')}+ Learner Feedback Entries</p>
            
            <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 mb-2">🧠 Sentiment Breakdown</h4>
                {data.breakdown.map(item => (
                    <div key={item.sentiment}>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-sm font-semibold text-slate-700">{item.sentiment}</span>
                            <span className="text-sm font-medium text-slate-500">{item.count.toLocaleString('en-IN')} ({item.percentage})</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                            <div className={`${item.color} h-3 rounded-full`} style={{ width: item.percentage.replace('~','').replace('%','') + '%' }}></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <QualitativeFeedbackTabs data={data} />
        </Card>
    );
};

export const CustomerJourneyMap: React.FC<{ data: CxJourneyStage[] }> = ({ data }) => {
    const statusClasses = { good: { border: 'border-emerald-500', bg: 'bg-emerald-50', icon: '😊' }, warning: { border: 'border-amber-500', bg: 'bg-amber-50', icon: '🤔' }, danger: { border: 'border-red-500', bg: 'bg-red-50', icon: '😠' } };
    const initiativeStatusClasses = { Live: 'bg-emerald-100 text-emerald-800', 'In Progress': 'bg-blue-100 text-blue-800', Planned: 'bg-slate-200 text-slate-800' };

    return (
        <div className="relative">
            <div className="flex overflow-x-auto space-x-8 pb-4">
                {data.map((item, index) => {
                    const currentStatus = statusClasses[item.status];
                    return (
                        <div key={item.stage} className="flex items-center">
                            <div className={`flex-shrink-0 w-80 p-6 rounded-2xl border-t-8 ${currentStatus.border} ${currentStatus.bg} shadow-lg h-full flex flex-col`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-800">{item.stage}</h4>
                                        <p className="text-sm font-semibold text-slate-500">{item.emotion}</p>
                                    </div>
                                    <span className="text-3xl ml-4">{currentStatus.icon}</span>
                                </div>
                                <p className="text-xs text-slate-600 mt-2 font-medium italic">"{item.actions}"</p>
                                
                                <div className="mt-4 pt-4 border-t border-slate-300/60 flex-grow">
                                    <h5 className="font-bold text-sm text-red-700 mb-2">Friction Points</h5>
                                    <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside mb-4">{item.frictionPoints.map(p => <li key={p}>{p}</li>)}</ul>
                                    
                                    <h5 className="font-bold text-sm text-emerald-700 mb-2">Delight Opportunities</h5>
                                    <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">{item.delightOpportunities.map(p => <li key={p}>{p}</li>)}</ul>
                                </div>
                                
                                {item.initiatives.length > 0 && (
                                <div className="mt-auto pt-4 border-t border-slate-300/60">
                                    <h5 className="font-bold text-sm text-slate-700 mb-2">Related Initiatives</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {item.initiatives.map(i => (
                                            <span key={i.initiative} className={`text-xs font-bold px-2 py-1 rounded-full ${initiativeStatusClasses[i.status]}`}>{i.initiative}</span>
                                        ))}
                                    </div>
                                </div>
                                )}
                            </div>
                            
                            {index < data.length - 1 && (
                                <div className="px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
const CxStatCard: React.FC<CxMetric> = ({ metric, value, target, trend }) => {
    const trendIcons = { up: <span className="text-emerald-500">▲</span>, down: <span className="text-red-500">▼</span>, stable: <span className="text-slate-500">–</span> };
    return (<div className="bg-white p-4 rounded-lg border border-slate-200">
        <p className="text-sm font-medium text-slate-500">{metric}</p>
        <div className="flex items-baseline gap-2 mt-1"><p className="text-3xl font-extrabold text-slate-800">{value}</p>{trendIcons[trend]}</div>
        <p className="text-xs text-slate-500 mt-1">Target: {target}</p>
    </div>);
};
const FeedbackCard: React.FC<CustomerFeedback> = ({ type, quote, persona }) => {
    const isPraise = type === 'Praise';
    return (<div className={`p-4 rounded-lg border-l-4 ${isPraise ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'}`}>
        <p className={`text-sm font-bold ${isPraise ? 'text-emerald-800' : 'text-red-800'}`}>{type} from "{persona}"</p>
        <blockquote className="mt-1 italic text-slate-700">"{quote}"</blockquote>
    </div>);
};

const CxoMainDashboard = () => (
    <div className="mt-6 space-y-8">
        <Card>
            <SubTitle>Customer Experience Health</SubTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cxMetricsData.map(item => <CxStatCard key={item.metric} {...item} />)}
            </div>
        </Card>

        <SentimentAnalysisCard data={sentimentAnalysisSummaryData} />

        <Card>
            <SubTitle>Visual Customer Journey Map</SubTitle>
            <p className="text-slate-600 mb-6 -mt-2">Tracking the customer's lifecycle to identify friction and create delight. Status indicators highlight areas needing attention.</p>
            <CustomerJourneyMap data={cxJourneyMapData} />
        </Card>
        
        <Card>
            <SubTitle>Voice of the Customer (Qualitative Feedback)</SubTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customerFeedbackData.map((fb, index) => <FeedbackCard key={index} {...fb} />)}
            </div>
        </Card>
    </div>
);


const CxoDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const tabs = [
        { id: 'dashboard', title: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
        { id: 'strategy', title: 'Strategy', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg> },
        { id: 'risks', title: 'Risks', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg> },
    ];

    const renderCxoContent = () => {
        switch (activeTab) {
            case 'strategy': return <StrategyView title="❤️ Experience Strategy" description="Initiatives to improve student satisfaction, retention, and turn feedback into action." data={cxoStrategyData} />;
            case 'risks': return <RisksView title="💔 Experience Risks" description="Identifying and mitigating potential issues that could harm student satisfaction or retention." data={cxoRiskData} />;
            default: return <CxoMainDashboard />;
        }
    };

    return (
        <div className="mt-6 space-y-8">
             <div className="border-b border-slate-200 mb-6">
                <div className="flex space-x-1 sm:space-x-2 flex-wrap">
                    {tabs.map(tab => <TabButton key={tab.id} title={tab.title} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} icon={tab.icon}/>)}
                </div>
            </div>
            <DataConsistencyChecker />
            <div>{renderCxoContent()}</div>
        </div>
    );
};

export default CxoDashboard;