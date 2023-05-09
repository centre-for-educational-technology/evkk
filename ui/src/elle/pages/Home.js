import * as React from 'react';
import HomeCard from '../components/HomeCard';
import analyserImg from '../resources/images/home/sonaanalyys.png';
import correctorImg from '../resources/images/home/tekstihindaja.png';
import elleMockupImg from '../resources/images/home/elle-mockup.jpg';
import clusterfinderImg from '../resources/images/home/mustrileidja.png';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GradingIcon from '@mui/icons-material/Grading';
import SchoolIcon from '@mui/icons-material/School';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Avatar, Box, Card, Typography } from '@mui/material';
import './styles/Home.css';

function Home() {
  return (
    <div style={{paddingBottom: '5%'}}>
      <h2 className="home-title">ELLE - keeleõppe ja -analüüsi keskkond õppijale, õpetajale ja teadlasele</h2>

      <Card className="home-mockup-card">
        <Box className="home-mockup-card-box">
          <Box width="30%">
            <img width="100%" src={elleMockupImg} alt="ELLE mockup"/>
          </Box>
          <Box className="home-mockup-card-textbox">
            <Typography className="home-mockup-card-typography">ELLE pakub tekstikogusid ja tekstianalüüsi
              vahendeid eesti keele õppimiseks ja õpetamiseks nii teise keelena kui ka emakeelena, samuti
              keeleuurimiseks. Päringu abil saad leida huvipakkuvaid tekste Eesti vahekeele ehk õppijakeele korpusest
              (EVKK), mis sisaldab peamiselt eesti keele kui teise keele õppijate kirjutisi, aga ka emakeelse
              keelekasutuse näiteid ja akadeemilisi tekste. Tööriistad võimaldavad analüüsida ka omavalitud tekstide
              sõnavara ja grammatikat, kontrollida nende keerukust ja korrektsust ning hinnata
              keeleoskustaset.</Typography>
          </Box>
        </Box>
      </Card>

      <Card className="home-summary-card">
        <Box className="home-summary-card-title-box">
          <Typography className="home-summary-card-title-typography">Mida ELLE keskkond toetab?</Typography>
        </Box>
        <Box className="home-summary-card-content-box">
          <Box className="home-summary-card-content-box-inner-1">
            <Box className="home-summary-card-content-box-inner-2">
              <Box className="home-summary-card-avatar-box">
                <Avatar className="home-summary-card-avatar">
                  <SchoolIcon/>
                </Avatar>
              </Box>
              <Box className="home-summary-card-content-textbox">
                <Typography className="home-summary-card-content-typography">Andmepõhist keeleõppimist, kus õppija saab
                  keelematerjali põhjal ise keelereegleid tuletada või õpitud reegleid kinnitada.</Typography>
              </Box>
            </Box>
          </Box>
          <Box className="home-summary-card-content-box-inner-1">
            <Box className="home-summary-card-content-box-inner-2">
              <Box className="home-summary-card-avatar-box">
                <Avatar className="home-summary-card-avatar">
                  <PostAddIcon/>
                </Avatar>
              </Box>
              <Box className="home-summary-card-content-textbox">
                <Typography className="home-summary-card-content-typography">Tekstide koostamist nii õpingutes kui ka
                  töös, näiteks
                  kodutööde korrigeerimist ja ametitekstide lihtsustamist.</Typography>
              </Box>
            </Box>
          </Box>
          <Box className="home-summary-card-content-box-inner-1">
            <Box className="home-summary-card-content-box-inner-2">
              <Box className="home-summary-card-avatar-box">
                <Avatar className="home-summary-card-avatar">
                  <GradingIcon/>
                </Avatar>
              </Box>
              <Box className="home-summary-card-content-textbox">
                <Typography className="home-summary-card-content-typography">Õpilaste kirjalike tööde kontrollimist,
                  õppevara
                  valikut ja koostamist lähtudes eri taseme õppijate tüüpilisest keelekasutusest.</Typography>
              </Box>
            </Box>
          </Box>
          <Box className="home-summary-card-content-box-inner-1">
            <Box className="home-summary-card-content-box-inner-2">
              <Box className="home-summary-card-avatar-box">
                <Avatar className="home-summary-card-avatar">
                  <ManageSearchIcon/>
                </Avatar>
              </Box>
              <Box className="home-summary-card-content-textbox">
                <Typography className="home-summary-card-content-typography">Tekstide sisu ja keelekasutuse analüüsimist
                  uurimistöös, näiteks keele-, kultuuri- ja meediauuringutes.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      <HomeCard image={correctorImg}
                order={2}
                title={'Tekstihindajaga'}
                text={'saad lasta oma kirjutist hinnata. Vaata, mida arvab robot sinu teksti õigekirjast ja millisele keeleoskustasemele see vastab.'}
                linkTo={'/corrector'}/>
      <HomeCard image={clusterfinderImg}
                order={1}
                title={'Mustrileidjaga'}
                text={'saad tekstist leida tüüpilisemad sõnajärjendid.'}
                linkTo={'/tools/clusterfinder'}/>
      <HomeCard image={analyserImg}
                order={2}
                title={'Sõnaanalüsaatoriga'}
                text={'saad tekstist leida silpe, algvorme ja grammatilisi vorme.'}
                linkTo={'/tools/wordanalyser'}/>
    </div>
  );
}

export default Home;
