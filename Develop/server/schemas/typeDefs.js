const typeDefs =`
type User { 
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String   
}

type Auth {
    token: String
    user: User
}

type Mutation {
    login (email: String!, password: String!): Auth
    addUser (username: String!, email: String!, password: String!): Auth
    saveBook (author: [String]!, description: String!, title: String!, bookID: String!, image: String!, link: String!): User
    removeBook (bookId: String!): User
}

type Query {
    me: [User]
    user (id: ID!): User
}

`
//TO DO: Auth?