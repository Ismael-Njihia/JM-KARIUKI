import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery, useGetAppointmentsOfaDocQuery } from '../slices/usersApiSlice';
import { Card, Row, Col, ListGroup, Table } from 'react-bootstrap';
import '../Assets/Homepage.css';
import { useSelector } from 'react-redux';

const DocProfile = () => {
    const userId = useSelector(state => state.auth.userInfo.userId);
    console.log(userId, 'userId')
    const { id } = useParams();
    const { data: user, isLoading } = useGetUserByIdQuery(id);

    const {data: appointments, loading: appointmentsLoading} = useGetAppointmentsOfaDocQuery(id);
    console.log(appointments, 'appointments')
    //count the number of appointments
    const countAppointments = appointments?.length;
   //count where the appointStatus is complete
    const completedAppointments = appointments?.filter(appointment => appointment.appointStatus === 'completed').length;

    const cancelledAppointments = appointments?.filter(appointment => appointment.appointStatus === 'cancelled').length;

    const scheduledAppointments = appointments?.filter(appointment => appointment.appointStatus === 'scheduled').length;

    
    const myAppointments = appointments?.filter(appointment => appointment.userId === userId);
    console.log(myAppointments, 'myAppointments')
    
    
  return (
    <>
    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
    <div className='homepage-image'/>
    <Row>
        <Col md={4}>
            <Card style={{marginTop: '10px', marginLeft: "5px"}}>
                <Card.Body>
                    <Card.Title> Doctor {user?.firstName} {user?.lastName} History</Card.Title>
                    <Card.Text>
                        {user?.email}
                    </Card.Text>
                    <hr className="horizontal-line"/>

                    <Card.Text>
                        {user?.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Phone: {user?.pno}</ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        <Col md={4}>
            <Card style={{marginTop: '10px', marginLeft: "5px"}}>
                <Card.Body>
                    <Card.Title>Total Appointments</Card.Title>
                    <Card.Text>
                     <h4><strong> {countAppointments} </strong> </h4> 
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col md={4}>
                <Card style={{marginTop: '10px', marginLeft: "5px"}}>
                    <Card.Body>
                        <Card.Title>Completed Appointments</Card.Title>
                        <Card.Text>
                        <h4><strong> {completedAppointments} </strong> </h4> 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
    </Row>

    <Row>
        <Col md={4}>
        </Col>
        <Col md={4}>
            <Card style={{marginTop: '0px', marginLeft: "5px"}}>
                <Card.Body>
                    <Card.Title>Cancelled Appointments</Card.Title>
                    <Card.Text>
                    <h4><strong> {cancelledAppointments} </strong> </h4> 
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>

        <Col md={4}>
            <Card style={{marginTop: '0px', marginLeft: "5px"}}>
                <Card.Body>
                    <Card.Title>Scheduled Appointments</Card.Title>
                    <Card.Text>
                    <h4><strong> {scheduledAppointments} </strong> </h4> 
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
    </Row>

    <Row>

        <Col md={14}>
        <Card style={{marginTop: '10px', marginLeft: "5px", marginRight: "5px"}}>
            <Card.Body>
                <Card.Title> My Appointments with Doctor {user?.firstName} {user?.lastName}</Card.Title>
                <Table style={{fontSize: "10px", marginTop:"10px"}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Appoint Id</th>
                            <th>Patient Id</th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myAppointments?.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td>{index + 1}</td>
                                <td>{appointment.appointId}</td>
                                <td>{appointment.userId}</td>
                                <td>{appointment.appointDatetime}</td>
                                <td>{appointment.message}</td>
                                <td>{appointment.appointStatus} </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </Col>

    </Row>
   

    </div>
    </>
  )
}

export default DocProfile