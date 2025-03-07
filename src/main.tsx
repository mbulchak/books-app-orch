import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Root } from './Root';
import { BookProvider } from './context/BookContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookProvider>
      <Root />
    </BookProvider>
  </StrictMode>,
);
