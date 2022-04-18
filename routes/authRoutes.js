import express from 'express';
const router = express.Router();

import {
   register,
   login,
   updateUser,
   getUser,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

// '/api/v1/auth'
router.route('/getUser').get(authenticateUser, getUser);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
