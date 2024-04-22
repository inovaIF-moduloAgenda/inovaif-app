
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import "dotenv/config";


export default function generateToken(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  }
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
}
