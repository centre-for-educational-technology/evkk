import React, {Component} from 'react';

class Correction extends Component {
  constructor(props){
    super(props);
    this.state={alasisu:"Juku tuli koolist koju", tasemevastus:null};
    this.alaMuutus=this.alaMuutus.bind(this);
  }
  alaMuutus(event){
    this.setState({alasisu: event.target.value});
    this.kysi3();
  }

  kysi3= () => {
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
   })
  }

  render() {
    return (
      <div className={'container'}>
        <h2>Korrektuur</h2>
        <p/>
        <div><textarea onChange={this.alaMuutus} rows="15" cols="60" value={this.state.alasisu} />
           <div>{this.state.tasemevastus?this.state.tasemevastus[0]:"algus"}</div>
           <button onClick={this.kysi3}>Korrektuur</button>
         </div>
      </div>
    );
  }

}

export default Correction;