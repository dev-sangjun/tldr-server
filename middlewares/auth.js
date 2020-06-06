const jwt = require("jsonwebtoken"),
  User = require("../models/User"),
  JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader);
  if (token) {
    // check if the token is valid
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return next(err);
      // the token is valid
      // check if this token is the user's
      const { user_id } = payload;
      User.findOne({ _id: user_id, "tokens.token": token })
        .then(user => {
          if (!user) return next(new Error("Invalid token: User not found."));
          user.populate("posts").execPopulate((er, result) => {
            if (err) return next(err);
            if (result) {
              req.user = user;
              req.token = token;
            }
            next();
          });
        })
        .catch(err => next(err));
    });
  } else next(new Error("Access denied."));
};
