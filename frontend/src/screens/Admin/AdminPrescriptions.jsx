import React, { useEffect, useState } from 'react';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {useFetchMedicalQuery} from '../../slices/medicalApiSlice';
import {useFetchAppointmentsQuery} from '../../slices/ApppointmentApiSlice';

const AdminPrescriptions = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const {data: appointments, isLoading: appointLoading} = useFetchAppointmentsQuery();

const {data: medicals, isLoading: medicalsLoading} = useFetchMedicalQuery();

const [medicalCopies, setMedicalCopies] = useState([]);

  useEffect(() => {
    if (!isLoading && !appointLoading && !medicalsLoading) {
      const medicalCopies = medicals.map((medical) => {
        const appointment = appointments.find(appoint => appoint.appointId === medical.appointId);
        if (appointment) {
          const user = users.find(user => user.userId === appointment.userId);
          if (user) {
            // Create a copy of the medical object and add new properties
            const medicalCopy = {
              ...medical,
              patientName: `${user.firstName} ${user.lastName}`,
              patientEmail: user.email,
              patientDoctor: appointment.doctorName,
              appointId : appointment.appointId,
              patientId: user.userId
            };
            return medicalCopy;
          }
        }
        return null; 
      }).filter(Boolean);

      setMedicalCopies(medicalCopies);
    }
  }, [isLoading, appointLoading, medicalsLoading, medicals, appointments, users]);
  
console.log(medicalCopies);
  // Check if the user is an admin
  const isAdmin = userInfo?.userType === 'admin';

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        isAdmin ? (
          <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh'}}>
            <h2 className='text-center'>All Prescriptions</h2>
            {medicalCopies ? (
              <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB', width:'90%', marginLeft:'50px' }}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Names</th>
                    <th>DOctor</th>
                    <th>Test Results</th>
                    <th>Prescriptions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalCopies.map((user) => (
                    <tr key={user.medicalId}>
                      <td> <Link to={`/admin/users/${user.patientId}`}>{user.patientEmail}</Link> </td>
                      <td>{user.patientName}</td>

                        <td>{user.patientDoctor}</td>
                        <td>{user.test_results}</td>
                        <td>{user.prescriptions.join(', ')}</td>
                      
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

export default AdminPrescriptions;