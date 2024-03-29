import express from 'express';
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js';
import appointRoute from './route/appointRoute.js';
import healthRoute from './route/healthRoute.js';
import cookieParser from 'cookie-parser';
import medicalRoute from './route/medicalRoute.js'
import messageRoute from './route/messageRoute.js';
import videoRoute from './route/videoMeetingController.js';
import morgan from 'morgan';

const app = express();
app.use(cookieParser());
app.use(morgan('dev'));
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/appointments', appointRoute);
app.use('/api/health', healthRoute);
app.use('/api/medical', medicalRoute);
app.use('/api/messages', messageRoute);
app.use('/api/videoMeeting', videoRoute);


app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})
