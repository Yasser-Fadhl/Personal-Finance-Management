import React from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import History from "./history";
import ExpForm from "./expForm";
import Graph from "./graph";
import Lables from "./Lables";
const Dashboard = () => {
  /* 
  const Alert = useAlert();
  const dispatch = useDispatch();
*/
  const { totalDailyExp } = useSelector((state) => state.expenses);
  return (
    <div className="container overflow-hidden">
      <div className="row mt-5 gx-5">
        <div className="col col-md-5 ">
          <Graph />
          <h1
            className="text-center"
            style={{
              position: "relative",
              left: "1rem",
              bottom: "16rem",
              fontSize: "2rem",
              color: "#008764",
            }}
          >
            Total:
            <br /> {totalDailyExp + " "} SD
          </h1>
        </div>
        <div className="col-sm"></div>
        <div className="col col-md-5" style={{}}>
          <ExpForm />
        </div>
        <div className="w-100"></div>

        <div className="col col-md-5 ">
          <History />
        </div>
        <div className="col col-md-5 "></div>
      </div>
    </div>
  );
};

export default Dashboard;
