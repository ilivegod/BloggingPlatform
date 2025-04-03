import { query } from "../index.js";

export class Comment {
  static async findByBlogId(blogId) {
    const result = await query(
      `SELECT c.*, u.username, u.profile_picture
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.blog_id = $1
       ORDER BY c.created_at DESC`,
      [blogId]
    );
    return result.rows;
  }

  static async create(commentData) {
    const { content, blog_id, user_id, parent_comment_id } = commentData;

    const result = await query(
      "INSERT INTO comments (content, blog_id, user_id, parent_comment_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [content, blog_id, user_id, parent_comment_id || null]
    );

    // Fetch the user data to include in the response
    const userData = await query(
      "SELECT username, profile_picture FROM users WHERE id = $1",
      [user_id]
    );

    return {
      ...result.rows[0],
      username: userData.rows[0].username,
      profile_picture: userData.rows[0].profile_picture,
    };
  }

  static async update(id, userId, content) {
    // First check if the user is the comment owner
    const commentCheck = await query(
      "SELECT id FROM comments WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (commentCheck.rows.length === 0) {
      throw new Error("Unauthorized or comment not found");
    }

    const result = await query(
      "UPDATE comments SET content = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [content, id]
    );

    return result.rows[0];
  }

  static async delete(id, userId) {
    // First check if the user is the comment owner
    const commentCheck = await query(
      "SELECT id FROM comments WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (commentCheck.rows.length === 0) {
      throw new Error("Unauthorized or comment not found");
    }

    await query("DELETE FROM comments WHERE id = $1", [id]);
    return { success: true };
  }
}
