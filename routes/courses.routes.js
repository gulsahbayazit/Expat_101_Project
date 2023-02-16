const router = require("express").Router();
const Recommendation = require("../models/Recommendation");


router.get("/courses", (req, res, next) => {
  let user = req.session.user?._id
  Recommendation.find({ category: "courses" })
  .then((courses) => {
    res.render("courses", { courses: courses,user: user});
  });
});
module.exports = router;
