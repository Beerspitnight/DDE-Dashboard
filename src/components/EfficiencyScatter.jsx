import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EfficiencyScatter = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Prepare data for scatter plot
  const scatterData = data.map((row) => ({
    time: parseInt(row['Average Lesson Time-on-Task per Student (Mins)'], 10) || 0,
    passRate: parseInt(row['% Lessons Passed (YTD)'], 10) || 0,
    grade: row.Grade,
  }));

  return (
    <div>
      <h2>Efficiency Analysis</h2>
      <ScatterChart
        width={800}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="time" name="Time-on-Task" unit=" mins" />
        <YAxis type="number" dataKey="passRate" name="Pass Rate" unit="%" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Grade Data" data={scatterData} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default EfficiencyScatter;
