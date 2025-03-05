import { Book } from '../types/Book';
import { FILTER_BOOK } from '../types/filterBook';

export const getFilteredBooks = (books: Book[], filterBy: FILTER_BOOK) => {
  let filteredBooks = [...books];

  switch (filterBy) {
    case FILTER_BOOK.ACTIVE:
      return filteredBooks.filter((book) => book.active);

    case FILTER_BOOK.DISACTIVE:
      return filteredBooks.filter((book) => !book.active);

    default:
      return filteredBooks;
  }
};
