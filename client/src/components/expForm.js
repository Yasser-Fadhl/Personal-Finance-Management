import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { getExpenses } from "../Expenses/expensesActions";
import { getIncomes } from "../Income/incomeActions";
import Axios from "axios";
import { format } from "date-fns";
import { logOut } from "../user/userActions";

const ExpForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const Alert = useAlert();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(new Date(date).toISOString());
    await Axios.post(
      `http://127.0.0.1:5000/api/v1/${category}/new`,
      {
        name,
        category,
        amount: amount,
        user: _id,
        expesedAt: new Date(date).toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": " http://localhost:3000",
          "x-access-token": `${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        Alert.success(`${name} has been added successfully.`);
        console.log(res);
      })
      .catch((ex) => {
        {
          Alert.error(ex.response.data.message);
          console.log(ex);
        }
      });
    dispatch(getExpenses());
    dispatch(getIncomes());
  };

  return (
    <>
      <div
        className="container p-4"
        style={{ backgroundColor: "#008764", borderRadius: "5%" }}
      >
        <form className="form-group" onSubmit={submitHandler}>
          <legend className="text-light">Add Expense/Income</legend>
          <input
            type="text"
            className="form-control mt-2"
            id="name"
            placeholder="Enter Expense/Income name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <select
            className="form-select mt-2"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Please Select Category</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>

          <input
            type="number"
            className="form-control mt-2"
            id="amount"
            placeholder="Enter Expense/Income amount"
            name="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />

          <input
            type="Date"
            className="form-control mt-2"
            id="date"
            placeholder="Enter Expense/Income amount"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <button
            className="btn  mt-2"
            style={{ backgroundColor: " rgb(243, 220, 45)" }}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpForm;
