import React, { useEffect, useState } from 'react';
import { Box, Chip, Grid, Link, styled, Typography } from '@mui/material';
import './styles/SingleLink.css';

function SingleLink({name, siteLink, tekst, image, tags}) {

  const [urlStatus, setUrlStatus] = useState('');

  const runfetch = () => {
    fetch('http://localhost:9090/api/check-status', {
      method: 'POST',
      headers: {
        'content-type': 'text/plain'
      },
      body: siteLink


    })
      .then(response => {
        return response.text();
      }).then(res => {setUrlStatus(res);})
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (urlStatus === 'INTERNAL_SERVER_ERROR') {
      fetch('https://hooks.slack.com/services/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', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({
          'text': `${siteLink} did not respond with code 200`
        })
      });
    }
  }, [urlStatus]);

  const MenuLink = styled(Link)({
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#1B1B1B',
    textDecoration: 'none',
    fontFamily: ['\'Exo 2\'', 'sans-serif'].join(','),
    '&:hover': {
      color: '#9C27B0',
      textDecoration: 'none'
    },
    '&.active': {
      color: '#9C27B0',
      textDecoration: 'none'
    }
  });

  return (
    <Box height={'auto'}
         marginTop={'50px'}
         marginBottom={'50px'}>
      <Grid
        container
        spacing={2}>
        <Grid item
              xs={2}>
          <img src={image}
               className="linkImage"
               alt={name + ' logo'}/>
        </Grid>
        <Grid item
              xs={10}>
          <Box><MenuLink onClick={runfetch} rel={'noopener noreferrer'}
                         target={'_blank'}
                         href={`https://${siteLink}`}>{name}</MenuLink></Box>
          <Box>
            <div><Typography>{tekst}</Typography></div>
          </Box>
        </Grid>
        <Grid item
              xs={2}></Grid>
        <Grid item
              xs={10}>
          {tags.map(tag => {
            return (
              <Chip label={tag}
                    style={{marginRight: '0.5vw', marginTop: '0.5vw'}}/>
            );
          })}

        </Grid>
      </Grid>
    </Box>
  );
}

export default SingleLink;
