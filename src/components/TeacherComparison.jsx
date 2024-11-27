import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const TeacherComparison = ({ data }) => {
  const gradeAverage =
    data.reduce((acc, curr) => acc + curr.passRate, 0) / data.length;

  return (
    <BarChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="teacher" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="passRate" fill="#8884d8" name="Teacher Pass Rate" />
      <Bar
        dataKey={() => gradeAverage}
        fill="#ffc658"
        name="Grade Average"
      />
    </BarChart>
  );
};

export default TeacherComparison;
