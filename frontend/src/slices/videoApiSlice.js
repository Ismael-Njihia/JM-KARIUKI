export const authToken =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4YzdkMjM4Mi00NDM0LTRhMGMtYjhmNS1iMmNkOTkyMWRiZDAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwODUxNTQ4OCwiZXhwIjoxNzI0MDY3NDg4fQ.rfTMKLS0HanH_CnFajZtMxtvf4u4UFCOmDBqetZTLxU"



// API call to create meeting
export const createMeeting = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};

