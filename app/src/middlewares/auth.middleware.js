import jwt from "jsonwebtoken";
import "dotenv/config";

export function verifyToken(req, res, next) {
  const token = req.headers?.token;

  if (!token) {
    return res
      .status(403)
      .json({ error: "User have not access to this gateway" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN);

    req.user = decodedToken;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid Token" });
  }

  return next();
}
