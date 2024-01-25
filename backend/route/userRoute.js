import express from 'express';
const router = express.Router();

import { getAllUsers,register,login, getUserById, deleteUserById, logout } from '../controller/userController.js';

router.route('/').get(getAllUsers);
router.route('/logout').get(logout);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').get(getUserById);
router.route('/:id').delete(deleteUserById);



export default router;