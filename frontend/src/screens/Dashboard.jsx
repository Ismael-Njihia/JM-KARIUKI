import React from 'react';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);

  // Check if the user is an admin
  const isAdmin = userInfo?.userType === 'admin';

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        isAdmin ? (
          <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh'}}>
            <h2 className='text-center'>All Users</h2>
            {users ? (
              <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB', width:'90%', marginLeft:'50px' }}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Type</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.userType}</td>
                      <td>
                        <FaEdit className='text-primary mr-5' />
                        </td>
                        <td>
                        <FaTrashAlt className='text-danger' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No users available.</p>
            )}
            <h2>All Appointments</h2>
            <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB' }}>
              {/* Render appointments table */}
            </Table>
          </div>
        ) : (
          <p>You do not have permission to view this content.</p>
        )
      )}
    </div>
  );
};

export default Dashboard;
