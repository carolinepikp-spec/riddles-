import confetti from 'canvas-confetti';

export function fireOceanConfetti() {
  // Burst from center-left and center-right with sea colors
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 65,
    origin: { x: 0.1, y: 0.7 },
    colors: ['#38bdf8', '#2dd4bf', '#fbbf24', '#f472b6', '#818cf8']
  });

  confetti({
    particleCount: 50,
    angle: 120,
    spread: 65,
    origin: { x: 0.9, y: 0.7 },
    colors: ['#38bdf8', '#2dd4bf', '#fbbf24', '#f472b6', '#818cf8']
  });
}

export function fireGrandCelebration() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#0284c7', '#06b6d4', '#14b8a6', '#f59e0b', '#ec4899']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#0284c7', '#06b6d4', '#14b8a6', '#f59e0b', '#ec4899']
    });
  }, 250);
}
