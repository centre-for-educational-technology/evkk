import React, {Component} from 'react';


class Kysija1 extends Component{
    constructor(props){
       super(props);
       this.state={tekst1:"uuu"};
       //this.kysi.bind(this);
    }
    kysi= () => {
      fetch("/robots.txt").then(v => v.text()).then(t=>{
        console.log(t);
         this.setState({"tekst1": t});
      })
    }
    kysi2= () => {
      fetch("/api/texts/lemmad", {method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:'{"tekst":"Juku tuli kooli!"}'}).then(v => v.text()).then(t=>{
        console.log(t);
         this.setState({"tekst1": t});
      })
    }
    kysi3= () => {
      fetch("/api/texts/keeletase", {method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:'{"tekst":"Juku tuli kooli!"}'}).then(v => v.text()).then(t=>{
        console.log(t);
         this.setState({"tekst1": t});
      })
    }
    render(){
      return <span>abc {this.props.teade} {this.state.tekst1}
        <button onClick={this.kysi}>Vajuta</button>
        <button onClick={this.kysi2}>Vajuta2</button>
        <button onClick={this.kysi3}>Vajuta3</button>
      </span>
    }
}


class Jaagup_2021 extends Component {

  render() {
    return (
        <div>
          Hello World Jaagup!
           <Kysija1 teade="kuku" />
        </div>
    );
  }

}
export default Jaagup_2021;