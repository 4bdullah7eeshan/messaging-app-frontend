import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/sign_up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      setSuccess(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
          Sign Up
        </h1>
        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="mt-4 text-green-500 text-sm">
            Successfully signed up! You can now log in.
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          <fieldset className="flex flex-col gap-6">
            <legend className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Join by entering the following details.
            </legend>
            <div>
              <label
                htmlFor="username"
                className="block text-gray-600 dark:text-gray-300 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="laserboy"
                required
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
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
                placeholder="Enter a strong password"
                required
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 dark:text-gray-300 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Reenter your password"
                required
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </fieldset>
          <button
            type="submit"
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/sign_in"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signup;
