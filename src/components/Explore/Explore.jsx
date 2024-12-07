import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function Explore({ setSelectedProfile }) {
  const [activeTab, setActiveTab] = useState("people");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const { user: authUser } = useAuth();
  const userId = authUser.id;
  const [friendIds, setFriendIds] = useState([]);
  const [pendingRequestIds, setPendingRequestIds] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://messaging-app-backend-kwd9.onrender.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://messaging-app-backend-kwd9.onrender.com/groups"
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const friendsResponse = await fetch(
          `https://messaging-app-backend-kwd9.onrender.com/friends/u/:userId`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (!friendsResponse.ok) throw new Error("Failed to fetch friends");
        const friendsData = await friendsResponse.json();
        setFriendIds(friendsData.map((friend) => friend.id));
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `https://messaging-app-backend-kwd9.onrender.com/friend_requests/user/:userId`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const { incomingRequests, outgoingRequests } = response.data;

        const requestIds = [
          ...incomingRequests.map((req) => req.user.id),
          ...outgoingRequests.map((req) => req.friend.id),
        ];

        setPendingRequestIds(requestIds);
      } catch (err) {
        console.error("Error fetching friend requests:", err);
      }
    };

    fetchUsers();
    fetchGroups();
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
            .filter(
              (user) =>
                user.id !== userId &&
                !friendIds.includes(user.id) &&
                !pendingRequestIds.includes(user.id)
            )
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
        <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
          {/* {groups.map((group) => (
            <div
              key={group.id}
              className="p-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => handleItemClick(group, "group")}
            >
              {group.name}
            </div>
          ))} */}
          This feature is not yet available.
        </div>
      )}
    </div>
  );
}

export default Explore;
