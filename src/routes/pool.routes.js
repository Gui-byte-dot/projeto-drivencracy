import { Router } from "express";
import { createPool } from "../controllers/pool.controllers.js";
import { poolSchemaValidation } from "../middlewares/poolSchemasValidation.js";

const router = Router();

router.post("/pool", poolSchemaValidation, createPool);

export default router;