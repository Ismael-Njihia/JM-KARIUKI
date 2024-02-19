import { Link } from 'react-router-dom'
import {useRegisterMutation} from '../slices/usersApiSlice'
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from '../slices/AuthSlice'
import {toast, ToastContainer} from 'react-toastify'
import {useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import '../Assets/Homepage.css'
import {useUpdateUserMutation} from '../slices/usersApiSlice'
import { useParams } from 'react-router-dom'
import {useGetUserByIdQuery} from '../slices/usersApiSlice'

const EditProfile = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const [register, {isLoading}] = useRegisterMutation();
      const [updateUser, {isUpdating}] = useUpdateUserMutation();
      const {userInfo } = useSelector(state => state.auth);
      const {id} = useParams();
      const {data: user, loading:userIsLoading} = useGetUserByIdQuery(id);
      
  useEffect(() => {
    if(user){
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setPno(user.pno)
    }

  } ,[user])

      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
       const [pno, setPno] = useState('');
      
  
  
      
       const handleRegister = async (e) => {
          e.preventDefault();
          try {

              const res = await updateUser({
                id: id,
                user:{
                  firstName, 
                  lastName, 
                  email, 
                  pno
                },
                
               });
              console.log(res);
              if(res.error){
                toast.error(res.error?.data?.message || 'Something went wrong')
              }
              else{
              dispatch(setCredentials(res));
              toast.success('Profile Updated  Successful');
              }
              navigate('/health');
          } catch (error) {
              toast.error(error?.data?.message || 'Something went wrong')
              console.log(error);
              
          }
       };
      
 return (
    <Container fluid  className='basic-structure'>
      <div className='background-image'/>
      <Row>
        <Col >
        <h1 className='Heading-details'>EDIT PROFILE</h1>
        <hr className='horizontal-line' />
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formEmail" className='form-details margin-top'>
              <Form.Control 
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                required
                className='bold-input'
              />
            </Form.Group>

            

            <Form.Group controlId="formFirstName">
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstname"
                value={firstName}
                onChange={e=>setFirstName(e.target.value)}
                required
                className='bold-input'
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastname"
                value={lastName}
                onChange={e=>setLastName(e.target.value)}
                required
                className='bold-input'
              />
            </Form.Group>

            <Form.Group controlId='formpno'>
                  <Form.Control
                  type='text'
                  value={pno}
                  onChange={e=>setPno(e.target.value)}
                  placeholder='Enter Your Phone Number'
                  required
                  className='bold-input'
                  >

                  </Form.Control>
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
              Update
            </Button>
          </Form>
          
        </Col>
      </Row>
      <ToastContainer />
    </Container>
 );
};

export default EditProfile;
