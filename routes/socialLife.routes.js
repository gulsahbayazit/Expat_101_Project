const router = require("express").Router();
const SocialLife = require("../models/Recommendation");

router.get("/social-life", (req, res, next) => {
  res.render("social-life");
});

module.exports = router;
