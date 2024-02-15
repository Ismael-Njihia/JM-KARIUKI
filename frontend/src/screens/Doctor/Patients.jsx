import { useSelector } from "react-redux"
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../Assets/Homepage.css';
const Doctors = () => {
    const {userInfo} = useSelector(state => state.auth)
  
    const { data: users, isLoading } = useGetUsersQuery();

    
  
    const patients = users?.filter(user => user?.userType === 'patient');
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh'}}>
            <div className='homepage-image'/>
            <h2 className='text-center Heading-details'>All patients</h2>
            <hr className="horizontal-line"/>
            {users ? (
              <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB', width:'90%', marginLeft:'50px' }}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Type</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.userId}>
                      <td><Link to={`/user/${patient.userId}`}>{patient.email} </Link></td>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.userType}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No users available.</p>
            )}
            </div>
      )}
    </div>
  )
}

export default Doctors