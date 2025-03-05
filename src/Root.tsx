import App from './App.tsx';
import { HashRouter, Route, Routes } from 'react-router';
import { Dashboard } from './pages/Dashboard/Dashboard.tsx';
import { AddBook } from './pages/AddBook/AddBook.tsx';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route path='dashboard' element={<Dashboard />} />

        <Route path='addbook' element={<AddBook />} />

        <Route path='*' element={<p>Page is not found</p>} />
      </Route>
    </Routes>
  </HashRouter>
);