import express from "express";
import {
  agentUpdateProfile,
  getAgent,
  agentUpdatePwd,
} from "../controllers/agent.js";
const router = express.Router();
import AgentModel from "../models/agent.js";

import { agentSignin, agentSignup } from "../controllers/agent.js"; // logic in controller
import auth from "../middleware/auth.js";

router.get("/", getAgent);
router.get("/:id", async (req, res) => {
  try {
    const agent = await AgentModel.findById(req.params.id);
    res.status(200).json(agent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post("/signin", agentSignin);
router.post("/signup", agentSignup);
router.patch("/:id/profile", auth, agentUpdateProfile);
router.patch("/:id/psw", auth, agentUpdatePwd);

export default router;
