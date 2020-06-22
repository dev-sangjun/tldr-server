const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

const createUser = (username, email, password) =>
  new Promise((resolve, reject) => {
    User.countDocuments({ username })
      .then(count => {
        if (count > 0)
          return reject(new Error("This username is already registered."));
        const user = new User({ username, email, password });
        user
          .save()
          .then(_user => resolve(_user))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

const authenticateUser = (username, password) =>
  new Promise((resolve, reject) => {
    User.findOne({ username })
      .sort({})
      .then(user => {
        if (!user) return reject(new Error("User not found."));
        user.comparePassword(password, (err, result) => {
          if (err) return reject(err);
          resolve(result ? user : null);
        });
      });
  });
module.exports = {
  createUser,
  authenticateUser,
};
