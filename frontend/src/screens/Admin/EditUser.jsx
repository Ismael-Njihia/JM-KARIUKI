import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'
import {toast, ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import '../../Assets/Homepage.css'
import {useUpdateUserMutation} from '../../slices/usersApiSlice'
import { useParams } from 'react-router-dom'
import {useGetUserByIdQuery} from '../../slices/usersApiSlice'



const EditUser = () => {
      const navigate = useNavigate();
      const [updateUser, {isUpdating}] = useUpdateUserMutation();
      const {userInfo } = useSelector(state => state.auth);
      const {id} = useParams();
      const {data: user, isFetching} = useGetUserByIdQuery(id);
    

      
  useEffect(() => {
    if(user){
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setPno(user.pno)
      setUserType(user.userType)
    }

  } ,[user])

      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
       const [pno, setPno] = useState('');
       const [userType, setUserType] = useState('');
      
  
  
      
       const handleEdit = async (e) => {
          e.preventDefault();
          try {

              const res = await updateUser({
                id: id,
                user:{
                  firstName, 
                  lastName, 
                  email, 
                  pno,
                  userType
                },
                
               });
              console.log(res);
              if(res.error){
                toast.error(res.error?.data?.message || 'Something went wrong')
              }
              else{
              toast.success('User Updated  Successful');
              }
          } catch (error) {
              toast.error(error?.data?.message || 'Something went wrong')
              console.log(error);
              
          }
       };
      
 return (
    <Container fluid  className='basic-structure'>
      {isFetching && <h1>Loading...</h1>}
      <div className='background-image'/>
      <Row>
        <Col >
        <h1 className='Heading-details'>EDIT USER PROFILE</h1>
        <hr className='horizontal-line' />
          <Form onSubmit={handleEdit}>
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

                <Form.Group controlId='formUserType'>
                  <Form.Control
                  as='select'
                  value={userType}
                  onChange={e=>setUserType(e.target.value)}
                  required
                  className='bold-input'
                  >
                    <option value='patient'>Patient</option>
                    <option value='doctor'>Doctor</option>
                    <option value='admin'>Admin</option>
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
                  }}>
              Update
            </Button>
          </Form>
          
        </Col>
        <Link to={`/admin/users/${id}`} style={{textDecoration:'none', color:'black'}}>
          <Button variant="primary" style={{ margin: '10px' }}>
            Back to Profile
          </Button>
          </Link>
      </Row>
      <ToastContainer />
    </Container>
 );
};

export default EditUser;
