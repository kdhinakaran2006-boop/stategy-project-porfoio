export function calculateProjectScore(roi: number, risk: number, teamSize: number) {
  // Strategic scoring algorithm (0-100)
  // Higher ROI is better, Lower risk is better, teamSize impact is normalized
  const normalizedRoi = Math.min(100, roi * 2);
  const normalizedRisk = Math.max(0, 100 - risk);
  const resourceEfficiency = Math.max(0, 100 - (teamSize * 3));
  
  const score = (normalizedRoi * 0.5) + (normalizedRisk * 0.3) + (resourceEfficiency * 0.2);
  
  return {
    score: Math.round(score),
    efficiency: Math.round(resourceEfficiency),
    health: score > 70 ? 'Optimal' : score > 40 ? 'Stable' : 'Critical'
  };
}
