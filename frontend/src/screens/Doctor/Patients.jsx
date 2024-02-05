import { useSelector } from "react-redux"
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
            <h2 className='text-center'>All patients</h2>
            {users ? (
              <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB', width:'90%', marginLeft:'50px' }}>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Type</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.email}>
                      <Link to = {`/doctor/patient/${patient.userId}`}>
                      <td>{patient.userId}</td>
                      </Link>
                      <td>{patient.email}</td>
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