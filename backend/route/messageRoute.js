import express from 'express';
import { getAllMessages, createMessage } from '../controller/messageController.js';
import { admin,doctor,auth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get(auth, getAllMessages);
router.route('/create').post(auth, createMessage);

export default router;