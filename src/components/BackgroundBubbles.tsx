import React from 'react';

export const BackgroundBubbles: React.FC = () => {
  // Generate stable random bubbles
  const bubbles = [
    { id: 1, size: 28, left: 8, delay: 0, duration: 14 },
    { id: 2, size: 40, left: 18, delay: 3, duration: 18 },
    { id: 3, size: 16, left: 32, delay: 1, duration: 12 },
    { id: 4, size: 34, left: 45, delay: 5, duration: 16 },
    { id: 5, size: 24, left: 62, delay: 2, duration: 15 },
    { id: 6, size: 48, left: 74, delay: 4, duration: 20 },
    { id: 7, size: 20, left: 88, delay: 6, duration: 13 },
    { id: 8, size: 30, left: 95, delay: 1.5, duration: 17 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map(b => (
        <div
          key={b.id}
          className="absolute rounded-full border border-sky-300/40 bg-gradient-to-t from-sky-300/20 to-white/40 shadow-inner"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: '-50px',
            animation: `floatBubble ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
          }}
        >
          {/* Subtle light reflection on bubble */}
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 ml-1 mt-1" />
        </div>
      ))}
    </div>
  );
};
