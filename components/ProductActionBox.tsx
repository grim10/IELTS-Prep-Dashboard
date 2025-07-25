import React, { useState, useEffect } from 'react';
import LiveActivityFeed from './LiveActivityFeed';

interface ProductActionBoxProps {
  onStartTest: () => void;
}

const ProductActionBox: React.FC<ProductActionBoxProps> = ({ onStartTest }) => {
    const initialTime = 4 * 60 * 60; // 4 hours in seconds
    const [secondsLeft, setSecondsLeft] = useState(initialTime);

    const [spotsTaken, setSpotsTaken] = useState(63);
    const totalSpots = 100;

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);

        const spotsInterval = setInterval(() => {
            setSpotsTaken(prev => (prev < 95 ? prev + Math.floor(Math.random() * 2) + 1 : 95));
        }, 6000);

        return () => {
            clearInterval(timer);
            clearInterval(spotsInterval);
        };
    }, []);

    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    const spotsLeft = totalSpots - spotsTaken;
    const progressPercentage = (spotsTaken / totalSpots) * 100;

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-2xl p-6 lg:p-8 border border-white/30 w-full mx-auto">
            
            <div className="bg-slate-800 text-white text-center text-sm font-bold py-2 px-3 rounded-t-lg -mx-6 -mt-6 lg:-mx-8 lg:-mt-8 mb-6">
                🔥 Get IELTS-Ready in Just 4 Weeks – Flash Deal Ends Soon! 🔥
            </div>
            
            <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-extrabold text-slate-900">₹2,999</span>
                <span className="text-xl font-medium text-slate-500 line-through">₹30,500</span>
                <span className="bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1 rounded-full">-90% Flat</span>
            </div>
            
             <p className="text-sm text-slate-600 mb-5">
                Pass the free qualifying test to unlock this exclusive price.
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-3 gap-2 text-center mb-1">
                <div className="bg-slate-100/70 p-2 rounded-md">
                    <div className="text-2xl font-bold text-slate-700">{String(hours).padStart(2, '0')}</div>
                    <div className="text-xs text-slate-500">HRS</div>
                </div>
                <div className="bg-slate-100/70 p-2 rounded-md">
                    <div className="text-2xl font-bold text-slate-700">{String(minutes).padStart(2, '0')}</div>
                    <div className="text-xs text-slate-500">MINS</div>
                </div>
                <div className="bg-slate-100/70 p-2 rounded-md">
                    <div className="text-2xl font-bold text-slate-700">{String(seconds).padStart(2, '0')}</div>
                    <div className="text-xs text-slate-500">SECS</div>
                </div>
            </div>
            <p className="text-center text-xs text-slate-500 mb-5">Next price jump in ⏳</p>


            {/* Limited Spots */}
            <div className="mb-5">
                <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-semibold text-amber-600">Limited spots left!</span>
                    <span className="text-slate-500">{spotsLeft} of {totalSpots} remaining</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-amber-500 to-red-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p className="text-center text-xs text-slate-500 mt-1">Seats filling fast – Next batch starts soon!</p>
            </div>

            <div className="mb-6">
                <LiveActivityFeed />
            </div>

            <button onClick={onStartTest} className="w-full block text-center bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-3 px-4 rounded-lg text-lg shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 animate-pulse-subtle">
                <span className="flex items-center justify-center gap-2">
                    <span>🔓</span>
                    <span className="font-bold">Unlock Prep Access for ₹2,999</span>
                </span>
                 <span className="text-sm font-medium opacity-90">Begin Your Journey Today</span>
            </button>
            <p className="mt-3 text-center text-xs text-slate-500"> • 🇮🇳 Trusted by 5,000+ Indian Students  • No Credit Card Needed</p>
            <p className="mt-4 text-center text-sm text-slate-600">
                Have questions? <a href="tel:+919876543210" className="font-semibold text-emerald-600 hover:underline">Talk to a Counsellor</a>
            </p>

        </div>
    );
};

export default ProductActionBox;