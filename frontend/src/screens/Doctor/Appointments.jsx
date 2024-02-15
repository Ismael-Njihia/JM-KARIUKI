import { useSelector } from "react-redux";
import { useFetchAppointmentsQuery } from '../../slices/ApppointmentApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LuMessagesSquare } from "react-icons/lu";
import { TbCalendarCancel } from "react-icons/tb";
import { FaHandHoldingMedical } from "react-icons/fa";
import {useCancelAppointmentMutation} from '../../slices/ApppointmentApiSlice';
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
const Appointments = () => {
    const { userInfo } = useSelector(state => state.auth);
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
    const { data: appointments, isLoading } = useFetchAppointmentsQuery();
    const [show, setShow] = useState(false);
    const [selectedAppointId, setSelectedAppointId] = useState(null);
    

    //cancel appointment
    const [cancelAppointment, { isLoading: cancelLoading }] = useCancelAppointmentMutation();

    const handleShow = (appointId) => {
        console.log(appointId)
        setSelectedAppointId(appointId); // Set the selected appointment ID in the state
        setShow(true); // Show the modal
      };
    const handleClose = () => setShow(false);
  
    const handleCancel = async () => {
      try {
        console.log(selectedAppointId, 'selectedAppointId');
        const response = await cancelAppointment(selectedAppointId).unwrap();
        console.log(response);
        if(response.error) {
            toast.error(response.error.data.message || 'An error occured');
            return;
        }
        else{
        toast.success('Appointment canceled successfully');
        console.log(response);
        }
      } catch (error) {
        toast.error(error?.data?.message);
        console.log(error);
      } finally {
        handleClose();
      }
    }
    const { data: users, loading } = useGetUsersQuery();
    const doctorAppointments = appointments?.filter(appointment => appointment.doctorId === userId);
    const showCancelledError = () => {
        toast.error('You cannot prescribe/ Chat  for a cancelled or completed appointment');
    }

    return (
        <>
            <div>
                    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
                        <h2 className='text-center'>Doctor {firstName} Appointments</h2>
                        {doctorAppointments ? (
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
                                        <th>chat</th>
                                        <th>Cancel</th>
                                        <th>Prescribe</th>
                                        <th>Appointment Status</th>
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
                                                <td>
                                                    {/* I */}
                                               {appointment.appointStatus !== 'cancelled' && appointment.appointStatus !== 'completed' ? (
                                                        <button className="btn btn-transparent">
                                                           <Link to={`/chat/${appointment.appointId}/${appointment.userId}`}>
                                                    <LuMessagesSquare class='btn-primary'  style={{color:'#0d6efd'}}>
                                                    </LuMessagesSquare>
                                                    </Link>
                                                        </button>
                                                        ) : (
                                                        <button className="btn btn-transparent"  onClick={showCancelledError}>
                                                            <span>
                                                            <LuMessagesSquare  style={{color:'#0d6efd'}} />
                                                            </span>
                                                        </button>
                                                        )}

                                                                                                        </td>
                                                <td>
                                                <button class="btn btn-transparent" onClick={() => handleShow(appointment.appointId)}>
                                                    <TbCalendarCancel style={{color: '#dc3545'}}/>
                                                </button>
                                                </td>
                                                <td>
                                                    {/* if appointment. status == 'cancelled' disable navigating to the chat component link*/}
                                                    {appointment.appointStatus !== 'cancelled' && appointment.appointStatus !== 'completed' ? (
  <button className="btn btn-transparent">
    <Link to={`/doctor/prescribe/${appointment.appointId}`}>
      <FaHandHoldingMedical style={{color:'#0d6efd'}} />
    </Link>
  </button>
) : (
  <button className="btn btn-transparent" onClick={showCancelledError}>
    <span>
      <FaHandHoldingMedical style={{color:'#0d6efd'}} />
    </span>
  </button>
)}

                                                </td>
                                                <td className={appointment.appointStatus === 'completed' && 'cancelled'? 'text-danger' : 'text-success'}>
                                                {appointment.appointStatus}
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
            </div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this appointment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleCancel} disabled={cancelLoading}>
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
            
        </>
    );
};

export default Appointments;
