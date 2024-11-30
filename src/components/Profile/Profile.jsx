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
    <div className="profile-page">
      <h1>Profile Page</h1>
      {authUser && user ? (
        <div>
          {/* Avatar Section */}
          <div className="profile-avatar">
            <h2>Avatar</h2>
            <img
              src={avatarPreview || "default-avatar.png"}
              alt="User Avatar"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <button
                  onClick={handleAvatarUpdate}
                  disabled={!avatar || loading}
                >
                  {loading ? "Updating..." : "Update Avatar"}
                </button>
              </>
            )}
          </div>

          {/* Profile Info Section */}
          <div className="profile-info">
            <h2>Profile Information</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Display Name:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              ) : (
                user.displayName || "No display name set"
              )}
            </p>
            <p>
              <strong>Bio:</strong>{" "}
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                user.bio || "No bio set"
              )}
            </p>
          </div>

          {/* Edit and Save Buttons */}
          {isEditing ? (
            <div>
              <button
                onClick={handleTextualUpdate}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}

          {/* Feedback Message */}
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
