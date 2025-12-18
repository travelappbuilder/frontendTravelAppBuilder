import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { sendMessageToAi } from "../../api/aiService";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface Props {
  onClose: () => void;
}

const AiChatPopup: React.FC<Props> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Bonjour 👋 Je suis votre assistant IA." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await sendMessageToAi(input);

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: aiResponse },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "❌ Une erreur est survenue.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-96 bg-white shadow-xl rounded-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-bold text-blue-600">Assistant IA</h3>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="italic">L’IA réfléchit...</p>}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 rounded"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AiChatPopup;
