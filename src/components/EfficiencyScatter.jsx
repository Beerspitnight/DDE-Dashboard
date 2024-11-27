import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EfficiencyScatter = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available for Efficiency Analysis.</div>;
  }

  // Extract time-on-task vs. pass rate data
  const scatterData = data.map((row) => ({
    time: parseFloat(row["Average Lesson Time-on-Task per Student (Mins)"]) || 0,
    passRate: parseFloat(row["Average % Lessons Passed (YTD)"]) || 0,
  }));

  return (
    <div>
      <h2>Efficiency Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="time" name="Time on Task (mins)" />
          <YAxis type="number" dataKey="passRate" name="Pass Rate (%)" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={scatterData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfficiencyScatter;
