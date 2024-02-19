import {useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from '../slices/AuthSlice'
import {toast} from 'react-toastify'
import {useNavigate, useLocation} from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import '../Assets/Homepage.css'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo } = useSelector(state => state.auth);
    const isAdmin = userInfo?.userType === 'admin';

    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    //check if user has flled HealthDataform or not

    useEffect(()=>{
        if(userInfo){
          navigate(redirect);
        }

    },[navigate, userInfo, redirect])

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin/dashboard');
        }
    }, [isAdmin, userInfo]);
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const loginHandler = async (e) => {
        e.preventDefault();
       try {
        const res = await login({email, password}).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Login Successful');
       } catch (error) {
        toast.error(error?.data?.error || 'Something went wrong')
        console.log(error);
       }
    }
  return (
    <Container  fluid className='basic-structure'>
    <div className='background-image'/>

      <Row>
        <Col >
          <h1 className='Heading-details'>JM KARIUKI MEMORIAL HOSPITAL</h1>
          <hr className='horizontal-line'/>
          <Form onSubmit={loginHandler} className='form-details'>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleEmailChange}
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
                  onChange={handlePasswordChange}
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
                  }}disabled={isLoading}>
              Login
            </Button>
          </Form>
          <Row className='py-3'>
            <Col style={{fontSize: "bold"}}>
             Don't have an Account?{' '}
              <Link to='/register'>
                Register
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}

export default LoginPage