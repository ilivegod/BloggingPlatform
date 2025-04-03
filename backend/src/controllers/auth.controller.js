import { User } from "../db/models/User";
import { generateToken } from "../utils/jwt";

export const registerUser = async (c) => {
  try {
    const body = await c.req.json();
    const { username, email, password, first_name, last_name } = body;

    // Check if email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return c.json({ error: "Email already in use" }, 400);
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      first_name,
      last_name,
    });

    // Generate JWT token
    const token = generateToken(user);

    return c.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        token,
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ error: "Server error during registration" }, 500);
  }
};

export const loginUser = async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Validate password
    const isPasswordValid = await User.validatePassword(user, password);
    if (!isPasswordValid) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Generate JWT token
    const token = generateToken(user);

    return c.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_picture: user.profile_picture,
        bio: user.bio,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Server error during login" }, 500);
  }
};

export const getCurrentUser = async (c) => {
  try {
    const userId = c.get("user").id;
    const user = await User.findById(userId);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error("Get current user error:", error);
    return c.json({ error: "Server error" }, 500);
  }
};
