import React from "react";
import { Chart } from "react-google-charts";

const ChartComponentPie = ({ pieData, title }) => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="PieChart"
      loader={<div>Loading Chart...</div>}
      data={pieData}
      options={{
        title: title,
      }}
    />
  );
};

export default ChartComponentPie;
