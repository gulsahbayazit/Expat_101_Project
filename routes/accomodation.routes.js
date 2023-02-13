const router = require("express").Router();
const Accomodation = require("../models/Recommendation");

router.get("/accomodation", (req, res, next) => {
  res.render("accomodation");
});

module.exports = router;
