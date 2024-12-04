import { useState, useEffect, useRef } from 'react';

function ChatMessages({ messages, currentUserId }) {
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, idx) => (
        <div
          key={idx}
          className={`flex ${
            message.senderId === currentUserId ? 'justify-end' : 'justify-start'
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
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            )}
          </div>
        </div>
      ))}
                    <div ref={chatEndRef}></div>

      
    </div>
  );
}

export default ChatMessages;