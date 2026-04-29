export function calculateProjectScore(roi: number, risk: number, teamSize: number) {
  // score = (roi * 0.4) - (risk * 0.3) - (teamSize * 0.3)
  // Scaling roi to 0-100 range if needed, but assuming input is percentage
  // normalized score to 0-100
  const score = (roi * 4) - (risk * 2.5) - (teamSize * 2);
  
  let category: 'High' | 'Medium' | 'Low' = 'Medium';
  if (score > 70) category = 'High';
  else if (score < 30) category = 'Low';

  const flags = [];
  if (risk > 40) flags.push('High Risk');
  if (roi < 15) flags.push('Low ROI');
  if (teamSize > 15) flags.push('Over-resourced');

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    category,
    flags
  };
}
