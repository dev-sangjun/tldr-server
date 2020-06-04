const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  validator = require("validator"),
  Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const hash = async password => {
  return await new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashPassword = await hash(user.password);
    user.password = hashPassword;
    next();
  }
});

userSchema.methods.comparePassword = function (pw, callback) {
  bcrypt.compare(pw, this.password, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = mongoose.model("User", userSchema);
