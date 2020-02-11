import React, {Component} from 'react';

class About extends Component {

  render() {
    return (
      <div className={'container'}>
        <h2>Mis on <abbr title="eesti vahekeele korpus">EVKK</abbr></h2>
        <p/>
        <p>
          Tallinna Ülikooli eesti vahekeele korpus (EVKK) on eesti keele kui riigikeele (teise keele) ja võõrkeele õppijate kirjalike tekstide kogu.
        </p>
        <p>
          EVKK-s on rida alamkorpusi, kasutajaliides, mitmetasandiline annoteerimis- ja märgendussüsteem, statistikamoodul, tekstide automaatanalüüsi võimalused
          jm. Kombineerides erinevaid alamkorpusi, tekstilisi tunnuseid, vealiike ja metateavet õppija kohta, võimaldab korpuse kasutajaliides teostada
          mitmetasandilist otsingut. Korpust saab kasutada empiirilises ja rakenduslikku laadi uurimistöös; tulevaste õpetajate ja lingvistide koolitamisel;
          tegevõpetajate täiendõppes jm.
        </p>
      </div>
    );
  }

}

export default About;
