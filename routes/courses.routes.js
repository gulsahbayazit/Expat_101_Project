const router = require("express").Router();
const Recommendation = require("../models/Recommendation");

// router.get("/courses", (req, res, next) => {
//   res.render("courses");
// });
router.get("/courses", (req, res, next) => {
  Recommendation.find({ category: "courses" }).then((courses) => {
    res.render("courses", { courses: courses });
  });
});
module.exports = router;
