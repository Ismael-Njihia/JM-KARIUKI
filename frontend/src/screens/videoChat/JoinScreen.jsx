import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaVideo, FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';
function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState(null);
    const onClick = async () => {
      await getMeetingAndToken(meetingId);
    };
  
    return (
      <div className="text-center" >
        <h1 className="text-center">Welcome to the Video Meeting</h1>
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
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-join">Join Meeting</Tooltip>}
        >
          <Button variant="primary" onClick={onClick} className="mr-2"style={{ marginLeft: '30px'}}>
            <FaVideo />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-join">Create a  Meeting</Tooltip>}
        >
          <Button variant="success" onClick={onClick} style={{ marginLeft: '30px'}}>
            <FaPlusCircle />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
export default JoinScreen;  