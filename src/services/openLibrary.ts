import type { Book } from "../types/Book";

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}

export async function searchBooks(query: string): Promise<Book[]> {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`,
  );

  if (!response.ok) {
    throw new Error("Book search failed.");
  }

  const data: OpenLibraryResponse = await response.json();

  return data.docs.map((book) => ({
    id: book.key,
    title: book.title,
    author: book.author_name?.[0] ?? "Unknown author",
    year: book.first_publish_year ?? null,
    coverId: book.cover_i,
    status: "to-read",
    rating: 0,
    dateAdded: new Date().toISOString(),
  }));
}
