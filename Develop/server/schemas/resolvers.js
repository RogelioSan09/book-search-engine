// Import the AuthenticationError module from Apollo Server Express
// Import the User models
// Import the signToken function from the auth.js file
const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

// Defined the resolvers
const resolvers = {
    // Query "me" to return a user based on the context of the logged in user
    Query: {
        me: async (parent, args, context) => {
            return User.findOne({ _id: context.user._id })
                .populate('savedBooks')
        }
    },
    Mutation: {
        // Mutation "login" to login a user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError( "Can't find this user with this email address" );
            }

            if (!correctPw) {
                throw new AuthenticationError( 'Ha! Wrong password!' );
            }

            const token = signToken(user);

            return { token, user };
        },
        // Mutation for the "addUser" to create a user, assign a token, and send it back
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // Mutation for the "saveBook" to save a book to a user's `savedBooks` field by adding it to the set
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedUser;
            }
        },
        // Mutation for the "deleteBook" to remove a book from `savedBooks`
        deleteBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookData.bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
        }
    }
};

// Export the resolvers
module.exports = resolvers;
