import React from "react";
import {Grid} from "@mui/material";
import './styles/Footer.css';

function Footer() {

  return (
    <div style={{height: "100px"}}>
      <div className="footer-base">
        <Grid container
              spacing={0}
              columns={3}>
          <Grid item
                xs={1}
                className="footer-column">
            <strong>Kontakt:</strong><br/>
            elle@tlu.ee<br/><br/>
            ELLE, {new Date().getFullYear()}
          </Grid>
          <Grid item
                xs={1}
                className="footer-column">
            <img src={require("../resources/tlu.png").default}
                 alt="TLÜ logo"/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
