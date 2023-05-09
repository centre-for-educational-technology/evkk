import * as React from 'react';
import HomeCard from "../components/HomeCard";
import analyserImg from "../resources/images/home/sonaanalyys.png";
import correctorImg from "../resources/images/home/tekstihindaja.png";
import elleMockupImage from "../resources/images/home/Elle_piklik_koopia.jpg";
import clusterfinderImg from "../resources/images/home/mustrileidja.png";
import PostAddIcon from '@mui/icons-material/PostAdd';
import GradingIcon from '@mui/icons-material/Grading';
import SchoolIcon from '@mui/icons-material/School';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {Avatar, Box, Card, Typography} from "@mui/material";

function Home() {
  return (
    <div style={{paddingBottom: "5%"}}>
      <h2 style={{textAlign: "center", marginLeft: "20%", width: "60%", marginBottom: "5%", paddingTop: "4%"}}>ELLE -
        keeleõppe ja -analüüsi keskkond õppijale, õpetajale ja teadlasele</h2>

      <Card style={{marginLeft: "10%", marginRight: "10%"}}>
        <Box width="100%" display="flex">
          <Box width="30%">
            <img width="100%" src={elleMockupImage} alt="Pilti ei leitud"/>
          </Box>
          <Box width="70%" display="flex" alignItems="center" justifyContent="center">
            <Typography padding="10%" fontSize="1.3rem" textAlign="center">ELLE pakub tekstikogusid ja tekstianalüüsi
              vahendeid eesti keele õppimiseks ja õpetamiseks nii teise keelena kui ka emakeelena, samuti
              keeleuurimiseks. Päringu abil saad leida huvipakkuvaid tekste Eesti vahekeele ehk õppijakeele korpusest
              (EVKK), mis sisaldab peamiselt eesti keele kui teise keele õppijate kirjutisi, aga ka emakeelse
              keelekasutuse näiteid ja akadeemilisi tekste. Tööriistad võimaldavad analüüsida ka omavalitud tekstide
              sõnavara ja grammatikat, kontrollida nende keerukust ja korrektsust ning hinnata
              keeleoskustaset.</Typography>
          </Box>
        </Box>
      </Card>

      <Card style={{marginLeft: "10%", marginRight: "10%", marginTop: "50px"}}>
        <Box display="flex" justifyContent="center" paddingTop="50px">
          <Typography fontSize="30px" fontWeight="bold">Mida ELLE keskkond toetab?</Typography>
        </Box>
        <Box display="flex" gap="40px" width="100%" padding="40px">
          <Box height="auto" width="25%">
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Box paddingTop="10px" display="flex" justifyContent="center" alignItems="center" paddingBottom="30px"
                   width="100%">
                <Avatar sx={{bgcolor: "#9C27B0"}}>
                  <SchoolIcon/>
                </Avatar>
              </Box>
              <Box width="100%" display="flex">
                <Typography alignSelf="center" textAlign="center">Andmepõhist keeleõppimist, kus õppija saab
                  keelematerjali põhjal ise keelereegleid tuletada või õpitud reegleid kinnitada.</Typography>
              </Box>
            </Box>
          </Box>
          <Box height="auto" width="25%">
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Box paddingTop="10px" display="flex" justifyContent="center" alignItems="center" paddingBottom="30px"
                   width="100%">
                <Avatar sx={{bgcolor: "#9C27B0"}}>
                  <PostAddIcon/>
                </Avatar>
              </Box>
              <Box width="100%" display="flex">
                <Typography alignSelf="center" textAlign="center">Tekstide koostamist nii õpingutes kui ka töös, näiteks
                  kodutööde korrigeerimist ja ametitekstide lihtsustamist.</Typography>
              </Box>
            </Box>
          </Box>
          <Box height="auto" width="25%">
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Box paddingTop="10px" display="flex" justifyContent="center" alignItems="center" paddingBottom="30px"
                   width="100%">
                <Avatar sx={{bgcolor: "#9C27B0"}}>
                  <GradingIcon/>
                </Avatar>
              </Box>
              <Box width="100%" display="flex">
                <Typography alignSelf="center" textAlign="center">Õpilaste kirjalike tööde kontrollimist, õppevara
                  valikut ja koostamist lähtudes eri taseme õppijate tüüpilisest keelekasutusest.</Typography>
              </Box>
            </Box>
          </Box>
          <Box height="auto" width="25%">
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Box paddingTop="10px" display="flex" justifyContent="center" alignItems="center" paddingBottom="30px"
                   width="100%">
                <Avatar sx={{bgcolor: "#9C27B0"}}>
                  <ManageSearchIcon/>
                </Avatar>
              </Box>
              <Box width="100%" display="flex">
                <Typography alignSelf="center" textAlign="center">Tekstide sisu ja keelekasutuse analüüsimist
                  uurimistöös, näiteks keele-, kultuuri- ja meediauuringutes.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      <HomeCard image={correctorImg}
                order={2}
                title={"Tekstihindajaga"}
                text={"saad lasta oma kirjutist hinnata. Vaata, mida arvab robot sinu teksti õigekirjast ja millisele keeleoskustasemele see vastab."}
                linkTo={"/corrector"}/>
      <HomeCard image={clusterfinderImg}
                order={1}
                title={"Mustrileidjaga"}
                text={"saad tekstist leida tüüpilisemad sõnajärjendid."}
                linkTo={"/tools/clusterfinder"}/>
      <HomeCard image={analyserImg}
                order={2}
                title={"Sõnaanalüsaatoriga"}
                text={"saad tekstist leida silpe, algvorme ja grammatilisi vorme."}
                linkTo={"/tools/wordanalyser"}/>
    </div>
  )
}

export default Home;
