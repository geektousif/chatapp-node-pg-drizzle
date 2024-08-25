import { useAppDispatch } from "../../app/hooks";
import { selectChat } from "../../features/chatSlice";

export const ChatListItem = ({ chat, socket }: any, index: number) => {
  const dispatch = useAppDispatch();

  const handleSelectChat = () => {
    dispatch(
      selectChat({
        chatId: chat.chatId,
        userId: chat.friend.id,
        username: chat.friend.username,
      })
    );

    socket.emit("join_chat", chat.chatId);
  };

  return (
    <div
      onClick={handleSelectChat}
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
    >
      <div className="flex items-center">
        <img
          src={`https://i.pravatar.cc/150?img=${index + 1}`}
          alt={chat.friend.username}
          className="w-12 h-12 mr-4 rounded-full"
        />
        <div
          className={`w-3 h-3 rounded-full mr-3 ${
            chat.isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>
        <div>
          <h4 className="font-semibold">{chat.friend.username}</h4>
          <p
            className={`text-xs ${
              chat.isRead ? "text-gray-500" : "text-black font-semibold"
            }`}
          >
            {chat.lastSender.id === chat.friend.id
              ? chat.lastSender.username
              : "You"}
            : {chat.lastMessage.textContent}
          </p>
        </div>
      </div>
      <div className="text-xs text-gray-400">{chat.daysAgo} days ago</div>
    </div>
  );
};
