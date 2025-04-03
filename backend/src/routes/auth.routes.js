import { Hono } from "hono";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const auth = new Hono();

// Public routes
auth.post("/register", registerUser);
auth.post("/login", loginUser);

// Protected routes
auth.get("/me", authMiddleware, getCurrentUser);

export default auth;
