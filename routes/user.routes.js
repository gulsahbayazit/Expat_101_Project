
const express = require('express');
const router = express.Router();

/* GET home page */

router.get("/signup", (req, res, next) => {
  res.render("signup");
});
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.get("/myaccount", (req, res, next) => {
  res.render("myaccount");
});
router.get("/myaccount/add", (req, res, next) => {
  res.render("myaccount/add");
});

module.exports = router;
