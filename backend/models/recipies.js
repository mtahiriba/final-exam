const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    ingredients: String,
    instructions: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);