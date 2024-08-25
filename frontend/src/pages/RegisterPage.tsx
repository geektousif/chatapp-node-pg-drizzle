import { useCallback, useEffect, useState } from "react";
import { useRegisterUserMutation } from "../api/apiSlice";
import { Link, useNavigate } from "react-router-dom";

import { isFetchBaseQueryError } from "../utils";
import { useAppSelector } from "../app/hooks";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [registerUser, { isError, error: serverError }] =
    useRegisterUserMutation();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (
    //   !registerData.username ||
    //   !registerData.email ||
    //   !registerData.password ||
    //   !registerData.confirmPassword
    // ) {
    //   setLocalError("Please fill in all fields");
    // }

    // setLocalError("");
    if (registerData.password !== registerData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    setLocalError("");
    try {
      const response = await registerUser({
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      }).unwrap();
      console.log(response);

      navigate("/login");
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="w-full max-w-md p-8 mx-auto border border-gray-300 rounded-2xl">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        {localError && <p className="mb-4 text-red-500">{localError}</p>}
        {isError && isFetchBaseQueryError(serverError) && (
          <p className="mb-4 text-red-500">
            {serverError.data?.message ||
              "An error occurred during registration."}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-800">
                Email Id
              </label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={registerData.email}
                className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">
                Username
              </label>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                value={registerData.username}
                className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">
                Password
              </label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={registerData.password}
                className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                required
                value={registerData.confirmPassword}
                className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500"
                placeholder="Enter confirm password"
              />
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-semibold tracking-wider text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Create an account
            </button>
          </div>
          <p className="mt-6 text-sm text-center text-gray-800">
            Already have an account?{" "}
            <Link
              to="/login"
              className="ml-1 font-semibold text-blue-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
