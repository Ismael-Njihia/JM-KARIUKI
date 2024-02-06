import express from 'express';
const router = express.Router();
import {admin, doctor, auth} from "../middleware/authMiddleware.js"
import { getAllmedical, createMedical } from '../controller/medicalController.js';

router.route('/').get(auth, getAllmedical);
router.route('/').post(auth, doctor, createMedical);

export default router;