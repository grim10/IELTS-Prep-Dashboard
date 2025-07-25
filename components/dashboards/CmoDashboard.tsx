
import React, { useState } from 'react';
import { cmoMetricsData, channelPerformanceData, cmoInitiativesData, cmoStrategyData, cmoRiskData } from '../../constants';
import type { CmoMetric, ChannelPerformance, CmoInitiative } from '../../types';
import { SubTitle, Card, StatCard, DataConsistencyChecker, TabButton, StrategyView, RisksView } from './SharedComponents';

const CmoInitiativesTable: React.FC<{data: CmoInitiative[]}> = ({data}) => (
    <div className="overflow-x-auto">
        <table className="min-w-full"><thead className="bg-slate-50">
            <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/3">Initiative</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/2">Rationale ("The Why")</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Impacts</th>
            </tr>
        </thead><tbody className="bg-white divide-y divide-slate-200">
            {data.map(item => {
                const statusClasses = { Live: 'bg-emerald-100 text-emerald-800', 'In Progress': 'bg-blue-100 text-blue-800', Planned: 'bg-slate-200 text-slate-800' };
                return (
                <tr key={item.initiative} className="hover:bg-slate-50/50">
                    <td className="px-4 py-4 whitespace-nowrap font-bold text-slate-700">{item.initiative}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{item.rationale}</td>
                    <td className="px-4 py-4 whitespace-nowrap"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[item.status]}`}>{item.status}</span></td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-600">{item.impacts}</td>
                </tr>
            )})}
        </tbody></table>
    </div>
);
const ChannelPerformanceTable: React.FC<{data: ChannelPerformance[]}> = ({data}) => (
    <div className="overflow-x-auto">
        <table className="min-w-full"><thead className="bg-slate-50">
            <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Channel</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Leads</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">CPL</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Conv. Rate</th>
            </tr>
        </thead><tbody className="bg-white divide-y divide-slate-200">
            {data.map(item => (
                <tr key={item.channel} className="hover:bg-slate-50/50">
                    <td className="px-4 py-4 whitespace-nowrap"><div className="flex items-center gap-3"><div className={`p-2 rounded-full bg-slate-100`}>{item.icon}</div><span className="font-bold text-slate-700">{item.channel}</span></div></td>
                    <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-slate-800">{item.leads.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-slate-600">₹{item.cpl.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-slate-600">{item.conversionRate}%</td>
                </tr>
            ))}
        </tbody></table>
    </div>
);
const DoughnutChart: React.FC<{ data: ChannelPerformance[] }> = ({ data }) => {
    const totalLeads = data.reduce((acc, item) => acc + item.leads, 0);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className="flex flex-col items-center">
            <svg viewBox="0 0 160 160" className="w-48 h-48 -rotate-90">
                {data.map(item => {
                    const percentage = (item.leads / totalLeads) * 100;
                    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                    const currentOffset = offset;
                    offset -= (percentage / 100) * circumference;
                    return (
                        <circle key={item.channel} r={radius} cx="80" cy="80" fill="transparent" stroke={item.color} strokeWidth="20"
                            strokeDasharray={strokeDasharray} strokeDashoffset={currentOffset}
                        />
                    );
                })}
                 <text x="80" y="85" className="rotate-90 origin-center text-center font-extrabold text-3xl fill-slate-800">{totalLeads.toLocaleString('en-IN')}</text>
                 <text x="80" y="105" className="rotate-90 origin-center text-center font-semibold text-sm fill-slate-500">Total Leads</text>
            </svg>
            <div className="mt-4 w-full space-y-2">
                {data.map(item => (
                    <div key={item.channel} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></span><span className="font-semibold text-slate-700">{item.channel}</span></div>
                        <span className="font-mono font-medium text-slate-600">{((item.leads / totalLeads) * 100).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CmoMainDashboard: React.FC = () => (
    <div className="mt-6 space-y-8">
        <Card>
            <SubTitle>Marketing Performance Overview</SubTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cmoMetricsData.map(item => <StatCard key={item.metric} title={item.metric} value={item.value} note={item.note} trend={item.trend} />)}
            </div>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <SubTitle>Channel Performance</SubTitle>
                    <ChannelPerformanceTable data={channelPerformanceData} />
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <SubTitle>Lead Source Mix</SubTitle>
                    <DoughnutChart data={channelPerformanceData} />
                </Card>
            </div>
        </div>
        <Card>
            <SubTitle>Key Marketing Initiatives</SubTitle>
            <p className="text-slate-600 mb-4 -mt-2">Connecting our marketing actions to business outcomes.</p>
            <CmoInitiativesTable data={cmoInitiativesData} />
        </Card>
    </div>
);

const CmoDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const tabs = [
        { id: 'dashboard', title: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
        { id: 'strategy', title: 'Strategy', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg> },
        { id: 'risks', title: 'Risks', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg> },
    ];

    const renderCmoContent = () => {
        switch (activeTab) {
            case 'strategy': return <StrategyView title="📣 Marketing Strategy" description="Initiatives to boost brand presence, optimize lead funnels, and drive growth." data={cmoStrategyData} />;
            case 'risks': return <RisksView title="📉 Marketing Risks" description="Identifying and mitigating potential threats to our marketing performance and budget." data={cmoRiskData} />;
            default: return <CmoMainDashboard />;
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
            <div>{renderCmoContent()}</div>
        </div>
    );
};

export default CmoDashboard;
