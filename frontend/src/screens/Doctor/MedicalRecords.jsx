
import {useGetUserByIdQuery} from '../../slices/usersApiSlice';
import { Card, Row, Col, ListGroup, Table } from 'react-bootstrap';
import '../../Assets/Homepage.css';
import { useSelector } from 'react-redux';
const Medicalrecords = () => {
    const {userInfo} = useSelector(state => state.auth)
    const id = userInfo?.userId
    console.log(userInfo, 'userInfo')
    const { data: user, isLoading } = useGetUserByIdQuery(id);
    console.log(user, 'user')
  return (
    <>
    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
    <div className='homepage-image'/>
    <Row>
        <Col md={4}>
            <Card style={{marginTop: '10px', marginLeft: "5px"}}>
                <Card.Body>
                    <Card.Title>{user?.firstName} {user?.lastName} Medical Records </Card.Title>
                    <Card.Text>
                        Email : {user?.email}
                    </Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Phone: {user?.pno}</ListGroup.Item>
                </ListGroup>
            </Card>
            <hr className="horizontal-line"/>

            <Card style={{ marginTop: '10px', marginLeft: '5px' }}>
            <Card.Body>
                <Card.Title>Health Data</Card.Title>
                <Card.Text>
                <p>Disabled: {user?.healthData[0]?.disabled ? 'Yes' : 'No'}</p>
                <p>Disability Type: {user?.healthData[0]?.disabilityType}</p>
                <p>Allergies: {user?.healthData[0]?.allergies && user.healthData[0].allergies.length > 0 ? user.healthData[0].allergies.join(', ') : 'None'}</p>
                <p>Chronic Diseases: {user?.healthData[0]?.chronicDiseases && user.healthData[0].chronicDiseases.length > 0 ? user.healthData[0].chronicDiseases.join(', ') : 'None'}</p>
                <p>Diet Type: {user?.healthData[0]?.dietType}</p>
                </Card.Text>
            </Card.Body>
            </Card>


        </Col>
        <Col md={7}>
            <Card style={{marginTop: '10px'}}>
                <Card.Body>
                    <Card.Title>Appointments</Card.Title>
                    <Table style={{fontSize: "10px", marginTop:"10px"}} striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Appoint Id</th>
                                <th>Doctor Id</th>
                                <th>Date</th>
                                <th>Message</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.appointment?.map((appointment, index) => (
                                <tr key={appointment._id}>
                                    <td>{index + 1}</td>
                                    <td>{appointment.appointId}</td>
                                    <td>{appointment.doctorId}</td>
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

    <Row>
        <Col md={4}>
            
            </Col>
    </Row>
</div>
    </>
  )
}

export default Medicalrecords