const Joi = require("@hapi/joi");

const recipeSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(), // Array of strings for ingredients
  steps: Joi.array().items(Joi.string()).required(), // Array of strings for steps
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()), // Array of strings for tags
  prepTime: Joi.number().required(), // Number for prep time (in minutes)
  cookTime: Joi.number().required(), // Number for cook time (in minutes)
  servings: Joi.number().required(), // Number of servings
  author: Joi.string().required(), // Author's name as a string
  comments: Joi.array().items(Joi.object({})), // Empty array for comments (could define more details if needed)
});

module.exports = { recipeSchema };
