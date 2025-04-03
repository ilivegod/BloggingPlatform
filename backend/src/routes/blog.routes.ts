import { Hono } from "hono";
import {
  getAllBlogs,
  getBlogBySlug,
  getUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import {
  authMiddleware,
  optionalAuthMiddleware,
} from "../middleware/auth.middleware.js";

const blog = new Hono();

// Public routes (with optional auth for filtering)
blog.get("/", optionalAuthMiddleware, getAllBlogs);
blog.get("/slug/:slug", optionalAuthMiddleware, getBlogBySlug);

// Protected routes
blog.get("/user", authMiddleware, getUserBlogs);
blog.post("/", authMiddleware, createBlog);
blog.put("/:id", authMiddleware, updateBlog);
blog.delete("/:id", authMiddleware, deleteBlog);

export default blog;
