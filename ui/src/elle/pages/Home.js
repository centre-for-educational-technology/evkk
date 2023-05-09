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
import { useTranslation } from 'react-i18next';

function Home() {
  const {t} = useTranslation();

  return (
    <div style={{paddingBottom: '5%'}}>
      <h2 className="home-title">{t('homepage_title')}</h2>

      <Card className="home-mockup-card">
        <Box className="home-mockup-card-box">
          <Box width="30%">
            <img width="100%" src={elleMockupImg} alt="ELLE mockup"/>
          </Box>
          <Box className="home-mockup-card-textbox">
            <Typography className="home-mockup-card-typography">{t('homepage_title_explainer')}</Typography>
          </Box>
        </Box>
      </Card>

      <Card className="home-summary-card">
        <Box className="home-summary-card-title-box">
          <Typography className="home-summary-card-title-typography">{t('homepage_summary_title')}</Typography>
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
                <Typography className="home-summary-card-content-typography">{t('homepage_summary_text_1')}</Typography>
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
                <Typography className="home-summary-card-content-typography">{t('homepage_summary_text_2')}</Typography>
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
                <Typography className="home-summary-card-content-typography">{t('homepage_summary_text_3')}</Typography>
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
                <Typography className="home-summary-card-content-typography">{t('homepage_summary_text_4')}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      <HomeCard image={correctorImg}
                order={2}
                title={'homepage_box_corrector_title'}
                text={'homepage_box_corrector_content'}
                linkTo={'/corrector'}/>
      <HomeCard image={clusterfinderImg}
                order={1}
                title={'homepage_box_clusters_title'}
                text={'homepage_box_clusters_content'}
                linkTo={'/tools/clusterfinder'}/>
      <HomeCard image={analyserImg}
                order={2}
                title={'homepage_box_word_analysis_title'}
                text={'homepage_box_word_analysis_content'}
                linkTo={'/tools/wordanalyser'}/>
    </div>
  );
}

export default Home;
