const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const routes = require("./routes/");
const utilities = require("./util");
const { errorHandlerToClient, notFoundErrorHandler } = require("./errors");
const { connectToDB } = require("./model/connectDB");

const { googleAuth, githubAuth } = require("./config/passport-setup");

googleAuth(passport);
githubAuth(passport);
const app = express();
const port = process.env.PORT;
// console.log(process.env.MONGODB_URI)
// console.log(mongoose.connection);

app.use(
  session({
    secret: process.env.SESSION_SECRET, // A secret key used to sign the session ID cookie
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI,
      dbName: "culinary-crafter-api",
    }),
    cookie: {
      secure: false, // Set to true if you're using https
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (optional)
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

/* *****************************************
 * ROUTES
 ******************************************* */
app.use("/", utilities.handleErrors(routes));
app.use("/auth", utilities.handleErrors(require("./routes/auth")));

app.use(notFoundErrorHandler);
app.use(errorHandlerToClient);

/* *****************************************
 * START SERVER AND C0NNECT TO DATABASE
 ******************************************* */

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
