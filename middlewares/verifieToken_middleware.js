import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.JWT_kEY;

export function verifieToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }
  try {
    const decoded = jwt.verify(token, key);
    req.user = {
      email: decoded.email,
      id: decoded.id,
    };
    console.log("valid token");
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(404).json({
      msg: "the invalid token",
    });
    return false;
  }
}
