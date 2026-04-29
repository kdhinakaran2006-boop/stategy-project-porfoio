export async function generateInsight(project: any) {
  // Return fallback rule-based insight on the server
  // Client-side will generate deep AI insights
  if (project.roi > 30 && project.risk < 20) {
    return `${project.name} is a high-performing strategic asset with excellent ROI and managed risk profile.`;
  }
  if (project.risk > 50) {
    return `${project.name} requires immediate risk mitigation strategies due to high volatility scoring.`;
  }
  return `${project.name} is performing within expected parameters. Monitor for resource optimization.`;
}

export async function chatWithAI(projects: any[], question: string) {
  // Backend chat is deprecated. Client-side handles AI chat.
  return "AI connection redirected to client secure channel. Please ensure you are viewing this via the primary dashboard interface.";
}
