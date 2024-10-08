const express = require("express");
const {
  getAllRecipes,
  getRecipeByID,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe");

const router = express.Router();

/* ************************************
  HOME ROUTE 
 ************************************** */
router.get("/", (req, res) => {
  res.send("Culinary Crafter API");
});

router.use("/", require("./swagger"));

/* ************************************
  GET ALL RECIPE ROUTE 
 ************************************** */
router.get("/recipes", getAllRecipes);

/* ************************************
  GET RECIPE BY ID 
 ************************************** */
router.get("/recipes/:ID", getRecipeByID);

/* ************************************
  POST CREATE NEW RECIPE 
 ************************************** */
router.post("/recipes", createNewRecipe);

/* ************************************
  PUT UPDATE RECIPE
 ************************************** */
router.put("/update/:ID", updateRecipe);

/* ************************************
  PUT UPDATE RECIPE
 ************************************** */
router.delete("/delete/:ID", deleteRecipe);

module.exports = router;
