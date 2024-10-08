import { Box, Typography } from '@mui/material';
import React from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SingleLink from '../components/SingleLink';
import '@fontsource/exo-2/600.css';
import { IMAGES } from '../resources/images/link-images';
import { MenuLink } from '../const/StyleConstants';
import './styles/Links.css';
import { HashFragmentRouteConstants } from '../../AppRoutes';
import { useTranslation } from 'react-i18next';

function Links() {
  const { t } = useTranslation();
  const classes = {
    focused: {
      bgcolor: 'transparent'
    },
    selected: {
      bgcolor: 'transparent'
    },
    hover: {
      bgcolor: 'transparent'
    }
  };

  const preventTreeOpening = (e) => {
    e.stopPropagation();
  };

  return (
    <Box className="links-container">
      <Box className="links-container-inner">
        <Box className="links-treeview-container">
          <Box className="links-container-sticky">
            <Box className="links-tree-view-right-border">
              <TreeView aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon className="link-expand-icon" />}
                        defaultExpandIcon={<ChevronRightIcon className="link-expand-icon" />}
                        sx={{
                          height: 'auto',
                          flexGrow: 1,
                          maxWidth: 400,
                          '.MuiTreeItem-root': {
                            '	.MuiTreeItem-content:hover': classes.hover,
                            '.Mui-focused:not(.Mui-selected)': classes.focused,
                            '.Mui-selected, .Mui-focused.Mui-selected, .Mui-selected:hover': classes.selected
                          }
                        }}
              >
                <TreeItem
                  nodeId={'1'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        key={'1'}
                        smooth
                        to={`#${HashFragmentRouteConstants.LINKS_INTRODUCTION}`}
                      >
                        {t('common_introduction')}
                      </MenuLink>
                    </Typography>
                  }
                />
                <TreeItem
                  nodeId={'2'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        key={'2'}
                        smooth
                        to={`#${HashFragmentRouteConstants.LINKS_DICTIONARIES}`}
                      >
                        {t('common_dictionaries')}
                      </MenuLink>
                    </Typography>
                  }
                />
                <TreeItem
                  nodeId={'3'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        key={'3'}
                        smooth
                        to={`#${HashFragmentRouteConstants.LINKS_TRANSLATION_TOOLS}`}
                      >
                        {t('common_translation_tools')}
                      </MenuLink>
                    </Typography>
                  }
                />
                <TreeItem
                  nodeId={'4'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        to={`#${HashFragmentRouteConstants.LINKS_ESTONIAN_TEXTS}`}
                        onClick={preventTreeOpening}
                        smooth
                      >
                        {t('common_estonian_texts')}
                      </MenuLink>
                    </Typography>
                  }>
                  <TreeItem
                    nodeId={'5'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'4'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_MEDIA_TEXTS}`}
                        >
                          {t('links_media_texts')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                  <TreeItem
                    nodeId={'6'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'4'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_LITERATURE}`}
                        >
                          {t('links_literature')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                  <TreeItem
                    nodeId={'7'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'5'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_ACADEMIC_TEXTS}`}
                        >
                          {t('links_academic_texts')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                </TreeItem>
                <TreeItem
                  nodeId={'8'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        to={`#${HashFragmentRouteConstants.LINKS_AUDIOVISUAL_MEDIA}`}
                        onClick={preventTreeOpening}
                        smooth
                      >
                        {t('common_audiovisual_media')}
                      </MenuLink>
                    </Typography>
                  }>
                  <TreeItem
                    nodeId={'9'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'6'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_SERIES_FILMS_VIDEOS}`}
                        >
                          {t('links_series_films_videos')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                  <TreeItem
                    nodeId={'10'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'7'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_RADIO_AUDIO_PODCASTS}`}
                        >
                          {t('links_radio_audio_podcasts')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                </TreeItem>
                <TreeItem
                  nodeId={'11'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        to={`#${HashFragmentRouteConstants.LINKS_LEARNING_RESOURCES}`}
                        onClick={preventTreeOpening}
                        smooth
                      >
                        {t('common_learning_resources')}
                      </MenuLink>
                    </Typography>
                  }>
                  <TreeItem
                    nodeId={'12'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'8'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_LANGUAGE_LEARNING_MATERIALS_AND_EXERCISES}`}
                        >
                          {t('links_language_learning_materials_and_exercises')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                  <TreeItem
                    nodeId={'13'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'9'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_LANGUAGE_LEARNING_GAMES}`}
                        >
                          {t('links_language_learning_games')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                </TreeItem>
                <TreeItem
                  nodeId={'14'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        to={`#${HashFragmentRouteConstants.LINKS_LEARNING_ENVIRONMENTS_AND_COURSES}`}
                        onClick={preventTreeOpening}
                        smooth
                      >
                        {t('common_learning_environments_and_courses')}
                      </MenuLink>
                    </Typography>
                  }>
                  <TreeItem
                    nodeId={'15'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'10'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_LANGUAGE_LEARNING_ENVIRONMENTS}`}
                        >
                          {t('links_language_learning_environments')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                  <TreeItem
                    nodeId={'16'}
                    label={
                      <Typography className="treeitem-label">
                        <MenuLink
                          key={'11'}
                          smooth
                          to={`#${HashFragmentRouteConstants.LINKS_LANGUAGE_COURSES}`}
                        >
                          {t('links_language_courses')}
                        </MenuLink>
                      </Typography>
                    }
                  />
                </TreeItem>
                <TreeItem
                  nodeId={'17'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        key={'12'}
                        smooth
                        to={`#${HashFragmentRouteConstants.LINKS_FOR_TEACHERS}`}
                      >
                        {t('common_for_teachers')}
                      </MenuLink>
                    </Typography>
                  }
                />
                <TreeItem
                  nodeId={'18'}
                  label={
                    <Typography className="treeitem-label">
                      <MenuLink
                        key={'13'}
                        smooth
                        to={`#${HashFragmentRouteConstants.LINKS_ESTONIAN_LANGUAGE_CORPORA}`}
                      >
                        {t('common_estonian_language_corpora')}
                      </MenuLink>
                    </Typography>
                  }
                />
              </TreeView>
            </Box>
          </Box>

          <Box className="link-container-right">
            <Box>
              <div id={HashFragmentRouteConstants.LINKS_INTRODUCTION} className="link-anchor-gap"></div>
              <Typography className="px-5 text-center">
                ELLE eesmärk on eesti keele õpet igati toetada, mistõttu oleme
                lingikogusse koondanud hulgaliselt erinevaid keskkondi, millest võib kasu olla nii eesti keele
                õppijatele,
                õpetajatele kui ka keeleteadlastele. Kui ELLEst jääb väheks, siis ehk leiad sobiliku lehe siit! Kui ei,
                siis anna meile teada!
              </Typography>
            </Box>

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_DICTIONARIES} className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_dictionaries')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://sonaveeb.ee/'}
              name={'Sõnaveeb'}
              tekst={'Keskkond koondab mitmeid sõnaraamatuid ja andmebaase, et anda võimalikult detailne ülevaade otsitud sõnast või väljendist. Sõnaveebist saad abi, kui tahad näiteks näha sõna kasutuskontekstis, leida tema tähendused, muutevormid, päritoluinfo, sünonüümid või uurida, milliste sõnadega ta tavaliselt koos esineb.\n'}
              image={IMAGES.sonaveeb}
              tags={['koondsõnastik', 'terminisõnastik']} />

            <SingleLink
              siteLink={'https://sonaveeb.ee/lite'}
              name={'Keeleõppija Sõnaveeb'}
              tekst={'Keeleõppijatele suunatud lihtsustatud sõnastik koos piltidega.'}
              image={IMAGES.keeleoppija_sonaveeb}
              tags={['keeleõppesõnastik']} />

            <SingleLink
              siteLink={'https://portaal.eki.ee/sonaraamatud.html'}
              name={'EKI sõnaraamatud'}
              tekst={'Eesti keele instituut (EKI) on loonud suurema osa Eestis kasutatavatest sõnastikest ja lingid eraldi sõnastikele on leitavad nende koduleheküljelt. Siit leiad nii eesti keele sõnastikke, terminisõnastikke kui ka murdesõnaraamatuid ja sugulaskeelte sõnastikke.'}
              image={IMAGES.eki}
              tags={['sõnaraamatud', 'terminisõnastik', 'murdesõnastik', 'sugulaskeeled']} />

            <SingleLink
              siteLink={'https://glosbe.com/'}
              name={'Glosbe'}
              tekst={'Mitmekeelne veebisõnastik, mis sisaldab tõlkeid, sõnatähendusi, võrreldavaid lauseid kahes keeles ja hulgaliselt näitelauseid. Sõnastikku on kasutajatel võimalik ise täiendada, et ükski tähendusnüanss ei jääks kahe silma vahele.'}
              image={IMAGES.glosbe}
              tags={['tõlkesõnastik']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_TRANSLATION_TOOLS} className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_translation_tools')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://tolkevarav.eki.ee/'}
              name={'Tõlkevärav'}
              tekst={'Tegu on EKI ning Haridus- ja Teadusministeeriumi koostöös loodud tõlkerakendusega, mis suudab tuvastada ametlikke tekste (nt õigustekste) ja tõlkida neid eesti, vene, inglise või saksa keelte vahel.'}
              image={IMAGES.eki}
              tags={['tõlkerakendus', 'tasuta']} />

            <SingleLink
              siteLink={'https://masintolge.ut.ee/'}
              name={'Neurotõlge'}
              tekst={'Tegu on Tartu Ülikooli juures loodud mitmekeelse masintõlkerakendusega, mis tuvastab ise tõlgitava teksti keele või keeled. Tõlkida saab ka eesti keelest eesti keelde, et saada kätte parandatud kirjutis. Rakenduse eelis on ka võimalus kõrvutada saadud tõlget Tilde ja Google Translate’i tõlgetega.'}
              image={IMAGES.neurotolge}
              tags={['tõlkerakendus', 'tekstikorrektor', 'tasuta']} />

            <SingleLink
              siteLink={'https://translate.tilde.com/#/'}
              name={'Tilde'}
              tekst={'Tegu on masintõlkerakendusega, mis suudab tõlkida tekste mitmest maailma keelest. Rakendus tõlgib ka üleslaetud tekste.'}
              image={IMAGES.tilde}
              tags={['tõlkerakendus', 'tasuta', 'tasuline']} />

            <SingleLink
              siteLink={'https://translate.google.com/?sl=et&tl=en&op=translate'}
              name={'Google Translate'}
              tekst={'Paljude maailma keelte peal töötav tõlkerakendus, millega on võimalik tõlkida ka terveid veebilehekülgi ja dokumente. Nutiseadmes kasutades võimaldab ka sünkroonset tõlget koostöös nutitelefoni kaameraga. Rakendus töötab paremini pikemate kirjutistega, sest suudab konteksti põhjal paremat tõlget pakkuda. Üksikuid sõnu tõlkides võib esimesel juhul vale variandi pakkuda, kuid esitab seevastu ka tõlkealternatiive.'}
              image={IMAGES.google_translate}
              tags={['tõlkerakendus', 'tasuta']} />


            <Box>
              <div id={HashFragmentRouteConstants.LINKS_ESTONIAN_TEXTS} className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_estonian_texts')}
              </Typography>
            </Box>

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_MEDIA_TEXTS}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_media_texts')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://www.err.ee/'}
              name={'ERR uudised'}
              tekst={'Eesti riiklik uudisteportaal, mille sisu vaatamise eest ei pea maksma. Lisaks uudistele saab sellelt lehelt ligi ka sama konsortsiumi alla kuuluvale tele- ja raadiosisule.'}
              image={IMAGES.err_logo}
              tags={['uudised', 'tasuta']} />

            <SingleLink
              siteLink={'https://sirp.ee/'}
              name={'Sirp'}
              tekst={'Tegu on kõikvõimalikke kultuuriteemasid käsitleva ajakirjaga, mida on veebist võimalik tasuta lugeda.'}
              image={IMAGES.sirp}
              tags={['uudised', 'tasuta']} />

            <SingleLink
              siteLink={'https://www.ohtuleht.ee/'}
              name={'Õhtuleht'}
              tekst={'Õhtulehe Kirjastuse uudisteportaal, kus on lisaks Õhtulehele lingitud ka mitmed teised kirjastuse väljaantavad ajakirjad. Uudiste eest on valdavalt vaja maksta, kuid mõned lühemad uudised on ka tasuta kättesaadavad.'}
              image={IMAGES.ohtuleht}
              tags={['uudised', 'tasuline']} />

            <SingleLink
              siteLink={'https://www.postimees.ee/'}
              name={'Postimees'}
              tekst={'Valdavalt tasuline uudisteportaal. Lehel on võimalik kuulata ka Postimehe taskuhäälinguid.'}
              image={IMAGES.postimees}
              tags={['uudised', 'tasuline', 'taskuhääling']} />

            <SingleLink
              siteLink={'https://www.delfi.ee/'}
              name={'Delfi'}
              tekst={'Üks Ekspress Meedia pakutavatest veebiuudiste portaalidest, kus on valdavalt tasuline sisu. Lehel on lingitud ka teised konsortiumile kuuluvad ajalehed. Siit on võimalik ligi saada ka Delfi taskuhäälingutele.'}
              image={IMAGES.delfi}
              tags={['uudised', 'tasuline', 'taskuhääling']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_LITERATURE}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_literature')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://ellu.keskraamatukogu.ee/'}
              name={'E-raamatukogu ELLU'}
              tekst={'Tallinna Keskraamatukogu e-raamatukogu, kust on võimalik laenutada nii eesti-, vene- kui ka ingliskeelset kirjandust.'}
              image={IMAGES.ellu}
              tags={['e-raamatud', 'raamatud', 'tasuta']} />

            <SingleLink
              siteLink={'https://www.digar.ee/arhiiv/et'}
              name={'DIGAR digitaalarhiiv'}
              tekst={'Eesti Rahvusraamatukogu digitaalarhiiv, mis sisaldab rohkelt raamatuid ja ajakirju erinevatest ajaperioodidest. Arhiivis sisalduvad raamatud ja ajakirjad ei ole alati avalikkusele kättesaadavad, kuid neid, mis on, võib tasuta lugeda kõikjal või ainult Eesti Rahvusraamatukogu sisevõrgus.'}
              image={IMAGES.digar}
              tags={['raamatud', 'ajakirjad', 'arhiiv', 'tasuta']} />

            <SingleLink
              siteLink={'https://www.poogen.ee/'}
              name={'Poogen'}
              tekst={'Kirjandusportaal, kus kasutajad saavad ise oma loomingut avaldada. Sealt võib leida nii eestikeelset proosat, luulet, näidendeid kui ka arvamusartikleid.'}
              image={IMAGES.poogen}
              tags={['kirjandus', 'tasuta']} />

            <SingleLink
              siteLink={'https://www.digiraamat.ee/index/index/tab/free'}
              name={'Digiraamat'}
              tekst={'E-raamatupood, kus leidub nii tasuta kui ka tasulisi raamatuid ja ajakirju.'}
              image={IMAGES.digiraamat}
              tags={['e-raamatud', 'e-ajakirjad', 'raamatud', 'ajakirjad', 'tasuta', 'tasuline']} />

            <SingleLink
              siteLink={'https://www.kriso.ee/cgi-bin/shop/freeebooks.html'}
              name={'Krisostomuse tasuta e-raamatud'}
              tekst={'Krisostomuse raamatukaupluse e-pood, kust on võimalik lisaks tasulistele raamatutele leida ka mitmeid tasuta raamatuid ja ajakirju.'}
              image={IMAGES.krisostomus}
              tags={['e-raamatud', 'e-ajakirjad', 'raamatud', 'ajakirjad', 'tasuta', 'tasuline']} />

            <SingleLink
              siteLink={'https://galerii.kirmus.ee/grafo/grupp.php?id=3'}
              name={'Grafo vanemate lasteraamatute arhiiv'}
              tekst={'Eesti Kirjandusmuuseumi Arhiivraamatukogu on sellele lehele koondanud mitmeid vanemaid trükiseid, kuid eesti keele õppijatele ja eriti lastele võiksid huvi pakkuda lehelt leitavad lasteraamatud.'}
              image={IMAGES.grafo}
              tags={['raamatud', 'tasuta', 'arhiiv', 'lastele']} />

            <SingleLink
              siteLink={'https://kreutzwald.kirmus.ee/'}
              name={'Kreutzwaldi sajand'}
              tekst={'Eesti Kirjandusmuuseumi keskkond, kust võib leida 19. ja 20. sajandil ilmunud eestikeelset kirjandust.'}
              image={IMAGES.kreuzwaldisajand}
              tags={['raamatud', 'e-raamatud', 'tasuta', 'arhiiv']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_ACADEMIC_TEXTS}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_academic_texts')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://www.etera.ee/'}
              name={'ETERA'}
              tekst={'Tallinna Ülikooli Akadeemilise Raamatukogu e-raamatukogu, kust leiab nii lõputöid kui ka vanemaid digiteeritud ajalehti ja raamatuid. Kõik teavikud on tasuta loetavad, kuid mõne lugemiseks on tarvis olla Tallinna Ülikooli või akadeemilise raamatukogu sisevõrgus.'}
              image={IMAGES.etera}
              tags={['lõputööd', 'õpikud', 'ajalehed', 'ajakirjad', 'raamatud', 'tasuta', 'arhiiv']} />

            <SingleLink
              siteLink={'https://digikogu.taltech.ee/'}
              name={'TalTechi digikogu'}
              tekst={'Tallinna Tehnikaülikooli raamatukogu digikogu, mis sisaldab suuresti TalTechis kaitstud lõputöid, kuid ka muid ülikooliga seotud publikatsioone ja õppetööks vajalikke õpikuid. Kõik teavikud on tasuta kättesaadavad, kuid mõne lugemiseks on tarvis olla TalTechi raamatukogu sisevõrgus.'}
              image={IMAGES.taltech}
              tags={['lõputööd', 'õpikud', 'ajakirjad', 'tasuta', 'arhiiv']} />

            <SingleLink
              siteLink={'https://dspace.ut.ee/'}
              name={'DSpace'}
              tekst={'Tartu Ülikooli raamatukogu digitaalne arhiiv, mis sisaldab nii lõputöid kui ka digiteeritud raamatuid ajakirju ja käsikirju. Arhiivist leitu on tasuta loetav ja allalaaditav.'}
              image={IMAGES.tu}
              tags={['lõputööd', 'õpikud', 'raamatud', 'ajakirjad', 'tasuta', 'arhiiv']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_AUDIOVISUAL_MEDIA} className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_audiovisual_media')}
              </Typography>
            </Box>

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_SERIES_FILMS_VIDEOS}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_series_films_videos')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://jupiter.err.ee/video'}
              name={'Jupiter'}
              tekst={'Eesti Rahvusringhäälingu videoportaal, kust võib leida nii eestikeelseid kui ka eestikeelsete subtiitritega välismaiseid filme, sarju ja telesaateid. Lisaks on lehel võimalik otse vaadata ETV-d, ETV2-te ja ETV+. Keskkond on tasuta, kuid mõne video vaatamiseks tuleb sisse logida.'}
              image={IMAGES.jupiter}
              tags={['televisioon', 'tasuta', 'saated', 'sarjad', 'filmid']} />

            <SingleLink
              siteLink={'https://lasteekraan.err.ee/'}
              name={'Lasteekraan'}
              tekst={'Tegu on Eesti Rahvusringhäälingu lastelehega, kus pakutakse mitmete multikate, lastesaadete ja mängude kõrval ka eestikeelseid audioraamatuid. Keskkond on kõigile tasuta, kuid mõne videosisu vaatamiseks peab sisse logima.'}
              image={IMAGES.lasteekraan}
              tags={['tasuta', 'lastele', 'audioraamatud', 'saated', 'sarjad', 'filmid']} />

            <SingleLink
              siteLink={'https://arhiiv.err.ee/'}
              name={'ERR arhiiv'}
              tekst={'Eesti Rahvusringhäälingu video- ja audioarhiiv, mis sisaldab vanemaid eestikeelseid filme, videosid, pilte ja raadiosaateid, kuid kuhu on koondatud ka Tallinna Ülikooli Balti Filmi- ja Meediakooli üliõpilaste loodud sisu. Keskkond on kõigile tasuta kättesaadav.'}
              image={IMAGES.err_arhiiv}
              tags={['tasuta', 'saated', 'sarjad', 'filmid', 'arhiiv']} />

            <SingleLink
              siteLink={'https://arkaader.ee/landing/br/rHczO7kKnl'}
              name={'Arkaader - Eesti filmi kodu'}
              tekst={'Eesti Filmi Instituudi ja Rahvusarhiivi loodud keskkond, kus saab vaadata nii uusi kui ka vanu Eesti filme ning tutvuda Eesti filmiajalooga. Valikust leiab nii mängu-, dokumentaal- kui ka animafilme. Suur osa sisust on tasuta ja selle vaatamiseks pole vaja sisse logida.'}
              image={IMAGES.arkaader}
              tags={['filmid', 'tasuta', 'arhiiv']} />

            <SingleLink
              siteLink={'https://kanal2.postimees.ee/pluss/avaleht'}
              name={'Kanal 2 veebi TV'}
              tekst={'Kanal 2 veebikeskkond, kust on võimalik vaadata filme, saateid ja sarju. Lisaks on võimalik vaadata otse Kanal 2 telekanaleid. Tasuta on keskkonnas vaid mõningad eestimaised saated, kuid filmide, sarjade ja otsetelevisiooni vaatamine on tasuline.'}
              image={IMAGES.kanal2}
              tags={['televisioon', 'filmid', 'saated', 'sarjad', 'tasuline']} />

            <SingleLink
              siteLink={'https://play.tv3.ee/'}
              name={'TV3 Play'}
              tekst={'TV3 veebikeskkond, kust on kõigil võimalik tasuta vaadata mõningaid TV3 eetris olnud saateid, sarju ja filme. Selleks, et sisu vaadata tuleb lehel välja lülitada oma reklaamiblokeerija.'}
              image={IMAGES.tv3play}
              tags={['sarjad', 'saated', 'filmid', 'tasuta']} />

            <SingleLink
              siteLink={'https://go3.tv/'}
              name={'Go3'}
              tekst={'TV3 tasuline veebikeskkond, kust on võimalik vaadata filme, sarju, saateid ja ka neid laenutada. Seal on võimalik otse vaadata ka erinevaid telekanaleid, mitte ainult neid, mis kuuluvad TV3 Gruppi. Keskkond toimib ka välismaal, kuid registreerudes on vaja esitada Eesti telefoninumber.'}
              image={IMAGES.go3}
              tags={['sarjad', 'saated', 'filmid', 'videolaenutus', 'tasuline', 'televisioon']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_RADIO_AUDIO_PODCASTS}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_radio_audio_podcasts')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://r4.err.ee/1011175/keelekodi-urok-jestonskogo-jazyka'}
              name={'Keelekõdi'}
              tekst={'Raadio 4 taskuhääling vene emakeelega keeleõppijatele. Õpetatakse eesti keele grammatikat ja väljendeid.'}
              image={IMAGES.r4}
              tags={['taskuhääling']} />

            <SingleLink
              siteLink={'https://podcastid.ee/eesti-podcastid-kategooriatena/'}
              name={'Eesti podcastid'}
              tekst={'Keskkond koondab erinevatel platvormidel avaldatud eestikeelseid taskuhäälinguid ja jagab need temaatilistesse kategooriatesse.'}
              image={IMAGES.podcastid}
              tags={['taskuhääling']} />

            <SingleLink
              siteLink={'https://vikerraadio.err.ee/'}
              name={'Vikerraadio'}
              tekst={'Eesti Rahvusringhäälingu raadiojaam, kust kuuleb lisaks muusikale ka mitmeid kultuuri- ja vestlussaateid.'}
              image={IMAGES.vikerraadio}
              tags={['raadio']} />

            <SingleLink
              siteLink={'https://r2.err.ee/'}
              name={'Raadio 2'}
              tekst={'Eesti Rahvusringhäälingu raadiokanal, kus mängitakse rohkelt uut muusikat nii Eestist kui ka välismaalt. Lisaks on eetris ka rohkelt vestlussaateid.'}
              image={IMAGES.raadio2}
              tags={['raadio']} />

            <SingleLink
              siteLink={'https://sky.ee/tag/skyplus/#SkyPlus'}
              name={'SkyPlus'}
              tekst={'Sky Media meelelahutuslik raadiokanal, kus on rohkelt muusikat, kuid ka raadiomänge ja vestlussaateid. Sky muusikaportaali lehel on ka linke teistele sama konsortsiumi raadiokanalitele ja taskuhäälingutele. Lisaks on seal ka mitmeid meelelahutuslikke uudiseid nii Eestist kui ka välismaalt.'}
              image={IMAGES.sky}
              tags={['raadio', 'uudised', 'taskuhääling']} />

            <SingleLink
              siteLink={'https://kuku.postimees.ee/'}
              name={'Kuku raadio'}
              tekst={'Rohkelt uudiseid, päevakajalisi vestlussaateid ja veidike muusikat sisaldav raadiokanal.'}
              image={IMAGES.kukuraadio}
              tags={['raadio', 'uudised']} />

            <SingleLink
              siteLink={'https://jupiter.err.ee/raadioteater'}
              name={'Raadioteater'}
              tekst={'Eesti Rahvusringhäälingu kuuldemängude kogumik, mis sisaldab mitmetes raadiokanalites esitatud järjejutte ja raadioteatri etendusi, kuid ka vestlussaateid eesti keele ja sugulaskeelte teemadel.'}
              image={IMAGES.jupiter}
              tags={['kuuldemäng', 'järjejutt']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_LEARNING_RESOURCES} className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_learning_resources')}
              </Typography>
            </Box>

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_LANGUAGE_LEARNING_MATERIALS_AND_EXERCISES}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_language_learning_materials_and_exercises')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://sonaveeb.ee/learn'}
              name={'Sõnaveebi keeleõpe'}
              tekst={'Eesti Keele Instituudi keeleõppematerjalide lehekülg Sõnaveebis, millest saavad kasu nii algajad keeleõppijad kui ka emakeelekõnelejad. Lehekülg sisaldab muuhulgas piltsõnastikku, kasulikke fraase ja põhilisi õigekirjareegleid, kuid õpetatakse ka vormistama tabeleid ja loetelusid või e-kirju ja avaldusi.'}
              image={IMAGES.sonaveeb}
              tags={['õigekiri', 'vormistus', 'algaja keeleõppija', 'õppematerjal', 'tasuta']} />

            <SingleLink
              siteLink={'https://eki.ee/teatmik/'}
              name={'EKI Teatmik'}
              tekst={'Eesti õigekeelsuskäsiraamat, mis sisaldab mitmesugust teavet tänapäeva eesti keele kohta, sh keelenõuandeid, seisukohavõtte, loendeid jm.'}
              image={IMAGES.eki}
              tags={['õppematerjal', 'õigekiri', 'vormistus', 'tasuta']} />

            <SingleLink
              siteLink={'https://www.taskutark.ee/aine/eesti-keel/'}
              name={'Taskutark'}
              tekst={'Õppematerjalid ja harjutused, mis on jaotatud erinevate kooliastmete, klasside ja õppeainete kaupa. Eesti keele materjalide seast võib õppida nii keele- kui ka vormistusreegleid ja testida oma teadmisi. Algklassidele mõeldud materjalid on igati sobivad ka algajale keeleõppijale.'}
              image={IMAGES.taskutark}
              tags={['õppematerjal', 'harjutus', 'õigekiri', 'vormistus', 'tasuta', 'tasuline']} />

            <SingleLink
              siteLink={'https://e-koolikott.ee/'}
              name={'E-koolikott'}
              tekst={'Rohkelt digitaalseid õppematerjale ja harjutusi sisaldav keskkond, kus on õppematerjalid jaotatud kooliastmete järgi. Sealt võib leida õppevara nii eesti emakeelega õpilastele kui ka eesti keelt teise keelena kõnelevatele õppijatele. Osa materjale on lehele vistutatud ja neid on võimalik kohe eKoolikotis teha, kuid osa on esitatud linkidena teistele lehtedele või töölehena allalaaditavad.'}
              image={IMAGES.ekoolikott}
              tags={['õppematerjal', 'harjutus', 'tasuta']} />

            <SingleLink
              siteLink={'https://www.opiq.ee/Search/Kits?searchPhrase=&CurriculumGroup=&classcourse=&subject=Estonian&publishinghouse=&package=&language=&sortingorder=LanguageFirst'}
              name={'Opiq'}
              tekst={'E-õpikute kogumik, mis sisaldab mitme erineva õppeaine jaoks loodud sisu. Eesti keele õpikutest leiad nii õppematerjale kui ka nende juurde käivaid harjutusi. Kooliõpilastele, kel on eKooli või Stuudiumi konto, on Opiq üldjuhul tasuta, kuid erakasutajale on Opiq-u kasutamine kuutasuline, kusjuures tasuta tutvumiseks on tihtipeale kättesaadav esimene peatükk.'}
              image={IMAGES.opiq}
              tags={['õpikud', 'tasuta', 'tasuline', 'õppematerjal', 'harjutus']} />

            <SingleLink
              siteLink={'https://eis.ekk.edu.ee/eis/lahendamine?rid=13177091685934061&sort=ylesanne.id&psize=&id=&aine=E&aste=&kvaliteet=&teema=&alateema=&ylkogu_id=&testiliik=&keeletase=&lang=&kysimus=&otsi=1'}
              name={'EISi eesti keele tasemetestid'}
              tekst={'Siit leiad õppeainete kaupa jaotatud eksamiülesannete kogumiku. Harjutusi on kõigil võimalik teha tasuta ja sisse logimata.'}
              image={IMAGES.eis}
              tags={['harjutus', 'tasuta', 'eksam']} />

            <SingleLink
              siteLink={'http://web.meis.ee/testest/goto.php?target=root_1&client_id=integratsioon'}
              name={'Eesti keele tasemetestid'}
              tekst={'Siit leiad näidisülesandeid, mis aitavad sul eesti keele tasemeeksamiks ette valmistuda. Lehelt leiad nii automaatse tagasisidega kui ka tagasisideta teste, mis annavad aimu tasemeeksami ja selle ülesannete ülesehitusest.'}
              image={IMAGES.eesti_k_tasemetestid}
              tags={['harjutus', 'tasuta', 'eksam']} />

            <SingleLink
              siteLink={'http://keeleabi.eki.ee/?leht=11'}
              name={'EKI keelenõuande testid'}
              tekst={'Eesti keele teadmisi kontrollivad valikvastustega testid.'}
              image={IMAGES.eki}
              tags={['harjutus', 'tasuta']} />

            <SingleLink
              siteLink={'https://www.tandm.ee/harjutused/'}
              name={'Tandm'}
              tekst={'Vene emakeelega õppijatele suunatud keskkond, kus on võimalik leida tasemeeksami näidiseid ja õppida nii sõnavara kui ka grammatikat.'}
              image={IMAGES.tandm}
              tags={['harjutus', 'õppematerjal', 'eksam', 'tasuta']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_LANGUAGE_LEARNING_GAMES}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_language_learning_games')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://k44nuk.ee/'}
              name={'Käänuk'}
              tekst={'Mäng, mis õpetab sihitist õigesti kasutama, esitades mängijale lühikesi valikvastustega täidetavaid koomikseid. Mänguga käib kaasas ka EKI sihitisesõnastik.'}
              image={IMAGES.kaanuk}
              tags={['mäng', 'arvuti', 'tasuta']} />

            <SingleLink
              siteLink={'https://play.google.com/store/apps/details?id=com.AblasAlpa.AlpaOnUnity&hl=en_US&gl=US'}
              name={'ALPA Kids'}
              tekst={'Eestikeelsed digiõppemängud, mis sobivad eriti lastele või algajatele keeleõppijatele. Teenus on saadaval vaid nutiseadmes ja on tasuline, kuid seevastu reklaamivaba.'}
              image={IMAGES.alpakids}
              tags={['tasuline', 'mäng', 'nutiseade', 'lastele']} />

            <SingleLink
              siteLink={'http://www11.edu.fi/retki_viroon/'}
              name={'Retk Eestisse'}
              tekst={'Eesti kultuuri tutvustav keelemäng algkooliõpilastele või algajatele keeleõppijatele. Mängija saab külastada kaardil mitut Eesti linna, tutvuda kohaliku kultuuriga, mängida minimänge ja teha õigekirjaharjutusi.'}
              image={IMAGES.retkeestisse}
              tags={['tasuta', 'mäng', 'arvuti', 'harjutus', 'lastele']} />

            <SingleLink
              siteLink={'https://sonaveeb.ee/games'}
              name={'Sõnaveebi keelemängud'}
              tekst={'Sõnaveebi keeleõppemängud, millest osad on sobilikud kõigile keeleõppijatele, osad aga vene emakeelega õppijatele. Mängudes tuleb hinnata, kas tegu on eestikeelse sõnaga või leida, kumb esitatud sõnapaaridest on üksteisele sarnasemad.'}
              image={IMAGES.sonaveeb}
              tags={['tasuta', 'mäng', 'arvuti', 'nutiseade']} />

            <SingleLink
              siteLink={'https://keeleressursid.ee/et/keelemangud'}
              name={'Keeleressursside keskuse "Keelemängud"'}
              tekst={'Keeleressursside keskuse koondatud keelemängude loetelu. Mängi näiteks sõnaseletusmängu Alias või loo lõbusaid anagramme oma nimest anagrammimasinaga.'}
              image={IMAGES.ekrk}
              tags={['tasuta', 'mäng', 'arvuti']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_LEARNING_ENVIRONMENTS_AND_COURSES}
                   className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_learning_environments_and_courses')}
              </Typography>
            </Box>

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_LANGUAGE_LEARNING_ENVIRONMENTS}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_language_learning_environments')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://keeleklikk.ee/'}
              name={'Keeleklikk ja Keeletee'}
              tekst={'Tasuta eesti keele veebikursused algajatele ja juba edasijõudnud õppijatele, kättesaadavad nii vene kui ka inglise keeles. Keskkonnas on nii videopõhiseid õppematerjale kui ka automaatse tagasisidega harjutusi. Lisaks on õppijatel võimalik saada vahetut tagasisidet kirjutades päris eesti keele õpetajale.'}
              image={IMAGES.keelekliki_logo}
              tags={['e-kursus', 'tasuta', 'keeleõppekeskkond', 'arvuti', 'nutiseade']} />

            <SingleLink
              siteLink={'https://speakly.me/'}
              name={'Speakly'}
              tekst={'Tasuline keeleõppekeskkond, kus saab õppida statistiliselt kõige olulisemaid eesti keele sõnu ja lauseid. Selleks on keskkonnas nii lugemis-, kuulamis-, rääkimis-, kui ka kirjutamisülesandeid.'}
              image={IMAGES.speakly}
              tags={['tasuline', 'keeleõppekeskkond', 'arvuti', 'nutiseade']} />

            <SingleLink
              siteLink={'https://walktalk.ee/'}
              name={'WalkTalk'}
              tekst={'Asukohapõhine keeleõpperakendus, mis aitab õppijal omandada väljendeid, mida just neis kohtades, nt poes, tänaval või kohvikus vaja võiks minna. Keskkond on saadaval vaid nutiseadmes ja on tasuline.'}
              image={IMAGES.walktalk}
              tags={['tasuline', 'nutiseade', 'keeleõppekeskkond']} />

            <SingleLink
              siteLink={'https://multikey.app/'}
              name={'Multikey'}
              tekst={'Suhtluspõhine tasuta keeleõppekeskkond, mis viib kokku erinevate emakeeltega keeleõppijad ja võimaldab neil õpitavaid keeli harjutada. Keskkonnas leiad lisaks suhtlusvõimalustele ka linke üritustele, kus keeleõppijad vahetult kokku saavad.'}
              image={IMAGES.multikey}
              tags={['tasuta', 'nutiseade', 'keeleõppekeskkond', 'suhtlus']} />

            <SingleLink
              siteLink={'https://languagedrops.com/'}
              name={'Drops'}
              tekst={'Visuaalne ja mänguline keeleõppekeskkond, kus rõhk on suuresti õpitava keele sõnade treenimisel ja nende sidumisel mälus vastava pildiga. Keskkond on kasutatav nii arvutis kui ka nutiseadmes. Tasuline versioon on reklaamivaba ja piiramatu mänguajaga.'}
              image={IMAGES.drops}
              tags={['tasuta', 'tasuline', 'nutiseade', 'arvuti', 'keeleõppekeskkond']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_LANGUAGE_COURSES}
                   className="link-anchor-gap"></div>
              <Typography variant={'h4'}>
                {t('links_language_courses')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://yleilmakool.ee/oppetoo/'}
              name={'Üleilmakool'}
              tekst={'Kindlal ajal toimuvad eestikeelsed e-kursused Moodle-i keskkonnas. Lisaks eesti keele kursustele on lehelt leitavad ka mõningate teiste õppeainete kursused nii kooliõpilastele kui ka täiskasvanutele. Kursustele saab tasuta registreeruda, kuid individuaaltunnid õpetajaga on tasulised.'}
              image={IMAGES.yleilmakool}
              tags={['e-kursus', 'tasuta', 'tasuline', 'suhtlus']} />

            <SingleLink
              siteLink={'http://eestikeel.ee/'}
              name={'Eesti keele kursus lastele'}
              tekst={'Tasuta e-kursus eesti emakeelega lastele. Kursusel saab teha erinevaid eestikeelseid harjutusi, täita lapsevanema väljaprinditud töölehti kui ka kuulata eestikeelseid laule ja vaadata multifilme.'}
              image={IMAGES.eesti_keel}
              tags={['e-kursus', 'tasuta', 'lastele']} />

            <SingleLink
              siteLink={'https://integratsioon.ee/eesti-keele-kohvikud'}
              name={'Keelekohvikud'}
              tekst={'Integratsiooni Sihtasutuse korraldatavad keelekohvikud, kus avaneb keeleõppijatel võimalus teistega vahetult eesti keeles suhelda ja nii keelt praktiliselt õppida.'}
              image={IMAGES.integratsioon_sa}
              tags={['suhtlus', 'tasuta']} />

            <SingleLink
              siteLink={'https://ekkm.estinst.ee/eesti-keele-ope-valismaal/'}
              name={'Eesti keel ja kultuur maailmas'}
              tekst={'Integratsiooni Sihtasutuse korraldatavad keelekohvikud, kus avaneb keeleõppijatel võimalus teistega vahetult eesti keeles suhelda ja nii keelt praktiliselt õppida.'}
              image={IMAGES.ekkm}
              tags={['kursus']} />

            <SingleLink
              siteLink={'https://www.tahela.com/'}
              name={'Tahela'}
              tekst={'Keskkonnas pakutakse nii tasulist eesti keele kursust individuaalsele või grupis õppijale kui ka tasuta õppevideosid ja keeleõppeharjutusi.'}
              image={IMAGES.tahela}
              tags={['e-kursus', 'suhtlus', 'tasuline', 'tasuta', 'õppematerjal', 'harjutus']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_FOR_TEACHERS} className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_for_teachers')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://leplanner.ee/et/'}
              name={'LePlanner'}
              tekst={'Teemapõhiste tunnistsenaariumite keskkond õpetajatele. Stsenaariumitega on kirjeldatud tundide ülesehitus, läbitavad teemad ja tehtavad harjutused. Lisaks on stsenaariumites välja toodud kui kaua aega igale tegevusele kulub ja kohati on lisatud ka linke vastavatele õppematerjalidele teistes keskkondades.'}
              image={IMAGES.leplanner}
              tags={['tunnistsenaariumid']} />

            <SingleLink
              siteLink={'https://haridustehnoloogid.ee/blog/'}
              name={'Ehtl'}
              tekst={'Eesti Haridustehnoloogide Liidu digitöövahendite kogu, mis sisaldab hulgaliselt linke õppetöös kasutust leidvatele keskkondadele.'}
              image={IMAGES.ehtl}
              tags={['harjutuste loomine']} />

            <SingleLink
              siteLink={'https://pghtl.wordpress.com/e-abimehed/'}
              name={'Pghtl'}
              tekst={'Blogi, mis sisaldab muuhulgas hulgaliselt linke erinevat tüüpi keskkondadele, mida õppetöös kasutada.'}
              image={IMAGES.pghtl}
              tags={['harjutuste loomine']} />

            <SingleLink
              siteLink={'https://sonaveeb.ee/teacher-tools/#/home'}
              name={'Sõnaveebi õpetaja tööriistad'}
              tekst={'Eesti keele kui teise keele õpetajatele loodud tööriistad, mis on abiks tundide ülesehitamisel või õppematerjalide ja harjutuste loomisel. Sisu on jaotatud keeletasemete järgi ja tasemetel õpitavate teemade juures on toodud ka näiteid. Lisaks on lehel võimalik kirjutatud teksti taset ka hinnata ja selle põhjal õpilastele näidatavat teksti lihtsustada.'}
              image={IMAGES.sonaveeb}
              tags={['keeletasemed', 'tasemehinnang', 'eesti keel teise keelena', 'EKI']} />

            <Box>
              <div id={HashFragmentRouteConstants.LINKS_ESTONIAN_LANGUAGE_CORPORA} className="link-anchor-gap"></div>
              <Typography variant={'h3'}>
                {t('common_estonian_language_corpora')}
              </Typography>
            </Box>

            <SingleLink
              siteLink={'https://korp.keeleressursid.ee/'}
              name={'KORP'}
              tekst={'Erinevaid eesti keele korpusi koondav korpuspäringukeskkond. Sealt võib leida nii tänapäevaseid kui ka ajaloolisi korpuseid ning otsida keeleõppijatele mõeldud lihtsaid lauseid ja õpikuid.'}
              image={IMAGES.korp}
              tags={['korpuspäring']} />

            <SingleLink
              siteLink={'http://keeleveeb.ee/'}
              name={'Keeleveeb'}
              tekst={'Mitmekülgne keskkond, mis võimaldab otsida märksõnu kõigist väljatoodud sõnastikest ja korpustest. Lisaks eesti keele sõnastikele on valikus termini-, kooli-, ja tõlkesõnastikud. Välja on toodud ka viited välislehtedele ja eesti keele tarkvarale.'}
              image={IMAGES.keeleveeb}
              tags={['koondsõnastik', 'korpused', 'korpuspäring', 'terminisõnastik']} />

            <SingleLink
              siteLink={'https://skell.sketchengine.eu/#home'}
              name={'SkeLL'}
              tekst={'Keeleõppijatele mõeldud eestikeelsete näitelausete otsing Sketch Engine’is sisalduvast eesti keele ühendkorpusest 2017 ja eesti keele A1-C1 õpikute korpusest 2018. Siit leiab lisaks ka sarnased sõnad ja saab vaadata otsitava sõna tüüpilisi koosesinemisi.'}
              image={IMAGES.skell}
              tags={['korpuspäring', 'näitelaused', 'sõnavisand']} />

            <SingleLink
              siteLink={'https://portaal.eki.ee/keelekogud.html'}
              name={'EKI keelekogud'}
              tekst={'Erinevate Eesti Keele Instituudi loodud korpuste loend.'}
              image={IMAGES.eki}
              tags={['korpused']} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Links;
