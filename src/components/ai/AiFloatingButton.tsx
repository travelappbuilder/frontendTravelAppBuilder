import React from "react";
import { MessageCircle } from "lucide-react";

interface Props {
  onClick: () => void;
}

const AiFloatingButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      title="Assistant IA"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default AiFloatingButton;
