import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';

export const postBook = (
  book: Book /* Omit<Book, 'id'> | Omit<Book, 'createdAt'> | Omit<Book, 'modifyAt'> | Omit<Book, 'active'>  */,
) => {
  return client.post<Book>('/books', book);
};
