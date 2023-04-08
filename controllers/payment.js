const BigPromise = require("../middleware/Bigpromise");
const Payment = require("../models/payment")
const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51MbnZVSJHHXXNgLXlV6jBeCNuwzdZ3SsPrsTAKnndxcYHbkQT4vTtkXp6Ax5Nq4muNvrMhPAQvgjNTDKsuXONSdB00Baei0TdI"
);

exports.paymentcollegefree = BigPromise(async (req, res, next) => {
  const { amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "XYZ college free payment",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:4242/success",
    cancel_url: "http://localhost:4242/cancel",
  });
  res.status(200).json({
    success: true,
    session,
  });
});


exports.addNewPayment = BigPromise(async (req, res, next) => {
const{sid,amount,lastDay,title,description} = req.body;
const lid = req.user.id
const newPayment = await Payment.create({sid,lid,amount,lastDay,description,title});



newPayment.save({ validateBeforeSave: false });
res.status(200).json({
  success: true,
 newPayment
});
})
