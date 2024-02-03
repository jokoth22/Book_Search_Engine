// import gql from @apollo/client
import { gql } from '@apollo/client';

//Use the gql function to access the User entry point and export it
export const GET_ME = gql`
    query GET_ME ($id: ID!){
        me(id: $id) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link  
            }
        }
    }
`;