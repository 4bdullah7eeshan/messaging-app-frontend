import { Link } from "react-router-dom";
import { MessageCircle, Handshake, Telescope, LogOut, User } from "lucide-react";

function Sidebar({ user }) {
  const getAvatarPlaceholder = () => {
    if (user?.avatarUrl) {
      return (
        <img
          src={user.avatarUrl}
          alt={`${user.username}'s avatar`}
          className="w-16 h-16 rounded-full mb-6"
        />
      );
    }
    if (user?.username) {
      const initials = user.username
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
      return (
        <div className="w-16 h-16 flex items-center justify-center bg-gray-600 text-white text-lg font-bold rounded-full mb-6">
          {initials}
        </div>
      );
    }
    return (
      <div className="w-16 h-16 flex items-center justify-center bg-gray-600 text-white rounded-full mb-6">
        <User size={32} />
      </div>
    );
  };

  return (
    <aside className="w-1/5 h-screen bg-gray-800 text-white flex flex-col items-center py-4">
      {getAvatarPlaceholder()}

      <Link to="/messages" className="mb-4 flex items-center justify-center p-2 hover:bg-gray-700 rounded-md">
        <MessageCircle size={24} />
      </Link>
      <Link to="/explore" className="mb-4 flex items-center justify-center p-2 hover:bg-gray-700 rounded-md">
        <Telescope size={24} />
      </Link>
      <Link to="/groups" className="mb-4 flex items-center justify-center p-2 hover:bg-gray-700 rounded-md">
        <Handshake size={24} />
      </Link>
      <button
        onClick={() => {
          // Add backend logout logic here later
          console.log("Logging out...");
        }}
        className="mb-4 flex items-center justify-center p-2 hover:bg-red-700 rounded-md"
      >
        <LogOut size={24} />
      </button>
    </aside>
  );
}

export default Sidebar;
