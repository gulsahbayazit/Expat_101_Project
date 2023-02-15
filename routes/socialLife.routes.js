const router = require("express").Router();
const SocialLife = require("../models/Recommendation");

router.get("/sociallife", (req, res, next) => {
  res.render("socialLife");
});
router.get("/socialLife", (req, res, next) => {
  Recommendation.find({ category: "events" }).then((accomodations) => {
    res.render("socialLife", { socialLife: socialLife });
  });
});

module.exports = router;
