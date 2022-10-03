import * as React from 'react';
import {useEffect, useState} from 'react';
import Popover from '@mui/material/Popover';
import ReactExport from "react-export-excel";
import {CSVLink} from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import "../../../translations/i18n";

export default function DownloadButton({data, headers}) {

  const {t} = useTranslation();
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const [fileType, setFileType] = useState(false);
  const fileDownloadElement = React.createRef();
  const [buttonType, setButtonType] = useState(<Button variant='contained' onClick={showButton}>{t("common_download")}</Button>);
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
    tableHeaders.push({label: headers[i], key: "col" + [i+1]});
  }

  function setFirstRow() {
    if (headers.length === 4 && csvData === "") {
      for (const element of data) {
        element.col1 = element.col1.props.children;
      }
    }
  }

  useEffect(() => {
    setFirstRow();
    setData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setData(){
    if (headers.length === 5) {
      for (const element of data) {
        let a = "";
        for (let j = 0; j < element.col3[0].length; j++) {
          a += element.col3[0][j] + " ";
          a += element.col3[1][j];
        }
        element.col3[2] = a;
      }
      csvData = JSON.parse(JSON.stringify(data));
      console.log(csvData)
      for (let i = 0; i < data.length; i++) {
        csvData[i].col3.splice(0, 2);
      }
      console.log(csvData)
    } else if (headers.length === 4) {
      for (const element of data) {
        let a = "";
        for (let j = 0; j < element.col2[0].length; j++) {
          a += element.col2[0][j] + " ";
          a += element.col2[1][j];
        }
        element.col2[2] = a;
      }
      csvData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        csvData[i].col2.splice(0, 2);
      }
    } else if (headers.length === 7) {
      for (const element of data) {
        let a = "";
        for (let j = 0; j < element.col5[0].length; j++) {
          a += element.col5[0][j] + " ";
          a += element.col5[1][j];
        }
        element.col5[2] = a;
      }
      csvData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        csvData[i].col5.splice(0, 2);
      }
    }
  }

  function showButton() {
    if (headers.length === 5) {
      if (fileType) {
        setButtonType(<Button className='CSVBtn'
                              variant='contained'
                              color='primary'
        >
          <CSVLink filename={t("gram_anal_filename")}
                   className='csvLink'
                   headers={tableHeaders}
                   style = {{color: "white", textDecoration: "none"}}
                   data={csvData}>{t("common_download")}</CSVLink>
        </Button>);
      } else if (!fileType) {
        setButtonType(<ExcelFile filename={t("gram_anal_filename")}
                                 element={<Button variant='contained'>{t("common_download")}</Button>}>
          <ExcelSheet data={data}
                      name={t("common_excel_sheet_name")}>
            <ExcelColumn label={headers[0]}
                         value="col1"/>
            <ExcelColumn label={headers[1]}
                         value="col2"/>
            <ExcelColumn label={headers[2]}
                         value={(col) => col.col3[2] }/>
            <ExcelColumn label={headers[3]}
                         value="col4"/>
            <ExcelColumn label={headers[4]}
                         value="col5"/>
          </ExcelSheet>
        </ExcelFile>);
      }
    }
    if (headers.length === 4) {
      if (fileType) {
        setButtonType(<Button className='CSVBtn'
                              variant='contained'
                              color='primary'>
          <CSVLink filename={t("lemmas_filename")}
                   className='csvLink'
                   headers={tableHeaders}
                   data={csvData}>{t("common_download")}</CSVLink>
        </Button>);
      } else if (!fileType) {
        setButtonType(<ExcelFile filename={t("lemmas_filename")}
                                 element={<Button variant='contained'>{t("common_download")}</Button>}>
          <ExcelSheet data={data}
                      name={t("common_excel_sheet_name")}>
            <ExcelColumn label={headers[0]}
                         value="col1"/>
            <ExcelColumn label={headers[1]}
                         value={(col) => col.col2[2]}/>
            <ExcelColumn label={headers[2]}
                         value="col3"/>
            <ExcelColumn label={headers[3]}
                         value="col4"/>
          </ExcelSheet>
        </ExcelFile>);
      }
    }
    if (headers.length === 7) {
      if (fileType) {
        setButtonType(<Button className='CSVBtn'
                              variant='contained'
                              color='primary'>
          <CSVLink filename={t("syllables_filename")}
                   className='csvLink'
                   headers={tableHeaders}
                   data={csvData}>{t("common_download")}</CSVLink>
        </Button>);
      } else if (!fileType) {
        setButtonType(<ExcelFile filename={t("syllables_filename")}
                                 element={<Button variant='contained'>{t("common_download")}</Button>}>
          <ExcelSheet data={data}
                      name={t("common_excel_sheet_name")}>
            <ExcelColumn label={headers[0]}
                         value="col1"/>
            <ExcelColumn label={headers[1]}
                         value="col2"/>
            <ExcelColumn label={headers[2]}
                         value="col3"/>
            <ExcelColumn label={headers[3]}
                         value="col4"/>
            <ExcelColumn label={headers[4]}
                         value={(col) => col.col5[2]}/>
            <ExcelColumn label={headers[5]}
                         value="col6"/>
            <ExcelColumn label={headers[6]}
                         value="col7"/>
          </ExcelSheet>
        </ExcelFile>);
      }
    }
  }



  useEffect(() => {
    setData();
    showButton(); // This will always use latest value of count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileType, data])

  async function itemClickTrue() {
    await setFileType(true);
  }

  async function itemClickFalse() {
    await setFileType(false);
  }

  return (
    <Box display={"flex"}
         marginBottom={"20px"}
         justifyContent={"end"}>
      <Tooltip title={t("common_download")}
               placement="top">
        <Button aria-describedby={id}
                variant="contained"
                onClick={handleClick}>
          <DownloadIcon fontSize="large"/>
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
          <Box padding={"30px"}
               id='fileDownload'
               ref={fileDownloadElement}>
            <FormControl id="formId"
                         fullWidth>
              <InputLabel id="demo-simple-select-label">{t("common_download")}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="simple-select"
                size="medium"
                className='selectElement'
                defaultValue='Excel'
              >
                <MenuItem value="Excel"
                          onClick={itemClickFalse}>Excel</MenuItem>
                <MenuItem value="CSV"
                          onClick={itemClickTrue}>CSV</MenuItem>
              </Select>
            </FormControl>
            <div style={{paddingTop: "45px", paddingLeft: "60px"}}>{buttonType}</div>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
