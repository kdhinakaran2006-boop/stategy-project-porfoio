import { Request, Response } from "express";
import { prisma } from "../db";
import { calculateProjectScore } from "../services/project.service";
import { generateInsight } from "../services/ai.service";

// Using shared prisma instance

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects.map(p => ({ ...p, ...calculateProjectScore(p.roi, p.risk, p.teamSize) })));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: req.params.id } });
    if (!project) return res.status(404).json({ error: "Project not found" });
    const insight = await generateInsight(project);
    res.json({ ...project, ...calculateProjectScore(project.roi, project.risk, project.teamSize), insight });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const runSimulation = async (req: Request, res: Response) => {
  try {
    const { budgetDelta, teamDelta } = req.body;
    const projects = await prisma.project.findMany();
    const results = projects.map(p => {
      const newBudget = p.budget * (1 + budgetDelta / 100);
      const newTeam = Math.max(1, Math.round(p.teamSize * (1 + teamDelta / 100)));
      const newRoi = Math.max(0, p.roi + (budgetDelta * 0.1) - (teamDelta * 0.05));
      return { id: p.id, name: p.name, oldRoi: p.roi, newRoi, ...calculateProjectScore(newRoi, p.risk, newTeam) };
    });
    res.json({
      impactSummary: `Portfolio simulation suggests a ${budgetDelta > 0 ? 'growth' : 'contraction'} trend.`,
      results: results.sort((a, b) => b.score - a.score)
    });
  } catch (error) {
    res.status(500).json({ error: "Simulation failed" });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
    const avgRoi = projects.length > 0 ? projects.reduce((acc, p) => acc + p.roi, 0) / projects.length : 0;
    const statusBreakdown = projects.reduce((acc: any, p: any) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});
    res.json({
      metrics: { totalCapital: totalBudget, weightedYield: avgRoi },
      distribution: statusBreakdown,
      projects
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};
