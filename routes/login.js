const router = require("express").Router(),
  User = require("../models/User"),
  { authenticateUser } = require("../db/user");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    if (!user) return next(new Error("User not authenticated."));
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
