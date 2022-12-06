import {Box, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

function AboutUs() {
  return (
    <Box sx={{
      padding: "50px",
      paddingTop: "10px",
      paddingBottom: "0",
      width: "75%",
      height: "auto",
    }}>
      <Box id={"tutvustus"}>
        <Typography padding={"50px"}
                    paddingTop={"25px"}>
          <h3>Mis on ELLE?</h3><br/>
          ELLE on Tallinna Ülikoolis arendatav keskkond eesti keele õpetamiseks, õppimiseks ja keeleanalüüsiks.
          Keskkonna aluseks on eesti vahekeele ehk õppijakeele korpus EVKK, mis on eesti keele kui teise keele ja
          võõrkeele õppijate kirjalike tekstide kogu.<br/><br/>
          ELLE keskkond võimaldab EVKK korpust pidevalt täiendada. Nimelt saab ELLE-s kirjutatud ja analüüsitud tekste
          EVKK-le loovutada. Järjest täienev keelematerjal annab ülevaate õppijate oskustest ja raskustest erinevatel
          keeletasemetel ning aitab seeläbi arendada keeleõpperakendusi ja -materjale.<br/><br/>
          Keskkond pakub tekstianalüüsi tuge ka eesti keele kui emakeele õppes, uurimistöös ja tekstidega töötades.
          Keeleõppijate kirjutiste kõrval kogume eesti ja muu emakeelega üliõpilaste akadeemilisi tekste, et luua
          edaspidi erialakeele omandamist toetavat õppevara.<br/><br/>
          Kõik EVKK ressursid ei ole veel ELLE-sse üle kantud. Korpuse vana lehekülge on võimalik
          külastada <Link to="../../vers1/">siin</Link>. ELLE arendusega saab ennast kurssi viia
          meie <a href="https://github.com/centre-for-educational-technology/evkk/wiki"
                  target="_blank"
                  rel="noopener noreferrer">Wikis</a>.<br/><br/>
        </Typography>
      </Box>
    </Box>
  );
}

export default AboutUs;
