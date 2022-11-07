import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExpenses } from "../Expenses/expensesActions";
import "./history.css";

const History = () => {
  const { expenses } = useSelector((state) => state.expenses);
  const { income } = useSelector((state) => state.income);
  const [expData, setExpData] = useState(expenses);
  const [don, setDon] = useState(true);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(new Date());
  const [dateFil, setDateFil] = useState(false);
  useEffect(() => {
    if (dateFil && fromDate !== null && toDate !== null) {
      setExpData(
        expenses.filter((obj) => {
          return (
            new Date(obj.expesedAt) >= new Date(fromDate) &&
            new Date(obj.expesedAt) <= new Date(toDate)
          );
        })
      );
    } else {
      setExpData(expenses);
    }
  }, [dateFil, fromDate, toDate]);
  return (
    <>
      <h2>History</h2>
      <hr></hr>
      <input
        type="date"
        name="date1"
        value={fromDate}
        onChange={(e) => {
          setDateFil(true);
          setFromDate(e.target.value);
        }}
      />
      <input
        type="date"
        name="date2"
        value={toDate}
        onChange={(e) => {
          setDateFil(true);
          setToDate(e.target.value);
        }}
      />
      <button
        className="btn btn-success"
        onClick={() => {
          setDateFil(false);
        }}
      >
        Reset
      </button>
      <div>
        <button
          onClick={() => {
            setDon(true);
            setDateFil(false);
          }}
          className="btn btn-danger"
        >
          Expenses
        </button>
        <button
          onClick={() => {
            setDon(false);
            setDateFil(false);
          }}
          className="btn btn-success"
        >
          income
        </button>
      </div>
      <div>
        <table className="table">
          <thead
            className="w-100 text-white"
            style={{ backgroundColor: "#044A3A" }}
          >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          {don && expenses
            ? expData.map((exp) => {
                return (
                  <tbody style={{ backgroundColor: "#FCE988" }}>
                    <tr>
                      <th
                        scope="row"
                        style={{ backgroundColor: `rgb(172, 8, 8)` }}
                      ></th>
                      <td className="">{exp.name}</td>
                      <td>{exp.amount + " "}SD</td>
                      <td>{new Date(exp.expesedAt).toDateString()}</td>
                      <td>
                        <button
                          className="don btn btn-danger btn-sm"
                          style={{
                            cursor: "pointer",
                            backgroundColor: "044A3A",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            : income &&
              income.map((exp) => {
                return (
                  <tbody style={{ backgroundColor: "#FCE988" }}>
                    <tr>
                      <th
                        scope="row"
                        style={{ backgroundColor: "#007153" }}
                      ></th>
                      <td className="">{exp.name}</td>
                      <td>{exp.amount + "  "}SD</td>
                      <td>{new Date(exp.earnedAt).toISOString()}</td>
                      <td>
                        <button
                          className="don btn btn-sm btn-danger text-light"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
        </table>
      </div>
    </>
  );
};

export default History;
