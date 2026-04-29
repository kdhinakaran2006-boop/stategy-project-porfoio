import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { calculateProjectScore } from "../services/project.service";

const prisma = new PrismaClient();

export const getInsights = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    const sortedByScore = projects
      .map(p => ({ ...p, ...calculateProjectScore(p.roi, p.risk, p.teamSize) }))
      .sort((a, b) => b.score - a.score);

    res.json({
      bestProject: sortedByScore[0] || null,
      riskAlerts: sortedByScore.filter(p => p.risk > 40),
      totalProjects: projects.length,
      averageRoi: projects.length > 0 
        ? projects.reduce((acc, p) => acc + p.roi, 0) / projects.length 
        : 0
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate insights" });
  }
};
