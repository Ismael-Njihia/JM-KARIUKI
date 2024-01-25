import express from 'express';
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoute);


app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})
