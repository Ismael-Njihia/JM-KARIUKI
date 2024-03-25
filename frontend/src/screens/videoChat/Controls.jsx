import React from "react";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaMicrophone, FaVideoSlash, FaMicrophoneSlash, FaVideo } from 'react-icons/fa';
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";

function Controls(props) {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const { webcamOn, micOn } = useParticipant(props.participantId);

  const getWebcamIcon = () => {
    return  <FaVideo /> ;
  }

  const getMicIcon = () => {
    return  <FaMicrophone />;
  }

  return (
    <div className="d-flex justify-content-center">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-leave">Leave Meeting</Tooltip>}
      >
        <Button variant="danger" onClick={() => leave()} className="mr-2" style={{ marginLeft: '30px' }}>Leave</Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-mic">{micOn ? "Mute" : "Unmute"} Microphone</Tooltip>}
      >
        <Button variant="primary" onClick={() => toggleMic()} className="mr-2" style={{ marginLeft: '30px' }}>
          {getMicIcon()}
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-video">{webcamOn ? "Stop" : "Start"} Video</Tooltip>}
      >
        <Button variant="success" onClick={() => toggleWebcam()} style={{ marginLeft: '30px' }}>
          {getWebcamIcon()}
        </Button>
      </OverlayTrigger>
    </div>
  );
}

export default Controls;
