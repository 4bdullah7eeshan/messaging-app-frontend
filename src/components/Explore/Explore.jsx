import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";


function Explore({ setSelectedProfile }) {
  const [activeTab, setActiveTab] = useState("people");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const { user: authUser } = useAuth();
  const userId = authUser.id;



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:3000/groups");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchUsers();
    fetchGroups();
  }, []);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle user/group click
  const handleItemClick = (item, type) => {
    setSelectedProfile({ item, type });
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex space-x-4 border-b border-gray-300 mb-6">
        <button
          onClick={() => handleTabChange("people")}
          className={`py-2 px-4 text-lg ${
            activeTab === "people"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
        >
          People
        </button>
        <button
          onClick={() => handleTabChange("groups")}
          className={`py-2 px-4 text-lg ${
            activeTab === "groups"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
        >
          Groups
        </button>
      </div>

      {activeTab === "people" ? (
        <div className="flex-1 overflow-y-auto">
          {users
          .filter((user) => user.id !== userId)
          .map((user) => (
            <div
              key={user.id}
              className="p-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => handleItemClick(user, "people")}
            >
              {user.username}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => handleItemClick(group, "group")}
            >
              {group.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Explore;
