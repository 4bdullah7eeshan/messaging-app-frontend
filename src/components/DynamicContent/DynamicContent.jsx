import Profile from "../Profile/Profile";
import Friends from "../Friends/Friends";
import Conversations from "../Conversations/Conversations";

function DynamicContent({ activeSection, setSelectedChat }) {
  if (activeSection === "messages") {
    return (
    //   <div>
    //     {/* Replace with dynamic data */}
    //     <h2>Active Chats</h2>
    //     <ul>
    //       {["Chat 1", "Chat 2", "Chat 3"].map((chat, idx) => (
    //         <li key={idx} onClick={() => setSelectedChat(chat)}>
    //           {chat}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    <Conversations />
    );
  }

  if (activeSection === "friends") {
    return <Friends />;
  }

  if (activeSection === "explore") {
    return <div>Explore Groups & People</div>;
  }

  if (activeSection === "profile") {
    return <Profile />;
  }

  return <div>Select an option from the sidebar.</div>;
}

export default DynamicContent;
