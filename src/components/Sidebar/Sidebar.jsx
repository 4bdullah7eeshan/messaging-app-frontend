import { MessageCircleMore, Handshake, Telescope, LogOut } from 'lucide-react';

import { useAuth } from "../../contexts/AuthContext";

function Sidebar({ setActiveSection }) {
  const { logout, user } = useAuth();

  return (
    <aside className="w-1/10 bg-gray-800 text-white flex flex-col items-center p-5">
      <div className="flex flex-col space-y-6 flex-grow">
        <button onClick={() => setActiveSection("messages")}><MessageCircleMore /></button>
        <button onClick={() => setActiveSection("friends")}><Handshake /></button>
        <button onClick={() => setActiveSection("explore")}><Telescope /></button>
        <button onClick={() => logout()}><LogOut /></button>
      </div>

      <div className="mt-auto flex flex-col items-center">
        <div
          onClick={() => setActiveSection("profile")}
          className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            {user.username[0].toUpperCase()}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
