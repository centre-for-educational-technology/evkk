import React, {Component} from 'react';

class Correction extends Component {
  constructor(props){
    super(props);
    this.state={alasisu:"", tasemevastus:["algusväärtus"], 
      tasemetekst:"",
      korrektorivastus:["", ""],
      vastuskood:"", vastusnahtav: false, muutuskood:"", 
      taselisa:false, avatudkaart:"korrektuur", kordab: false};
    this.alaMuutus=this.alaMuutus.bind(this);
    this.ala1=React.createRef();
    this.kysi3=this.kysi3.bind(this);
    this.korda=this.korda.bind(this);
  }

  kordama(){
    this.setState({kordab: true});
    this.korda();
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

  asenda(algus, sisu, vahetus){
    this.margi(algus, sisu);
    let uus=this.state.alasisu.substring(0, this.ala1.selectionStart)+vahetus+
      this.state.alasisu.substring(this.ala1.selectionEnd);
    this.setState({alasisu: uus});
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
     let charsPerRow = this.ala1.cols;
     let selectionRow = (this.ala1.selectionStart - (this.ala1.selectionStart % charsPerRow)) / charsPerRow;
     let lineHeight = this.ala1.clientHeight / this.ala1.rows;
     this.ala1.scrollTop = lineHeight * selectionRow-30;
// scroll !!
}

kysi4= () => {
  if(this.state.alasisu===this.state.tasemetekst){
   // console.log("juba tase ", this.state.alasisu);
    return;
  }

  let obj={}; //new Object();
  obj["tekst"]=this.state.alasisu;
  const asisu=this.state.alasisu;
//  this.setState({tasemetekst: this.state.alasisu});
  fetch("/api/texts/keeletase", {method:"POST",
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(obj)}).then(v => v.json()).then(t=>{
   // console.log(t);
     this.setState({"tasemevastus": t});
    this.setState({tasemetekst: asisu});
})
}


  korrektuuriVajutus= () =>{
    this.setState({avatudkaart:"korrektuur"})
      if(this.state.kordab){this.kysi3();}
  }

  hindajaVajutus=()=>{
    this.setState({avatudkaart:"hindamine"})
    if(this.state.kordab){this.kysi4();}
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
                <span onClick={() =>this.margi(algus, sisu)} style={{'backgroundColor': 'lightpink'}}>{sm[i]}</span> - <span>{vm[i]}</span> <button onClick={() =>this.asenda(algus, sisu, vm[i])}>asenda</button><br />
             </span>        
             vastustekst[i]=<span  key={"s"+i}><span title={vm[i]}
             onClick={() =>this.margi(algus, sisu)} style={{'backgroundColor': 'lightgray'}}>{sm[i]}</span><span> </span></span>;
         }
         sisutekst+=sm[i]+" ";
     }
     this.setState({"muutuskood": <div>{muutused.length>0 ? muutused : "Parandused puuduvad!"}</div>})
     this.setState({"vastuskood": <div>{vastustekst}<br /><br /><br /><br /><br /><br /></div>})

   })
  }

  renderTasemed=() =>{
    if(this.state.taselisa){
      return <div onClick={() => this.setState({taselisa: false})} style={{width: "100%"}}>
        Loe täpsemalt ↑
        <p style={{width: "100%"}}><b>Teksti üldine keerukus: <br /> {this.state.tasemevastus[4][1]} </b> 
        (tõenäosus {(this.state.tasemevastus[4][0]*100).toFixed(0)}
      %)<br />Arvesse on võetud teksti, sõnade ja lausete pikkus.</p>
      <p style={{width: "100%"}}><b>Morfoloogia ehk vormikasutus: <br />{this.state.tasemevastus[8][1]} </b> 
      (tõenäosus {(this.state.tasemevastus[8][0]*100).toFixed(0)}%)<br />Arvesse on võetud sõnaliikide ja muutevormide osakaalud ning sõnade vormirohkus.)</p>

      <p style={{width: "100%"}}><b>Sõnavara: <br />{this.state.tasemevastus[12][1]} </b> 
      {this.state.tasemevastus[12][0]>0 && <span>(tõenäosus {(this.state.tasemevastus[12][0]*100).toFixed(0)} %)<br /></span>}
     
      Arvesse on võetud sõnavaliku mitmekesisus ja ulatus (unikaalsete sõnade hulk, harvem esineva sõnavara osakaal), sõnavara tihedus (sisusõnade osakaal) ja nimisõnade abstraktsus.</p>
      <br />    
      <br />    
      <br />    
      </div>
    }
    return <div onClick={() => this.setState({taselisa: true})}>Loe täpsemalt ...</div>
  }

  ketas(){
    return <div 
    style={{borderStyle:"solid", borderRadius:"50%", width: "10px", height: "10px", 
      borderTopColor:"transparent", animation: "spin .8s linear infinite",
        float:"left", content:"  "}}></div>
  }

  renderTase(){
    return <span>{this.state.kordab ? <span>{this.state.alasisu.length>0 ? 
     (this.state.tasemevastus.length>0 ? 
      (this.state.tasemevastus.length===1 ? "" :<div style={{float: 'left', width:'95%'}}>
    <h1>{this.state.tasemevastus[0][1]}  {(this.state.tasemevastus[0][0]*100).toFixed(0)}%</h1>
    Muude tasemete tõenäosus: <br />
    <ul>
    {this.state.tasemevastus.slice(1, 4).map((vastus) =>
      <li key={vastus[1]}>{vastus[1]+" - "+(vastus[0]*100).toFixed(0)}%</li>
    )}
  </ul>

    {this.renderTasemed()}
  </div>): <div>Tekst liiga lühike</div>) : ""}</span> : "Tekst on liiga lühike" }</span>
  }



  render() {
    let sisestusk={
      position: "relative",
      top: 0,
      left: 0
    }
    return (
      <div className={'container'}>
        
        <p/>
        <div style={{'float':'left', 'margin':'10px', 'width': '45%'}}>
          <div style={sisestusk}>proovikiht</div>
          <textarea style={sisestusk} ref={(e) => this.ala1=e} onChange={(event) =>this.alaMuutus(event)} rows="15" cols="60" value={this.state.alasisu}  spellCheck={false}
          placeholder={"Kopeeri või kirjuta siia analüüsitav tekst"}/><br />
    
          <br />
          <div style={{width:"300px"}}>Rakenduse abil saad parandada oma teksti õigekirja ja vaadata, 
          mis keeleoskustasemele see vastab (A2–C1). 
          Loe lähemalt  <a href={"https://github.com/centre-for-educational-technology/evkk/wiki/Demos"}>siit</a>.</div>
          </div>
           <div style={{'float':'left', 'margin':'10px', 'width': '50%'}}>
           <style>{`
             @keyframes spin{
                  from {transform:rotate(0deg);}
                  to {transform:rotate(360deg);}
                  }
                  `}
           </style>
           <nav className="navbar navbar-expand-sm bg-light" >
<ul className={"nav nav-tabs nav-justified"} style={{width: "100%"}}>
<li className={"nav-item nav-link"}  
      onClick={() => this.korrektuuriVajutus()}
      style={this.state.avatudkaart==="korrektuur" ? {fontWeight: "bold"}: {}}
      >Eksimused</li>
  <li className={"nav-item nav-link"}  
      onClick={() => this.hindajaVajutus()}
      style={this.state.avatudkaart==="hindamine" ? {fontWeight: "bold"}: {}}
      >Tasemehinnang</li>
</ul>
</nav>

{!this.state.kordab && 
 <div><br /> <br /><br /> <br />
 <div style={{width: "100%",  textAlign: "center"}}><button onClick={() => this.kordama()}>Analüüsi</button></div>
 </div>
}             

<br />
<br />
         {this.state.avatudkaart==="korrektuur" && <span>
             {this.state.kordab && this.state.alasisu!==this.state.korrektorivastus[1] && this.ketas()}<br />
             {this.state.muutuskood}<br />
              { (this.state.alasisu.length>0  )? <span>{ (this.state.kordab) && 
                <button  onClick={() =>this.setState((state, props) => {return {vastusnahtav: !state.vastusnahtav}})}> {this.state.vastusnahtav?"Peida tekst":"Näita teksti"} </button>
                }</span> : ""}
            { this.state.vastusnahtav && <span>{this.state.tasemevastus?this.state.vastuskood:"algus"}</span>}
             </span>}


         {this.state.avatudkaart==="hindamine" && this.state.kordab && <div>
           {  (this.state.alasisu!==this.state.tasemetekst) ? this.ketas() :""} <br />
           <span>{this.renderTase()}</span></div>}

             </div>
 

      </div>
    );
  }

}

export default Correction;