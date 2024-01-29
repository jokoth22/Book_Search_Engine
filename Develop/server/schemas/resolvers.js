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

    },
};