// import the gql tagged template function
const { gql } = require('apollo-server-express');

// created typeDefs for User, Book, and Auth
// created a Query type with a me query that returns a User type
// created a Mutation type with a login and User query that returns an Auth type
// created a Mutation type with a saveBook query that returns a User type
// created a Mutation type with a removeBook query that returns a User type
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID
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

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String!], description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
        removeBook(bookId: ID!): User
    }
`;

// export the typeDefs
module.exports = typeDefs;