import * as React from 'react';
import {useState} from 'react';
import analyserImgEt from '../resources/images/home/sonaanalyys_et.png';
import analyserImgEn from '../resources/images/home/sonaanalyys_en.png';
import wordlistImgEt from '../resources/images/home/sonaloend_et.png';
import wordlistImgEn from '../resources/images/home/sonaloend_en.png';
import wordcontextImgEt from '../resources/images/home/sonakontekstis_et.png';
import wordcontextImgEn from '../resources/images/home/sonakontekstis_en.png';
import collocateImgEt from '../resources/images/home/naabersonad_et.png';
import collocateImgEn from '../resources/images/home/naabersonad_en.png';
import {Box} from '@mui/material';
import './styles/Home.css';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
import HeroElement from "../components/HeroElement";
import ServicesElement from "../components/ServicesElement";
import InfoElement from "../components/InfoElement";
import StatisticsElement from "../components/StatisticsElement";

function Home() {
  const {t} = useTranslation();
  const summaryTexts = ['homepage_summary_text_1', 'homepage_summary_text_2', 'homepage_summary_text_3', 'homepage_summary_text_4'];
  const [wordlistImg, setWordlistImg] = useState(i18n.language === 'ET' ? wordlistImgEt : wordlistImgEn);
  const [wordcontextImg, setWordcontextImg] = useState(i18n.language === 'ET' ? wordcontextImgEt : wordcontextImgEn);
  const [collocateImg, setCollocateImg] = useState(i18n.language === 'ET' ? collocateImgEt : collocateImgEn);
  const [analyserImg, setAnalyserImg] = useState(i18n.language === 'ET' ? analyserImgEt : analyserImgEn);
  const [imageSelected, setImageSelected] = useState(1)

  i18n.on('languageChanged', () => {
    if (i18n.language === 'ET') {
      setWordlistImg(wordlistImgEt);
      setWordcontextImg(wordcontextImgEt);
      setCollocateImg(collocateImgEt);
      setAnalyserImg(analyserImgEt);
    } else {
      setWordlistImg(wordlistImgEn);
      setWordcontextImg(wordcontextImgEn);
      setCollocateImg(collocateImgEn);
      setAnalyserImg(analyserImgEn);
    }
  });

  return (
    <div>
      <Box marginBottom="100px">
        <HeroElement/>
        <ServicesElement/>
        <InfoElement/>
        <StatisticsElement/>
      </Box>
      {/*<h2 className="home-title">{t('homepage_title')}</h2>

      <Card className="home-mockup-card">
        <Box className="home-mockup-card-box">
          <Box width="30%">
            <img width="100%" src={elleMockupImg} alt="ELLE mockup"/>
          </Box>
          <Box className="home-mockup-card-textbox">
            <Typography className="home-mockup-card-typography">{t('homepage_title_explainer')}</Typography>
          </Box>
        </Box>
      </Card>

      <Card className="home-summary-card">
        <Box className="home-summary-card-title-box">
          <Typography
            className="home-summary-card-title-typography">{t('homepage_summary_title')}</Typography>
        </Box>
        <Box className="home-summary-card-content-box">
          {summaryTexts.map((text) => (
            <Box key={text} className="home-summary-card-content-box-inner-1">
              <Box className="home-summary-card-content-box-inner-2">
                <Box className="home-summary-card-avatar-box">
                  <Avatar className="home-summary-card-avatar">
                    <SchoolIcon/>
                  </Avatar>
                </Box>
                <Box className="home-summary-card-content-textbox">
                  <Typography className="home-summary-card-content-typography">{t(text)}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Card>

      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}
           paddingTop={"150px"}
           paddingX={"70px"} paddingBottom={"70px"}>
        <Box display={"flex"} alignItems={"end"} width={"60%"} color={"#c6c6c6"}><FormatQuoteIcon
          paddingTop="100%"
          style={{fontSize: '5rem', color: "#FFD0FD"}}/>
          <h2 className="quote-text">Eesti
            identiteet
            on
            sügavalt
            keeleline: sa oled
            eestlane, kui sa
            räägid
            eesti keelt.
            Keel on
            meie usk ja meie ideoloogia ja see on ka see, mis defineerib eestlast.</h2><FormatQuoteIcon
            style={{fontSize: '5rem', color: "#FFD0FD"}}/></Box>
        <Box fontSize={"1.5rem"} fontStyle={"italic"} textAlign={"right"} width={"60%"} paddingX={"90px"}
             paddingTop={"50px"}>
          Toomas Hendrik Ilves
        </Box>
      </Box>


      <Card height="auto" width="100%" className="home-tabs-card">
        <Box display={"flex"} justifyContent={"center"} marginTop={"50px"} alignItems={"center"}><h2>ELLE
          tööriistad</h2></Box>
        <Box height="100%" width="100%" className="tab-container">
          <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"space-evenly"}
               alignItems={"center"}>
            <Box bgcolor="#FFD0FD" onMouseEnter={() => setImageSelected(1)}
                 className="tab-button">Tekstihindaja</Box>
            <Box bgcolor="#f3c4fb" onMouseEnter={() => setImageSelected(2)}
                 className="tab-button">Tekstipäring</Box>
            <Box bgcolor="#ecbcfd" onMouseEnter={() => setImageSelected(3)}
                 className="tab-button">Sõnaloend</Box>
            <Box bgcolor="#e5b3fe" onMouseEnter={() => setImageSelected(4)} className="tab-button">Sõna
              kontekstis</Box>
            <Box bgcolor="#e2afff" onMouseEnter={() => setImageSelected(5)}
                 className="tab-button">Naabersõnad</Box>
            <Box bgcolor="#deaaff" onMouseEnter={() => setImageSelected(6)}
                 className="tab-button">Mustrileidja</Box>
            <Box bgcolor="#CCA8FD" onMouseEnter={() => setImageSelected(7)}
                 className="tab-button">Sõnaanalüsaator</Box>
          </Box>
          <Box className="image-container">
            {imageSelected === 1 ? <Box height={800} borderColor={"#FFD0FD"} className="picture-box">
              <img alt="image-alt" src={correctorImg} className="image-class"/>
              <Box bgcolor={"#FFD0FD"} width={"100%"} position={"absolute"} className="overlay"
                   top={0}></Box>
              <Box style={{outline: "solid 7px #FFD0FD"}} className="image-card">
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"}
                     flexDirection={"column"}
                     alignItems={"start"} padding={"20px"}>
                  <Box paddingTop={"20px"}
                       fontSize={"20px"}><span
                    className="bold-text">Tekstihindajaga</span> {t('homepage_box_corrector_content')}
                  </Box>
                  <Link to={'/tools/'}
                        onClick={() => window.scrollTo(0, 0)}>
                    <Button style={{fontWeight: "bold"}}
                            variant="contained">{t('start_button')}</Button></Link>
                </Box>
              </Box>
            </Box> : null}
            {imageSelected === 2 ? <Box height={800} borderColor={"#f3c4fb"} className="picture-box">
              <img alt="image-alt" src={queryImg} className="image-class"/>
              <Box bgcolor={"#f3c4fb"} width={"100%"} position={"absolute"} className="overlay"
                   top={0}></Box>
              <Box style={{outline: "solid 7px #f3c4fb"}} className="image-card">
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"}
                     flexDirection={"column"}
                     alignItems={"start"} padding={"20px"}>
                  <Box paddingTop={"20px"}
                       fontSize={"20px"}><span
                    className="bold-text">Tekstipäringu</span> {t('homepage_box_query_content')}
                  </Box>
                  <Link to={'/tools/'}
                        onClick={() => window.scrollTo(0, 0)}>
                    <Button style={{fontWeight: "bold"}}
                            variant="contained">{t('start_button')}</Button></Link>
                </Box>
              </Box>
            </Box> : null}
            {imageSelected === 3 ? <Box height={800} borderColor={"#ecbcfd"} className="picture-box">
              <img alt="image-alt" src={wordlistImg} className="image-class sonaloend"/>
              <Box bgcolor={"#ecbcfd"} width={"100%"} position={"absolute"} className="overlay"
                   top={0}></Box>
              <Box style={{outline: "solid 7px #ecbcfd"}} className="image-card">
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"}
                     flexDirection={"column"}
                     alignItems={"start"} padding={"20px"}>
                  <Box paddingTop={"20px"}
                       fontSize={"20px"}><span
                    className="bold-text">Sõnaloendi</span> {t('homepage_box_wordlist_content')}
                  </Box>
                  <Link to={'/tools/'}
                        onClick={() => window.scrollTo(0, 0)}>
                    <Button style={{fontWeight: "bold"}}
                            variant="contained">{t('start_button')}</Button></Link>
                </Box>
              </Box>
            </Box> : null}
            {imageSelected === 4 ? <Box height={800} borderColor={"#e5b3fe"} className="picture-box">
              <img alt="image-alt" src={wordcontextImg} className="image-class kontekst"/>
              <Box bgcolor={"#e5b3fe"} width={"100%"} position={"absolute"} className="overlay"
                   top={0}></Box>
              <Box style={{outline: "solid 7px #e5b3fe"}} className="image-card">
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"}
                     flexDirection={"column"}
                     alignItems={"start"} padding={"20px"}>
                  <Box paddingTop={"20px"}
                       fontSize={"20px"}><span
                    className="bold-text">Sõna kontekstis</span> {t('homepage_box_concordances_content')}
                  </Box>
                  <Link to={'/tools/'}
                        onClick={() => window.scrollTo(0, 0)}>
                    <Button style={{fontWeight: "bold"}}
                            variant="contained">{t('start_button')}</Button></Link>
                </Box>
              </Box>
            </Box> : null}
            {imageSelected === 5 ? <Box height={800} borderColor={"#e2afff"} className="picture-box">
              <img alt="image-alt" src={collocateImg} className="image-class naabersonad"/>
              <Box bgcolor={"#e2afff"} width={"100%"} position={"absolute"} className="overlay"
                   top={0}></Box>
              <Box style={{outline: "solid 7px #e2afff"}} className="image-card">
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"}
                     flexDirection={"column"}
                     alignItems={"start"} padding={"20px"}>
                  <Box paddingTop={"20px"}
                       fontSize={"20px"}><span
                    className="bold-text">Naabersõnade</span> {t('homepage_box_neighbouring_words_content')}
                  </Box>
                  <Link to={'/tools/'}
                        onClick={() => window.scrollTo(0, 0)}>
                    <Button style={{fontWeight: "bold"}}
                            variant="contained">{t('start_button')}</Button></Link>
                </Box>
              </Box>
            </Box> : null}
            {imageSelected === 6 ? <Box height={800} borderColor={"#deaaff"} className="picture-box">
              <img alt="image-alt" src={clusterfinderImg} className="image-class mustrileidja"/>
              <Box bgcolor={"#deaaff"} width={"100%"} position={"absolute"} className="overlay"
                   top={0}></Box>
              <Box style={{outline: "solid 7px #deaaff"}} className="image-card">
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"}
                     flexDirection={"column"}
                     alignItems={"start"} padding={"20px"}>
                  <Box paddingTop={"20px"}
                       fontSize={"20px"}><span
                    className="bold-text">Mustrileidjaga</span> {t('homepage_box_clusters_content')}
                  </Box>
                  <Link to={'/tools/'}
                        onClick={() => window.scrollTo(0, 0)}>
                    <Button style={{fontWeight: "bold"}}
                            variant="contained">{t('start_button')}</Button></Link>
                </Box>
              </Box>
            </Box> : null}
            {imageSelected === 7 ? <Box height={800} borderColor={"#CCA8FD"} className="picture-box">
              <img alt="image-alt" src={analyserImg} className="image-class sonaanalysaator"/>
              <Box bgcolor={"#CCA8FD"} width={"100%"} position={"absolute"} className="overlay"
                   top={0}></Box>
              <Box style={{outline: "solid 7px #CCA8FD"}} className="image-card">
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"}
                     flexDirection={"column"}
                     alignItems={"space-between"} padding={"20px"}>
                  <Box paddingTop={"20px"}
                       fontSize={"20px"}><span
                    className="bold-text">Sõnaanalüsaatoriga</span> {t('homepage_box_word_analysis_content')}
                  </Box>
                  <Link to={'/tools/wordanalyser'}
                        onClick={() => window.scrollTo(0, 0)}>
                    <Button style={{fontWeight: "bold"}}
                            variant="contained">{t('start_button')}</Button></Link>
                </Box>
              </Box>
            </Box> : null}
          </Box>
        </Box>
      </Card>

      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}
           paddingTop={"150px"}
           paddingX={"70px"} paddingBottom={"70px"}>
        <Box display={"flex"} alignItems={"end"} width={"60%"} color={"#c6c6c6"}><FormatQuoteIcon
          paddingTop="100%"
          style={{fontSize: '5rem', color: "#FFD0FD"}}/>
          <h2 className="quote-text">Keel on mõtte ema, mitte tema ümmardaja.</h2><FormatQuoteIcon
            style={{fontSize: '5rem', color: "#FFD0FD"}}/></Box>
        <Box fontSize={"1.5rem"} fontStyle={"italic"} textAlign={"right"} width={"60%"} paddingX={"90px"}
             paddingTop={"50px"}>
          Tundmatu
        </Box>
      </Box>

      <Card className="home-summary-card">
        <Box width={"100%"} height={"300px"} fontSize={"1.5rem"} display={"flex"} gap={"50px"}
             flexDirection={"column"}
             alignItems={"center"}
             justifyContent={"center"}
             textAlign={"center"}>
          Eesti keele uurimiseks on vaja põhjalikku ja mitmekesist keelekorpust. Oleme selle nimel kogunud
          kõikvõimalikke erinevaid teoseid. Aita edendada eesti keelt, loovutades oma lõpukirjand või
          kirjateos.
          <Button style={{fontWeight: "bold"}} variant={"contained"}>
            Teksti loovutama
          </Button>
        </Box>

      </Card>*/}
    </div>
  );
}

export default Home;
