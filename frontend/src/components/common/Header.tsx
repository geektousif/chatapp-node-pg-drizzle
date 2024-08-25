import { useState } from "react";
import { useLogoutUserMutation } from "../../api/apiSlice";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [logoutUser] = useLogoutUserMutation();

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    await logoutUser();
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h1 className="text-lg font-bold">Chat App</h1>
      <div className="relative">
        <button onClick={handleToggleDropdown} className="p-2">
          <div className="flex flex-col justify-between w-4 h-4">
            <span className="block h-1 bg-gray-600"></span>
            <span className="block h-1 bg-gray-600"></span>
            <span className="block h-1 bg-gray-600"></span>
          </div>
        </button>
        {showDropdown && (
          <div className="absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg">
            <ul>
              <li
                onClick={handleLogout}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                Logout
              </li>
              <li className="p-2 cursor-pointer hover:bg-gray-100">
                Delete Conversation
              </li>
              <li className="p-2 cursor-pointer hover:bg-gray-100">Settings</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
