import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, deleteUser } from '../Actions/UserAction'; // Make sure to import your listUsers action
import { Row, Col, Table, Container } from 'react-bootstrap';

const Dashboard = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const  users  = userList
  
  
    
  
    useEffect(() => {
      
        dispatch(listUsers())
    
    }, [dispatch, history])
  

 return (
    <Container fluid style={{ backgroundColor: '#87CEEB', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row>
        <Col>
          <h1>Users</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>User type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                 <td>{user.firstName}</td>
                 <td>{user.lastName}</td>
                 <td>{user.email}</td>
                    <td>{user.userType}</td>
                    {/* <td>
                      <Button variant="primary" size="sm" onClick={() => handleEdit(user._id)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                        Delete
                      </Button>
                      </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
 );
};

export default Dashboard;
