// import gql from @apollo/client
import { gql } from '@apollo/client';

//Use the gql function to access the User entry point and export it
export const QUERY_ME = gql`
query GET_ME {
    me {
        _id
        username
        email
        bookCount
        savedBooks
    }
}
`