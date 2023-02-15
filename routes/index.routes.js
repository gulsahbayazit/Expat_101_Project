const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.js");
const RecommendationModel = require("../models/Recommendation.js");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
