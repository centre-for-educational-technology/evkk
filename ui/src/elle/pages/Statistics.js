import React, { useEffect, useState } from "react";
import { loadFetch } from "../service/LoadFetch";
import ChartComponent from "../components/ChartComponent.js";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Statistics() {
  const [noResultsError, setNoResultsError] = useState(false);
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState([]);

  //getting the data on page load
  const fetchData = () => {
    return loadFetch('/api/texts/uusparing', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  };

  useEffect(() => {
    fetchData()
      .then(result => {
        if (result.length > 0) {
          setNoResultsError(false);
          setResults(result);
        } else {
          setNoResultsError(true);
          setResults([]);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setNoResultsError(true);
        setShowChart(false);
      });
  }, []);

  //checkbox
  const handleGenderCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenders([...selectedGenders, value]);
    } else {
      setSelectedGenders(selectedGenders.filter((gender) => gender !== value));
    }
  };

  //chart
  const processChartData = (result) => {
    if (result.length > 0) {
      setNoResultsError(false);
      setResults(result);

      const yearData = result.reduce((acc, item) => {
        const regex = /"aasta:\s*(.*?)"/;
        const match = item.match(regex);
        const yearValue = match ? match[1] : null;
        if (yearValue) {
          acc[yearValue] = (acc[yearValue] || 0) + 1;
        }
        return acc;
      }, {});

      const chartData = Object.entries(yearData).map(([year, count]) => [year, count]);
      setChartData(chartData);
    } else {
      setNoResultsError(true);
      setResults([]);
    }
  };

  const handleChartClick = () => {
    setShowChart(true);
    processChartData(results);
  };

  return (
    <>

      {/* Gender Checkboxes */}
      <FormControlLabel
        control={<Checkbox value="male" onChange={handleGenderCheckboxChange} />}
        label="Male"
      />
      <FormControlLabel
        control={<Checkbox value="female" onChange={handleGenderCheckboxChange} />}
        label="Female"
      />

      {/* Button */}
      <button onClick={handleChartClick}>Show Chart</button>

      {/* Chart */}
      {showChart && (
        <>
          {noResultsError ? (
            <p>No results found.</p>
          ) : (
            <ChartComponent
              data={[["Category", "Value"], ...chartData]}
              title="Aastaline jaotuvus"
              xAxisTitle="Tekstide arv"
              yAxisTitle="Aasta"
            />
          )}
        </>
      )}

    </>
  );
}

export default Statistics;
