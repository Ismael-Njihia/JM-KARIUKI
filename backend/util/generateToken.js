import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret =process.env.JWT_SECRET
console.log(secret);

const generateToken = (res, userId)=>{
 const token = jwt.sign({userId}, secret, {expiresIn: '30d'});

 res.cookie("token", token, {
    httpOnly: true,
    maxAge: 20 * 24 * 60 * 60 * 1000, //20 days
    sameSite: "strict"
 })
}

export default generateToken;