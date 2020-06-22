const jwt = require("jsonwebtoken"),
  User = require("../models/User"),
  Folder = require("../models/Folder"),
  JWT_SECRET = process.env.JWT_SECRET,
  JWT_REFRESH = process.env.JWT_REFRESH;

module.exports = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    // check if the token is valid
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        // check if the token is a refresh token
        jwt;
        return next(err);
      }
      // the token is valid
      // check if this token is the user's
      const { user_id } = payload;
      User.findOne({ _id: user_id, "tokens.token": token })
        .then(async user => {
          if (!user) return next(new Error("Invalid token: User not found."));
          try {
            await user.populate("posts").execPopulate();
            await user
              .populate({ path: "folders", populate: { path: "posts" } })
              .execPopulate();
            req.user = user;
            req.token = token;
            next();
          } catch (e) {
            next(e);
          }
        })
        .catch(err => next(err));
    });
  } else next(new Error("Access denied."));
};
