const _jwt = require('jsonwebtoken')
const jwt = process.env.JWT;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(req.headers);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = _jwt.verify(token, jwt);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
