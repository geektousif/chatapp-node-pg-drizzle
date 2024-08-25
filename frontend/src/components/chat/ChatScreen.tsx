import { useEffect } from "react";
import { useGetMessagesQuery } from "../../api/apiSlice";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";

const ChatScreen = ({ chatDetails, socket, userId }) => {
  const { chatId, username: friendName, userId: friendId } = chatDetails;

  const {
    data: fetchedMessages,
    isLoading,
    error,
  } = useGetMessagesQuery({
    chatId,
    page: 1,
    limit: 100,
  });

  /**
   * @Sample_Input Message array
   * const [messages, setMessages] = useState([
   * {
   * text: "Hello, I wanted to know more about the product design position...",
   *  isSent: false,
   * },
   * { text: "Sure, tell us. What do you wanna know?", isSent: true },
   * { text: "Take this part of your letter seriously...", isSent: false },
   * { text: "You've a good folio...", isSent: true },
   * {
   *  text: "However we’re looking for someone with a little more experience!",
   *  isSent: true
   * },
   * ]);
   */

  // const messages =

  useEffect(() => {
    console.log("socket", socket);
    if (socket) {
      socket.emit("join_chat", chatId);

      socket.on("receive_message", (data) => {
        console.log("receive_message", data);
        // dispatch(addMessage(data as Message));
      });

      return () => {
        socket.off("receive_message"); // Clean up the listener when the component unmounts
      };
    }
  }, [chatId, socket]);

  if (isLoading) return <div>Loading Messages...</div>;
  console.log("Messages", fetchedMessages);
  if (error) console.log(error);

  // const messages = [...fetchedMessages, ...currentMessage];

  return (
    <div className="flex flex-col h-full max-h-screen p-4">
      <ChatHeader friendName={friendName} />
      <div className="flex-1 overflow-hidden">
        <Messages fetchedMessages={fetchedMessages} friendId={friendId} />
      </div>
      <div className="mt-4">
        <ChatInput socket={socket} userId={userId} chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatScreen;
