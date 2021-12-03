const { pubsub } = require('../helper');
module.exports = {
  Subscription: {
    bank: {
      subscribe(parent, args, ctx, info) {
        return pubsub.asyncIterator('userTopic') //Topic
      }
    }
  }
}