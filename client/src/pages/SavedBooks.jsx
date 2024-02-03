import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import Auth from '../utils/auth';

const SavedBooks = () => {
  // Use useQuery hook to execute the GET_ME query
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  // Use useMutation hook for the REMOVE_BOOK mutation
  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      // Update the cache with the new list of books after a book is removed
      cache.modify({
        fields: {
          me(existingMeData) {
            const newBookList = existingMeData.books.filter(book => book.bookId !== removeBook.bookId);
            return { ...existingMeData, books: newBookList };
          }
        }
      });
    }
  });

  // Handler for deleting a book
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: { bookId }
      });
      // Use removeBookId to update localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // Render component...
  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      {/* Your existing rendering logic for saved books goes here */}
    </Container>
  );
};

export default SavedBooks;
