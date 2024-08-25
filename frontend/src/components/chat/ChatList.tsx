import { useGetChatsQuery, useSearchChatsQuery } from "../../api/apiSlice";
import { ChatListItem } from "./ChatListItem";
import { useAppSelector } from "../../app/hooks";
import { SearchedChatItem } from "./SearchedChatItem";
import { Loader } from "../common/Loader";

const ChatList = ({ socket }) => {
  /**
   * @Input Sample_Chats
   */
  // const sampleChats = [
  //   { name: "Parik", message: "Hello, I wanted to know more...", daysAgo: 11 },
  //   { name: "Naina", message: "Hello, I wanted to know more...", daysAgo: 11 },
  //   { name: "John", message: "Hello, I wanted to know more...", daysAgo: 11 },
  //   {
  //     name: "Kristine",
  //     message: "Hello, I wanted to know more...",
  //     daysAgo: 11,
  //   },
  // ];

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchChatsQuery(searchQuery, {
    skip: searchQuery.length < 3,
  });

  const {
    data: chats,
    isLoading: chatsLoading,
    error: chatsError,
  } = useGetChatsQuery();

  console.log("Chats::: ", chats);

  if (searchQuery && searchResults) {
    if (searchLoading) return <div>Searching chats...</div>;
    if (searchError) console.log(searchError);

    return (
      <div className="flex-1 h-0 overflow-y-auto ">
        {searchResults.map((chat, index) => (
          <SearchedChatItem socket={socket} key={index} chat={chat} />
        ))}
      </div>
    );
  } else if (searchQuery && !searchLoading && !searchResults) {
    return <div>No search result</div>;
  }

  if (chatsLoading) return <Loader />;
  if (chatsError) console.log(chatsError);
  return (
    <div className="flex-1 h-0 overflow-y-auto">
      {chats ? (
        chats.map((chat, index) => (
          <ChatListItem socket={socket} key={index} chat={chat} />
        ))
      ) : (
        <div>No Chat !!!! Tottal New . Ohhhoooo</div>
      )}
    </div>
  );
};

export default ChatList;

// Add duplicate chats for testing
