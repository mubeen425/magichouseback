const {
  authRoute,
  interiorRoutes,
  subscriptionRoutes,
  planeRoute,
} = require("../routes");
const otherRoutes = require("./otherRoutes");
const cron = require("./cronJobs");
module.exports = function (app) {
  app.use("/api/auth", authRoute);
  app.use("/api/admin/", planeRoute);
  app.use("/api/interior", interiorRoutes);
  app.use("/api/subscription", subscriptionRoutes);
  cron.start();
  otherRoutes(app);
};
