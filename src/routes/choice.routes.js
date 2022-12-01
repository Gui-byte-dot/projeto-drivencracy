import { Router } from "express";
import { createChoice } from "../controllers/choice.controllers.js";
import { choiceSchemaValidation } from "../middlewares/choiceSchemasValidation.js";

const router = Router();

router.post("/choice", choiceSchemaValidation, createChoice);

export default router;