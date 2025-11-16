import React from "react";
import { useParams } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";
import "../styles/LearningSessionsSection.css";

function SessionDetailPage() {
  const { sessionId } = useParams();

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <JitsiMeeting
        roomName={`CommunitySkillShare-${sessionId}`}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
        }}
        userInfo={{
          displayName: "Guest Learner",
        }}
        getIFrameRef={(node) => {
          node.style.height = "100vh";
          node.style.width = "100%";
        }}
      />
    </div>
  );
}

export default SessionDetailPage;
