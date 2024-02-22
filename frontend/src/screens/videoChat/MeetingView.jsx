import React, { useState, useEffect } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import SpeakerView from "./SpeakerView";
import ViewerView from "./ViewerView";
import { useRef } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import FlyingEmojisOverlay from "./FlyingEmojisOverlay";
import { Button } from "react-bootstrap";
function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join, changeMode } = useMeeting();
  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
    onParticipantModeChanged: (data) => {
     console.log("participantModeChanged", data)
    },
    onError: (error) => {
      alert(error.message);
    },
    onHlsStateChanged: (data) => {
      console.log("HLS State Changed", data);
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const [joinLivestreamRequest, setJoinLivestreamRequest] = useState();

  usePubSub(`CHANGE_MODE_${mMeeting.localParticipant?.id}`, {
    onMessageReceived: (pubSubMessage) => {
      setJoinLivestreamRequest(pubSubMessage);
    },
  });

  return (
    <div className="container text-center">
      <FlyingEmojisOverlay />
      <h1>PLease Join the meeting</h1>
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined === "JOINED" ? (
        mMeeting.localParticipant.mode === Constants.modes.CONFERENCE ? (
          <SpeakerView meetingId={props.meetingId} />
        ) : mMeeting.localParticipant.mode === Constants.modes.VIEWER ? (
          <>
            {joinLivestreamRequest && (
              <div>
                {joinLivestreamRequest.senderName} requested you to join
                Livestream
                <Button variant="success"
                  onClick={() => {
                    changeMode(joinLivestreamRequest.message);
                    setJoinLivestreamRequest(null);
                  }}
                >
                  Accept
                </Button>
                <Button variant="danger"
                  onClick={() => {
                    setJoinLivestreamRequest(null);
                  }}
                >
                  Reject
                </Button>
              </div>
            )}
            <ViewerView />
          </>
        ) : null
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <Button variant='primary' onClick={joinMeeting}>Join</Button>
      )}
    </div>
  );
  }

  export default MeetingView;