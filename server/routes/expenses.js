const express = require("express");
const addExpenses = require("../expensesControllers/addExpenses");
const getSingleExpense = require("../expensesControllers/getSingleExp");
const router = express.Router();
const auth = require("../middleWares/authentication");
const getExpenses = require("../expensesControllers/getExpenses");
const updateExpense = require("../expensesControllers/updateExpense");
const deleteExpense = require("../expensesControllers/deleteExpense");

router.get("/", auth, getExpenses);
router.get("/:id", auth, getSingleExpense);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);
router.post("/new", auth, addExpenses);
router.get("/test", auth, async (req, res) => {
  const fill = await require("../models/Expense").find({
    expesedAt: {
      $gte: new Date("2022-10-21"),
      $lte: new Date("2022-10-30"),
    },
  });
  res.status(200).send(fill);
});
module.exports = router;
