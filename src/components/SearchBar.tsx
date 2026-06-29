interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
}

function SearchBar({ search, setSearch, onSearch }: SearchBarProps) {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-lg shadow p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search for books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700"
        />

        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
