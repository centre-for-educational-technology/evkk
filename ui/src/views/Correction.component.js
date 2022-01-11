import React, {Component} from 'react';

class Correction extends Component {
  constructor(props){
    super(props);
    this.state={alasisu:"Juku tuli kohlist koju", tasemevastus:["", ""], 
      tasemetekst:"",
      korrektorivastus:["", ""],
      vastuskood:"", vastusnahtav: false, muutuskood:"", 
      taselisa:false, avatudkaart:"korrektuur"};
    this.alaMuutus=this.alaMuutus.bind(this);
    this.ala1=React.createRef();
    this.kysi3=this.kysi3.bind(this);
    this.korda=this.korda.bind(this);
    setInterval(this.korda, 3000);
  }

  korda(){
    if(this.state.avatudkaart==="korrektuur"){this.kysi3();}
    if(this.state.avatudkaart==="hindamine"){this.kysi4();}
  }

  alaMuutus(event){
//    this.setState({alasisu: event.target.value}, this.kysi3);
    this.setState({alasisu: event.target.value});
    //this.kysi3();

  }

  margi(algus, sisu){
    //console.log(algus, sisu);
     this.ala1.focus();
     //this.ala1.setSelectionRange(algus, pikkus);
     //this.ala1.setSelectionRange(12, 1);
     let koht=this.state.alasisu.indexOf(sisu, (algus>10?algus-10:algus));
    // console.log(koht);
     if(koht===-1){
       koht=this.state.alasisu.indexOf(sisu);
     }
     this.ala1.selectionStart=koht;
     this.ala1.selectionEnd=koht+sisu.length;
}

kysi4= () => {
  if(this.state.alasisu===this.state.tasemetekst){
   // console.log("juba tase ", this.state.alasisu);
    return;
  }

  let obj={}; //new Object();
  obj["tekst"]=this.state.alasisu;
  this.setState({tasemetekst: this.state.alasisu});
  fetch("/api/texts/keeletase", {method:"POST",
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(obj)}).then(v => v.json()).then(t=>{
   // console.log(t);
     this.setState({"tasemevastus": t});
  })
}


  korrektuuriVajutus= () =>{
    this.setState({avatudkaart:"korrektuur"})
     this.kysi3();
  }

  hindajaVajutus=()=>{
    this.setState({avatudkaart:"hindamine"})
    this.kysi4();
  }

  kysi3= () => {
   if(this.state.alasisu===this.state.korrektorivastus[1]){
       //console.log("juba olemas", this.state.alasisu);
       return;
   }
   let obj={}; //new Object();
   obj["tekst"]=this.state.alasisu;
   fetch("/api/texts/korrektuur", {method:"POST",
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify(obj)}).then(v => v.json()).then(t=>{
    // console.log(t);
     this.setState({"korrektorivastus": t});
     let sm=t[1].split(" ");
     let vm=t[0].split(" ");
     let vastustekst=[];
     let sisutekst="";
     let muutused=[];
     for(let i=0; i<vm.length; i++){
         if(sm[i]===vm[i]){
             vastustekst[i]=<span key={"s"+i}>{vm[i]+" "}</span>;
         } else {
             const algus=sisutekst.length;
             const sisu=sm[i];     
             muutused[i]=<span key={"sm"+i}>
                <span onClick={() =>this.margi(algus, sisu)} style={{'backgroundColor': 'lightpink'}}>{sm[i]}</span> - <span>{vm[i]}</span><br />
             </span>        
             vastustekst[i]=<span  key={"s"+i}><span title={sm[i]}
             onClick={() =>this.margi(algus, sisu)} style={{'backgroundColor': 'lightgray'}}>{vm[i]}</span><span> </span></span>;
         }
         sisutekst+=sm[i]+" ";
     }
     this.setState({"muutuskood": <div>{muutused.length>0 ? muutused : "parandused puuduvad"}</div>})
     this.setState({"vastuskood": <div>{vastustekst}</div>})

   })
  }

  renderTasemed=() =>{
    if(this.state.taselisa){
      return <div onClick={() => this.setState({taselisa: false})}>
        <p><b>Teksti üldine keerukus: <br /> {this.state.tasemevastus[4][1]} </b> 
        (tõenäosus {(this.state.tasemevastus[4][0]*100).toFixed(0)}
      %)<br />Arvesse on võetud teksti, sõnade ja lausete pikkus.</p>
      <p><b>Morfoloogia ehk vormikasutus: <br />{this.state.tasemevastus[8][1]} </b> 
      (tõenäosus {(this.state.tasemevastus[8][0]*100).toFixed(0)}%)<br />Arvesse on võetud sõnaliikide ja muutevormide osakaalud ning sõnade vormirohkus.)</p>

      <p><b>Sõnavara: <br />{this.state.tasemevastus[12][1]} </b> 
      {this.state.tasemevastus[12][0]>0 && <span>(tõenäosus {(this.state.tasemevastus[12][0]*100).toFixed(0)} %)<br /></span>}
     
      Arvesse on võetud sõnavaliku mitmekesisus ja ulatus (unikaalsete sõnade hulk, harvem esineva sõnavara osakaal), sõnavara tihedus (sisusõnade osakaal) ja nimisõnade abstraktsus.</p>
    
      </div>
    }
    return <div onClick={() => this.setState({taselisa: true})}>Loe täpsemalt ...</div>
  }

  renderTase(){
    return <span>{this.state.tasemevastus.length>0 ? <div style={{float: 'left', width:'40%'}}>
    <h1>{this.state.tasemevastus[0][1]}  {(this.state.tasemevastus[0][0]*100).toFixed(0)}%</h1>
    Muude tasemete tõenäosus: <br />
    <ul>
    {this.state.tasemevastus.slice(1, 4).map((vastus) =>
      <li key={vastus[1]}>{vastus[1]+" - "+(vastus[0]*100).toFixed(0)}%</li>
    )}
  </ul>

    {this.renderTasemed()}
  </div>: <div>Tekst liiga lühike</div>}</span>
  }

  render() {
    return (
      <div className={'container'}>
        
        <p/>
        <div style={{'float':'left', 'margin':'10px'}}><textarea ref={(e) => this.ala1=e} onChange={(event) =>this.alaMuutus(event)} rows="15" cols="60" value={this.state.alasisu} /></div>
           <div style={{'float':'left', 'margin':'10px', 'width': '40%'}}>
           <span  onClick={() => this.korrektuuriVajutus()}
           style={this.state.avatudkaart==="korrektuur" ? {fontWeight: "bold"}: {}}>Korrektuur</span>
           {this.state.alasisu!==this.state.korrektorivastus[1] && <span>...</span>}
        &nbsp; <span  onClick={() => this.hindajaVajutus()} 
           style={this.state.avatudkaart==="hindamine" ? {fontWeight: "bold"}: {}}>Hindaja</span>
           {this.state.alasisu!==this.state.tasemetekst && <span>...</span>}
<br />             
         {this.state.avatudkaart==="korrektuur" && <span>
             {this.state.muutuskood}<br />
             <button  onClick={() =>this.setState((state, props) => {return {vastusnahtav: !state.vastusnahtav}})}> {this.state.vastusnahtav?"Peida tekst":"Näita teksti"} </button>{ this.state.vastusnahtav && <span>{this.state.tasemevastus?this.state.vastuskood:"algus"}</span>}
             </span>}
         {this.state.avatudkaart==="hindamine" && <span>{this.renderTase()}</span>}

             </div>
 

      </div>
    );
  }

}

export default Correction;