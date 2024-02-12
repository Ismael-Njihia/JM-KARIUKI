import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import randomGenerator from "../util/randomGenerator.js";

//GET ALL MESSAGES
//GET /api/messages
//Private
const getAllMessages = asyncHandler(async(req, res)=>{
    const messages = await prisma.messageTable.findMany();
    res.json(messages);
})

const createMessage = asyncHandler(async(req, res)=>{
    const senderId = req.user.userId;
    const messageId = randomGenerator().toString();
    const timestamp = new Date().toISOString();
    const {receiverId, messageText, appointId} = req.body;

    if(!receiverId || !messageText || !appointId){
        res.status(400).json({message: 'Please fill all fields'});
    }
    //ensure the receiver exists
    const receiver = await prisma.user.findUnique({where: {userId: receiverId}});
    if(!receiver){
        res.status(400).json({message: 'Receiver does not exist'});
    }
    //ensure the appointId exists
    const appoint = await prisma.appointment.findUnique({where: {appointId}});
    if(!appoint){
        res.status(400).json({message: 'Appointment does not exist'});
    }

    //ensure messageId is unique
    const uniqueMessageId = await prisma.messageTable.findUnique({where: {messageId}});
    if(uniqueMessageId){
        res.status(400).json({message: 'Message already exists'});
    }

    //receiver is not the sender
    if(receiverId === senderId){
        res.status(400).json({message: 'Receiver cannot be the sender'});
    }
    //create the message
    const message = await prisma.messageTable.create({
        data: {
            messageId,
            senderId,
            receiverId,
            messageText,
            appointId,
            timestamp
        }
    })
    //retun the message
    res.json(message);
})

//GET MESSAGE BY APPOINT ID
//GET /api/messages/:appointId
//Private
const getMessagesByAppointId = asyncHandler(async(req, res)=>{
    const appointId = req.params.appointId;
    //make sure appointId exists
    const appoint = await prisma.appointment.findUnique({where: {appointId}});
    if(!appoint){
        res.status(400).json({message: 'Appointment does not exist'});
    
    }
    const messages = await prisma.messageTable.findMany({where: {appointId}});
    //order the messages by timestamp
   let sortedMessages =messages.sort((a, b) => a.timestamp - b.timestamp);

    res.json(sortedMessages);
})


export {
    createMessage,
    getAllMessages,
    getMessagesByAppointId
}