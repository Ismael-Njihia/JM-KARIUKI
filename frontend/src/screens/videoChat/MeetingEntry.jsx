import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

function MeetingView() {
    return null
}
const MeetingEntry = () => {
 return (
  <MeetingProvider
  config={{
    meetingId: "yjq2-xmeb-9l0t",
    micEnabled: true,
    webcamEnabled: true,
    name: "David's Org",
  }}
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4YzdkMjM4Mi00NDM0LTRhMGMtYjhmNS1iMmNkOTkyMWRiZDAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwODQ5OTIyMiwiZXhwIjoxNzA4NTg1NjIyfQ.W7kdwBogMhY68pjo1jSl4ip1bu611HuZU3wpc_PRB3o"
>
  <MeetingView />
</MeetingProvider>
 )
};
export default MeetingEntry;