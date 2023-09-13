import React, {useEffect, useState} from 'react';
import {Alert, Box, Tab} from '@mui/material';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Query from './query/QueryNew';
import {useTranslation} from 'react-i18next';
import './styles/ToolsNew.css'
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {queryStore} from "../store/QueryStore";
import WordlistImg from '../resources/images/tools/sonaloend.png';
import WordContext from '../resources/images/tools/sona_kontekstis.png';
import NeighbourWord from '../resources/images/tools/naabersonad.png';
import WordPattern from '../resources/images/tools/mustrileidja.png';


function Tools() {

  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [onlyOutletVisible, setOnlyOutletVisible] = useState(true);
  const [value, setValue] = React.useState('1');
  const [textsSelected, setTextsSelected] = useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  queryStore.subscribe(() => {
    const storeState = queryStore.getState();
    setTextsSelected(storeState.corpusTextIds !== null || storeState.ownTexts !== null);
  });

  useEffect(() => {
    setExpanded(location.pathname === '/tools');
    setOnlyOutletVisible(!location.pathname.includes('adding'));
  }, [location]);

  const tools = [
    {
      title: 'common_wordlist',
      img: require('../resources/images/tools/sonaloend.png').default,
      description: 'tools_accordion_wordlist_explainer',
      route: 'wordlist',
      action: () => toolSelect('wordlist')
    },
    {
      title: 'common_word_in_context',
      img: require('../resources/images/tools/sona_kontekstis.png').default,
      description: 'tools_accordion_word_in_context_explainer',
      route: 'wordcontext',
      action: () => toolSelect('wordcontext')
    },
    {
      title: 'common_neighbouring_words',
      img: require('../resources/images/tools/naabersonad.png').default,
      description: 'tools_accordion_neighbouring_words_explainer',
      route: 'collocates',
      action: () => toolSelect('collocates')
    },
    {
      title: 'common_word_analysis',
      img: require('../resources/images/tools/sonaanalyys.png').default,
      description: 'tools_accordion_word_analysis_explainer',
      route: 'wordanalyser',
      action: () => toolSelect('wordanalyser')
    },
    {
      title: 'common_clusters',
      img: require('../resources/images/tools/mustrileidja.png').default,
      description: 'tools_accordion_clusters_explainer',
      route: 'clusterfinder',
      action: () => toolSelect('clusterfinder')
    }
  ];

  const ToolIconCard = (props) => {
    return (
      <>
        <Box
          className="tool-card-container"
          sx={{boxShadow: 3}}>
          <Box className="tool-card-icon">
            <img className="tool-icon-img" src={props.image} loading="lazy"/>
          </Box>
          <Box className="tool-card-text">
            {t(props.text)}

          </Box>
        </Box>
      </>
    )

  }

  function toolSelect(tool) {
    navigate(tool);
  }

  useEffect(() => {
    toolSelect('wordlist')
  }, []);

  console.log(onlyOutletVisible)

  return (
    <Box className="outer-container-tools">
      <Box className="tool-page-container-outer">
        <Box className="outer-outer">
          <Query/>
        </Box>

        <Box className="tools-box-right">
          <TabContext value={value} className="tab-context-class">
            <Box boxShadow={3} borderRadius={"25px"}>
              <TabList onChange={handleChange}
                       TabIndicatorProps={{sx: {display: "none"}}}
                       sx={{
                         "& button:hover": {backgroundColor: "rgba(204, 168, 253, 1)", transition: "0.5s"},
                         "& button:focus": {
                           backgroundColor: "#9C27B0",
                           color: "black",
                           borderColor: "#9C27B0"
                         },
                         "& button:active": {backgroundColor: "#9C27B0"},
                         "& button": {
                           backgroundColor: "rgba(255, 208, 253, 1)",
                           color: "black",
                           fontWeight: "bold",
                           height: "60px",
                           borderBottom: "4px solid #9C27B0",
                           borderTop: "4px solid #9C27B0",
                           textTransform: "capitalize",
                           transition: "0.5s",
                         },
                         "& button:first-child": {
                           borderRadius: "25px 0 0 25px",
                           paddingLeft: "25px",
                           borderLeft: "4px solid #9C27B0"
                         },
                         "& button:last-child": {
                           borderRadius: "0 25px 25px 0",
                           paddingRight: "25px",
                           borderRight: "4px solid #9C27B0"
                         },
                         "& button.Mui-selected": {
                           backgroundColor: "#9C27B0",
                           color: "white",
                           borderColor: "rgba(204, 168, 253, 1)",
                           transition: "0.5s"
                         },
                         "& .MuiTabs-flexContainer": {
                           border: "none",
                           borderBottom: "none",
                         },
                         "& .MuiTabs-root": {
                           border: "none",
                           borderBottom: "none",
                         }
                       }}
                       aria-label="lab API tabs example">
                <Tab label="Sõnaloend" onClick={() => toolSelect('wordlist')} value="1"/>
                <Tab label="Sõna kontekstis" onClick={() => toolSelect('wordcontext')} value="2"/>
                <Tab label="Naabersõnad" onClick={() => toolSelect('collocates')} value="3"/>
                <Tab label="Sõnaanalüsaator" onClick={() => toolSelect('wordanalyser')} value="4"/>
                <Tab label="Mustrileidja" onClick={() => toolSelect('clusterfinder')} value="5"/>
              </TabList>
            </Box>
            <TabPanel value="1">{textsSelected ? <Outlet/> :
              <Box>
                <ToolIconCard image={WordlistImg} text={'tools_accordion_wordlist_explainer'}/>
                <Alert severity="warning">Tööriista kasutamiseks tuleb vasakult menüüst valida analüüsitav tekst või
                  tekstid!</Alert>
              </Box>}</TabPanel>
            <TabPanel value="2">{textsSelected ? <Outlet/> :
              <Box>
                <ToolIconCard image={WordContext} text={'tools_accordion_word_in_context_explainer'}/>
                <Alert severity="warning">Tööriista kasutamiseks tuleb vasakult menüüst valida analüüsitav tekst või
                  tekstid!</Alert>
              </Box>}</TabPanel>
            <TabPanel value="3">{textsSelected ? <Outlet/> :
              <Box>
                <ToolIconCard image={NeighbourWord} text={'tools_accordion_neighbouring_words_explainer'}/>
                <Alert severity="warning">Tööriista kasutamiseks tuleb vasakult menüüst valida analüüsitav tekst või
                  tekstid!</Alert>
              </Box>}</TabPanel>
            <TabPanel value="4"><Outlet/></TabPanel>
            <TabPanel value="5"><Box className="cluster-tools-container">{textsSelected ? <Outlet/> :
              <Box>
                <ToolIconCard image={WordPattern} text={'tools_accordion_clusters_explainer'}/>
                <Alert severity="warning">Tööriista kasutamiseks tuleb vasakult menüüst valida analüüsitav tekst või
                  tekstid!</Alert>
              </Box>}</Box></TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}

export default Tools;
