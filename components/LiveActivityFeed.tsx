import React, { useState, useEffect } from 'react';
import { liveActivityData } from '../constants';

const LiveActivityFeed = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false); // Start fade out
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % liveActivityData.length);
                setIsVisible(true); // Start fade in
            }, 500); // Time for fade-out animation
        }, 4000); // Change item every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const currentActivity = liveActivityData[currentIndex];

    return (
        <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-slate-100/80 rounded-lg px-4 py-2 text-sm text-slate-800 border border-slate-200/80">
                <span className="mr-2">{currentActivity.emoji}</span>
                <span className="font-semibold">{currentActivity.text}</span>
            </div>
        </div>
    );
};

export default LiveActivityFeed;