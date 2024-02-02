import { useSelector } from "react-redux"
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Doctors = () => {
    const {userInfo} = useSelector(state => state.auth)
    const { data: users, isLoading } = useGetUsersQuery();

    //fetch users that are doctors alone
    const doctors = users?.filter(user => user?.userType === 'doctor');
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh'}}>
            <h2 className='text-center'>All Doctors</h2>
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
                  {doctors.map((doctor) => (
                    <tr key={doctor.email}>
                      
                      <td><Link to = {`/doctor/patient/${doctor.userId}`}>{doctor.userId} </Link></td>
                     
                      <td>{doctor.email}</td>
                      <td>{doctor.firstName}</td>
                      <td>{doctor.lastName}</td>
                      <td>{doctor.userType}</td>
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