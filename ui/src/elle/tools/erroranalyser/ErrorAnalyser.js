import { useState, useEffect } from 'react';

function ErrorAnalyser() {
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    fetch('http://localhost:9090/api/errors/getErrors?error=LEX&level=B1')
      .then(response => response.json())
      .then(data => setErrorDetails(data))
      .catch(error => console.error('Error:', error));

    console.log(errorDetails)
  }, []);

  return (
    <div>
      {errorDetails ? <pre>{JSON.stringify(errorDetails, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default ErrorAnalyser;
