const router = require("express").Router(),
  User = require("../models/User"),
  { authenticateUser } = require("../db/user");

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await authenticateUser(username, password);
    if (!user) return next(new Error("User not authenticated."));
    // user is authenticated
    const token = await user.generateToken();
    res.json({ user, token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
