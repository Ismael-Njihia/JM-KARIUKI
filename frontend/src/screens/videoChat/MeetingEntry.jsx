import React, { useState } from "react";
import {
 MeetingProvider, MeetingConsumer
} from "@videosdk.live/react-sdk";
import { createMeeting, authToken } from "../../slices/videoApiSlice";
import MeetingView from "./MeetingView";
import JoinScreen from "./JoinScreen";
import { useSelector } from "react-redux";
function MeetingEntry() {
 const [meetingId, setMeetingId] = useState(null);
 const {userInfo} = useSelector((state) => state.auth);
 const firstName = userInfo?.firstName;
 const lastName = userInfo?.lastName;
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


 return (
   <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
   {authToken && meetingId ? (
     <MeetingProvider
       config={{
         meetingId,
         micEnabled: true,
        webcamEnabled: true,
         name: `${firstName} ${lastName}`
       }}
       token={authToken}
     >
       <MeetingConsumer>
         {() => (
           <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
         )}
       </MeetingConsumer>
     </MeetingProvider>
   ) : (
     <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    )}
   </div>
 );


}


export default MeetingEntry;