const { connectToDB, getClient } = require("./connectDB");
const { ObjectId } = require("mongodb");

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

    const recipe = await collection.findOne({ _id: new ObjectId(ID) });

    return recipe;
  } catch (error) {
    throw new Error(`Failed to retrive contact with ID ${ID}: ${error}`);
  }
}

module.exports = { getRecipe, recipeByID };
