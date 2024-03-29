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
import '../../Assets/Homepage.css';


const AdminAppointments = () => {
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
   
    const showCancelledError = () => {
        toast.error('You cannot prescribe/ Chat  for a cancelled or completed appointment');
    }

    return (
        <>
            <div>
                    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
                      <div className='homepage-image'/>
                        <h6 className='text-center' style={{margin: "10px"}}>All  Appointments</h6>
                        {appointments ? (
                            <Table striped bordered hover variant="dark" style={{ backgroundColor: '#87CEEB', width: '90%', marginLeft: '50px', fontSize:"13px"}}>
                                <thead>
                                    <tr>
                                        <th>Appointment Id</th>
                                        <th>Patient Email</th>
                                        <th>Patient First Name</th>
                                        <th>Patient Last Name</th>
                                        <th>Appointment Date</th>
                                        <th>Appointment Time</th>
                                        <th>Message</th>
                                        <th>Cancel</th>
                                        <th>Appointment Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment) => {
                                        const patientDetails = users?.find(user => user.userId === appointment.userId);
                                        return (
                                            <tr key={appointment.appointId}>

                                                <td> {appointment.appointId}</td>
                                                {patientDetails ? (
                                                    <>
                                                        <td> <Link to={`/user/${patientDetails.userId}`}>{patientDetails.email} </Link></td>
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
                                                 <td>{appointment.appointDatetime.split('T')[0]}</td>
                                                <td>{appointment.appointDatetime.split('T')[1]}</td>
                                                <td>{appointment.message}</td>
                                                <td>
                                                <button class="btn btn-transparent" onClick={() => handleShow(appointment.appointId)}>
                                                    <TbCalendarCancel style={{color: '#dc3545'}}/>
                                                </button>
                                                </td>
                                                
                                                <td className={appointment.appointStatus === 'scheduled' ? 'text-success' : 'text-danger'}>
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

export default AdminAppointments;
