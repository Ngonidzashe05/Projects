export const VIBES = [
  { label: "Chill",      emoji: "😌", color: "#4DB6AC" },
  { label: "Energetic",  emoji: "⚡", color: "#FFB300" },
  { label: "Romantic",   emoji: "🌹", color: "#F06292" },
  { label: "Eerie",      emoji: "👻", color: "#9575CD" },
  { label: "Peaceful",   emoji: "🍃", color: "#81C784" },
  { label: "Nostalgic",  emoji: "🎞️", color: "#A1887F" },
  { label: "Hype",       emoji: "🔥", color: "#FF7043" },
  { label: "Mysterious", emoji: "🌫️", color: "#78909C" },
];

export const getVibe = (label) => VIBES.find(v => v.label === label) || VIBES[0];