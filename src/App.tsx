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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />

        <SearchResults results={results} loading={loading} error={error} />

        <StatsBar />

        <LibraryControls />

        <section className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">My Library</h2>

          <p className="text-gray-500">No books added yet.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
