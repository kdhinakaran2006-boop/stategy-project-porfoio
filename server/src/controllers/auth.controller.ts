import { Request, Response } from "express";
import { prisma } from "../db";
import { hashPassword, comparePassword, createToken } from "../services/auth.service";

// Using shared prisma instance

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    const sessionToken = createToken({ userId: user.id });
    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = createToken({ userId: user.id });
    res.cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("session", { httpOnly: true, secure: true, sameSite: "none", path: "/" });
  res.json({ success: true });
};

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
