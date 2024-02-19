import { useSelector } from "react-redux"
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { FaUserMd, FaUser, FaUserShield } from 'react-icons/fa';
import { logout } from '../slices/AuthSlice';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import {useLogoutMutation} from "../slices/usersApiSlice"
import {toast} from "react-toastify"
import {Row, Col, Table} from 'react-bootstrap'
import '../Assets/Homepage.css'
import { Link } from 'react-router-dom';

const Profile = () => {
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo.userId;
  console.log(userId);
  const [logoutBackendCall] = useLogoutMutation()
  const { data: users, isLoading } = useGetUsersQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // Find the user details for the current user
  const currentUser = users?.find(user => user.userId === userId);
  console.log(currentUser);

  const renderHealthDataTable = () => {
    if (currentUser && currentUser.healthData && currentUser.healthData.length > 0) {
        const healthData = currentUser.healthData[0];
        
        const filteredKeys = Object.keys(healthData).filter(key => key !== 'healthId' && key !== 'userId');
        return (
            <>
                <h3 style={{textAlign: 'center'}}>Your Health Data</h3>
                <Table bordered>
                    <tbody>
                        {filteredKeys.map(key => {
                            let displayValue = healthData[key];
                           
                            if (key === 'updatedOn') {
                                displayValue = new Date(healthData[key]).toLocaleDateString();
                            }
                            
                            if (displayValue === '' || displayValue === null) {
                                displayValue = 'No Data';
                            } else if (Array.isArray(displayValue)) {
                                displayValue = displayValue.join(', ');
                            }
                            
                            switch (key) {
                                case 'disabled':
                                    key = 'Disabled';
                                    break;
                                case 'disabilityType':
                                    key = 'Disability Type';
                                    break;
                                case 'chronicDiseases':
                                    key = 'Chronic Disease';
                                    break;
                                case 'dietType':
                                    key = 'Diet Type';
                                    break;
                                case 'mentalHealthStatus':
                                    key = 'Mental Health Status';
                                    break;
                                    default:
                                      key = key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
                                      break;
                            }
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{displayValue}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    } else {
        return <div style={{textAlign: 'center', display: 'flex', justifyContent:'center', marginTop:"30px", padding:"20px", backgroundColor:"red", color:'#fff', borderRadius:"5px", top:"-30px"}}>No health data available</div>;
    }
};


  // Determine the avatar icon based on userType
  let AvatarIcon;
  switch (currentUser?.userType) {
      case 'doctor':
          AvatarIcon = FaUserMd;
          break;
      case 'patient':
          AvatarIcon = FaUser;
          break;
      case 'admin':
          AvatarIcon = FaUserShield;
          break;
      default:
          AvatarIcon = null;
  }

  const handleLogout = async () => {
    await logoutBackendCall()
    toast.success("Logged out successfully")
    //set the user to null
    
    dispatch(logout());
    navigate('/login');
    };

  return (
    <div className='container-fluid' style={{ backgroundColor: '#87CEEB', minHeight: '100vh', width:'100%' }}>
    <div className="homepage-image"/>
    <Row>

    <Col md={5}>
    <div style={{ padding: '20px', marginLeft: '50px'}}>
      <h3>Hi! {currentUser?.firstName} </h3>
      {currentUser && (
        <div>
          <IconContext.Provider value={{ color: 'blue', size: '80px' }}>
            {AvatarIcon && <AvatarIcon />}
          </IconContext.Provider>
          
          <p style={{marginTop: '20px'}}>Name: {currentUser.firstName + " " + currentUser.lastName}</p>
          <p>Email: {currentUser.email}</p>
          
          <p>Phone Number: {currentUser.pno}</p>
          <p>User Type: {currentUser.userType}</p>
          <Button variant='primary' style={{ margin: '10px' }}>
            <Link style={{textDecoration:'none', color:'white'}} to={`/editprofile/${currentUser.userId}`}>Edit Profile</Link>
            </Button>
          <Button onClick={handleLogout} variant='danger' style={{ margin: '10px' }}>Logout</Button>
        </div>
      )}
    </div>
    </Col>
    <Col md={7}>
      <div className="Health-data">
        {renderHealthDataTable()}

      </div>
    </Col>
    </Row>
 </div>
  );
};


export default Profile