import { Comment } from "../db/models/Comment";
import { Blog } from "../db/models/Blog";

export const getBlogComments = async (c) => {
  try {
    const blogId = c.req.param("blogId");

    // Verify blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return c.json({ error: "Blog not found" }, 404);
    }

    const comments = await Comment.findByBlogId(blogId);
    return c.json({ comments });
  } catch (error) {
    console.error("Get blog comments error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const createComment = async (c) => {
  try {
    const userId = c.get("user").id;
    const blogId = c.req.param("blogId");
    const body = await c.req.json();

    // Verify blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return c.json({ error: "Blog not found" }, 404);
    }

    const { content, parent_comment_id } = body;

    if (!content) {
      return c.json({ error: "Comment content is required" }, 400);
    }

    const comment = await Comment.create({
      content,
      blog_id: blogId,
      user_id: userId,
      parent_comment_id,
    });

    return c.json({ message: "Comment added successfully", comment }, 201);
  } catch (error) {
    console.error("Create comment error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const updateComment = async (c) => {
  try {
    const userId = c.get("user").id;
    const commentId = c.req.param("commentId");
    const body = await c.req.json();

    if (!body.content) {
      return c.json({ error: "Comment content is required" }, 400);
    }

    try {
      const comment = await Comment.update(commentId, userId, body.content);
      return c.json({ message: "Comment updated successfully", comment });
    } catch (error) {
      if (error.message.includes("Unauthorized")) {
        return c.json({ error: "Unauthorized to update this comment" }, 403);
      }
      throw error;
    }
  } catch (error) {
    console.error("Update comment error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};

export const deleteComment = async (c) => {
  try {
    const userId = c.get("user").id;
    const commentId = c.req.param("commentId");

    try {
      await Comment.delete(commentId, userId);
      return c.json({ message: "Comment deleted successfully" });
    } catch (error) {
      if (error.message.includes("Unauthorized")) {
        return c.json({ error: "Unauthorized to delete this comment" }, 403);
      }
      throw error;
    }
  } catch (error) {
    console.error("Delete comment error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};
