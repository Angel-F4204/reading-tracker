import type { Book } from "../types/Book";

interface SearchResultsProps {
  results: Book[];
  loading: boolean;
  error: string;
}

function SearchResults({ results, loading, error }: SearchResultsProps) {
  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow p-4">
        <p>Searching...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white rounded-lg shadow p-4">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold mb-4">Search Results</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((book) => (
          <div key={book.id} className="border rounded-lg p-4 flex gap-4">
            {book.coverId ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                alt={book.title}
                className="w-20 h-28 object-cover rounded"
              />
            ) : (
              <div className="w-20 h-28 bg-slate-200 rounded flex items-center justify-center text-sm text-gray-500">
                No cover
              </div>
            )}

            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500">
                {book.year ? book.year : "Unknown year"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SearchResults;
