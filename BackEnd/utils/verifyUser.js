import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookie.access_token;
  if (!token) return res.status(401).json("you must be logged in");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");
    req.user = user;
    next();
  });
};
