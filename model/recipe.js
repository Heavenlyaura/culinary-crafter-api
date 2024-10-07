const { connectToDB, getClient } = require("./connectDB");
const { ObjectId } = require("mongodb");
const createErrors = require("http-errors");

async function getRecipe() {
  try {
    const client = await getClient();
    const database = client.db("culinary-crafter-api");
    const collection = database.collection("recipes");

    const recipes = await collection.find({}).toArray();
    return recipes;
  } catch (error) {
    console.error(error);
  }
}

async function recipeByID(ID) {
  try {
    const client = await getClient();
    const database = client.db("culinary-crafter-api");
    const collection = database.collection("recipes");

    if (!ObjectId.isValid(ID)) {
      throw new createErrors(400, "Invalid ID format");
    }

    const recipe = await collection.findOne({ _id: new ObjectId(ID) });

    return recipe;
  } catch (error) {
    console.error(error);
    throw new createErrors(error);
  }
}

async function createRecipe(
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
) {
  try {
    const client = await getClient();
    const database = client.db("culinary-crafter-api");
    const collection = database.collection("recipes");

    const newRecipe = {
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
    };

    const insertRecipe = await collection.insertOne(newRecipe);
    console.log(insertRecipe);
    return insertRecipe.insertedId;
  } catch (error) {
    throw new createErrors(500, `Failed to add new recipe: ${error}`);
  }
}

async function recipeUpdate(
  id,
  {
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
  }
) {
  try {
    const client = await getClient();
    const database = client.db("culinary-crafter-api");
    const collection = database.collection("recipes");

    const schema = {
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
    };

    if (!ObjectId.isValid(id)) {
      throw new createErrors(400, "Invalid ID format");
    }
    const updateRecipe = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: schema }
    );

    if (updateRecipe.matchedCount === 0) {
      throw new createErrors(404, `Recipe with id ${id} not found`);
    }

    return updateRecipe;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw new createErrors(error);
  }
}

async function recipeDelete(ID) {
  try {
    const client = await getClient();
    const database = client.db("culinary-crafter-api");
    const collection = database.collection("recipes");

    if (!ObjectId.isValid(ID)) {
      throw new createErrors(400, "Invalid ID format");
    }
    const remove = await collection.deleteOne({ _id: new ObjectId(ID) });

    return remove;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw new createErrors(error);
  }
}

module.exports = {
  getRecipe,
  recipeByID,
  createRecipe,
  recipeUpdate,
  recipeDelete,
};
