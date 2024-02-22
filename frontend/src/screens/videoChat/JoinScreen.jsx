import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {  FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
function JoinScreen({ getMeetingAndToken, setMode }) {
   const [meetingId, setMeetingId] = useState(null);


  
   const onClick = async (mode) => {
       setMode(mode);
       await getMeetingAndToken(meetingId);
     };
    return (
 


<div className="container text-center" style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
<h1 className="text-center">Welcome to the Video Meeting</h1>
<OverlayTrigger
         placement="bottom"
         overlay={<Tooltip id="tooltip-join">Create a  Meeting</Tooltip>}
       >
     <Button onClick={() => onClick("CONFERENCE")} className='btn-primary'>Create Meeting  <FaPlusCircle /></Button>
     </OverlayTrigger>
     <br />
     <br />
     {" or "}
     <br />
     <br />
     <input
         type="text"
         placeholder="Enter Meeting Id"
         className="form-control mb-3"
         style={{ width: '300px', display: 'inline-block'}}
         onChange={(e) => {
           setMeetingId(e.target.value);
         
         }}
       />
     <br />
     <br />
     <OverlayTrigger
         placement="bottom"
         overlay={<Tooltip id="tooltip-join">Join as Host </Tooltip>}
       >
     <Button variant="primary" onClick={() => onClick("CONFERENCE")}>
     <MdAdminPanelSettings />
     </Button>
     </OverlayTrigger>
     {" or "}
     <OverlayTrigger
         placement="bottom"
         overlay={<Tooltip id="tooltip-join">Join as Viewer</Tooltip>}
       >
     <Button  variant='success' onClick={() => onClick("VIEWER")}><FaPlusCircle /></Button>
     </OverlayTrigger>
   </div>
   );
 }
export default JoinScreen; 