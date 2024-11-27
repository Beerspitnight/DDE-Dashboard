import React from 'react';

const GradeAnalysis = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Example: Calculate averages per grade
  const gradeSummary = data.reduce((acc, row) => {
    const grade = row.Grade;
    if (!acc[grade]) {
      acc[grade] = {
        totalTime: 0,
        totalStudents: 0,
        totalPass: 0,
        studentCount: 0,
      };
    }
    acc[grade].totalTime += parseInt(row['Average Lesson Time-on-Task per Student (Mins)'], 10) || 0;
    acc[grade].totalPass += parseInt(row['% Lessons Passed (YTD)'], 10) || 0;
    acc[grade].studentCount += 1;
    return acc;
  }, {});

  const gradeAnalysis = Object.keys(gradeSummary).map((grade) => ({
    grade,
    avgTime: (gradeSummary[grade].totalTime / gradeSummary[grade].studentCount).toFixed(2),
    avgPassRate: (gradeSummary[grade].totalPass / gradeSummary[grade].studentCount).toFixed(2),
  }));

  return (
    <div>
      <h2>Grade Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Average Time-on-Task (mins)</th>
            <th>Average % Pass Rate</th>
          </tr>
        </thead>
        <tbody>
          {gradeAnalysis.map((item) => (
            <tr key={item.grade}>
              <td>{item.grade}</td>
              <td>{item.avgTime}</td>
              <td>{item.avgPassRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeAnalysis;
