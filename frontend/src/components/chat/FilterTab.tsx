const FilterTab = () => {
  const tabs = ["All", "Unread", "Archived", "Blocked"];

  return (
    <div className="flex justify-between p-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="px-4 py-2 text-gray-700 border-b-2 border-transparent hover:border-red-500 hover:text-red-500"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTab;
