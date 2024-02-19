import { useParams } from "react-router-dom";
import {useGetUserByIdQuery} from '../../slices/usersApiSlice';
import { Card, Row, Col, ListGroup, Table } from 'react-bootstrap';
import '../../Assets/Homepage.css';
import {useDeleteUserMutation} from '../../slices/usersApiSlice';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams();
    const { data: user, isLoading } = useGetUserByIdQuery(id);
    console.log(user, 'user')

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [showDelete, setShowDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);
    const navigate = useNavigate();
    const handleDeleteShow = (id) => {
        setSelectedDelete(id);
        setShowDelete(true);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
    }

    const handleDelete = async () => {
        try {
            console.log(selectedDelete, 'selectedDelete');
            const response = await deleteUser(selectedDelete).unwrap();
            console.log(response);
            if(response.error) {
                toast.error(response.error.data.message || 'An error occured');
                return;
            }
            else{
            toast.success('User deleted successfully');
            console.log(response);
            navigate('/admin/users');
            }
          } catch (error) {
            toast.error(error?.data?.message);
            console.log(error);
          } finally {
              handleCloseDelete();
          }
    }

    const isPatient = user?.userType === 'patient';
  return (
    <>
    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
    <div className='homepage-image'/>
    <Row>
        <Col md={4}>
            <Card style={{marginTop: '10px', marginLeft: "5px"}}>
                <Card.Body>
                    <Card.Title>{user?.firstName} {user?.lastName}</Card.Title>
                    <Card.Text>
                        {user?.email}
                    </Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Phone: {user?.pno}</ListGroup.Item>
                </ListGroup>
            </Card>
            <hr className="horizontal-line"/>

            <Card style={{ marginTop: '10px', marginLeft: '5px' }}>
            {isPatient && (
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
            )}
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

    <Row class = 'Actions'>
        
            <Card style={{marginTop: '10px', marginLeft: "5px", alignItems:'center', display:'flex', 
        justifyContent:'center', height: '100%', padding: '30px'
        }}>
                <Card.Body>
                    <Card.Title style={{textAlign: 'center'}}>Actions</Card.Title>
                    <Card.Text>
                        <Button variant="danger" onClick={() => handleDeleteShow(user?.userId)} disabled={isDeleting} style={{margin:'20px'}}>Delete User</Button>
                        <Button variant="primary" style={{margin:'20px'}}> <Link to={`/admin/edit_user/${user?.userId}`} style={{color:'white', textDecoration:'none'}}>Edit User</Link> </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            
    </Row>

    <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this appointment? this action cannot be undone</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
</div>
<ToastContainer />
    </>
  )
}

export default UserDetails