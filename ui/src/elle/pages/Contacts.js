import React from "react";
import {Box, styled, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import {Link, Outlet} from 'react-router-dom';
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


function Contacts() {


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
      overflow: "auto",
      paddingBottom: "100px"

    }}>
      <Box display={"flex"}
           width={"80vw"}
           paddingBottom={"5px"}
           height={"50px"}
           paddingLeft={"20px"}
           alignItems={"flex-end"}
           sx={{wordSpacing: "20px"}}><HomeIcon sx={{marginRight: "20px"}}/> / Keskkonnast / Töötajad</Box>
      <Box sx={{
        display: "flex",
        backgroundColor: "white",
        marginTop: "3vh",
        width: "80vw",
        height: "auto",
        overflow: "auto"
      }}>
        <Box sx={{
          width: "25%",
          height: "auto",
          marginTop: "110px",
          marginLeft: "20px",
          borderRight: "solid",
          borderColor: "#FFD0FD",
          overflow: "auto",
          marginBottom: "100px",
          borderWidth: "thin"
        }}>
          <TreeView aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    sx={{height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}>
            <TreeItem nodeId={"1"} label={<Typography fontSize={"1rem"}
                                                      marginTop={"10px"}>
              <MenuLink to="people">Töötajad</MenuLink>
            </Typography>}>

            </TreeItem>
            <TreeItem nodeId={"2"} label={<Typography fontSize={"1rem"}
                                                      marginTop={"10px"}>
              <MenuLink to="grants">Grandid</MenuLink>
            </Typography>}>

            </TreeItem>
            <TreeItem nodeId={"3"} label={<Typography style={{
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
              <TreeItem nodeId={"4"} label={<Typography fontSize={"1rem"}
                                                        marginTop={"10px"}>
                <MenuLink to="grants">Kontaktid</MenuLink>
              </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"5"} label={<Typography fontSize={"1rem"}
                                                        marginTop={"10px"}>
                <MenuLink to="grants">Grandid</MenuLink>
              </Typography>}>

              </TreeItem>
            </TreeItem>
          </TreeView>
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
