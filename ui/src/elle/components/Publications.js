import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import React, {useEffect} from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import './styles/Publications.css';
import {useLocation} from "react-router-dom";

function Publications() {
  const location = useLocation();

  useEffect(() => {
    let currentLocation = window.location.href;
    if (currentLocation.includes("#")) {
      const anchorCommentId = `${currentLocation.substring(currentLocation.indexOf("#") + 1)}`;
      const anchorComment = document.getElementById(anchorCommentId);
      if (anchorComment) {
        anchorComment.scrollIntoView({behavior: "smooth"});
      }
    }
  }, [location]);

  return (
    <Box>
      <Box>
        <Typography id={"loputood"}
                    style={{
                      padding: '1rem'
                    }}
                    variant={"h3"}>Lõputööd</Typography>
      </Box>

      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/86HP71viN5"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Berner, S. (2022). <i>Eestikeelse teksti sõnavara mitmekesisuse mõõtmine</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/ouIdXtuhMx"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Liiva, K. (2022). <i>Automaatne tekstianalüüs: Klastrileidja arendamise põhimõtted ja veebirakendus</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/lJUVYT21Wl"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Petrov, H. (2022). <i>Rakendus võtmesõnade leidmiseks eestikeelsetest tekstidest</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/y4AfC43cJr"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Sepp, C. (2022). <i>Eestikeelse teksti keerukuse automaatne hindamine</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/ywvp987Ket"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Norak, K. (2021). <i>Õppijakeele korpuse virtuaalse õpikeskkonna prototüübi disain</i> [Magistritöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/xraMVgzZXU"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Tarvas, M. (2020). <i>Eesti vahekeele korpuse uue platvormi arendus ning teenuste liidestamine</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/2wo3d3Bx8b"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Kossinski, J. (2018). <i>Masinõppel rajaneva tarkvararakenduse loomine keeleoskustaseme ennustamiseks</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/zoom/41276/view"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Voolaid, K. (2018). <i>Vene ja soome lähtekeelega õppijate eesti keele kasutusmustrid (B1-tase)</i> [Magistritöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/I1PMiX2COn"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K. (2016). <i>C1-tasemega eesti keele õppijate kirjalik keelekasutus võrdluses emakeelekõnelejatega: samalaadsusi ja nihkeid verbist paremal paiknevas kontekstis</i> [Magistritöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/Rgd8RyF2rF"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Hallik, V. (2016). <i>Eesti vahekeele korpuse klasteranalüüsi vahendite kasutamine teksti keeletaseme prognoosimisel</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>
      </List>

      <Box>
        <Typography id={"konverentsid"}
                    style={{
                      padding: '1rem'
                    }}
                    variant={"h3"}>Konverentsid ja töötoad</Typography>
      </Box>

      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href=""
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K. Towards Interpretable Models for Text Classification: The case of Automated Writing Assessment. <i>2nd International Conference 'Language in the Human-Machine Era', June 30-July 1, 2022, Jyväskylä.</i></span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://dh.org.ee/events/dhe2022/abstracts/presentations/allkivi-metsoja-norak-kert-maine-eslon/"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K.; Norak, K.; Kert, K.; Maine, S.; Eslon, P. (2022). Error Classification and Annotation of Learner Language for Developing Estonian Grammar Correction. <i>Shifts in language and culture: computational approaches to variation and change: 8th Estonian Digital Humanities Conference, October 5-7, 2022, Tallinn University.</i><br/>
                             <a href="https://dh.org.ee/wp-content/uploads/sites/3/2022/10/Allkivi_Metsoja_et_al_slides_DH2022.pdf"
                                target="_blank"
                                rel="noopener noreferrer">Slaidid</a>
                            </span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://dh.org.ee/events/dhe2022/abstracts/workshops-2022/kippar-kodasma-norak-allkivi-metsoja/"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Kippar, J.; Kodasma, H.; Norak, K.; Allkivi-Metsoja, K. (2022). Word Analyser: A Tool for Estonian Language Learning and Text Analysis. <i>Shifts in language and culture: computational approaches to variation and change: 8th Estonian Digital Humanities Conference, October 5-7, 2022, Tallinn University.</i></span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.rakenduslingvistika.ee/wp-content/uploads/2022/06/Teesid-2022.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Mõtus, M.; Allkivi-Metsoja, K. (2022). Vigaste ja korrektsete lausete paralleelkorpuse loomine edasi-tagasi masintõlke abil. <i>Teesid: 19. rakenduslingvistika kevadkonverents. Keele mõju: andmetest tõendatud teadmuseni. 16.-17. juuni 2022, Tallinn.</i> Eesti Rakenduslingvistika Ühing, 11.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://portaal.eki.ee/component/content/article/101-projektid/3506-abstracts.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K.; Norak, K. (2021). Part-of-Speech tagging and lemmatization of Estonian learner language. <i>Online workshop on Parts of Speech "Quantitative answers to qualitative questions? The challenge of ambiguity in corpus data", 18. mai 2021.</i> EKI, 3.<br/>
                            <a href="https://www.youtube.com/playlist?list=PLfDCKnTgUT4GJffKuCxqW8lc3lwSGxOD1"
                               target="_blank"
                               rel="noopener noreferrer">Video</a>
                            </span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.jyu.fi/en/congress/tdl2019/tdl2019_book-of-abstracts_final.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K.; Eslon, P. (2019). Estonian interlanguage corpus and automated assessment of proficiency in learner texts. - <i>The 4th international conference Thinking, doing, learning: Usage based perspectives on second language learning. University of Jyväskylä, Finland, June 17–19, 2019.</i> Abstract Book, 63.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.rakenduslingvistika.ee/wp-content/uploads/2019/04/Teesid-2019-6.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K. (2019). Keeleoskustasemed: funktsionaalsest kirjeldusest lingvistilise mudelini. <i>18. rakenduslingvistika kevadkonverents EESTI KEELE AASTA: RAKENDUSLINGVISTIKA VAATENURK 25.-26. aprill 2019. Tallinn.</i> Eesti Rakenduslingvistika Ühing, 7.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://teoreetilinekeeleteadus.ut.ee/wp-content/uploads/2017/11/Eslon-jt.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Eslon, P.; Allkivi, K.; Trainis, J. (2017). Mis saab teooriast? Mõtteid lingvistilise klasteranalüüsi näitel. Klavan, Jane; Piiroja, Piret; Veismann, Ann. (Toim.) <i>Kvantitatiivne pööre keeleteaduses – mis saab teooriast?: V konverents sarjas "Teoreetiline keeleteadus Eestis". Tartu.</i> Tartu Ülikool, 13.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.rakenduslingvistika.ee/wp-content/uploads/2016/04/Teesid-2017-3.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi, K.; Eslon, P.; Trainis, J. (2017). Kontseptuaalselt sidusa mõistevara kujunemine: klasteranalüüs. 28−29. <i>Keel kui ökosüsteem. 16. rakenduslingvistika kevadkonverents 20.-21. aprill 2017, Tallinn.</i> Eesti Rakenduslingvistika Ühing, 28−29.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://www.keel.ut.ee/sites/default/files/www_ut/mkp_2016_teesid.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi, K. (2016). Verbist paremal ja vasakul paiknev kontekst C1-tasemega eesti keele õppijate ja emakeelekõnelejate kirjutistes. <i>XII muutuva keele päev. Ettekannete teesid. Tartu.</i> Tartu Ülikool, 18−19.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <Box>
          <Typography id={"publikatsioonid"}
                      style={{
                        padding: '1rem'
                      }}
                      variant={"h3"}>Publikatsioonid</Typography>
        </Box>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/aastaraamat/article/view/ERYa18.03"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K. (2022). A2–C1-taseme eksamitekstide käändsõnakasutus. <i>Eesti Rakenduslingvistika Ühingu aastaraamat = Estonian papers in applied linguistics</i>, 18, 33−53. DOI: 10.5128/ERYa18.00.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV32.01"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Eslon, P. (2022). Leksika-grammatika piirimail: publitsistlike arvamuslugude keelekasutusmustrid. <i>Lähivõrdlusi. Lähivertailuja</i>, 32, 13−52. DOI: 10.5128/LV32.01.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV31.01"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K. (2021). Eesti keele A2–C1-taseme kirjalike tekstide võrdlev automaatanalüüs. <i>Lähivõrdlusi. Lähivertailuja</i>, 31, 13−59. DOI: 10.5128/LV31.01.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV31.03"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Eslon, P. (2021). Soome- ja venekeelsete õppijate A2- ja B1-taseme keelekasutusmustritest: varieeruvus vs. stereotüüpsus. <i>Lähivõrdlusi. Lähivertailuja</i>, 31, 90−113. DOI: 10.5128/LV31.03.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://link.springer.com/chapter/10.1007/978-3-030-90785-3_4"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Norak, K.; Põldoja, H. (2021). Designing a Virtual Learning Environment Based on a Learner Language Corpus. In: Zhou, Wanlei; Mu, Yi (Ed.). <i>Advances in Web-Based Learning – ICWL 2021.</i> (40−51). Cham: Springer. (Lecture Notes in Computer Science; 13103). DOI: 10.1007/978-3-030-90785-3_4.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href=""
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Eslon, P.; Kaivapalu, A.; Õim, K.; Kitsnik, M.; Gaitšenja, O.; Allkivi-Metsoja, K. (2021). <i>Eesti keele oskuse arenemine ja arendamine. Kirjalik õppijakeel.</i> EKSA.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV28.01"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Eslon, P.; Allkivi-Metsoja, K. (2018). Teksti keelekasutusmustrid ja lingvistiline klasteranalüüs. <i>Lähivõrdlusi. Lähivertailuja</i>, 28, 21−46. DOI: 10.5128/LV28.01.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV27.01"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Eslon, P. (2017). Keelekasutusmustrid verbist paremal: morfosüntaktiline ja leksikaalsemantiline varieerumine. <i>Lähivõrdlusi. Lähivertailuja</i>, 27, 17−64. DOI: 10.5128/LV27.01.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.folklore.ee/tagused/nr69/eslon.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Eslon, P. (2017). Kasutuspõhise keelekäsitluse pedagoogiline perspektiiv. <i>Mäetagused</i>, 69, 221−246. DOI: 10.7592/MT2017.69.eslon.</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV26.02"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi, K. (2016). C1-tasemega eesti keele õppijate ja emakeelekõnelejate kirjaliku keelekasutuse võrdlus verbialguliste tetragrammide näitel. <i>Lähivõrdlusi. Lähivertailuja</i>, 26, 54−83. DOI: 10.5128/LV26.02.</span>
                          }/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Publications;
