const { validationResult } = require('express-validator');

const validateFields = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}

const validateAddRecipes = (req, res, next) => {
    if(Object.keys(req.body))
        return res.status(400).json({msg: "Recipe can't be empty"});
    next();
}

module.exports = {
    validateFields,
    validateAddRecipes
}