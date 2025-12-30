import jwt from "jsonwebtoken";

// 1. Middleware to verify if the user is logged in (Valid Token)
export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    // Token format is usually "Bearer <token>", so we remove "Bearer " prefix
    const tokenPart = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
    
    const verified = jwt.verify(tokenPart, process.env.JWT_SECRET as string);
    req.user = verified; // Attach user data (id, role) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

// 2. Middleware to check if the user is an Admin
export const verifyAdmin = (req: any, res: any, next: any) => {
  // First verify the token, then check the role
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next(); // User is Admin, allow access
    } else {
      res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
  });
};