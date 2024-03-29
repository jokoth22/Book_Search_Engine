import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser ($email: String!, $password: String!) {
    loginUser (email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser ($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook ($bookId: ID!, $input: Bookdata) {
    saveBook(bookId: $bookID, input: $input) {
      user {
        _id
        savedBooks
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook ($bookId: ID!) {
    removeBook (bookId: $bookId) {
      user{
        _id
        username
        savedBooks
      }
    }
  }
`;
