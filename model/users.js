const { getClient } = require("./connectDB");
const createErrors = require("http-errors");

async function createUser(newUser) {
  try {
    const client = await getClient();
    const database = client.db("culinary-crafter-api");
    const collection = database.collection("users");
    let user = await collection.findOne({ id: newUser.id });
    if (user) {
      return user;
    } else {
      user = await collection.insertOne(newUser);
      return user;
    }
  } catch (error) {
    throw new createErrors(500, `Failed to create user: ${error.message}`);
  }
}

async function findById(id) {
  try {
    const client = await getClient();
    const database = client.db("culinary-crafter-api");
    const collection = database.collection("users");
    let user = await collection.findOne({ id: id });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new createErrors(500, `Failed to find user: ${error.message}`);
  }
}

module.exports = { createUser, findById };
