import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';

export const postBook = (book: Book) => {
  return client.post<Book>('/books', book);
};
