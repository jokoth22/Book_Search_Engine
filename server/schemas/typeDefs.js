const typeDefs =`
type User { 
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String   
}


input Bookdata {
    authors: [String]
    description: String
    title: String
    image: String
    link: String   
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login (email: String!, password: String!): Auth
    addUser (username: String!, email: String!, password: String!): Auth
    saveBook (bookId: ID!, input: Bookdata): User
    removeBook (bookId: ID!): User
}

type Query {
    me: User
}

`;
module.exports = typeDefs;