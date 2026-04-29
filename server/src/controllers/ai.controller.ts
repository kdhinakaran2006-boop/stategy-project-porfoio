import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { chatWithAI } from "../services/ai.service";

const prisma = new PrismaClient();

export const chat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const projects = await prisma.project.findMany();
    const response = await chatWithAI(projects, message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Chat failed" });
  }
};
