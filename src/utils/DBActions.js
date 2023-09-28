const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const catchAsync = require("./catchAsync");
const Email = require("./email");
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://stablediffusionapi.com/api/v5/interior',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "key": "I1xCFIo2FdGXCEvfLMHLsFqn6DTQsqTaNtYg3ccH4NGe4ySgUsceshH1DVsF",
    "init_image" : "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg",
    "prompt" :"Bathroom Professional",
    "steps" : 50,
    "guidance_scale" : 7
  })
};


const Populate = catchAsync(async (req, res, next) => {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  // const user = new User({
  //   name: "Alex",
  //   email: "1@example.com",
  //   contact:"7807324087",
  //   password: "aszx1234",
  //   role: "AD",
  // });
  // await user.save();
//  await sendEmail("gilljee813@gmail.com","Pet Report","Your Report has been generated")
//  console.log("send");

// await new Email("gilljee813@gmail.com","hasnat", "fb.com").sendReport({technician:"John2",barcode:"897324328"});
// console.log("send")

});



module.exports = {
  Populate,
}
