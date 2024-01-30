const { Book, User} = require ('../models');

const resolvers = {
    Query: {
        me: async () => {
            return await User.find({}).populate('books');
          },
        user: async (parent, args) => {
            return await User.findById(args.id).populate('books');
          }
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            return await User.create({email, password});
        },
        addUser: async (parent, {username,email, password}) => {
            return await User.create({username,email, password});
        },
        saveBook: async (parent, {author, description, title, bookId, image, link}) => {
            return await User.create({author, description, title, bookId, image, link});
        },        
        removeBook: async (parent, {bookId}) => {
            return await User.findOneAndDelete({bookId: bookId});
        },
    },
};