// import gql from @apollo/client
import { gql } from '@apollo/client';

//Use the gql function to access the User entry point and export it
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;