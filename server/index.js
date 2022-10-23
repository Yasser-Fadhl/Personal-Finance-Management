const app = require("./app");
const databaseConnection = require("./database");
const dotenv = require("dotenv");
dotenv.config({ path: "server/config/config.env" });
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV;
databaseConnection();

process.on("uncaughtException", function (err) {
  if (process.env.NODE_ENV === "PRODUCTION") {
    console.log(err.message);
  }
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err.stack);
  }
  console.log("Server is shutting down due to uncaught Exception");
  process.exit(1);
});

const server = app.listen(port, () =>
  console.log(`Server has been started on ${port} in ${mode} mode`)
);
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Server is shutting down due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
