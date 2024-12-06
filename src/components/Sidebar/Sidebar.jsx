import { MessageCircleMore, Handshake, Telescope, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar({ setActiveSection }) {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="w-1/10 bg-gray-800 text-white flex flex-col items-center p-5 relative">
      <div className="flex flex-col space-y-6 flex-grow">
        <div className="group relative">
          <button
            onClick={() => setActiveSection("messages")}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <MessageCircleMore />
          </button>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Chats
          </span>
        </div>

        <div className="group relative">
          <button
            onClick={() => setActiveSection("friends")}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <Handshake />
          </button>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Friends
          </span>
        </div>

        <div className="group relative">
          <button
            onClick={() => setActiveSection("explore")}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <Telescope />
          </button>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Explore
          </span>
        </div>

        <div className="group relative">
          <button
            onClick={handleLogout}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <LogOut />
          </button>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Logout
          </span>
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center">
        <div
          onClick={() => setActiveSection("profile")}
          className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-500"
        >
          <img
            src={
              user.avatarUrl ||
              "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
            }
            alt={`${user.username}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
