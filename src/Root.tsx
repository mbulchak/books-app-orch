import App from './App.tsx';
import { HashRouter, Route, Routes } from 'react-router';
import { Dashboard } from './pages/Dashboard/Dashboard.tsx';
import { AddBook } from './pages/AddBook/AddBook.tsx';
import { EditBook } from './pages/EditBook/EditBook.tsx';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="dashboard" element={<Dashboard />}></Route>

        <Route path="books">
          <Route path=":bookId" element={<EditBook />} />
        </Route>

        <Route path="addbook" element={<AddBook />} />

        <Route path="*" element={<p>Page is not found</p>} />
      </Route>
    </Routes>
  </HashRouter>
);
