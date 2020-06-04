const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    // check if the token is valid
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        next(err);
      }
      // the token is valid
      next();
    });
  } else next(new Error("Access denied."));
};
