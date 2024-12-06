import Explore from "../Explore/Explore";
import Friends from "../Friends/Friends";
import ProfilePage from "../Profile/Profile";
import Chat from "../Chat/Chat";

function Left({
  activeSection,
  setSelectedChat,
  setSelectedProfile,
  setChatList,
}) {
  if (activeSection === "messages") {
    return (
      <Chat
        setSelectedChat={setSelectedChat}
        setChatList={setChatList}
      />
    );
  }

  if (activeSection === "friends") {
    return <Friends setSelectedProfile={setSelectedProfile} />;
  }

  if (activeSection === "explore") {
    return <Explore setSelectedProfile={setSelectedProfile} />;
  }

  if (activeSection === "profile") {
    return <ProfilePage />;
  }

  return <div>Select an option from the sidebar.</div>;
}

export default Left;
