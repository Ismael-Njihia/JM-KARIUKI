import { Link } from 'react-router-dom'
import {useRegisterMutation} from '../slices/usersApiSlice'
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from '../slices/AuthSlice'
import {toast, ToastContainer} from 'react-toastify'
import {useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const Register = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const [register, {isLoading}] = useRegisterMutation();
  
      const {userInfo } = useSelector(state => state.auth);
      const location = useLocation();
      const redirect = location.search ? location.search.split('=')[1] : '/';
      
      //useEffect(()=>{
      //    if(userInfo){
     //         navigate(redirect);
     //     }
     // }, [navigate, userInfo, redirect])
  
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [confirmPassword, setConfirmPassword] = useState('');
  
  
      
       const handleRegister = async (e) => {
          e.preventDefault();
          try {
              const res = await register({firstName,lastName, email, password}).unwrap();
              console.log(res);
              dispatch(setCredentials(res));
              toast.success('Registration Successful');
              navigate('/');
          } catch (error) {
              toast.error(error?.data?.message || 'Something went wrong')
              console.log(error);
              
          }
       };
      
 return (
    <Container fluid style={{ backgroundColor: '#87CEEB', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row>
        <Col >
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                required
              />
            </Form.Group>

            

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstname"
                value={firstName}
                onChange={e=>setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastname"
                value={lastName}
                onChange={e=>setLastName(e.target.value)}
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
                  onChange={e=>setPassword(e.target.value)}
                  required
                />
                
                  {/* <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    {passwordShown ? <EyeOff /> : <Eye />}
                  </Button> */}
                
            </Form.Group>
            
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
             
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e=>setConfirmPassword(e.target.value)}
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
                  }}disabled={isLoading}>
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
