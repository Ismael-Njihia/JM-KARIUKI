import express from 'express';
const router = express.Router();
import {admin, doctor, auth} from "../middleware/authMiddleware.js"
import { getAllmedical } from '../controller/medicalController.js';

router.route('/').get(auth, getAllmedical);

export default router;