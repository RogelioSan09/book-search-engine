import { gql } from '@apollo/client';

// Will execute the login mutation
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }   
    }
`;
// Will execute the addUser mutation
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
// Will execute the saveBook mutation
export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String!], $description: String!, $title: String!, $bookId: ID!, $image: String!, $link: String!) {
        saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;

// Will execute the deleteBook mutation
export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;
