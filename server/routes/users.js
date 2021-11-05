import express from "express";
import auth from "../middleware/auth.js";
import { signin, signup, userUpdatePwd,getUser } from "../controllers/user.js"; // logic in controller

const router = express.Router();

router.get("/", getUser);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id", auth, userUpdatePwd);

export default router;
