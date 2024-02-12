import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Card, Button, Table, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa'; // Import the calendar icon from react-icons
import { useNavigate } from 'react-router-dom';
import { FaCapsules } from "react-icons/fa6";
import { MdSick } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import '../Assets/Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
 const { userInfo } = useSelector(state => state.auth);

 useEffect(() => {
  if (!userInfo) {
    navigate('/login');
  }
}, [userInfo, navigate]);


if (!userInfo) {
  return null;
}
 const userType = userInfo.userType;
const scheduleAppointment = () => {
  navigate('/schedule_appointment');
}
const viewAppointments = () => {
  navigate('/myappointments');
}
const viewMedicalInfo = () => {
  navigate('/medical-info');
}
const viewHealthData = () => {
  navigate('/health-data');
}
const viewDoctorAppointments = () =>{
  navigate('/appointments')
}

 return (
    <div style={{ backgroundColor: '#87CEEB', minHeight:'100vh' }}>
      {userType === 'patient' && (
        <>
        <h6 className='text-center'>Welcome back,  {userInfo.firstName}!</h6>
        <Row style={{marginRight:'7rem', marginLeft:'7rem', marginBottom:'4rem', marginTop:'4rem'}}>
          <Col>
          <Card style={{backgroundColor: '#87CEEB' , boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
              <FaCalendarAlt size={32} />
              <Card.Title>Schedule an Appointment</Card.Title>
              <Button onClick={scheduleAppointment} 
              style={{
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
              }}
              
              >Schedule Now</Button>
            </Card.Body>
          </Card>
      </Col>
      <Col>
          <Card style={{backgroundColor: '#87CEFA', boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
              <FaCalendarAlt size={32} />
              <Card.Title> Appointments </Card.Title>
              <Button style={{
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
              }} onClick={viewAppointments} >View Appointments</Button>
            </Card.Body>
          </Card>
          </Col>
          </Row>
          <Row style={{marginRight:'7rem', marginLeft:'7rem'}}>
          <Col>
          <Card style={{backgroundColor: '#87CEFA', boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)'  }}>
            <Card.Body>
              <FaCalendarAlt size={32} />
              <Card.Title> Medical INfo </Card.Title>
              <Button style={{


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
            }} onClick={viewMedicalInfo} >View Medical Info</Button>
            </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card style={{backgroundColor: '#87CEFC' , marginBottom:'2rem', boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
              <FaCalendarAlt size={32} />
              <Card.Title>Health Data</Card.Title>
              <Button style={{


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
            }} onClick={viewHealthData} >View Health Data</Button>
            </Card.Body>
          </Card>
          </Col>
          
          </Row>
        
        </>
      )}
      {/* Doctor Home Page */}
       {userType === 'doctor' && (
        <>
        <h1 className='text-center'>Welcome back,  {userInfo.firstName}!</h1>
        <Row style={{marginRight:'7rem', marginLeft:'7rem', marginBottom:'4rem', marginTop:'4rem'}}>
          <Col>
          <Card style={{backgroundColor: '#87CEEB' , boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
              <FaCapsules size={32} />
              <Card.Title>Prescriptions </Card.Title>
              <Button onClick={scheduleAppointment} style={{


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
            }}>Prescribe Now</Button>
            </Card.Body>
          </Card>
      </Col>
      <Col>
          <Card style={{backgroundColor: '#87CEFA', boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
              <FaCalendarAlt size={32} />
              <Card.Title> Appointments </Card.Title>
              <Button style={{


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
            }} onClick={viewDoctorAppointments} >View Appointments</Button>
            </Card.Body>
          </Card>
          </Col>
          </Row>
          <Row style={{marginRight:'7rem', marginLeft:'7rem'}}>
          <Col>
          <Card style={{backgroundColor: '#87CEFA', boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)'  }}>
            <Card.Body>
              <MdSick size={32} />
              <Card.Title> Patients </Card.Title>
              <Button style={{


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
            }} onClick={viewMedicalInfo} >View your  Patients</Button>
            </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card style={{backgroundColor: '#87CEFC' , marginBottom:'2rem', boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.2)' }}>
            <Card.Body>
              <FaUserDoctor size={32} />
              <Card.Title>Doctors</Card.Title>
              <Button style={{


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
            }} onClick={viewHealthData} >View Other  Doctors</Button>
            </Card.Body>
          </Card>
          </Col>
          
          </Row>
        
        </>
      )}
    </div>
 );
};

export default Homepage;
