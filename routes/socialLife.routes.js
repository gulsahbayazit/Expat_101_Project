const router = require("express").Router();
const SocialLife = require("../models/Recommendation");

router.get("/sociallife", (req, res, next) => {
  res.render("sociallife");
});

module.exports = router;
