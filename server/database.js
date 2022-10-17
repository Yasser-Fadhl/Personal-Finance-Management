const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const databaseConnection = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database is connected Successfully"))
    .catch((ex) => console.error(ex));
};
module.exports = databaseConnection;
