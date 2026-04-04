/* Green terminal-themed confetti burst */
import confetti from "canvas-confetti";

export function fireTerminalConfetti(): void {
  /* Terminal green color palette */
  const colors = ["#00ff41", "#00cc33", "#009926", "#33ff66", "#66ff99"];

  /* First burst — center spread */
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors,
    shapes: ["square"],
    scalar: 0.8,
    gravity: 1.2,
    ticks: 150,
  });

  /* Second burst — slightly delayed, wider */
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
      shapes: ["square"],
      scalar: 0.7,
      gravity: 1.2,
      ticks: 150,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
      shapes: ["square"],
      scalar: 0.7,
      gravity: 1.2,
      ticks: 150,
    });
  }, 200);
}
