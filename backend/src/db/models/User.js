import { query } from "../index.js";
import bcrypt from "bcrypt";

export class User {
  static async findByEmail(email) {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query(
      "SELECT id, username, email, first_name, last_name, profile_picture, bio, created_at, updated_at FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async create(userData) {
    const { username, email, password, first_name, last_name } = userData;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await query(
      "INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, first_name, last_name, created_at",
      [username, email, password_hash, first_name, last_name]
    );

    return result.rows[0];
  }

  static async update(id, userData) {
    const { first_name, last_name, bio, profile_picture } = userData;

    const result = await query(
      "UPDATE users SET first_name = $2, last_name = $3, bio = $4, profile_picture = $5, updated_at = NOW() WHERE id = $1 RETURNING id, username, email, first_name, last_name, bio, profile_picture, updated_at",
      [id, first_name, last_name, bio, profile_picture]
    );

    return result.rows[0];
  }

  static async validatePassword(user, password) {
    return await bcrypt.compare(password, user.password_hash);
  }
}
