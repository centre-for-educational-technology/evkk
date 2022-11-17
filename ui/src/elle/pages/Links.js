import {Box, styled, Typography} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Works from "../components/Works";
import {HashLink} from "react-router-hash-link";
import "@fontsource/exo-2/600.css";

function Links() {

  const MenuLink = styled(HashLink)({
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
        <Box
          position={"fixed"} sx={{
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
                    sx={{height: "auto", flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}>
            <TreeItem nodeId={"1"} label={<Typography
              marginTop={"10px"}>
              <MenuLink key={"1"} smooth to="#tutvustus">Tutvustus</MenuLink>
            </Typography>}>

            </TreeItem>
            <TreeItem nodeId={"2"} label={<Typography
              marginTop={"10px"}>
              <MenuLink key={"2"} smooth to="#sõnastikud">Sõnastikud</MenuLink>
            </Typography>}>

            </TreeItem>
            <TreeItem nodeId={"3"} label={<Typography
              marginTop={"10px"}>
              <MenuLink key={"3"} smooth to="#tõlkerakendused">Tõlkerakendused</MenuLink>
            </Typography>}>

            </TreeItem>
            <TreeItem nodeId={"4"} label={<Typography style={{
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
                                                      marginTop={"10px"}>Eestikeelsed tekstid</Typography>}>
              <TreeItem nodeId={"5"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"4"} smooth to="#meediatekstid">Meediatekstid</MenuLink>
              </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"6"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"4"} smooth to="#kirjandus">Kirjandus</MenuLink>
              </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"7"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"5"} smooth to="#teadustekstid">Teadustekstid</MenuLink>
              </Typography>}>

              </TreeItem>
            </TreeItem>
            <TreeItem nodeId={"8"} label={<Typography style={{
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
                                                      marginTop={"10px"}>Audiovisuaalne meedia</Typography>}>
              <TreeItem nodeId={"9"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"6"} smooth to="#video">Video</MenuLink>
              </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"10"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"7"} smooth to="#audio">Audio</MenuLink>
              </Typography>}>

              </TreeItem>
            </TreeItem>
            <TreeItem nodeId={"11"} label={<Typography style={{
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
                                                       marginTop={"10px"}>Keeleõppevara</Typography>}>
              <TreeItem nodeId={"12"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"8"} smooth to="#õppematerjalid">Õppematerjalid ja harjutused</MenuLink>
              </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"13"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"9"} smooth to="#õppemängud">Keeleõppemängud</MenuLink>
              </Typography>}>

              </TreeItem>
            </TreeItem>
            <TreeItem nodeId={"14"} label={<Typography style={{
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
                                                       marginTop={"10px"}>Keeleõppekeskkonnad</Typography>}>
              <TreeItem nodeId={"15"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"10"} smooth to="#keeleõppekeskkonnad">Keeleõppekeskkonnad</MenuLink>
              </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"16"} label={<Typography
                marginTop={"10px"}>
                <MenuLink key={"11"} smooth to="#kursused">Kursused</MenuLink>
              </Typography>}>

              </TreeItem>
            </TreeItem>
            <TreeItem nodeId={"17"} label={<Typography
              marginTop={"10px"}>
              <MenuLink key={"12"} smooth to="#abivahendid">Õpetaja abivahendid</MenuLink>
            </Typography>}>

            </TreeItem>
            <TreeItem nodeId={"18"} label={<Typography
              marginTop={"10px"}>
              <MenuLink key={"13"} smooth to="#keelekorpused">Eesti keele korpused</MenuLink>
            </Typography>}>

            </TreeItem>
          </TreeView>
        </Box>

        <Box sx={{
          padding: "50px",
          width: "75%",
          height: "auto",
          marginTop: "70px",
          marginLeft: "35%",
          marginBottom: "100px",
        }}>
          <Box id={"tutvustus"}>
            <Typography align={"center"} padding={"50px"}>ELLE eesmärk on eesti keele õpet igati toetada, mistõttu oleme
              lingikogusse koondanud hulgaliselt erinevaid keskkondi, millest võib kasu olla nii eesti keele õppijatele,
              õpetajatele kui ka keeleteadlastele. Kui ELLEst jääb väheks, siis ehk leiad sobiliku lehe siit! Kui ei,
              siis anna meile teada!</Typography>
          </Box>

          <Box>
            <Typography id={"sõnastikud"} variant={"h3"}>Sõnastikud</Typography>
          </Box>

          <Works
            siteLink={"https://sonaveeb.ee/"}
            name={"Sõnaveeb"}
            tekst={"Keskkond koondab mitmeid sõnaraamatuid ja andmebaase, et anda võimalikult detailne ülevaade otsitud sõnast või väljendist. Sõnaveebist saad abi, kui tahad näiteks näha sõna kasutuskontekstis, leida tema tähendused, muutevormid, päritoluinfo, sünonüümid või uurida, milliste sõnadega ta tavaliselt koos esineb.\n"}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["koondsõnastik", "terminisõnastik"]}/>

          <Works
            siteLink={"https://sonaveeb.ee/lite"}
            name={"Keeleõppija Sõnaveeb"}
            tekst={"Keeleõppijatele suunatud lihtsustatud sõnastik koos piltidega."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["keeleõppesõnastik"]}/>

          <Works
            siteLink={"https://portaal.eki.ee/sonaraamatud.html"}
            name={"EKI sõnaraamatud"}
            tekst={"Eesti keele instituut (EKI) on loonud suurema osa Eestis kasutatavatest sõnastikest ja lingid eraldi sõnastikele on leitavad nende koduleheküljelt. Siit leiad nii eesti keele sõnastikke, terminisõnastikke kui ka murdesõnaraamatuid ja sugulaskeelte sõnastikke."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["sõnaraamatud", "terminisõnastik", "murdesõnastik", "sugulaskeeled"]}/>

          <Works
            siteLink={"https://glosbe.com/"}
            name={"Glospe"}
            tekst={"Mitmekeelne veebisõnastik, mis sisaldab tõlkeid, sõnatähendusi, võrreldavaid lauseid kahes keeles ja hulgaliselt näitelauseid. Sõnastikku on kasutajatel võimalik ise täiendada, et ükski tähendusnüanss ei jääks kahe silma vahele."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkesõnastik"]}/>

          <Box>
            <Typography id={"tõlkerakendused"} variant={"h3"}>Tõlkerakendused</Typography>
          </Box>

          <Works
            siteLink={"https://tolkevarav.eki.ee/"}
            name={"Tõlkevärav"}
            tekst={"Tegu on EKI ning Haridus- ja Teadusministeeriumi koostöös loodud tõlkerakendusega, mis suudab tuvastada ametlikke tekste (nt õigustekste) ja tõlkida neid eesti, vene, inglise või saksa keelte vahel."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkerakendus", "tasuta"]}/>

          <Works
            siteLink={"https://masintolge.ut.ee/"}
            name={"Neurotõlge"}
            tekst={"Tegu on Tartu Ülikooli juures loodud mitmekeelse masintõlkerakendusega, mis tuvastab ise tõlgitava teksti keele või keeled. Tõlkida saab ka eesti keelest eesti keelde, et saada kätte parandatud kirjutis. Rakenduse eelis on ka võimalus kõrvutada saadud tõlget Tilde ja Google Translate’i tõlgetega."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkerakendus", "tekstikorrektor", "tasuta"]}/>

          <Works
            siteLink={"https://translate.tilde.com/#/"}
            name={"Tilde"}
            tekst={"Tegu on masintõlkerakendusega, mis suudab tõlkida tekste mitmest maailma keelest. Rakendus tõlgib ka üleslaetud tekste."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkerakendus", "tasuta", "tasuline"]}/>

          <Works
            siteLink={"https://translate.google.com/?sl=et&tl=en&op=translate"}
            name={"Google Translate"}
            tekst={"Paljude maailma keelte peal töötav tõlkerakendus, millega on võimalik tõlkida ka terveid veebilehekülgi ja dokumente. Nutiseadmes kasutades võimaldab ka sünkroonset tõlget koostöös nutitelefoni kaameraga. Rakendus töötab paremini pikemate kirjutistega, sest suudab konteksti põhjal paremat tõlget pakkuda. Üksikuid sõnu tõlkides võib esimesel juhul vale variandi pakkuda, kuid esitab seevastu ka tõlkealternatiive."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkerakendus", "tasuta"]}/>


          <Box>
            <Typography id={"meediatekstid"} variant={"h3"}>Meediatekstid</Typography>
          </Box>

          <Box>
            <Typography id={"kirjandus"} variant={"h3"}>Kirjandus</Typography>
          </Box>

          <Box>
            <Typography id={"teadustekstid"} variant={"h3"}>Teadustekstid</Typography>
          </Box>

          <Box>
            <Typography id={"video"} variant={"h3"}>Video</Typography>
          </Box>

          <Box>
            <Typography id={"audio"} variant={"h3"}>Audio</Typography>
          </Box>

          <Box>
            <Typography id={"õppematerjalid"} variant={"h3"}>Õppematerjalid ja harjutused</Typography>
          </Box>

          <Box>
            <Typography id={"õppemängud"} variant={"h3"}>Keeleõppemängud</Typography>
          </Box>

          <Box>
            <Typography id={"keeleõppekeskkonnad"} variant={"h3"}>Keeleõppekeskkonnad</Typography>
          </Box>

          <Box>
            <Typography id={"kursused"} variant={"h3"}>Kursused</Typography>
          </Box>

          <Box>
            <Typography id={"abivahendid"} variant={"h3"}>Õpetaja abivahendid</Typography>
          </Box>

          <Box>
            <Typography id={"keelekorpused"} variant={"h3"}>Eesi keele korpused</Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

export default Links;
