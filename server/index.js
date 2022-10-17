const app = require("./app");
const databaseConnection = require("./database");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV;
databaseConnection();
app.listen(port, () =>
  console.log(`Server has been started on ${port} in ${mode} mode`)
);
