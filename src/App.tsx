import { Outlet } from 'react-router';
import './App.scss';
import { NavLink } from 'react-router-dom';
import { useBooks } from './context/BookContext';

function App() {
  const { successMessage } = useBooks();
  return (
    <>
      <header className="header">
        <nav className="nav">
          <NavLink className="nav__link" to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink className="nav__link" to="/addbook">
            Add Book
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>


      {successMessage && <div className="success-message">{successMessage}</div>}

      <footer className="footer__main">
        <NavLink
          className="footer__link"
          target="_blank"
          to="https://github.com/mbulchak/books-app-orch"
        >
          GitHub
        </NavLink>
      </footer>
    </>
  );
}

export default App;
