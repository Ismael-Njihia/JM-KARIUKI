import express from 'express';
const router = express.Router();
import { admin,doctor,auth } from "../middleware/authMiddleware.js";

import {getVideoMeeting, createVideoMeeting, validateVideoMeeting} from '../controller/videoMeetingController.js';

router.route('/').get( auth, getVideoMeeting);
router.route('/').post( auth, createVideoMeeting);
router.route('/validate/:id').post( auth, validateVideoMeeting);

export default router;