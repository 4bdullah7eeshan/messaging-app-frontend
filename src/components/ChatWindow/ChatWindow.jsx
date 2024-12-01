
function ChatWindow({ selectedProfile, selectedChat }) {
  const { item, type } = selectedProfile || {};

  if (!item) {
    return (
      <div className="h-full flex items-center justify-center">
        Select a user or group to view details.
      </div>
    );
  }

  if (type === 'user') {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">{item.username}</h2>
        {/* fill later */}
      </div>
    );
  }

  if (type === 'group') {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">{item.name}</h2>
        <img src={item.avatarUrl} alt="group-avatar" className="w-32 h-32 object-cover rounded-full mt-2" />
        <p className="mt-2">{item.description}</p>
        <div className="mt-2 font-semibold">Admin: {item.admin}</div>
        <div className="mt-2 font-semibold">Members: {item.members.length}</div>
      </div>
    );
  }

  if (selectedChat) {
    // fill later
  }

  return null;
}

export default ChatWindow;
