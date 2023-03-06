const {Router} = require('express');
const {check} = require('express-validator'); 
const {login, signup} = require('../controllers/auth');
const {validateEmailInDB} = require('../middlewares/db-validators');
const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

router.post('/signup', 
    [
        check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
        check('email', 'The email is not valid').isEmail(),
        check('email').custom(validateEmailInDB), 
        validateFields
    ],
    signup);
    
router.post('/login', 
    [
        check('email', 'Email is required'),
        check('password', 'Password is required'),
        validateFields
    ],
    login);

module.exports = router;
