const User = require("../models/user");
const Expense = require("../models/expense");
const ApiFeatures = require("../utils/apiFeatures");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const _id = await User.findById(decoded.id).select("id");

  try {
    const apiFeatures = new ApiFeatures(
      Expense.findOne({ user: _id }),
      req.query
    )
      .search()
      .filter();
    console.log(req.query);
    const expenses = await apiFeatures.query;
    const filteredExpensesCount = expenses.length;

    let lables = [];
    let amounts = [];
    let colors = [];
    let Exp = [];
    function random_rgba() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return (
        "rgba(" +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        0.9 +
        ")"
      );
    }

    const chartExp = (Arr) => {
      Arr.forEach((element) => {
        lables.push(element.name);
        amounts.push(element.amount);
        colors.push(random_rgba());
        Exp.push(element);
      });
    };
    const Sum = (Arr) => {
      let sum = 0;
      Arr.forEach((element) => {
        sum = sum + element.amount;
      });
      return sum;
    };

    /*const FilterDate = await Expense.find({
      expesedAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    })*/
    const DuplicatedItems = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++)
          if (i !== j && arr[i].name === arr[j].name) {
            console.log(arr[i].amount, arr[j].amount);
            arr[i].amount += arr[j].amount;

            arr.splice(j, 1);

            console.log(i + ":" + arr[i].name + arr[i].amount);
          }
      }
      return arr;
    };

    const Expenses = DuplicatedItems(
      DuplicatedItems(DuplicatedItems(expenses))
    );
    chartExp(Expenses);
    const totalDailyExp = Sum(Expenses);

    res.status(200).json({
      success: true,
      expenses,
      count: expenses.length,
      filteredExpensesCount,
      lables,
      amounts,
      colors,
      totalDailyExp,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
