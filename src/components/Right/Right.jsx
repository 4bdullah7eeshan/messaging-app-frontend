import { useState, useEffect } from "react";
import axios from "axios";
import ChatWindow from "../ChatWindow/ChatWindow";
import { useAuth } from "../../contexts/AuthContext";

function Right({
  selectedProfile,
  selectedChat,
  addChatToList,
  setSelectedChat,
  setActiveSection,
  chatList,
}) {
  const { item, type } = selectedProfile || {};
  const { user: authUser } = useAuth();
  const userId = authUser.id;

  const [isChatActive, setIsChatActive] = useState(false);
  const [shouldUpdateProfile, setShouldUpdateProfile] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      setIsChatActive(true);
    } else {
      setIsChatActive(false);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (selectedProfile && isChatActive) {
      setIsChatActive(false);
    }
  }, [selectedProfile]);

  const handleStartChat = async () => {
    console.log("handleStartChat triggered");
    const existingChat =
      Array.isArray(chatList) &&
      chatList.find((chat) => {
        const participantIds = [userId, item.id].sort();
        const chatParticipantIds = chat.participants[0].id;
        return item.id === chatParticipantIds;
      });

    console.log("Existing Chat:", existingChat);

    if (existingChat) {
      console.log("Existing chat found, selecting it");
      setSelectedChat(existingChat);

      setIsChatActive(true);
      setActiveSection("messages");
    } else {
      try {
        const participantIds = [userId, item.id];

        const response = await axios.post(
          "http://localhost:3000/chats/new",
          { participantIds },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const newChat = response.data.chat;
        console.log(newChat);
        addChatToList(newChat);
        setSelectedChat(newChat);
        setIsChatActive(true);
        setActiveSection("messages");
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    }
  };

  if (isChatActive && selectedChat) {
    return (
      <ChatWindow
        selectedChat={selectedChat}
        currentUserId={userId}
        onClose={() => setIsChatActive(false)}
      />
    );
  }

  if (!item) {
    return (
      <div className="h-full flex items-center justify-center">
        Select a user or group to view details.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {(() => {
        if (type === "people") {
          return (
            <>
              <div className="flex justify-center">
                <img
                  src={item.avatarUrl || "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"}
                  alt={`${item.username}'s avatar`}
                  className="w-32 h-32 rounded-full shadow-md object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">
                  {item.displayName || item.username}
                </h3>
              </div>
            </>
          );
        } else if (type === "group") {
          return (
            <>
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <img
                src={item.avatarUrl || "/default-group-avatar.png"}
                alt="group-avatar"
                className="w-32 h-32 object-cover rounded-full mt-2"
              />
              <p className="mt-4">{item.description}</p>
              <div className="mt-2 font-semibold">
                Admin: {item.admin || "Unknown"}
              </div>
              <div className="mt-2 font-semibold">
                Members: {Array.isArray(item.members) ? item.members.length : 0}
              </div>
            </>
          );
        }
        return null;
      })()}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleStartChat}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          {Array.isArray(chatList) &&
          chatList.find((chat) => {
            const chatParticipantIds = chat.participants[0].id;
            return item.id === chatParticipantIds;
          })
            ? "Open Chat"
            : "Start Chat"}
        </button>
      </div>
    </div>
  );
}

export default Right;
