import { useState, useEffect } from "react";
import axios from "axios";

function ChatWindow({ selectedChat, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
  const answer = selectedChat?.id;

  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chats/m/${answer}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response?.data || error.message
        );
      }
    };

    const fetchReceiver = async () => {
      try {
        const receiverId = selectedChat?.participants?.find(
          (participant) => participant.id !== currentUserId
        )?.id;
        if (receiverId) {
          const response = await axios.get(
            `http://localhost:3000/users/${receiverId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );
          setReceiver(response.data);
        }
      } catch (error) {
        console.error(
          "Error fetching receiver details:",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();
    fetchReceiver();
  }, [selectedChat, currentUserId, answer]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/chats/m/${answer}`,
        { senderId: currentUserId, content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setMessages((prev) => [...prev, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  if (!selectedChat || !receiver) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a chat to start messaging.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center p-4 border-b bg-gray-100">
        <img
          src={receiver.avatarUrl || "/default-avatar.png"}
          alt={`${receiver.username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <h3 className="text-lg font-semibold text-gray-800">
          {receiver.displayName || receiver.username}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${
              message.senderId === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                message.senderId === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 bg-gray-50">
        <div className="flex items-center">
          <textarea
            className="flex-1 resize-none border rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows="1"
          ></textarea>
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
