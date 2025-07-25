
import React, { useState } from 'react';

import { RoleSwitcher } from './dashboards/SharedComponents';
import CeoDashboard from './dashboards/CeoDashboard';
import CfoDashboard from './dashboards/CfoDashboard';
import CxoDashboard from './dashboards/CxoDashboard';
import CmoDashboard from './dashboards/CmoDashboard';
import CooDashboard from './dashboards/CooDashboard';


// --- Main Business Plan Component ---
const BusinessPlan: React.FC<{ navigateTo: (view: 'home' | 'plan') => void; }> = ({ navigateTo }) => {
    const [activeRole, setActiveRole] = useState<'ceo' | 'cfo' | 'cxo' | 'cmo' | 'coo'>('ceo');

    const renderDashboard = () => {
        switch (activeRole) {
            case 'cfo': return <CfoDashboard />;
            case 'cxo': return <CxoDashboard />;
            case 'cmo': return <CmoDashboard />;
            case 'coo': return <CooDashboard />;
            default: return <CeoDashboard />;
        }
    };
    
    const roleTitles: {[key: string]: string} = {
        ceo: "Chief Executive Officer View",
        cfo: "Chief Financial Officer View",
        cxo: "Chief Experience Officer View",
        cmo: "Chief Marketing Officer View",
        coo: "Chief Operating Officer View",
    }

    return (
        <div className="bg-slate-100 font-sans min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">C-Suite Dashboard</h1>
                            <p className="text-slate-500 mt-1 font-semibold">{roleTitles[activeRole]}</p>
                        </div>
                        <RoleSwitcher activeRole={activeRole} setActiveRole={setActiveRole} />
                    </div>
                    
                    {renderDashboard()}

                    <button onClick={() => navigateTo('home')} className="mt-8 bg-white text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-100 transition duration-300 flex items-center gap-2 border border-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Back to Main Site
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessPlan;
