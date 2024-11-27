// src/components/PassRateHistogram.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PassRateHistogram = ({ data }) => {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="passRate" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="passRate" fill="#8884d8" />
    </BarChart>
  );
};

export default PassRateHistogram;
