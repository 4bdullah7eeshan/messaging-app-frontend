import { MessageCircleMore, Handshake, Telescope, LogOut } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

function Sidebar({ setActiveSection }) {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
};

  return (
    <aside className="w-1/10 bg-gray-800 text-white flex flex-col items-center p-5">
      <div className="flex flex-col space-y-6 flex-grow">
        <button onClick={() => setActiveSection("messages")}>
          <MessageCircleMore />
        </button>
        <button onClick={() => setActiveSection("friends")}>
          <Handshake />
        </button>
        <button onClick={() => setActiveSection("explore")}>
          <Telescope />
        </button>
        <button onClick={handleLogout}>
          <LogOut />
        </button>
      </div>

      <div className="mt-auto flex flex-col items-center">
        <div
          onClick={() => setActiveSection("profile")}
          className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden"
        >
        <img
            src={user.avatarUrl || "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"} // Fallback to default
            alt={`${user.username}'s profile`}
            className="w-full h-full object-cover"
            />        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
