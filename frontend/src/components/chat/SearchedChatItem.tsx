import { useInitiateChatMutation } from "../../api/apiSlice";
import { useAppDispatch } from "../../app/hooks";
import { selectChat } from "../../features/chatSlice";

export function SearchedChatItem({ chat }: any, index: number) {
  const dispatch = useAppDispatch();

  const [initiateChat] = useInitiateChatMutation();

  const handleSelectChat = async (chat) => {
    if (!chat.chatId) {
      try {
        const newChat = await initiateChat({ friendId: chat.user.id }).unwrap();
        console.log(newChat);
        dispatch(
          selectChat({
            chatId: newChat.chatId,
            userId: chat.user.id,
            username: chat.user.username,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(
      selectChat({
        chatId: chat.chatId,
        userId: chat.user.id,
        username: chat.user.username,
      })
    );
  };

  return (
    <div
      onClick={() => handleSelectChat(chat)}
      className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
    >
      <img
        src={`https://i.pravatar.cc/150?img=${index + 1}`}
        alt={chat.user.username}
        className="w-12 h-12 mr-4 rounded-full"
      />
      <div>
        <h4 className="font-semibold">{chat.user.username}</h4>
        {/* <p className="text-sm text-gray-600">
          {chat.lastSender.username}: {chat.lastMessage.textContent}
        </p>
        <p className="text-xs text-gray-500">
          {" "}
           {chat.daysAgo}  days ago
        </p> */}
      </div>
    </div>
  );
}
