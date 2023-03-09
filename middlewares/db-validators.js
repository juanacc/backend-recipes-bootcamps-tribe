const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Recipe = require('../models/recipe');


const validateEmailInDB = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} is already registered`);
    }
}

const isAuthenticate = async (req = request, res = response, next) => {
//Valida que el usuario este autenticado en la aplicacion
    const {auth} = req.query;
    const token = auth;
    if(!token)
        return res.status(401).json('There is no token in the request');
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if(!user)
            return res.status(401).json(`There is no user with id: ${uid}`);
        req.userEmail = user.email;
        next();       
    } catch (error) {
        console.log(error);
        res.status(401).json('Invalid token');
    }
}

const validatePermisionForAction = async (req = request, res = response, next) => {
//Valida que el usuario que esta intentando editar/eliminar una receta, sea el propietario de la receta
    const {auth} = req.query;
    const token = auth;
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const requestingUser = await User.findById(uid);
        const {id} = req.params;
        const recipeUser = await Recipe.findById(id);
        if(requestingUser.email !== recipeUser.userEmail)
            return res.status(401).json('The user does not have permission to perform the action');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json('Error in the request');
    }
}

module.exports = {
    validateEmailInDB,
    isAuthenticate,
    validatePermisionForAction
}