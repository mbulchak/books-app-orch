import { Book } from "../types/Book"
import { client } from "../utils/fetchClient"

export const updateBook = ({id, ...book}: Book) => {
  return client.patch<Book>(`/books/${id}`, book);
}