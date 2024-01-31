import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import randomGenerator from "../util/randomGenerator.js";


//GET ALL MEDICAL RECORDS
//GET /api/medical
//private
const getAllmedical = asyncHandler(async(req, res)=>{
    const medical = await prisma.medicalInfo.findMany();
    res.json(medical)
})


//export
export {getAllmedical}