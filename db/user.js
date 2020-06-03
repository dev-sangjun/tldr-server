const User = require("../models/User");

const createUser = (email, password) =>
  new Promise((resolve, reject) => {
    User.countDocuments({ email })
      .then(count => {
        if (count > 0) reject(new Error("This email is already registered."));
        const user = new User({ email, password });
        user
          .save()
          .then(doc => resolve(doc))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

module.exports = {
  createUser,
};
