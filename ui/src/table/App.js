import React from "react";
import Table /*, {MultipleFilter, SelectColumnFilter}*/ from "./Table";
import "./index.css";
import { dataList } from "./Data";

// const sonaliik = dataList[0].wordtypes;
const lemmad = dataList[0].lemmas;
const sonad = dataList[0].words;

let sonaList = new Map();
let numbrid = new Map();

const sonuKasutuses = () => {

  for (let i = 0; i < sonad.length; i++) {

    if(!sonaList.has(lemmad[i])){
      sonaList.set(lemmad[i],[]);
      sonaList.get(lemmad[i]).push(sonad[i]);
      numbrid.set(sonad[i], 1);
    }else if(sonaList.has(lemmad[i])){

      if(sonaList.get(lemmad[i]).includes(sonad[i])){
        
        numbrid.set(sonad[i],(numbrid.get(sonad[i]) + 1)) ;
      }else{
        sonaList.get(lemmad[i]).push(sonad[i]);
        numbrid.set(sonad[i], 1);
      }
    }
  }
}

sonuKasutuses();
// let max = 0;
// let nums = [];
// let wrds = [];
// for(let i = 0; i<sonaList.size; i++){
//   if(sonaList.get(Array.from(sonaList.keys())[i]).length>1){
//     sonaList.get(Array.from(sonaList.keys())[i]).sort();
//     for(let j=0; j<sonaList.get(Array.from(sonaList.keys())[i]).length; j++){
//       wrds.push(sonaList.get(Array.from(sonaList.keys())[i])[j]);
//       nums.push(numbrid.get(sonaList.get(Array.from(sonaList.keys())[i])[j]));
//       if(numbrid.get(sonaList.get(Array.from(sonaList.keys())[i])[j])>max){
//         max = numbrid.get(sonaList.get(Array.from(sonaList.keys())[i])[j]);
//         let index = nums.indexOf(max);
//         wrds.splice(index, 1);
//         wrds.unshift(sonaList.get(Array.from(sonaList.keys())[i])[j]);
//       }

//       if(sonaList.get(Array.from(sonaList.keys())[i])!==wrds && sonaList.get(Array.from(sonaList.keys())[i]).length === wrds.length){
//         sonaList.set(Array.from(sonaList.keys())[i], wrds)      
//       }
//     }  
//   }
//   wrds = [];
//   nums.splice(0, nums.length); 
//   max=0;
// }
console.log(sonaList)
console.log(numbrid)

const mapSort3 = new Map([...numbrid.entries()].sort());

const mapSort2 = new Map([...mapSort3.entries()].sort((a, b) => b[1] - a[1]));

function fillData(){

  let tableVal = [];

  for (let i = 0; i < sonaList.size; i++) {
    const iterator1 = mapSort2.keys();

    let info = {
      col1: "",
      col2: [[],[]],
      col3: 0,
      col4: 0
    }
    
    info.col1 = <span>{Array.from(sonaList.keys())[i]}</span>;
    const ajutineList = sonaList.get(Array.from(sonaList.keys())[i]);

    for (let j = 0; j < mapSort2.size; j++) {
      let valueAjutine = iterator1.next().value;
      if(ajutineList.includes(valueAjutine)){
        info.col2[0].push(String(valueAjutine))
        info.col2[1].push("(" + numbrid.get(valueAjutine) + "), ")
        info.col3 = parseInt(info.col3) + parseInt(numbrid.get(String(valueAjutine)))
      }
      
    }

    info.col2[1][info.col2[1].length - 1] = info.col2[1][info.col2[1].length - 1].slice(0, -2)
    info.col4 = (info.col3 * 100 / sonad.length).toFixed(2)
    tableVal.push(info);
  }

  // console.log(tableVal)
  
  // for( let k = 0; k < tableVal.length; k++) {
  //   tableVal[k].col2 = tableVal[k].col2.slice(0, -2);
  // }

  return tableVal;
}

fillData();

function App() {

    const columns = React.useMemo(() => [
        {
            Header: 'Algvorm',
            accessor: 'col1',
            disableSortBy: true, 
            sortable: false,
        },
        {
            Header: 'Sõnavormid',
            accessor: 'col2',
            disableSortBy: true,
            sortable: false,
            Cell: (props) => {
              const items = props.value
    
              let cellContent = []
              for(let i=0; i<items[0].length; i++){
                  let word = items[0][i]
                  let count = items[1][i]
                  let content = (
                    <>
                    <span className="word" /* onClick={(e) => onWordSelect(e.target.textContent)}*/>{word}</span>{String.fromCharCode(160)}{count}
                    </>
    
                  )
                  cellContent.push(content)
              }
              return cellContent
            }
        },
        // {
        //     Header: 'Sõnaliik',
        //     accessor: 'col5',
        //     Filter: SelectColumnFilter,
        //     filter: MultipleFilter,
        //     disableSortBy: true,
        //     sortable: false,
        // },
        {
            Header: 'Sagedus ↕',
            accessor: 'col3',
        },
        {
            Header: 'Osakaal (%) ↕',
            accessor: 'col4',
        },
    ],
    []
    );

    const data = React.useMemo(()=> fillData(), []);

    return (
        <>
        <div> 
            <Table columns={columns} data={data} />
        </div>
        </>
    );
}

export default App;