import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import './styles/Tutorial.css';
import {useTranslation} from "react-i18next";
import "../translations/i18n";

function Tutorial() {

  const [boxOpen, setBoxOpen] = new useState(1);
  const {t} = useTranslation();

  useEffect(() => {
    if (sessionStorage.getItem("tutorial")) {
      setBoxOpen(0);
    }
  }, []);

  const ref1 = useRef();
  const handleClick = () => {
    setBoxOpen(3);
    window.scrollBy({top: 400, behavior: "smooth"});
  }

  const handleClose = () => {
    setBoxOpen(0);
    window.scrollBy({top: -99999, behavior: "smooth"});
    sessionStorage.setItem("tutorial", "false");
  }

  function InputBoxTutorial() {
    return (
      <>
        <Box className="tutorialBox" left={"20%"} top={"20%"} width={"30%"} height={"15%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "15%", left: "10%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {t("input_field_tutorial_text")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setBoxOpen(2)}>{t("forward")}</Button>
            <Button size="small" onClick={handleClose}>{t("exit")}</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function WordDescriptionTutorial() {
    return (
      <>
        <Box className="tutorialBox" left={"50%"} top={"20%"} width={"15%"} height={"15%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "15%", left: "40%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {t("wordinfo_tutorial_text")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setBoxOpen(1)}>{t("back")}</Button>
            <Button size="small" onClick={handleClick}>{t("forward")}</Button>
            <Button size="small" onClick={handleClose}>{t("exit")}</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function TableTabTutorial() {
    return (
      <>
        <Box ref={ref1} className="tutorialBox" left={"10%"} top={"42%"} width={"25%"} height={"10%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "38%", left: "0%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {t("table_tab_tutorial_text")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              setBoxOpen(2)
              window.scrollBy({top: -400, behavior: "smooth"})
            }}>{t("back")}</Button>
            <Button size="small" onClick={() => {
              setBoxOpen(4)
              window.scrollBy({top: 400, behavior: "smooth"})
            }}>{t("forward")}</Button>
            <Button size="small" onClick={handleClose}>{t("exit")}</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function TableTutorial() {
    return (
      <>
        <Box className="tutorialBox" left={"10%"} top={"58%"} width={"80%"} height={"30%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "55%", left: "0%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {t("table_tutorial_text")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              setBoxOpen(3)
              window.scrollBy({top: -400, behavior: "smooth"})
            }}>{t("back")}</Button>
            <Button size="small" onClick={() => setBoxOpen(5)}>{t("forward")}</Button>
            <Button size="small" onClick={handleClose}>{t("exit")}</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function TableClickTutorial() {
    return (
      <>
        <Box className="tutorialBox" left={"10%"} top={"61%"} width={"55%"} height={"4%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "55%", left: "0%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {t("table_click_tutorial_text")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setBoxOpen(4)}>{t("back")}</Button>
            <Button size="small" onClick={handleClose}>{t("exit")}</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  return (
    <Box>
      {boxOpen === 1 ? <InputBoxTutorial/> : null}
      {boxOpen === 2 ? <WordDescriptionTutorial/> : null}
      {boxOpen === 3 ? <TableTabTutorial/> : null}
      {boxOpen === 4 ? <TableTutorial/> : null}
      {boxOpen === 5 ? <TableClickTutorial/> : null}
    </Box>
  )
}
export default Tutorial
