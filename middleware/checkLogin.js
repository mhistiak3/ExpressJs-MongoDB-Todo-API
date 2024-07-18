// dependencies
const jwt = require("jsonwebtoken");

// user auth verify
const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, email } = decode;
    req.userId = userId;
    req.email = email;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = checkLogin;
