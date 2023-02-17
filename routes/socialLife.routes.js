const router = require("express").Router();
const Recommendation = require("../models/Recommendation");

router.get("/socialLife", (req, res, next) => {
  let user = req.session.user?._id;

  Recommendation.find({ category: "events" }).then((socialLife) => {
    res.render("socialLife", { socialLife: socialLife, user: user });
  });
});

module.exports = router;
