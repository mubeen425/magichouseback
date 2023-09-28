const {
  authRoute, interiorRoutes,
  subscriptionRoutes
} = require("../routes");
const otherRoutes = require("./otherRoutes");
const cron=require("./cronJobs")
module.exports = function (app) {
  app.use("/api/auth", authRoute);
  app.use("/api/interior", interiorRoutes);
  app.use("/api/subscription", subscriptionRoutes);
  cron.start()
  otherRoutes(app);
};
