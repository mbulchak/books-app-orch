const BASE_URL = 'http://localhost:5000/books';

export const getBooks = () => {
  return fetch(BASE_URL).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${BASE_URL}`);
    }

    return response.json();
  });
};
