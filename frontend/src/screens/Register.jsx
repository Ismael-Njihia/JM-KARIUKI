import React, { useState } from 'react';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { register } from '../Actions/UserAction';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';
const Register = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
 });

 const { email, password, firstname, lastname } = formData;
 const [confirmPassword, setConfirmPassword] = useState('');
 const [passwordShown, setPasswordShown] = useState(false);
 const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

 const togglePasswordVisibility = () => {
   setPasswordShown(!passwordShown);
 };

 const toggleConfirmPasswordVisibility = () => {
   setConfirmPasswordShown(!confirmPasswordShown);
 };

 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
 };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      await dispatch(register(email, password, firstname, lastname));
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login'); // Redirect to Login screen after successful registration
    } catch (error) {
      toast.error(error.response?.data.message || 'Registration failed. Please try again.', {
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

            

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstname"
                value={firstname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastname"
                value={lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
            
                <Form.Control
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                
                  {/* <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    {passwordShown ? <EyeOff /> : <Eye />}
                  </Button> */}
                
            </Form.Group>
            
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
             
                <Form.Control
                  type={confirmPasswordShown ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
    
    {/* <Button variant="outline-secondary" style={{
      border: 'transparent',
      marginTop: '30px'
    }} onClick={toggleConfirmPasswordVisibility}>
                    Show passwords {confirmPasswordShown ? <EyeOff /> : <Eye /> }
                  </Button> */}
               
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
              Register
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to='/login'>
                Login
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
 );
};

export default Register;
