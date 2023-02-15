const router = require("express").Router();
const Recommendation = require("../models/Recommendation");

router.get("/accomodation", (req, res, next) => {
  Recommendation.find({ category: "accomodation" }).then((accomodations) => {
    res.render("accomodation", { accomodations: accomodations });
  });
});

module.exports = router;
