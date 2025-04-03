import { query } from "../index.js";
import { slugify } from "../../utils/slugify.js";

export class Blog {
  static async findAll(limit = 10, offset = 0, includeUnpublished = false) {
    let sql = `
      SELECT b.*, u.username as author_name, COUNT(c.id) as comment_count
      FROM blogs b
      JOIN users u ON b.author_id = u.id
      LEFT JOIN comments c ON c.blog_id = b.id
    `;

    if (!includeUnpublished) {
      sql += " WHERE b.published = true";
    }

    sql += `
      GROUP BY b.id, u.username
      ORDER BY b.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const result = await query(sql, [limit, offset]);
    return result.rows;
  }

  static async findByUser(userId, limit = 10, offset = 0) {
    const result = await query(
      `SELECT b.*, COUNT(c.id) as comment_count
       FROM blogs b
       LEFT JOIN comments c ON c.blog_id = b.id
       WHERE b.author_id = $1
       GROUP BY b.id
       ORDER BY b.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    return result.rows;
  }

  static async findBySlug(slug) {
    const result = await query(
      `SELECT b.*, u.username as author_name, u.profile_picture as author_picture
       FROM blogs b
       JOIN users u ON b.author_id = u.id
       WHERE b.slug = $1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return null;
    }

    // Increment view count
    await query("UPDATE blogs SET view_count = view_count + 1 WHERE id = $1", [
      result.rows[0].id,
    ]);

    return result.rows[0];
  }

  static async findById(id) {
    const result = await query("SELECT * FROM blogs WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(blogData) {
    const {
      title,
      content,
      featured_image,
      author_id,
      published = true,
    } = blogData;

    // Generate a unique slug
    let slug = slugify(title);
    const slugCheck = await query("SELECT id FROM blogs WHERE slug = $1", [
      slug,
    ]);

    if (slugCheck.rows.length > 0) {
      // Append a unique identifier if slug exists
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const result = await query(
      "INSERT INTO blogs (title, content, slug, featured_image, author_id, published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, content, slug, featured_image, author_id, published]
    );

    return result.rows[0];
  }

  static async update(id, blogData) {
    const { title, content, featured_image, published } = blogData;

    // Update the slug if title changes
    let slug = null;
    if (title) {
      slug = slugify(title);
      const blogToUpdate = await this.findById(id);

      // If the title has changed, we need to check if the new slug is unique
      if (blogToUpdate.title !== title) {
        const slugCheck = await query(
          "SELECT id FROM blogs WHERE slug = $1 AND id != $2",
          [slug, id]
        );

        if (slugCheck.rows.length > 0) {
          // Append a unique identifier if slug exists
          slug = `${slug}-${Date.now().toString().slice(-4)}`;
        }
      } else {
        // Title hasn't changed, keep the original slug
        slug = blogToUpdate.slug;
      }
    }

    const fields = [];
    const values = [];
    let paramCounter = 1;

    // Only update fields that are provided
    if (title) {
      fields.push(`title = $${paramCounter++}`);
      values.push(title);
    }

    if (content) {
      fields.push(`content = $${paramCounter++}`);
      values.push(content);
    }

    if (slug) {
      fields.push(`slug = $${paramCounter++}`);
      values.push(slug);
    }

    if (featured_image !== undefined) {
      fields.push(`featured_image = $${paramCounter++}`);
      values.push(featured_image);
    }

    if (published !== undefined) {
      fields.push(`published = $${paramCounter++}`);
      values.push(published);
    }

    fields.push(`updated_at = NOW()`);

    // Add the ID as the last parameter
    values.push(id);

    const result = await query(
      `UPDATE blogs SET ${fields.join(
        ", "
      )} WHERE id = $${paramCounter} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id) {
    await query("DELETE FROM blogs WHERE id = $1", [id]);
    return { success: true };
  }
}
