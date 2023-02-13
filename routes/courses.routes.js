const router = require("express").Router();
const Courses = require("../models/Recommendation");

router.get("/courses", (req, res, next) => {
  res.render("courses");
});
module.exports = router;
