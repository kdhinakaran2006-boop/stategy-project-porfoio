import express from "express";
import { prisma } from "./db";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import { createServer as createViteServer } from "vite";
import projectRoutes from "./routes/project.routes";
import authRoutes from "./routes/auth.routes";
import aiRoutes from "./routes/ai.routes";
import insightsRoutes from "./routes/insights.routes";
import { errorMiddleware } from "./middleware/error.middleware";

// Prisma instance imported from db.ts
const app = express();
const PORT = 3000;

async function startServer() {
  app.set('trust proxy', 1);
  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/insights", insightsRoutes);

  // Error handling
  app.use(errorMiddleware);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      root: path.join(process.cwd(), "client"),
      configFile: path.join(process.cwd(), "client/vite.config.ts")
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app, prisma, startServer };
