import jwt from "jsonwebtoken";
import "dotenv/config";

//this middleware will on continue on if the token is inside the local storage

export default function(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "Acesso negado!" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.SECRET);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token não é válido" });
  }
};