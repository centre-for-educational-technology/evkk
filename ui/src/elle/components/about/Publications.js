import {Box, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import SinglePublicationList from './SinglePublicationList';
import {conferences_workshops, publications, theses} from '../../const/PublicationsConstants';

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
      <SinglePublicationList list={theses}/>

      <Box>
        <Typography id={'konverentsid'}
                    style={{
                      padding: '1rem'
                    }}
                    variant={'h3'}>Konverentsid ja töötoad</Typography>
      </Box>
      <SinglePublicationList list={conferences_workshops}/>

      <Box>
        <Typography id={'publikatsioonid'}
                    style={{
                      padding: '1rem'
                    }}
                    variant={'h3'}>Publikatsioonid</Typography>
      </Box>
      <SinglePublicationList list={publications}/>
    </Box>
  );
}
