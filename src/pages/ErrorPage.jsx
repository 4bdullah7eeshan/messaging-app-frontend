import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
