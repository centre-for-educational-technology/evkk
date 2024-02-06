import { useState } from "react";
import { Typography } from "@mui/material";
import FilterAccordion from "./FilterAccordion";
import ErrorTable from "./ErrorTable";

//TODO translation

function ErrorAnalyser() {
  const [errorData, setErrorData] = useState(null);

  async function getErrors(errorTypeFilter, languageLevelFilter) {
    let query = "http://localhost:9090/api/errors/getErrors?";

    errorTypeFilter.forEach((element) => {
      query += "error=" + element + "&";
    });

    languageLevelFilter.forEach((element) => {
      query += "level=" + element + "&";
    });

    query = query.slice(0, -1);

    fetch(query)
      .then((response) => response.json())
      .then((data) => setErrorData(data))
      .catch((error) => console.error("Error:", error));
  }

  return (
    <>
      <Typography variant="h3">Veastatistika</Typography>

      <FilterAccordion getErrors={getErrors} />

      {errorData && <ErrorTable errorData={errorData} />}
    </>
  );
}

export default ErrorAnalyser;
