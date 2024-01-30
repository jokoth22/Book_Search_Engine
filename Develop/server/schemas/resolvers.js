const { Book, User} = require ('../models');
const { signToken } = require('../utils/auth');

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
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
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