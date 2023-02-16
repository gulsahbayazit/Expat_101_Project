const router = require("express").Router();
const Recommendation = require("../models/Recommendation");

router.get("/accomodation", (req, res, next) => {
  let user = req.session.user?._id
  Recommendation.find({ category: "accomodation" }).then((accomodations) => {
    res.render("accomodation", { accomodations: accomodations,user: user });
  });
});

module.exports = router;
