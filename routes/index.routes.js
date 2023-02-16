const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.js");
const RecommendationModel = require("../models/Recommendation.js");


/* GET home page */
router.get("/", (req, res, next) => {
  let user = req.session.user?._id
  console.log("this is the user", user)
 res.render("index",{user:user});
});
router.get("/about", (req, res, next) => {
  let user = req.session.user?._id

  res.render("about",{user: user});
});

router.get("/index/logout", (req, res, next) => {
  req.session.destroy()
  res.redirect("/");
});


module.exports = router;
