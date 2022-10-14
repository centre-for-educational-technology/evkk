import React, {Component} from "react";
import {Box, Card, CardActionArea, CardContent, Typography,} from "@mui/material";
import {Link} from "react-router-dom";

class ToolCard extends Component {

  render() {
    return (
      <Card raised={false}
            sx={{mb: 1}}
            square={true}>
        <CardActionArea onClick={this.props.action}>
          <CardContent sx={{display: "flex"}}>
            <Box sx={{marginRight: 2}}>
              <img src={this.props.img}
                   alt={this.props.title}/>
            </Box>
            <Box>
              <Typography variant="h5"
                          component="div">
                <Link to="#"
                      underline="hover"
                      color="inherit">
                  {this.props.title}
                </Link>
              </Typography>
              <Typography gutterBottom
                          variant="body1"
                          component="p">
                {this.props.description}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default ToolCard;
