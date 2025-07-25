
import React from 'react';
import { pnlData, financialMetricsData, unitEconomicsData, cashbackFinancialsData } from '../../constants';
import type { PnLLineItem, FinancialMetric, UnitEconomics, CashbackData } from '../../types';
import { SubTitle, Card, DataConsistencyChecker } from './SharedComponents';

const FinancialStatCard: React.FC<FinancialMetric> = ({ metric, value, note, status }) => {
    const statusClasses = { good: 'border-emerald-500', warning: 'border-amber-500', danger: 'border-red-500' };
    return (<div className={`bg-white p-4 rounded-lg border-l-4 ${statusClasses[status]}`}>
        <p className="text-sm font-medium text-slate-500">{metric}</p>
        <p className="text-2xl font-extrabold text-slate-800 mt-1">{value}</p>
        {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}
    </div>);
};

const PnlTable: React.FC<{ data: PnLLineItem[] }> = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full"><tbody className="divide-y divide-slate-200">
            {data.map(({ item, amount, isSubItem, isTotal }) => {
                const isProfit = item.toLowerCase().includes('profit'); const isLoss = amount < 0 && !isSubItem;
                return (<tr key={item} className={`hover:bg-slate-50/50 ${isTotal ? 'bg-slate-50' : ''}`}>
                    <td className={`p-2 font-semibold ${isSubItem ? 'pl-8 text-sm text-slate-600 font-medium' : 'text-slate-700'} ${isTotal ? 'text-slate-800 font-bold' : ''}`}>{item}</td>
                    <td className={`p-2 text-right font-mono text-sm ${isTotal && isProfit ? 'font-extrabold text-emerald-700' : ''} ${isTotal && isLoss ? 'font-extrabold text-red-700' : 'text-slate-800'}`}>{amount < 0 && !isTotal ? `(${Math.abs(amount).toLocaleString('en-IN')})` : amount.toLocaleString('en-IN')}</td>
                </tr>);
            })}
        </tbody></table>
    </div>
);
const PnlChart: React.FC<{data: PnLLineItem[]}> = ({data}) => {
    const revenue = data.find(d => d.category === 'Revenue Total')?.amount || 0;
    const cogs = Math.abs(data.find(d => d.category === 'COGS Total')?.amount || 0);
    const opex = Math.abs(data.find(d => d.category === 'Operating Expenses Total')?.amount || 0);
    const netProfit = data.find(d => d.category === 'Net Profit')?.amount || 0;
    const grossProfit = data.find(d => d.category === 'Gross Profit')?.amount || 0;
    const maxVal = revenue;
    const chartData = [
      { label: 'Revenue', value: revenue, color: 'bg-emerald-500' }, { label: 'COGS', value: cogs, color: 'bg-amber-400' },
      { label: 'Operating Exp.', value: opex, color: 'bg-orange-400' }, { label: 'Gross Profit', value: grossProfit, color: 'bg-emerald-700' },
      { label: 'Net Profit', value: netProfit, color: netProfit >= 0 ? 'bg-emerald-800' : 'bg-red-500' },
    ];
    return (<div className="space-y-4"> {chartData.map(d => (
        <div key={d.label}>
            <div className="flex justify-between items-baseline mb-1"><span className="text-sm font-bold text-slate-700">{d.label}</span><span className="text-sm font-mono font-semibold text-slate-800">₹{d.value.toLocaleString('en-IN')}</span></div>
            <div className="w-full bg-slate-200 rounded-full h-4"><div className={`${d.color} h-4 rounded-full`} style={{ width: `${(Math.abs(d.value) / maxVal) * 100}%`}}></div></div>
        </div>
    ))}</div>);
}
const FinancialAssumptions: React.FC = () => (
    <div className="mt-8 pt-6 border-t border-slate-200">
        <h4 className="font-bold text-slate-800 mb-2">Key Drivers & Assumptions</h4>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li><strong>LTV Calculation:</strong> (Course Fee + (Visa Success Rate * Avg. Counselling Fee)).</li>
            <li><strong>CAC Calculation:</strong> (Total Marketing Spend + Counsellor Salaries) / New Students.</li>
            <li><strong>Cashback Expense:</strong> Factored into OpEx based on a 22% projected completion rate.</li>
        </ul>
    </div>
);
const UnitEconomicsCard: React.FC<{data: UnitEconomics}> = ({data}) => (
    <div className="flex flex-col sm:flex-row gap-8 items-center">
        <div className="text-center">
            <p className="text-4xl font-extrabold text-emerald-600">{data.ratio}:1</p>
            <p className="font-bold text-slate-600">LTV:CAC Ratio</p>
        </div>
        <div className="flex-1 space-y-2">
            <p><strong>LTV (Lifetime Value):</strong> ₹{data.ltv.toLocaleString('en-IN')}</p>
            <p><strong>CAC (Customer Acquisition Cost):</strong> ₹{data.cac.toLocaleString('en-IN')}</p>
            <p className="text-sm text-slate-500 italic">{data.note}</p>
        </div>
    </div>
);
const CashbackCard: React.FC<{data: CashbackData[]}> = ({data}) => (
    <div className="space-y-3">
        {data.map(item => (
            <div key={item.title}>
                <p className="font-bold text-slate-800">{item.title}</p>
                <p className="text-2xl font-bold text-amber-700">{item.value}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
            </div>
        ))}
    </div>
);


const CfoDashboard = () => (
    <div className="mt-6 space-y-8">
        <DataConsistencyChecker />
        <Card>
            <SubTitle>Financial Health Overview</SubTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {financialMetricsData.map(item => <FinancialStatCard key={item.metric} {...item} />)}
            </div>
        </Card>
        <Card>
            <SubTitle>Profit & Loss Statement (Monthly)</SubTitle>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3"><PnlTable data={pnlData} /></div>
                <div className="lg:col-span-2"><PnlChart data={pnlData} /><FinancialAssumptions /></div>
            </div>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card><SubTitle>Unit Economics</SubTitle><UnitEconomicsCard data={unitEconomicsData} /></Card>
            </div>
            <div className="lg:col-span-1">
                 <Card><SubTitle>Cashback Model Health</SubTitle><CashbackCard data={cashbackFinancialsData} /></Card>
            </div>
        </div>
    </div>
);

export default CfoDashboard;
