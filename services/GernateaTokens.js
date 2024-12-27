import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.JWT_kEY;

if (!key) {
  throw new Error("JWT_KEY is not defined in the environment variables.");
}

export function generateToken(data) {
  const user = data.email;
  const id = data.id;
  const token = jwt.sign({ user, id }, key);
  return token;
}
