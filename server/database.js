const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const databaseConnection = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/ExpensesTracker")
    .then(() => console.log("Database is connected Successfully"))
    .catch((ex) => console.error(ex));
};
module.exports = databaseConnection;
