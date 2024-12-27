import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.JWT_kEY;

export function verifieToken(res,res,next){
    const token = res.headers.authorization;
    if(!token){
        return res.status(401).json({ msg: "Authorization header missing" });
    }
    try {
        const decoded = jwt.verify(token, key);
        res.user = {
            email:decoded.email,
            id : decoded.id
        };
      } 
      catch (error) {
        console.error("Token verification failed:", error.message);
        return false;
      }
}