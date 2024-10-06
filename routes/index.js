const express = require("express");
const { getAllRecipes, getRecipeByID } = require("../controllers/recipe");

const router = express.Router();

/* ************************************
  HOME ROUTE 
 ************************************** */
router.get("/", (req, res) => {
  res.send("Culinary Crafter API");
});

/* ************************************
  GET ALL RECIPE ROUTE 
 ************************************** */
router.get("/recipes", getAllRecipes);

/* ************************************
  GET RECIPE BY ID 
 ************************************** */
router.get("/recipes/:ID", getRecipeByID)

/* ************************************
  POST CREATE NEW RECIPE 
 ************************************** */

module.exports = router;
