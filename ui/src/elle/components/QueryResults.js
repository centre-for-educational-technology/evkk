import React, {useState} from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  Modal,
  Typography
} from "@mui/material";
import {usePagination, useTable} from "react-table";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./styles/QueryResults.css";
import {ages, corpuses, educations, genders, locations, types} from "../utils/constants";

function QueryResults(props) {

  const response = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const [metadata, setMetadata] = useState({
    title: '',
    korpus: '',
    tekstityyp: '',
    tekstikeel: '',
    keeletase: '',
    abivahendid: '',
    aasta: '',
    vanus: '',
    sugu: '',
    haridus: '',
    emakeel: '',
    elukohariik: '',
  });

  const basicMetadataFields = ['title', 'tekstikeel', 'keeletase', 'abivahendid', 'aasta', 'emakeel'];

  const columns = React.useMemo(() => [
      {
        Header: '',
        accessor: 'col1',
        disableSortBy: true,
        sortable: false,
        width: 800,
      }
    ],
    []
  );
  const data = React.useMemo(() => fillData(), []);

  function fillData() {
    let tableVal = [];
    for (let i = 0; i < response.size; i++) {
      let info = {
        col1: ""
      }
      info.col1 = <span onClick={() => previewText(response[i].text_id)}>{response[i].property_value}</span>;
      tableVal.push(info);
    }
    return tableVal;
  }

  const {
    getTableProps,
    getTableBodyProps,
    page,
    state,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } =
    useTable({columns, data}, usePagination);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    bgcolor: '#FCFCFC',
    boxShadow: 24,
    borderRadius: '12px',
    p: 4,
    maxHeight: '80vh',
    overflow: 'auto'
  }

  const changeAccordion = () => {
    setExpanded(!expanded);
  };

  function previewText(id) {
    setLoading(true);

    fetch("/api/texts/kysitekstimetainfo?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then((result) => {
        result.forEach(param => {
          if (basicMetadataFields.includes(param.property_name)) {
            setIndividualMetadata(param.property_name, param.property_value);
          }
          if (param.property_name === 'korpus') {
            setIndividualMetadata('korpus', corpuses[param.property_value]);
          }
          if (param.property_name === 'tekstityyp') {
            const value = types[param.property_value] === undefined
              ? 'tundmatu teksti liik'
              : types[param.property_value];
            setIndividualMetadata('tekstityyp', value);
          }
          if (param.property_name === 'vanus') {
            if (ages[param.property_value] !== undefined) {
              setIndividualMetadata('vanus', ages[param.property_value]);
            } else {
              if (param.property_value <= 18) {
                setIndividualMetadata('vanus', ages['kuni18']);
              } else if (param.property_value > 18 && param.property_value < 27) {
                setIndividualMetadata('vanus', ages['kuni26']);
              } else if (param.property_value > 26 && param.property_value < 41) {
                setIndividualMetadata('vanus', ages['kuni40']);
              } else if (param.property_value > 40) {
                setIndividualMetadata('vanus', ages['41plus']);
              }
            }
          }
          if (param.property_name === 'sugu') {
            setIndividualMetadata('sugu', genders[param.property_value]);
          }
          if (param.property_name === 'haridus') {
            setIndividualMetadata('haridus', educations[param.property_value]);
          }
          if (param.property_name === 'elukoht') {
            if ('riik' in result) {
              const countryPropertyValue = result['riik'].property_value;
              const startingLetter = countryPropertyValue.charAt(0).toUpperCase();
              setIndividualMetadata('elukohariik', startingLetter + countryPropertyValue.slice(1));
            } else {
              if (locations.includes(param.property_value)) {
                setIndividualMetadata('elukohariik', 'Eesti');
              } else {
                const startingLetter = param.property_value.charAt(0).toUpperCase();
                setIndividualMetadata('elukohariik', startingLetter + param.property_value.slice(1));
              }
            }
          }
        });
        setLoading(false);
      })
    fetch("/api/texts/kysitekst?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text())
      .then((result) => {
        setText(result);
      });

    Object.entries(metadata).forEach((entry) => {
      if (entry[1] === '') {
        setIndividualMetadata(entry[0], '-');
      }
    });

    setModalOpen(true);
  }

  const setIndividualMetadata = (keyName, valueName) => {
    setMetadata(prevData => {
      return {
        ...prevData,
        [keyName]: valueName
      }
    });
  }

  return (
    <>
      {response.length > 0 ? <h4><strong>Leitud tekste:</strong> {response.length}</h4> : <></>}
      <br/>
      <table className='resultTable'>
        <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {response.map((e) => (
          <tr
            className='tableRow border'
            key={e.text_id}
            id={e.text_id}>
            <td className='checkboxRow'>
              <Checkbox/>
            </td>
            <td className='clickableRow'
                onClick={() => previewText(e.text_id)}>
              {e.property_value}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box sx={modalStyle}>
          <div className="modal-head">
            {metadata.title}
          </div>
          <br/>
          <div>
            <Accordion expanded={expanded}
                       onChange={changeAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                id="filters-header"
              >
                <Typography>
                  Teksti metainfo
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <strong>Korpus:</strong> {metadata.korpus}<br/>
                <strong>Teksti liik:</strong> {metadata.tekstityyp}<br/>
                <strong>Teksti keel:</strong> {metadata.tekstikeel}<br/>
                <strong>Teksti tase:</strong> {metadata.keeletase}<br/>
                <strong>Kasutatud õppematerjale:</strong> {metadata.abivahendid}<br/>
                <strong>Teksti lisamise aasta:</strong> {metadata.aasta}<br/>
                <br/>
                <strong>Autori vanus:</strong> {metadata.vanus}<br/>
                <strong>Autori sugu:</strong> {metadata.sugu}<br/>
                <strong>Autori haridus:</strong> {metadata.haridus}<br/>
                <strong>Autori emakeel:</strong> {metadata.emakeel}<br/>
                <strong>Autori elukohariik:</strong> {metadata.elukohariik}<br/>
              </AccordionDetails>
            </Accordion>
            <br/>
            <Backdrop
              open={loading}
            >
              <CircularProgress disableShrink
                                thickness='4'
                                size='10%'/>
            </Backdrop>
            {text.split(/\\n/g).map(function (item, index) {
              return (
                <span key={index}>
                  {item}
                  <br/>
                </span>
              )
            })}
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default QueryResults;
