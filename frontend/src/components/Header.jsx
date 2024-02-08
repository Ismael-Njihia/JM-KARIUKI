import { useSelector, useDispatch } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import {useLogoutMutation} from "../slices/usersApiSlice"
import {toast} from "react-toastify"
import {logout} from "../slices/AuthSlice"

const Header = () => {
  const { userInfo } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [logoutBackendCall] = useLogoutMutation()
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try{
    await logoutBackendCall()
    toast.success("Logged out successfully")
    dispatch(logout())
    navigate("/login")
   
    } catch
    (error){
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand >JM KARIUKI</Navbar.Brand>
          </LinkContainer>

          {
            userInfo?(
              <NavDropdown title={userInfo?.firstName} id="username">
               <LinkContainer to="/myappointments">
                  <NavDropdown.Item>My Appointments</NavDropdown.Item>
                </LinkContainer>
               
                <LinkContainer to="/profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  logout
                </NavDropdown.Item>

                </NavDropdown>
            ):(
              <LinkContainer to="/login">
                <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
              </LinkContainer>
            )
          }

          {
            userInfo?.userType === "doctor" &&(
              <NavDropdown title="Doctor" id="doctor">
                <LinkContainer to='/appointments'>
                  <NavDropdown.Item>Appointments</NavDropdown.Item> 
                </LinkContainer> 

                <LinkContainer to='/patients'>
                  <NavDropdown.Item>Patients</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/prescriptions'>
                  <NavDropdown.Item>Prescriptions</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/doctor'>
                  <NavDropdown.Item>doctors</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )
          }

{
            userInfo?.userType === "admin" &&(
              <NavDropdown title="Doctor" id="doctor">
                <LinkContainer to='/appointments'>
                  <NavDropdown.Item>Appointments</NavDropdown.Item> 
                </LinkContainer> 

                <LinkContainer to='/patients'>
                  <NavDropdown.Item>Patients</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/prescriptions'>
                  <NavDropdown.Item>Prescriptions</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/doctor'>
                  <NavDropdown.Item>doctors</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/users'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )
          }
        </Container>
        </Navbar>
    </header>
  )
}

export default Header