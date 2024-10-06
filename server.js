const express = require("express");
const routes = require("./routes/");
const { connectToDB } = require("./model/connectDB");

const app = express();
const port = process.env.PORT;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

/* *****************************************
 * ROUTES
 ******************************************* */
app.use("/", routes);

/* *****************************************
 * START SERVER AND C0NNECT TO DATABASE
 ******************************************* */

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  connectToDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
});
