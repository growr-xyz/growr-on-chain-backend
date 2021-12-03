const userModel = require('../../model/user');
const walletModel = require('../../model/wallet')
const goalModel = require('../../model/goal')
const loanModel = require('../../model/loan')
const { pubsub } = require('../helper');
const BankConnector = require('../../bank-api/operations')

module.exports = {
  RootMutation: {
    createWallet: async (_, { newWallet }) => {
      const { address, vendor, network } = newWallet
      try {
        console.log('wallet create ==========', address)
        const query = { address, vendor, network }
        const createWallet = await walletModel.findOneAndUpdate(query, { address, vendor, network }, { upsert: true, new: true })
        return createWallet
      } catch (error) {
        return error;
      }
    },
    updateUser: async (_, { userData, address }) => {
      try {
        console.log('user create ===============', userData);
        const wallet = await walletModel.findOne({ address })
        userData.wallet = wallet.address
        if (!wallet) {
          throw new Error('Create wallet first!')
        }
        const query = { wallet: address }
        const user = await userModel.findOneAndUpdate(query, userData, { upsert: true, new: true });
        if (!wallet.user) {
          wallet.user = user
          await wallet.save()
        }
        pubsub.publish('userTopic', {
          user
        });
        return user;
      } catch (error) {
        return error;
      }
    },
    updateGoal: async (_, { goalData, userId }) => {
      try {
        console.log('goal create ================', goalData);
        const user = await userModel.findById(userId)
        if (!user) {
          throw new Error('User not found')
        }
        const query = goalData.id ? { _id: goalData.id } : {}
        const goal = await goalModel.findOneAndUpdate(query, goalData, { upsert: true, new: true })
        user.goals.push(goal)
        await user.save()
        return goal
      } catch (error) {
        return error
      }
    },
    achieveGoal: async (_, { id }) => {
      try {
        console.log('goal achieve ================', id);
        const goal = await goalModel.findById(id)
        goal.isAchieved = true
        await goal.save()
        return goal
      } catch (error) {
        return error
      }
    },
    updateLoan: async (_, { loanData, goalId }) => {
      try {
        console.log('update loan ================', loanData);
        const goal = await goalModel.findById(goalId)
        if (!goal) {
          throw new Error('Goal not found')
        }
        if (goal.isAchieved) {
          throw new Error('Goal is achieved, cannot update loan')
        }
        const query = loanData.id ? { _id: loanData.id } : {}
        const loan = await loanModel.findOneAndUpdate(query, loanData, { upsert: true, new: true })
        goal.loan = loan;
        await goal.save()
        return loan
      } catch (error) {
        return error
      }
    },
    connectBank: async (_, { username, password }) => {

      const bankConnector = new BankConnector('https://obp-apisandbox.bancohipotecario.com.sv', '51wy4o0kvghivbbgbkmmfgmpb4nlu2x0qpdgagoj')
      const response = await bankConnector.login(username, password)
      return response
    }
  }
}
