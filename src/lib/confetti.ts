import confetti from "canvas-confetti";

const warmColors = ["#c9302c", "#e3b94a", "#f5d97a", "#f4a576", "#8a1c1c"];

export const subtleConfetti = () => {
  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.6 },
    colors: warmColors,
    gravity: 0.9,
    scalar: 0.9,
    ticks: 180,
  });
};

export const celebrateConfetti = () => {
  // gentle two-burst
  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 35,
    origin: { y: 0.65 },
    colors: warmColors,
    scalar: 0.95,
    ticks: 220,
  });
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: warmColors,
      scalar: 0.85,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: warmColors,
      scalar: 0.85,
    });
  }, 300);
};
