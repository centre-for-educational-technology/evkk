import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FilterAccordion from "./errorfilter/FilterAccordion";
import ErrorTable from "./errortable/ErrorTable";

//TODO translation
//TODO päringusse lisada emakeel - peaks automaatselt võtma väärtused andmebaasist

export default function ErrorAnalyser() {
  const [errorData, setErrorData] = useState(null);

  const getErrors = async (errorTypeFilter, languageLevelFilter) => {
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
  };

  useEffect(() => {
    getErrors(["LEX"], ["B1"]);
  }, []);

  // useEffect(() => {
  //   console.log(errorData);
  // }, [errorData]);

  return (
    <>
      <Typography variant="h3">Veastatistika</Typography>

      {/* <FilterAccordion getErrors={getErrors} /> */}

      {errorData && <ErrorTable errorData={errorData} />}
    </>
  );
}
