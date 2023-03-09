const {Router} = require('express');
const {check} = require('express-validator');
const {storeRecipes, fetchRecipes, addRecipe, getRecipes, deleteRecipe, editRecipe} = require('../controllers/recipes');
const {isAuthenticate, validatePermisionForAction} = require('../middlewares/db-validators');
const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

//# INI - Controladores para app Angular
router.put('/', isAuthenticate, storeRecipes);
router.get('/', isAuthenticate, fetchRecipes);
//# FIN - Controladores para app Angular

//# INI - Controladores para app React
router.post('/add', 
    [
        isAuthenticate,
        check('name', 'The recipe name is required').notEmpty(),
        check('description', 'The recipe description is required').notEmpty(),
        check('description', 'The description of the recipe must have at least one letter').isLength({ min: 1 }),
        check('imagePath', 'The recipe image path is required').notEmpty(),         
        validateFields
    ], 
    addRecipe);
router.get('/get', isAuthenticate, getRecipes);
router.delete('/delete/:id', [isAuthenticate, validatePermisionForAction], deleteRecipe);
router.put('/edit/:id', [isAuthenticate, validatePermisionForAction], editRecipe);
//# FIN - Controladores para app React

module.exports = router;