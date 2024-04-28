import React from "react";
import { Chart } from "react-google-charts";

const ChartComponent = ({ data, title }) => {
  return (
    <Chart
      width={"500px"}
      height={"300px"}
      chartType="Bar"
      loader={<div>Loading Chart...</div>}
      data={data}
      options={{
        chart: {
          title: title,
        }
      }}
    />
  );
};

export default ChartComponent;