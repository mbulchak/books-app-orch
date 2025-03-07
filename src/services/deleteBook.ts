import { client } from '../utils/fetchClient';

export const deleteBook = (bookId: string) => {
  return client.delete(`/books/${bookId}`);
};
