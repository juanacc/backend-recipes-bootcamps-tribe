const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateEmailInDB = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} is already registered`);
    }
}

const isAuthenticate = async (req = request, res = response, next) => {
    const {auth} = req.query;
    const token = auth;
    if(!token)
        return res.status(401).json('There is no token in the request');
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if(!user)
            return res.status(401).json(`There is no user with id: ${uid}`);
        next();       
    } catch (error) {
        console.log(error);
        res.status(401).json('Invalid token');
    }
}

module.exports = {
    validateEmailInDB,
    isAuthenticate
}