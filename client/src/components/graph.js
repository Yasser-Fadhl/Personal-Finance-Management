import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Chart, ArcElement } from "chart.js";
import { Doughnut, getDatasetAtEvent } from "react-chartjs-2";

const Graph = () => {
  const { loading, Data, labels, colors } = useSelector(
    (state) => state.expenses
  );

  Chart.register(ArcElement);
  const config = {
    data: {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: Data,
          backgroundColor: colors,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 4,
        },
      ],
    },
    options: {
      cutout: 150,
    },
  };
  return (
    <>
      <div className="">
        <Doughnut {...config}></Doughnut>
      </div>
    </>
  );
};

export default Graph;
