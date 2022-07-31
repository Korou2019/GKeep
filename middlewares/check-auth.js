const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.Authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) res.status(403).json("Token is not valid");
      
      req.user = { email: user.email, userId: user.userId };
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};