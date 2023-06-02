// Import the gql tagged template function
import { gql } from '@apollo/client';

// Export the query GET_ME
// This query returns the _id, username, email, bookCount, and savedBooks data for the logged in user
// The savedBooks data includes the bookId, authors, description, title, image, and link data
export const GET_ME = gql`
    query me {
        me {
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
