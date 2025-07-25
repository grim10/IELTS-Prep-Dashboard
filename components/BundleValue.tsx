

import React, { useState, useEffect } from 'react';
import { bundleValueData, additionalServicesData } from '../constants';

const BundleValue = () => {
    const totalValue = bundleValueData.reduce((sum, item) => {
        const numericValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10);
        return sum + numericValue;
    }, 0);

    const [animatedTotal, setAnimatedTotal] = useState(0);

    useEffect(() => {
        const duration = 1500;
        let start = 0;
        const end = totalValue;
        if (start === end) return;

        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const nextValue = Math.floor(progress * end);
            setAnimatedTotal(nextValue);
            if (progress < 1) {
                window.requestAnimationFrame(animate);
            } else {
                 setAnimatedTotal(totalValue);
            }
        };
        const animationFrameId = window.requestAnimationFrame(animate);

        return () => window.cancelAnimationFrame(animationFrameId);
    }, [totalValue]);

    const savings = totalValue - 2999;

    return (
        <section id="bundle-value" className="py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        What's Inside Your IELTS Bundle?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        We've packed our bundle with everything you need to succeed. See the incredible value you get for a fraction of the cost.
                    </p>
                </div>

                <div className="lg:hidden text-center text-sm text-slate-500 mb-4">
                    &larr; Swipe to see all features &rarr;
                </div>
                <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-8 mb-16 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                    {bundleValueData.map((item, index) => (
                        <div key={index} className="relative flex-shrink-0 w-4/5 sm:w-2/3 md:w-1/2 lg:w-auto snap-center bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col text-center items-center shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                            <span className="absolute top-4 left-4 text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold">Included</span>
                            <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-125 cursor-default">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                            <p className="text-sm text-slate-600 mt-2 flex-grow">{item.description}</p>
                            <div className="mt-4 pt-4 border-t border-slate-200 w-full">
                                <span className="text-xs text-slate-500 font-semibold">Worth</span>
                                <p className="text-2xl font-extrabold text-amber-600">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                            <span className="text-emerald-600">+</span> Plus, Our Full Study Abroad Suite
                        </h3>
                        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                            Your success doesn't stop at the IELTS score. We provide end-to-end support for your entire journey abroad, all included free.
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                        {additionalServicesData.map(service => (
                            <div key={service.service} className="flex items-start">
                                <span className="text-3xl mr-4 mt-0.5">{service.icon}</span>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800">{service.service}</h4>
                                    <p className="text-slate-600">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-2xl text-center shadow-2xl animate-pulse-glow">
                    <h3 className="text-2xl font-bold mb-2 text-amber-400">Total Value vs. Your Price</h3>
                    <p className="text-slate-300 mb-6">You're not just getting a discount; you're getting a massive value upgrade.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <div className="text-center">
                            <p className="text-lg text-slate-400">Total Bundle Value</p>
                            <p className="text-4xl lg:text-5xl font-extrabold text-red-400 line-through">₹{animatedTotal.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="text-4xl font-light text-slate-600 hidden sm:block">→</div>
                        <div className="text-center">
                             <p className="text-lg text-slate-400">Your Price Today*</p>
                            <p className="text-5xl lg:text-6xl font-black text-emerald-400">₹2,999</p>
                        </div>
                    </div>
                     <p className="text-[11px] text-slate-500 mt-6">*After passing the free qualifying test.</p>
                </div>

                <div className="text-center mt-8">
                    <a href="#" className="inline-block bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300">
                        Claim your ₹{savings.toLocaleString('en-IN')} Savings &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BundleValue;