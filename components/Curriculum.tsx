import React, { useState } from 'react';
import { curriculumData } from '../constants';
import type { CurriculumModule } from '../types';
import VideoPlayerModal from './VideoPlayerModal';

// Unlocked state icon
const PlayCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Locked state icon
const LockClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-400 mr-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);


const Curriculum = () => {
    const [activeTab, setActiveTab] = useState<CurriculumModule['id']>('reading');
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

    const handlePlayVideo = (videoId: string) => {
        setCurrentVideoId(videoId);
        setIsPlayerOpen(true);
    };

    const handleClosePlayer = () => {
        setIsPlayerOpen(false);
        setCurrentVideoId(null);
    };

    const activeModule = curriculumData.find(module => module.id === activeTab);

    return (
        <section id="curriculum" className="py-20 lg:py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        Your Roadmap to a High Score
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        Our curriculum is meticulously designed to cover every aspect of the IELTS test. Explore what you'll master in each module.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Tabs Navigation */}
                    <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4 bg-slate-100 p-2 rounded-xl">
                        {curriculumData.map((module) => (
                            <button
                                key={module.id}
                                onClick={() => setActiveTab(module.id)}
                                className={`flex items-center justify-center font-bold py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base transition-all duration-300 w-full sm:w-auto
                                    ${activeTab === module.id
                                        ? 'bg-slate-800 text-white shadow-lg scale-105'
                                        : 'bg-transparent text-slate-600 hover:bg-white hover:text-emerald-600'
                                    }`}
                            >
                                {module.icon}
                                <span>{module.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 min-h-[400px]">
                        {activeModule && (
                             <div className="space-y-4">
                                {activeModule.topics.map((topic, index) => {
                                    const isLocked = index > 0;
                                    const isPlayable = !isLocked && topic.videoId;

                                    const WrapperComponent = isPlayable ? 'button' : 'div';
                                    
                                    return (
                                        <WrapperComponent
                                            key={index}
                                            onClick={isPlayable ? () => handlePlayVideo(topic.videoId!) : undefined}
                                            className={`w-full flex items-center p-4 rounded-lg transition-all duration-300 text-left ${
                                                isLocked 
                                                ? 'bg-slate-100/70 cursor-not-allowed' 
                                                : 'bg-emerald-50/80 hover:bg-emerald-100 hover:scale-[1.02] cursor-pointer'
                                            }`}
                                            disabled={!isPlayable}
                                        >
                                            {isLocked ? <LockClosedIcon /> : <PlayCircleIcon />}
                                            <div className={isLocked ? 'opacity-50' : ''}>
                                                <h4 className="text-lg font-bold text-slate-800">{topic.title}</h4>
                                                <p className="text-slate-600 text-sm">{topic.details}</p>
                                            </div>
                                        </WrapperComponent>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <VideoPlayerModal isOpen={isPlayerOpen} onClose={handleClosePlayer} videoId={currentVideoId} />
        </section>
    );
};

export default Curriculum;