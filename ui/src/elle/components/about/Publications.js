import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SingleLinkedResourceList from './SingleLinkedResourceList';
import { conferences_workshops, publications, theses } from '../../const/PublicationsAndGrantsConstants';
import { HashFragmentRouteConstants } from '../../../AppRoutes';
import { useTranslation } from 'react-i18next';

export default function Publications() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    let currentLocation = window.location.href;
    if (currentLocation.includes('#')) {
      const anchorCommentId = `${currentLocation.substring(currentLocation.indexOf('#') + 1)}`;
      const anchorComment = document.getElementById(anchorCommentId);
      if (anchorComment) {
        anchorComment.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <Box>
      <Box>
        <div id={HashFragmentRouteConstants.PUBLICATIONS_GRADUATION_PAPERS} className="link-anchor-gap"></div>
        <Typography
          style={{ paddingLeft: '1rem' }}
          variant={'h3'}
        >
          {t('common_graduation_papers')}
        </Typography>
      </Box>
      <SingleLinkedResourceList list={theses} />

      <Box>
        <div id={HashFragmentRouteConstants.PUBLICATIONS_CONFERENCES_AND_WORKSHOPS} className="link-anchor-gap"></div>
        <Typography
          style={{ paddingLeft: '1rem' }}
          variant={'h3'}
        >
          {t('common_conferences_and_workshops')}
        </Typography>
      </Box>
      <SingleLinkedResourceList list={conferences_workshops} />

      <Box>
        <div id={HashFragmentRouteConstants.PUBLICATIONS_ARTICLES} className="link-anchor-gap"></div>
        <Typography
          style={{ paddingLeft: '1rem' }}
          variant={'h3'}
        >
          {t('common_articles')}
        </Typography>
      </Box>
      <SingleLinkedResourceList list={publications} />
    </Box>
  );
}
