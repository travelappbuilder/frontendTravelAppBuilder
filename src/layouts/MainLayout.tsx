import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AiFloatingButton from "../components/ai/AiFloatingButton";
import AiChatPopup from "../components/ai/AiChatPopup";

const MainLayout: React.FC = () => {
  const [showAi, setShowAi] = useState(false);

  return (
    <>
      {/* Les routes enfants seront injectées ici par Outlet */}
      <Outlet />

      {/* Chat AI */}
      <AiFloatingButton onClick={() => setShowAi(true)} />
      {showAi && <AiChatPopup onClose={() => setShowAi(false)} />}
    </>
  );
};

export default MainLayout;
