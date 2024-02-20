import React, { useEffect } from 'react';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);

// Update users on the page when the users state changes
useEffect(() => {}, [users]);

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
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td> <Link to={`/admin/users/${user.userId}`}>{user.email}</Link> </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.userType}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No users available.</p>
            )}
          </div>
        ) : (
          <p>You do not have permission to view this content.</p>
        )
      )}
    </div>
  );
};

export default UsersList;