import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function SignIn() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      console.log(data.token);
      login(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
          Sign In
        </h1>
        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          <fieldset className="flex flex-col gap-6">
            <legend className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Enter your credentials to log in.
            </legend>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 dark:text-gray-300 text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@example.com"
                required
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 dark:text-gray-300 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </fieldset>
          <button
            type="submit"
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/sign_up"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
