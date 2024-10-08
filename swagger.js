const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contact API", // Title of your API
    description: "This API is used get and and comment on recipes", // Short description of your API
    version: "1.0.0", // Version of your API
    contact: {
      name: "Goodness Okafor",
      email: "goodnessokafor462@gmail.com",
    },
  },
  host: "localhost:5000", // Hostname for the API
  basePath: "/", // Base path for the API
  schemes: ["http", "https"], // Supported schemes (http, https)
  consumes: ["application/json"], // Request content types
  produces: ["application/json"], // Response content types
};

const outputFile = "./swagger.json"; // Path where the generated Swagger JSON will be saved
const endpointsFiles = ["./routes/index.js"]; // Array of your route files

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);
