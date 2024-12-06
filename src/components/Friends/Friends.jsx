import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";


const Friends = ({ setSelectedProfile }) => {
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("friends");
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const { user: authUser } = useAuth();
  const userId = authUser.id;


  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const friendsResponse = await fetch(
          `http://localhost:3000/friends/u/:userId`, 
          
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (!friendsResponse.ok) throw new Error("Failed to fetch friends");
        const friendsData = await friendsResponse.json();
        setFriends(friendsData);
      } catch (err) {
        setError("Error fetching friends data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        setLoading(true);
        const requestsResponse = await fetch(
          `http://localhost:3000/friend_requests/user/:userId`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (!requestsResponse.ok)
          throw new Error("Failed to fetch friend requests");
        const requestsData = await requestsResponse.json();
        console.log(requestsData);
        setIncomingRequests(requestsData.incomingRequests);
        setOutgoingRequests(requestsData.outgoingRequests);
      } catch (err) {
        setError("Error fetching friend requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    Promise.all([fetchFriends(), fetchFriendRequests()])
    .finally(() => {
      setLoadingFriends(false);
      setLoadingRequests(false);
    });
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/friend_requests/accept/${requestId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to accept the friend request");
      const updatedRequests = incomingRequests.filter(
        (request) => request.id !== requestId
      );
      setIncomingRequests(updatedRequests);
      setFriends((prevFriends) => [
        ...prevFriends,
        incomingRequests.find((request) => request.id === requestId),
      ]);
    } catch (err) {
      setError("Error accepting friend request.");
      console.error(err);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/friend_requests/reject/${requestId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to reject the friend request");
      const updatedRequests = incomingRequests.filter(
        (request) => request.id !== requestId
      );
      setIncomingRequests(updatedRequests);
    } catch (err) {
      setError("Error rejecting friend request.");
      console.error(err);
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/friend_requests/send/${requestId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to cancel the friend request");
      const updatedRequests = outgoingRequests.filter(
        (request) => request.id !== requestId
      );
      setOutgoingRequests(updatedRequests);
    } catch (err) {
      setError("Error canceling the friend request.");
      console.error(err);
    }
  };

  const handleFriendClick = (item, type) => {
    setSelectedProfile({ item, type });
  };
  

  return (
    <div className="p-4 space-y-6">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="flex space-x-4 border-b border-gray-300 mb-6">
            <button
              onClick={() => setActiveTab("friends")}
              className={`py-2 px-4 text-lg ${
                activeTab === "friends"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Friends
            </button>
            <button
              onClick={() => setActiveTab("incomingRequests")}
              className={`py-2 px-4 text-lg ${
                activeTab === "incomingRequests"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Incoming Requests
            </button>
            <button
              onClick={() => setActiveTab("outgoingRequests")}
              className={`py-2 px-4 text-lg ${
                activeTab === "outgoingRequests"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Outgoing Requests
            </button>
          </div>

          {activeTab === "friends" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800">Your Friends</h2>
              <ul className="space-y-4">
                {friends.map((friend) => (
                  <li key={friend.id} className="flex items-center space-x-4 hover:bg-gray-200 cursor-pointer"                       onClick={() => handleFriendClick(friend, "people")}
>
                    <img
                      src={friend.avatarUrl || "default-avatar.png"}
                      alt={`${friend.displayName}'s avatar`}
                      className="w-12 h-12 rounded-full"
                    />
                    <span className="text-lg">{friend.username}</span>

                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === "incomingRequests" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Incoming Friend Requests
              </h2>
              {incomingRequests.length === 0 ? (
                <p className="text-gray-600">No incoming requests.</p>
              ) : (
                <ul className="space-y-4">
                  {incomingRequests.map((request) => (
                    <li
                      key={request.id}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.user.avatarUrl || "default-avatar.png"}
                          alt={`${request.user.displayName}'s avatar`}
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="text-lg">{request.user.displayName}</span>
                        <span className="text-lg">{request.user.username}</span>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Decline
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {activeTab === "outgoingRequests" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Outgoing Friend Requests
              </h2>
              {outgoingRequests.length === 0 ? (
                <p className="text-gray-600">No outgoing requests.</p>
              ) : (
                <ul className="space-y-4">
                  {outgoingRequests.map((request) => (
                    <li
                      key={request.id}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.friend.avatarUrl || "default-avatar.png"}
                          alt={`${request.friend.displayName}'s avatar`}
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="text-lg">{request.friend.displayName}</span>
                        <span className="text-lg">{request.friend.username}</span>
                      </div>
                      <div className="space-x-2">
                        <button onClick={() => handleCancelRequest(request.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                          Cancel Request
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
    </div>
  );
};

export default Friends;
