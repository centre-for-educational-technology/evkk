import React, { useState } from 'react';
import { Grid } from '@mui/material';
import './styles/Footer.css';
import i18n from 'i18next';

function Footer() {

  const logoEt = require('../resources/images/footer/tlu_et.svg').default;
  const logoEn = require('../resources/images/footer/tlu_en.svg').default;
  const [logo, setLogo] = useState(i18n.language === 'ET' ? logoEt : logoEn);

  i18n.on('languageChanged', () => {
    setLogo(i18n.language === 'ET' ? logoEt : logoEn);
  });

  return (
    <div style={{height: '40px'}}>
      <div className="footer-base">
        <Grid container
              spacing={0}
              columns={3}>
          <Grid item
                xs={1}
                className="footer-contact-column">
            <strong>Kontakt:</strong><br/>
            elle@tlu.ee<br/><br/>
            ELLE, {new Date().getFullYear()}
          </Grid>
          <Grid item
                xs={1}
                className="footer-column">
            <img
              src={logo}
              style={{maxWidth: '320px'}}
              alt="TLÜ logo"/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
