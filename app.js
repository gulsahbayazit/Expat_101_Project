// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const app = express();

// Register partials to use them with handlebars
hbs.registerPartials(__dirname + "/views/partials");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Expat_101";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
// Session for user name
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const accomodationRoutes = require("./routes/accomodation.routes");
app.use("/", accomodationRoutes);

const coursesRoutes = require("./routes/courses.routes");
app.use("/", coursesRoutes);

const socialLifeRoutes = require("./routes/socialLife.routes");
app.use("/", socialLifeRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
