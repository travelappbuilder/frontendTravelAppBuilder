import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AiFloatingButton from "../components/ai/AiFloatingButton";
import AiChatPopup from "../components/ai/AiChatPopup";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showAi, setShowAi] = useState(false);

  return (
    <>
      {children}
      <Outlet />
      <AiFloatingButton onClick={() => setShowAi(true)} />

      {showAi && <AiChatPopup onClose={() => setShowAi(false)} />}
    </>
  );
};

export default MainLayout;
