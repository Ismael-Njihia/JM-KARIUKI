
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { useFetchAppointmentsQuery } from '../slices/ApppointmentApiSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


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
        <Col className="text-center">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{users?.length || 0}</Card.Text>
              <Link to="/admin/users">
                <Button variant="primary">View Users</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center">

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Patients</Card.Title>
              <Card.Text>{patients?.length || 0}</Card.Text>
              <Link to="/patients">
                <Button variant="primary">View Patients</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        </Row><Row>
            <Col className="text-center">
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Total Doctors</Card.Title>
                <Card.Text>{doctors?.length || 0}</Card.Text>
                <Link to="/doctors">
                  <Button variant="primary">View Doctors</Button>
                </Link>
              </Card.Body>
            </Card>
            </Col>
            <Col className="text-center">
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Total Appointments</Card.Title>
                <Card.Text>{appointments?.length || 0}</Card.Text>
                <Link to="/appointments">
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
