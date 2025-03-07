import { createContext, ReactNode, useContext, useState } from 'react';
import { Book } from '../types/Book';
import { CategoryBook } from '../types/CategoryBook';

interface BookContextType {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  bookName: string;
  setBookName: React.Dispatch<React.SetStateAction<string>>;
  authorName: string;
  setAuthorName: React.Dispatch<React.SetStateAction<string>>;
  category: CategoryBook;
  setCategory: React.Dispatch<React.SetStateAction<CategoryBook>>;
  isbn: number;
  setIsbn: React.Dispatch<React.SetStateAction<number>>;
  selectedBook: Book | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
  successMessage: string | null;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const [bookName, setBookName] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [category, setCategory] = useState<CategoryBook>(CategoryBook.SELECT);
  const [isbn, setIsbn] = useState<number>(5455);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const value = {
    books,
    setBooks,
    bookName,
    setBookName,
    authorName,
    setAuthorName,
    category,
    setCategory,
    isbn,
    setIsbn,
    selectedBook,
    setSelectedBook,
    successMessage,
    setSuccessMessage,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }

  return context;
};
