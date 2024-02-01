import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import uuidGenerator from "../util/uuidGenerator.js";
import encryptPassword from "../util/encryptPassword.js";
import decryptPassword from "../util/decryptPassword.js";
import generateToken from "../util/generateToken.js";

//GET ALL USERS
//GET /api/users
//Private
const getAllUsers = asyncHandler(async(req, res)=>{
    const users = await prisma.user.findMany();
    res.json(users);
})

//REGISTER USER
//Post /api/users/register
//Public
const register = asyncHandler(async(req, res)=>{
    const {email, password, firstName, lastName} = req.body;
    const timeStamp = new Date().toISOString();

    const userType = 'patient';
    const hashedPassword = await encryptPassword(password);
   
    if(!email || !password || !firstName || !lastName){
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const userId = uuidGenerator();
    //check user exists by userId
    const uniqueid = await prisma.user.findUnique({where: {userId}});
    if(uniqueid){
        res.status(400);
        throw new Error('User already exists');
    }
    //check if user exists
    const userExists = await prisma.user.findFirst({where: {email}});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await prisma.user.create({
        data: {
            userId,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            userType,
            timeStamp: timeStamp
        }
    })
    if(user){
        generateToken(res, user.userId);
        res.status(201).json({
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            password: user.password,
            timeStamp: user.timeStamp
        })
    }
})

//LOGIN USER
//Post /api/users/login
//Public
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({ error: 'Please fill all fields' });
        return;
    }
    const user = await prisma.user.findFirst({where: {email}});
    if(!user){
        res.status(400).json({ error: 'Invalid email' });
    }
    const isMatch = await decryptPassword(password, user.password);
    if(!isMatch){
        res.status(400).json({ error: 'Invalid password' });
        return;
    }
    generateToken(res, user.userId);
    res.json({
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        password: user.password
    })
})

//GET USER BY ID
//GET /api/users/:id
//Private
const getUserById = asyncHandler(async(req, res)=>{
    const userId = req.params.id;
    const user = await prisma.user.findUnique({where: {userId}});
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: 'User not found'});
    }
})

//DElETE USER BY ID
//DELETE /api/users/:id
//Private

const deleteUserById = asyncHandler(async(req, res)=>{
    const userId = req.params.id;
    const user = await prisma.user.findUnique({where: {userId}});
    if(!user){
        res.status(404).json({message: 'User not found'});
    }
    const deletedUser = await prisma.user.delete({where: {userId}});

    res.json({message: 'User deleted'})
})

//LOGOUT USER
//GET /api/users/logout
//Private
const logout = asyncHandler(async(req, res)=>{
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict"
    })
    res.json({message: 'User logged out'})
})


export { getAllUsers, register, login, getUserById, deleteUserById, logout }