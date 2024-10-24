const express = require("express");
const {
  getAllRecipes,
  getRecipeByID,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe");
const { getProfile } = require("../controllers/users");
const { ensureAuth } = require("../controllers/auth");

const router = express.Router();

/* ************************************
  HOME ROUTE 
 ************************************** */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({
      message: "Welcome to the Recipe API",
    });
  } else {
    res.send({
      message: "Welcome to the Recipe API",
      loginGithub: "https://culinary-crafter-api.onrender.com/auth/github",
      loginGoogle: "https://culinary-crafter-api.onrender.com/auth/google",
    });
  }
});

router.use("/", require("./swagger"));

/* ************************************
  GET ALL RECIPE ROUTE 
 ************************************** */
router.get("/recipes", ensureAuth, getAllRecipes);

/* ************************************
  GET RECIPE BY ID 
 ************************************** */
router.get("/recipes/:ID", ensureAuth, getRecipeByID);

/* ************************************
  POST CREATE NEW RECIPE 
 ************************************** */
router.post("/recipes", ensureAuth, createNewRecipe);

/* ************************************
  PUT UPDATE RECIPE
 ************************************** */
router.put("/update/:ID", ensureAuth, updateRecipe);

/* ************************************
  PUT UPDATE RECIPE
 ************************************** */
router.delete("/delete/:ID", ensureAuth, deleteRecipe);

/* ************************************
  PROFILE ROUTE
 ************************************** */
router.get("/profile", ensureAuth, getProfile);

/* ************************************
  LOGOUT ROUTE
 ************************************** */
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/"); // Redirect after logout
  });
});

module.exports = router;
