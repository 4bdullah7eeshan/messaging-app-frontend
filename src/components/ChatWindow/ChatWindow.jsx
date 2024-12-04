import { useState, useEffect } from "react";
import axios from "axios";
import { Paperclip, X } from "lucide-react"; // Import the file icon

function ChatWindow({ selectedChat, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
  const answer = selectedChat?.id;
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSending, setIsSending] = useState(false); // Track loading state


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

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     setFilePreview(URL.createObjectURL(selectedFile)); // Create a local URL for the preview
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file);
      // Handle image file preview
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview({ type: "image", url: reader.result });
        };
        reader.readAsDataURL(file);
      }
      // Handle document preview (show file name for non-image files)
      else if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFilePreview({ type: "document", name: file.name });
      } else {
        // For unsupported file types, you can add additional logic or show a generic message
        setFilePreview({ type: "unknown", name: file.name });
      }
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && !file) return;

    setIsSending(true); // Set loading state to true when message is being sent


    let imageUrl = null;

    const formData = new FormData();
    formData.append("senderId", currentUserId);
    formData.append("content", newMessage);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/chats/m/${answer}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setMessages((prev) => [...prev, response.data.message]);
      setNewMessage("");
      setFilePreview(null);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    } finally {
      setIsSending(false);
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
          src={
            receiver.avatarUrl ||
            "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
          }
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
            <div className="flex flex-col items-start space-y-2">
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Message Attachment"
                  className="w-full h-auto max-w-xs object-cover rounded-md"
                />
              )}

              {message.content.trim() && (
                <div
                  className={`px-4 py-2 rounded-lg shadow ${
                    message.senderId === currentUserId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 bg-gray-50">
        <div className="flex items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer mr-2"
          >
            <Paperclip size={20} />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

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
    {isSending ? (
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 1116 0A8 8 0 014 12z"
        ></path>
      </svg>
    ) : (
      "Send"
    )}
  </button>
        </div>
        {/* File preview container */}
        {filePreview && (
          <div className="mt-4 relative">
            <button
              onClick={() => {
                setFile(null);
                setFilePreview(null);
              }}
              className="absolute top-0 right-0 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <X
                size={20}
                className="text-gray-600"
              />
            </button>
            {filePreview.type === "image" ? (
              <img
                src={filePreview.url}
                alt="File preview"
                className="w-32 h-auto max-w-xs object-cover rounded-md mx-auto"
              />
            ) : (
              <div className="flex items-center justify-center">
                <div className="bg-gray-200 p-2 rounded-md shadow-md">
                  <span className="text-gray-500">
                    Document: {filePreview.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
