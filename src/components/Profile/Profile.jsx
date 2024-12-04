import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${authUser.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
        setBio(data.bio || "");
        setDisplayName(data.displayName || "");
        setAvatarPreview(data.avatarUrl || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (authUser) fetchUser();
  }, [authUser]);

  const handleTextualUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/users/${authUser.id}/textual`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ bio, displayName }),
        }
      );

      if (!response.ok) throw new Error("Failed to update textual data");

      const data = await response.json();
      setUser(data.updatedUser);
      setMessage("Textual data updated successfully!");
    } catch (error) {
      console.error("Error updating textual data:", error);
      setMessage("Failed to update textual data.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleAvatarUpdate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await fetch(
        `http://localhost:3000/users/${authUser.id}/avatar`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update avatar");

      const data = await response.json();
      setUser(data.updatedUser);
      setAvatarPreview(data.updatedUser.avatarUrl);
      setMessage("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      setMessage("Failed to update avatar.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleCancelEdit = () => {
    setBio(user.bio || "");
    setDisplayName(user.displayName || "");
    setAvatarPreview(user.avatarUrl || "");
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
      {authUser && user ? (
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <img
                src={avatarPreview || "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"}
                alt="User Avatar"
                className="w-40 h-40 rounded-full object-cover shadow-lg"
              />
              {isEditing && (
                <div className="mt-4">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <button
                    onClick={handleAvatarUpdate}
                    disabled={!avatar || loading}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    {loading ? "Updating..." : "Update Avatar"}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="mt-6 md:mt-0 md:ml-10">
              <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Display Name:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
                  />
                ) : (
                  user.displayName || "No display name set"
                )}
              </p>
              <p className="text-gray-700">
                <strong>Bio:</strong>{" "}
                {isEditing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
                  />
                ) : (
                  user.bio || "No bio set"
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleTextualUpdate}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Feedback Message */}
          {message && (
            <p className="mt-4 text-center text-green-600">{message}</p>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
