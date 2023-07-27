import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { queryStore } from '../store/QueryStore';
import './styles/ToolCard.css';
import { useTranslation } from 'react-i18next';

function ToolCard({tool}) {

  const {t} = useTranslation();
  const disableableTools = ['wordlist', 'wordcontext', 'collocates'];
  const [textsSelected, setTextsSelected] = useState(false);

  queryStore.subscribe(() => {
    const storeState = queryStore.getState();
    setTextsSelected(storeState.corpusTextIds !== null || storeState.ownTexts !== null);
  });

  function isDisabled(route) {
    return !textsSelected && disableableTools.includes(route);
  }

  return (
    <Card raised={false}
          sx={{mb: 1, mr: 1}}
          square={true}
          style={{width: "350px"}}>
      <CardActionArea onClick={tool.action}
                      style={{height: '150px'}}
                      className={isDisabled(tool.route) ? 'disabled' : ''}>
        <CardContent sx={{display: 'flex', height: '140px'}}>
          <Box sx={{marginRight: 2}}>
            <img src={tool.img}
                 alt={t(tool.title)}/>
          </Box>
          <Box>
            <Typography variant="h5"
                        component="div">
              <Link to={tool.route}
                    underline="hover"
                    color="inherit">
                {t(tool.title)}
              </Link>
            </Typography>
            <Typography gutterBottom
                        variant="body1"
                        component="p">
              {t(tool.description)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ToolCard;
