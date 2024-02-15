import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const SenderEmail= process.env.SENDER_EMAIL;
const SenderPassword= process.env.SENDER_PASSWORD;

const sendAppointmentEmail = (email, name, date, time, appointId) => {
    try{
        const emailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: SenderEmail,
                pass: SenderPassword
            }
        })
        const mail = {
            from: 'JM KARIUKI MEMORIAL HOSPITAL' + SenderEmail,
            to: email,
            subject: 'You Have an Appointment',
            html: `<h1>Hello Doctor ${name},</h1>
            <p>You have an appointment on ${date} at ${time}. The appointment ID is ${appointId}</p>
            <p>Regards,</p>
            <p> JM Kariuki Memorial Hospital</p>`
        };
        //send the email
        emailTransporter.sendMail(mail, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });

    }catch(error){
        console.log(error)
        console.log(error.message)
    }
}

export default sendAppointmentEmail;
