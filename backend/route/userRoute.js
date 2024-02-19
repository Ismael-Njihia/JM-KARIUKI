import express from 'express';
const router = express.Router();

import { getAllUsers,
    register,login,
     getUserById, 
     deleteUserById, 
     logout,
     editUser,
    getAppointmentsOfaDoc} from '../controller/userController.js';

router.route('/').get(getAllUsers);
router.route('/logout').get(logout);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').get(getUserById);
router.route('/:id').delete(deleteUserById);
router.route('/:id/appointments').get(getAppointmentsOfaDoc);
router.route('/:id').put(editUser);



export default router;