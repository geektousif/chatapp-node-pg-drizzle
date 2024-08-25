// import { useGetUserQuery } from "../../api/apiSlice";
import { useEffect, useState } from "react";
import ChatList from "../../components/chat/ChatList";
import ChatScreen from "../../components/chat/ChatScreen";
import FilterTab from "../../components/chat/FilterTab";
import Search from "../../components/chat/Search";
import { useAppSelector } from "../../app/hooks";
import { io, Socket } from "socket.io-client";
import Header from "../../components/common/Header";

export const DashboardPage = () => {
  //

  const user = useAppSelector((state) => state.auth.user);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);

  const [socket, setSocket] = useState<Socket | null>(null);

  // const user = useAppSelector((state) => state.auth.user);
  // console.log(user);
  // return (
  //   <div>
  //     <h1>Dashboard</h1>
  //     <p>{user?.email}</p>
  //   </div>
  // );

  useEffect(() => {
    if (!user.id || socket) return;
    const newSocket: Socket = io("http://localhost:5000", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    newSocket.on("connect", () => {
      setSocket(newSocket);
      console.log("newSocket", newSocket);
      newSocket.emit("user_connect", user?.id);

      return () => {
        newSocket.disconnect();
      };
    });
  }, [socket, user.id]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 h-full border-r">
        <Header />
        <Search />
        <FilterTab />
        <ChatList socket={socket} />
      </div>

      <div className="w-3/4">
        {selectedChat.chatId ? (
          <ChatScreen
            userId={user.id}
            socket={socket}
            chatDetails={selectedChat}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};
