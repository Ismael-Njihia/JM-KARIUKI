import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUsersQuery } from '../../slices/usersApiSlice'; 
import { toast, ToastContainer } from 'react-toastify';
import '../../Assets/Homepage.css';
import {useGetAppointmentBYIDQuery} from '../../slices/ApppointmentApiSlice';
import {useEditAppointmentMutation} from '../../slices/ApppointmentApiSlice';
import { useParams } from 'react-router-dom';
const EditAppointment = () => {
 const { userInfo } = useSelector((state) => state.auth);
 const navigate = useNavigate();
const { id } = useParams();
console.log(id);
 const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(); 
 const { data: appointment, loading: appointmentLoading } = useGetAppointmentBYIDQuery(id);
console.log(appointment);       
const [editAppointment, { isLoading: editLoading }] = useEditAppointmentMutation();
 const [appointDatetime, setAppointDateTime] = useState('');
 const [timestamp, setTimestamp] = useState('');
 const [doctorId, setDoctorId] = useState('');
 const [message, setMessage] = useState('');


useEffect(() => {
  if (appointment) {
    setAppointDateTime(appointment?.appointDatetime.split('T')[0]);
    setTimestamp(appointment?.appointDatetime.split('T')[1]);
    setDoctorId(appointment?.doctorId);
    setMessage(appointment?.message);
  }
}, [appointment]);
 const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
      const appointDateTimeCombined = `${appointDatetime}T${timestamp}`;
      console.log(appointDateTimeCombined);

        const res = await editAppointment({
          appointId: id,
          apoointmentData :{
            appointDatetime: appointDateTimeCombined,
            doctorId,
            message,
          },

         });
        console.log(res);
        if(res.error){
            toast.error(res.error?.data?.errMessage);
          }else{
          toast.success('Appointment Edited Successfully');
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





 return (
    <Container fluid className='basic-structure'>
      <div className='background-image'/>
      <Row>
        <Col>
          <h1 className="text-center Heading-details">Dear {userInfo.firstName},  Edit  your Appointment Below</h1>
          <p className="text-center">Please fill out the form below to submit your Appointment.</p>
          {isUsersLoading && <p>Loading...</p>}
          <Form onSubmit={handleSubmit} className='form-details'>
          <Form.Group controlId="appointDate">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
          type='date'
            selected={appointDatetime}
            value={appointDatetime}
            onChange={(e) => {
              setAppointDateTime(e.target.value); 
            }} 
            required 
            dateFormat="dd/MM/yyyy"
            min={new Date(new Date().setDate(new Date().getDate() +  1)).toISOString().split('T')[0]}
              placeholderText="Select a date"

          />
        </Form.Group>
        <Form.Group controlId="appointTime">
  <Form.Label>Appointment Time</Form.Label>
  <Form.Control 
    type='time'
    value={timestamp}
    onChange={(e) => setTimestamp(e.target.value)}
    selected={timestamp}
    required
    timeFormat="HH:mm"
    placeholder='Select a time'
  />
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
            }} disabled={isUsersLoading}   >Submit</Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
 );
};

export default EditAppointment;
