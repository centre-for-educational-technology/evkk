import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Modal, Typography} from "@mui/material";
import {usePagination, useTable} from "react-table";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./styles/QueryResults.css";

function QueryResults(props) {

  const response = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
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
    fetch("/api/texts/kysitekstimetainfo?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then((result) => {
        result.forEach(param => {
          if (param.property_name === 'title') {
            setTitle(param.property_value);
          }
        })
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
      })
    setModalOpen(true);
  }

  return (
    <>
      {response.length > 0 ? <h4><strong>Leitud tekste:</strong> {response.length}</h4> : <></>}
      <br/>
      <table>
        <thead>
        <tr>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {response.map((e) => (
          <tr
            key={e.text_id}>
            <td onClick={() => previewText(e.text_id)}>
              {e.property_value}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <Box sx={modalStyle}>
          <div className="modal-head">
            {title}
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
                <strong>Korpus: </strong><br/>
                <strong>Teksti liik: </strong><br/>
                <strong>Teksti keel: </strong><br/>
                <strong>Teksti tase: </strong><br/>
                <strong>Kasutatud õppematerjale: </strong><br/>
                <strong>Teksti lisamise aasta: </strong><br/>
                <br/>
                <strong>Autori vanus: </strong><br/>
                <strong>Autori sugu: </strong><br/>
                <strong>Autori haridus: </strong><br/>
                <strong>Autori emakeel: </strong><br/>
                <strong>Autori elukohariik: </strong><br/>
              </AccordionDetails>
            </Accordion>
            <br/>
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
