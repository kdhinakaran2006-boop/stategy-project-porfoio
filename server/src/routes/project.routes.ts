import { Router } from "express";
import { getProjects, getProject, createProject, getReports, runSimulation } from "../controllers/project.controller";
import { authenticate } from "../middleware/error.middleware";

const router = Router();

router.use(authenticate);

router.get("/", getProjects);
router.get("/reports", getReports);
router.post("/simulation", runSimulation);
router.get("/:id", getProject);
router.post("/", createProject);

export default router;
