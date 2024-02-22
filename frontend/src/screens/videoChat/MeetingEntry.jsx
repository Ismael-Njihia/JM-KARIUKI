import React, { useState } from "react";
import {
  MeetingProvider, MeetingConsumer
} from "@videosdk.live/react-sdk";
import { createMeeting, authToken } from "../../slices/videoApiSlice";
import MeetingView from "./MeetingView";
import JoinScreen from "./JoinScreen";
function MeetingEntry() {
  const [meetingId, setMeetingId] = useState(null);
  const [mode, setMode] = useState("CONFERENCE");
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


}

export default MeetingEntry;