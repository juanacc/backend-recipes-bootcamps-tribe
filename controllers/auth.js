const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');

const signup = async (req, res = response) => {
    const {email, password} = req.body;

    const user = new User({email, password});

    try {
        //Encrypt password
        const salt = bcryptjs.genSaltSync(); 
        user.password = bcryptjs.hashSync(password, salt);

        //Generate JWT
        user.idToken = await generateJWT(user.uid);

        //Save to DB
        await user.save();
        
        res.status(200).json({
            email: user.email,
            localId: user.localId,
            idToken: user.idToken,
            expiresIn: user.expiresIn
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal error'
        })
    }
}

const login = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        //Verificar si existe el usuario
        const user = await User.findOne({email});

        if(!user)
            return res.status(400).json({
                error: {
                    message:'INVALID_PASSWORD'
                }
            })
        
        //Validar password
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if(!isValidPassword)
            return res.status(400).json({
                error: {
                    message:'INVALID_PASSWORD'
                }
            })

        //Genero JWT
        const token = await generateJWT(user.id);
        
        res.status(200).json({
            email: user.email,
            localId: user.localId,
            idToken: token,
            expiresIn: user.expiresIn
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal error'
        })
    }
}

module.exports = {
    login,
    signup,
}