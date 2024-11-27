import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';

const WeeklyTimeScatter = ({ data }) => {
  return (
    <ScatterChart width={800} height={400}>
      <CartesianGrid />
      <XAxis dataKey="timeSpent" name="Time Spent (mins)" />
      <YAxis dataKey="passRate" name="Pass Rate (%)" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <ReferenceArea x1={30} x2={49} stroke="green" strokeOpacity={0.3} />
      <Scatter name="Students" data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

export default WeeklyTimeScatter;
