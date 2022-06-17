import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { useSortBy, useFilters, useTable, usePagination	} from 'react-table';
import { Button, Checkbox, ButtonGroup, Select, MenuItem, TextField, FormControl, InputLabel, Tooltip } from "@mui/material";
import './styles/GrammaticalAnalysis.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Close from '@mui/icons-material/Close';
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import ReactExport from "react-export-excel";
import CloseIcon from '@mui/icons-material/Close';





 function GrammaticalAnalysis({onTypeSelect, onWordSelect, onAnalyse}) {
  

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  
  const[fileType, setFileType] = useState(true);
  const [sonaliik, setSonaliik] = useState('')
  const [sonad, setSonad] = useState('')

  console.log(sonaliik)
  console.log(sonad)

  useEffect(() => {
    setSonaliik(onAnalyse.wordtypes)
    setSonad(onAnalyse.words)
  }, [onAnalyse]);

 

  const text = "Tallinna suurimas linnaosas Lasnamäel on alles vaid kaks eesti õppekeelega gümnaasiumi Laagna ja Kuristiku kus mõlemas peaaegu tuhat õpilast Parajasti on vahetund aga kui vähemaks jääb on Laagna gümnaasiumi juhtkond direktori asetäitjad õppe ja kasvatustöö alal ning direktor lahkelt nõus jagama rõõme ja muresid mis eri rahvuste koos õppimisega kaasas käivad"

  let sonaList = new Map();
  let numbrid = new Map();
  let result = true;
  let tableVal = [];





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

  const mapSort3 = new Map([...numbrid.entries()].sort());


  const mapSort2 = new Map([...mapSort3.entries()].sort((a, b) => b[1] - a[1]));


  const iterator1 = mapSort2.keys();

  console.log(mapSort2.size)





  


  function fillData(){



      // console.log(Array.from(sonaList.keys())[0])
      for (let i = 0; i < sonaList.size; i++) {
        const iterator1 = mapSort2.keys();

        let info = {
          col1: "",
          colvorm: 1,
          col2: [[],[]],
          col3: 0,
          col4: 0
        }
  
        
        
        info.col1 = Array.from(sonaList.keys())[i];


        const ajutineList = sonaList.get(Array.from(sonaList.keys())[i]);

        console.log(ajutineList)

  
        for (let j = 0; j < mapSort2.size; j++) {
          
          let valueAjutine = iterator1.next().value;
          console.log(valueAjutine)
          if(ajutineList.includes(valueAjutine))
          {
            info.col2[0].push(String(valueAjutine))
            info.col2[1].push("(" + numbrid.get(valueAjutine) + "), ")
            // info.col2 = String(info.col2 + String(valueAjutine) + String.fromCharCode(160) + "(" + numbrid.get(valueAjutine) + "), ");
            
            info.col3 = parseInt(info.col3) + parseInt(numbrid.get(String(valueAjutine)))
          }
  
    
  
        }
        // info.col2 = info.col2.slice(0,-2)
        info.col2[1][info.col2[1].length - 1] = info.col2[1][info.col2[1].length - 1].slice(0, -2)
        info.col4 = (sonaList.get(Array.from(sonaList.keys())[i]).length * 100 / sonad.length).toFixed(1);
        console.log(info)
        tableVal.push(info);
  
      }
      
      console.log(tableVal)
      return tableVal;

  }



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

  const MultipleFilter2 = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      console.log(val);
      if (filterValue.includes(val.original.colvorm)) arr.push(val);
      console.log(filterValue);
      console.log(val.original.culvorm);
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

  function ShowPopup2(){
    if(document.getElementById('filterDiv2').style.display  === "none"){
      document.getElementById('filterDiv2').style.display = "block"
    }else if(document.getElementById('filterDiv2').style.display === "block"){
      document.getElementById('filterDiv2').style.display = "none"
    }
    outsideClick2();
      
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

  function outsideClick2(){
    document.addEventListener('mouseup', outsideClickFunc2);
  }


  function outsideClickFunc(e){
    console.log(e.target);
    var container = document.getElementById('filterDiv');
      if (!container.contains(e.target)) {
          container.style.display = 'none';
          document.removeEventListener('mouseup', outsideClickFunc)
      }
  }

  function outsideClickFunc2(e){
    console.log(e.target);
    var container = document.getElementById('filterDiv2');
      if (!container.contains(e.target)) {
          container.style.display = 'none';
          document.removeEventListener('mouseup', outsideClickFunc2)
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

  function ShowFilter2(){
    return (
      <div id='popUpClick' onClick={ShowPopup2}><FilterAltIcon/></div>
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
    }, [id, preFilteredRows, sonad, sonaliik]);

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

  function SelectColumnFilter2({
    column: { filterValue = [], setFilter, preFilteredRows, id }
  }) {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows, sonad, sonaliik]);

      return (
        
        <Fragment>

          <div id='filterDiv2' className='filterDiv' style={{display: "none"}}>
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
    [sonad, sonaliik]
  )





  const [buttonType, setButtonType] = useState(<ExcelFile element={<Button variant='contained'>Laadi alla</Button>}>
    <ExcelSheet data={data} name="Sõnatabel">
        <ExcelColumn label="Sõnaliik ja vorm" value="col1"/>
        <ExcelColumn label="Vormimärgendid" value="colvorm"/>
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
            <ExcelColumn label="Vormimärgendid" value="colvorm"/>
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
        Header: ()=>{return(<><span style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
      }}>Sõnaliik ja vorm <ShowFilter/></span></>)},
        accessor: 'col1', // accessor is the "key" in the data
        Cell: (props) => {
          const word= props.value
          return <span  className="word" onClick={(e) => onTypeSelect(e.target.textContent)}>{word}</span>
        },
        className: 'user',
        width: 400,
        disableSortBy: true,
        sortable: false,
    
        
        Filter: SelectColumnFilter,
        filter: MultipleFilter

      },
    

      {
        Header: ()=>{return(<><div style={{
          display: 'flex',
          alignItems: 'end',
          flexWrap: 'wrap',
      }}>Vormimärgendid <ShowFilter2/></div></>)},
        accessor: 'colvorm',
        width: 400,
        className: 'colvorm',
        
        disableSortBy: true,
        sortable: false,

        Filter: SelectColumnFilter2,
        filter: MultipleFilter2 
      },

      {
        Header: 'Sõnad tekstis',
        accessor: 'col2',
        Cell: (props) => {
          const items = props.value

          let cellContent = []
          for(let i=0; i<items[0].length; i++){
              let word = items[0][i]
              let count = items[1][i]
              let content = (
                <>
                <span  className="word" onClick={(e) => onWordSelect(e.target.textContent)}>{word}</span>{String.fromCharCode(160)}{count}
                </>

              )
              cellContent.push(content)
          }
          return cellContent
      },
        width: 700,
        disableFilters: true,
        disableSortBy: true,
        sortable: false,
      },
      {
        Header: 'Sagedus',
        accessor: 'col3', // accessor is the "key" in the data
        width: 300,
        disableFilters: true,
      },
      {
        Header: 'Osakaal (%)',
        accessor: 'col4',
        width: 300,
        disableFilters: true,
      }
    ],
    [sonad, sonaliik, onWordSelect]
  );

  const tableHeaders = [
    {label: "Sõnaliik ja vorm", key: "col1"},
    {label: 'Vormimärgendid', key: "colvorm"},
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
      <table {...getTableProps()} style={{ marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '100%' }}>
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
  );
}

export default GrammaticalAnalysis;

