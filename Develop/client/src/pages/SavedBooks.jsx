// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';

import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
// Import the query we are going to execute from its file
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
 // Execute the query on component load
const {data: userData } = useQuery(GET_ME);

 const [removeBook] = useMutation(REMOVE_BOOK);

 // create function that accepts the book's mongo _id value as param and deletes the book from the database
 const handleDeleteBook = async (bookId) => {
  try {
    const { data: updatedUser} = await removeBook({
      variables: {bookId}
    });

    removeBookId(bookId);
  } catch (err) {
    console.error(err);
  }
};

// if data isn't here yet, say so
if (!userDataLength) {
  return <h2>LOADING...</h2>;
}

return (
  <>
    <div fluid className="text-light bg-dark p-5">
      <Container>
        <h1>Viewing saved books!</h1>
      </Container>
    </div>
    <Container>
      <h2 className='pt-5'>
        {userData.savedBooks.length
          ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
          : 'You have no saved books!'}
      </h2>
      <Row>
        {userData.savedBooks.map((book) => {
          return (
            <Col md="4">
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  </>
);
};

export default SavedBooks;
