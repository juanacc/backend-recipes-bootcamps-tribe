const {Router} = require('express');
const {storeRecipes, fetchRecipes} = require('../controllers/recipes');
const {isAuthenticate} = require('../middlewares/db-validators');
const {validateFields, validateAddRecipes} = require('../middlewares/validate-fields');

const router = Router();

router.put('/', isAuthenticate,  validateAddRecipes, storeRecipes);
router.get('/', isAuthenticate, fetchRecipes);

module.exports = router;