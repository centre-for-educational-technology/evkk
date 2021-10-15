import React, {Component} from 'react';

class Resource extends Component {

  render() {
    return (
      <div className={'container'}>
        <h2>EVKK ALAMKORPUSED</h2>
        <p/>
        <ul>

          <li>
            <b>K2 olümpiaadi tööd</b> <br/>
            Sisaldab eri emakeelega õpilaste eesti keele olümpiaadi esseid <br/>
            Tekste: 65
          </li>

          <li>
            <b> K2 tasemeeksamite tekstid</b> <br/>
            Sisaldab riiklikke eksami- ja tasemetöid <br/>
            Tekste: 8093
          </li>

          <li>
            <b> K2 tuumkorpus</b> <br/>
            Sisaldab eksamiväliselt kirjutatud A2-, B1-, B2- ja C1-taseme tekste, mille tase on määratud
            kolme tunnustatud hindamise spetsialisti ühise arvamuse põhjal <br/>
            Tekste: 3440
          </li>

          <li>
            <b> K1 eesti keel</b> <br/>
            Võrdluskorpus, sisaldab emakeelekõnelejate arvamuslugusid ajalehtedest <br/>
            Tekste: 185
          </li>

          <li>
            <b> K1 vene keel</b> <br/>
            Sisaldab põhikooli ja gümnaasiumi vene emakeelega õpilaste loomingulist laadi tekste <br/>
            Tekste: 373
          </li>

          <li>
            <b> K3 vene keel</b> <br/>
            Sisaldab tekste eesti emakeelega õpilastelt, kes õpivad koolis vene keelt kolmanda keelena <br/>
            Tekste: 279
          </li>

          <li>
            <b> Akadeemiline õppijakeel</b> <br/>
            Sisaldab emakeelekõneleja ja eesti keelt teise keelena kasutava üliõpilase akadeemilise
            keelekasutuse näiteid (referaadid, seminaritööd, lõputööd jm) <br/>
            Tekste: 28
          </li>

        </ul>
      </div>
    );
  }

}

export default Resource;
