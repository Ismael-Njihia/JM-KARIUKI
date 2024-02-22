import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {  FaMicrophone, FaVideoSlash, FaMicrophoneSlash , FaVideo} from 'react-icons/fa';
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useRef } from "react";
import Hls from "hls.js";

function Controls(props) {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
  const { webcamOn, micOn } =
 useParticipant(props.participantId)
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
            {webcamOn? <FaVideo />: <FaVideoSlash />}
          </Button>
          </OverlayTrigger>
      <Button variant='primary'style={{ marginLeft: '30px' }}
        onClick={() => {
          //Start the HLS in SPOTLIGHT mode and PIN as
          //priority so only speakers are visible in the HLS stream
          startHls({
            layout: {
              type: "SPOTLIGHT",
              priority: "PIN",
              gridSize: "20",
            },
            theme: "LIGHT",
            mode: "video-and-audio",
            quality: "high",
            orientation: "landscape",
          });
        }}
      >
        Start HLS
      </Button>
      <></>
      <Button variant='danger' style={{ marginLeft: '30px' }} onClick={() => stopHls()}>Stop HLS</Button>
    </div>
  );
}
export default Controls;  