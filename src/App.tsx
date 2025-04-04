import { NavLinkRenderProps, Outlet, useNavigate } from 'react-router';
import './App.scss';
import { NavLink } from 'react-router-dom';
import { useBooks } from './context/BookContext';
import { useEffect } from 'react';

function App() {
  const { successMessage } = useBooks();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, []);

  const activeLink = ({ isActive }: NavLinkRenderProps) =>
    isActive ? 'nav__link--active' : 'nav__link';

  return (
    <>
      <header className="header">
        <nav className="nav">
          <NavLink className={activeLink} to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink className={activeLink} to="/addbook">
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
