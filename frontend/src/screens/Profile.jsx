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
const Profile = () => {
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo.userId;
  const [logoutBackendCall] = useLogoutMutation()
  const { data: users, isLoading } = useGetUsersQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // Find the user details for the current user
  const currentUser = users?.find(user => user.userId === userId);

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
    dispatch(logout());
    navigate('/login');
    };

  return (
    <div className='container-fluid' style={{ backgroundColor: '#87CEEB', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%' }}>
        <>
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Hi! {currentUser?.firstName} </h1>
      <p>here is your Profile</p>
      {currentUser && (
        <div>
          <IconContext.Provider value={{ color: 'blue', size: '80px' }}>
            {AvatarIcon && <AvatarIcon />}
          </IconContext.Provider>
          <p>Email: {currentUser.email}</p>
          <p>First Name: {currentUser.firstName}</p>
          <p>Last Name: {currentUser.lastName}</p>
          <p>User Type: {currentUser.userType}</p>
          <Button variant='primary' style={{ margin: '10px' }}>Edit Profile</Button>
          <Button onClick={handleLogout} variant='danger' style={{ margin: '10px' }}>Logout</Button>
        </div>
      )}
    </div>
    </>
 </div>
  );
};


export default Profile