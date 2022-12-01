import { Router } from "express";
import { createPool, findPool, findPoolId } from "../controllers/pool.controllers.js";
import { poolSchemaValidation } from "../middlewares/poolSchemasValidation.js";

const router = Router();

router.post("/pool", poolSchemaValidation, createPool);
router.get("/pool",findPool);
router.get("/pool/:id/choice",findPoolId);

export default router;