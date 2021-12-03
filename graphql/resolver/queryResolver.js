const userModel = require('../../model/user');
const walletModel = require('../../model/wallet');
const goalModel = require('../../model/goal');
const loanModel = require('../../model/loan');

module.exports = {
  RootQuery: {
    wallet: async (_, { address }) => {
      try {
        const getWallet = await walletModel.findOne({ address })
        return getWallet;
      } catch (error) {
        return error;
      }
    },

    user: async (_, { id }) => {
      const getUser = await userModel.findById(id)
      return getUser;
    },

    goal: async (_, { id }) => {
      const getGoal = await goalModel.findById(id)
      return getGoal
    },

    loan: async (_, { id }) => {
      const getLoan = await loanModel.findById(id)
      return getLoan
    }
  },

  Wallet: {
    user: async (parent) => {
      return await userModel.findOne({ _id: parent.user._id })
    }
  },

  User: {
    wallet: async (parent) => {
      return await walletModel.findOne({ user: parent.id })
    },
    goals: async (parent) => {
      const userGoals = await goalModel.find({ _id: { $in: parent.goals } })
      return userGoals
    }
  },
  Goal: {
    loan: async (parent) => {
      return await loanModel.findById(parent.loan)
    }
  }

}