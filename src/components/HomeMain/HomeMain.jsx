import { useAuth } from "../../contexts/AuthContext";

function HomeMain() {
  const { user } = useAuth();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          {user ? `Hello, ${user.username}` : "Welcome"}
        </h1>
      </div>
    </main>
  );
}

export default HomeMain;
