import { useCallback, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
// import { addMessage } from "../../features/messageSlice";

const ChatInput = ({ userId, chatId, socket }) => {
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();

      const messageData = {
        message: newMessage,
        chatId,
        senderId: userId,
      };

      if (newMessage.trim() && socket) {
        socket.emit("send_message", messageData);
        // dispatch(addMessage(messageData));
        setNewMessage("");
      }
    },
    [newMessage, chatId, userId, socket]
  );
  return (
    <form onSubmit={sendMessage} className="flex items-center ">
      <input
        required
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
      />
      <button
        type="submit"
        className="p-2 ml-2 text-white bg-red-500 rounded-lg"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
