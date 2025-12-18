import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    // Check for token in headers
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ message: "Authorization header missing" });

    // Format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    // Verify token
    jwt.verify(
      token,
      process.env.ACCESS_SECRET || "access_secret",
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid or expired token" });

        // Attach user info to request
        req.user = decoded;
        next();
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
