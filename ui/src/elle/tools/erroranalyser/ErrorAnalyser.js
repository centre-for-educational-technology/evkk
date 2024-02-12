import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import FilterAccordion from "./errorfilter/FilterAccordion";
import ErrorTable from "./errortable/ErrorTable";

//TODO translation
//TODO päringusse lisada emakeel - peaks automaatselt võtma väärtused andmebaasist

export default function ErrorAnalyser() {
  const [filterEnums, setFilterEnums] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFilterEnums = async () => {
    try {
      // setIsLoading(true);
      const response = await fetch(
        "http://localhost:9090/api/errors/getFilterEnums"
      );
      const data = await response.json();
      setFilterEnums(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const getErrors = async (errorTypeFilter, languageLevelFilter) => {
    let query = "http://localhost:9090/api/errors/getErrors?";

    errorTypeFilter.forEach((element) => {
      query += "error=" + element + "&";
    });

    languageLevelFilter.forEach((element) => {
      query += "level=" + element + "&";
    });

    query = query.slice(0, -1);

    try {
      setIsLoading(true);
      const response = await fetch(query);
      const data = await response.json();
      setErrorData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // getErrors(["LEX"], ["B1"]);
    getFilterEnums();
  }, []);

  // useEffect(() => {
  //   console.log(errorData);
  // }, [errorData]);

  return (
    <>
      <Typography variant="h3">Veastatistika</Typography>

      <FilterAccordion getErrors={getErrors} setErrorData={setErrorData} />

      {isLoading && (
        <Box className="spinner-container">
          <CircularProgress />
        </Box>
      )}

      {errorData && <ErrorTable errorData={errorData} />}
    </>
  );
}
