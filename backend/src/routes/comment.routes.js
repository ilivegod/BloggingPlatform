import { Hono } from "hono";
import {
  getBlogComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const comment = new Hono();

// Public routes
comment.get("/blog/:blogId", getBlogComments);

// Protected routes
comment.post("/blog/:blogId", authMiddleware, createComment);
comment.put("/:commentId", authMiddleware, updateComment);
comment.delete("/:commentId", authMiddleware, deleteComment);

export default comment;
