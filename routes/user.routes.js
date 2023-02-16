const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Recommendation = require("../models/Recommendation");
const User = require("../models/User");
const { uploader, cloudinary } = require("../config/cloudinary");

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const {
    userName,
    firstName,
    lastName,
    country,
    occupation,
    email,
    password,
  } = req.body;

  // let profileBody = {
  //   userName: userName,
  //   firstName: firstName,
  //   lastName: lastName,
  //   country: country,
  //   occupation: occupation,
  //   email: email,
  //   password: password,
  // }

  if (userName === "") {
    res.render("signup.hbs", { message: "Username cannot be empty" });
    return;
  }
  if (password.length < 8) {
    res.render("signup.hbs", {
      message: "Password has to be minimum 8 characters",
    });
    return;
  }

  User.findOne({ userName }).then((userFromDB) => {
    console.log(userFromDB);
    if (userFromDB !== null) {
      res.render("signup.hbs", { message: "Username is already taken" });
    } else {
      let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      if (!regexPass.test(password)) {
        res.render("signup.hbs", {
          message:
            "Password needs to have at least one Upppercase letter, one number and be 8 characters long at least",
        });
        return;
      }
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      console.log(hash);

      User.create({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        country: country,
        occupation: occupation,
        email: email,
        password: hash,
      })
        .then((createdUser) => {
          console.log(createdUser);
          res.redirect("/login");
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});


//   User.findOne({ userName: userName })
//     .then((result) => {
//       if (result) {
//         let isMatching = bcrypt.compareSync(password, result.password);
//         if (isMatching) {
//           req.session.user? = result;
//           res.redirect("/myaccount");
//         } else {
//           res.render("login", {
//             message: "Hey hey! Seems like your forgot your password.",
//           });
//         }
//       } else {
//         res.render("login", {
//           message: "Hey hey! Seems like your forgot your password.",
//         });
//       }
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
/* GET myAccount */


router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post("/login", (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName.length || !password.length) {
    res.render("login", {
      message: "Hey hey! Seems like you forgot to fill out all the fields!",
    });
    return;
  }

  User.findOne({ userName: userName })
    .then((result) => {
      if (result) {
        let isMatching = bcrypt.compareSync(password, result.password);
        if (isMatching) {
          req.session.user = result;
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

/* GET createRecommendation */
router.get("/create", (req, res, next) => {
  let user = req.session.user?._id
  res.render("create", {user: user});
});

router.post(
  "/create",
  uploader.single("image"),
  (req, res, next) => {
    console.log(req.file);
    // let imgPath;
    // if (req.file.path === undefined) {
    //   imgpath =
    //     "https://www.nccer.org/images/default-source/icons/default-event-thumb.jpg?sfvrsn=2ceb314f_2";
    // } else {
    //   imgPath = req.file.path;
    // }
    const { title, description, tags, category, link } = req.body;
    const imgPath = req.file.path;
    console.log(req.body);

    Recommendation.create({
      title,
      link,
      tags,
      category,
      description,
      imgPath,
      user: req.session.user?._id,
    })
      .then((createdRecommendation) => {
        console.log(createdRecommendation);
        res.redirect("/myaccount");
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.get("/myaccount", (req, res, next) => {
  let user = req.session.user
  Recommendation.find({ category: "accomodation", user: req.session.user?._id})
    .then((accomodations) => {
      Recommendation.find({ category: "courses", user: req.session.user?._id }).then((courses) => {
        Recommendation.find({ category: "events", user: req.session.user?._id }).then((socialLife) => {
          res.render("myaccount", { accomodations, courses, socialLife, user: user });
        });
      });
    })
    .catch((error) => next(error));
});
// router.get("/recommendation/delete/:id", (req, res, next) => {
//   Recommendation.findByIdAndDelete(req.params.id)
//     .then(deletedrecommendation => {
//       if (deletedrecommendation.imgPath) {
//         // delete the image on cloudinary
//         cloudinary.uploader.destroy(deletedrecommendation.publicId)
//       }
//       res.redirect("/")

// // Edit Cards
// router.get("/created/:id/edit-create", async (req, res, next) => {
//   const { link, title, description, tags, category, imgPath } = req.body;

//   Recommendation.findById(req.params.id, {
//     link,
//     title,
//     description,
//     tags,
//     category,
//     imgPath,
//   })
//     .then(() => {
//       // Redirect to card details route
//       res.redirect(`/created/:id/edit-created/${req.params.id}`);
//     })
//     .catch((err) => next(err));
// });
// Delete cards
router.get("/created/:id/delete", (req, res, next) => {
  Recommendation.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/myaccount");
    })
    .catch((err) => next(err));
});



module.exports = router;
