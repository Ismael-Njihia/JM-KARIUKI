import express from 'express';
import { getAllMessages, createMessage, getMessagesByAppointId} from '../controller/messageController.js';
import { admin,doctor,auth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get(auth, getAllMessages);
router.route('/create').post(auth, createMessage);
router.route('/:appointId').get(auth, getMessagesByAppointId);

export default router;