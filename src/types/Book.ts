export interface Book {
  id: string;
  title: string;
  author: string;
  year: number | null;
  coverId?: number;
  status: "to-read" | "reading" | "finished";
  rating: number;
  dateAdded: string;
}
