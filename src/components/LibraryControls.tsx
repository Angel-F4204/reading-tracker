import type { Book } from "../types/Book";

interface LibraryControlsProps {
  filter: "all" | Book["status"];
  setFilter: (filter: "all" | Book["status"]) => void;
  sortBy: "title" | "author" | "dateAdded";
  setSortBy: (sortBy: "title" | "author" | "dateAdded") => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
}

function LibraryControls({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: LibraryControlsProps) {
  return (
    <section className="bg-white dark:bg-slate-900 dark:text-white rounded-lg shadow p-4">
      <h2 className="font-bold mb-2">Library Controls</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | Book["status"])}
          className="border rounded p-2 dark:bg-slate-800 dark:border-slate-700"
        >
          <option value="all">All</option>
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "title" | "author" | "dateAdded")
          }
          className="border rounded p-2 dark:bg-slate-800 dark:border-slate-700"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="dateAdded">Date Added</option>
        </select>

        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value as "asc" | "desc")}
          className="border rounded p-2 dark:bg-slate-800 dark:border-slate-700"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </section>
  );
}

export default LibraryControls;
