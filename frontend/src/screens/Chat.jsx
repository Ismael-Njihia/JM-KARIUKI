import { Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { useSendMessageMutation, useFetchMessagesByUserMutation } from '../slices/messagesApiSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Chat = () => {
  const { appointId, id } = useParams();
  console.log(appointId)
  console.log(id)
  const { data: users, loading } = useGetUsersQuery();
  const doctorDetails = users?.find(user => user.userId === id);
  const patientDetails = users?.find(user => user.userId === id);
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo.userId;
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const { data: previousMessages, isloading } = useFetchMessagesByUserMutation()
  const [message, setMessage] = useState('');
  

  const userMessages = previousMessages?.filter(message => message.appointId === appointId);
  const handleSendMessage = async () => {
    // Construct the message object
    const messageData = {
      receiverId: id,
      appointId,
      messageText: message,
    };

    try {
      const res = await sendMessage(messageData);
      if (res.error) {
        toast.error(res.error?.data?.errMessage);
      } else {
        toast.success('Message sent successfully');
        setMessage('');
      }
    } catch (error) {
      toast.error('Error sending message: ' + error.message);
    }
  };

  // Determine whether to show doctor or patient details
  const userType = doctorDetails?.userType || '';
  const userPatient = patientDetails?.userType || '';
  const isDoctor = userType === 'doctor';
  const isPatient = userPatient === 'patient';
  const userDetails = isDoctor ? doctorDetails : isPatient ? patientDetails : userInfo;

  return (
    <div>
      <Row style={{ marginLeft: '20px', marginRight: '20px' }}>
        <Col md={6} style={{ border: '2px solid blue' }}>
          <h2>{isDoctor ? 'Doctor Details' : 'Patient Details'}</h2>
          <p>Name: {userDetails?.firstName}</p>
          <p>Email: {userDetails?.email}</p>
          {/* More details can be displayed here */}
        </Col>
        <Col md={6} style={{ border: '2px solid red' }}>
          <h2>Conversation</h2>
          <div>
            {userMessages?.map((msg, index) => ( 
              <p key={index}>
                <strong>{msg.userId}:</strong> {msg.messageText}
              </p>
            ))}
          </div>
          <Form>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="primary" onClick={handleSendMessage} disabled={isLoading}>Send</Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Chat;
