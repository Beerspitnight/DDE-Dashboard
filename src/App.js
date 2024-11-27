import React, { useState } from 'react';
import Papa from 'papaparse';
import DataTable from './components/DataTable';
import GradeAnalysis from './components/GradeAnalysis';
import EfficiencyScatter from './components/EfficiencyScatter';

function App() {
  const [data, setData] = useState([]);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    }
  };

  return (
    <div>
      <h1>Middle School Intervention Data</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <DataTable data={data} />
      <GradeAnalysis data={data} />
      <EfficiencyScatter data={data} />
    </div>
  );
}

export default App;
