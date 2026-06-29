import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StatsBar from "./components/StatsBar";
import LibraryControls from "./components/LibraryControls";
import SearchResults from "./components/SearchResults";
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
      setError("Something went wrong while searching. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleAddBook(book: Book) {
    const alreadyAdded = library.some(
      (libraryBook) => libraryBook.id === book.id,
    );

    if (alreadyAdded) {
      setLibraryMessage("This book is already in your library.");
      return;
    }

    setLibrary([...library, book]);
    setLibraryMessage(`${book.title} was added to your library.`);
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
          <section className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-4">
            {libraryMessage}
          </section>
        )}

        <StatsBar />

        <LibraryControls />

        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">My Library</h2>

          {library.length === 0 ? (
            <p className="text-gray-500 text-center">No books added yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {library.map((book) => (
                <div key={book.id} className="border rounded-lg p-4">
                  <h3 className="font-bold">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500">
                    {book.year ? book.year : "Unknown year"}
                  </p>
                  <p className="mt-2 font-medium">Status: To Read</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
