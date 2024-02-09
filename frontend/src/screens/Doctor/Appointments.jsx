import { useSelector } from "react-redux";
import { useFetchAppointmentsQuery } from '../../slices/ApppointmentApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Appointments = () => {
    const { userInfo } = useSelector(state => state.auth);
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
    const { data: appointments, isLoading } = useFetchAppointmentsQuery();

    console.log(appointments);
    const { data: users, loading } = useGetUsersQuery();
    const doctorAppointments = appointments?.filter(appointment => appointment.doctorId === userId);


    return (
        <>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
                        <h2 className='text-center'>Doctor {firstName} Appointments</h2>
                        {doctorAppointments && doctorAppointments.length >  0 ? (
                            <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB', width: '90%', marginLeft: '50px' }}>
                                <thead>
                                    <tr>
                                        <th>Appointment Id</th>
                                        <th>Patient Email</th>
                                        <th>Patient First Name</th>
                                        <th>Patient Last Name</th>
                                        <th>Appointment Date</th>
                                        <th>Appointment Time</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctorAppointments.map((appointment) => {
                                        const patientDetails = users?.find(user => user.userId === appointment.userId);
                                        return (
                                            <tr key={appointment.appointId}>

                                                <td> <Link to= {`/doctor/view_appointment/${appointment.appointId}`}>{appointment.appointId}</Link> </td>
                                                {patientDetails ? (
                                                    <>
                                                        <td>{patientDetails.email}</td>
                                                        <td>{patientDetails.firstName}</td>
                                                        <td>{patientDetails.lastName}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>Unknown</td>
                                                        <td>Unknown</td>
                                                        <td>Unknown</td>
                                                    </>
                                                )}
                                                <td>{appointment.appointDatetime}</td>
                                               <td>
                                            {appointment.timestamp.split('T')[1].split('.')[0]}
                                            </td>
                                                <td>{appointment.message}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No appointments available.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Appointments;
