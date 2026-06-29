import { useState } from "react";
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
  const [library, setLibrary] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [libraryMessage, setLibraryMessage] = useState("");

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

    setLibrary([...library, book]);
    setLibraryMessage(`Added "${book.title}" to your library.`);
  }

  function handleDeleteBook(id: string) {
    setLibrary(library.filter((book) => book.id !== id));
  }

  function handleStatusChange(id: string, status: Book["status"]) {
    setLibrary(
      library.map((book) => (book.id === id ? { ...book, status } : book)),
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

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

        <StatsBar />

        <LibraryControls />

        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">My Library</h2>

          {library.length === 0 ? (
            <p className="text-center text-gray-500">No books added yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {library.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onDelete={handleDeleteBook}
                  onStatusChange={handleStatusChange}
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

