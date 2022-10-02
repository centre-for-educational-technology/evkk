import * as React from 'react';
import Popover from '@mui/material/Popover';
import ReactExport from "react-export-excel";
import {useEffect, useState} from 'react';
import {CSVLink} from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Box

} from "@mui/material";

export default function DownloadBtn({data, headers}) {

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const [fileType, setFileType] = useState(false);
  const fileDownloadElement = React.createRef();
  const [buttonType, setButtonType] = useState(<Button variant='contained' disabled>Laadi alla</Button>);
  let csvData = "";

  const [anchorEl, setAnchorEl] = React.useState(null);
  let tableHeaders = [];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  for (let i = 0; i < headers.length; i++) {
      tableHeaders.push({label: headers[i], key: "col"+[i]})
  }

  function setFirstRow() {
    if (headers.length === 4 && csvData === "") {
      for (let i = 0; i < data.length; i++) {
        data[i].col1 = data[i].col1.props.children
      }
    }
  }

  useEffect(() =>{setFirstRow()},[]);

  function ShowButton() {

    if(headers.length === 5){
      for (let i = 0; i < data.length; i++) {
        let a = "";
        for (let j = 0; j < data[i].col3[0].length; j++) {
          a += data[i].col3[0][j] + " ";
          a += data[i].col3[1][j];
        }
        data[i].col3[2] = a;
      }
      csvData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        csvData[i].col3.splice(0, 2);
      }
    }else if(headers.length === 4){
      for (let i = 0; i < data.length; i++) {
        let a = "";
        for (let j = 0; j < data[i].col2[0].length; j++) {
          a += data[i].col2[0][j] + " ";
          a += data[i].col2[1][j];
        }
        data[i].col2[2] = a;
      }
      csvData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        csvData[i].col2.splice(0, 2);
      }
    }else if(headers.length === 7){
      for (let i = 0; i < data.length; i++) {
        let a = "";
        for (let j = 0; j < data[i].col5[0].length; j++) {
          a += data[i].col5[0][j] + " ";
          a += data[i].col5[1][j];
        }
        data[i].col5[2] = a;
      }
      csvData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        csvData[i].col5.splice(0, 2);
      }
    }

    if(headers.length === 5) {
      if (fileType) {
        setButtonType(<Button className='CSVBtn' variant='contained' color='primary'>
          <CSVLink filename='gram_analyys' className='csvLink' headers={tableHeaders} data={csvData}>Laadi alla</CSVLink>
        </Button>);
      } else if (!fileType ) {
        setButtonType(<ExcelFile filename="gram_analyys" element={<Button variant='contained'>Laadi alla</Button>}>
          <ExcelSheet data={data} name="Sõnatabel">
            <ExcelColumn label={headers[0]} value="col1"/>
            <ExcelColumn label={headers[1]} value="col2"/>
            <ExcelColumn label={headers[2]} value={(col) => col.col3[2]}/>
            <ExcelColumn label={headers[3]} value="col4"/>
            <ExcelColumn label={headers[4]} value="col5"/>
          </ExcelSheet>
        </ExcelFile>);
      }
    }
    if(headers.length === 4) {
      if (fileType) {
        setButtonType(<Button className='CSVBtn' variant='contained' color='primary'>
          <CSVLink filename='algvormid' className='csvLink' headers={tableHeaders} data={csvData}>Laadi alla</CSVLink>
        </Button>);
      } else if (!fileType) {
        setButtonType(<ExcelFile filename="algvormid" element={<Button variant='contained'>Laadi alla</Button>}>
          <ExcelSheet data={data} name="Sõnatabel">
            <ExcelColumn label={headers[0]} value="col1"/>
            <ExcelColumn label={headers[2]} value={(col) => col.col2[2]}/>
            <ExcelColumn label={headers[1]} value="col3"/>
            <ExcelColumn label={headers[3]} value="col4"/>
          </ExcelSheet>
        </ExcelFile>);
      }
    }
    if(headers.length === 7) {
      if (fileType) {
        setButtonType(<Button className='CSVBtn' variant='contained' color='primary'>
          <CSVLink filename='silbid' className='csvLink' headers={tableHeaders} data={csvData}>Laadi alla</CSVLink>
        </Button>);

      } else if (!fileType) {
        setButtonType(<ExcelFile filename="silbid" element={<Button variant='contained'>Laadi alla</Button>}>
          <ExcelSheet data={data} name="Sõnatabel">
            <ExcelColumn label={headers[0]} value="col1"/>
            <ExcelColumn label={headers[1]} value="col2"/>
            <ExcelColumn label={headers[2]} value="col3"/>
            <ExcelColumn label={headers[3]} value="col4"/>
            <ExcelColumn label={headers[4]} value={(col) => col.col5[2]}/>
            <ExcelColumn label={headers[5]} value="col6"/>
            <ExcelColumn label={headers[6]} value="col7"/>
          </ExcelSheet>
        </ExcelFile>);

      }
    }
  }

  useEffect(() => {
    ShowButton(); // This will always use latest value of count
  }, [fileType])

  const handleClickDownload = e => ShowButton();
  async function itemClickTrue(){
    await setFileType(true)
  }
  async function itemClickFalse() {
    await setFileType(false)
  }

  return (

        <Box display={"flex"} marginBottom={"20px"} justifyContent={"end"}>
          <Tooltip title="Laadi alla" placement="top">
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
              <DownloadIcon fontSize="large" />
            </Button>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{width: "300px", height: "200px"}}>
              <Box padding={"30px"} id='fileDownload' ref={fileDownloadElement}>
                <FormControl id="formId" fullWidth>
                  <InputLabel id="demo-simple-select-label">Laadi alla</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="simple-select"
                    label="Laadimine"
                    size="medium"
                    className='selectElement'
                    defaultValue='Excel'
                  >
                    <MenuItem value="Excel" onClick={itemClickFalse}>Excel</MenuItem>
                    <MenuItem value="CSV" onClick={itemClickTrue}>CSV</MenuItem>
                  </Select>
                </FormControl>
                <div className='laadiBtn'>{buttonType}</div>
              </Box>
            </Box>
          </Popover>
        </Box>
  );
}
