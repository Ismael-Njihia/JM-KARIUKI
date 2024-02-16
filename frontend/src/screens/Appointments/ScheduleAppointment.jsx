import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUsersQuery } from '../../slices/usersApiSlice'; 
import { toast, ToastContainer } from 'react-toastify';
import { useAddAppointmentMutation } from '../../slices/ApppointmentApiSlice';

const ScheduleAppointment = () => {
 const { userInfo } = useSelector((state) => state.auth);
 const navigate = useNavigate();
 const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(); 
const [addAppointment, { isLoading }] = useAddAppointmentMutation();        

 const [appointDatetime, setAppointDateTime] = useState('');
 const [timestamp, setTimestamp] = useState('');
 const [doctorId, setDoctorId] = useState('');
 const [message, setMessage] = useState('');


 const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const appointDateTimeCombined = `${appointDatetime}{${timestamp}}`;
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

 return (
    <Container fluid style={{ backgroundColor: '#87CEEB', paddingBottom: '50px', paddingTop: '40px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center">Dear {userInfo.firstName},  Schedule An Appointment Below</h2>
          <p className="text-center">Please fill out the form below to submit your Appointment.</p>
          {isUsersLoading && <p>Loading...</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="appointDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control type="date" value={appointDatetime} onChange={(e) => setAppointDateTime(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="appointTime">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control type="time" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} required />
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
