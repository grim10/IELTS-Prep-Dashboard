
import React from 'react';
import { comparisonData, competitors } from '../constants';

const ComparisonTable: React.FC<{ onStartTest: () => void; }> = ({ onStartTest }) => {
    
  const renderValue = (value: string | boolean, feature: string) => {
    if (value === true) {
      return <span className="text-emerald-500 text-2xl font-semibold">✓</span>;
    }
    if (value === false || value === '') {
      return <span className="text-slate-400 text-xl">—</span>;
    }
    if (feature === 'Price') {
        return <span className="text-amber-700 text-sm font-bold">{value}</span>
    }
    return <span className="text-slate-800 text-sm font-medium">{value}</span>;
  };

  return (
    <section id="comparison" className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          The Chart That Ends All Arguments.
        </h2>
        <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">We’re not afraid to show our work. See for yourself why our bundle offers unmatched value. The data doesn't lie.</p>
        
        <div className="w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5">
            <div className="overflow-x-auto table-scrollbar">
                <table className="w-full min-w-[1200px]">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th scope="col" className="py-4 px-6 text-left text-sm font-semibold w-1/4 sticky left-0 bg-slate-800 z-10">Features</th>
                            <th scope="col" className="py-4 px-6 text-center text-sm font-bold bg-slate-700 relative">
                                Shiksha
                                <span className="absolute -top-4 -right-4 bg-amber-400 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full transform rotate-12 shadow-lg">BEST VALUE</span>
                            </th>
                            {competitors.map(c => (
                                <th key={c.id} scope="col" className="py-4 px-6 text-center text-sm font-semibold">{c.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {comparisonData.map((row, rowIndex) => (
                            <tr key={row.feature} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                <td className="py-4 px-6 text-sm font-medium text-slate-800 w-1/4 sticky left-0 z-10" style={{backgroundColor: rowIndex % 2 === 0 ? 'white' : '#F8FAFC'}}>{row.feature}</td>
                                <td className="py-4 px-6 text-center whitespace-nowrap bg-slate-100/50">{renderValue(row.shiksha, row.feature)}</td>
                                {competitors.map(c => (
                                    <td key={c.id} className="py-4 px-6 text-center whitespace-nowrap">{renderValue(row[c.id], row.feature)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-slate-800">The Data is Clear. The Value is Unmatched.</h3>
            <p className="text-lg text-slate-600 mt-2 mb-6">Make the smart choice for your future.</p>
            <button onClick={onStartTest} className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 animate-pulse-subtle">
                Get Started with the Best Deal
            </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;