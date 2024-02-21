import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { createMeeting, authToken } from "../../slices/videoApiSlice";
import ReactPlayer from "react-player";
import { Button, Tooltip, OverlayTrigger, Card, Container, Row, Col } from 'react-bootstrap';
import { FaVideo, FaPlusCircle } from 'react-icons/fa';
import {  FaMicrophone, FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useGetUsersQuery} from '../../slices/usersApiSlice';

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


function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal } =
    useParticipant(props.participantId);
    const { userInfo } = useSelector((state) => state.auth);
    const { data: users, isLoading } = useGetUsersQuery();

    const [usersInMeeting, setUsersInMeeting] = useState([]);

    useEffect(() => {
      if (users) {
        setUsersInMeeting(users?.filter((user) => user.userId === userInfo?.userId));
      }
    }, [users, userInfo.userId]);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  const { participants } = useMeeting();
console.log(participants, "participants");
  return (
    <Container>
    <Row>
      <Col xs={12} md={6} lg={4}>
        <h3 className="text-center">Participants</h3>
        {usersInMeeting?.map((user, index) => (
        <Card className="text-center mb-3">
          <Card.Header>
            {user.firstName} {user.lastName}
          </Card.Header>
          <Card.Body>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
              <ReactPlayer
                playsinline
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={videoStream}
                width="100%"
                height="100%"
                onError={(err) => {
                  console.log(err, "participant video error");
                }}
              />
            )}
            <Card.Footer>
              {[...participants.keys()].map((participantId) => (
          <Controls participantId={participantId} key={participantId} />
          
      ))}
            </Card.Footer>
          </Card.Body>
        </Card>
        
        
        ))}
      </Col>
    </Row>
  </Container>
  );
}
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

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <div>
          
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
        
        
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
        
      )}
      
    </div>
  );
}

function MeetingEntry() {
  const [meetingId, setMeetingId] = useState(null);
  
  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default MeetingEntry;