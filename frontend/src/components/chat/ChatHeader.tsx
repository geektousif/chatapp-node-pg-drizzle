const ChatHeader = ({ friendName }) => {
  return (
    <div className="flex items-center justify-between p-3 mb-4 border-b">
      <div className="flex items-center">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Kristine"
          className="w-12 h-12 mr-4 rounded-full"
        />
        <div className="flex flex-col">
          <h4 className="font-semibold">{friendName}</h4>
          <span className="ml-2 text-sm text-green-500">• Typing...</span>
        </div>
      </div>

      {/* Add a search bar */}
      {/* Add a 3-dot menu for options */}
      <div className="relative">
        <button className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0"
            />
          </svg>
        </button>
        {/* Dropdown menu (logout, etc.) can be implemented here */}
      </div>
    </div>
  );
};

export default ChatHeader;
