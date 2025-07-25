
import React, { useState } from 'react';
import { kpiData, riskData, roadmapData, funnelConversionData, postCompletionFunnelData, strategicFunnelData, strategicPostCompletionFunnelData } from '../../constants';
import type { KpiItem, RiskItem, RoadmapPhase } from '../../types';
import { SectionTitle, SubTitle, Card, TabButton, FunnelTable, StatCard, StrategicFunnelTable, KpiTableWithProgress, RiskCard, RoadmapTimeline, FunnelVisualization, DataConsistencyChecker } from './SharedComponents';

// --- CEO Dashboard & Components ---
const CeoMainDashboard: React.FC<{kpiData: KpiItem[], funnelConversionData: any[]}> = ({kpiData, funnelConversionData}) => (
    <div className="space-y-8 mt-6">
        <Card>
            <SubTitle>Executive Summary</SubTitle>
            <ul className="space-y-3 text-slate-700">
                <li className="flex items-start"><span className="text-emerald-500 mr-3 mt-1">▲</span><div><strong>What's Working:</strong> Lead generation and test attempt rates are strong, exceeding targets. Trainer NPS is exceptionally high at 94, indicating excellent service delivery.</div></li>
                <li className="flex items-start"><span className="text-red-500 mr-3 mt-1">▼</span><div><strong>What Needs Attention:</strong> Module progression rate is at 8% against a 10% target. This is the key lever to pull for improving the counselling funnel throughput.</div></li>
                <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">●</span><div><strong>This Week's Focus:</strong> Launching A/B tests on post-module completion CTAs to improve progression. Finalizing CRM integration specs for Phase 2 of the roadmap.</div></li>
            </ul>
        </Card>
        <Card>
            <SubTitle>Customer Acquisition Funnel</SubTitle>
            <FunnelVisualization data={funnelConversionData} />
        </Card>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {kpiData.slice(0, 4).map(kpi => <StatCard key={kpi.kpi} title={kpi.kpi} value={kpi.value} target={kpi.target} status={kpi.status} />)}
        </div>
        <Card>
            <SubTitle>⭐ Key Performance Indicators</SubTitle>
            <KpiTableWithProgress data={kpiData} />
        </Card>
    </div>
);
const CeoStrategyDashboard = () => (
    <div className="mt-6">
        <SectionTitle>💡 Strategic Foundation</SectionTitle>
        <SubTitle>Competitive Landscape &amp; Positioning</SubTitle>
        <Card className="bg-slate-50">
            <p className="text-slate-600 mb-4">Our strategy is built on understanding the market's positioning gaps.</p>
            <h4 className="font-bold text-lg text-slate-800 mt-4 mb-2">Competitor Model Analysis</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li><strong>High-Cost, High-Touch (e.g., Local Centers):</strong> Premium price, rigid schedules. Weakness: scalability and flexibility.</li>
                <li><strong>Low-Cost, Low-Touch (e.g., Magoosh):</strong> Affordable, self-paced. Weakness: student engagement and completion rates.</li>
            </ul>
            <h4 className="font-bold text-lg text-slate-800 mt-4 mb-2">Our Strategic Position: The Performance Partner</h4>
            <p className="text-slate-700">We position Shiksha as a <strong className="font-bold">'success system'</strong>. Our USP is our philosophy: <strong className="bg-emerald-100 text-emerald-900 px-1 rounded">"We de-risk IELTS prep by aligning our success with yours."</strong></p>
        </Card>
        <SubTitle>Target Customer Personas</SubTitle>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
                <h4 className="font-bold text-lg text-emerald-700">Ambitious Ananya (22)</h4>
                <p className="text-sm font-semibold text-slate-500 mb-2">Recent Graduate</p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                    <li><strong>Goal:</strong> Master's in the US.</li>
                    <li><strong>Motivation:</strong> Responds to gamification & goals.</li>
                    <li><strong>Appeal:</strong> Cashback Challenge is a perfect motivator; study abroad counseling is a major value-add.</li>
                </ul>
            </Card>
            <Card>
                <h4 className="font-bold text-lg text-emerald-700">Working Vikram (29)</h4>
                <p className="text-sm font-semibold text-slate-500 mb-2">IT Professional</p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                    <li><strong>Goal:</strong> Canadian PR.</li>
                    <li><strong>Motivation:</strong> Time-poor, values efficiency.</li>
                    <li><strong>Appeal:</strong> 9+ daily live slots are the killer feature. Sees ₹2,999 as a smart investment.</li>
                </ul>
            </Card>
            <Card>
                <h4 className="font-bold text-lg text-emerald-700">Second-Attempt Sameer (24)</h4>
                <p className="text-sm font-semibold text-slate-500 mb-2">Re-taker</p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                    <li><strong>Goal:</strong> Improve score by 0.5-1.0 bands.</li>
                    <li><strong>Motivation:</strong> Frustrated, price-conscious.</li>
                    <li><strong>Appeal:</strong> Assessed mock tests with feedback are his solution. 'Earn it' model feels fair.</li>
                </ul>
            </Card>
        </div>
            <SubTitle>Brand Voice &amp; Tone</SubTitle>
        <Card className="bg-slate-50">
            <h4 className="font-bold text-lg text-slate-800 mb-2">Our Personality: The Motivational Coach</h4>
            <p className="text-slate-700">Encouraging, straightforward, and transparent. We build confidence by celebrating student effort.</p>
        </Card>

        <SectionTitle>🎯 Funnel Strategy & Action Plan</SectionTitle>
        <SubTitle>IELTS Funnel Strategy</SubTitle>
        <p className="text-slate-600 mb-4 -mt-2">An actionable breakdown of each funnel stage, identifying issues and our plan to address them.</p>
        <StrategicFunnelTable data={strategicFunnelData} />

        <SubTitle>Post-Completion Funnel Strategy</SubTitle>
        <p className="text-slate-600 mb-4 -mt-2">Strategies to improve conversion from course completion to visa application.</p>
        <StrategicFunnelTable data={strategicPostCompletionFunnelData} />
    </div>
);
const CeoFunnelDashboard: React.FC<{funnelConversionData: any[], postCompletionFunnelData: any[]}> = ({funnelConversionData, postCompletionFunnelData}) => (
    <div className="mt-6">
        <SectionTitle>Funnel & KPIs</SectionTitle>
        <SubTitle>IELTS Funnel Conversion Overview</SubTitle>
        <FunnelTable data={funnelConversionData} headers={['Funnel Stage', 'Conversion %', 'Weekly Volume', 'Monthly Volume', 'Notes']} />
        <SubTitle>Post-Completion Counselling Funnel</SubTitle>
        <FunnelTable data={postCompletionFunnelData} headers={['Sub-Stage', 'Conversion %', 'Weekly', 'Monthly', 'Notes']} />
    </div>
);
const CeoRisksDashboard = () => (
    <div className="mt-6">
        <SectionTitle>⚠️ Risk Assessment &amp; Mitigation</SectionTitle>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {riskData.map(item => <RiskCard key={item.title} item={item} />)}
        </div>
    </div>
);
const CeoRoadmapDashboard = () => (
    <div className="mt-6">
        <SectionTitle>🚀 Technology &amp; Product Roadmap</SectionTitle>
        <Card>
            <RoadmapTimeline data={roadmapData} />
        </Card>
    </div>
);

const CeoDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', title: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
        { id: 'strategy', title: 'Strategy', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg> },
        { id: 'funnel', title: 'Funnel & KPIs', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 3a1 1 0 000 2v8a1 1 0 001 1h1.586l.707.707A1 1 0 007 15v2a1 1 0 001 1h4a1 1 0 001-1v-2a1 1 0 00-.293-.707L13.414 14H15a1 1 0 001-1V5a1 1 0 000-2H3z" /></svg> },
        { id: 'risks', title: 'Risks', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg> },
        { id: 'roadmap', title: 'Roadmap', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg> },
    ];
    
    const renderCeoContent = () => {
        switch (activeTab) {
            case 'dashboard': return <CeoMainDashboard kpiData={kpiData} funnelConversionData={funnelConversionData} />;
            case 'strategy': return <CeoStrategyDashboard />;
            case 'funnel': return <CeoFunnelDashboard funnelConversionData={funnelConversionData} postCompletionFunnelData={postCompletionFunnelData} />;
            case 'risks': return <CeoRisksDashboard />;
            case 'roadmap': return <CeoRoadmapDashboard />;
            default: return null;
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
            <div>{renderCeoContent()}</div>
        </>
    );
};

export default CeoDashboard;
