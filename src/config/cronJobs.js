
const cron = require('node-cron');
const User = require('../models/User');

const myCronJob=cron.schedule('0 0 * * * *', async () => {
  try {
    // Find all subscriptions with expiry dates in the past
    const usersData = await User.find({
      'subscription.expiresAt': { $lte: new Date() },
      'subscription.status': 'active',
    });

    // Cancel expired subscriptions
    for (const item of usersData) {
      // Update the subscription status to 'canceled' or however you track canceled subscriptions
      item.subscription.status = 'canceled';
      await item.save();
    }

    console.log('Canceled', usersData.length, 'expired subscriptions');
  } catch (error) {
    console.error('Error canceling expired subscriptions:', error);
  }
});

module.exports = myCronJob;
