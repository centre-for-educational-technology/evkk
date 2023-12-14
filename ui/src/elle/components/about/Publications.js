import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SingleLinkedResourceList from './SingleLinkedResourceList';
import { conferences_workshops, publications, theses } from '../../const/PublicationsAndGrantsConstants';

export default function Publications() {
  const location = useLocation();

  useEffect(() => {
    let currentLocation = window.location.href;
    if (currentLocation.includes('#')) {
      const anchorCommentId = `${currentLocation.substring(currentLocation.indexOf('#') + 1)}`;
      const anchorComment = document.getElementById(anchorCommentId);
      if (anchorComment) {
        anchorComment.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [location]);

  return (
    <Box>
      <Box>
        <Typography id={'loputood'}
                    style={{
                      padding: '1rem'
                    }}
                    variant={'h3'}>Lõputööd</Typography>
      </Box>
      <SingleLinkedResourceList list={theses}/>

      <Box>
        <Typography id={'konverentsid'}
                    style={{
                      padding: '1rem'
                    }}
                    variant={'h3'}>Konverentsid ja töötoad</Typography>
      </Box>
      <SingleLinkedResourceList list={conferences_workshops}/>

      <Box>
        <Typography id={'publikatsioonid'}
                    style={{
                      padding: '1rem'
                    }}
                    variant={'h3'}>Publikatsioonid</Typography>
      </Box>
      <SingleLinkedResourceList list={publications}/>
    </Box>
  );
}
