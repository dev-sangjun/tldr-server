const router = require("express").Router();
const User = require("../models/User");
router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  user.save(err => {
    if (err) {
      console.log(err);
      next(err);
    }
  });
  res.json(user);
});

module.exports = router;
