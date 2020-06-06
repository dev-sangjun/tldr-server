const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  Schema = mongoose.Schema,
  JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
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
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

/* 
  SETUP RELATIONSHIPS
*/
userSchema.virtual("folders", {
  ref: "Folder",
  localField: "_id",
  foreignField: "author",
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

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

userSchema.methods.generateToken = async function () {
  const payload = {
    user_id: this.id.toString(),
  };
  const options = {
    expiresIn: 3600,
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// hides private data
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
