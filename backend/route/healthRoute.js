import express from 'express';
const router = express.Router();
import { admin,doctor,auth } from "../middleware/authMiddleware.js";

import {getAllHealth, createHealthRecord, editHealthRecord} from '../controller/healthController.js';

router.route('/').get( auth, getAllHealth);
router.route('/create').post(auth, createHealthRecord);
router.route('/edit/:id').put(auth, editHealthRecord);

export default router;