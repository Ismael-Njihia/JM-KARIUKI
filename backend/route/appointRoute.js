import express from 'express';
const router = express.Router();
import { admin,doctor,auth } from "../middleware/authMiddleware.js";
import {getAllAppointments,
    cancelAppointment,
    updateAppointment,
    editAppointment,
    deleteAppointment,
    getAppointmentById,
     createAppointment} from '../controller/appointController.js';

router.route('/').get( auth, getAllAppointments);
router.route('/create').post(auth, createAppointment);
router.route('/cancel/:id').put(auth, cancelAppointment);
router.route('/update/:id').put(auth, updateAppointment);
router.route('/edit/:id').put(auth, editAppointment);
router.route('/:id').delete(auth, deleteAppointment);
router.route('/:id').get(auth, getAppointmentById);

export default router;