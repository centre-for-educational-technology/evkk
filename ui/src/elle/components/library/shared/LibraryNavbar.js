import { List, ListItem, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LibraryNavbar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="library-navbar-container">
      <List dense>
        <ListItem disablePadding sx={{ marginBottom: '16px' }}>
          <Link
            to="/library/exercises"
            className={`library-link ${location.pathname.includes('/library/exercises') ? 'active' : ''}`}
          >
            {t('exercises')}
          </Link>
        </ListItem>
        <ListItem disablePadding sx={{ marginBottom: '16px' }}>
          <Link
            to="/library/studymaterial"
            className={`library-link ${location.pathname.includes('/library/studymaterial') ? 'active' : ''}`}
          >
            {t('study_materials')}
          </Link>
        </ListItem>
      </List>
    </div>
  );
}
