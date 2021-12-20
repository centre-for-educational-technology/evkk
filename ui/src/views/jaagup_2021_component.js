import React, {Component} from 'react';


class Kysija1 extends Component{
    constructor(props){
       super(props);
       this.state={alasisu:"Juku tuli kooli", 
         tasemevastus:[],
         taselisa:false};
       //this.kysi.bind(this);
       this.alaMuutus=this.alaMuutus.bind(this);
    }
    alaMuutus(event){
      this.setState({alasisu: event.target.value});
    }
    kysi3= () => {
      let obj=new Object();
      obj["tekst"]=this.state.alasisu;
      fetch("/api/texts/keeletase", {method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)}).then(v => v.json()).then(t=>{
        console.log(t);
         this.setState({"tasemevastus": t});
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
    render(){
      return <div>
        <div style={{float:'left', margin:'20px'}}>
        <textarea onChange={this.alaMuutus} rows="15" cols="60" value={this.state.alasisu} /><br />
       
        <button onClick={this.kysi3}>Hinda keeletaset</button>
        </div>
        {this.state.tasemevastus.length>0 && <div style={{float: 'left', width:'40%'}}>
            <h1>{this.state.tasemevastus[0][1]}  {(this.state.tasemevastus[0][0]*100).toFixed(0)}%</h1>
            Muude tasemete tõenäosus: <br />
            <ul>
            {this.state.tasemevastus.slice(1, 4).map((vastus) =>
              <li key={vastus[1]}>{vastus[1]+" - "+(vastus[0]*100).toFixed(0)}%</li>
            )}
          </ul>

            {this.renderTasemed()}
          </div>}
      </div>
    }
}


class Jaagup_2021 extends Component {

  render() {
    return (
        <div>
           <h3>Keeletaseme hindaja</h3>
            <Kysija1 />
        </div>
    );
  }

}
export default Jaagup_2021;