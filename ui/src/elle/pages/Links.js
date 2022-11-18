import {Box, styled, Typography} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SingleLink from "../components/SingleLink";
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
          position={"fixed"}
          sx={{
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
                                         marginTop={"10px"}>Eestikeelsed tekstid</Typography>}>
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
                                         marginTop={"10px"}>Audiovisuaalne meedia</Typography>}>
              <TreeItem nodeId={"9"}
                        label={<Typography
                          marginTop={"10px"}>
                          <MenuLink key={"6"}
                                    smooth
                                    to="#video">Video</MenuLink>
                        </Typography>}>

              </TreeItem>
              <TreeItem nodeId={"10"}
                        label={<Typography
                          marginTop={"10px"}>
                          <MenuLink key={"7"}
                                    smooth
                                    to="#audio">Audio</MenuLink>
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
                                         marginTop={"10px"}>Keeleõppevara</Typography>}>
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
                                         marginTop={"10px"}>Keeleõppekeskkonnad</Typography>}>
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
                                  to="#abivahendid">Õpetaja abivahendid</MenuLink>
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

        <Box sx={{
          padding: "50px",
          width: "75%",
          height: "auto",
          marginTop: "70px",
          marginLeft: "35%",
          marginBottom: "100px",
        }}>
          <Box id={"tutvustus"}>
            <Typography align={"center"}
                        padding={"50px"}>ELLE eesmärk on eesti keele õpet igati toetada, mistõttu oleme
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
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["koondsõnastik", "terminisõnastik"]}/>

          <SingleLink
            siteLink={"https://sonaveeb.ee/lite"}
            name={"Keeleõppija Sõnaveeb"}
            tekst={"Keeleõppijatele suunatud lihtsustatud sõnastik koos piltidega."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["keeleõppesõnastik"]}/>

          <SingleLink
            siteLink={"https://portaal.eki.ee/sonaraamatud.html"}
            name={"EKI sõnaraamatud"}
            tekst={"Eesti keele instituut (EKI) on loonud suurema osa Eestis kasutatavatest sõnastikest ja lingid eraldi sõnastikele on leitavad nende koduleheküljelt. Siit leiad nii eesti keele sõnastikke, terminisõnastikke kui ka murdesõnaraamatuid ja sugulaskeelte sõnastikke."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["sõnaraamatud", "terminisõnastik", "murdesõnastik", "sugulaskeeled"]}/>

          <SingleLink
            siteLink={"https://glosbe.com/"}
            name={"Glosbe"}
            tekst={"Mitmekeelne veebisõnastik, mis sisaldab tõlkeid, sõnatähendusi, võrreldavaid lauseid kahes keeles ja hulgaliselt näitelauseid. Sõnastikku on kasutajatel võimalik ise täiendada, et ükski tähendusnüanss ei jääks kahe silma vahele."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkesõnastik"]}/>

          <Box>
            <Typography id={"tõlkerakendused"}
                        variant={"h3"}>Tõlkerakendused</Typography>
          </Box>

          <SingleLink
            siteLink={"https://tolkevarav.eki.ee/"}
            name={"Tõlkevärav"}
            tekst={"Tegu on EKI ning Haridus- ja Teadusministeeriumi koostöös loodud tõlkerakendusega, mis suudab tuvastada ametlikke tekste (nt õigustekste) ja tõlkida neid eesti, vene, inglise või saksa keelte vahel."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkerakendus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://masintolge.ut.ee/"}
            name={"Neurotõlge"}
            tekst={"Tegu on Tartu Ülikooli juures loodud mitmekeelse masintõlkerakendusega, mis tuvastab ise tõlgitava teksti keele või keeled. Tõlkida saab ka eesti keelest eesti keelde, et saada kätte parandatud kirjutis. Rakenduse eelis on ka võimalus kõrvutada saadud tõlget Tilde ja Google Translate’i tõlgetega."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkerakendus", "tekstikorrektor", "tasuta"]}/>

          <SingleLink
            siteLink={"https://translate.tilde.com/#/"}
            name={"Tilde"}
            tekst={"Tegu on masintõlkerakendusega, mis suudab tõlkida tekste mitmest maailma keelest. Rakendus tõlgib ka üleslaetud tekste."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tõlkerakendus", "tasuta", "tasuline"]}/>

          <SingleLink
            siteLink={"https://translate.google.com/?sl=et&tl=en&op=translate"}
            name={"Google Translate"}
            tekst={"Paljude maailma keelte peal töötav tõlkerakendus, millega on võimalik tõlkida ka terveid veebilehekülgi ja dokumente. Nutiseadmes kasutades võimaldab ka sünkroonset tõlget koostöös nutitelefoni kaameraga. Rakendus töötab paremini pikemate kirjutistega, sest suudab konteksti põhjal paremat tõlget pakkuda. Üksikuid sõnu tõlkides võib esimesel juhul vale variandi pakkuda, kuid esitab seevastu ka tõlkealternatiive."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
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
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["uudised", "tasuta"]}/>

          <SingleLink
            siteLink={"https://sirp.ee/"}
            name={"Sirp"}
            tekst={"Tegu on kõikvõimalikke kultuuriteemasid käsitleva ajakirjaga, mida on veebist võimalik tasuta lugeda."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["uudised", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.ohtuleht.ee/"}
            name={"Õhtuleht"}
            tekst={"Õhtulehe Kirjastuse uudisteportaal, kus on lisaks Õhtulehele lingitud ka mitmed teised kirjastuse väljaantavad ajakirjad. Uudiste eest on valdavalt vaja maksta, kuid mõned lühemad uudised on ka tasuta kättesaadavad."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["uudised", "tasuline"]}/>

          <SingleLink
            siteLink={"https://www.postimees.ee/"}
            name={"Postimees"}
            tekst={"Valdavalt tasuline uudisteportaal. Lehel on võimalik kuulata ka Postimehe taskuhäälinguid."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["uudised", "tasuline", "taskuhääling"]}/>

          <SingleLink
            siteLink={"https://www.delfi.ee/"}
            name={"Delfi"}
            tekst={"Üks Ekspress Meedia pakutavatest veebiuudiste portaalidest, kus on valdavalt tasuline sisu. Lehel on lingitud ka teised konsortiumile kuuluvad ajalehed. Siit on võimalik ligi saada ka Delfi taskuhäälingutele."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["uudised", "tasuline", "taskuhääling"]}/>

          <Box>
            <Typography id={"kirjandus"}
                        variant={"h4"}>Kirjandus</Typography>
          </Box>

          <SingleLink
            siteLink={"https://ellu.keskraamatukogu.ee/"}
            name={"E-raamatukogu ELLU"}
            tekst={"Tallinna Keskraamatukogu e-raamatukogu, kust on võimalik laenutada nii eesti-, vene- kui ka ingliskeelset kirjandust."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["e-raamatud", "raamatud", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.digar.ee/arhiiv/et"}
            name={"DIGAR digitaalarhiiv"}
            tekst={"Eesti Rahvusraamatukogu digitaalarhiiv, mis sisaldab rohkelt raamatuid ja ajakirju erinevatest ajaperioodidest. Arhiivis sisalduvad raamatud ja ajakirjad ei ole alati avalikkusele kättesaadavad, kuid neid, mis on, võib tasuta lugeda kõikjal või ainult Eesti Rahvusraamatukogu sisevõrgus."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["raamatud", "ajakirjad", "arhiiv", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.poogen.ee/"}
            name={"Poogen"}
            tekst={"Kirjandusportaal, kus kasutajad saavad ise oma loomingut avaldada. Sealt võib leida nii eestikeelset proosat, luulet, näidendeid kui ka arvamusartikleid."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["kirjandus", "tasuta"]}/>

          <SingleLink
            siteLink={"https://www.digiraamat.ee/index/index/tab/free"}
            name={"Digiraamat"}
            tekst={"E-raamatupood, kus leidub nii tasuta kui ka tasulisi raamatuid ja ajakirju."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["e-raamatud", "e-ajakirjad", "raamatud", "ajakirjad", "tasuta", "tasuline"]}/>

          <SingleLink
            siteLink={"https://www.kriso.ee/cgi-bin/shop/freeebooks.html"}
            name={"Krisostomuse tasuta e-raamatud"}
            tekst={"Krisostomuse raamatukaupluse e-pood, kust on võimalik lisaks tasulistele raamatutele leida ka mitmeid tasuta raamatuid ja ajakirju."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["e-raamatud", "e-ajakirjad", "raamatud", "ajakirjad", "tasuta", "tasuline"]}/>

          <SingleLink
            siteLink={"https://galerii.kirmus.ee/grafo/grupp.php?id=3"}
            name={"Grafo vanemate lasteraamatute arhiiv"}
            tekst={"Eesti Kirjandusmuuseumi Arhiivraamatukogu on sellele lehele koondanud mitmeid vanemaid trükiseid, kuid eesti keele õppijatele ja eriti lastele võiksid huvi pakkuda lehelt leitavad lasteraamatud."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["raamatud", "tasuta", "arhiiv", "lastele"]}/>

          <SingleLink
            siteLink={"https://kreutzwald.kirmus.ee/"}
            name={"Kreutzwaldi sajand"}
            tekst={"Eesti Kirjandusmuuseumi keskkond, kust võib leida 19. ja 20. sajandil ilmunud eestikeelset kirjandust."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["raamatud", "e-raamatud", "tasuta", "arhiiv"]}/>

          <Box>
            <Typography id={"teadustekstid"}
                        variant={"h4"}>Teadustekstid</Typography>
          </Box>

          <SingleLink
            siteLink={"https://www.etera.ee/"}
            name={"ETERA"}
            tekst={"Tallinna Ülikooli Akadeemilise Raamatukogu e-raamatukogu, kust leiab nii lõputöid kui ka vanemaid digiteeritud ajalehti ja raamatuid. Kõik teavikud on tasuta loetavad, kuid mõne lugemiseks on tarvis olla Tallinna Ülikooli või akadeemilise raamatukogu sisevõrgus."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["lõputööd", "õpikud", "ajalehed", "ajakirjad", "raamatud", "tasuta", "arhiiv"]}/>

          <SingleLink
            siteLink={"https://digikogu.taltech.ee/"}
            name={"TalTechi digikogu"}
            tekst={"Tallinna Tehnikaülikooli raamatukogu digikogu, mis sisaldab suuresti TalTechis kaitstud lõputöid, kuid ka muid ülikooliga seotud publikatsioone ja õppetööks vajalikke õpikuid. Kõik teavikud on tasuta kättesaadavad, kuid mõne lugemiseks on tarvis olla TalTechi raamatukogu sisevõrgus."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["lõputööd", "õpikud", "ajakirjad", "tasuta", "arhiiv"]}/>

          <SingleLink
            siteLink={"https://dspace.ut.ee/"}
            name={"DSpace"}
            tekst={"Tartu Ülikooli raamatukogu digitaalne arhiiv, mis sisaldab nii lõputöid kui ka digiteeritud raamatuid ajakirju ja käsikirju. Arhiivist leitu on tasuta loetav ja allalaaditav."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
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
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["televisioon", "tasuta", "saated", "sarjad", "filmid"]}/>

          <SingleLink
            siteLink={"https://lasteekraan.err.ee/"}
            name={"Lasteekraan"}
            tekst={"Tegu on Eesti Rahvusringhäälingu lastelehega, kus pakutakse mitmete multikate, lastesaadete ja mängude kõrval ka eestikeelseid audioraamatuid. Keskkond on kõigile tasuta, kuid mõne videosisu vaatamiseks peab sisse logima."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tasuta", "lastele", "audioraamatud", "saated", "sarjad", "filmid"]}/>

          <SingleLink
            siteLink={"https://arhiiv.err.ee/"}
            name={"ERR arhiiv"}
            tekst={"Eesti Rahvusringhäälingu video- ja audioarhiiv, mis sisaldab vanemaid eestikeelseid filme, videosid, pilte ja raadiosaateid, kuid kuhu on koondatud ka Tallinna Ülikooli Balti Filmi- ja Meediakooli üliõpilaste loodud sisu. Keskkond on kõigile tasuta kättesaadav."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["tasuta", "saated", "sarjad", "filmid", "arhiiv"]}/>

          <SingleLink
            siteLink={"https://kanal2.postimees.ee/pluss/avaleht"}
            name={"Kanal 2 veebi TV"}
            tekst={"Kanal 2 veebikeskkond, kust on võimalik vaadata filme, saateid ja sarju. Lisaks on võimalik vaadata otse Kanal 2 telekanaleid. Tasuta on keskkonnas vaid mõningad eestimaised saated, kuid filmide, sarjade ja otsetelevisiooni vaatamine on tasuline."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["televisioon", "filmid", "saated", "sarjad", "tasuline"]}/>

          <SingleLink
            siteLink={"https://play.tv3.ee/"}
            name={"TV3 Play"}
            tekst={"TV3 veebikeskkond, kust on kõigil võimalik tasuta vaadata mõningaid TV3 eetris olnud saateid, sarju ja filme. Selleks, et sisu vaadata tuleb lehel välja lülitada oma reklaamiblokeerija."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["sarjad", "saated", "filmid", "tasuta"]}/>

          <SingleLink
            siteLink={"https://go3.tv/"}
            name={"Go3"}
            tekst={"TV3 tasuline veebikeskkond, kust on võimalik vaadata filme, sarju, saateid ja ka neid laenutada. Seal on võimalik otse vaadata ka erinevaid telekanaleid, mitte ainult neid, mis kuuluvad TV3 Gruppi. Keskkond toimib ka välismaal, kuid registreerudes on vaja esitada Eesti telefoninumber."}
            image={"https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium-768x526.png"}
            tags={["sarjad", "saated", "filmid", "videolaenutus", "tasuline", "televisioon"]}/>

          <Box>
            <Typography id={"audio"}
                        variant={"h4"}>Raadio, audio, taskuhäälingud</Typography>
          </Box>

          <Box>
            <Typography id={"õppematerjalid"}
                        variant={"h3"}>Õppematerjalid ja harjutused</Typography>
          </Box>

          <Box>
            <Typography id={"õppemängud"}
                        variant={"h3"}>Keeleõppemängud</Typography>
          </Box>

          <Box>
            <Typography id={"keeleõppekeskkonnad"}
                        variant={"h3"}>Keeleõppekeskkonnad</Typography>
          </Box>

          <Box>
            <Typography id={"kursused"}
                        variant={"h3"}>Kursused</Typography>
          </Box>

          <Box>
            <Typography id={"abivahendid"}
                        variant={"h3"}>Õpetaja abivahendid</Typography>
          </Box>

          <Box>
            <Typography id={"keelekorpused"}
                        variant={"h3"}>Eesti keele korpused</Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

export default Links;
