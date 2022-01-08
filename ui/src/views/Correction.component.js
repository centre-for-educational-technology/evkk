import React, {Component} from 'react';

class Correction extends Component {
  constructor(props){
    super(props);
    this.state={alasisu:"Juku tuli kohlist koju", tasemevastus:["", ""], 
      vastuskood:"", vastusnahtav: false, muutuskood:""};
    this.alaMuutus=this.alaMuutus.bind(this);
    this.ala1=React.createRef();
    this.kysi3=this.kysi3.bind(this);
    setInterval(this.kysi3, 3000);
  }
  alaMuutus(event){
//    this.setState({alasisu: event.target.value}, this.kysi3);
    this.setState({alasisu: event.target.value});
    //this.kysi3();

  }

  margi(algus, sisu){
    console.log(algus, sisu);
     this.ala1.focus();
     //this.ala1.setSelectionRange(algus, pikkus);
     //this.ala1.setSelectionRange(12, 1);
     let koht=this.state.alasisu.indexOf(sisu, (algus>10?algus-10:algus));
     console.log(koht);
     if(koht==-1){
       koht=this.state.alasisu.indexOf(sisu);
     }
     this.ala1.selectionStart=koht;
     this.ala1.selectionEnd=koht+sisu.length;
}

  kysi3= () => {
   if(this.state.alasisu===this.state.tasemevastus[1]){
       console.log("juba olemas", this.state.alasisu);
       return;
   }
   let obj=new Object();
   obj["tekst"]=this.state.alasisu;
   fetch("/api/texts/korrektuur", {method:"POST",
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }  ,
   body: JSON.stringify(obj)}).then(v => v.json()).then(t=>{
     console.log(t);
     this.setState({"tasemevastus": t});
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
     this.setState({"muutuskood": <div>{muutused}</div>})
     this.setState({"vastuskood": <div>{vastustekst}</div>})

   })
  }

  render() {
    return (
      <div className={'container'}>
        <h2  onClick={this.kysi3}>Korrektuur</h2>
        <p/>
        <div style={{'float':'left', 'margin':'10px'}}><textarea ref={(e) => this.ala1=e} onChange={(event) =>this.alaMuutus(event)} rows="15" cols="60" value={this.state.alasisu} /></div>
           <div style={{'float':'left', 'margin':'10px', 'width': '40%'}}>{this.state.muutuskood}<br />
             <button  onClick={() =>this.setState((state, props) => {return {vastusnahtav: !state.vastusnahtav}})}> {this.state.vastusnahtav?"Peida tekst":"Näita tekst"} </button>{ this.state.vastusnahtav && <span>{this.state.tasemevastus?this.state.vastuskood:"algus"}</span>}</div>
 
         
      </div>
    );
  }

}

export default Correction;