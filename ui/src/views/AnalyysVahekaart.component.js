import React, { Fragment, useMemo, useState } from 'react';
import { useSortBy, useFilters, useTable, usePagination	} from 'react-table';
import { Button, Checkbox, ButtonGroup, Select, MenuItem, TextField, FormControl, InputLabel, Tooltip } from "@mui/material";
import './AnalyysVahekaart.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import ReactExport from "react-export-excel";
import CloseIcon from '@mui/icons-material/Close';





function Analyysvahekaart() {

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  
  const[fileType, setFileType] = useState(true);

 

  const text = "Tallinna suurimas linnaosas Lasnamäel on alles vaid kaks eesti õppekeelega gümnaasiumi Laagna ja Kuristiku kus mõlemas peaaegu tuhat õpilast Parajasti on vahetund aga kui vähemaks jääb on Laagna gümnaasiumi juhtkond direktori asetäitjad õppe ja kasvatustöö alal ning direktor lahkelt nõus jagama rõõme ja muresid mis eri rahvuste koos õppimisega kaasas käivad"
  const sonad = text.split(" ")
  const sonaliik = [
    "nimisõna",
    "omadussõna",
    "nimisõna",
    "nimisõna",
    "tegusõna",
    "määrsõna",
    "määrsõna",
    "arvsõna",
    "omadussõna",
    "nimisõna",
    "nimisõna",
    "nimisõna",
    "sidesõna",
    "nimisõna",
    "määrsõna",
    "määrsõna",
    "määrsõna",
    "arvsõna",
    "nimisõna",
    "määrsõna",
    "tegusõna",
    "nimisõna",
    "määrsõna",
    "sidesõna",
    "omadussõna",
    "tegusõna",
    "tegusõna",
    "nimisõna",
    "nimisõna",
    "nimisõna",
    "nimisõna",
    "nimisõna",
    "nimisõna",
    "sidesõna",
    "nimisõna",
    "nimisõna",
    "sidesõna",
    "nimisõna",
    "määrsõna",
    "määrsõna",
    "tegusõna",
    "nimisõna",
    "sidesõna",
    "nimisõna",
    "asesõna",
    "omadussõna",
    "nimisõna",
    "kaassõna",
    "nimisõna",
    "määrsõna",
    "tegusõna"
]
  let sonaList = new Map();
  let numbrid = new Map();



  const sonuSonaliigis = () => {

    for (let i = 0; i < sonaliik.length; i++) {

      if(!sonaList.has(sonaliik[i])){
        sonaList.set(sonaliik[i],[]);
        sonaList.get(sonaliik[i]).push(sonad[i]);
        numbrid.set(sonad[i], 1);
      }else if(sonaList.has(sonaliik[i])){

          if(sonaList.get(sonaliik[i]).includes(sonad[i])){
            
            numbrid.set(sonad[i],(numbrid.get(sonad[i]) + 1)) ;
          }else{
            sonaList.get(sonaliik[i]).push(sonad[i]);
            numbrid.set(sonad[i], 1);
          }
        }
      }
    }
    
   


  sonuSonaliigis();
  


  function fillData(){
    let tableVal = []
    // console.log(Array.from(sonaList.keys())[0])
    for (let i = 0; i < sonaList.size; i++) {
      let info = {
        col1: "",
        col2: "",
        col3: 0,
        col4: 0
      }
      
      info.col1 = Array.from(sonaList.keys())[i];
      for (let j = 0; j < sonaList.get(Array.from(sonaList.keys())[i]).length; j++) {
        info.col2 = info.col2 + sonaList.get(Array.from(sonaList.keys())[i])[j] + String.fromCharCode(160) + "(" + numbrid.get(sonaList.get(sonaliik[i])[j]) + "), ";
        info.col3 = parseInt(info.col3) + parseInt(numbrid.get(sonaList.get(sonaliik[i])[j]))
      }

     
      info.col4 = (sonaList.get(Array.from(sonaList.keys())[i]).length * 100 / sonad.length).toFixed(1);
      tableVal.push(info);

    }
    
    console.log(tableVal)
    return tableVal;
  }

  fillData();


/* 
  console.log(sonaList)
  console.log(numbrid)

  console.log(sonad) */

  const [showFilter, setShowFilter] = useState(false);

  const MultipleFilter = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      console.log(val);
      if (filterValue.includes(val.original.col1)) arr.push(val);
      console.log(filterValue);
      console.log(val.original.col1);
    });
    //console.log(arr);
    return arr;
  };

  function ShowPopup(){
    if(document.getElementById('filterDiv').style.display  === "none"){
      document.getElementById('filterDiv').style.display = "block"
    }else if(document.getElementById('filterDiv').style.display === "block"){
      document.getElementById('filterDiv').style.display = "none"
    }
    outsideClick();
      
  }

  function ShowDownload(){
    if(document.getElementById('fileDownload').style.display  === "none"){
      document.getElementById('fileDownload').style.display = "block"
    }else if(document.getElementById('fileDownload').style.display === "block"){
      document.getElementById('fileDownload').style.display = "none"
    }
    
      
  }

  function outsideClick(){
    document.addEventListener('mouseup', outsideClickFunc);
  }


  function outsideClickFunc(e){
    console.log(e.target);
    var container = document.getElementById('filterDiv');
      if (!container.contains(e.target)) {
          container.style.display = 'none';
          document.removeEventListener('mouseup', outsideClickFunc)
      }
  }

  function outsideClick(){
    document.addEventListener('mouseup', outsideClickFunc);
  }


  function ShowFilter(){
    return (
      <div id='popUpClick' onClick={ShowPopup}><FilterAltIcon/></div>
  )
  }

  function setFilteredParams(filterArr, val) {
    setShowFilter(true);
    // if (val === undefined) return undefined;
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n) => {
        return n !== val;
      });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  }



  function SelectColumnFilter({
    column: { filterValue = [], setFilter, preFilteredRows, id }
  }) {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

      return (
        
        <Fragment>

          <div id='filterDiv' className='filterDiv' style={{display: "none"}}>
            {options.map((option, i) => {
              return (
                <Fragment key={i}>
                  <div className="flex items-center">
                    <Checkbox
                      id={option}
                      value={option}
                      onChange={(e) => {
                        setFilter(setFilteredParams(filterValue, e.target.value));
                      }}
                    />
                    <label
                      htmlFor={option}
                      className="ml-1.5 font-medium text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                </Fragment>
              );
            })}
          </div>

        </Fragment>
      );
  }

  



  const data = React.useMemo(()=>
   fillData()
    ,
    []
  )

  const [buttonType, setButtonType] = useState(<ExcelFile element={<Button variant='contained'>Laadi alla</Button>}>
    <ExcelSheet data={data} name="Sõnatabel">
        <ExcelColumn label="Sõnaliik ja vorm" value="col1"/>
        <ExcelColumn label="Sõnad tekstis" value="col2"/>
        <ExcelColumn label="Sagedus" value="col3"/>
        <ExcelColumn label="Osakaal (%)" value="col4"/>
    </ExcelSheet>
</ExcelFile>);

  function ShowButton(){
    if(fileType){
      setButtonType(<Button className='CSVBtn' variant='contained' color='primary' >
   
        <CSVLink className='csvLink' headers={tableHeaders} data={data}>Laadi alla</CSVLink>
        
    
      </Button>)
    setFileType(false)
    console.log(fileType);
      }else if(!fileType){
        
      setButtonType(<ExcelFile element={<Button variant='contained'>Laadi alla</Button>}>
        <ExcelSheet data={data} name="Sõnatabel">
            <ExcelColumn label="Sõnaliik ja vorm" value="col1"/>
            <ExcelColumn label="Sõnad tekstis" value="col2"/>
            <ExcelColumn label="Sagedus" value="col3"/>
            <ExcelColumn label="Osakaal (%)" value="col4"/>
        </ExcelSheet>
    </ExcelFile>)
      setFileType(true)
      console.log(fileType);
        
      }
    }

  const columns = React.useMemo(
    () => [
      {
        Header: "Sõnaliik ja vorm",
        accessor: 'col1', // accessor is the "key" in the data
        className: 'user',
        width: 300,
        disableSortBy: true,
        sortable: false,
    
        
        Filter: SelectColumnFilter,
        filter: MultipleFilter

      },
      {
        className: "filter-tab",
        Header: <ShowFilter />,
        accessor: 'filterTab',
        width: 200,
        disableFilters: true,
        disableSortBy: true,
      },

      {
        Header: 'Sõnad tekstis',
        accessor: 'col2',
        width: 1100,
        disableFilters: true,
        disableSortBy: true,
        sortable: false,
      },
      {
        Header: 'Sagedus',
        accessor: 'col3', // accessor is the "key" in the data
        width: 400,
        disableFilters: true,
      },
      {
        Header: 'Osakaal (%)',
        accessor: 'col4',
        width: 400,
        disableFilters: true,
      }
    ],
    []
  );

  const tableHeaders = [
    {label: "Sõnaliik ja vorm", key: "col1"},
    {label: 'Sõnad tekstis', key: "col2"},
    {label: 'Sagedus', key: "col3"},
    {label: 'Osakaal (%)', key: "col4"},
  ]

  function toggleDownload(){
    fileType = document.getElementById("simple-select");
    console.log(fileType)
  }

  function closeDownload(){
      if(document.getElementById('fileDownload').style.display === "block"){
      document.getElementById('fileDownload').style.display = "none"
    }
  }

  const [valueSelect, setValue] = useState("Excel");
  

  const handleClick = e => ShowButton();


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useFilters, useSortBy, usePagination)

  return (
    <Fragment>
       <Tooltip title="Laadi alla" placement="top">
          <div className='downloadPopUp' onClick={ShowDownload}>
            <DownloadIcon fontSize="large"/>
          </div>
          </Tooltip>
      

      <div id='peidusDiv' className='peidusDiv'>
    <div id='fileDownload' className='fileDownload' style={{display: "none"}}>
      <div id='closeIcon' className='closeIcon' onClick={closeDownload}><CloseIcon/></div>
    
    <FormControl id="formId" fullWidth>
        
        <InputLabel id="demo-simple-select-label">Laadi alla</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="simple-select"
          label="Laadimine"
          onChange={handleClick}
          size="medium"
          className='selectElement'
        >
          <MenuItem value="Excel">Excel</MenuItem>
          <MenuItem value="CSV">CSV</MenuItem>
        </Select>
        
      </FormControl>

    <div className='laadiBtn'>{buttonType}</div>
    </div>
    </div>

      <table {...getTableProps()} className="text-sm">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
      <table {...getTableProps()} style={{ marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '80%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps({title: ""}))}
                  style={{
                    borderBottom: 'solid 1px',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                  <span className='sortIcon'>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ' ▼▲'}

                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',

                        width: cell.column.width,
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div className='buttongroup'>
        <ButtonGroup size='medium' fullWidth variant="contained" aria-label="outlined primary button group">
        <Button variant='contained' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {<FirstPageIcon/>}
        </Button>{' '}
        <Button variant='contained' onClick={() => previousPage()} disabled={!canPreviousPage}>
          {<NavigateBeforeIcon/>}
        </Button>{' '}
        <Button variant='contained' onClick={() => nextPage()} disabled={!canNextPage}>
          {<NavigateNextIcon/>}
        </Button>{' '}
        <Button variant='contained' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {<LastPageIcon/>}
        </Button>{' '}
        </ButtonGroup>
        </div>
        <span className='fontStyle'>
          Leht{' '}
          <strong>
            {pageIndex + 1} / {pageOptions.length}
          </strong>{' '}
        </span>
        <TextField
          size='small'
          id="outlined-number"
          label="Mine lehele nr:"
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          size='small'
          value={pageSize}
          variant='outlined'
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
            <MenuItem key={pageSize} value={pageSize}>{pageSize}</MenuItem>

          ))}
        </Select>
      </div>
      
    </Fragment>
  )
}

export default Analyysvahekaart;

