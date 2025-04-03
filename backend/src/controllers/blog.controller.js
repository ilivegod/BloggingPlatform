import { Blog } from "../db/models/Blog";
import { query } from "../db/index";

export const getAllBlogs = async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "10");
    const offset = (page - 1) * limit;

    // Only return published blogs for non-authenticated users
    const user = c.get("user");
    const includeUnpublished = user ? true : false;

    const blogs = await Blog.findAll(limit, offset, includeUnpublished);
    const total = await query(
      `SELECT COUNT(*) FROM blogs ${
        !includeUnpublished ? "WHERE published = true" : ""
      }`
    );

    return c.json({
      blogs,
      pagination: {
        page,
        limit,
        total: parseInt(total.rows[0].count),
        pages: Math.ceil(total.rows[0].count / limit),
      },
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const getBlogBySlug = async (c) => {
  try {
    const slug = c.req.param("slug");
    const blog = await Blog.findBySlug(slug);

    if (!blog) {
      return c.json({ error: "Blog not found" }, 404);
    }

    // If blog is not published, only the author can see it
    if (!blog.published) {
      const user = c.get("user");
      if (!user || user.id !== blog.author_id) {
        return c.json({ error: "Blog not found" }, 404);
      }
    }

    return c.json({ blog });
  } catch (error) {
    console.error("Get blog by slug error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const getUserBlogs = async (c) => {
  try {
    const userId = c.get("user").id;
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "10");
    const offset = (page - 1) * limit;

    const blogs = await Blog.findByUser(userId, limit, offset);
    const total = await query(
      "SELECT COUNT(*) FROM blogs WHERE author_id = $1",
      [userId]
    );

    return c.json({
      blogs,
      pagination: {
        page,
        limit,
        total: parseInt(total.rows[0].count),
        pages: Math.ceil(total.rows[0].count / limit),
      },
    });
  } catch (error) {
    console.error("Get user blogs error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const createBlog = async (c) => {
  try {
    const userId = c.get("user").id;
    const body = await c.req.json();

    const { title, content, featured_image, published } = body;

    if (!title || !content) {
      return c.json({ error: "Title and content are required" }, 400);
    }

    const blog = await Blog.create({
      title,
      content,
      featured_image,
      author_id: userId,
      published: published !== undefined ? published : true,
    });

    return c.json({ message: "Blog created successfully", blog }, 201);
  } catch (error) {
    console.error("Create blog error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const updateBlog = async (c) => {
  try {
    const userId = c.get("user").id;
    const blogId = c.req.param("id");
    const body = await c.req.json();

    // Check if blog exists and user is the author
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return c.json({ error: "Blog not found" }, 404);
    }

    if (blog.author_id !== userId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    const updatedBlog = await Blog.update(blogId, body);

    return c.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Update blog error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const deleteBlog = async (c) => {
  try {
    const userId = c.get("user").id;
    const blogId = c.req.param("id");

    // Check if blog exists and user is the author
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return c.json({ error: "Blog not found" }, 404);
    }

    if (blog.author_id !== userId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    await Blog.delete(blogId);

    return c.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};
