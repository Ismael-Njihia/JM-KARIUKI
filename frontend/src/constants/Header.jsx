import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/AuthSlice'; // Import your logout action
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaUserPlus, FaUser } from 'react-icons/fa'; // Import user type icons
import {useLogoutMutation} from '../slices/usersApiSlice';

const Header = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [logoutMutation] = useLogoutMutation(); // Logout mutation
 const { userInfo } = useSelector((state) => state.auth); // Access user data

 const handleLogout = async () => {
  try {
    await logoutMutation();
    dispatch(logout());
    navigate('/login');
    
  } catch (error) {
    console.log("error", error)
  }

 };

 const userTypeIcons = {
    'admin': <FaUserMd size={20} style={{ color: '#ffffff', marginRight: '30px'}} />,
    'doctor': <FaUserPlus size={20} style={{ color: '#ffffff', marginRight: '30px'}}/>,
    'patient': <FaUser size={20} style={{ color: '#ffffff' , margin: '30px'}} />,
    };

 return (
 <Navbar style={{ backgroundColor: '#131720' }} expand="lg">
   <Container>
    <Navbar.Brand href="#home" style={{ color: '#ffffff', fontWeight: 'bold' }}>Medical System</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto" style={{ color: '#ffffff', fontWeight: 'bold' }}>
      {userInfo && ['admin', 'doctor'].includes(userInfo.userType) && <Nav.Link href="#link1" style={{ color: '#ffffff', fontWeight: 'bold' }}>Appointments</Nav.Link>}
      {userInfo && ['admin', 'doctor'].includes(userInfo.userType) && <Nav.Link href="#link2" style={{ color: '#ffffff', fontWeight: 'bold' }}>Patients</Nav.Link>}
      {userInfo && ['admin', 'patient'].includes(userInfo.userType) && <Nav.Link href="#link3" style={{ color: '#ffffff', fontWeight: 'bold' }}>Doctors</Nav.Link>}
      <NavDropdown title={userInfo ? <span style={{ color: '#ffffff' }}>{userTypeIcons[userInfo.userType]} {userInfo.firstName}</span> : 'Login'} id="basic-nav-dropdown">
       <NavDropdown.Item style={{ color: '#ffffff', fontWeight: 'bold',  backgroundColor: '#131720' }} onClick={handleLogout}>{userInfo ? 'Logout' : 'Login'}</NavDropdown.Item>
      </NavDropdown>
     </Nav>
    </Navbar.Collapse>
   </Container>
 </Navbar>
 );
};

export default Header;
