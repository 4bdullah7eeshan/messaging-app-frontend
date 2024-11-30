
function ChatWindow({ selectedChat }) {
  if (!selectedChat) {
    return (
      <div className="h-full flex items-center justify-center">
        Select a chat to view messages.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{selectedChat}</h2>
      <div className="mt-4">Messages will appear here.</div>
    </div>
  );
}

export default ChatWindow;
