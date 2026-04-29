import { Router } from "express";
import { getInsights } from "../controllers/insights.controller";
import { authenticate } from "../middleware/error.middleware";

const router = Router();

router.use(authenticate);
router.get("/", getInsights);

export default router;
