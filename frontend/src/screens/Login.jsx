import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../Actions/UserAction';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [formData, setFormData] = useState({
    email: '',
    password: '',
 });

 const { email, password } = formData;

 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
 };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(email, password));
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/dashboard'); // Redirect to Dashboard screen after successful login
    } catch (error) {
      toast.error(error.response?.data.message || 'Login failed. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
 };

 return (
    <Container fluid style={{ backgroundColor: '#87CEEB', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row>
        <Col >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{

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
            }}>
              Login
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Don't have an Account?{' '}
              <Link to='/register' style={{ color: '' }}>
                Register
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
 );
};

export default Login;
