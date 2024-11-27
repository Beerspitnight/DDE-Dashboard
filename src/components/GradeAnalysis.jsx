import React from "react";

const GradeAnalysis = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available for Grade Analysis.</div>;
  }

  // Group data by grade and calculate averages
  const grades = {};
  data.forEach((row) => {
    const grade = row["Grade"];
    const time = parseFloat(row["Average Lesson Time-on-Task per Student (Mins)"]) || 0;
    const passRate = parseFloat(row["Average % Lessons Passed (YTD)"]) || 0;

    if (!grades[grade]) {
      grades[grade] = { totalTime: 0, totalPassRate: 0, count: 0 };
    }

    grades[grade].totalTime += time;
    grades[grade].totalPassRate += passRate;
    grades[grade].count += 1;
  });

  const gradeData = Object.entries(grades).map(([grade, stats]) => ({
    grade,
    avgTime: (stats.totalTime / stats.count).toFixed(2),
    avgPassRate: (stats.totalPassRate / stats.count).toFixed(2),
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
          {gradeData.map((row) => (
            <tr key={row.grade}>
              <td>{row.grade}</td>
              <td>{row.avgTime}</td>
              <td>{row.avgPassRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeAnalysis;
