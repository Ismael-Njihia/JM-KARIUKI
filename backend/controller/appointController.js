import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import randomGenerator from "../util/randomGenerator.js";

//GET ALL APPOINTMENTS
//GET /api/appointments
//Private
const getAllAppointments = asyncHandler(async(req, res)=>{
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
})

//CREATE APPOINTMENT
//Post /api/appointments/create
//Private

const createAppointment = asyncHandler(async(req, res)=>{
    const userId = req.user.userId;
    const {doctorId, appointDatetime, message} = req.body;
    const appointId = randomGenerator().toString();
    const timeStamp = new Date().toISOString();
    const appointStatus = "scheduled";
    const completedOn = ""

    if(!doctorId || !appointDatetime){
        res.status(400);
        throw new Error('Please fill all fields');
    }
    //make sure the doctor exists
    const doctor = await prisma.user.findUnique({where: {userId: doctorId}});
    //check user type in doctor object
    const isDoctor = doctor.userType === "doctor";
    if(!doctor || !isDoctor){
        res.status(400);
        throw new Error('Doctor does not exist');
    }

    //make sure appointId is unique
    const uniqueAppointId = await prisma.appointment.findUnique({where: {appointId}});
    if(uniqueAppointId){
        res.status(400);
        throw new Error('Appointment already exists');
    }

    //create the appointement
    const appointment = await prisma.appointment.create({
        data: {
            appointId,
            user: {
                connect: { userId },
            },
           doctorId,
            appointDatetime,
            message,
            timestamp: timeStamp,
            appointStatus,
            completedOn
        }
    })

    if (appointment){
        res.status(201).json({
            appointId: appointment.appointId,
            userId: appointment.userId,
            doctorId: appointment.doctorId,
            appointDatetime: appointment.appointDatetime,
            message: appointment.message,
            timeStamp: appointment.timeStamp,
            appointStatus: appointment.appointStatus,
            completedOn: appointment.completedOn
        })
    }

})

//UPDATE APPOINTMENT
//PUT /api/appointments/cancel/:id
//Cancel an appointment
//Private

const cancelAppointment = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const userId = req.user.userId;
    const appointStatus = "cancelled";

    const appointment = await prisma.appointment.findUnique({where: {appointId: id}});
    if(!appointment){
        res.status(404);
        throw new Error('Appointment does not exist');
    }
    if(appointment.userId !== userId){
        res.status(401);
        throw new Error('Not authorized to cancel this appointment');
    }
    const updatedAppointment = await prisma.appointment.update({
        where: {appointId: id},
        data: {
            appointStatus
        }
    })
    if(updatedAppointment){
        res.json({message: "Appointment cancelled successfully"})
    }
})

//UPDATE APPOINTMENT
//PUT /api/appointments/update/:id
//Mark an appointment as completed

const updateAppointment = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const userId = req.user.userId;
    const appointStatus = "completed";
    const completedOn = new Date().toISOString();

    const appointment = await prisma.appointment.findUnique({where: {appointId: id}});
   //check the current status of the appointment

   const isCompleted = appointment.appointStatus === "completed";
   console.log(isCompleted + "TRue here");
    if(isCompleted){
        res.status(400).json({message: "Appointment already completed"});
    }
    const isCancelled = appointment.appointStatus === "cancelled";
    if(isCancelled){
        res.status(400);
        throw new Error('Appointment already cancelled');
    }
   
    if(!appointment){
        res.status(404);
        throw new Error('Appointment does not exist');
    }

    const updatedAppointment = await prisma.appointment.update({
        where: {appointId: id},
        data: {
            appointStatus,
            completedOn
        }
    })
    if(updatedAppointment){
        res.json({message: "Appointment marked as completed successfully"})
    }
})

//Edit an appointment
//PUT /api/appointments/edit/:id
//Private
const editAppointment = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const userId = req.user.userId;
    const {doctorId, appointDatetime, message} = req.body;

    const appointment = await prisma.appointment.findUnique({where: {appointId: id}});
    if(!appointment){
        res.status(404);
        throw new Error('Appointment does not exist');
    }
    if(appointment.userId !== userId){
        res.status(401);
        throw new Error('Not authorized to edit this appointment');
    }
    const updatedAppointment = await prisma.appointment.update({
        where: {appointId: id},
        data: {
            doctorId,
            appointDatetime,
            message
        }
    })
    if(updatedAppointment){
        res.json({
            message: "Appointment updated successfully",
            data: updatedAppointment
        })
    }
})

//DELETE APPOINTMENT
//DELETE /api/appointments/:id
//Private

const deleteAppointment = asyncHandler(async(req, res)=>{
    const {id} = req.params;

    const appointment = await prisma.appointment.findUnique({where: {appointId: id}});

    if(!appointment){
        res.status(404);
        throw new Error('Appointment does not exist');
    }
    const deletedAppointment = await prisma.appointment.delete({where: {appointId: id}});

    if(deletedAppointment){
        res.json({message: "Appointment deleted successfully"})
    }
})

//GET APPOINTMENT BY ID
//GET /api/appointments/:id
//Private

const getAppointmentById = asyncHandler(async(req, res)=>{
    const {id} = req.params;

    const appointment = await prisma.appointment.findUnique({where: {appointId: id}});
    if(appointment){
        res.json(appointment);
    }
    else{
        res.status(404);
        throw new Error('Appointment not found');
    }
})


//export all functions
export {getAllAppointments,
     createAppointment,
     editAppointment,
     deleteAppointment,
     getAppointmentById,
      cancelAppointment, updateAppointment};