import nodemailer from 'nodemailer';

const SenderEmail= process.env.SENDER_EMAIL;
const SenderPassword= process.env.SENDER_PASSWORD;

const sendMeetingId = (email, name,meetingId, appointId) => {
    try {
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
            subject: 'Your Meeting ID',
            html: `<h1>Hello ${name},</h1>
            <h3>Your Meeting ID for the appointment with ID ${appointId} is ${meetingId}</h3>
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
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
        
    }

}

export default sendMeetingId;