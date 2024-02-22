import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantsView from "./ParticipantsView";

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
              <ParticipantsView
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

  export default MeetingView;