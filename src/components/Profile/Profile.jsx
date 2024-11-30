import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ displayName: "", bio: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${authUser.id}`);
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        setProfile(data);
        setFormData({ displayName: data.displayName || "", bio: data.bio || "" });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, [authUser.id]);

  const handleSave = async () => {
    const formData = new FormData();
    if (avatarFile) formData.append("avatar", avatarFile);
    formData.append("displayName", formData.displayName);
    formData.append("bio", formData.bio);

    try {
      const response = await fetch(`http://localhost:3000/users/${authUser.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const data = await response.json();
      setProfile(data.updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!profile) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-5">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className={`w-24 h-24 rounded-full bg-gray-300 ${
              profile.avatarUrl ? "bg-cover" : ""
            }`}
            style={{
              backgroundImage: profile.avatarUrl ? `url(${profile.avatarUrl})` : "none",
            }}
          ></div>
          {isEditing && (
            <input
              type="file"
              className="absolute bottom-0 right-0"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
          )}
        </div>
        {isEditing ? (
          <input
            type="text"
            className="border px-2 py-1"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          />
        ) : (
          <h1 className="text-xl font-bold">{profile.displayName || "No Display Name"}</h1>
        )}
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500">
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="mt-4">
        <p>
          <strong>Bio: </strong>
          {isEditing ? (
            <textarea
              className="border px-2 py-1 w-full"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            ></textarea>
          ) : (
            profile.bio || "No bio available"
          )}
        </p>
        <p>
          <strong>Username: </strong>
          {profile.username}
        </p>
        <p>
          <strong>Email: </strong>
          {profile.email}
        </p>
        <p>
          <strong>Joined At: </strong>
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
      {isEditing && (
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default Profile;
