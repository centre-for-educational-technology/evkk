import * as React from 'react';
import HomeCard from "../components/HomeCard";
import analyserImg from "../resources/images/home/sonaanalyys.png";
import correctorImg from "../resources/images/home/tekstihindaja.png";
import clusterfinderImg from "../resources/images/home/mustrileidja.png";

function Home() {
  return (
    <div style={{paddingBottom: "5%"}}>
      <h2 style={{textAlign: "center", marginLeft: "20%", width: "60%", marginBottom: "5%", paddingTop: "4%"}}>ELLE -
        keeleõppe ja
        -analüüsi keskkond õppijale, õpetajale ja teadlasele</h2>
      <HomeCard image={correctorImg}
                order={2}
                title={"Tekstihindajaga"}
                text={"saad lasta oma kirjutist hinnata. Vaata, mida arvab robot sinu teksti õigekirjast ja millisele keeleoskustasemele see vastab."}
                linkTo={"/corrector"}/>
      <HomeCard image={clusterfinderImg}
                order={1}
                title={"Mustrileidjaga"}
                text={"saad tekstist leida tüüpilisemad sõnajärjendid."}
                linkTo={"/tools"}/>
      <HomeCard image={analyserImg}
                order={2}
                title={"Sõnaanalüsaatoriga"}
                text={"saad tekstist leida silpe, algvorme ja grammatilisi vorme."}
                linkTo={"/tools"}/>
    </div>
  )
}

export default Home;
