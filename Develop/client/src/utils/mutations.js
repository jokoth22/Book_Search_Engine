import { gql } from '@apollo/client';

//TODO: login User & add User
export const LOGIN_USER = gql`
  mutation login (email: String!, password: String!) {
    loginUser {

    }
  }
`;
export const ADD_USER = gql`
  mutation addUser ($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {

    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook ($author: [String]!, $description: String!, $title: String!, $bookID: String!, $image: String!, $link: String!) {
    saveBook(authotr: $author, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
        _id
        username
        email
        bookCount
        savedBooks
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook ($bookId: String!) {
    removeBook (bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks
    }
  }
`;
