import {useSelector} from 'react-redux';
import {useGetUsersQuery} from '../../slices/usersApiSlice';
import Controls from './Controls';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactPlayer from "react-player";
function ParticipantView(props) {
  const micRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);


  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);
 
  
    const { participants } = useMeeting();


console.log(participants, "participants");

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


  
  return (
    <Container>
       <h3 className="text-center">Participants</h3>
    <Row>   
      <Col xs={12} md={6} lg={4}>
    
        {participants? (
         <Card className="text-center mb-3 bg-dark text-white">
          <Card.Header>
          {displayName}
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
          </Card.Body>
        </Card>
        
        
        ): null}
      </Col>
    </Row>
  </Container>
  );
}


export default ParticipantView;