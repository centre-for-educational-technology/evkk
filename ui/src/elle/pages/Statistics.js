import React, { useEffect, useState, useCallback } from "react";
import { loadFetch } from "../service/LoadFetch";
import { Checkbox, FormControlLabel } from "@mui/material";
import ChartComponent from "../components/ChartComponent.js";

function Statistics() {
  const [noResultsError, setNoResultsError] = useState(false);
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [chartTitle, setChartTitle] = useState([]);
  const [yAxisTitle, setYAxisTitle] = useState([]);

  //getting the data on page load
  const fetchData = useCallback(() => {
    return loadFetch('/api/texts/getAllData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  }, []);

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
  }, [fetchData]);

  //count and checkboxes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    // Check if the value is a gender or a year range
    if (value === "male" || value === "female") {
      // Update the selectedGenders state
      setSelectedGenders((prevSelectedGenders) => {
        if (checked) {
          return [...prevSelectedGenders, value]; // Add the new value to the array
        } else {
          return prevSelectedGenders.filter((item) => item !== value); // Remove the value from the array
        }
      });
    } else {
      // Update the selectedYears state
      setSelectedYears((prevSelectedYears) => {
        if (checked) {
          return [...prevSelectedYears, value]; // Add the new value to the array
        } else {
          return prevSelectedYears.filter((item) => item !== value); // Remove the value from the array
        }
      });
    }
  };

  //gender
  const filterByGender = (item, selectedGenders) => {
    if (selectedGenders.includes("male") && selectedGenders.includes("female")) {
      return item.includes("sugu: mees") || item.includes("sugu: naine");
    }
    if (selectedGenders.includes("female")) {
      return item.includes("sugu: naine");
    }
    if (selectedGenders.includes("male")) {
      return item.includes("sugu: mees");
    }
    return false;
  };

  const allGendersSelected = selectedGenders.includes("male") && selectedGenders.includes("female");

  //year
  const yearRanges = {
    "2000-2005": [2000, 2001, 2002, 2003, 2004, 2005],
    "2006-2010": [2006, 2007, 2008, 2009, 2010],
    "2011-2015": [2011, 2012, 2013, 2014, 2015],
    "2016-2020": [2016, 2017, 2018, 2019, 2020],
    "2021...": [2021, 2022, 2023, 2024],
  };

  const filterByYear = (item, selectedYears) => {
    const yearKeywords = selectedYears.flatMap(yearRange => yearRanges[yearRange].map(year => `aasta: ${year}`))  || [];
    return yearKeywords.some(keyword => item.includes(keyword));
  };

  const allYearsSelected =
    selectedYears.includes("2000-2005") &&
    selectedYears.includes("2006-2010") &&
    selectedYears.includes("2011-2015") &&
    selectedYears.includes("2016-2020") &&
    selectedYears.includes("2021...");


  // Count the data rows based on the selected boxes
  useEffect(() => {
    let count = 0;

    if (
      selectedGenders.length === 0 &&
      selectedYears.length === 0
    ) {
      count = results.length;
    } else if (allGendersSelected && allYearsSelected) {
      count = results.length;
    } else if (selectedYears.length === 0 && allGendersSelected) {
      count = results.length;
    } else {
      if (selectedGenders.length > 0 && selectedYears.length > 0) {
        count = results.filter(
          (item) =>
            filterByGender(item, selectedGenders) && filterByYear(item, selectedYears)
        ).length;
      } else if (selectedGenders.length > 0) {
        count = results.filter((item) => filterByGender(item, selectedGenders)).length;
      } else if (selectedYears.length > 0) {
        count = results.filter((item) => filterByYear(item, selectedYears)).length;
      }
    }

    setDataCount(count);
  }, [selectedYears, selectedGenders, results, allGendersSelected, allYearsSelected]);


  // Chart
  // Function to process chart data based on Year
  const processYearData = (result) => {
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

      setChartTitle("Aastaline jaotuvus");
      setYAxisTitle("Aasta");
    } else {
      setNoResultsError(true);
      setResults([]);
    }
  };

  // Function to process chart data based on Gender
  const processGenderData = (result) => {
    if (result.length > 0) {
      setNoResultsError(false);
      setResults(result);

      const genderData = result.reduce((acc, item) => {
        const maleCount = (item.match(/sugu:\s*mees/g) || []).length;
        const femaleCount = (item.match(/sugu:\s*naine/g) || []).length;

        acc["male"] = (acc["male"] || 0) + maleCount;
        acc["female"] = (acc["female"] || 0) + femaleCount;

        return acc;
      }, {});

      const chartData = Object.entries(genderData).map(([gender, count]) => [gender, count]);
      setChartData(chartData);

      setChartTitle("Sooline jaotuvus");
      setYAxisTitle("Sugu");
      //setNoResultsError(true);
      setResults([]);
    }
  };

  const handleChartClick = () => {
    setShowChart(true);
    processYearData(results, selectedValues); //siit saab muuta mis chart kuvatakse
  };

  return (
    <>
      <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* Gender Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Gender</label>
            <FormControlLabel
              control={<Checkbox value="male" onChange={handleCheckboxChange} />}
              label="Male"
            />
            <FormControlLabel
              control={<Checkbox value="female" onChange={handleCheckboxChange} />}
              label="Female"
            />
          </div>

          {/* Year Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Year</label>
            <FormControlLabel
              control={<Checkbox value="2000-2005" onChange={handleCheckboxChange} />}
              label="2000-2005"
            />
            <FormControlLabel
              control={<Checkbox value="2006-2010" onChange={handleCheckboxChange} />}
              label="2006-2010"
            />
            <FormControlLabel
              control={<Checkbox value="2011-2015" onChange={handleCheckboxChange} />}
              label="2011-2015"
            />
            <FormControlLabel
              control={<Checkbox value="2016-2020" onChange={handleCheckboxChange} />}
              label="2016-2020"
            />
            <FormControlLabel
              control={<Checkbox value="2021..." onChange={handleCheckboxChange} />}
              label="2021..."
            />
          </div>
        </div>

        {/* Data Count */}
        <p>Data Count: {dataCount}</p>

        {/* Chart */}
        <button onClick={handleChartClick}>Show Chart</button>

        {showChart && (
          <>
            {noResultsError ? (
              <p>No results found.</p>
            ) : (
              <ChartComponent
                data={[["Category", "Value"], ...chartData]}
                title={chartTitle}
                xAxisTitle="Tekstide arv"
                yAxisTitle={yAxisTitle}
              />
            )}
          </>
        )}
      </>

    </>
  );
}

export default Statistics;
