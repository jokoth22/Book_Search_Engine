//const { saveBook } = require('../controllers/user-controller');
const { User} = require ('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('saveBooks');
      }
      throw AuthenticationError;
    },
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

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    
    saveBook: async (parent, {author, description, title, bookId, image, link}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id},
          {
            $addToSet: {
              saveBook: {author, description, title, bookId, image, link},
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },      
    removeBook: async (parent, { bookId}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id},
          {
            $pull: {
              saveBook: {
                _id: bookId,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },      
    removeBook: async (parent, {bookId}) => {
        return await User.findOneAndDelete({bookId: bookId});
    },
    
  },
};

module.exports = resolvers;