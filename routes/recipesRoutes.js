import express from 'express';
const router = express.Router();

import {
   createRecipe,
   deleteRecipe,
   getAllRecipes,
   updateRecipe,
   showStats,
} from '../controllers/recipesController.js';

//'/api/v1/recipes'
router.route('/').post(createRecipe).get(getAllRecipes);
router.route('/stats').get(showStats);

router.route('/:id').delete(deleteRecipe).patch(updateRecipe);

export default router;
