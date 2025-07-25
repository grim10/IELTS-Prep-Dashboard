import React from 'react';
import { bundleFeatures } from '../constants';

const CourseBundle: React.FC<{ onStartTest: () => void; }> = ({ onStartTest }) => {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-slate-900">The 'More Than a Course' Bundle</h2>
        <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">When you enroll, you’re not just getting video lessons. You’re unlocking a complete success ecosystem.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundleFeatures.map((feature, index) => (
            <div key={index} className={`bg-slate-50 p-8 rounded-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col ${feature.tag === 'Your Final Step' ? 'ring-2 ring-emerald-500' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-full">
                    {feature.icon}
                  </div>
                  {feature.tag && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${feature.tag === 'Your Final Step' ? 'bg-amber-300 text-amber-900' : 'bg-slate-200 text-slate-800'}`}>{feature.tag}</span>
                  )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Unlock This Entire Ecosystem?</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">Your journey to a high IELTS score and your dream university starts with one simple step.</p>
            <button onClick={onStartTest} className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105">
                Take the First Step
            </button>
        </div>
      </div>
    </section>
  );
};

export default CourseBundle;