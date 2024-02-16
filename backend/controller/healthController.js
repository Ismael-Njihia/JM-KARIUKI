import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import randomGenerator from "../util/randomGenerator.js";

//GET ALL health
//GET /api/health
//Private
const getAllHealth = asyncHandler(async(req, res)=>{
    const health = await prisma.healthData.findMany();
    res.json(health);
})

//CREATE health record
//Post /api/health/create
//Private

const createHealthRecord = asyncHandler(async(req, res)=>{
    const userId = req.user.userId;
    const healthId = randomGenerator().toString();
    const updatedOn = new Date().toISOString();
    const {disabled, disabilityType, chronicDiseases, allergies, dietType, mentalHealth} = req.body;

    //if disabled is false, then disabilityType is null
    const modifiedDisabilityType = disabled ? disabilityType : null;
    //if disabled is true, then disabilityType is required
    if (disabled == true && !disabilityType){
        res.status(400);
        throw new Error('Please fill all fields');
    }
     // Change chronicDiseases to array
     const chronicDiseasesArray = chronicDiseases ? [chronicDiseases] : [];
     // Change allergies to array
     const allergiesArray = allergies ? [allergies] : [];
     // Change mentalHealth to array
     const mentalHealthArray = mentalHealth ? [mentalHealth] : [];

     //ensure the user has no other heath record
    const userHealth = await prisma.healthData.findFirst({where: {userId}});
    if(userHealth){
        res.status(400).json({errMessage: 'User already has a health record'})
    }

    //ensure there is no other health record with the id
    const uniqueHealthId = await prisma.healthData.findUnique({where: {healthId}});

    if(uniqueHealthId){
        res.status(400).json({error: 'Health record already exists'})
    }
    //create the health record
    const health = await prisma.healthData.create({
        data: {
            healthId,
            user: {
                connect: { userId },
            },
            disabled,
            disabilityType: modifiedDisabilityType,
            chronicDiseases: chronicDiseasesArray,
            allergies: allergiesArray,
            dietType,
            mentalHealthStatus: mentalHealthArray,
            updatedOn
        }
    });
    //return message and data
    if (health){
        res.status(201).json({
            message: "Health record created successfully",
            data: health
        })
    }
})

//EDIT HEALTH RECORD
//PUT /api/health/edit/:id
//Private

const editHealthRecord = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const updatedOn = new Date().toISOString();
    const userId = req.user.userId;

    const {disabled, disabilityType, chronicDiseases, allergies, dietType, mentalHealth} = req.body;

    //if disabled is false, then disabilityType is null
    const modifiedDisabilityType = disabled ? disabilityType : null;
    //if disabled is true, then disabilityType is required
    if (disabled == true && !disabilityType){
        res.status(400);
        throw new Error('Please fill all fields');
    }
     // Change chronicDiseases to array
     const chronicDiseasesArray = chronicDiseases ? [chronicDiseases] : [];
     // Change allergies to array
     const allergiesArray = allergies ? [allergies] : []
     // Change mentalHealth to array
     const mentalHealthArray = mentalHealth ? [mentalHealth] : [];

    //ensure the health record exists
    const health = await prisma.healthData.findUnique({where: {healthId: id}});
    if(!health){
        res.status(400);
        throw new Error('Health record does not exist');
    }

    //ensure the user owns the health record
    const ownsRecord = health.userId === userId;
    if(!ownsRecord){
        res.status(400);
        throw new Error('You do not own this health record');
    }

    //update the health record
    const updatedRecord = await prisma.healthData.update({
        where: {healthId: id},
        data: {
            disabled,
            disabilityType: modifiedDisabilityType,
            chronicDiseases: chronicDiseasesArray,
            allergies: allergiesArray,
            dietType,
            mentalHealthStatus: mentalHealthArray,
            updatedOn
        }
    });
    //return message and data
    if (updatedRecord){
        res.status(201).json({
            message: "Health record updated successfully",
            data: updatedRecord
        })
    }
})

//GET HEALTH RECORD BY userId
//GET /api/health/user/:id
//Private

const getHealthRecord = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    console.log(id);

    if(!id){
      res.status(400).json({message: 'Please provide a user id'	})
    }
    //check if the user exists
    const user = await prisma.user.findUnique({where: {userId: id}});
    if(!user){
        res.status(400).json({message: 'User does not exist'})
    }
    //ensure the user has a health record
    const health = await prisma.healthData.findFirst({where: {userId: id}});

    if(!health){
        res.status(400).json({message: 'User does not have a health record'})
    }

    //return message and data
    if (health){
        res.status(201).json({
             health
        })
    }
})


export {getAllHealth, createHealthRecord, editHealthRecord, getHealthRecord}