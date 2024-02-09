import { useSelector } from "react-redux";
import { useFetchAppointmentsQuery } from '../slices/ApppointmentApiSlice';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyAppointments = () => {
    const { userInfo } = useSelector(state => state.auth);
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
    const { data: appointments, isLoading } = useFetchAppointmentsQuery();
    console.log(appointments);
    const { data: users, loading } = useGetUsersQuery();
    const patientAppointments = appointments?.filter(appointment => appointment.userId === userId);

    return (
        <>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
                        <h2 className='text-center'>Patient {firstName} Appointments</h2>
                        {patientAppointments && patientAppointments.length >  0 ? (
                            <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB', width: '90%', marginLeft: '50px', fontSize:"12px" }}>
                                <thead style={{fontSize: "12px"}}>
                                    <tr>
                                        <th>Appointment Id</th>
                                        <th>Doctor Email</th>
                                        <th>Doctor First Name</th>
                                        <th>Doctor Last Name</th>
                                        <th>Appointment Date</th>
                                        <th>Appointment Time</th>
                                        <th>Message</th>
                                        <th>Appointment Status</th>
                                        <th>chat</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientAppointments.map((appointment) => {
                                        const doctorDetails = users?.find(user => user.userId === appointment.doctorId);
                                        console.log(doctorDetails);
                                        return (
                                            <tr key={appointment.appointId}>

                                                <td> <Link to= {`/doctor/view_appointment/${appointment.appointId}`}>{appointment.appointId}</Link> </td>
                                                {doctorDetails ? (
                                                    <>
                                                        <td>{doctorDetails.email}</td>
                                                        <td>{doctorDetails.firstName}</td>
                                                        <td>{doctorDetails.lastName}</td>
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
                                                <td>{appointment.appointStatus}</td>
                                                <td>
                                                    <button>
                                                    <Link to={`/chat/${appointment.doctorId}`}>Chat</Link>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button>
                                                        cancel
                                                    </button>
                                                </td>
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

export default MyAppointments;
