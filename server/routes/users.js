import express from "express";
import auth from "../middleware/auth.js";
import { signin, signup, userUpdatePwd,getUser,deleteUser } from "../controllers/user.js"; // logic in controller
import UserModel from "../models/user.js";

const router = express.Router();

router.get("/", getUser);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id", auth, userUpdatePwd);

router.get("/:id", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
router.delete("/:id", deleteUser)

export default router;
