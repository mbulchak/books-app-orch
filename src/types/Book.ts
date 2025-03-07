import { CategoryBook } from "./CategoryBook";

export type Book = {
  id: string;
  bookName: string;
  author: string;
  category: CategoryBook;
  ISBN: number;
  createdAt: string;
  modifyAt: string;
  active: boolean;
};
