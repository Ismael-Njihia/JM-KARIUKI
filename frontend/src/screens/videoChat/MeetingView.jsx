import React, { useState, useEffect } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticipantsView";
import { Button } from "react-bootstrap";
import { useSendMeetingIdToUserMutation } from '../../slices/ApppointmentApiSlice';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function MeetingView(props) {
  const { id } = useParams();
  const [sendMeetingId] = useSendMeetingIdToUserMutation();
  const [joined, setJoined] = useState(null);
  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const sendmeetingId = () => {
    sendMeetingId({ meetingId: props.meetingId, appointId: id })
      .then(res => {
        console.log(res);
        alert(res.data.message);
      })
      .catch(error => {
        console.error(error);
        toast.error("An error occurred");
      });
  };

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined === "JOINED" ? (
        <div>
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <>
          <Button variant='primary' onClick={joinMeeting}>Join</Button>
          <br />
          <br />
          <Button variant='primary' onClick={sendmeetingId}>Send Meeting ID</Button>
        </>
      )}
    </div>
  );
}

export default MeetingView;
