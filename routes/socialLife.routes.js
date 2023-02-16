const router = require("express").Router();
const Recommendation = require("../models/Recommendation");

router.get("/socialLife", (req, res, next) => {
  Recommendation.find({ category: "events" }).then((socialLife) => {
    res.render("socialLife", { events: socialLife });
  });
});

module.exports = router;
