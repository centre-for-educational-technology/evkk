import {Box, styled, Typography} from "@mui/material";
import React from "react";
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SingleLink from "../components/SingleLink";
import {HashLink} from "react-router-hash-link";
import "@fontsource/exo-2/600.css";

function Links() {

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
      height: "auto",
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
        height: "auto"
      }}>
        <Box sx={{position: "sticky", height: "100%", width: "25%", marginTop: "20px", top: "50px"}}>
          <Box
            sx={{
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
                        height: "auto", flexGrow: 1, maxWidth: 400, ".MuiTreeItem-root": {
                          "	.MuiTreeItem-content:hover": classes.hover,
                          ".Mui-focused:not(.Mui-selected)": classes.focused,
                          ".Mui-selected, .Mui-focused.Mui-selected, .Mui-selected:hover":
                          classes.selected
                        }
                      }}
            >
              <TreeItem nodeId={"1"}
                        label={<Typography
                          marginTop={"10px"}>
                          <MenuLink key={"1"}
                                    smooth
                                    to="#tutvustus">Tutvustus</MenuLink>
                        </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"2"}
                        label={<Typography
                          marginTop={"10px"}>
                          <MenuLink key={"2"}
                                    smooth
                                    to="#sõnastikud">Sõnastikud</MenuLink>
                        </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"3"}
                        label={<Typography
                          marginTop={"10px"}>
                          <MenuLink key={"3"}
                                    smooth
                                    to="#tõlkerakendused">Tõlkerakendused</MenuLink>
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
                                           marginTop={"10px"}>
                          <MenuLink to="#eestikeelsed"
                                    smooth>Eestikeelsed tekstid</MenuLink>
                        </Typography>}>
                <TreeItem nodeId={"5"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"4"}
                                      smooth
                                      to="#meediatekstid">Meediatekstid</MenuLink>
                          </Typography>}>

                </TreeItem>
                <TreeItem nodeId={"6"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"4"}
                                      smooth
                                      to="#kirjandus">Kirjandus</MenuLink>
                          </Typography>}>

                </TreeItem>
                <TreeItem nodeId={"7"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"5"}
                                      smooth
                                      to="#teadustekstid">Teadustekstid</MenuLink>
                          </Typography>}>

                </TreeItem>
              </TreeItem>
              <TreeItem nodeId={"8"}
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
                                           marginTop={"10px"}>
                          <MenuLink to="#audiovisuaalne"
                                    smooth>Audiovisuaalne meedia</MenuLink>
                        </Typography>}>
                <TreeItem nodeId={"9"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"6"}
                                      smooth
                                      to="#visuaalne">Sarjad, filmid ja videod</MenuLink>
                          </Typography>}>

                </TreeItem>
                <TreeItem nodeId={"10"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"7"}
                                      smooth
                                      to="#audio">Raadio, audio, taskuhäälingud</MenuLink>
                          </Typography>}>

                </TreeItem>
              </TreeItem>
              <TreeItem nodeId={"11"}
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
                                           marginTop={"10px"}>
                          <MenuLink to="#keeleõppevara"
                                    smooth>Keeleõppevara</MenuLink>
                        </Typography>}>
                <TreeItem nodeId={"12"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"8"}
                                      smooth
                                      to="#õppematerjalid">Õppematerjalid ja harjutused</MenuLink>
                          </Typography>}>

                </TreeItem>
                <TreeItem nodeId={"13"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"9"}
                                      smooth
                                      to="#õppemängud">Keeleõppemängud</MenuLink>
                          </Typography>}>

                </TreeItem>
              </TreeItem>
              <TreeItem nodeId={"14"}
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
                                           marginTop={"10px"}>
                          <MenuLink to="#keskkonnadkursused"
                                    smooth>Keeleõppekeskkonnad ja kursused</MenuLink>
                        </Typography>
                        }>
                <TreeItem nodeId={"15"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"10"}
                                      smooth
                                      to="#keeleõppekeskkonnad">Keeleõppekeskkonnad</MenuLink>
                          </Typography>}>

                </TreeItem>
                <TreeItem nodeId={"16"}
                          label={<Typography
                            marginTop={"10px"}>
                            <MenuLink key={"11"}
                                      smooth
                                      to="#kursused">Kursused</MenuLink>
                          </Typography>}>

                </TreeItem>
              </TreeItem>
              <TreeItem nodeId={"17"}
                        label={<Typography
                          marginTop={"10px"}>
                          <MenuLink key={"12"}
                                    smooth
                                    to="#abiksõpetajale">Abiks õpetajale</MenuLink>
                        </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"18"}
                        label={<Typography
                          marginTop={"10px"}>
                          <MenuLink key={"13"}
                                    smooth
                                    to="#keelekorpused">Eesti keele korpused</MenuLink>
                        </Typography>}>

              </TreeItem>
            </TreeView>
          </Box>
        </Box>

        <Box sx={{
          padding: "50px",
          paddingTop: "0",
          width: "75%",
          height: "auto",
          marginBottom: "50px",
        }}>
          <Box id={"tutvustus"}>
            <Typography align={"center"}
                        padding={"50px"}
                        paddingTop={"25px"}>ELLE eesmärk on eesti keele õpet igati toetada, mistõttu oleme
              lingikogusse koondanud hulgaliselt erinevaid keskkondi, millest võib kasu olla nii eesti keele õppijatele,
              õpetajatele kui ka keeleteadlastele. Kui ELLEst jääb väheks, siis ehk leiad sobiliku lehe siit! Kui ei,
              siis anna meile teada!</Typography>
          </Box>

          <Box>
            <Typography id={"sõnastikud"}
                        variant={"h3"}>Sõnastikud</Typography>
          </Box>

          <SingleLink
            siteLink={"https://sonaveeb.ee/"}
            name={"Sõnaveeb"}
            tekst={"Keskkond koondab mitmeid sõnaraamatuid ja andmebaase, et anda võimalikult detailne ülevaade otsitud sõnast või väljendist. Sõnaveebist saad abi, kui tahad näiteks näha sõna kasutuskontekstis, leida tema tähendused, muutevormid, päritoluinfo, sünonüümid või uurida, milliste sõnadega ta tavaliselt koos esineb.\n"}
            image={"https://drive.google.com/uc?export=view&id=1CFtNhxomi3ON8A42emE7rezj_ulxkzLz"}
            tags={["koondsõnastik", "terminisõnastik"]}/>

          <SingleLink
            siteLink={"https://sonaveeb.ee/lite"}
            name={"Keeleõppija Sõnaveeb"}
            tekst={"Keeleõppijatele suunatud lihtsustatud sõnastik koos piltidega."}
            image={"https://drive.google.com/uc?export=view&id=1N-RsFDi9QJyS9IVVMjI5kzoNVumFhVyN"}
            tags={["keeleõppesõnastik"]}/>

          <SingleLink
            siteLink={"https://portaal.eki.ee/sonaraamatud.html"}
            name={"EKI sõnaraamatud"}
            tekst={"Eesti keele instituut (EKI) on loonud suurema osa Eestis kasutatavatest sõnastikest ja lingid eraldi sõnastikele on leitavad nende koduleheküljelt. Siit leiad nii eesti keele sõnastikke, terminisõnastikke kui ka murdesõnaraamatuid ja sugulaskeelte sõnastikke."}
            image={"https://drive.google.com/uc?export=view&id=1hpB4J8VUdmcw1_Z4huLdm_UNTKfxb3YM"}
            tags={["sõnaraamatud", "terminisõnastik", "murdesõnastik", "sugulaskeeled"]}/>

          <SingleLink
            siteLink={"https://glosbe.com/"}
            name={"Glosbe"}
            tekst={"Mitmekeelne veebisõnastik, mis sisaldab tõlkeid, sõnatähendusi, võrreldavaid lauseid kahes keeles ja hulgaliselt näitelauseid. Sõnastikku on kasutajatel võimalik ise täiendada, et ükski tähendusnüanss ei jääks kahe silma vahele."}
            image={"https://drive.google.com/uc?export=view&id=1h_cFEWzrzrIkS8WebV-PoujcIpNCFtW7"}
            tags={["tõlkesõnastik"]}/>

          <Box>
            <Typography id={"tõlkerakendused"}
                        variant={"h3"}>Tõlkerakendused</Typography>
          </Box>

          <SingleLink
            siteLink={"https://tolkevarav.eki.ee/"}
            name={"Tõlkevärav"}
            tekst={"Tegu on EKI ning Haridus- ja Teadusministeeriumi koostöös loodud tõlkerakendusega, mis suudab tuvastada ametlikke tekste (nt õigustekste) ja tõlkida neid eesti, vene, inglise või saksa keelte vahel."}
            image={"https://drive.google.com/uc?export=view&id=1hpB4J8VUdmcw1_Z4huLdm_UNTKfxb3YM"}
            tags={["tõlkerakendus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://masintolge.ut.ee/"}
            name={"Neurotõlge"}
            tekst={"Tegu on Tartu Ülikooli juures loodud mitmekeelse masintõlkerakendusega, mis tuvastab ise tõlgitava teksti keele või keeled. Tõlkida saab ka eesti keelest eesti keelde, et saada kätte parandatud kirjutis. Rakenduse eelis on ka võimalus kõrvutada saadud tõlget Tilde ja Google Translate’i tõlgetega."}
            image={"https://drive.google.com/uc?export=view&id=1ggqhb-CUfaZo8nb3vcEgT5EwSuFKVseZ"}
            tags={["tõlkerakendus", "tekstikorrektor", "tasuta"]}/>

          <SingleLink
            siteLink={"https://translate.tilde.com/#/"}
            name={"Tilde"}
            tekst={"Tegu on masintõlkerakendusega, mis suudab tõlkida tekste mitmest maailma keelest. Rakendus tõlgib ka üleslaetud tekste."}
            image={"https://drive.google.com/uc?export=view&id=1TYSjJXfs8UGaCi8cZZ3bHIhqO4QKSwcP"}
            tags={["tõlkerakendus", "tasuta", "tasuline"]}/>

          <SingleLink
            siteLink={"https://translate.google.com/?sl=et&tl=en&op=translate"}
            name={"Google Translate"}
            tekst={"Paljude maailma keelte peal töötav tõlkerakendus, millega on võimalik tõlkida ka terveid veebilehekülgi ja dokumente. Nutiseadmes kasutades võimaldab ka sünkroonset tõlget koostöös nutitelefoni kaameraga. Rakendus töötab paremini pikemate kirjutistega, sest suudab konteksti põhjal paremat tõlget pakkuda. Üksikuid sõnu tõlkides võib esimesel juhul vale variandi pakkuda, kuid esitab seevastu ka tõlkealternatiive."}
            image={"https://drive.google.com/uc?export=view&id=1KuUuAkLhIREE4pI1Gx5QvXj1Wo7wCoZf"}
            tags={["tõlkerakendus", "tasuta"]}/>


          <Box>
            <Typography id={"eestikeelsed"}
                        variant={"h3"}>Eestikeelsed tekstid</Typography>
          </Box>
          <br/>
          <Box>
            <Typography id={"meediatekstid"}
                        variant={"h4"}>Meediatekstid</Typography>
          </Box>

          <SingleLink
            siteLink={"https://www.err.ee/"}
            name={"ERR uudised"}
            tekst={"Eesti riiklik uudisteportaal, mille sisu vaatamise eest ei pea maksma. Lisaks uudistele saab sellelt lehelt ligi ka sama konsortsiumi alla kuuluvale tele- ja raadiosisule."}
            image={"https://drive.google.com/uc?export=view&id=15QpqrBKcrwvHs1maYx_IJf-ZjBiOkGxH"}
            tags={["uudised", "tasuta"]}/>

          <SingleLink
            siteLink={"https://sirp.ee/"}
            name={"Sirp"}
            tekst={"Tegu on kõikvõimalikke kultuuriteemasid käsitleva ajakirjaga, mida on veebist võimalik tasuta lugeda."}
            image={"https://drive.google.com/uc?export=view&id=1uTIszM3WawpQc5HyEywCfb7JP8A1-GF6"}
            tags={["uudised", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.ohtuleht.ee/"}
            name={"Õhtuleht"}
            tekst={"Õhtulehe Kirjastuse uudisteportaal, kus on lisaks Õhtulehele lingitud ka mitmed teised kirjastuse väljaantavad ajakirjad. Uudiste eest on valdavalt vaja maksta, kuid mõned lühemad uudised on ka tasuta kättesaadavad."}
            image={"https://drive.google.com/uc?export=view&id=1km7N4AWQq-J4UG8u7FvGpMhNhvHyYlxU"}
            tags={["uudised", "tasuline"]}/>

          <SingleLink
            siteLink={"https://www.postimees.ee/"}
            name={"Postimees"}
            tekst={"Valdavalt tasuline uudisteportaal. Lehel on võimalik kuulata ka Postimehe taskuhäälinguid."}
            image={"https://drive.google.com/uc?export=view&id=1cZ1--oBFr7YAaKw8G0fZhgi-a1SnJ-NN"}
            tags={["uudised", "tasuline", "taskuhääling"]}/>

          <SingleLink
            siteLink={"https://www.delfi.ee/"}
            name={"Delfi"}
            tekst={"Üks Ekspress Meedia pakutavatest veebiuudiste portaalidest, kus on valdavalt tasuline sisu. Lehel on lingitud ka teised konsortiumile kuuluvad ajalehed. Siit on võimalik ligi saada ka Delfi taskuhäälingutele."}
            image={"https://drive.google.com/uc?export=view&id=14IQGdZQle-bD2R8NeGCx5sSvPSIB0lqW"}
            tags={["uudised", "tasuline", "taskuhääling"]}/>

          <Box>
            <Typography id={"kirjandus"}
                        variant={"h4"}>Kirjandus</Typography>
          </Box>

          <SingleLink
            siteLink={"https://ellu.keskraamatukogu.ee/"}
            name={"E-raamatukogu ELLU"}
            tekst={"Tallinna Keskraamatukogu e-raamatukogu, kust on võimalik laenutada nii eesti-, vene- kui ka ingliskeelset kirjandust."}
            image={"https://drive.google.com/uc?export=view&id=1K6wyWiwGHm5ZgJ-JaYJ1EdBou-phfLpz"}
            tags={["e-raamatud", "raamatud", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.digar.ee/arhiiv/et"}
            name={"DIGAR digitaalarhiiv"}
            tekst={"Eesti Rahvusraamatukogu digitaalarhiiv, mis sisaldab rohkelt raamatuid ja ajakirju erinevatest ajaperioodidest. Arhiivis sisalduvad raamatud ja ajakirjad ei ole alati avalikkusele kättesaadavad, kuid neid, mis on, võib tasuta lugeda kõikjal või ainult Eesti Rahvusraamatukogu sisevõrgus."}
            image={"https://drive.google.com/uc?export=view&id=1BxteIsSE2HntssU3VsVRCZNmUvH-6hhg"}
            tags={["raamatud", "ajakirjad", "arhiiv", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.poogen.ee/"}
            name={"Poogen"}
            tekst={"Kirjandusportaal, kus kasutajad saavad ise oma loomingut avaldada. Sealt võib leida nii eestikeelset proosat, luulet, näidendeid kui ka arvamusartikleid."}
            image={"https://drive.google.com/uc?export=view&id=1FkCOYc8toG8TWPfZgvXInkSM0hEm1mt1"}
            tags={["kirjandus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.digiraamat.ee/index/index/tab/free"}
            name={"Digiraamat"}
            tekst={"E-raamatupood, kus leidub nii tasuta kui ka tasulisi raamatuid ja ajakirju."}
            image={"https://drive.google.com/uc?export=view&id=1vujDxlqqCWA-iv-gd6fJpDFHKM_smyyD"}
            tags={["e-raamatud", "e-ajakirjad", "raamatud", "ajakirjad", "tasuta", "tasuline"]}/>

          <SingleLink
            siteLink={"https://www.kriso.ee/cgi-bin/shop/freeebooks.html"}
            name={"Krisostomuse tasuta e-raamatud"}
            tekst={"Krisostomuse raamatukaupluse e-pood, kust on võimalik lisaks tasulistele raamatutele leida ka mitmeid tasuta raamatuid ja ajakirju."}
            image={"https://drive.google.com/uc?export=view&id=1aPtDChOU4nSX64XbIIdkkTSxbELJKv0A"}
            tags={["e-raamatud", "e-ajakirjad", "raamatud", "ajakirjad", "tasuta", "tasuline"]}/>

          <SingleLink
            siteLink={"https://galerii.kirmus.ee/grafo/grupp.php?id=3"}
            name={"Grafo vanemate lasteraamatute arhiiv"}
            tekst={"Eesti Kirjandusmuuseumi Arhiivraamatukogu on sellele lehele koondanud mitmeid vanemaid trükiseid, kuid eesti keele õppijatele ja eriti lastele võiksid huvi pakkuda lehelt leitavad lasteraamatud."}
            image={"https://drive.google.com/uc?export=view&id=1NiZYqlyMWMfdCzOLBUMuuFrucDguHvwU"}
            tags={["raamatud", "tasuta", "arhiiv", "lastele"]}/>

          <SingleLink
            siteLink={"https://kreutzwald.kirmus.ee/"}
            name={"Kreutzwaldi sajand"}
            tekst={"Eesti Kirjandusmuuseumi keskkond, kust võib leida 19. ja 20. sajandil ilmunud eestikeelset kirjandust."}
            image={"https://drive.google.com/uc?export=view&id=1aCc37o4uNxbvYT-ohSTmTi_qCdL-fkEi"}
            tags={["raamatud", "e-raamatud", "tasuta", "arhiiv"]}/>

          <Box>
            <Typography id={"teadustekstid"}
                        variant={"h4"}>Teadustekstid</Typography>
          </Box>

          <SingleLink
            siteLink={"https://www.etera.ee/"}
            name={"ETERA"}
            tekst={"Tallinna Ülikooli Akadeemilise Raamatukogu e-raamatukogu, kust leiab nii lõputöid kui ka vanemaid digiteeritud ajalehti ja raamatuid. Kõik teavikud on tasuta loetavad, kuid mõne lugemiseks on tarvis olla Tallinna Ülikooli või akadeemilise raamatukogu sisevõrgus."}
            image={"https://drive.google.com/uc?export=view&id=1h4MlFs9-VEjJATCGAFy60WxlY6cIA4oV"}
            tags={["lõputööd", "õpikud", "ajalehed", "ajakirjad", "raamatud", "tasuta", "arhiiv"]}/>

          <SingleLink
            siteLink={"https://digikogu.taltech.ee/"}
            name={"TalTechi digikogu"}
            tekst={"Tallinna Tehnikaülikooli raamatukogu digikogu, mis sisaldab suuresti TalTechis kaitstud lõputöid, kuid ka muid ülikooliga seotud publikatsioone ja õppetööks vajalikke õpikuid. Kõik teavikud on tasuta kättesaadavad, kuid mõne lugemiseks on tarvis olla TalTechi raamatukogu sisevõrgus."}
            image={"https://drive.google.com/uc?export=view&id=1ZFMBNG9B5Uod4SSAuIPiEPkwhGgVO2CA"}
            tags={["lõputööd", "õpikud", "ajakirjad", "tasuta", "arhiiv"]}/>

          <SingleLink
            siteLink={"https://dspace.ut.ee/"}
            name={"DSpace"}
            tekst={"Tartu Ülikooli raamatukogu digitaalne arhiiv, mis sisaldab nii lõputöid kui ka digiteeritud raamatuid ajakirju ja käsikirju. Arhiivist leitu on tasuta loetav ja allalaaditav."}
            image={"https://drive.google.com/uc?export=view&id=1JiA0HOt_iPROyISkmKUqiCx6q69MDcnT"}
            tags={["lõputööd", "õpikud", "raamatud", "ajakirjad", "tasuta", "arhiiv"]}/>

          <Box>
            <Typography id={"audiovisuaalne"}
                        variant={"h3"}>Audiovisuaalne meedia</Typography>
          </Box>
          <br/>
          <Box>
            <Typography id={"visuaalne"}
                        variant={"h4"}>Sarjad, filmid ja videod</Typography>
          </Box>

          <SingleLink
            siteLink={"https://jupiter.err.ee/video"}
            name={"Jupiter"}
            tekst={"Eesti Rahvusringhäälingu videoportaal, kust võib leida nii eestikeelseid kui ka eestikeelsete subtiitritega välismaiseid filme, sarju ja telesaateid. Lisaks on lehel võimalik otse vaadata ETV-d, ETV2-te ja ETV+. Keskkond on tasuta, kuid mõne video vaatamiseks tuleb sisse logida."}
            image={"https://drive.google.com/uc?export=view&id=1-Nhd6bHMLU1mON4StyausnOs1e_gl3Um"}
            tags={["televisioon", "tasuta", "saated", "sarjad", "filmid"]}/>

          <SingleLink
            siteLink={"https://lasteekraan.err.ee/"}
            name={"Lasteekraan"}
            tekst={"Tegu on Eesti Rahvusringhäälingu lastelehega, kus pakutakse mitmete multikate, lastesaadete ja mängude kõrval ka eestikeelseid audioraamatuid. Keskkond on kõigile tasuta, kuid mõne videosisu vaatamiseks peab sisse logima."}
            image={"https://drive.google.com/uc?export=view&id=1_GLgf8TfImI9K6xJ9VUNYzz2YkB_VQ3e"}
            tags={["tasuta", "lastele", "audioraamatud", "saated", "sarjad", "filmid"]}/>

          <SingleLink
            siteLink={"https://arhiiv.err.ee/"}
            name={"ERR arhiiv"}
            tekst={"Eesti Rahvusringhäälingu video- ja audioarhiiv, mis sisaldab vanemaid eestikeelseid filme, videosid, pilte ja raadiosaateid, kuid kuhu on koondatud ka Tallinna Ülikooli Balti Filmi- ja Meediakooli üliõpilaste loodud sisu. Keskkond on kõigile tasuta kättesaadav."}
            image={"https://drive.google.com/uc?export=view&id=1PMUQg2vuLdpcOglp27AWRh6r1w68Izaj"}
            tags={["tasuta", "saated", "sarjad", "filmid", "arhiiv"]}/>

          <SingleLink
            siteLink={"https://kanal2.postimees.ee/pluss/avaleht"}
            name={"Kanal 2 veebi TV"}
            tekst={"Kanal 2 veebikeskkond, kust on võimalik vaadata filme, saateid ja sarju. Lisaks on võimalik vaadata otse Kanal 2 telekanaleid. Tasuta on keskkonnas vaid mõningad eestimaised saated, kuid filmide, sarjade ja otsetelevisiooni vaatamine on tasuline."}
            image={"https://drive.google.com/uc?export=view&id=1am6cs8gDv925GaNVdnSGbfsrw4tFdzQa"}
            tags={["televisioon", "filmid", "saated", "sarjad", "tasuline"]}/>

          <SingleLink
            siteLink={"https://play.tv3.ee/"}
            name={"TV3 Play"}
            tekst={"TV3 veebikeskkond, kust on kõigil võimalik tasuta vaadata mõningaid TV3 eetris olnud saateid, sarju ja filme. Selleks, et sisu vaadata tuleb lehel välja lülitada oma reklaamiblokeerija."}
            image={"https://drive.google.com/uc?export=view&id=1VDCfSsqHUY4rY_K23lXtP_d41P_FLNJd"}
            tags={["sarjad", "saated", "filmid", "tasuta"]}/>

          <SingleLink
            siteLink={"https://go3.tv/"}
            name={"Go3"}
            tekst={"TV3 tasuline veebikeskkond, kust on võimalik vaadata filme, sarju, saateid ja ka neid laenutada. Seal on võimalik otse vaadata ka erinevaid telekanaleid, mitte ainult neid, mis kuuluvad TV3 Gruppi. Keskkond toimib ka välismaal, kuid registreerudes on vaja esitada Eesti telefoninumber."}
            image={"https://drive.google.com/uc?export=view&id=16yw1CLwj8W--FycA8zbt7RfRvy5Xqh7v"}
            tags={["sarjad", "saated", "filmid", "videolaenutus", "tasuline", "televisioon"]}/>

          <Box>
            <Typography id={"audio"}
                        variant={"h4"}>Raadio, audio, taskuhäälingud</Typography>
          </Box>

          <SingleLink
            siteLink={"https://r4.err.ee/1011175/keelekodi-urok-jestonskogo-jazyka"}
            name={"Keelekõdi"}
            tekst={"Raadio 4 taskuhääling vene emakeelega keeleõppijatele. Õpetatakse eesti keele grammatikat ja väljendeid."}
            image={"https://drive.google.com/uc?export=view&id=1ATGaZgiFVif2mLYikN8hTF_AmPWyw18z"}
            tags={["taskuhääling"]}/>

          <SingleLink
            siteLink={"https://podcastid.ee/eesti-podcastid-kategooriatena/"}
            name={"Eesti podcastid"}
            tekst={"Keskkond koondab erinevatel platvormidel avaldatud eestikeelseid taskuhäälinguid ja jagab need temaatilistesse kategooriatesse."}
            image={"https://drive.google.com/uc?export=view&id=16-7VGLyQSzIUul73rwF6mmV3D3riVyFi"}
            tags={["taskuhääling"]}/>

          <SingleLink
            siteLink={"https://vikerraadio.err.ee/"}
            name={"Vikerraadio"}
            tekst={"Eesti Rahvusringhäälingu raadiojaam, kust kuuleb lisaks muusikale ka mitmeid kultuuri- ja vestlussaateid."}
            image={"https://drive.google.com/uc?export=view&id=1bX_kmRY_DtM-PGPUP2pp93fG77Vpl3cj"}
            tags={["raadio"]}/>

          <SingleLink
            siteLink={"https://r2.err.ee/"}
            name={"Raadio 2"}
            tekst={"Eesti Rahvusringhäälingu raadiokanal, kus mängitakse rohkelt uut muusikat nii Eestist kui ka välismaalt. Lisaks on eetris ka rohkelt vestlussaateid."}
            image={"https://drive.google.com/uc?export=view&id=1jTr406uNCqssOqXXwJhrFClHVquHn8Ai"}
            tags={["raadio"]}/>

          <SingleLink
            siteLink={"https://sky.ee/tag/skyplus/#SkyPlus"}
            name={"SkyPlus"}
            tekst={"Sky Media meelelahutuslik raadiokanal, kus on rohkelt muusikat, kuid ka raadiomänge ja vestlussaateid. Sky muusikaportaali lehel on ka linke teistele sama konsortsiumi raadiokanalitele ja taskuhäälingutele. Lisaks on seal ka mitmeid meelelahutuslikke uudiseid nii Eestist kui ka välismaalt."}
            image={"https://drive.google.com/uc?export=view&id=18Wt5UMjz_E4Gn2AEZlCpyN9tXjPeLlPE"}
            tags={["raadio", "uudised", "taskuhääling"]}/>

          <SingleLink
            siteLink={"https://kuku.postimees.ee/"}
            name={"Kuku raadio"}
            tekst={"Rohkelt uudiseid, päevakajalisi vestlussaateid ja veidike muusikat sisaldav raadiokanal."}
            image={"https://drive.google.com/uc?export=view&id=19j9hFiAuAvGJTt7pwazWG3AZBBuZruOa"}
            tags={["raadio", "uudised"]}/>

          <SingleLink
            siteLink={"https://jupiter.err.ee/raadioteater"}
            name={"Raadioteater"}
            tekst={"Eesti Rahvusringhäälingu kuuldemängude kogumik, mis sisaldab mitmetes raadiokanalites esitatud järjejutte ja raadioteatri etendusi, kuid ka vestlussaateid eesti keele ja sugulaskeelte teemadel."}
            image={"https://drive.google.com/uc?export=view&id=1-Nhd6bHMLU1mON4StyausnOs1e_gl3Um"}
            tags={["kuuldemäng", "järjejutt"]}/>

          <Box>
            <Typography id={"keeleõppevara"}
                        variant={"h3"}>Keeleõppevara</Typography>
          </Box>
          <br/>
          <Box>
            <Typography id={"õppematerjalid"}
                        variant={"h4"}>Õppematerjalid ja harjutused</Typography>
          </Box>

          <SingleLink
            siteLink={"https://sonaveeb.ee/learn"}
            name={"Sõnaveebi keeleõpe"}
            tekst={"Eesti Keele Instituudi keeleõppematerjalide lehekülg Sõnaveebis, millest saavad kasu nii algajad keeleõppijad kui ka emakeelekõnelejad. Lehekülg sisaldab muuhulgas piltsõnastikku, kasulikke fraase ja põhilisi õigekirjareegleid, kuid õpetatakse ka vormistama tabeleid ja loetelusid või e-kirju ja avaldusi."}
            image={"https://drive.google.com/uc?export=view&id=1CFtNhxomi3ON8A42emE7rezj_ulxkzLz"}
            tags={["õigekiri", "vormistus", "algaja keeleõppija", "õppematerjal", "tasuta"]}/>

          <SingleLink
            siteLink={"https://eki.ee/teatmik/"}
            name={"EKI Teatmik"}
            tekst={"Eesti õigekeelsuskäsiraamat, mis sisaldab mitmesugust teavet tänapäeva eesti keele kohta, sh keelenõuandeid, seisukohavõtte, loendeid jm."}
            image={"https://drive.google.com/uc?export=view&id=1hpB4J8VUdmcw1_Z4huLdm_UNTKfxb3YM"}
            tags={["õppematerjal", "õigekiri", "vormistus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.taskutark.ee/aine/eesti-keel/"}
            name={"Taskutark"}
            tekst={"Õppematerjalid ja harjutused, mis on jaotatud erinevate kooliastmete, klasside ja õppeainete kaupa. Eesti keele materjalide seast võib õppida nii keele- kui ka vormistusreegleid ja testida oma teadmisi. Algklassidele mõeldud materjalid on igati sobivad ka algajale keeleõppijale."}
            image={"https://drive.google.com/uc?export=view&id=1z0BVFgeW16aBOj-dq35OjFCXelqE1EbO"}
            tags={["õppematerjal", "harjutus", "õigekiri", "vormistus", "tasuta", "tasuline"]}/>

          <SingleLink
            siteLink={"https://e-koolikott.ee/"}
            name={"E-koolikott"}
            tekst={"Rohkelt digitaalseid õppematerjale ja harjutusi sisaldav keskkond, kus on õppematerjalid jaotatud kooliastmete järgi. Sealt võib leida õppevara nii eesti emakeelega õpilastele kui ka eesti keelt teise keelena kõnelevatele õppijatele. Osa materjale on lehele vistutatud ja neid on võimalik kohe eKoolikotis teha, kuid osa on esitatud linkidena teistele lehtedele või töölehena allalaaditavad."}
            image={"https://drive.google.com/uc?export=view&id=13KcmNDsRanaNj5f6glNK-tS-nF-ygLia"}
            tags={["õppematerjal", "harjutus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.opiq.ee/Search/Kits?searchPhrase=&CurriculumGroup=&classcourse=&subject=Estonian&publishinghouse=&package=&language=&sortingorder=LanguageFirst"}
            name={"Opiq"}
            tekst={"E-õpikute kogumik, mis sisaldab mitme erineva õppeaine jaoks loodud sisu. Eesti keele õpikutest leiad nii õppematerjale kui ka nende juurde käivaid harjutusi. Kooliõpilastele, kel on eKooli või Stuudiumi konto, on Opiq üldjuhul tasuta, kuid erakasutajale on Opiq-u kasutamine kuutasuline, kusjuures tasuta tutvumiseks on tihtipeale kättesaadav esimene peatükk."}
            image={"https://drive.google.com/uc?export=view&id=1ZlUZXLgG9RRWH3t_nsq53yySMPWuhQd4"}
            tags={["õpikud", "tasuta", "tasuline", "õppematerjal", "harjutus"]}/>

          <SingleLink
            siteLink={"https://eis.ekk.edu.ee/eis/lahendamine?rid=13177091685934061&sort=ylesanne.id&psize=&id=&aine=E&aste=&kvaliteet=&teema=&alateema=&ylkogu_id=&testiliik=&keeletase=&lang=&kysimus=&otsi=1"}
            name={"EISi eesti keele tasemetestid"}
            tekst={"Siit leiad õppeainete kaupa jaotatud eksamiülesannete kogumiku. Harjutusi on kõigil võimalik teha tasuta ja sisse logimata."}
            image={"https://drive.google.com/uc?export=view&id=1QfW3MzFNqkNTRcT1pjwOajhQb7JsIHNr"}
            tags={["harjutus", "tasuta", "eksam"]}/>

          <SingleLink
            siteLink={"http://web.meis.ee/testest/goto.php?target=root_1&client_id=integratsioon"}
            name={"Eesti keele tasemetestid"}
            tekst={"Siit leiad näidisülesandeid, mis aitavad sul eesti keele tasemeeksamiks ette valmistuda. Lehelt leiad nii automaatse tagasisidega kui ka tagasisideta teste, mis annavad aimu tasemeeksami ja selle ülesannete ülesehitusest."}
            image={"https://drive.google.com/uc?export=view&id=1JvbfyiEYYfBprwmxUdgzlOmTGAnMgjOn"}
            tags={["harjutus", "tasuta", "eksam"]}/>

          <SingleLink
            siteLink={"http://keeleabi.eki.ee/?leht=11"}
            name={"EKI keelenõuande testid"}
            tekst={"Eesti keele teadmisi kontrollivad valikvastustega testid."}
            image={"https://drive.google.com/uc?export=view&id=1hpB4J8VUdmcw1_Z4huLdm_UNTKfxb3YM"}
            tags={["harjutus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.tandm.ee/harjutused/"}
            name={"Tandm"}
            tekst={"Vene emakeelega õppijatele suunatud keskkond, kus on võimalik leida tasemeeksami näidiseid ja õppida nii sõnavara kui ka grammatikat."}
            image={"https://drive.google.com/uc?export=view&id=1YaNAMmVBJadg00pRsignnE896I7yJ_Hi"}
            tags={["harjutus", "õppematerjal", "eksam", "tasuta"]}/>

          <Box>
            <Typography id={"õppemängud"}
                        variant={"h4"}>Keeleõppemängud</Typography>
          </Box>

          <SingleLink
            siteLink={"https://k44nuk.ee/"}
            name={"Käänuk"}
            tekst={"Mäng, mis õpetab sihitist õigesti kasutama, esitades mängijale lühikesi valikvastustega täidetavaid koomikseid. Mänguga käib kaasas ka EKI sihitisesõnastik."}
            image={"https://drive.google.com/uc?export=view&id=1dLjlhWS4te8iTmBHwBHHm8u6wGPUehrP"}
            tags={["mäng", "arvuti", "tasuta"]}/>

          <SingleLink
            siteLink={"https://play.google.com/store/apps/details?id=com.AblasAlpa.AlpaOnUnity&hl=en_US&gl=US"}
            name={"ALPA Kids"}
            tekst={"Eestikeelsed digiõppemängud, mis sobivad eriti lastele või algajatele keeleõppijatele. Teenus on saadaval vaid nutiseadmes ja on tasuline, kuid seevastu reklaamivaba."}
            image={"https://drive.google.com/uc?export=view&id=1JAYRzUF2asdkorhdtcPeOt4vTta7Sjgy"}
            tags={["tasuline", "mäng", "nutiseade", "lastele"]}/>

          <SingleLink
            siteLink={"http://www11.edu.fi/retki_viroon/"}
            name={"Retk Eestisse"}
            tekst={"Eesti kultuuri tutvustav keelemäng algkooliõpilastele või algajatele keeleõppijatele. Mängija saab külastada kaardil mitut Eesti linna, tutvuda kohaliku kultuuriga, mängida minimänge ja teha õigekirjaharjutusi."}
            image={"https://drive.google.com/uc?export=view&id=1_jwMv_zFuqB7YAygeh_tJ5WOcqgvjyi2"}
            tags={["tasuta", "mäng", "arvuti", "harjutus", "lastele"]}/>

          <SingleLink
            siteLink={"https://sonaveeb.ee/games"}
            name={"Sõnaveebi keelemängud"}
            tekst={"Sõnaveebi keeleõppemängud, millest osad on sobilikud kõigile keeleõppijatele, osad aga vene emakeelega õppijatele. Mängudes tuleb hinnata, kas tegu on eestikeelse sõnaga või leida, kumb esitatud sõnapaaridest on üksteisele sarnasemad."}
            image={"https://drive.google.com/uc?export=view&id=1CFtNhxomi3ON8A42emE7rezj_ulxkzLz"}
            tags={["tasuta", "mäng", "arvuti", "nutiseade"]}/>

          <SingleLink
            siteLink={"https://keeleressursid.ee/et/keelemangud"}
            name={"Keeleressursside keskuse \"Keelemängud\""}
            tekst={"Keeleressursside keskuse koondatud keelemängude loetelu. Mängi näiteks sõnaseletusmängu Alias või loo lõbusaid anagramme oma nimest anagrammimasinaga."}
            image={"https://drive.google.com/uc?export=view&id=1ILNuAqyQkvQnTukp_qjGdZezK6HOhHJG"}
            tags={["tasuta", "mäng", "arvuti"]}/>

          <Box>
            <Typography id={"keskkonnadkursused"}
                        variant={"h3"}>Keeleõppekeskkonnad ja kursused</Typography>
          </Box>
          <br/>
          <Box>
            <Typography id={"keeleõppekeskkonnad"}
                        variant={"h4"}>Keeleõppekeskkonnad</Typography>
          </Box>

          <SingleLink
            siteLink={"https://keeleklikk.ee/"}
            name={"Keeleklikk ja Keeletee"}
            tekst={"Tasuta eesti keele veebikursused algajatele ja juba edasijõudnud õppijatele, kättesaadavad nii vene kui ka inglise keeles. Keskkonnas on nii videopõhiseid õppematerjale kui ka automaatse tagasisidega harjutusi. Lisaks on õppijatel võimalik saada vahetut tagasisidet kirjutades päris eesti keele õpetajale."}
            image={"https://drive.google.com/uc?export=view&id=1WjeQYyy23AK6kRuy8QgESKLUw5BVlzr5"}
            tags={["e-kursus", "tasuta", "keeleõppekeskkond", "arvuti", "nutiseade"]}/>

          <SingleLink
            siteLink={"https://speakly.me/"}
            name={"Speakly"}
            tekst={"Tasuline keeleõppekeskkond, kus saab õppida statistiliselt kõige olulisemaid eesti keele sõnu ja lauseid. Selleks on keskkonnas nii lugemis-, kuulamis-, rääkimis-, kui ka kirjutamisülesandeid."}
            image={"https://drive.google.com/uc?export=view&id=1RxFsT43IL2NfnqtVtsRMqShuFp1CHQfK"}
            tags={["tasuline", "keeleõppekeskkond", "arvuti", "nutiseade"]}/>

          <SingleLink
            siteLink={"https://walktalk.ee/"}
            name={"WalkTalk"}
            tekst={"Asukohapõhine keeleõpperakendus, mis aitab õppijal omandada väljendeid, mida just neis kohtades, nt poes, tänaval või kohvikus vaja võiks minna. Keskkond on saadaval vaid nutiseadmes ja on tasuline."}
            image={"https://drive.google.com/uc?export=view&id=17bsl_nH3Oc6Y6VkxhSi9Zq1ZfqcAil4v"}
            tags={["tasuline", "nutiseade", "keeleõppekeskkond"]}/>

          <SingleLink
            siteLink={"https://multikey.app/"}
            name={"Multikey"}
            tekst={"Suhtluspõhine tasuta keeleõppekeskkond, mis viib kokku erinevate emakeeltega keeleõppijad ja võimaldab neil õpitavaid keeli harjutada. Keskkonnas leiad lisaks suhtlusvõimalustele ka linke üritustele, kus keeleõppijad vahetult kokku saavad."}
            image={"https://drive.google.com/uc?export=view&id=1EUkLWDGiFFDYJuk3xeU09gfG_Kjz-ZYi"}
            tags={["tasuta", "nutiseade", "keeleõppekeskkond", "suhtlus"]}/>

          <SingleLink
            siteLink={"https://languagedrops.com/"}
            name={"Drops"}
            tekst={"Visuaalne ja mänguline keeleõppekeskkond, kus rõhk on suuresti õpitava keele sõnade treenimisel ja nende sidumisel mälus vastava pildiga. Keskkond on kasutatav nii arvutis kui ka nutiseadmes. Tasuline versioon on reklaamivaba ja piiramatu mänguajaga."}
            image={"https://drive.google.com/uc?export=view&id=1y4y5OwGiGdBJqd9nDmm15ggSvq77Tj5T"}
            tags={["tasuta", "tasuline", "nutiseade", "arvuti", "keeleõppekeskkond"]}/>

          <Box>
            <Typography id={"kursused"}
                        variant={"h4"}>Kursused</Typography>
          </Box>

          <SingleLink
            siteLink={"https://yleilmakool.ee/oppetoo/"}
            name={"Üleilmakool"}
            tekst={"Kindlal ajal toimuvad eestikeelsed e-kursused Moodle-i keskkonnas. Lisaks eesti keele kursustele on lehelt leitavad ka mõningate teiste õppeainete kursused nii kooliõpilastele kui ka täiskasvanutele. Kursustele saab tasuta registreeruda, kuid individuaaltunnid õpetajaga on tasulised."}
            image={"https://drive.google.com/uc?export=view&id=1aukACUn-pcbrdn2ChlG6rgUfZ6rXr83i"}
            tags={["e-kursus", "tasuta", "tasuline", "suhtlus"]}/>

          <SingleLink
            siteLink={"http://eestikeel.ee/"}
            name={"Eesti keele kursus lastele"}
            tekst={"Tasuta e-kursus eesti emakeelega lastele. Kursusel saab teha erinevaid eestikeelseid harjutusi, täita lapsevanema väljaprinditud töölehti kui ka kuulata eestikeelseid laule ja vaadata multifilme."}
            image={"https://drive.google.com/uc?export=view&id=1Dv1a6_Q7gNfDgHKdf8_M0gwyxvAtCRMz"}
            tags={["e-kursus", "tasuta", "lastele"]}/>

          <SingleLink
            siteLink={"https://integratsioon.ee/eesti-keele-kohvikud"}
            name={"Keelekohvikud"}
            tekst={"Integratsiooni Sihtasutuse korraldatavad keelekohvikud, kus avaneb keeleõppijatel võimalus teistega vahetult eesti keeles suhelda ja nii keelt praktiliselt õppida."}
            image={"https://drive.google.com/uc?export=view&id=1NDL2lN76JGHJkkU3Vylbn_1oHJ7FZOk5"}
            tags={["suhtlus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://ekkm.estinst.ee/eesti-keele-ope-valismaal/"}
            name={"Eesti keel ja kultuur maailmas"}
            tekst={"Integratsiooni Sihtasutuse korraldatavad keelekohvikud, kus avaneb keeleõppijatel võimalus teistega vahetult eesti keeles suhelda ja nii keelt praktiliselt õppida."}
            image={"https://drive.google.com/uc?export=view&id=1YpQwywe7WJofG4weyQdbJ3p1aZD-eL4y"}
            tags={["kursus"]}/>

          <SingleLink
            siteLink={"https://www.tahela.com/"}
            name={"Tahela"}
            tekst={"Keskkonnas pakutakse nii tasulist eesti keele kursust individuaalsele või grupis õppijale kui ka tasuta õppevideosid ja keeleõppeharjutusi."}
            image={"https://drive.google.com/uc?export=view&id=1ZCXGT3MsYXs6yVskKDCFEJ5kBwBsdc3x"}
            tags={["e-kursus", "suhtlus", "tasuline", "tasuta", "õppematerjal", "harjutus"]}/>

          <Box>
            <Typography id={"abiksõpetajale"}
                        variant={"h3"}>Abiks õpetajale</Typography>
          </Box>

          <SingleLink
            siteLink={"https://leplanner.ee/et/"}
            name={"LePlanner"}
            tekst={"Teemapõhiste tunnistsenaariumite keskkond õpetajatele. Stsenaariumitega on kirjeldatud tundide ülesehitus, läbitavad teemad ja tehtavad harjutused. Lisaks on stsenaariumites välja toodud kui kaua aega igale tegevusele kulub ja kohati on lisatud ka linke vastavatele õppematerjalidele teistes keskkondades."}
            image={"https://drive.google.com/uc?export=view&id=1nazG1cjwxYuQ83ha9Gh-hk67cTiTQsX-"}
            tags={["tunnistsenaariumid"]}/>

          <SingleLink
            siteLink={"https://haridustehnoloogid.ee/blog/"}
            name={"Ehtl"}
            tekst={"Eesti Haridustehnoloogide Liidu digitöövahendite kogu, mis sisaldab hulgaliselt linke õppetöös kasutust leidvatele keskkondadele."}
            image={"https://drive.google.com/uc?export=view&id=1txlVwwTrprHq1vytJRVVWjAuFu-shBkO"}
            tags={["harjutuste loomine"]}/>

          <SingleLink
            siteLink={"https://pghtl.wordpress.com/e-abimehed/"}
            name={"Pghtl"}
            tekst={"Blogi, mis sisaldab muuhulgas hulgaliselt linke erinevat tüüpi keskkondadele, mida õppetöös kasutada."}
            image={"https://drive.google.com/uc?export=view&id=1w1QIsyuxdJEnKD7w_z1tbh7Vz6SNi9jk"}
            tags={["harjutuste loomine"]}/>

          <SingleLink
            siteLink={"https://sonaveeb.ee/teacher-tools/#/home"}
            name={"Sõnaveebi õpetaja tööriistad"}
            tekst={"Eesti keele kui teise keele õpetajatele loodud tööriistad, mis on abiks tundide ülesehitamisel või õppematerjalide ja harjutuste loomisel. Sisu on jaotatud keeletasemete järgi ja tasemetel õpitavate teemade juures on toodud ka näiteid. Lisaks on lehel võimalik kirjutatud teksti taset ka hinnata ja selle põhjal õpilastele näidatavat teksti lihtsustada."}
            image={"https://drive.google.com/uc?export=view&id=1CFtNhxomi3ON8A42emE7rezj_ulxkzLz"}
            tags={["keeletasemed", "tasemehinnang", "eesti keel teise keelena", "EKI"]}/>

          <Box>
            <Typography id={"keelekorpused"}
                        variant={"h3"}>Eesti keele korpused</Typography>
          </Box>

          <SingleLink
            siteLink={"https://korp.keeleressursid.ee/"}
            name={"KORP"}
            tekst={"Erinevaid eesti keele korpusi koondav korpuspäringukeskkond. Sealt võib leida nii tänapäevaseid kui ka ajaloolisi korpuseid ning otsida keeleõppijatele mõeldud lihtsaid lauseid ja õpikuid."}
            image={"https://drive.google.com/uc?export=view&id=1QxCwjI_3O0VNTayCyAJtx3vFqdKtpWDA"}
            tags={["korpuspäring"]}/>

          <SingleLink
            siteLink={"http://keeleveeb.ee/"}
            name={"Keeleveeb"}
            tekst={"Mitmekülgne keskkond, mis võimaldab otsida märksõnu kõigist väljatoodud sõnastikest ja korpustest. Lisaks eesti keele sõnastikele on valikus termini-, kooli-, ja tõlkesõnastikud. Välja on toodud ka viited välislehtedele ja eesti keele tarkvarale."}
            image={"https://drive.google.com/uc?export=view&id=1mkUQdc7XMU49uK3hL-fvIP0DutNdcJ-I"}
            tags={["koondsõnastik", "korpused", "korpuspäring", "terminisõnastik"]}/>

          <SingleLink
            siteLink={"https://skell.sketchengine.eu/#home"}
            name={"SkeLL"}
            tekst={"Keeleõppijatele mõeldud eestikeelsete näitelausete otsing Sketch Engine’is sisalduvast eesti keele ühendkorpusest 2017 ja eesti keele A1-C1 õpikute korpusest 2018. Siit leiab lisaks ka sarnased sõnad ja saab vaadata otsitava sõna tüüpilisi koosesinemisi."}
            image={"https://drive.google.com/uc?export=view&id=1TSV_igrBIknqTXVhLCVw1Cjo5SU2x1sQ"}
            tags={["korpuspäring", "näitelaused", "sõnavisand"]}/>

          <SingleLink
            siteLink={"https://portaal.eki.ee/keelekogud.html"}
            name={"EKI keelekogud"}
            tekst={"Erinevate Eesti Keele Instituudi loodud korpuste loend."}
            image={"https://drive.google.com/uc?export=view&id=1hpB4J8VUdmcw1_Z4huLdm_UNTKfxb3YM"}
            tags={["korpused"]}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Links;
