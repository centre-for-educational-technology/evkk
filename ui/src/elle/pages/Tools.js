import ToolCard from '../components/ToolCard';
import React, { useEffect, useState } from 'react';
import { Alert, Box, Card, CardContent, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AccordionStyle } from '../utils/constants';
import Query from './query/Query';
import { useTranslation } from 'react-i18next';

function Tools() {

  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [onlyOutletVisible, setOnlyOutletVisible] = useState(true);

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
      title: 'common_neighboring_words',
      img: require('../resources/images/tools/naabersonad.png').default,
      description: 'tools_accordion_neighboring_words_explainer',
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

  function toolSelect(tool) {
    navigate(tool);
  }

  return (
    <>
      {onlyOutletVisible ?
        <Card raised={true}
              square={true}
              elevation={2}>
          <CardContent sx={{p: 3}}>
            <Grid container
                  spacing={2}>
              <Grid item
                    xs={12}
                    sm={12}
                    md={12}>
                <Query/>
                <Accordion
                  sx={AccordionStyle}
                  expanded={expanded}
                  style={{marginTop: '1em'}}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    onClick={() =>
                      setExpanded(!expanded)
                    }
                  >
                    {t('tools_accordion_analysis')}
                  </AccordionSummary>
                  <AccordionDetails style={{minWidth: '350px'}}>
                    <Alert severity="info"
                           style={{marginBottom: '1em'}}>{t('tools_accordion_analysis_infobox')}</Alert>
                    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                      {tools.map(tool => {
                        return [
                          <ToolCard
                            key={tool.route}
                            tool={tool}
                          />
                        ];
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            <Outlet/>
          </CardContent>
        </Card>
        : <Outlet/>}
    </>
  );
}

export default Tools;
