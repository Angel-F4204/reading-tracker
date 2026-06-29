import type { Book } from "../types/Book";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Book["status"]) => void;
  onRatingChange: (id: string, rating: number) => void;
}

function BookCard({
  book,
  onDelete,
  onStatusChange,
  onRatingChange,
}: BookCardProps) {
  return (
    <div className="border rounded-lg p-4 flex gap-4">
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

      <div className="flex-1">
        <h3 className="font-bold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500">
          {book.year ? book.year : "Unknown year"}
        </p>

        <select
          value={book.status}
          onChange={(e) =>
            onStatusChange(book.id, e.target.value as Book["status"])
          }
          className="mt-3 border rounded p-2"
        >
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>

        {book.status === "finished" && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">Rating:</p>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingChange(book.id, star)}
                  className="text-2xl"
                >
                  {star <= book.rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => onDelete(book.id)}
          className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
