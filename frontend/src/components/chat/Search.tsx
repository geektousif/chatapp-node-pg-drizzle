import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearSearch, setSearchQuery } from "../../features/searchSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const [localSearchState, setLocalSearchState] = useState(searchQuery);

  useEffect(() => {
    console.log("use effecting search");
    if (!localSearchState) {
      dispatch(clearSearch());
    }
  }, [localSearchState, dispatch]);

  return (
    <div className="p-4">
      <input
        type="text"
        value={localSearchState}
        onChange={(e) => setLocalSearchState(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(setSearchQuery(localSearchState));
          }
        }}
        placeholder="Search"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default Search;
