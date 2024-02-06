import { useState, useEffect } from 'react';
import {languageErrors, languageLevels} from "./ErrorEnums";
import MultiLevelSelect from "./MultiLevelSelect";

//TODO translation
//TODO layout

function ErrorAnalyser() {
  const [errorDetails, setErrorDetails] = useState(null);

  async function getErrors(){
    fetch('http://localhost:9090/api/errors/getErrors?error=LEX&level=B1')
      .then(response => response.json())
      .then(data => setErrorDetails(data))
      .catch(error => console.error('Error:', error));
    console.log(errorDetails)
  }
  useEffect(() => {
    //
  }, []);

  return (
  <div>
    {/*{errorDetails ? <pre>{JSON.stringify(errorDetails, null, 2)}</pre> : 'Loading...'}*/}
    <MultiLevelSelect/>
  </div>
  );
}

export default ErrorAnalyser;
