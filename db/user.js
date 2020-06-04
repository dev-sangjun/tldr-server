const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");
const createUser = (email, password) =>
  new Promise((resolve, reject) => {
    User.countDocuments({ email })
      .then(count => {
        if (count > 0)
          return reject(new Error("This email is already registered."));
        const user = new User({ email, password });
        user
          .save()
          .then(_user => resolve(_user))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

const authenticateUser = (email, password) =>
  new Promise((resolve, reject) => {
    User.findOne({ email }).then(user => {
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
