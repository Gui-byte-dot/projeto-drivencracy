import { Router } from "express";
import { createChoice, createVote} from "../controllers/choice.controllers.js";
import { choiceSchemaValidation } from "../middlewares/choiceSchemasValidation.js";

const router = Router();

router.post("/choice", choiceSchemaValidation, createChoice);
router.post("/choice/:id/vote", createVote);

export default router;