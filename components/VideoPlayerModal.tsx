
import React, { useEffect, useState } from 'react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ isOpen, onClose, videoId }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Allow the component to mount before starting the animation
      const timer = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timer);
    } else {
      // Allow animation to finish before changing body style
      const timer = setTimeout(() => {
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = 'unset';
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setShowContent(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 ease-in-out ${showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">Lesson Preview</h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Close video player"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-2 sm:p-4 bg-slate-100">
          <div className="w-full aspect-video overflow-hidden rounded-lg bg-black">
            {videoId && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
