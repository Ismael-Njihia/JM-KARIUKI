import { Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { useSendMessageMutation, useGetMessagesByAppointIdQuery } from '../slices/messagesApiSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../Assets/chat.css'
import { IoIosSend } from "react-icons/io";

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
    return formattedDate;
  };

const Message =({message, userId}) =>{
    const isMe = message.senderId === userId;

    return(
        <div className={`Message ${isMe ? 'right' : 'left'}`} key={message.messageId}>

            <p style={{color: 'white'}}>{message.messageText}</p>
            <p className='timeStamp' style={{ color: '#C0C0C0', fontSize: '10px' }}>{formatTimestamp(message.timestamp)}</p>

        </div>
    )
}




const Chat = () => {
  const { appointId, id } = useParams();
  //get previous messages
  const {data: messages, loading: messagesLoading} = useGetMessagesByAppointIdQuery(appointId);
  
  console.log(messages)

  const { data: users, loading } = useGetUsersQuery();
  const doctorDetails = users?.find(user => user.userId === id);
  const patientDetails = users?.find(user => user.userId === id);
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo.userId;
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  
  const [message, setMessage] = useState('');
  
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
  const userDetails = isDoctor ? doctorDetails: isPatient ? patientDetails : userInfo;


  return (
    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
      <Row style={{ marginLeft: '20px', marginRight: '20px' }}>
        <Col md={6} style={{ border: '2px solid black' }}>
          <h2>{isPatient ? 'Patient Details' : 'Doctor Details'  }</h2>
          <p>First Name: {userDetails?.firstName}</p>
          <p>Last Name: {userDetails?.lastName}</p>
          <p>Email: {userDetails?.email}</p>
        </Col>
        <Col md={6}>
          <h2>Conversation</h2>
           <div className='MessageConvo'>
            {messagesLoading ? (
              <p>Loading messages...</p>
            ) : messages?.length === 0 ? (
              <p>No messages yet</p>
            ) : (
              messages?.map((message) => (
                <Message key={message.messageId} message={message} userId={userId} />
              ))
            )}
           </div>
           <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Type your message here..."
                style={{ marginBottom: '10px', resize: 'none', overflow: 'hidden', transition: 'height 0.5s' }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={(e) => { e.target.rows = 3; }}
                onBlur={(e) => { e.target.rows = 1; }}
              />
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={isLoading}
                style={{ alignSelf: 'flex-end',position:'absolute',  width: 'fit-content', alignItems: 'center', justifyContent: 'center'}}
              >
                <IoIosSend /> 
              </Button>
            </Form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Chat;