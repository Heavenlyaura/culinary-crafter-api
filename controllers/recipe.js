const { getRecipe, recipeByID } = require("../model/recipe");

/* ************************************
    GET ALL RECIPES
 ************************************** */
async function getAllRecipes(req, res) {
  try {
    const recipes = await getRecipe();
    console.log(recipes);
    res.status(200).json({ results: recipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
}

/* ************************************
  GET RECIPE BY ID
 ************************************** */
async function getRecipeByID(req, res) {
  try {
    const ID = req.params.ID;
    const recipe = await recipeByID(ID);
    console.log(recipe);
    res.status(200).json({ results: recipe });
  } catch (error) {}
}

module.exports = { getAllRecipes, getRecipeByID };
