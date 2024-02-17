import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUsersQuery } from '../../slices/usersApiSlice'; 
import { toast, ToastContainer } from 'react-toastify';
import { useAddAppointmentMutation } from '../../slices/ApppointmentApiSlice';
import '../../Assets/Homepage.css';
import DatePicker from 'react-datepicker';

const ScheduleAppointment = () => {
 const { userInfo } = useSelector((state) => state.auth);
 const navigate = useNavigate();
 const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(); 
const [addAppointment, { isLoading }] = useAddAppointmentMutation();        

 const [appointDatetime, setAppointDateTime] = useState('');
 const [timestamp, setTimestamp] = useState('');
 const [doctorId, setDoctorId] = useState('');
 const [message, setMessage] = useState('');



  const currentDate = new Date(); 

  const currentTime = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();
  const selectedTime = parseInt(timestamp.split(':')[0]) * 3600 + parseInt(timestamp.split(':')[1]) * 60;


 const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
      const appointDateTimeCombined = `${appointDatetime}T${timestamp}`;
      console.log(appointDateTimeCombined);
      const  appointmentData = {
        appointDatetime: appointDateTimeCombined,
            doctorId,
            message,

        }

        console.log(appointmentData);
        const res = await addAppointment(appointmentData);
        console.log(res);
        if(res.error){
            toast.error(res.error?.data?.errMessage);
          }else{
          toast.success('Appointment Scheduled Successfully');
            navigate('/myappointments');
          }
    }catch(e){
        console.log(e)
    }
 };


 // Map users to options for the doctor selection
 const doctorOptions = users
 ?.filter(user => user.userType === 'doctor') // Filter users to only include doctors
 .map(user => ({
    value: user.userId,
    label: `${user.firstName} ${user.lastName}`,
 }));

 console.log("doctorOptions", doctorOptions);

 const generateTimeSlots = () => {
  const slots = [];

  // Get the current hours
  const currentHours = new Date().getHours();

  for (let i = 9; i <= 20; i++) {
    // Skip 13:00 (1pm) and the hours already passed today
    if (i === 13 || i <= currentHours) continue;
    slots.push(i + ':00');
  }

  return slots;
};

const timeSlots = generateTimeSlots();


 return (
    <Container fluid className='basic-structure'>
      <div className='background-image'/>
      <Row>
        <Col>
          <h1 className="text-center Heading-details">Dear {userInfo.firstName},  Schedule An Appointment Below</h1>
          <p className="text-center">Please fill out the form below to submit your Appointment.</p>
          {isUsersLoading && <p>Loading...</p>}
          <Form onSubmit={handleSubmit} className='form-details'>
          <Form.Group controlId="appointDate">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
          type='date'
            selected={appointDatetime} 
            onChange={(e) => {
              setAppointDateTime(e.target.value); 
            }} 
            required 
            dateFormat="dd/MM/yyyy"
            min={new Date().toISOString().split('T')[0]}
              placeholderText="Select a date"

          />
        </Form.Group>
        <Form.Group controlId="appointTime">
  <Form.Label>Appointment Time</Form.Label>
  <Form.Select value={timestamp} onChange={(e) => setTimestamp(e.target.value)} required>
    <option value="" disabled selected>Select a time</option>
    {timeSlots?.map((time, i) => (
      <option key={i} value={time}>
        {time}
      </option>
    ))}
  </Form.Select>
</Form.Group>



            <Form.Group controlId="doctorId">
              <Form.Label>Select Doctor</Form.Label>
              <Form.Select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
                <option value="" disabled>Select a doctor</option>
                {doctorOptions?.map(({ value, label }) => (
                 <option key={value} value={value}>{label}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </Form.Group>
            <Button type="submit" style={{
              backgroundColor: '#87CEEB',
              color: 'black',
              border: '2px solid black',
              borderRadius: '10px',
              padding: '10px 20px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              outline: 'none',
              width: '100%',
              marginTop: '30px',
            }} disabled={isUsersLoading}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
 );
};

export default ScheduleAppointment;
