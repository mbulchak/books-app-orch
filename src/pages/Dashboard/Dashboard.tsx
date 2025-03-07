import { useEffect, useState } from 'react';
import './Dashboard.scss';
import 'bulma/css/bulma.css';
import { getBooks } from '../../services/getBooks';
import { getFilteredBooks } from '../../utils/getFilteredBooks';
import { FILTER_BOOK } from '../../types/filterBook';
import clsx from 'clsx';
import { Outlet, useNavigate } from 'react-router';
import { useBooks } from '../../context/BookContext';
import { deleteBook } from '../../services/deleteBook';
import { Book } from '../../types/Book';
import { updateBook } from '../../services/editBook';

export const Dashboard = () => {
  const { books, setBooks, setSelectedBook, setSuccessMessage } = useBooks();

  const [category, setCategory] = useState<FILTER_BOOK>(FILTER_BOOK.ACTIVE);
  const navigate = useNavigate();

  useEffect(() => {
    getBooks()
      .then((res) => {
        setBooks(res);
      })
      .catch(console.error);
  }, []);

  const filteredBooks = getFilteredBooks(books, category);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    navigate(`/books/${book.id}`);
  };

  const handleDelete = (bookId: string) => {
    deleteBook(bookId);
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    setSuccessMessage('Book deleted successfully!');
  };

  const handleActiveRecord = (book: Book) => {
    const updatedBook = { ...book, active: !book.active };

    updateBook(updatedBook)
      .then((resBook) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === resBook.id
              ? {
                  ...book,
                  active: resBook.active,
                }
              : book,
          ),
        );
      })
      .catch((error) => {
        console.error('Failed to update the book', error);
      });

    setSuccessMessage('Book edited successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <>
      <div className="filter__dropdown">
        <div className="select">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as FILTER_BOOK)}
          >
            <option>Show Active</option>
            <option>Show Deactivated</option>
            <option>Show All</option>
          </select>
        </div>

        <span>
          Showing {filteredBooks.length} records out of {books.length} records
        </span>
      </div>

      {filteredBooks?.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Book </th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Created At</th>
              <th>Modify At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => {
              const { id, bookName, author, category, ISBN, createdAt, modifyAt, active } = book;

              return (
                <tr
                  key={id}
                  className={clsx({
                    disactive: !active,
                  })}
                >
                  <th>{bookName}</th>
                  <td> {author} </td>
                  <td>{category}</td>
                  <td>{ISBN}</td>
                  <td>{createdAt}</td>
                  <td>{modifyAt}</td>

                  <td className="buttons">
                    {active ? (
                      <>
                        <span className="button is-info" onClick={() => handleEdit(book)}>
                          Edit
                        </span>
                        <span onClick={() => handleActiveRecord(book)} className="button is-info">
                          Deactivate
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="button is-info" onClick={() => handleEdit(book)}>
                          Edit
                        </span>
                        <span className="button is-info" onClick={() => handleDelete(id)}>
                          Delete
                        </span>
                        <span onClick={() => handleActiveRecord(book)} className="button is-info">
                          Re-Activate
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>There are no record of books</p>
      )}

      <Outlet />
    </>
  );
};
