const cors = require("cors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv").config();

module.exports = function (app) {
  const corsOptions = {
    origin: "https://magichouse.vercel.app",
    origin: "https://magichouse-three.vercel.app",
    origin: "https://magicmyhouse.com",
    origin: "*",
  };

  app.use(cors(corsOptions));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
  }

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  // app.get('/email', (req, res) => {
  //   res.render('email/Report', { firstName: "Hello" });
  // });
};
