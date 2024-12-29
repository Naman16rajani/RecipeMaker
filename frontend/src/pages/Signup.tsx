import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { setAuthorizationToken, unprotectedPostRequest } from "../utils/api";
import type { SignupCredentials } from "../types/auth";
import Cookies from "js-cookie";

export const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<SignupCredentials>({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await unprotectedPostRequest<{ token: string }>(
        "/auth/signup",
        credentials
      );
      Cookies.set("token", response.jwt, { expires: 1 / 24 }); // 1 day
      setAuthorizationToken(response.jwt);

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile No.
              </label>
              <input
                id="mobile"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={credentials.mobile}
                onChange={(e) =>
                  setCredentials({ ...credentials, mobile: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        {loading && (
          <div className="text-center text-blue-600 font-medium mt-4">
            Creating your account, please wait...
          </div>
        )}
      </div>
    </div>
  );
};
