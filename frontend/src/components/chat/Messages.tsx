import React from "react";

const Messages = ({ fetchedMessages, friendId }) => {
  return (
    <div className="flex-1 h-full pr-2 space-y-4 overflow-y-auto">
      {fetchedMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No messages yet. Start the conversation!
        </div>
      ) : (
        fetchedMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === friendId ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-md p-2 my-1 rounded-lg ${
                message.sender === friendId
                  ? "bg-gray-200"
                  : "bg-red-500 text-white"
              }`}
            >
              {message.message}
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>12:40</span>
                {message.sender != friendId && (
                  <span>{message.isRead ? "Read" : "Unread"}</span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
