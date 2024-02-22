import React, { useMemo } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import ParticipantsView from "./ParticipantsView";
import Controls from "./Controls";
import ViewerList from "./ViewerList";

function SpeakerView(props) {
  const { participants, hlsState } = useMeeting();
  const speakers = [...participants.values()].filter((participant) => {
    return participant.mode === Constants.modes.CONFERENCE;
  });

  return (
    <div>
      <p>Current HLS State: {hlsState}</p>
      <Controls meetingId={props.meetingId} />
      {speakers.map((participant) => (
        <ParticipantsView participantId={participant.id} key={participant.id} />
      ))}
      <ViewerList />
    </div>
  );

  }
  
  export default SpeakerView;
