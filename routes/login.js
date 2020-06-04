const router = require("express").Router(),
  User = require("../models/User"),
  { authenticateUser, addToken } = require("../db/user");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    if (!user) return next(new Error("User not authenticated."));
    // user is authenticated
    const token = await addToken(user);
    res.json({
      user,
      token,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
