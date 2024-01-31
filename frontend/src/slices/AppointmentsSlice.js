import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("appointment") ? JSON.parse(localStorage.getItem("appointment")) : {appointments: []};

// Appointments slice
const appointmentsSlice = createSlice({
    name: "appointment",
    initialState,
    reducers:{
        //Add Appointment
        addAppointment: (state, action) =>{
            const appointment = action.payload;
            const existAppointment = state.appointments.find((x) => x.appointId === appointment.appointId);
            if(existAppointment){
                state.appointments.map((x) => x.appointId === existAppointment.appointId ? appointment : x);
            }
            else{
                state.appointments.push(appointment);
            }
        },

        //Edit Appointment
        editAppointment: (state, action) => {
            const appointment = action.payload;
            const index = state.appointments.findIndex((x) => x.appointId === appointment.appointId);
            if(index !== -1){
                state.appointments[index] = appointment;
            }
        },

        //Delete Appointment
        deleteAppointment: (state, action) => {
            const appointmentId = action.payload;
            state.appointments = state.appointments.filter((x) => x.appointId !== appointmentId);
        },

        //Get Appointment by id
        getAppointmentById: (state, action) => {
            const appointmentId = action.payload;
            return state.appointments.find((x) => x.appointId === appointmentId);
        },

        //Get all Appointments
        getAllAppointments: (state) => {
            return state.appointments;
        },

        //Get Appointments by user
        getAppointmentsByUser: (state, action) => {
            const userId = action.payload;
            return state.appointments.filter((x) => x.userId === userId);
        },

        //Get Appointments by doctor
        getAppointmentsByDoctor: (state, action) => {
            const doctorId = action.payload;
            return state.appointments.filter((x) => x.doctorId === doctorId);
        },
    }
});

export const { addAppointment, editAppointment, deleteAppointment, getAppointmentById, getAllAppointments, getAppointmentsByUser, getAppointmentsByDoctor } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
