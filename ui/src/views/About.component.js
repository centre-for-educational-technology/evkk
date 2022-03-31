import React, {Component} from 'react';

class About extends Component {

  render() {
    return (
      <div className={'container'}>
        <h2>Mis on <abbr title="eesti vahekeele korpus">EVKK</abbr>?</h2>
        <p/>
        <p>
          Tallinna Ülikooli eesti vahekeele ehk õppijakeele korpus on eesti keele kui teise keele ja võõrkeele õppijate kirjalike tekstide kogu.
        </p>
        <p>
          EVKK-s on rida alamkorpusi, kasutajaliides, märgendussüsteem, veaklassifikatsioon, statistikamoodul, tekstide automaatanalüüsi võimalused
          jm. Kombineerides erinevaid alamkorpusi, tekstitunnuseid, vealiike ja teavet õppija kohta, võimaldab korpuse kasutajaliides teha
          mitmekülgset otsingut. Korpust saab kasutada empiirilises ja rakenduslikku laadi uurimistöös, õpetajate koolitamisel ja eesti keele õppes. 
          Korpus täieneb pidevalt uute tekstidega.
        </p>
        <p>
          Osa kasutusvõimalusi on hetkel kättesaadavad EVKK vanas versioonis.
        </p>
        <p>
          EVKK-ga seotud keeleõppe- ja keeleuurimiskeskkonna ELLE (Estonian Language Learning, Teaching ja Research Environment) kohta vaata infot&nbsp;
            <a href="https://github.com/centre-for-educational-technology/evkk/wiki">siit</a>.
        </p>
      </div>
    );
  }

}

export default About;
