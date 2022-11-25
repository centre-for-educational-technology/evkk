import React from "react";
import {Box, styled, Typography} from "@mui/material";
import {Link, Outlet} from 'react-router-dom';
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Contacts() {

  const classes = {
    focused: {
      bgcolor: "transparent",
    },
    selected: {
      bgcolor: "transparent",
    },
    hover: {
      bgcolor: "transparent",
    }
  };

  const MenuLink = styled(Link)({
    fontWeight: 600,
    fontSize: 16,
    color: "#1B1B1B",
    textDecoration: "none",
    fontFamily: ["'Exo 2'", 'sans-serif',].join(','),
    '&:hover': {
      color: "#9C27B0",
      textDecoration: "none",
    },
    '&.active': {
      color: "#9C27B0",
      textDecoration: "none",
    },
  });

  return (
    <Box sx={{
      backgroundColor: "#FFFBFE",
      height: "auto",
      position: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      paddingBottom: "100px"

    }}>
      <Box sx={{
        display: "flex",
        backgroundColor: "white",
        width: "80vw",
        height: "auto",
      }}>
        <Box sx={{position: "sticky", height: "100%", width: "25%", marginTop: "110px", top: "50px"}}>
          <Box sx={{
            width: "100%",
            height: "auto",
            marginLeft: "20px",
            borderRight: "solid",
            borderColor: "#FFD0FD",
            marginBottom: "100px",
            borderWidth: "thin"
          }}>
            <TreeView aria-label="file system navigator"
                      defaultCollapseIcon={<ExpandMoreIcon style={{paddingTop: '12px', fontSize: '2rem'}}/>}
                      defaultExpandIcon={<ChevronRightIcon style={{paddingTop: '12px', fontSize: '2rem'}}/>}
                      sx={{
                        height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto', ".MuiTreeItem-root": {
                          "	.MuiTreeItem-content:hover": classes.hover,
                          ".Mui-focused:not(.Mui-selected)": classes.focused,
                          ".Mui-selected, .Mui-focused.Mui-selected, .Mui-selected:hover":
                          classes.selected
                        }
                      }}>
              <TreeItem nodeId={"1"}
                        label={<Typography fontSize={"1rem"}
                                           marginTop={"10px"}>
                          <MenuLink to="us">Meist</MenuLink>
                        </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"2"}
                        label={<Typography fontSize={"1rem"}
                                           marginTop={"10px"}>
                          <MenuLink to="people">Töötajad</MenuLink>
                        </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"3"}
                        label={<Typography fontSize={"1rem"}
                                           marginTop={"10px"}>
                          <MenuLink to="grants">Grandid</MenuLink>
                        </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"4"}
                        label={<Typography style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#1B1B1B",
                          textDecoration: "none",
                          fontFamily: ["'Exo 2'", 'sans-serif',].join(','),
                          '&:hover': {
                            color: "#9C27B0",
                            textDecoration: "none",
                          },
                          '&.active': {
                            color: "#9C27B0",
                            textDecoration: "none",
                          },
                        }}
                                           marginTop={"10px"}>Üllitised</Typography>}>
                <TreeItem nodeId={"5"}
                          label={<Typography fontSize={"1rem"}
                                             marginTop={"10px"}>
                            <MenuLink to="grants">Lõputööd</MenuLink>
                          </Typography>}>

                </TreeItem>
                <TreeItem nodeId={"6"}
                          label={<Typography fontSize={"1rem"}
                                             marginTop={"10px"}>
                            <MenuLink to="grants">Konverentsid ja töötoad</MenuLink>
                          </Typography>}>

                </TreeItem>
                <TreeItem nodeId={"7"}
                          label={<Typography fontSize={"1rem"}
                                             marginTop={"10px"}>
                            <MenuLink to="grants">Publikatsioonid</MenuLink>
                          </Typography>}>

                </TreeItem>
              </TreeItem>
            </TreeView>
          </Box>
        </Box>

        <Box sx={{
          width: "75%",
          height: "auto",
          marginTop: "70px",
          marginLeft: "50px",
          marginBottom: "100px",
          overflow: "auto"
        }}>
          <Outlet/>
        </Box>
      </Box>
    </Box>
  )
}


export default Contacts;
