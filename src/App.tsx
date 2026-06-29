import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StatsBar from "./components/StatsBar";
import LibraryControls from "./components/LibraryControls";
import SearchResults from "./components/SearchResults";
import BookCard from "./components/BookCard";
import { searchBooks } from "./services/openLibrary";
import type { Book } from "./types/Book";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [library, setLibrary] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem("reading-library");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("reading-theme") === "dark";
    } catch {
      return false;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [libraryMessage, setLibraryMessage] = useState("");

  const [filter, setFilter] = useState<"all" | Book["status"]>("all");
  const [sortBy, setSortBy] = useState<"title" | "author" | "dateAdded">(
    "dateAdded",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    localStorage.setItem("reading-library", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem("reading-theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toReadCount = library.filter(
    (book) => book.status === "to-read",
  ).length;
  const readingCount = library.filter(
    (book) => book.status === "reading",
  ).length;
  const finishedBooks = library.filter((book) => book.status === "finished");
  const finishedCount = finishedBooks.length;
  const ratedFinishedBooks = finishedBooks.filter((book) => book.rating > 0);

  const averageRating =
    ratedFinishedBooks.length === 0
      ? 0
      : ratedFinishedBooks.reduce((total, book) => total + book.rating, 0) /
        ratedFinishedBooks.length;

  const visibleBooks = [...library]
    .filter((book) => filter === "all" || book.status === filter)
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === "title") comparison = a.title.localeCompare(b.title);
      else if (sortBy === "author")
        comparison = a.author.localeCompare(b.author);
      else
        comparison =
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();

      return sortDirection === "asc" ? comparison : -comparison;
    });

  async function handleSearch() {
    if (search.trim() === "") {
      setError("Please enter a book title.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const books = await searchBooks(search);
      setResults(books);
    } catch {
      setError("Something went wrong while searching.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleAddBook(book: Book) {
    const exists = library.some((b) => b.id === book.id);

    if (exists) {
      setLibraryMessage("This book is already in your library.");
      return;
    }

    setLibrary([...library, { ...book, dateAdded: new Date().toISOString() }]);
    setLibraryMessage(`Added "${book.title}" to your library.`);
  }

  function handleDeleteBook(id: string) {
    setLibrary(library.filter((book) => book.id !== id));
  }

  function handleStatusChange(id: string, status: Book["status"]) {
    setLibrary(
      library.map((book) =>
        book.id === id
          ? { ...book, status, rating: status === "finished" ? book.rating : 0 }
          : book,
      ),
    );
  }

  function handleRatingChange(id: string, rating: number) {
    setLibrary(
      library.map((book) => (book.id === id ? { ...book, rating } : book)),
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />

        <SearchResults
          results={results}
          loading={loading}
          error={error}
          onAddBook={handleAddBook}
        />

        {libraryMessage && (
          <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-3">
            {libraryMessage}
          </div>
        )}

        <StatsBar
          toReadCount={toReadCount}
          readingCount={readingCount}
          finishedCount={finishedCount}
          averageRating={averageRating}
        />

        <LibraryControls
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />

        <section className="bg-white dark:bg-slate-900 dark:text-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">My Library</h2>

          {library.length === 0 ? (
            <p className="text-center text-gray-500">No books added yet.</p>
          ) : visibleBooks.length === 0 ? (
            <p className="text-center text-gray-500">
              No books match this filter.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onDelete={handleDeleteBook}
                  onStatusChange={handleStatusChange}
                  onRatingChange={handleRatingChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
