import {Box, Grid, Tab, Tabs} from "@mui/material";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {TabContext} from "./Contexts/TabContext";


function TableComponent() {

  const {t} = useTranslation();
  const [tabValue, setTabValue] = useContext(TabContext)

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    setTabValue(newValue + 1)
  };

  const [value, setValue] = useState(0);


  return (
    <>
      <Grid item
            xs={12}
            md={12}
            marginLeft={"200px"}
            marginRight={"200px"}
            marginTop={"100px"}
            marginBottom={"50px"}>
        <h2>{t("text_analysis")}</h2>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value}
                onChange={handleChange}
                aria-label="basic tabs example">
            <Tab label={t("common_syllables")} {...a11yProps(0)} />
            <Tab label={t("common_lemmas")} {...a11yProps(1)} />
            <Tab label={t("tab_gram_anal")} {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Grid>
    </>)
}

export default TableComponent
