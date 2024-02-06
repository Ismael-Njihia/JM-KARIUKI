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

//POST CREATE MEDICAL RECORD
//POST /api/medical
//private
const createMedical = asyncHandler(async(req, res)=>{
    const userId = req.user.userId;
    const {appointId, test_results, prescriptions} = req.body;

    //verufy if appointment exists
    const appointment = await prisma.appointment.findUnique({
        where: {
            appointId: appointId
        }
    })

    if(!appointment){
        res.status(404).json({message: 'Appointment not found'})
        return
    }
    //get the doctorId from the appointment
   // const doctorId = appointment.doctorId;
   // if(doctorId !== userId){
   //     res.status(401).json({message: 'You had not been Booked for this appointment'})
  //      return
  //  }
    //create medical record
    const medicalId = randomGenerator().toString();
    const timestamp = new Date().toISOString();

    //check if medical record exists
    const medicalExists = await prisma.medicalInfo.findUnique({
        where: {
            medicalId
        }
    })

    if(medicalExists){
        res.status(400).json({message: 'Medical record already exists'})
        return
    }

    //create medical record
    const medical = await prisma.medicalInfo.create({
        data: {
            medicalId,
            appointId,
            test_results,
            prescriptions,
            timestamp
        }
    })
    if(medical){
        //update appointment status as completed
        const updateAppointment = await prisma.appointment.update({
            where: {
                appointId: appointId
            },
            data: {
                appointStatus: 'completed'
            }
        })

        res.status(201).json({
            medical,
            updateAppointment,
            message: 'Medical record created successfully'
        })
    }

  
   if(!medical){
       res.status(400).json({message: 'Medical record creation failed'})
       return
   }

})


//export
export {getAllmedical, createMedical}