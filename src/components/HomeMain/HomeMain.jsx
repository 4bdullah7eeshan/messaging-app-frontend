import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DynamicContent from "../DynamicContent/DynamicContent";
import ChatWindow from "../ChatWindow/ChatWindow";
import { useAuth } from "../../contexts/AuthContext";

function MainApp() {
  const [activeSection, setActiveSection] = useState("messages"); // Default to messages
  const [selectedChat, setSelectedChat] = useState(null); // Tracks selected chat
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />

      {/* Middle Column */}
      <div className="flex-1 border-r">
        <DynamicContent
          activeSection={activeSection}
          setSelectedChat={setSelectedChat}
        />
      </div>

      {/* Right Column */}
      <div className="flex-1">
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default MainApp;
