import { verifyToken } from "../utils/jwt";

export const authMiddleware = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Access denied. No token provided." }, 401);
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    c.set("user", decoded);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token." }, 401);
  }
};

// Optional auth for endpoints that work for both authed and non-authed users
export const optionalAuthMiddleware = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      c.set("user", decoded);
    } catch (error) {
      // Silently fail and continue as non-authenticated
    }
  }

  await next();
};
