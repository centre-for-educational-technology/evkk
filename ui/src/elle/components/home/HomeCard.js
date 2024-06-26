import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {Grid} from '@mui/material';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

function HomeCard({title, image, text, linkTo, order}) {
  const {t} = useTranslation();
  let img;

  if (order === 1) {
    img = <Grid item
                xs={6}
                style={{order: "2"}}>
      <CardMedia style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: "15%",
        paddingRight: "10%"
      }}
                 component="img"
                 image={image}
                 alt=""/>
    </Grid>
  } else if (order === 2) {
    img = <Grid item
                xs={6}>
      <CardMedia style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)"
      }}
                 component="img"
                 image={image}
                 alt=""/>
    </Grid>
  }

  return (
    <Card style={{
      marginLeft: "10%",
      marginRight: "10%",
      marginTop: 50,
      paddingBottom: "5%",
      padding: 40
    }}>
      <Grid className="grid"
            gridTemplateColumns={2}
            container
            spacing={1}
            style={{height: "100%"}}>
        {img}
        <Grid style={{
          textAlign: "center",
          marginLeft: "5%",
          alignSelf: "center"
        }}
              item
              xs={5}>
          <Typography style={{fontSize: '1.3rem'}}><b>{t(title)}</b> {t(text)}</Typography>
          <Link to={linkTo}
                onClick={() => window.scrollTo(0, 0)}>
            <Button style={{
              marginTop: 40,
              fontWeight: 'bold'
            }}
                    variant="contained"
            >
              {t('start_button')}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  )
}

export default HomeCard;
