const { request,response} = require('express');
const Recipe = require('../models/recipe');

//# INI - Controladores para app Angular
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
                ingredients: recipe.ingredients,
                userEmail: 'angular-app@angular.com'
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
            msg: 'There is something wrong that is not right :)'
        });
    }
}

const fetchRecipes = async (req = request, res = response) => {
    const {auth} = req.query;
    //console.log('TOKEN', auth);    
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        })
    }    
}
//# FIN - Controladores para app Angular

//# INI - Controladores para app React
const addRecipe = async (req = request, res = response) => {
    const recipe = req.body;
    const userEmail = req.userEmail;
    
    try {        
        const newRecipe = {
            name: recipe.name,
            description: recipe.description,
            imagePath: recipe.imagePath,
            ingredients: recipe.ingredients,
            userEmail: userEmail
        };
        const recipeDB = new Recipe(newRecipe);
        await recipeDB.save();
        res.status(200).json({
            msg: "Store recipe ok"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        });
    }
}

const getRecipes = async (req = request, res = response) => {
    const userEmail = req.userEmail;
    
    try {
        const recipes = await Recipe.find({userEmail});
        res.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        })
    }
}

const editRecipe = async (req = request, res = response) => {
    const {userEmail, __v, _id, ...recipeToUpdate} = req.body;
    const {id} = req.params;
    try {
        const updatedRecipe = {
            ...(recipeToUpdate.name && {name: recipeToUpdate.name}),
            ...(recipeToUpdate.description && {description: recipeToUpdate.description}),
            ...(recipeToUpdate.ingredients && {ingredients: recipeToUpdate.ingredients}),
            ...(recipeToUpdate.imagePath && {imagePath: recipeToUpdate.imagePath})
        }

        await Recipe.findByIdAndUpdate(id, updatedRecipe);
        res.status(200).json({msg: 'Update recipe ok'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        });
    }
}

const deleteRecipe = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({msg: 'Delete recipe ok'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There is something wrong that is not right :)'
        });
    }
}
//# FIN - Controladores para app React

module.exports = {
    storeRecipes,
    fetchRecipes,
    addRecipe,
    getRecipes,
    deleteRecipe,
    editRecipe,
}