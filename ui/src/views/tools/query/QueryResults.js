import React from "react";

function QueryResults(props) {

  const data = props.data;

  return (
    <>
      {data.length > 0 ? <h4><strong>Leitud tekste:</strong> {data.length}</h4> : <></>}
      {data.map((e) => (
        <div key={e.text_id}>{e.property_value}</div>
      ))}
    </>
  )
}

export default QueryResults;
