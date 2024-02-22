import {useSelector} from 'react-redux';
import {useGetUsersQuery} from '../../slices/usersApiSlice';
import Controls from './Controls';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactPlayer from "react-player";
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

export default ParticipantView;