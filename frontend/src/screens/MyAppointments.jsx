import { useSelector } from "react-redux";
import { useFetchAppointmentsQuery } from '../slices/ApppointmentApiSlice';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LuMessagesSquare } from "react-icons/lu";
import { TbCalendarCancel } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCancelAppointmentMutation } from '../slices/ApppointmentApiSlice';
import { toast, ToastContainer } from 'react-toastify';
import {useDeleteAppointmentMutation} from '../slices/ApppointmentApiSlice';
import '../Assets/Homepage.css';
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
    const { userInfo } = useSelector(state => state.auth);
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
    const { data: appointments, isLoading } = useFetchAppointmentsQuery();
    //console.log(appointments);
    const { data: users, loading } = useGetUsersQuery();
    const patientAppointments = appointments?.filter(appointment => appointment.userId === userId);
    const [show, setShow] = useState(false);
    const [selectedAppointId, setSelectedAppointId] = useState(null);
    const [cancelAppointment, { isLoading: cancelLoading }] = useCancelAppointmentMutation();
    const [deleteAppointment, { isLoading: deleteLoading }] = useDeleteAppointmentMutation();
    const [showDelete, setShowDelete] = useState(false);
    const [selectedAppointIdDelete, setSelectedAppointIdDelete] = useState(null);
    const handleShow = (appointId) => {
        console.log(appointId)
        setSelectedAppointId(appointId); // Set the selected appointment ID in the state
        setShow(true); // Show the modal
      };

    const handleShowDelete = (appointId) => {
        console.log(appointId)
        setSelectedAppointIdDelete(appointId); 
        setShowDelete(true);    
        };
    
    const handleClose = () => setShow(false);
    const handleCloseDelete = () => setShowDelete(false);
    
  
    const handleCancel = async () => {
      try {
        //console.log(selectedAppointId, 'selectedAppointId');
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
    const handleDelete = async () => {
      try {
         console.log(selectedAppointIdDelete, 'selectedAppointId');
         const response = await deleteAppointment(selectedAppointIdDelete);
        // console.log(response);
         if(response.error) {
             toast.error(response.error.data.message || 'An error occured');
             return;
         } else {
             toast.success('Appointment deleted successfully');
             console.log(response);
             // Update the state to reflect the deletion
             appointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== selectedAppointIdDelete));
         }
      } catch (error) {
         toast.error(error?.data?.message);
         console.log(error);
      } finally {
         handleCloseDelete();
      }
     }
     
    const showCancelledError = () => {
      toast.error('You cannot Chat  for a cancelled or completed appointment');
  }
    return (
        <>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
                      <div className='homepage-image'/>
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
                                        <th>Cancel</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientAppointments.map((appointment) => {
                                        const doctorDetails = users?.find(user => user.userId === appointment.doctorId);
                                        console.log(doctorDetails);
                                        return (
                                            <tr key={appointment.appointId}>

                                                <td> {appointment.appointId}</td>
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
                                               <td>{appointment.appointDatetime.split('T')[0]}</td>
                                                <td>{appointment.appointDatetime.split('T')[1]}</td>
                                                <td>{appointment.message}</td>
                                                <td className={appointment.appointStatus === 'scheduled' ? 'text-success' : 'text-danger'}>
                                                {appointment.appointStatus}
                                                </td>
                                                <td>
                                                {/* {appointment.appointStatus !== 'cancelled' && appointment.appointStatus !== 'completed' ? ( */}
                                                        <button className="btn btn-transparent">
                                                           <Link to={`/chat/${appointment.appointId}/${appointment.userId}`}>
                                                    <LuMessagesSquare class='btn-primary'  style={{color:'#0d6efd'}}>
                                                    </LuMessagesSquare>
                                                    </Link>
                                                        </button>
                                                        {/* ) : ( */}
                                                        {/* <button className="btn btn-transparent"  onClick={showCancelledError}>
                                                            <span>
                                                            <LuMessagesSquare  style={{color:'#0d6efd'}} />
                                                            </span>
                                                        </button> */}
                                                         {/* )} */}
                                                </td>
                                                <td>
                                                <button class="btn btn-transparent" onClick={() => handleShow(appointment.appointId)}>
                                                    <TbCalendarCancel  style={{color: '#dc3545'}}/>
                                                </button>
                                                </td>
                                                <td>
                                                <button class="btn btn-transparent">
                                                  <Link to={`/edit_appointment/${appointment.appointId}`}>
                                                    <FaPencilAlt  class='text-success'/>  
                                                  </Link>
                                                </button>
                                                </td>
                                                <td>
                                                <button class="btn btn-transparent" onClick={() => handleShowDelete(appointment.appointId)}>
                                                    <FaTrash  style={{color: '#dc3545'}}/>
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
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this appointment? this action cannot be undone</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={cancelLoading}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
        </>
    );
};

export default MyAppointments;
