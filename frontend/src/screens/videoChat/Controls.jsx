import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {  FaMicrophone, FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa';
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useRef } from "react";
function Controls(props) {
    const micRef = useRef(null);
    const { leave, toggleMic, toggleWebcam } = useMeeting();
  
    const { webcamOn, micOn } =
    useParticipant(props.participantId);
    return (
      <div className="d-flex justify-content-center">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-join">Leave Meeting</Tooltip>}
        >
          <Button variant="danger" onClick={() => leave()} className="mr-2" style={{ marginLeft: '30px' }}>  Leave
            
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-join">
            {micOn ? "Mute" : "Unmute"} Microphone
          </Tooltip>}
        >
          <Button variant="primary" onClick={() => toggleMic()} className="mr-2" style={{ marginLeft: '30px' }}>
           {micOn?<FaMicrophoneSlash />: <FaMicrophone />}
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-join">
            {webcamOn ? "Stop" : "Start"} Video
          </Tooltip>}
        >
          <Button variant="success" onClick={() => toggleWebcam()} style={{ marginLeft: '30px' }}>
            <FaVideoSlash />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
export default Controls;  