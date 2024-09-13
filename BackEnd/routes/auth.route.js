import express from "express";
const router = express.Router();
import {
  google,
  login,
  signup,
  signout,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.get("/signout", signout);
export default router;
