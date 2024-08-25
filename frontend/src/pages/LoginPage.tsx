import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/apiSlice";
import { isFetchBaseQueryError } from "../utils";
import { useAppSelector } from "../app/hooks";

export const LoginPage = () => {
  // TODO implement react-hook-form
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [loginUser, { isError, error: serverError }] = useLoginUserMutation();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setLocalError("Please fill in all fields");
    }

    setLocalError("");
    try {
      const response = await loginUser(loginData).unwrap();

      if (response.success) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log("Failed to Login", error);
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6">
        <div className="w-full max-w-md">
          <div className="p-8 bg-white shadow rounded-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Sign in
            </h2>
            {localError && <p className="mb-4 text-red-500">{localError}</p>}
            {isError && isFetchBaseQueryError(serverError) && (
              <p className="mb-4 text-red-500">
                {serverError.data?.message || "An error occurred during Login."}
              </p>
            )}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="absolute w-4 h-4 right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="absolute w-4 h-4 cursor-pointer right-4"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                
                <div className="text-sm">
                  <a href="jajvascript:void(0);" className="font-semibold text-blue-600 hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-sm tracking-wide text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="ml-1 font-semibold text-blue-600 hover:underline whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
