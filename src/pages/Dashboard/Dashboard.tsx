import { useEffect, useState } from 'react';
import './Dashboard.scss';
import 'bulma/css/bulma.css';
import { getBooks } from '../../services/getBooks';
import { Book } from '../../types/Book';
import { getFilteredBooks } from '../../utils/getFilteredBooks';
import { FILTER_BOOK } from '../../types/filterBook';

export const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filterRecords, setFilterRecords] = useState<FILTER_BOOK>(FILTER_BOOK.ACTIVE);

  useEffect(() => {
    getBooks()
      .then((res) => {
        setBooks(res);
      })
      .catch(console.error);
  }, []);

  console.log('books', books);

  const filteredBooks = getFilteredBooks(books, filterRecords);
  console.log('filteredBooks', filteredBooks);

  return (
    <>
      <div className="filter-dropdown">
        <p>Filter by</p>
        <p>
          Showing numberOfRecordsWhichAreShowingBasedOnFilterSelecition of totalNumberOfRecordsInDB.
        </p>

        {/* is-active */}

        <div className="select">
          <select
            value={filterRecords}
            onChange={(event) => setFilterRecords(event.target.value as FILTER_BOOK)}
          >
            <option>Show Active</option>
            <option>Show Deactivated</option>
            <option>Show All</option>
          </select>
        </div>

        {/* <div className="dropdown ">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
              <span>Click me</span>
            </button>
          </div>

          <div className="dropdown-menu " id="dropdown-menu3" role="menu">
            <div className="dropdown-content">
              <a href="#" className="dropdown-item">
                Show All
              </a>
              <a href="#" className="dropdown-item">
                Show Active
              </a>
              <a href="#" className="dropdown-item">
                Show Deactivated
              </a>
            </div>
          </div>
        </div> */}
      </div>

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
          {/* className="is-selected" */}
          {filteredBooks?.length > 0 ? (
            filteredBooks.map((book) => {
              const { bookName, author, category, ISBN, createdAt, modifyAt } = book;
              return (
                <tr>
                  <th>{bookName}</th>
                  <td> {author} </td>
                  <td>{category}</td>
                  <td>{ISBN}</td>
                  <td>{createdAt}</td>
                  <td>{modifyAt}</td>

                  <td className="buttons">
                    {/* <div>Edit</div> */}
                    <span className="button is-info">Edit</span>
                    <span className="button is-info">Delete</span>
                    <span className="button is-info">Deactivate/Re-Activate</span>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>There are no this record of books</p>
          )}
        </tbody>
      </table>
    </>
  );
};
