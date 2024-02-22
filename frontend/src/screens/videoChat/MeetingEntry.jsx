import React, { useState } from "react";
import {
  MeetingProvider
} from "@videosdk.live/react-sdk";
import { createMeeting, authToken } from "../../slices/videoApiSlice";



import MeetingView from "./MeetingView";
import JoinScreen from "./JoinScreen";





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