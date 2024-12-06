import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Left from "../Left/Left";
import Right from "../Right/Right";

function MainApp() {
  const [activeSection, setActiveSection] = useState("messages");
  const [chatList, setChatList] = useState([]); // Maintain a list of chats
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Add a new chat to the list and select it
  const handleChatCreate = (newChat) => {
    setChatList((prevChats) => [...prevChats, newChat]);
    setSelectedChat(newChat);
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveSection={setActiveSection} />

      <div className="flex-1 border-r">
        <Left
          activeSection={activeSection}
          setChatList={setChatList}
          setSelectedChat={setSelectedChat}
          setSelectedProfile={setSelectedProfile}
          selectedChat={selectedChat}

        />
      </div>

      <div className="flex-1">
        <Right
          selectedChat={selectedChat}
          selectedProfile={selectedProfile}
          addChatToList={handleChatCreate}
          setSelectedChat={setSelectedChat}
          setActiveSection={setActiveSection}
          chatList={chatList}
        />
      </div>
    </div>
  );
}

export default MainApp;