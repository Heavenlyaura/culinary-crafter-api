const {
  getRecipe,
  recipeByID,
  createRecipe,
  recipeUpdate,
  recipeDelete,
} = require("../model/recipe");
const createErrors = require("http-errors");

/* ************************************
    GET ALL RECIPES
 ************************************** */
async function getAllRecipes(req, res, next) {
  //#swagger.tags=["Recipe"]
  try {
    const recipes = await getRecipe();
    res.status(200).json({ results: recipes });
  } catch (error) {
    return next(error);
  }
}

/* ************************************
  GET RECIPE BY ID
 ************************************** */
async function getRecipeByID(req, res, next) {
  //#swagger.tags=["Recipe"]

  try {
    const ID = req.params.ID;
    const recipe = await recipeByID(ID);
    console.log(recipe);

    // Check if the recipe is found
    if (!recipe) {
      return next(new createErrors(404, `Recipe with ID ${ID} not found`));
    }

    res.status(200).json({ results: recipe });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

/* ************************************
  POST CREATE NEW RECIPE
 ************************************** */
async function createNewRecipe(req, res, next) {
  //#swagger.tags=["Recipe"]
  try {
    const {
      title,
      description,
      ingredients,
      steps,
      category,
      tags,
      prepTime,
      cookTime,
      servings,
      author,
      comments,
    } = req.body;

    const newRecipe = await createRecipe(
      title,
      description,
      ingredients,
      steps,
      category,
      tags,
      prepTime,
      cookTime,
      servings,
      author,
      comments
    );

    if (!newRecipe) {
      return res.status(400).json({ message: "Recipe not created" });
    }

    res
      .status(201)
      .json({ message: `Recipe created successfully with ID ${newRecipe}` });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return next(error);
  }
}

/* ************************************
  PUT UPDATE RECIPE
 ************************************** */
async function updateRecipe(req, res, next) {
  //#swagger.tags=["Recipe"]
  try {
    const ID = req.params.ID;
    const {
      title,
      description,
      ingredients,
      steps,
      category,
      tags,
      prepTime,
      cookTime,
      servings,
      author,
      comments,
    } = req.body;

    const update = await recipeUpdate(ID, {
      title,
      description,
      ingredients,
      steps,
      category,
      tags,
      prepTime,
      cookTime,
      servings,
      author,
      comments,
    });

    if (update.modifiedCount === 0) {
      return res.status(204).send();
    }

    return res
      .status(200)
      .json({ result: `Recipe with ID ${ID} has been updated successfully` });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return next(error);
  }
}

/* ************************************
  DELETE DELETE RECIPE
 ************************************** */
async function deleteRecipe(req, res, next) {
  //#swagger.tags=["Recipe"]
  try {
    const ID = req.params.ID;
    const remove = await recipeDelete(ID);

    if (remove.deletedCount === 0) {
      throw new createErrors(404, `Recipe with ID:${ID} not found`);
    }
    res
      .status(200)
      .json({ results: `Recipe with ${ID} has been sucessfully deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllRecipes,
  getRecipeByID,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
};
