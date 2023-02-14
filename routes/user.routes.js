const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Recommendation = require("../models/Recommendation");

/* GET home page */

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

/* GET login */
router.get("/login", (req, res, next) => {
  res.render("login");
});

/* POST login */
router.post("/login", (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName.length || !password.length) {
    res.render("login", {
      message: "Hey hey! Seems like you forgot to fill out all the fields!",
    });
    return;
  }

  User.findOne({ username: userName })
    .then((result) => {
      if (result) {
        let isMatching = bcrypt.compareSync(password, result.password);
        if (isMatching) {
          req.session.loggedInUser = result;
          res.redirect("/myaccount");
        } else {
          res.render("login", {
            message: "Hey hey! Seems like your forgot your password.",
          });
        }
      } else {
        res.render("login", {
          message:
            "Hey hey! Seems like we do not know this username, try again with a different username or sign up for free!",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});
/* GET myAccount */
router.get("/myaccount", (req, res, next) => {
  res.render("myaccount");
});

/* GET createRecommendation */
router.get("/create", (req, res, next) => {
  res.render("create");
});

// POST my Account
router.post("/recommendation/create", (req, res, next) => {
  console.log(req.body);
  const { link, title, description, tags, comment, rate } = req.body;

  Recommendation.create({ link, title, description, tags, comment, rate })
    .then((createdRecommendation) => {
      console.log(createdRecommendation);
      // Redirect to celebrity details route
      res.redirect(`/myaccount`);
    })
    .catch((err) => next(err));
});

// Delete Recommendation
router.post("/recommendation/:id/delete", (req, res, next) => {
  Recommendation.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/myaccount");
    })
    .catch((err) => next(err));
});
// router.get("/myaccount/add", (req, res, next) => {
//   res.render("myaccount/add");
// });

module.exports = router;
