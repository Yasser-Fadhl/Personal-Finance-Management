const express = require("express");
const router = express.Router();
const auth = require("../middleWares/authentication");
const newIncome = require("../incomeController/newIncome");
const getIncomes = require("../incomeController/getIncomes");
const deleteIncome = require("../incomeController/deleteIncome");
router.post("/new", auth, newIncome);
router.get("/", auth, getIncomes);
router.delete("/:id", auth, deleteIncome);

module.exports = router;
