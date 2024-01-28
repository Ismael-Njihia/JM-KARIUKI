import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '../../db/prisma.js';
import asyncHandler from '../middleware/asyncHandler.js';

dotenv.config();
const secret = process.env.JWT_SECRET;

const auth = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
    try {
        const decoded = jwt.verify(token, secret);

        const user = await prisma.user.findUnique({where: {userId: decoded.userId}});

        if(!user){
            res.status(404).json({error: "user not Found"})
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error is here!", error)
        res.status(401).json({error: "Unauthorized, Invalid Token!"})
        
    }
})

//for the admin
const admin = asyncHandler(async(req,res,next) =>{
    if(req.user && req.user.userType === "admin"){
        next()
    }
    else{
        res.status(401).json({error: "unauthorized as an admin"});
        return;
    }
})

//for the doctor
const doctor = asyncHandler(async(req, res, next)=>{
    if(req.user && req.user.userType === "doctor"){
        next()
    }else{
        res.status(401).json({error: "unauthorized as a Doctor"})
        return;
    }
})

export {doctor, auth, admin}