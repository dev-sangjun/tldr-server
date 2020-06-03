const router = require("express").Router();

router.get("/me", (req, res) => {
  res.send("Me");
});

module.exports = router;
