import express from "express";
const router = express.Router();
import { google, login, signup } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
export default router;
