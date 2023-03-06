const { request,response} = require('express');
const Recipe = require('../models/recipe');

const storeRecipes = async (req, res = response) => {
    const recipes = req.body;
    //console.log(req);
    try {        
        await Recipe.deleteMany({});

        recipes.forEach(async recipe => {
            const newRecipe = {
                name: recipe.name,
                description: recipe.description,
                imagePath: recipe.imagePath,
                ingredients: recipe.ingredients
            };

            const recipeDB = new Recipe(newRecipe);
            await recipeDB.save();
        });

        res.status(200).json({
            msg: "Store recipe ok"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal error'
        });
    }
}

const fetchRecipes = async (req = request, res = response) => {
    const {auth} = req.query;
    //console.log('TOKEN', auth);
    try {
        //console.log('FETCH RECIPES');
        const recipes = await Recipe.find();
        //console.log('RECIPES', recipes);
        res.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal error'
        })
    }    
}

module.exports = {
    storeRecipes,
    fetchRecipes
}