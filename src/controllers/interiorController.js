const catchAsync = require("../utils/catchAsync");
const axios = require("axios");
const User = require("../models/User");
const AppError = require("../utils/appError");

const API_ENDPOINT = "https://stablediffusionapi.com/api/v5/interior";
const API_KEY = "I1xCFIo2FdGXCEvfLMHLsFqn6DTQsqTaNtYg3ccH4NGe4ySgUsceshH1DVsF";

const getRequestOption = (image, prompt) => {
  return {
    method: "POST",
    url: API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      key: API_KEY,
      init_image: image,
      prompt: prompt,
      steps: 50,
      guidance_scale: 7,
    },
  };
};

const makeRequest = async (image, prompt) => {
  try {
    const response = await axios(getRequestOption(image, prompt));
    return response.data.output[0];
  } catch (error) {
    throw error;
  }
};

const transformRoom = catchAsync(async (req, res, next) => {
  let { room, themes, image } = req.body;

  console.log(room, themes, image)

  if (typeof themes === "string") themes = JSON.parse(themes);

  const query = {
    _id: req.user.id
  };
console.log(themes.length);
  const update = {
    $inc: { "subscription.credits": -themes.length },
  };

  const user = await User.findOne(query);

  if (user.subscription.status!=="active") {
    if (user.subscription.credits <= 0) {
      return next(new AppError("Insufficent Credits", 401));
  
    } else {
      await User.findByIdAndUpdate(user._id, update);
    }
  }


  const responses = [];
  const updatedUser = await User.findOne(query);
  for (const themeItem of themes) {
    const prompt = `${themeItem} ${room} `;

    try {
      const result = await makeRequest(image, prompt);
      responses.push(result);
    } catch (error) {
      console.log(error)
    }
  }

  const filteredResponses = responses.filter(response => response !== undefined);
  console.log(filteredResponses)
  res.status(200).json({
    status: "success",
    result: { filteredResponses, updatedUser },
  });
});

module.exports = {
  transformRoom,
};
