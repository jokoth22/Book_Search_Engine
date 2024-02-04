//const { saveBook } = require('../controllers/user-controller');
const { User} = require ('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id}).populate('saveBooks');
      }
      throw AuthenticationError;
    },
    search: async(parent,args,context) => {
      return fetch(`https://www.googleapis.com/books/v1/volumes?q=${args.query}`);
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email, password });
  
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
    
    saveBook: async (parent, {BookData}, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id},
          {$addToSet: {savedBooks: {BookData} }},
          { new: true, runValidators: true}
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },      

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id},
          { $pull: {savedBooks: bookId } },
          { new: true}
        )
        return updatedUser;
      }
      throw AuthenticationError;
    }      
  }
};

module.exports = resolvers;