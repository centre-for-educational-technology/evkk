import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import './styles/Tutorial.css';

function Tutorial() {

  const [boxOpen, setBoxOpen] = new useState(1);

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

  function Box1() {
    return (
      <>
        <Box className="tutorialBox" left={"20%"} top={"20%"} width={"30%"} height={"15%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "15%", left: "10%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Siin kastis on võimalik sõnadel klõpsata. Klõpsates hkuvatakse valitud sõnad kollase taustaga.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setBoxOpen(2)}>EDASI</Button>
            <Button size="small" onClick={handleClose}>LÕPETA</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function Box2() {
    return (
      <>
        <Box className="tutorialBox" left={"50%"} top={"20%"} width={"15%"} height={"15%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "15%", left: "40%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Sõnadel klõpsates ilmub siia valitud sõna grammatiline info.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setBoxOpen(1)}>TAGASI</Button>
            <Button size="small" onClick={handleClick}>EDASI</Button>
            <Button size="small" onClick={handleClose}>LÕPETA</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function Box3() {
    return (
      <>
        <Box ref={ref1} className="tutorialBox" left={"10%"} top={"42%"} width={"25%"} height={"10%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "38%", left: "0%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Siit saad valida, mis infot sa allolevates tabelites näha soovid.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              setBoxOpen(2)
              window.scrollBy({top: -400, behavior: "smooth"})
            }}>TAGASI</Button>
            <Button size="small" onClick={() => {
              setBoxOpen(4)
              window.scrollBy({top: 400, behavior: "smooth"})
            }}>EDASI</Button>
            <Button size="small" onClick={handleClose}>LÕPETA</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function Box4() {
    return (
      <>
        <Box className="tutorialBox" left={"10%"} top={"58%"} width={"80%"} height={"30%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "55%", left: "0%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Siin tabelis näed infot tekstikastis olevate sõnade kohta.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              setBoxOpen(3)
              window.scrollBy({top: -400, behavior: "smooth"})
            }}>TAGASI</Button>
            <Button size="small" onClick={() => setBoxOpen(5)}>EDASI</Button>
            <Button size="small" onClick={handleClose}>LÕPETA</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  function Box5() {
    return (
      <>
        <Box className="tutorialBox" left={"10%"} top={"61%"} width={"55%"} height={"4%"}>
        </Box>
        <Card
          className="tutorialcard"
          sx={{top: "55%", left: "0%", width: "15%"}}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Tabelis olevatel väärtustel klõpsates märgitakse ülevaloleval tekstikastis kõik sõnad, mis on valikuga
              seotud.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setBoxOpen(4)}>TAGASI</Button>
            <Button size="small" onClick={handleClose}>LÕPETA</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  return (
    <Box>
      {boxOpen === 1 ? <Box1/> : null}
      {boxOpen === 2 ? <Box2/> : null}
      {boxOpen === 3 ? <Box3/> : null}
      {boxOpen === 4 ? <Box4/> : null}
      {boxOpen === 5 ? <Box5/> : null}
    </Box>
  )
}
export default Tutorial
