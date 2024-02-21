
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { useFetchAppointmentsQuery } from '../slices/ApppointmentApiSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserFriends } from "react-icons/fa";
import { FaUserInjured } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
const Dashboard = () => {
  const { data: users } = useGetUsersQuery();
  const { data: appointments } = useFetchAppointmentsQuery();
  const patients = users?.filter(user => user.userType === 'patient');
  const doctors = users?.filter(user => user.userType === 'doctor');
  const { userInfo } = useSelector(state => state.auth);
  const isAdmin = userInfo?.userType === 'admin';



  return (
    <Container>
      {isAdmin? (
      <><Row>
        <h1 className='text-center'>Admin Dashboard</h1>
        <Col >
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Users <FaUserFriends style={{fontSize:'50px', marginLeft:'10px'}}/></Card.Title>
              <Card.Text> <strong><h1 className='text-left'>{users?.length || 0}</h1></strong></Card.Text>
              <Link to="/admin/users">
                <Button variant="primary">View Users</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col >

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Patients <FaUserInjured style={{fontSize:'50px', marginLeft:'10px'}}/></Card.Title>
              <Card.Text> <strong><h1 className='text-left'>{patients?.length || 0}</h1></strong></Card.Text>
              <Link to="/patients">
                <Button variant="primary">View Patients</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        </Row><Row>
            <Col >
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Total Doctors <FaUserDoctor style={{fontSize:'50px', marginLeft:'10px'}}/></Card.Title>
                <Card.Text> <strong><h1 className='text-left'>{doctors?.length || 0}</h1></strong></Card.Text>
                <Link to="/doctors">
                  <Button variant="primary">View Doctors</Button>
                </Link>
              </Card.Body>
            </Card>
            </Col>
            <Col >
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Total Appointments <FaCalendarDays style={{fontSize:'50px', marginLeft:'10px'}}/></Card.Title>
                <Card.Text> <strong><h1 className='text-left'>{appointments?.length || 0}</h1></strong></Card.Text>
                <Link to="/admin/appointments">
                  <Button variant="primary">View Appointments</Button>
                </Link>
              </Card.Body>
            </Card>
            </Col>
          </Row></>
      ):(
        <h1>Not allowed to access this</h1>
      )}
    </Container>
  );
};

export default Dashboard;
