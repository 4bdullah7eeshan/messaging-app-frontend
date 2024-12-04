import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function Chat({ setSelectedChat, setChatList }) {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const { user: authUser } = useAuth();
  const [chats, setChats] = useState([]); // State to store chats locally

  const userId = authUser.id;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chats/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const validChats = response.data.chats.filter((chat) => chat.receiver); // Remove invalid chats
    setChats(validChats);
    setChatList(validChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [userId]);

  // Filter chats based on the search term
  const filteredChats = chats.filter(
    (chat) =>
      chat.receiver &&
      chat.receiver.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chat.receiver.displayName &&
        chat.receiver.displayName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 bg-gray-100 border-b">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <section
            key={chat.id}
            className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedChat(chat)}
          >
            <div className="flex-shrink-0">
              <img
                src={
                  chat.receiver?.avatarUrl ||
                  "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
                }
                alt={`${chat.receiver?.username || "Unknown User"}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col ml-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {chat.receiver.displayName || chat.receiver.username}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage
                  ? chat.lastMessage.senderId === authUser.id
                    ? `You: ${chat.lastMessage.content || "Sent a file"}`
                    : chat.lastMessage.content || "Sent a file"
                  : "No messages yet"}
              </p>
            </div>

            <div className="flex-shrink-0 ml-4 text-sm text-gray-500">
              <small>{new Date(chat.updatedAt).toLocaleString()}</small>
            </div>
          </section>
        ))}

        {/* Show a message if no chats match the search */}
        {filteredChats.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No chats found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
