import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantsView from "./ParticipantsView";
import { useParams } from "react-router-dom";
import {useSendMeetingIdToUserMutation} from '../../slices/ApppointmentApiSlice'
import {toast} from "react-toastify"

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const {id} = useParams();
    const [sendMeetingId] = useSendMeetingIdToUserMutation();
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
    const sendmeetingId = () => {
      sendMeetingId({meetingId: props.meetingId, appointId: id})
      .then(res => {
        console.log(res);
        alert(res.data.message)
       
      })
      .catch(error => {
        console.error(error);
        toast.error("An error occurred");
      });
      
    }
  
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
          <>
          <button onClick={joinMeeting}>Join</button>
          
          <button onClick={sendmeetingId}>Send Meeting Id</button>
          </>
          
        )}
        
      </div>
    );
  }

  export default MeetingView;