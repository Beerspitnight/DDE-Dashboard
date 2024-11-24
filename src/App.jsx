import React, { useState } from 'react';

import processCSVData from '../utils/dataProcessing'; 
import FilterBar from './components/dashboard/FilterBar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const App = () => {
  const [originalData, setOriginalData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    setError('');
    const file = event.target.files[0];

    if (!file || file.type !== 'text/csv') {
      setError('Please upload a valid CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const processedData = processCSVData(e.target.result);
      if (processedData.error) {
        setError(processedData.error);
      } else {
        setOriginalData(processedData);
        setChartData(processedData);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="border border-gray-200 m-4">
      <div className="border-b border-gray-200 p-2">
        <h1 className="text-xl">Math Performance Dashboard</h1>
      </div>
      <div className="m-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        {chartData.length > 0 && (
          <div className="border-t mt-4 pt-4">
            <h2 className="text-lg mb-2">CSV Data Preview:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(chartData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
