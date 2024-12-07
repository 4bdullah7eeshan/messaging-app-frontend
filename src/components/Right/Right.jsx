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
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState({});
  const [friendRequestStatus, setFriendRequestStatus] = useState("");


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

  useEffect(() => {
    const checkFriendshipStatus = async () => {
      if (!item || !item.id) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/friends/u/f/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setIsFriend(response.data.isFriend);
      } catch (error) {
        console.error("Error checking friendship status:", error);
      }
    };

    checkFriendshipStatus();
  }, [item]);

  useEffect(() => {
    const fetchFriendRequestStatus = async () => {
      if (!item || !item.id) return;
  
      try {
        const response = await axios.get("http://localhost:3000/friend_requests/user/:userId", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
  
        const { incomingRequests, outgoingRequests } = response.data;
  
        // Check if a request has been sent to the user
        const isSent = outgoingRequests.some((req) => req.friendId === item.id);
        const isReceived = incomingRequests.some((req) => req.userId === item.id);
  
        if (isSent) {
          setFriendRequestStatus("Sent");
        } else if (isReceived) {
          setFriendRequestStatus("Received");
        } else {
          setFriendRequestStatus("None");
        }
      } catch (error) {
        console.error("Error fetching friend request status:", error);
      }
    };
  
    fetchFriendRequestStatus();
  }, [item]);
  

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

  const handleSendFriendRequest = async () => {
    try {
      await axios.post(
        `http://localhost:3000/friend_requests/send/${item.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setFriendRequestSent((prev) => ({ ...prev, [item.id]: true }));
      setFriendRequestStatus("Sent"); // Update the status to "Sent"

    } catch (error) {
      console.error("Error sending friend request:", error);
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
                  src={
                    item.avatarUrl ||
                    "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
                  }
                  alt={`${item.username}'s avatar`}
                  className="w-32 h-32 rounded-full shadow-md object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">{item.username}</h3>
                {isFriend ? (
                  <div>
                    <p className="text-gray-600 mt-2">You are friends</p>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4 space-y-4">
                      {/* Display Name */}
                      <div className="text-left">
                        <span className="font-medium text-gray-800">
                          Display Name:
                        </span>{" "}
                        <span className="text-gray-600">
                          {item.displayName || "No display name provided"}
                        </span>
                      </div>

                      {/* Email */}
                      <div className="text-left">
                        <span className="font-medium text-gray-800">
                          Email:
                        </span>{" "}
                        <span className="text-gray-600">
                          {item.email || "No email available"}
                        </span>
                      </div>

                      {/* Bio */}
                      <div className="text-left">
                        <span className="font-medium text-gray-800">Bio:</span>{" "}
                        <span className="text-gray-600">
                          {item.bio || "This user has not set a bio"}
                        </span>
                      </div>

                      {/* Online Status */}
                      <div className="text-left">
                        <span className="font-medium text-gray-800">
                          Status:
                        </span>{" "}
                        <span
                          className={`${
                            item.isOnline ? "text-green-600" : "text-red-600"
                          } font-semibold`}
                        >
                          {item.isOnline ? "Online" : "Offline"}
                        </span>
                      </div>

                      {/* Account Creation Date */}
                      <div className="text-left">
                        <span className="font-medium text-gray-800">
                          Joined:
                        </span>{" "}
                        <span className="text-gray-600">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "Join date unavailable"}
                        </span>
                      </div>

                      {/* Friends Count */}
                      <div className="text-left">
                        <span className="font-medium text-gray-800">
                          Friends:
                        </span>{" "}
                        <span className="text-gray-600">
                          {item.friends?.length > 0
                            ? `${item.friends.length} friend(s)`
                            : "No friends to display"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : friendRequestStatus === "Sent" ? (
                  <p className="text-gray-600 mt-2">Friend request sent!</p>
                ) : friendRequestStatus === "Received" ? (
                  <p className="text-gray-600 mt-2">Friend request received!</p>
                ) : (
                  <button
                    onClick={handleSendFriendRequest}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                  >
                    Send Friend Request
                  </button>
                )}
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
