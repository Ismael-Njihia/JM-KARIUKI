import express from 'express';
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js';
import appointRoute from './route/appointRoute.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/appointments', appointRoute);


app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})
