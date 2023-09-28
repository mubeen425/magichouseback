const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { createMollieClient } = require("@mollie/api-client");
const AppError = require("../utils/appError");
const mollieClient = createMollieClient({
  apiKey: "test_peA2sPzJWKkUHF7y54asBeMtSFKANS",
});

const makePayment = catchAsync(async (req, res) => {
  const { amount } = req.body;

  console.log(amount, req.user);
  try {
    if (
      typeof amount !== "number" ||
      (isNaN(amount) && [5, 9].includes(amount))
    ) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    let data = JSON.stringify({
      amount: {
        currency: "USD",
        value: amount.toFixed(2),
      },
      description: "Payment For Unlimited credits",
      redirectUrl: "https://magichouse.vercel.app/designing",
      webhookUrl: process.env.WEBHOOK_URL,
      metadata: {
        userId: req.user.id,
        months: amount === 5 ? 1 : 6,
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.mollie.com/v2/payments",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test_peA2sPzJWKkUHF7y54asBeMtSFKANS",
      },
      data: data,
    };

    const response = await axios.request(config);

    console.log("Mollie API Response:", response.data);

    res.json(response.data);
  } catch (e) {
    console.log(e);
  }
});

function getExpiryDate(month) {
  const currentDate = new Date();

  // Calculate the expiration date for 1 month
  const oneMonthExpiration = new Date(currentDate);
  return oneMonthExpiration.setMonth(currentDate.getMonth() + month);
}
const paymentConfirmationHook = catchAsync(async (req, res) => {
  const { id } = req.body;

  const payment = await mollieClient.payments.get(id);
  if (!payment)
    return next(new AppError("No payment was found with this id", 200));

  if (payment.status === "paid") {
    const paymentAmount = payment.amount.value;
    const months = payment.metadata.months;
    const userId = payment.metadata.userId;
    const response = await User.findByIdAndUpdate(
      userId,
      {
        subscription: {
          status: "active",
          type: `${months}-month`,
          expiresAt: getExpiryDate(months),
        },
      },
      { new: true }
    );
    console.log(response);
    console.log(
      `Payment received for user ${userId} - Amount: ${paymentAmount}`
    );
  } else if (payment.status === "failed") {
    return next(new AppError("Failed", 200));
  }

  res.status(200).send("Webhook received");
});

module.exports = {
  makePayment,
  paymentConfirmationHook,
};
