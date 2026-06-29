interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
}

function SearchBar({ search, setSearch, onSearch }: SearchBarProps) {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search for books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
