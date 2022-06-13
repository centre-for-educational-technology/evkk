import React from "react";

function CorpusTexts(props) {

    const data = props.data;

    return (
        <>
            { data.length > 0 ? <div>Vasteid: {data.length}</div> : <></> }
            {data.map((e) => (
                <div key={e.text_id}>{e.property_value}</div>
            ))}
        </>
    )
}

export default CorpusTexts;