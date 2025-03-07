import './BookComponent.scss';
import 'bulma/css/bulma.css';
import { CategoryBook } from '../../types/CategoryBook';
import { Book } from '../../types/Book';
import { postBook } from '../../services/postBook';
import { useBooks } from '../../context/BookContext';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';
import { updateBook } from '../../services/editBook';
import { useEffect } from 'react';

type Props = {
  formName: string;
};

export const BookComponent: React.FC<Props> = ({ formName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const createdAt = moment().format('D MMMM YYYY[,] LT');

  const {
    books,
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
  } = useBooks();

  useEffect(() => {
    if (selectedBook) {
      setBookName(selectedBook.bookName);
      setAuthorName(selectedBook.author);
      setCategory(selectedBook.category);
      setIsbn(selectedBook.ISBN);
    }
  }, [selectedBook, setBookName, setAuthorName, setCategory, setIsbn]);

  useEffect(() => {
    if (location.pathname === '/addbook') {
      handleReset();
    }
  }, [location.pathname]);

  const getNextId = (books: Book[]) => {
    if (books.length === 0) return '1';

    const sortedBooks = [...books].sort((book1, book2) => +book2.id - (+book1.id));

    let nextId = +sortedBooks[0].id + 1;

    return String(nextId);
  };

  function addBook({
    bookName,
    author,
    category,
    ISBN,
  }: Omit<Book, 'createdAt' | 'modifyAt' | 'active'>) {
    const newBook = {
      id: getNextId(books),
      bookName,
      author,
      category,
      ISBN,
      createdAt,
      modifyAt: '--',
      active: true,
    };

    postBook(newBook);
  }

  function editSelectedBook(selectedBook: Book) {
    const updatedBook = {
      ...selectedBook,
      bookName,
      author: authorName,
      category,
      ISBN: isbn,
      modifyAt: moment().format('D MMMM YYYY[,] LT'),
    };

    updateBook(updatedBook);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedBook(null);

    if (location.pathname === '/addbook') {
      addBook({
        id: getNextId(books),
        bookName,
        author: authorName,
        category,
        ISBN: isbn,
      });
    } else {
      if (selectedBook) {
        editSelectedBook(selectedBook);
      }
    }

    navigate('/dashboard');
    handleReset();
  };

  function handleReset() {
    setBookName('');
    setAuthorName('');
    setCategory(CategoryBook.SELECT);
    setIsbn(5455);
  }

  return (
    <>
      <div className="main__form--book">
        <p>{formName} Book</p>

        <form onSubmit={handleSubmit} onReset={handleReset} className="form">
          <div className="form__component">
            <label htmlFor="bookName">Book name</label>
            <input
              className="field"
              id="bookName"
              type="text"
              value={bookName}
              onChange={(event) => setBookName(event.target.value)}
            />
          </div>

          <div className="form__component">
            <label htmlFor="author">Author</label>
            <input
              className="field"
              id="author"
              type="text"
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
            />
          </div>

          <div className="form__component">
            <label htmlFor="category">Category</label>

            <select
              value={category}
              id="category"
              className="field"
              onChange={(event) => setCategory(event.target.value as CategoryBook)}
            >
              <option value="select option">Select an option</option>
              <option value="romance">Romance</option>
              <option value="biographical">Biographical</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>

          <div className="form__component">
            <label htmlFor="ISBN">International Standard Book Number (ISBN)</label>
            <input
              id="ISBN"
              className="field"
              type="number"
              value={isbn}
              onChange={(event) => setIsbn(+event.target.value)}
            />
          </div>

          <input className="button is-primary" type="submit" />
        </form>
      </div>
    </>
  );
};
