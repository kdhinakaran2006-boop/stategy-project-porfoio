export function calculateProjectScore(roi: number, risk: number, teamSize: number) {
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

export function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined || isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number | null | undefined) {
  if (value === null || value === undefined || isNaN(value)) return '0.0%';
  return `${value.toFixed(1)}%`;
}
