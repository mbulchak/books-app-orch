import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';

export const getBooks = () => {
  return client.get<Book[]>('/books');
};
