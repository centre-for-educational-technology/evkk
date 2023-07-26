import React from "react";
import { Chart } from "react-google-charts";

const ChartComponent = ({ data, title, xAxisTitle, yAxisTitle }) => {
  return (
    <Chart
      width={"500px"}
      height={"300px"}
      chartType="BarChart"
      loader={<div>Loading Chart...</div>}
      data={data}
      options={{
        title: title,
        hAxis: { title: xAxisTitle },
        vAxis: { title: yAxisTitle },
      }}
    />
  );
};

export default ChartComponent;
