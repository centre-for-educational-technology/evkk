package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.mapping.ClusterResultMapper;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class ClusterServiceImpl implements ClusterService {

  private static final Logger log = LoggerFactory.getLogger(ClusterServiceImpl.class);

  private final ClusterResultMapper resultMapper;

  public ClusterServiceImpl(ClusterResultMapper resultMapper)
  {
    this.resultMapper = resultMapper;
  }

  @Override
  public ClusterResult clusterText(ClusterSearchForm searchForm)
  {
    String clusteringParams = getClusteringParams(searchForm);

    try
    {
      String markedText = markText(searchForm.getFileName(), searchForm.getFormId());
      String clusteredText = clusterMarkedText(markedText, clusteringParams, searchForm);
      return resultMapper.mapResults(clusteredText, searchForm);
    }
    catch (IOException e)
    {
      log.error("Could not cluster text: {}", e.getMessage());
      return ClusterResult.EMPTY;
    }
  }

  private String getClusteringParams(ClusterSearchForm searchForm)
  {
    StringBuilder sb = new StringBuilder();
    sb.append("-k").append(" ").append(searchForm.getAnalysisLength()).append(" ");

    if (searchForm.isMorfoAnalysis()) {
      sb.append("-m").append(" ");
    }

      if (searchForm.isSyntacticAnalysis()) {
      sb.append("-s").append(" ");
    }

    if (searchForm.isIncludePunctuation()) {
      sb.append("-z").append(" ");
    }

    if (searchForm.isWordtypeAnalysis()) {
      sb.append("-w").append(" ");
    }

    // Always append -e parameter (otherwise clustering won't work)
    sb.append("-e");
    return sb.toString();
  }

  private String markText(String fileName, String formId) throws IOException
  {
    ProcessBuilder markingProcess = new ProcessBuilder("python", "file_text_marker.py", fileName, formId);
    markingProcess.directory(new File("clusterfinder/src/main/resources/scripts").getAbsoluteFile());
    return queryProcess(markingProcess);
  }

  private String clusterMarkedText(String markedTextFile, String clusteringParams, ClusterSearchForm searchForm) throws IOException {
    if (searchForm.isMorfoAnalysis() && searchForm.isSyntacticAnalysis())
    {
      return "3 ; L0 S com sg gen // @NN>; L0 S com sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; ; Jutustaja lell läinud ; Tammiku vanaproua olnud ; Tammiku proua olnud \n" +
        "3 ; Lde S com pl gen // @NN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; Pagude kabeli juures ; Pagude kabeli juurest ; talude müümise ajal \n" +
        "3 ; L0 A pos sg gen // @AN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; praeguse meierei asemel ; suure tooli peal ; uue maja peale \n" +
        "3 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; Hirmus kuri mees ; hirmus tige mees ; hirmus must inimene \n" +
        "2 ; L0 S com sg gen // @P>; L0 K post // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; ; Vallarahva vastu oli ; Viinaköögi kõrval oli \n" +
        "2 ; Lnud V main partic past ps // @ADVL; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; olnud suur haagrehtikohus ; hakanud vana Pagu \n" +
        "2 ; Lnud V main partic past ps // @ADVL; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ @PRD; ; olnud kole inimene ; olnud tige mees \n" +
        "2 ; L0 P pos det refl sg gen // @NN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; oma plaani järele ; oma plaani järele \n" +
        "2 ; L0 S prop sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; Ls S prop sg in // @NN> @ADVL; ; Essen oli Riias ; Essen oli Riias \n" +
        "2 ; L0 S com sg part // @OBJ; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; kõhtu ja öelnud ; risti ja hakanud \n" +
        "2 ; Lnud V main partic past ps // @ADVL @IMV; Lma V main sup ps ill // @IMV; L0 J crd // @J; ; hakanud kõnelema ja ; hakanud naerma ja \n" +
        "2 ; L0 J sub // @J; L0 S prop sg nom // @NN>; L0 S prop sg nom // @SUBJ @ADVL; ; Kui Rahkla Miiling ; Kui Rahkla Miiling \n" +
        "2 ; L0 S com sg nom // @SUBJ; L0 J crd // @J; L0 S com sg nom // @SUBJ; ; kaelavahe ja nägu ; nägu ja rinnaesine \n" +
        "2 ; L0 S com sg gen // @P>; L0 K post // @ADVL; La V main inf // @IMV; ; naha peale anda ; vahi alla võtta \n" +
        "2 ; L0 P pers ps3 sg nom // @SUBJ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; ; tema pole näinud ; tema pole teinud \n" +
        "2 ; Lnud V main partic past ps // @ADVL; L0 P dem sg nom // @NN>; L0 S com sg nom // @SUBJ; ; Olnud niisugune seadus ; Olnud teine niisugene \n" +
        "2 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; L0 J crd // @J; ; uus alus ja ; suur tüli ja \n" +
        "2 ; Li V main indic impf ps3 sg ps af // @FMV; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; oli aus mees ; oli hirmus mees \n" +
        "2 ; L0 S com sg gen // @NN>; L0 S com sg nom // @SUBJ; Li V aux indic impf ps3 sg ps af // @FCV; ; Maamõõtja nimi oli ; Võivere Pagu oli \n" +
        "2 ; L0 S com sg gen // @P>; L0 K post // @ADVL; L0 J crd // @J; ; kabeli juures ja ; muna käes ja \n" +
        "1 ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; Lt S prop sg part // @OBJ; ; pole teretanud Harpet \n" +
        "1 ; L0 A pos // @AN>; L0 A pos sg nom // @AN>; L0 S prop sg nom // @NN> @SUBJ; ; va vana Vamps \n" +
        "1 ; L0 A pos partic // @AN>; L0 P pos det refl sg part // @OBJ; Lle P dem sg all // @NN>; ; näidanud end sellele \n" +
        "1 ; L0 J sub // @J; L0 P pers ps3 sg nom // @SUBJ; Lt S com sg part // @OBJ; ; Kui ta viinavabrikut \n" +
        "1 ; Lnudki V main partic past ps // @ADVL @IMV; L0 S com sg gen // @NN>; L0 S prop sg gen // @P>; ; tekkinudki otsetee Kissa \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg gen // @NN>; L0 S com sg nom // @<NN; ; Avanduse mõisa ülemvalitseja \n" +
        "1 ; L0 S com sg nom // @SUBJ; Ls S com sg in // @<NN @ADVL; Lma V main sup ps ill // @IMV; ; Pagu kodus käima \n" +
        "1 ; Ld S com pl nom // @SUBJ; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; Tõusnud suur tüli \n" +
        "1 ; Ll P dem sg ad // @NN>; Ll S com sg ad // @ADVL; L0 A pos partic // @AN>; ; sel ajal näidanud \n" +
        "1 ; L0 A pos sg gen // @AN>; Lga S com sg kom // @ADVL; Ltud V main partic past imps // @IMV; ; musta kaleviga ehitud \n" +
        "1 ; L0 S com sg adit // @ADVL; Lis V main indic impf ps3 sg ps af // @FMV; L0 P indef sg nom // @ADVL @SUBJ @OBJ; ; Ikka laskis mitu \n" +
        "1 ; L0 P dem sg nom // @SUBJ; Ls V main indic impf ps3 sg ps af // @FMV; L0 P pos det refl sg gen // @NN>; ; see kaotas oma \n" +
        "1 ; Ld S com pl nom // @ADVL; Ll P dem sg ad // @NN>; Ll S com sg ad // @ADVL @<NN; ; mehed sel ajal \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Lda P dem sg part // @OBJ; Lt A pos sg part // @ADVL @PRD; ; hoidnud seda väikest \n" +
        "1 ; L0 J crd // @J; Li S com pl part // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; ; ja lilli oli \n" +
        "1 ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; Ld P dem pl part // @NN>; ; pole teadnud neid \n" +
        "1 ; L0 S prop sg nom // @NN> @SUBJ; L0 P pos det refl sg nom // @<NN; Lb V main indic pres ps3 sg ps af // @FMV; ; Harpe ise seisab \n" +
        "1 ; Lda P dem sg part // @OBJ; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; seda ja lasknud \n" +
        "1 ; L0 K post // @ADVL; Ls V main indic impf ps3 sg ps af // @FMV; Lda P pers ps3 sg part // @OBJ; ; juurest hakkas teda \n" +
        "1 ; L0 J sub // @J; L0 P indef sg nom // @ADVL @OBJ; L0 S com sg gen // @P>; ; Kui miski asja \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S prop sg nom // @NN>; L0 J crd // @J; ; Vana Jenk ja \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; Vana uhke tamm \n" +
        "1 ; L0 P dem sg nom // @NN>; Ld S com pl nom // @SUBJ @OBJ; Lma V main sup ps ill // @ADVL @IMV; ; see pistnud karjuma \n" +
        "1 ; Lna S com sg es // @ADVL @<NN; L0 S com sg gen // @ADVL; L0 V main imper pres ps2 sg ps af // @FMV; ; lapsena mõisa mune \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 A pos partic // @ADVL; Ltest P dem pl el // @ADVL; ; muna olnud teistest \n" +
        "1 ; L0 J crd // @J; L0 S com sg nom // @SUBJ; Lnud V main partic past ps // @ADVL @IMV; ; aga vanarahvas kõnelnud \n" +
        "1 ; L0 A pos partic // @AN>; L0 S com sg nom // @ADVL; L0 V main imper pres ps2 sg ps af // @FMV; ; tõusnud puusärk õhku \n" +
        "1 ; L0 A pos partic // @ADVL; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; lugenud ja palunud \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Lda P dem sg part // @OBJ; L0 S com sg gen // @ADVL; ; käskinud seda mõisa \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S prop sg nom // @SUBJ; Li V aux indic impf ps3 sg ps af // @FCV; ; Vana Zoege oli \n" +
        "1 ; L0 K post // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; L0 S com sg nom // @SUBJ; ; kõrval oli puukamber \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 A pos partic // @AN>; L0 S prop sg nom // @<NN; ; hommikul olnud Essen \n" +
        "1 ; L0 S com sg nom // @NN> @OBJ; L0 S prop sg nom // @SUBJ; Lis V main indic impf ps3 sg ps af // @FMV; ; von Bremen mõistis \n" +
        "1 ; L0 P det sg nom // @NN> @SUBJ @PRD; L0 P inter rel sg nom // @NN> @<NN @SUBJ; Ll P pers ps3 sg ad // @<NN @ADVL; ; kõik mis tal \n" +
        "1 ; Lda P pers ps3 sg part // @OBJ @SUBJ; Lks S com sg tr // @ADVL; Ltud V mod partic past imps // @ADVL @ICV; ; teda vaimuks peetud \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg nom // @SUBJ; L0 A pos // @AN>; ; Koila mõis läinud \n" +
        "1 ; L0 S com sg nom // @NN>; L0 S prop sg nom // @SUBJ; Lvat V aux quot pres ps af // @ICV @FCV; ; Padu Kooli-Juhan olevat \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; L0 P det sg nom // @OBJ @SUBJ; Lle P dem sg all // @<NN @ADVL; ; jooksnud kumbki teisele \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; Lle S com sg all // @ADVL; Ldi V main indic impf imps af // @FMV; ; tema jutule mindi \n" +
        "1 ; L0 A pos partic // @AN>; L0 S prop sg nom // @<NN; L0 A pos // @ADVL; ; olnud Essen surnud \n" +
        "1 ; L0 S prop sg nom // @SUBJ; L0 J crd C // @J; Lis V main indic impf ps3 sg ps af // @FMV; ; Salla ja ostis \n" +
        "1 ; L0 S com sg part // @OBJ; Lda V main inf // @OBJ; Lle S com sg all // @ADVL; ; krahvi meelitada kaardimängule \n" +
        "1 ; Ls S com sg in // @ADVL @<NN; L0 P dem indef sg nom // @NN>; L0 S com sg nom // @SUBJ; ; mõisas üks härra \n" +
        "1 ; Lis V main indic impf ps3 sg ps af // @FMV; L0 P indef sg nom // @ADVL @SUBJ @OBJ; L0 S com sg part // @<Q; ; laskis mitu korda \n" +
        "1 ; L0 P inter rel sg nom // @PRD; L0 P pers ps1 sg nom // @SUBJ; Ln V main indic pres ps1 sg ps af // @FMV; ; kes mina olen \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Lt S com sg part // @OBJ; Lma V main sup ps ill // @IMV; ; hakanud Issameiet paluma \n" +
        "1 ; Lnud V main partic past ps // @IMV; L0 P det pl nom // @NN>; Ld S com pl nom // @SUBJ @OBJ; ; õiendanud kõik asjad \n" +
        "1 ; L0 A pos partic // @AN>; Lst P pers ps1 sg el // @ADVL @<NN; L0 J crd // @J; ; olnud must kui \n" +
        "1 ; Lid S com pl part // @OBJ; Lle S com sg all // @ADVL @<NN; L0 J crd // @J; ; riideid rohule ega \n" +
        "1 ; L0 J crd // @J; L0 A pos // @ADVL @AN>; L0 S com sg gen // @P>; ; ja läinud kuberneri \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; ; Avanduse mõis oli \n" +
        "1 ; L0 P det pl nom // @OBJ; L0 A pos sg gen // @AN>; Lga S com sg kom // @ADVL; ; kõik musta kaleviga \n" +
        "1 ; Ltele S com pl all // @ADVL @<NN; L0 S com sg part // @OBJ; Lst S com sg el // @NN> @<NN @ADVL; ; meestele vilja magasiaidast \n" +
        "1 ; L0 S com sg gen // @NN>; L0 J crd // @J; L0 A pos partic // @AN>; ; selja ja ütelnud \n" +
        "1 ; L0 J crd // @J; L0 S com sg nom // @SUBJ; Ll P pos det refl sg ad // @ADVL @<NN; ; ja kiskund omal \n" +
        "1 ; L0 J sub // @J; L0 S com sg nom // @SUBJ; Llle P pers ps2 sg all // @ADVL @<NN; ; Kui proua sulle \n" +
        "1 ; L0 S com sg gen // @NN> @ADVL; L0 S com sg gen // @NN> @OBJ; Ll S com sg ad // @<NN @ADVL; ; korra mõisa hoovil \n" +
        "1 ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; Lda P dem sg part // @NN>; ; pole julgenud seda \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Li S com pl part // @OBJ @ADVL; Lma V main sup ps ill // @IMV; ; hakanud päevi nõudma \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg nom // @ADVL; Li V aux indic impf ps3 sg ps af // @FCV; ; Simuna kirik oli \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; L0 A pos sg nom // @AN>; L0 S com sg nom // @PRD @ADVL @SUBJ; ; oli terve mägi \n" +
        "1 ; Ld P indef pl nom // @SUBJ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; ; muud pole olnud \n" +
        "1 ; L0 J sub // @J; L0 A pos partic // @AN>; Ld S com pl nom // @SUBJ @OBJ; ; et küpsetatud silgud \n" +
        "1 ; Ldki S com pl nom // @OBJ @SUBJ; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; Tehtudki uus alus \n" +
        "1 ; Ld A pos sg part // @AN>; Lt S com sg part // @OBJ; L0 A pos partic // @AN>; ; head härrat elanud \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; Lt A pos sg part // @AN>; L0 S com sg part // @NN> @OBJ; ; Tema andvat ühtehinge \n" +
        "1 ; Ls A pos sg in // @AN>; Ls S com sg in // @ADVL; L0 J crd // @J; ; pimedas toas ja \n" +
        "1 ; L0 N card sg nom l // @SUBJ; L0 S com sg part // @<Q; L0 A pos sg nom // @PRD; ; sada hoopi kindel \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; Ls S prop sg in // @NN> @ADVL; Lks S com sg tr // @ADVL; ; oli Riias kuberneriks \n" +
        "1 ; Lt S com sg part // @OBJ; L0 V aux neg // @NEG; Lnud V main indic impf ps neg // @FMV; ; otsust ei teinud \n" +
        "1 ; L0 S com sg nom // @SUBJ @ADVL; L0 P pers ps3 sg gen // @NN>; Lle S com sg all // @<NN @ADVL; ; inimene tema jutule \n" +
        "1 ; L0 P pers ps1 sg nom // @SUBJ; Ln V main indic pres ps1 sg ps af // @FMV; L0 S com sg nom // @PRD; ; mina olen keiser \n" +
        "1 ; L0 J sub // @J; L0 S com sg nom // @SUBJ; Lks A pos sg tr // @ADVL; ; kui proua hulluks \n" +
        "1 ; L0 S com sg gen // @NN> @OBJ; Lle S com sg all // @ADVL @<NN; La V main inf // @IMV; ; Nõmmküla nõmmele viia \n" +
        "1 ; Lid V mod indic impf ps3 pl ps af // @FCV; Ld S com pl nom // @SUBJ; L0 S com sg adit // @ADVL @<NN; ; pidid inimesed kraavi \n" +
        "1 ; Lda P pers ps3 sg part // @OBJ @SUBJ; L0 P pos det refl sg gen // @P>; L0 K post // @ADVL; ; teda enda juurde \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; L0 P pos det refl sg gen // @NN>; L0 N card sg nom l // @SUBJ; ; oli oma sada \n" +
        "1 ; L0 S com sg nom // @OBJ; Ltud V main partic past imps // @IMV; Ls S prop sg in // @NN> @ADVL; ; sant maetud Riias \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; tema matuse ajal \n" +
        "1 ; L0 S com sg gen // @NN> @OBJ; Ll S com sg ad // @<NN @ADVL; Lnud V main partic past ps // @ADVL @IMV; ; mõisa hoovil kärkinud \n" +
        "1 ; L0 S com sg part // @OBJ; Lte S com pl gen // @NN>; Lst S com sg el // @<NN @ADVL; ; Pagu meeste seljast \n" +
        "1 ; Lnud V main partic past ps // @ADVL; L0 S com sg gen // @P>; L0 K post // @ADVL; ; Seisnud ukse juures \n" +
        "1 ; Lt S com sg part // @OBJ; Lle P pos det refl sg all // @ADVL; La V main inf // @OBJ; ; vastutust endale võtta \n" +
        "1 ; L0 S prop sg nom // @NN>; L0 S prop sg nom // @SUBJ; L0 A pos partic // @AN>; ; Joala Joosep toonud \n" +
        "1 ; L0 P pers ps1 sg nom // @SUBJ; Ln V main indic pres ps1 sg ps af // @FMV; L0 S prop sg nom // @PRD; ; Mina olen Huen \n" +
        "1 ; Lma V main sup ps ill // @IMV; L0 J crd // @J; L0 S prop sg gen // @NN>; ; kõnelema ja Harpe \n" +
        "1 ; L0 S com sg adit // @ADVL @<NN; L0 J crd // @J; Lga P dem sg kom // @ADVL; ; pihku ja sellega \n" +
        "1 ; L0 S com sg gen // @NN>; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; Proua väike kasutütar \n" +
        "1 ; Ll N ord sg ad l // @AN>; Ll S com sg ad // @ADVL; L0 V main indic pres ps3 sg ps af // @FMV; ; Esimesel õhtul on \n" +
        "1 ; L0 J crd // @J; L0 S com sg nom // @NN>; L0 S prop sg nom // @SUBJ; ; ja Padu Kooli-Juhan \n" +
        "1 ; Ls S prop sg in // @NN> @ADVL; L0 P pers ps3 sg gen // @P>; L0 K post // @<KN @ADVL; ; Riias tema asemel \n" +
        "1 ; L0 J crd // @J; L0 S com sg part // @OBJ; Lst S com sg el // @<NN @ADVL; ; aga Traksi mäest \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 J crd // @J; L0 A pos partic // @AN>; ; Harpe aga mõistnud \n" +
        "1 ; Lst S com sg el // @ADVL; L0 V aux indic pres ps neg // @FCV; Lt A pos sg part // @ADVL; ; asjast pole suurt \n" +
        "1 ; Ltud V main partic past imps // @IMV; Ls S prop sg in // @NN> @ADVL; L0 P pers ps3 sg gen // @P>; ; maetud Riias tema \n" +
        "1 ; L0 A pos partic // @AN>; L0 S prop sg gen // @NN>; L0 S com sg nom // @SUBJ; ; tulnud Dahvidile kiri \n" +
        "1 ; Lks N card sg tr l // @ADVL; Lks S com sg tr // @<Q; Lle S com sg all // @<NN @ADVL; ; kolmeks aastaks sunnitööle \n" +
        "1 ; Lle A pos sg all // @ADVL; Lnud V main partic past ps // @IMV; L0 S com sg gen // @NN>; ; vaesele kinkinud maja \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 P pos det refl sg part // @OBJ; Lks A pos sg tr // @ADVL; ; Mängis end paljaks \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S prop sg nom // @SUBJ @<NN; Lnud V main partic past ps // @ADVL; ; Tammiku Essen olnud \n" +
        "1 ; L0 J sub // @J; L0 S com sg part // @OBJ; Lnud V main partic past ps // @ADVL; ; kui saia andnud \n" +
        "1 ; L0 A pos partic // @AN>; L0 P pos det refl sg gen // @NN>; L0 N card sg nom // @ADVL @<NN; ; mõistnud oma 15 \n" +
        "1 ; L0 J crd // @J; Lst P dem sg el // @P>; L0 K post // @ADVL; ; Aga sellest hoolimata \n" +
        "1 ; Li V aux indic impf ps3 sg ps af // @FCV; Lle N card sg all l // @NN>; Lle A pos sg all // @ADVL; ; oli ühele vaesele \n" +
        "1 ; L0 P dem sg nom // @NN>; L0 S prop sg nom // @NN> @SUBJ; Ls S com sg in // @ADVL @<NN; ; See Riiamaa mees \n" +
        "1 ; L0 P pers ps3 sg nom // @SUBJ; Lt S com sg part // @OBJ; Ls V main indic impf ps3 sg ps af // @FMV; ; ta viinavabrikut ehitas \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @PRD; Lnud V main partic past ps // @IMV; ; hea mees olnud \n" +
        "1 ; L0 S com sg gen // @ADVL @OBJ; Lnud V main partic past ps // @ADVL; Lda P dem sg part // @OBJ; ; Härra käskinud seda \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S com sg nom // @SUBJ; L0 V main indic pres ps3 sg ps af // @FMV; ; kohtuistumise tool on \n" +
        "1 ; Ld S com pl nom // @SUBJ; Lnud V main partic past ps // @IMV; Lda P pers ps3 sg part // @OBJ; ; hobused tahtnud teda \n" +
        "1 ; Lst P dem sg el // @P>; L0 K post // @ADVL; Lnud V main partic past ps // @ADVL; ; sellest hoolimata hakanud \n" +
        "1 ; Ld S com pl nom // @OBJ @PRD; L0 J crd // @J; Ld P det pl nom // @SUBJ @OBJ; ; püksid ja mõlemad \n" +
        "1 ; L0 S com sg gen // @NN>; Ld S com pl nom // @OBJ; L0 P dem sg gen // @ADVL; ; Ema öelnud selle \n" +
        "1 ; L0 A pos partic // @ADVL; Ltest P dem pl el // @ADVL; L0 A comp sg nom // @ADVL; ; olnud teistest väiksem \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @OBJ; Ltud V main partic past imps // @IMV; ; vana sant maetud \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lb V main indic pres ps3 sg ps af // @FMV; L0 S prop sg gen // @OBJ @NN>; ; küla käib Piibe \n" +
        "1 ; L0 S com sg nom // @SUBJ; Ls S com sg in // @<NN @ADVL; Li V main indic impf ps3 sg ps af // @FMV; ; Maamõõtja kaubas oli \n" +
        "1 ; L0 S com sg gen // @NN>; Ltes S com pl in // @<NN @ADVL; La V main inf // @<INFN; ; härra pükstes olla \n" +
        "1 ; Ll P pers ps3 sg ad // @ADVL; L0 N card sg nom // @SUBJ @ADVL @PRD; Lt S com sg part // @<Q; ; tal 9-10 meistrit \n" +
        "1 ; L0 N card sg gen l // @NN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; ühe kindrali käes \n" +
        "1 ; L0 V main indic pres ps3 sg ps af // @FMV; L0 A pos sg gen // @AN>; Lga S com sg kom // @ADVL; ; on lühikese nägemisega \n" +
        "1 ; L0 J sub // @J; Lst S com sg el // @ADVL; L0 V aux indic pres ps neg // @FCV; ; sest asjast pole \n" +
        "1 ; L0 A pos partic // @AN>; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; ; olnud hea mees \n" +
        "1 ; L0 S com sg part // @OBJ; Lda V main inf // @IMV; Lnud V main partic past ps // @ADVL @IMV; ; koolimaja ehitada lasknud \n" +
        "1 ; L0 J crd // @J; L0 J crd // @J; L0 P pers ps3 sg nom // @SUBJ; ; aga või tema \n" +
        "1 ; L0 A pos // @AN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; läinud abiellumise teel \n" +
        "1 ; L0 P dem sg nom // @NN> @PRD @SUBJ; L0 J crd // @J; Lnud V aux partic past ps // @ICV; ; See aga olnud \n" +
        "1 ; L0 J sub // @J; L0 P pers ps1 pl nom // @SUBJ; Ld P det pl nom // @<NN @OBJ; ; et meie mõlemad \n" +
        "1 ; L0 K post // @ADVL; L0 A pos partic // @AN>; L0 S com sg nom // @ADVL; ; ajal tõusnud puusärk \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lks A pos sg tr // @ADVL; Ls V main indic impf ps3 sg ps af // @FMV; ; proua hulluks läks \n" +
        "1 ; L0 S prop sg gen // @OBJ; Lnud V main partic past ps // @ADVL; Ld S com pl nom // @OBJ @SUBJ; ; Harpe lasknud mehed \n" +
        "1 ; Lle S prop sg all // @ADVL; L0 S com sg part // @OBJ; Lda V main inf // @IMV; ; Suure-Tammikule koolimaja ehitada \n" +
        "1 ; Ll P dem sg ad // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; L0 P pos det refl sg gen // @NN>; ; sel oli oma \n" +
        "1 ; Lge V main imper pres ps2 pl ps af // @FMV; L0 J sub // @J; Lte V main indic pres ps2 pl ps af // @FMV; ; tulge kui tahate \n" +
        "1 ; Lte S com pl gen // @NN>; Lst S com sg el // @<NN @ADVL; La V main inf // @OBJ; ; meeste seljast võtta \n" +
        "1 ; L0 S prop sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; Lda P pers ps3 sg part // @OBJ; ; Huen lasi teda \n" +
        "1 ; L0 V aux neg // @NEG; Lnud V mod indic impf ps neg // @FCV; L0 S com sg nom // @SUBJ; ; ei tohtinud tööinimene \n" +
        "1 ; L0 A pos sg nom partic // @AN>; L0 S prop sg gen // @NN>; L0 S com sg nom // @OBJ @SUBJ; ; Tahtnud Seli küla \n" +
        "1 ; L0 S com sg part // @OBJ; L0 V aux neg // @NEG; L0 V main indic pres ps neg // @FMV; ; aru ei saa \n" +
        "1 ; L0 A pos partic // @AN>; L0 P dem sg gen // @NN>; L0 S com sg gen // @NN> @OBJ; ; visanud selle hapupiima \n" +
        "1 ; L0 P inter rel sg nom // @NN> @SUBJ; L0 S com sg part // @OBJ; Ltud V main partic past imps // @ADVL; ; mis kodu kästud \n" +
        "1 ; L0 J crd C // @J; Li V main indic impf ps3 sg ps af // @FMV; Lks A pos sg tr // @ADVL; ; ja jäi hulluks \n" +
        "1 ; L0 J sub // @J; L0 P inter rel sg nom // @SUBJ; Lb V main indic pres ps3 sg ps af // @FMV; ; et kes tuleb \n" +
        "1 ; L0 P det sg part // @<NN; L0 J crd C // @J; Li V main indic impf ps3 sg ps af // @FMV; ; kõike ja oli \n" +
        "1 ; L0 J sub // @J; Ls S com sg in // @ADVL; L0 V main indic pres ps3 sg ps af // @FMV; ; et viljas on \n" +
        "1 ; Ls S com sg in // @ADVL; L0 A pos partic // @AN>; Lks S com sg tr // @ADVL; ; Mõisas olnud kutsariks \n" +
        "1 ; Lt A pos sg part // @AN>; L0 S com sg part // @NN> @OBJ; Le S com pl part // @OBJ; ; andvat ühtehinge palke \n" +
        "1 ; L0 J sub // @J; L0 P dem sg nom // @NN>; L0 A pos sg nom // @AN>; ; kui see väike \n" +
        "1 ; L0 S com sg gen // @NN>; L0 J crd // @J; L0 S com sg gen // @NN> @ADVL @OBJ; ; koolimaja ja talukoha \n" +
        "1 ; Ls S com sg in // @NN> @<NN @ADVL; L0 P pers ps1 sg nom // @SUBJ; Ln V main indic pres ps1 sg ps af // @FMV; ; mees mina olen \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; L0 S com sg gen // @NN>; ; müümise ajal Tammiku \n" +
        "1 ; L0 K post // @ADVL; L0 P pers ps3 sg gen // @NN>; Lle S com sg all // @ADVL; ; pärast tema jutule \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lnudki V main partic past ps // @ADVL @IMV; L0 S com sg gen // @NN>; ; teener toonudki härra \n" +
        "1 ; L0 S com sg nom // @PRD; L0 J crd // @J; L0 S com sg nom // @PRD; ; liha ja veri \n" +
        "1 ; L0 S com sg part // @OBJ; L0 A pos sg gen // @AN>; Lga S com sg kom // @<NN @ADVL; ; mõisnikku suure pidulikkusega \n" +
        "1 ; L0 P det sg nom // @OBJ @SUBJ; Lle P dem sg all // @<NN @ADVL; L0 K post // @<KN @ADVL; ; kumbki teisele poole \n" +
        "1 ; L0 J crd // @J; L0 S com sg nom // @<NN @SUBJ; Lvat V aux quot pres ps af // @ICV @FCV; ; aga puusärk olevat \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; L0 A pos sg nom // @PRD; ; Söök olnud vilets \n" +
        "1 ; L0 J sub // @J; Lvad V main indic pres ps3 pl ps af // @FMV; L0 S com sg gen // @OBJ; ; et tõmbavad võõra \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lb V main indic pres ps3 sg ps af // @FMV; L0 S prop sg gen // @NN>; ; tamm kasvab Salla \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 S com sg part // @SUBJ; L0 J crd // @J; ; õhtul lauda ja \n" +
        "1 ; L0 S prop sg nom // @NN> @SUBJ; Ls S com sg in // @ADVL @<NN; Lnudki V main partic past ps // @ADVL; ; Riiamaa mees läinudki \n" +
        "1 ; L0 P dem indef sg nom // @NN>; L0 S com sg nom // @SUBJ; L0 A pos partic // @ADVL; ; Üks muna olnud \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Lma V main sup ps ill // @ADVL; La V main inf // @IMV; ; tahtnud jooksma panna \n" +
        "1 ; L0 A pos // @ADVL; Ld P pers ps3 pl part // @OBJ; Lma V main sup ps ill // @ADVL; ; läinud neid peksma \n" +
        "1 ; Lb V main indic pres ps3 sg ps af // @FMV; Ll N ord sg ad l // @AN>; Ll S com sg ad // @ADVL; ; tuleb neljandal õhtul \n" +
        "1 ; L0 S prop sg nom // @SUBJ; L0 A pos partic // @AN>; L0 S com sg gen // @NN>; ; Dahvid kahmanud pingi \n" +
        "1 ; Lga S com sg kom // @ADVL; L0 A pos sg gen // @ADVL; Lnud V main partic past ps // @IMV; ; veega vitse kastnud \n" +
        "1 ; L0gi S com sg nom // @SUBJ; L0 A pos partic // @AN>; Lst P pers ps1 sg el // @ADVL @<NN; ; suulagi olnud must \n" +
        "1 ; L0 J crd // @J; Ld S com pl nom // @OBJ @SUBJ; L0 A pos partic // @AN>; ; aga venelased sugenud \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 A pos partic // @AN>; Lt S com sg part // @OBJ; ; Normann sõimanud ristitegijat \n" +
        "1 ; L0 S com sg nom // @SUBJ @PRD; Lga S com sg kom // @NN> @<NN @ADVL; L0 S prop sg nom // @SUBJ @<NN; ; Poesell nimega Dahvid \n" +
        "1 ; Lis V main indic impf ps3 sg ps af // @FMV; L0 A pos sg gen // @AN>; L0 S com sg gen // @NN> @ADVL; ; Kandis musta mütsi \n" +
        "1 ; Lu S com pl part // @OBJ @SUBJ; L0 J crd // @J; L0 S com sg nom // @SUBJ; ; jalgu ja kiskund \n" +
        "1 ; L0 S com sg gen // @ADVL @NN> @OBJ; Ltega S com pl kom // @NN> @<NN @ADVL; Li S com pl part // @SUBJ @OBJ; ; valla peremeestega arusaamatusi \n" +
        "1 ; L0 S com sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; Lle S com sg all // @ADVL; ; Härra tuli põllule \n" +
        "1 ; L0 S com sg gen // @NN> @ADVL; L0 S com sg nom // @ADVL @<NN @OBJ; Lna S com sg es // @ADVL @<NN; ; jutustaja kord lapsena \n" +
        "1 ; L0 S prop sg nom // @NN> @OBJ; L0 P pos det refl sg nom // @<NN; Lnud V main partic past ps // @ADVL; ; Bremen ise söönud \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lnudki V main partic past ps // @ADVL; Lst S com sg el // @ADVL; ; Mees jäänudki peksust \n" +
        "1 ; L0 A pos partic // @AN>; L0 S com sg nom // @SUBJ; Ls S com sg in // @<NN @ADVL; ; olnud sant mees \n" +
        "1 ; L0 P dem sg nom // @SUBJ; Lb V mod indic pres ps3 sg ps af // @FCV; Lma V main sup ps ill // @IMV; ; see peab tähendama \n" +
        "1 ; L0 V aux neg // @NEG; L0 V main indic pres ps neg // @FMV; Lt S com sg part // @OBJ; ; ei taha kopikat \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; L0 A pos sg nom // @AN>; L0 A pos sg nom // @AN>; ; oli noor lahke \n" +
        "1 ; L0 P dem sg nom // @PRD @SUBJ; L0 P dem sg gen // @NN>; L0 S com sg gen // @OBJ; ; teine teise sääre \n" +
        "1 ; Ltega S com pl kom // @NN> @ADVL; L0 S com sg part // @OBJ; L0 J crd // @J; ; kätega kõhtu ja \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S prop sg gen // @P>; L0 J crd // @J; ; otsetee Kissa ja \n" +
        "1 ; Lda P dem sg part // @OBJ; Lt A pos sg part // @ADVL @PRD; L0 S com sg gen // @P>; ; seda väikest muna \n" +
        "1 ; Lnud V main partic past ps // @ADVL; L0 P pos det refl sg gen // @NN>; L0 S com sg gen // @OBJ; ; visanud oma laabroki \n" +
        "1 ; L0 S com sg nom // @OBJ @SUBJ; L0 A pos partic // @AN>; L0 P indef sg nom // @ADVL @<NN @SUBJ; ; Moonamees olnud mitu \n" +
        "1 ; L0 S prop sg nom // @SUBJ; Lis V main indic impf ps3 sg ps af // @FMV; L0 S com sg part // @OBJ; ; Bremen mõistis krahvi \n" +
        "1 ; L0 A pos sg gen // @AN>; L0 S com sg gen // @ADVL; Lda V main inf // @OBJ; ; väikese kivimaja ehitada \n" +
        "1 ; Ls A pos sg in // @AN>; L0 S prop sg gen // @OBJ @NN>; Ls S com sg in // @NN> @<NN @ADVL; ; Omaaegses Simuna kõrtsis \n" +
        "1 ; L0 J crd // @J; L0 S com sg gen // @NN> @ADVL @OBJ; Lle S com sg all // @ADVL @<NN; ; ja talukoha koolile \n" +
        "1 ; Ldagi P indef sg part // @OBJ @SUBJ; Lt A pos sg part // @<AN; La V main inf // @<INFN; ; midagi toredat süüa \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg nom // @NN>; L0 S prop sg nom // @SUBJ; ; Salla von Harpe \n" +
        "1 ; L0 S com sg nom // @NN> @PRD; L0 S prop sg gen // @NN>; L0 S com sg nom // @<NN @PRD; ; krahv Lütke omandus \n" +
        "1 ; L0 J crd // @J; L0 A pos partic // @AN>; Lile S com pl all // @ADVL; ; ja ütelnud peksjaile \n" +
        "1 ; L0 A pos // @AN>; L0 S com sg gen // @NN>; L0 S com sg adit // @<NN @ADVL; ; mööda linna ringi \n" +
        "1 ; L0 P inter rel sg nom // @NN> @SUBJ @OBJ; L0 A pos sg nom // @AN>; L0 S com sg nom // @<NN @SUBJ; ; mis aus inimene \n" +
        "1 ; L0 J crd // @J; Lni S com sg term // @NN> @ADVL; L0 J crd // @J; ; kuni ihupesuni ja \n" +
        "1 ; L0 J sub // @J; Lde S com pl gen // @NN>; L0 S com sg gen // @P>; ; et Pagude kabeli \n" +
        "1 ; Lb V main indic pres ps3 sg ps af // @FMV; Li A pos pl part // @AN>; Le S com pl part // @OBJ; ; kulutab pealmisi pükse \n" +
        "1 ; Lda P dem sg part // @NN>; Lt S com sg part // @OBJ; Lle P pos det refl sg all // @ADVL; ; seda vastutust endale \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Lle S com sg all // @ADVL; La V main inf // @IMV; ; viinud prouale näha \n" +
        "1 ; L0 S com sg part // @OBJ; Ltele S com pl all // @ADVL @<NN; L0 S com sg part // @OBJ; ; küla meestele vilja \n" +
        "1 ; L0 S com sg nom // @OBJ; Lnud V main partic past ps // @ADVL; Lst S com sg el // @ADVL; ; moonamees tulnud poest \n" +
        "1 ; L0 J sub // @J; L0 P dem sg nom // @ADVL @SUBJ; Lga S com sg kom // @<NN @ADVL; ; kui see rahaga \n" +
        "1 ; L0 J sub // @J; L0 S com sg gen // @OBJ; Lks V mod cond pres ps af // @FCV; ; et härra võiks \n" +
        "1 ; L0 P pos det refl sg gen // @NN>; Ll S com sg ad // @<NN @ADVL; Ls V main indic impf ps3 sg ps af // @FMV; ; oma eluajal hirmus \n" +
        "1 ; Ld S com pl nom // @OBJ; L0 P dem sg gen // @ADVL; L0 V main imper pres ps2 sg ps af // @FMV; ; öelnud selle kohta \n" +
        "1 ; L0 S com sg gen // @ADVL @OBJ; Lnud V main partic past ps // @ADVL; L0 J crd // @J; ; maamõõtja vihastanud ja \n" +
        "1 ; L0 P pos det refl sg gen // @P>; L0 K post // @ADVL; Lda V main inf // @IMV; ; enda juurde kutsuda \n" +
        "1 ; L0 A pos partic // @AN>; L0 S prop sg gen // @NN>; L0 S com sg gen // @<NN @OBJ; ; sugenud Harpe naha \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; Lnud V main partic past ps // @ADVL; ; rahva vastu olnud \n" +
        "1 ; L0 J crd // @J; Lga P dem sg kom // @ADVL; Ldes V main ger // @ADVL; ; ja sellega veheldes \n" +
        "1 ; Lma V main sup ps ill // @IMV; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; naerma ja pööranud \n" +
        "1 ; L0 J crd // @J; L0gi S com sg nom // @SUBJ; L0 A pos partic // @AN>; ; ja suulagi olnud \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Li S com pl part // @OBJ; Ll A pos sg ad // @AN>; ; peksnud inimesi koledal \n" +
        "1 ; Ld P dem pl part // @NN>; Lsid S com pl part // @OBJ; Ltakse V main indic pres imps af // @FMV; ; neid majasid ehitatakse \n" +
        "1 ; Lst S com sg el // @NN> @ADVL; Le S com pl part // @OBJ @ADVL; Ldi V main indic impf imps af // @FMV; ; mõisast ehituspalke mindi \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; L0 S com sg part // @OBJ; L0 V aux neg // @NEG; ; tema aru ei \n" +
        "1 ; L0 S com sg gen // @NN>; Ld S com pl nom // @SUBJ; Lvad V main indic pres ps3 pl ps af // @FMV; ; õpetaja eluruumid tulevad \n" +
        "1 ; L0 J crd // @J; L0 S com sg gen // @NN>; Ld S com pl nom // @SUBJ @OBJ; ; ja kapi uksed \n" +
        "1 ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; Lt P dem sg part // @NN>; ; Pole olnud niisugust \n" +
        "1 ; L0 P dem sg nom // @NN>; L0 S com sg nom // @SUBJ; L0 A pos sg nom // @PRD; ; teine niisugene pikk \n" +
        "1 ; Lga A pos sg kom // @ADVL; Ldes V main ger // @ADVL; L0 V aux neg // @NEG; ; Palavaga töötades ei \n" +
        "1 ; Li V aux indic impf ps3 sg ps af // @FCV; L0 A pos sg gen // @AN>; Lga S com sg kom // @ADVL; ; oli soolase veega \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; L0 S com sg gen // @NN>; L0 S prop sg gen // @NN>; ; tema venna Konstantini \n" +
        "1 ; L0 S prop sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; Lde S com pl gen // @NN>; ; Essen oli talude \n" +
        "1 ; L0 J crd C // @J; Li V main indic impf ps3 sg ps af // @FMV; L0 A pos sg nom // @AN>; ; ja oli aus \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Lid V aux indic impf ps2 sg ps af // @FCV; L0 J crd C // @J; ; jultunud olid ja \n" +
        "1 ; L0 V main indic pres ps neg // @FMV; Lt S com sg part // @OBJ; La V main inf // @OBJ; ; taha kopikat anda \n" +
        "1 ; L0 P pos det refl sg gen // @NN>; Lga S com sg kom // @ADVL @<NN; Lnud V main partic past ps // @ADVL; ; oma isaga olnud \n" +
        "1 ; Lnud V main partic past ps // @IMV; L0 J crd // @J; L0 S com sg gen // @NN>; ; kärisenud ja kapi \n" +
        "1 ; L0 S com sg part // @OBJ; Lst S com sg el // @<NN @ADVL; L0 V aux neg // @NEG; ; Traksi mäest ei \n" +
        "1 ; L0 S prop sg nom // @SUBJ; Li V aux indic impf ps3 sg ps af // @FCV; Lle N card sg all l // @NN>; ; Stakelberg oli ühele \n" +
        "1 ; L0 J sub // @J; L0 A pos sg gen // @AN>; L0 S com sg gen // @NN> @ADVL; ; kui evangeelse luteriusu \n" +
        "1 ; L0 S prop sg gen // @NN>; Lid S com pl part // @SUBJ @OBJ; Lmas V main sup ps in // @ADVL; ; Harpe hobuseid lugemas \n" +
        "1 ; L0 S com sg nom // @SUBJ @OBJ; Lnud V main partic past ps // @ADVL; Li S com pl part // @OBJ @ADVL; ; Mõis hakanud päevi \n" +
        "1 ; L0 K post // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; L0 P pers ps3 sg gen // @NN>; ; järele tuli tema \n" +
        "1 ; L0 S com sg nom // @SUBJ; Li V aux indic impf ps3 sg ps af // @FCV; L0 S com sg gen // @ADVL; ; nimi oli Joa \n" +
        "1 ; L0 K post // @ADVL; Lnud V main partic past ps // @ADVL; L0 A pos sg nom // @AN>; ; hoolimata hakanud vana \n" +
        "1 ; L0 S com sg nom // @SUBJ; Ls V main indic impf ps3 sg ps af // @FMV; L0 N ord sg ad // @AN>; ; Maamõõtja jagas 1885. \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 A pos partic // @AN>; L0 P pos det refl sg part // @OBJ; ; ajal näidanud end \n" +
        "1 ; L0 P dem sg nom // @NN>; L0 P pers ps2 sg gen // @NN>; L0 S com sg nom // @SUBJ; ; see sinu asi \n" +
        "1 ; Lga S com sg kom // @NN> @ADVL; L0 A pos sg gen // @AN>; L0 S com sg gen // @OBJ; ; maamõõtjaga uue lepingu \n" +
        "1 ; L0 V aux indic pres ps neg // @FCV; Ld S com pl nom // @SUBJ; Lnud V main partic past ps // @IMV; ; pole hobused tahtnud \n" +
        "1 ; Lt A pos sg part // @ADVL @PRD; L0 S com sg gen // @P>; L0 K post // @ADVL; ; väikest muna käes \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 A pos partic // @AN>; Ll S com sg ad // @ADVL @<NN; ; Pagu ajanud surnuaial \n" +
        "1 ; L0 S com sg nom // @SUBJ; Li V aux indic impf ps3 sg ps af // @FCV; L0 A pos sg nom // @AN>; ; Pagu oli hea \n" +
        "1 ; Ll S com sg ad // @<NN @ADVL; Lnud V main partic past ps // @ADVL @IMV; L0 J crd // @J; ; hoovil kärkinud ja \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Lga S com sg kom // @NN> @ADVL; L0 S com sg nom // @SUBJ; ; olnud jutustajaga sugulane \n" +
        "1 ; L0 P inter rel sg nom // @NN> @PRD; Ls S com sg in // @NN> @<NN @ADVL; L0 P pers ps1 sg nom // @SUBJ; ; mis mees mina \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; L0 S com sg nom // @NN> @SUBJ; L0 S prop sg gen // @P>; ; oli mõis Henningi \n" +
        "1 ; L0 P dem sg nom // @SUBJ; Lnud V main partic past ps // @ADVL @IMV; Lt P pos det refl sg part // @OBJ; ; see poonud ennast \n" +
        "1 ; L0 S prop sg nom // @NN> @SUBJ; L0 P pos det refl sg nom // @<NN; Lnud V main partic past ps // @ADVL; ; Harpe ise tulnud \n" +
        "1 ; L0 P inter rel sg nom // @OBJ; L0 S com sg nom // @SUBJ; Lb V main indic pres ps3 sg ps af // @FMV; ; mis peigmees annab \n" +
        "1 ; L0 P pers ps3 sg nom // @SUBJ; L0 V main indic pres ps3 sg ps af // @FMV; L0 A pos sg gen // @AN>; ; tema on lühikese \n" +
        "1 ; L0 J crd // @J; L0 S com sg gen // @NN>; Ld S com pl nom // @SUBJ; ; ja Tammiku mõisad \n" +
        "1 ; Lnud V main partic past ps // @IMV; Lda P pers ps3 sg part // @OBJ; L0 S com sg adit // @ADVL; ; tahtnud teda kabeliaeda \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lda P dem sg part // @NN>; L0 S com sg part // @OBJ; ; rahvas seda mütsi \n" +
        "1 ; L0 A pos sg gen // @AN>; L0 S com sg gen // @NN>; L0 S com sg gen // @OBJ; ; suure kääru saia \n" +
        "1 ; Lks S com sg tr // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; L0 S com sg nom // @SUBJ; ; nõrkuseks oli kaardimäng \n" +
        "1 ; L0 S prop sg nom // @PRD; Li V main indic impf ps3 sg ps af // @FMV; Li S com pl part // @SUBJ; ; Manteufel oli Määri \n" +
        "1 ; L0 J crd // @J; L0 S com sg gen // @NN> @ADVL @OBJ; L0 A pos partic // @ADVL; ; ja vanaproua öelnud \n" +
        "1 ; Lta V main inf // @ADVL @SUBJ @INFN>; L0 J crd // @J; Li S com pl part // @OBJ; ; lasta ja põlvi \n" +
        "1 ; L0 J crd // @J; Ld S com pl nom // @SUBJ @<NN @OBJ; L0 A pos partic // @AN>; ; ja mehed kaevanud \n" +
        "1 ; L0 J sub // @J; L0 S com sg gen // @NN> @ADVL; L0 S com sg nom // @NN> @ADVL; ; Kui Tammiku proua \n" +
        "1 ; L0 P pers ps2 sg nom // @SUBJ; Ld V main indic pres ps2 sg ps af // @FMV; L0 J crd // @J; ; sa lähed ja \n" +
        "1 ; L0 S com sg gen // @NN> @ADVL; L0 S prop sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; ; Korra Harpe sõitnud \n" +
        "1 ; L0 P pos det refl sg nom // @<NN; Lb V main indic pres ps3 sg ps af // @FMV; Ll S com sg ad // @ADVL; ; ise seisab uksel \n" +
        "1 ; L0 S prop sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; L0 S com sg gen // @NN>; ; Papen tervitanud mõisa \n" +
        "1 ; Lme V mod indic pres ps1 pl ps af // @FCV; L0 P pers ps3 sg gen // @NN> @OBJ; Ltesse S com pl ill // @ADVL; ; võime tema pükstesse \n" +
        "1 ; L0 P dem sg nom // @SUBJ; L0 V aux indic pres ps3 sg ps af // @FCV; L0 S com sg nom // @PRD; ; see on varas \n" +
        "1 ; L0 A pos partic // @AN>; Ll A pos sg ad // @AN>; Ll S com sg ad // @ADVL @<NN; ; seisnud seal kõrval \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S prop sg nom // @NN> @SUBJ; Lda P dem sg part // @NN>; ; vana Vamps seda \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 A pos partic // @ADVL; Ld P pers ps3 pl part // @OBJ; ; päris kasvatanud neid \n" +
        "1 ; Lst S com sg el // @NN> @ADVL; L0 S com sg gen // @OBJ; L0 J crd // @J; ; mõisast söögi ja \n" +
        "1 ; L0 K post // @ADVL; L0 S com sg gen // @ADVL; Ls V main indic impf ps3 sg ps af // @FMV; ; järele vundamendi valmis \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; Lle S prop sg all // @ADVL; L0 S com sg part // @OBJ; ; ta Suure-Tammikule koolimaja \n" +
        "1 ; Lnud V main partic past ps // @ADVL; L0 J crd // @J; L0 A pos partic // @AN>; ; vihastanud ja visanud \n" +
        "1 ; L0 S prop sg nom // @NN> @SUBJ; Lda P dem sg part // @NN>; L0 S com sg part // @OBJ; ; Vamps seda lugu \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; L0 S prop sg nom // @NN>; L0 S prop sg gen // @NN>; ; käinud Salla Harpe \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; Li S com pl part // @OBJ; ; Kuberner peksnud inimesi \n" +
        "1 ; L0 J crd // @J; L0 S prop sg nom // @SUBJ; L0 V aux indic pres ps neg // @FCV; ; Aga Dahvid pole \n" +
        "1 ; L0 S com sg nom // @ADVL; Li V aux indic impf ps3 sg ps af // @FCV; L0 P pers ps3 sg gen // @NN>; ; kirik oli tema \n" +
        "1 ; L0 P pos det refl sg gen // @NN>; Lid S com pl part // @OBJ; Lle S com sg all // @ADVL @<NN; ; oma riideid rohule \n" +
        "1 ; Ld S com pl nom // @SUBJ; L0 S com sg adit // @ADVL @<NN; Lma V main sup ps ill // @IMV; ; inimesed kraavi minema \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Lle P pers ps3 sg all // @ADVL; L0 A pos sg gen // @AN>; ; andnud temale suure \n" +
        "1 ; L0 S prop sg nom // @NN>; L0 S prop sg gen // @NN>; Lid S com pl part // @SUBJ @OBJ; ; Salla Harpe hobuseid \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 P pos det refl sg gen // @NN>; Lid S com pl part // @OBJ; ; tööinimene oma riideid \n" +
        "1 ; Lga S com sg kom // @ADVL; Ltud V main partic past imps // @IMV; L0 J crd // @J; ; kaleviga ehitud ja \n" +
        "1 ; Ld S com pl nom // @OBJ @SUBJ; L0 A pos // @AN>; Ld P dem pl part // @NN>; ; Mehed läinud neid \n" +
        "1 ; Ld S com pl nom // @SUBJ @OBJ; Lnud V main partic past ps // @ADVL; Ld P det pl nom // @OBJ @SUBJ; ; Teenrid jäänud mõlemad \n" +
        "1 ; L0 P dem sg nom // @NN>; L0 A pos sg nom // @AN>; L0 S com sg nom // @ADVL @<NN @PRD @OBJ @SUBJ; ; see väike poiss \n" +
        "1 ; Lnud V aux partic past ps // @ICV; Ltud V main partic past imps // @IMV; L0 S prop sg gen // @NN>; ; Olnud keelatud Avanduse \n" +
        "1 ; L0 A pos partic // @AN>; L0 S com sg gen // @NN>; L0 S com sg adit // @ADVL @<NN; ; kahmanud pingi pihku \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; L0 P pers ps3 sg gen // @NN>; L0 S com sg gen // @NN>; ; tuli tema venna \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; L0 S com sg gen // @ADVL; ; plaani järele vundamendi \n" +
        "1 ; L0 J sub // @J; L0 S prop sg nom // @NN> @SUBJ; L0 S com sg gen // @NN> @ADVL; ; et Huen korra \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; Avanduse vallamaja ees \n" +
        "1 ; L0 S com sg nom // @NN>; L0 S prop sg nom // @SUBJ; Li V aux indic impf ps3 sg ps af // @FCV; ; härra Stakelberg oli \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; ; omaaegne haagikohtunik oli \n" +
        "1 ; L0 A pos partic // @AN>; L0 P indef sg nom // @ADVL @<NN @SUBJ; Lt S com sg part // @<Q; ; olnud mitu nädalat \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; L0 P pers ps3 sg gen // @NN>; ; asja pärast tema \n" +
        "1 ; Lle N card sg all l // @NN>; Lle A pos sg all // @ADVL; Lnud V main partic past ps // @IMV; ; ühele vaesele kinkinud \n" +
        "1 ; L0 S com sg nom // @PRD @ADVL; L0 S com sg part // @OBJ; Ldes V main ger // @ADVL; ; kord piipu suitsetades \n" +
        "1 ; L0 J sub // @J; L0 S com sg gen // @NN>; L0 S com sg adit // @ADVL; ; et soldati sauna \n" +
        "1 ; Lid V mod indic impf ps2 sg ps af // @FCV; L0 S com sg gen // @OBJ; Lma V main sup ps ill // @IMV; ; pidid kraavi minema \n" +
        "1 ; Ll P pos det refl sg ad // @ADVL @<NN; Lid S com pl part // @NN> @OBJ; Lst S com sg el // @<NN @ADVL; ; omal juukseid peast \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 A pos // @AN>; L0 S com sg nom // @SUBJ; ; hulkus mööda tuba \n" +
        "1 ; L0 J crd // @J; Lt A pos sg part // @AN>; Lt S com sg part // @OBJ @PRD; ; aga pärast tagasitulekut \n" +
        "1 ; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; L0 V main imper pres ps2 sg ps af // @FMV; ; ja lasknud vundamendi \n" +
        "1 ; Ll N ord sg ad l // @AN>; Ll S com sg ad // @ADVL; L0 A pos partic // @AN>; ; Teisel päeval tulnud \n" +
        "1 ; Ls S com sg in // @ADVL @<NN; Lnud V main partic past ps // @ADVL; L0 A pos sg nom // @AN>; ; kõrtsis olnud suur \n" +
        "1 ; L0 A pos partic // @AN>; L0 S prop sg gen // @NN>; Ls S com sg in // @ADVL @<NN; ; elanud Piibe mõisas \n" +
        "1 ; Lst A pos sg el // @AN>; Lst S com sg el // @NN> @ADVL; L0 S com sg gen // @NN> @OBJ; ; tulisest suust suitsu \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 V aux neg // @NEG; L0 V main indic pres ps neg // @FMV; ; Jutustaja ei tea \n" +
        "1 ; L0 P indef sg nom // @SUBJ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; ; keegi pole julgenud \n" +
        "1 ; Ld S com pl nom // @OBJ @SUBJ; L0 A pos partic // @AN>; L0 S com sg gen // @P>; ; Kalavenelased olnud tee \n" +
        "1 ; L0 V aux indic pres ps neg // @FCV; Lt A pos sg part // @ADVL; Ldagi P indef sg part // @SUBJ; ; pole suurt midagi \n" +
        "1 ; L0 J crd // @J; L0 S com sg nom // @SUBJ; L0 V aux indic pres ps neg // @FCV; ; aga sell pole \n" +
        "1 ; L0 S prop sg nom // @NN>; L0 S prop sg nom // @SUBJ; L0 J crd // @J; ; Rahkla Miiling ja \n" +
        "1 ; Lb V main indic pres ps3 sg ps af // @FMV; L0 S prop sg gen // @NN>; Ls S com sg in // @NN> @ADVL; ; kasvab Salla mõisas \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S com sg gen // @NN>; L0 S prop sg nom // @SUBJ; ; Tammiku mõisa Essen \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; Ls V main indic impf ps3 sg ps af // @FMV; ; kabeli juurest hakkas \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 A pos // @AN>; L0 S com sg gen // @P>; ; mõis läinud abiellumise \n" +
        "1 ; L0 A pos partic // @AN>; Lle S com sg all // @ADVL; L0 S com sg part // @OBJ @SUBJ; ; kinkinud koolile koha \n" +
        "1 ; L0 S com sg nom // @NN>; L0 S prop sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; ; Uustalu Jaagup rääkinud \n" +
        "1 ; L0 K post // @ADVL; L0 J crd // @J; L0 A pos partic // @AN>; ; juures ja suitsetanud \n" +
        "1 ; L0 A pos sg nom // @PRD; L0 J crd // @J; Lnudki V main partic past ps // @ADVL @IMV; ; haige ja jäänudki \n" +
        "1 ; L0 S com sg nom // @NN> @ADVL; L0 S prop sg nom // @NN> @<NN @ADVL @SUBJ; L0 S com sg gen // @ADVL @OBJ; ; proua Salla mõisa \n" +
        "1 ; Ltud V main partic past imps // @IMV; L0 S prop sg gen // @NN>; L0 S com sg gen // @P>; ; keelatud Avanduse vallamaja \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; L0 S com sg gen // @NN>; L0 S com sg gen // @OBJ; ; saanud härra õiguse \n" +
        "1 ; L0 S com sg gen // @NN> @ADVL; L0 A pos sg gen // @AN>; Lga S com sg kom // @NN> @<NN @ADVL; ; mütsi punase äärega \n" +
        "1 ; L0 S prop sg nom // @SUBJ; Lb V main indic pres ps3 sg ps af // @FMV; Ll N ord sg ad l // @AN>; ; Bremen tuleb neljandal \n" +
        "1 ; L0 P pers ps1 pl gen // @NN>; L0 S com sg nom // @SUBJ; L0 V main indic pres ps3 sg ps af // @FMV; ; Meie härra on \n" +
        "1 ; L0 S com sg nom // @SUBJ; Llle P pers ps2 sg all // @ADVL @<NN; L0 P dem sg gen // @P>; ; proua sulle selle \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Lst S com sg el // @ADVL; L0 J crd // @J; ; tulnud poest ja \n" +
        "1 ; Lnud V aux partic past ps // @ICV; L0 A pos sg nom // @AN>; L0 A pos sg nom // @AN>; ; olnud suur tugev \n" +
        "1 ; L0 P dem indef sg nom // @ADVL; Ls V main indic impf ps3 sg ps af // @FMV; L0 S com sg nom // @SUBJ; ; üks kohtus käimine \n" +
        "1 ; L0 A pos partic // @AN>; Ll P pers ps3 sg ad // @ADVL; L0 S com sg gen // @ADVL @NN> @OBJ; ; tulnud tal valla \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; ; Miilingu rist kukkunud \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; Lda V main inf // @IMV; ; vallamaja ees suitsetada \n" +
        "1 ; Lvat V aux quot pres ps af // @ICV @FCV; L0 P dem sg gen // @P>; L0 K post // @ADVL; ; olevat teise juures \n" +
        "1 ; L0 S com sg nom // @SUBJ; Lnudki V main partic past ps // @ADVL; Lsse S prop sg ill // @ADVL; ; Tamm jäänudki Sallasse \n" +
        "1 ; Ld A comp pl nom // @AN>; Ld S com pl nom // @ADVL; Lvat V aux quot pres ps af // @ICV @FCV; ; madalamad põllud olevat \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; Lle S com sg all // @<NN @ADVL; Li V main indic impf ps3 sg ps af // @FMV; ; tema jutule tuli \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Lst P dem sg el // @ADVL; La V main inf // @IMV; ; saanud sellest teada \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; L0 P dem sg nom // @NN>; L0 S com sg nom // @SUBJ; ; oli niisugune mees \n" +
        "1 ; L0 P pers ps2 sg gen // @NN>; L0 S com sg nom // @PRD; L0 J crd // @J; ; sinu liha ja \n" +
        "1 ; Lda P dem sg part // @SUBJ @OBJ; L0 A pos sg nom // @PRD; L0 J crd // @J; ; seda haige ja \n" +
        "1 ; L0 S com sg nom // @OBJ @SUBJ; L0 A pos partic // @AN>; Ld S com pl nom // @OBJ @<NN; ; Virtin võtnud munad \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S com sg nom // @NN>; L0 S prop sg nom // @SUBJ; ; Lasinurme härra Stakelberg \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg gen // @NN>; L0 S com sg nom // @SUBJ; ; Noor Võivere Pagu \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; Ld A pos pl nom // @PRD; ; rahva vastu sõbralikud \n" +
        "1 ; Ld P det pl nom // @<NN @OBJ; Lme V mod indic pres ps1 pl ps af // @FCV; L0 P pers ps3 sg gen // @NN> @OBJ; ; mõlemad võime tema \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; L0 P det pl nom // @OBJ; ; matuse ajal kõik \n" +
        "1 ; L0 P det pl nom // @NN>; L0 S com sg nom // @SUBJ; L0 J crd // @J; ; kõik kaelavahe ja \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Lle P dem sg all // @NN>; Lle S com sg all // @ADVL @<NN; ; Kudunud sellele lapsele \n" +
        "1 ; L0 J crd // @J; Ld S com pl nom // @<NN @SUBJ @OBJ; Lma V main sup ps ill // @ADVL; ; ja pistnud jooksma \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S com sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; ; Venevere rentnik oli \n" +
        "1 ; L0 P dem sg nom // @SUBJ; Lnudki V main partic past ps // @ADVL @IMV; L0 P dem sg nom // @NN>; ; see olnudki see \n" +
        "1 ; L0 S com sg gen // @NN>; Ltes S com pl in // @<NN @ADVL; L0 V aux indic pres ps3 sg ps af // @FCV; ; mõisa keldrites on \n" +
        "1 ; L0 K post // @ADVL; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; käes ja küsinud \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 V main indic pres ps3 sg ps af // @FMV; Ll S com sg ad // @ADVL; ; õhtul on laual \n" +
        "1 ; Ld S com pl nom // @SUBJ; Lvat V aux quot pres ps af // @ICV @FCV; L0 P dem sg gen // @OBJ; ; vaimud olevat teise \n" +
        "1 ; Ld V main indic pres ps2 sg ps af // @FMV; L0 J crd // @J; Ld V main indic pres ps2 sg ps af // @FMV; ; lähed ja suitsetad \n" +
        "1 ; L0 J crd C // @J; Lvad V main indic pres ps3 pl ps af // @FMV; L0 S com sg gen // @P>; ; ja annavad nahatäie \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S prop sg nom // @SUBJ; L0 A pos partic // @ADVL; ; Lasinurme Stakelberg lasknud \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; L0 S com sg gen // @NN>; L0 S com sg nom // @SUBJ; ; Oli keisri kammerhärra \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S com sg adit // @ADVL @<NN; L0 J crd // @J; ; pingi pihku ja \n" +
        "1 ; L0 J sub // @J; L0 S com sg nom // @SUBJ @OBJ; L0 J crd // @J; ; et vaim ja \n" +
        "1 ; L0 J sub // @J; L0 S com sg nom // @SUBJ; Ls S com sg in // @<NN @ADVL; ; et tamm Tammikus \n" +
        "1 ; L0 J sub // @J; L0 P pers ps3 sg nom // @SUBJ; Lis V main indic impf ps3 sg ps af // @FMV; ; Kui tema sõitis \n" +
        "1 ; L0 A pos sg gen // @AN>; Lga S com sg kom // @ADVL; L0 A pos sg gen // @ADVL; ; soolase veega vitse \n" +
        "1 ; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; Ltes S com pl in // @NN> @ADVL; ; ja uidanud valeriietes \n" +
        "1 ; L0 S prop sg nom // @NN> @SUBJ; L0 A pos partic // @AN>; L0 S prop sg gen // @NN>; ; Miiling olnud Avanduse \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Ld S com pl nom // @OBJ @SUBJ; L0 S com sg gen // @ADVL @OBJ; ; lasknud mehed mõisa \n" +
        "1 ; L0 S com sg nom // @PRD; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; mees ja uidanud \n" +
        "1 ; Lt A pos sg part // @AN>; L0 S com sg part // @OBJ; L0 A pos sg gen // @AN>; ; uut mõisnikku suure \n" +
        "1 ; Ltele S com pl all // @ADVL; L0 A pos sg gen // @AN>; L0 S com sg gen // @OBJ; ; mõisalastele suure jõulupuu \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; L0 A pos partic // @AN>; ; Kesköö ajal tõusnud \n" +
        "1 ; L0 S com sg gen // @NN>; Ld S com pl nom // @SUBJ @OBJ; Lnud V main partic past ps // @IMV; ; kapi uksed käinud \n" +
        "1 ; Lis V main indic impf ps3 sg ps af // @FMV; L0 S com sg part // @OBJ; Lda V main inf // @OBJ; ; mõistis krahvi meelitada \n" +
        "1 ; L0 V aux neg // @NEG; L0 V main indic pres ps neg // @FMV; Lda P dem sg part // @OBJ; ; ei taha seda \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 A pos partic // @AN>; L0 S com sg gen // @OBJ @ADVL; ; Moonamees vaadanud korra \n" +
        "1 ; L0 N card sg nom // @ADVL; Lt S com sg part // @<Q; L0 A pos partic // @AN>; ; 10 aastat elanud \n" +
        "1 ; L0 J crd // @J; Ld P det pl nom // @SUBJ @OBJ; Lnud V main partic past ps // @ADVL @IMV; ; ja mõlemad läinud \n" +
        "1 ; L0 K post // @ADVL; L0 J crd // @J; Ld S com pl nom // @SUBJ; ; kõrval ja lugenud \n" +
        "1 ; L0 S prop sg nom // @OBJ; Lnud V main partic past ps // @ADVL @IMV; Lda V main inf // @IMV; ; Miiling tahtnud lõhkuda \n" +
        "1 ; L0 J crd // @J; L0 A pos partic // @AN>; Lle S com sg all // @ADVL @<NN; ; ja andnud keisrile \n" +
        "1 ; Ll P pers ps1 pl ad // @ADVL; Ldagi P indef sg part // @OBJ @SUBJ; Lt A pos sg part // @<AN; ; meil midagi toredat \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @NN> @ADVL; L0 S prop sg nom // @SUBJ; ; vana õpetaja Pauker \n" +
        "1 ; Lst S com sg el // @ADVL; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; poest ja tahtnud \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @ADVL @<NN @PRD @OBJ @SUBJ; Lnud V main partic past ps // @ADVL @IMV; ; väike poiss olnud \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 A pos sg nom // @AN>; L0 S com sg nom // @PRD; ; noor lahke härra \n" +
        "1 ; L0 A comp sg nom // @PRD; Li V main indic impf ps3 sg ps af // @FMV; L0 S com sg nom // @NN> @SUBJ; ; Ennem oli mõis \n" +
        "1 ; L0 S com sg gen // @NN>; L0 J crd // @J; L0 S com sg gen // @NN>; ; Mõisamaa ja Tammiku \n" +
        "1 ; L0 A pos partic // @AN>; Lst S com sg el // @NN> @<NN @ADVL; L0 P pos det refl sg gen // @NN>; ; tõmmanud taskust oma \n" +
        "1 ; L0 S prop sg nom // @NN>; L0 S prop sg nom // @NN> @SUBJ; L0 A pos partic // @AN>; ; Rahkla Miiling olnud \n" +
        "1 ; L0 P dem sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; L0 A pos sg nom // @AN>; ; See oli noor \n" +
        "1 ; Ll S com sg ad // @ADVL; Ld S com sg part // @OBJ; Lst S com sg el // @<NN @ADVL; ; aastal talumaad mõisast \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 A pos sg nom // @PRD; L0 J crd // @J; ; niisugene pikk ja \n" +
        "1 ; L0 J crd C // @J; Ld P pers ps1 sg part // @OBJ; L0 V aux neg // @NEG; ; ja mind ei \n" +
        "1 ; Ll A pos sg ad // @AN>; Ll S com sg ad // @ADVL; Li S com pl part // @OBJ; ; armetul kombel inimesi \n" +
        "1 ; L0 J crd // @J; Ll P dem sg ad // @NN>; Ll S com sg ad // @ADVL; ; Aga sel ajal \n" +
        "1 ; L0 K post // @ADVL; L0 S com sg gen // @NN>; L0 S com sg nom // @PRD; ; ajal Tammiku peremees \n" +
        "1 ; Lnud V main partic past ps // @ADVL; L0 P dem sg gen // @P>; L0 K post // @ADVL; ; olnud selle üle \n" +
        "1 ; L0 J crd // @J; L0 P pers ps3 sg nom // @SUBJ; Lda P dem sg part // @NN>; ; või tema seda \n" +
        "1 ; L0 S com sg part // @SUBJ; L0 J crd // @J; Lb V main indic pres ps3 sg ps af // @FMV; ; lauda ja ütleb \n" +
        "1 ; L0 A pos partic // @AN>; Ll S com sg ad // @ADVL @<NN; Lt S com sg part // @SUBJ; ; ajanud surnuaial moonameest \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @PRD; L0 J crd // @J; ; noor mees ja \n" +
        "1 ; L0 J sub // @J; Llgi P pers ps3 sg ad // @ADVL; L0 V main indic pres ps3 sg ps af // @FMV; ; et temalgi on \n" +
        "1 ; L0 P indef sg nom // @ADVL @SUBJ @OBJ; L0 S com sg part // @<Q; La V main inf // @OBJ; ; mitu korda käia \n" +
        "1 ; Ld S com pl nom // @SUBJ @OBJ; Lnud V main partic past ps // @ADVL @IMV; Lma V main sup ps ill // @ADVL; ; Teenrid tahtnud jooksma \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S prop sg gen // @NN>; L0 S com sg nom // @SUBJ; ; venna Konstantini poeg \n" +
        "1 ; L0 P dem sg nom // @SUBJ; L0 V main indic pres ps3 sg ps af // @FMV; L0 P pers ps2 sg gen // @NN>; ; see on sinu \n" +
        "1 ; Ld S com pl nom // @SUBJ; L0 S com sg part // @OBJ; L0 J crd // @J; ; käed risti ja \n" +
        "1 ; L0 S com sg part // @<Q; L0 S com sg gen // @P>; L0 K post // @ADVL @<KN; ; hullu maa pealt \n" +
        "1 ; L0 J crd // @J; L0 A pos sg gen // @AN>; L0 S prop sg gen // @NN>; ; ja vana Avanduse \n" +
        "1 ; Ll A pos sg ad // @AN>; Ll S com sg ad // @ADVL; Lb V main indic pres ps3 sg ps af // @FMV; ; tuleval aastal tervitab \n" +
        "1 ; L0 A pos // @ADVL; L0 V main imper pres ps2 sg ps af // @FMV; Lnud V main partic past ps // @ADVL @IMV; ; kogu aja kiitnud \n" +
        "1 ; Lnud V main partic past ps // @ADVL; Ld S com pl nom // @SUBJ; L0 S com sg part // @OBJ; ; pannud käed risti \n" +
        "1 ; L0 S com sg nom // @SUBJ @PRD; Lnud V main partic past ps // @ADVL; L0 J crd // @J; ; Piim olnud aga \n" +
        "1 ; L0 V main indic pres ps neg // @FMV; Lda P dem sg part // @OBJ; La V main inf // @OBJ; ; taha seda näha \n" +
        "1 ; L0 S com sg nom // @NN>; L0 S com sg nom // @SUBJ; L0 A pos partic // @AN>; ; härra Pagu ajanud \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; L0 P pers ps3 sg nom // @SUBJ; Lks N card sg tr l // @ADVL; ; mõistnud tema kolmeks \n" +
        "1 ; L0 S com sg nom // @SUBJ @OBJ; L0 J crd // @J; Ld S com pl nom // @<NN @SUBJ @OBJ; ; vaim ja pistnud \n" +
        "1 ; L0 S prop sg nom // @NN> @SUBJ; L0 S com sg nom // @NN> @OBJ; L0 S prop sg nom // @SUBJ; ; Ernst von Bremen \n" +
        "1 ; L0 S com sg nom // @ADVL; L0 V main imper pres ps2 sg ps af // @FMV; L0 J crd // @J; ; puusärk õhku ja \n" +
        "1 ; Ls S com sg in // @ADVL @<NN; L0 A pos sg gen // @AN>; L0 S com sg gen // @P>; ; toas suure tooli \n" +
        "1 ; L0 J sub // @J; Lnud V main partic past ps // @ADVL @IMV; Ltega S com pl kom // @NN> @ADVL; ; et hoidnud kätega \n" +
        "1 ; L0 S com sg part // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; Ll P pers ps3 sg ad // @ADVL; ; Raha oli tal \n" +
        "1 ; Ll P dem sg ad // @NN>; Ll S com sg ad // @ADVL @<NN; L0 A pos partic // @AN>; ; sel ajal ehitanud \n" +
        "1 ; L0 N card sg nom l // @OBJ; L0 S com sg part // @<Q; L0 S com sg gen // @P>; ; kaks hullu maa \n" +
        "1 ; L0 A pos partic // @AN>; L0 S prop sg gen // @NN>; L0 S com sg gen // @NN>; ; olnud Avanduse mõisa \n" +
        "1 ; L0 N card sg nom l // @NN>; L0 S prop sg nom // @NN> @SUBJ; Ls S com sg in // @ADVL @<NN; ; Üks Riiamaa mees \n" +
        "1 ; L0 A pos partic // @AN>; L0 S com sg gen // @P>; L0 K post // @ADVL; ; olnud tee ääres \n" +
        "1 ; L0 P pers ps3 sg gen // @NN>; Lks S com sg tr // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; ; tema nõrkuseks oli \n" +
        "1 ; Lnud V main partic past ps // @ADVL; L0 J crd // @J; L0 A pos // @ADVL; ; söönud ja kogu \n" +
        "1 ; L0 N card sg nom // @ADVL @<NN; L0 S com sg part // @<Q; Lu S com pl part // @SUBJ; ; 15 hoopi vitsu \n" +
        "1 ; L0 P pers ps3 sg nom // @SUBJ; Lks N card sg tr l // @ADVL; Lks S com sg tr // @<Q; ; tema kolmeks aastaks \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg nom // @SUBJ; Lb V main indic pres ps3 sg ps af // @FMV; ; Edru küla käib \n" +
        "1 ; L0 P dem sg gen // @P>; L0 K post // @ADVL; Lnud V main partic past ps // @IMV; ; teise juures lugenud \n" +
        "1 ; Lvat V aux quot pres ps af // @ICV @FCV; Ll P pers ps3 sg ad // @ADVL; Ld S com pl nom // @SUBJ; ; olevat tal riided \n" +
        "1 ; L0 P pers ps2 sg gen // @NN>; L0 S com sg nom // @SUBJ; L0 V main indic pres ps3 sg ps af // @FMV; ; sinu asi on \n" +
        "1 ; L0 S prop sg nom // @NN>; L0 S prop sg nom // @OBJ; Lnud V main partic past ps // @ADVL @IMV; ; Rahkla Miiling tahtnud \n" +
        "1 ; Lst S com sg el // @NN> @<NN @ADVL; L0 P pos det refl sg gen // @NN>; L0 S com sg gen // @NN>; ; taskust oma revolvri \n" +
        "1 ; Lle P dem sg all // @NN>; Lle S com sg all // @ADVL @<NN; Ld S com pl nom // @SUBJ; ; sellele lapsele sukad \n" +
        "1 ; L0 V aux indic pres ps neg // @FCV; Lnud V mod partic past ps // @ICV; L0 S com sg part // @NN> @SUBJ @OBJ; ; pole saanud mütsi \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; Lda V main inf // @<INFN; ; plaani järele ehitada \n" +
        "1 ; Lt S com sg part // @<Q; L0 J crd C // @J; Li V main indic impf ps3 sg ps af // @FMV; ; karjumist ja jäi \n" +
        "1 ; Lga S com sg kom // @NN> @<NN @ADVL; L0 S prop sg nom // @SUBJ @<NN; Lnud V main partic past ps // @ADVL; ; nimega Dahvid tulnud \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 A pos partic // @AN>; L0 S prop sg gen // @NN>; ; päeval tulnud Dahvidile \n" +
        "1 ; L0 K post // @ADVL; L0 V aux neg // @NEG; L0 V main indic pres ps neg // @FMV; ; eest ei taha \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Ll N ord sg ad l // @AN>; Ll S com sg ad // @ADVL; ; öelnud teisel korral \n" +
        "1 ; L0 S com sg nom // @SUBJ @PRD; L0 J crd // @J; L0 S com sg nom // @SUBJ @PRD; ; silk ja hapupiim \n" +
        "1 ; Ls S com sg in // @ADVL; L0 J crd // @J; Ls V main indic impf ps3 sg ps af // @FMV; ; mõttes ja hulkus \n" +
        "1 ; L0 J sub // @J; L0 S com sg nom // @SUBJ; Lda P dem sg part // @NN>; ; kui rahvas seda \n" +
        "1 ; Li V aux indic impf ps3 sg ps af // @FCV; Lid S com pl part // @OBJ; Lnud V main partic past ps // @IMV; ; oli nekruteid peksnud \n" +
        "1 ; L0 A pos sg part // @AN>; L0 S com sg part // @OBJ; Lte S com pl gen // @NN>; ; vana Pagu meeste \n" +
        "1 ; L0 S com sg gen // @P>; L0 K post // @ADVL; Lle N card sg all l // @NN>; ; abiellumise teel ühele \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; Lnud V main partic past ps // @ADVL @IMV; L0 P pers ps3 sg nom // @SUBJ; ; kohus mõistnud tema \n" +
        "1 ; L0 S com sg nom // @<NN @SUBJ; Lvat V aux quot pres ps af // @ICV @FCV; L0 A pos sg nom // @PRD; ; puusärk olevat tühi \n" +
        "1 ; L0 S com sg gen // @NN> @ADVL @OBJ; L0 A pos partic // @ADVL; Lle P pers ps3 sg all // @ADVL @<NN; ; vanaproua öelnud temale \n" +
        "1 ; Ld S com pl nom // @SUBJ @<NN; L0 N card sg nom // @ADVL @<NN; L0 S com sg part // @<Q; ; mõistnud 15 hoopi \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 P pos det refl sg gen // @NN>; L0 S com sg gen // @OBJ; ; kaotas oma varanduse \n" +
        "1 ; L0 S prop sg gen // @NN>; Ls S com sg in // @ADVL; L0 V main indic pres ps3 pl ps af // @FMV; ; Salla laanes on \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 P pos det refl sg gen // @NN>; Lga S com sg kom // @ADVL @<NN; ; Jutustajal oma isaga \n" +
        "1 ; L0 P dem sg nom // @SUBJ; Lnud V main partic past ps // @ADVL; L0 S com sg part // @OBJ; ; See saanud aru \n" +
        "1 ; L0 S prop sg gen // @NN>; L0 S com sg nom // @SUBJ; Lnudki V main partic past ps // @ADVL @IMV; ; Salla teener toonudki \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 V aux indic pres ps neg // @FCV; Lnud V main partic past ps // @IMV; ; sell pole teretanud \n" +
        "1 ; Lst P pers ps1 sg el // @ADVL @<NN; L0 J crd // @J; Ll S com sg ad // @ADVL; ; must kui koeral \n" +
        "1 ; L0 P dem sg gen // @P>; L0 K post // @ADVL; L0 V aux neg // @NEG; ; selle eest ei \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S com sg adit // @<NN @ADVL; La V main inf // @OBJ; ; surnuaia koju minna \n" +
        "1 ; L0 J crd // @J; Ll N ord sg ad l // @AN>; Ll S com sg ad // @ADVL; ; ja kolmandal õhtul \n" +
        "1 ; Ll S com sg ad // @ADVL @<NN; L0 A pos partic // @AN>; L0 P pos det refl sg gen // @NN>; ; ajal ehitanud oma \n" +
        "1 ; L0 J crd // @J; Lnudki V main partic past ps // @ADVL @IMV; Lma V main sup ps ill // @IMV; ; ja jäänudki uskuma \n" +
        "1 ; L0 S com sg gen // @ADVL @OBJ; La V main inf // @IMV; L0 J crd // @J; ; mõisa tuua ja \n" +
        "1 ; L0 S com sg nom // @NN> @SUBJ; L0 S prop sg gen // @P>; L0 K post // @<KN @ADVL; ; mõis Henningi käes \n" +
        "1 ; L0 P pers ps3 sg gen // @P>; L0 K post // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; ; Tema ette tuli \n" +
        "1 ; L0 J sub // @J; Lnud V main partic past ps // @ADVL; Ld S com pl nom // @OBJ @SUBJ; ; kui pannud hobused \n" +
        "1 ; Lnud V main partic past ps // @ADVL; L0 S com sg gen // @NN> @OBJ; Lsse S com sg ill // @<NN @ADVL; ; kaevanud Tedrekulli kohtusse \n" +
        "1 ; Lt S com sg part // @OBJ; L0 A pos partic // @AN>; L0 S prop sg gen // @NN>; ; härrat elanud Piibe \n" +
        "1 ; L0 J crd // @J; L0 A pos partic // @AN>; L0 P pos det refl sg gen // @NN>; ; aga mõistnud oma \n" +
        "1 ; L0 J crd // @J; L0 J sub // @J; Lst S com sg el // @ADVL; ; aga sest asjast \n" +
        "1 ; L0 S prop sg gen // @P>; L0 K post // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; ; Bremeni järele tuli \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 S prop sg nom // @SUBJ; L0 J crd C // @J; ; Müüs Salla ja \n" +
        "1 ; Lle P pers ps3 sg all // @ADVL; L0 A pos sg gen // @AN>; L0 S com sg gen // @NN>; ; temale suure kääru \n" +
        "1 ; Llgi P pers ps3 sg ad // @ADVL; L0 V main indic pres ps3 sg ps af // @FMV; L0 N card sg nom // @SUBJ; ; temalgi on 9-10 \n" +
        "1 ; L0 S com sg gen // @OBJ; L0 J crd // @J; L0 S com sg gen // @OBJ; ; söögi ja palga \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 P det pl nom // @NN>; L0 S com sg nom // @SUBJ; ; härral kõik kaelavahe \n" +
        "1 ; L0 P pers ps3 sg nom // @SUBJ; Lnud V main partic past ps // @ADVL @IMV; L0 S prop sg gen // @NN>; ; tema müünud Veemi \n" +
        "1 ; L0 J crd // @J; L0 S com sg gen // @P>; L0 K post // @ADVL; ; ja Rohu vahel \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; Lda P dem sg part // @OBJ; L0 J crd // @J; ; näinud seda ja \n" +
        "1 ; Lsse S com sg ill // @ADVL; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; ; kohtusse ja saanud \n" +
        "1 ; Lid V aux indic impf ps2 sg ps af // @FCV; L0 J crd C // @J; Ld P pers ps1 sg part // @OBJ; ; olid ja mind \n" +
        "1 ; Lst S com sg el // @<NN @ADVL; La V main inf // @OBJ; Lvat V aux quot pres ps af // @ICV @FCV; ; seljast võtta olevat \n" +
        "1 ; Lvad V main indic pres ps3 pl ps af // @FMV; L0 S com sg gen // @P>; L0 K post // @ADVL; ; annavad nahatäie kätte \n" +
        "1 ; Lst S com sg el // @<NN @ADVL; L0 V aux neg // @NEG; L0 V main indic pres ps neg // @FMV; ; mäest ei saa \n" +
        "1 ; Lnud V main partic past ps // @ADVL @IMV; L0 J crd // @J; Lnudki V main partic past ps // @ADVL @IMV; ; jonninud ja lõhkunudki \n" +
        "1 ; L0 J sub // @J; L0 P dem sg nom // @SUBJ; Lgu V main imper pres ps3 pl ps af // @FMV; ; et see jäägu \n" +
        "1 ; L0 J crd // @J; L0 S com sg nom // @SUBJ; L0 S com sg adit // @<NN @ADVL; ; ja rinnaesine hapupiima \n" +
        "1 ; Ltes S com pl in // @<NN @ADVL; L0 V aux indic pres ps3 sg ps af // @FCV; Ltud V main partic past imps // @IMV; ; keldrites on nähtud \n" +
        "1 ; L0 J sub // @J; L0 A comp sg nom // @PRD; Lks V main cond pres ps af // @FMV; ; et valusam oleks \n" +
        "1 ; Ll S com sg ad // @ADVL; L0 A pos partic // @AN>; L0 S com sg nom // @SUBJ; ; Eluajal olnud sant \n" +
        "1 ; L0 P pos det refl sg gen // @NN>; Ls S com sg in // @ADVL @<NN; L0 A pos sg gen // @AN>; ; oma toas suure \n" +
        "1 ; L0 S prop sg gen // @P>; L0 J crd // @J; L0 S com sg gen // @P>; ; Kissa ja Rohu \n" +
        "1 ; L0 K post // @ADVL; Li V main indic impf ps3 sg ps af // @FMV; L0 A pos sg nom // @PRD; ; vastu oli hea \n" +
        "1 ; L0 S prop sg nom // @<NN; Li V main indic impf ps3 sg ps af // @FMV; L0 P dem sg nom // @NN>; ; Pago oli niisugune \n" +
        "1 ; L0 J crd // @J; L0 A pos partic // @AN>; Ld S com pl nom // @SUBJ @OBJ; ; ja lahutanud majad \n" +
        "1 ; L0 P dem sg gen // @NN>; L0 S com sg gen // @NN> @OBJ; Lle S prop sg all // @<NN @ADVL; ; selle hapupiima Bremenile \n" +
        "1 ; Lis V main indic impf ps3 sg ps af // @FMV; Lda V main inf // @OBJ; L0 S com sg nom // @SUBJ; ; tahtis öelda pruut \n" +
        "1 ; Lda P pers ps3 sg part // @SUBJ; L0 N card sg nom l // @OBJ; L0 S com sg part // @<Q; ; teda kaks korda \n" +
        "1 ; L0 N card sg nom l // @ADVL @SUBJ; Lt S com sg part // @<Q; Lnud V main partic past ps // @ADVL; ; Kolm meest hakanud \n" +
        "1 ; L0 P dem sg gen // @P>; L0 K post // @ADVL; L0 A pos partic // @AN>; ; Selle pärast tulnud \n" +
        "1 ; L0 S com sg nom // @SUBJ; L0 A pos partic // @AN>; Llt P dem sg abl // @ADVL @<NN; ; Tedrekull ostnud sellelt \n" +
        "1 ; L0 J crd // @J; Ld S com pl nom // @OBJ @SUBJ; Lma V main sup ps ill // @ADVL; ; ja kukkunud paluma \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @SUBJ; Ls S com sg in // @<NN @ADVL; ; vana Pagu kodus \n" +
        "1 ; L0 K post // @ADVL; L0 A pos partic // @AN>; Ll P pers ps3 sg ad // @ADVL; ; pärast tulnud tal \n" +
        "1 ; L0 S com sg gen // @NN>; Ls S com sg in // @ADVL @<NN; Lnud V main partic past ps // @ADVL; ; Laane kõrtsis olnud \n" +
        "1 ; L0 J crd // @J; Lnud V main partic past ps // @ADVL @IMV; Lt S com sg part // @OBJ; ; ja hakanud Issameiet \n" +
        "1 ; L0 S com sg nom // @SUBJ @PRD; L0 J crd // @J; L0 A pos partic // @AN>; ; poiss ja andnud \n" +
        "1 ; L0 A pos sg nom // @AN>; L0 S com sg nom // @NN>; L0 A pos partic // @AN>; ; Vana Pagu olnud \n" +
        "1 ; Li V main indic impf ps3 sg ps af // @FMV; Ll P pers ps3 sg ad // @ADVL; L0 N card sg nom // @SUBJ @ADVL @PRD; ; oli tal 9-10 \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 S prop sg nom // @SUBJ; L0 Y nominal // @ADVL @OBJ; ; Kaotas Avanduse E. \n" +
        "1 ; L0 S com sg part // @OBJ; L0 S prop sg nom // @<NN; Ltud V main partic past imps // @IMV; ; poega Abrami pekstud \n" +
        "1 ; Ls V main indic impf ps3 sg ps af // @FMV; L0 N ord sg ad // @AN>; Ll S com sg ad // @ADVL; ; jagas 1885. aastal \n" +
        "1 ; L0 J crd // @J; L0 J sub // @J; L0 S com sg nom // @SUBJ; ; aga sest saadik \n" +
        "1 ; L0 S com sg nom // @SUBJ; Li V main indic impf ps3 sg ps af // @FMV; L0 S com sg gen // @P>; ; Kell oli ukse \n" +
        "1 ; Ls S com sg in // @NN> @ADVL; Lst S com sg el // @P>; L0 K post // @<KN @ADVL; ; otsesihis rukkist läbi \n" +
        "1 ; L0 S prop sg nom // @SUBJ; L0 A pos partic // @AN>; L0 P dem sg adit // @NN>; ; Joosep toonud teise \n" +
        "1 ; Lda P dem sg part // @NN>; L0 S com sg part // @OBJ; Li V main indic impf ps3 sg ps af // @FMV; ; seda mütsi nägi \n" +
        "1 ; L0 S prop sg gen // @NN>; Ld S com pl nom // @SUBJ @OBJ; Lma V main sup ps ill // @ADVL; ; Harpe pannud karjuma \n" +
        "1 ; L0 S prop sg nom // @SUBJ; L0 N ord // @AN>; Lnud V main partic past ps // @ADVL; ; Aleksander II olnud \n" +
        "1 ; L0 S com sg gen // @NN>; L0 S com sg part // @OBJ; L0 S prop sg nom // @<NN; ; Talitaja poega Abrami";
    }

    if ( !searchForm.isMorfoAnalysis() && searchForm.isSyntacticAnalysis() )
    {
      return "9 ; @NN>; @SUBJ; @FMV; ; Meie härra on ; kohtuistumise tool on ; Avanduse mõis oli ; Venevere rentnik oli ; mõisa Essen oli ; sinu asi on ; Kuberneriproua Essen oli ; õpetaja eluruumid tulevad ; Edru küla käib \n" +
        "8 ; @NN>; @NN>; @SUBJ; ; Salla von Harpe ; tema kohtuistumise tool ; venna Konstantini poeg ; Võivere härra Pagu ; Rahkla Miilingu rist ; Tammiku mõisa Essen ; see sinu asi ; Lasinurme härra Stakelberg \n" +
        "8 ; @NN>; @P>; @ADVL; ; Avanduse vallamaja ees ; tema matuse ajal ; Pagude kabeli juures ; Pagude kabeli juurest ; talude müümise ajal ; oma plaani järele ; oma plaani järele ; ühe kindrali käes \n" +
        "7 ; @NN>; @SUBJ; @ADVL; ; Jutustaja lell läinud ; Miilingu rist kukkunud ; Tammiku vanaproua olnud ; Üks muna olnud ; Tammiku proua olnud ; Uustalu Jaagup rääkinud ; Lasinurme Stakelberg lasknud \n" +
        "7 ; @FMV; @AN>; @SUBJ; ; oli aus mees ; on tore piim ; Hirmus kuri mees ; oli hirmus mees ; hirmus tige mees ; hirmus must inimene ; hulkus mööda tuba \n" +
        "6 ; @P>; @ADVL; @FMV; ; Tema ette tuli ; Vallarahva vastu oli ; Bremeni järele tuli ; Viinaköögi kõrval oli ; tema järel jookseb ; kabeli juurest hakkas \n" +
        "6 ; @SUBJ; @FCV; @IMV; ; sell pole teretanud ; tema pole näinud ; see peab tähendama ; keegi pole julgenud ; muud pole olnud ; tema pole teinud \n" +
        "5 ; @ADVL; @FMV; @SUBJ; ; nõrkuseks oli kaardimäng ; kõrval oli puukamber ; üks kohtus käimine ; mõisas olid Baerid ; temalgi on 9-10 \n" +
        "5 ; @P>; @ADVL; @IMV; ; naha peale anda ; vallamaja ees suitsetada ; teise juures lugenud ; vahi alla võtta ; enda juurde kutsuda \n" +
        "5 ; @SUBJ; @FMV; @ADVL; ; haagikohtunik oli poolhullu ; see sai temalt ; Raha oli tal ; Proua päris kasvatanud ; Härra tuli põllule \n" +
        "5 ; @AN>; @P>; @ADVL; ; praeguse meierei asemel ; olnud tee ääres ; suure tooli peal ; läinud abiellumise teel ; uue maja peale \n" +
        "5 ; @J; @ADVL; @FMV; ; ja kogu aja ; ja lilli oli ; kui üks kohtus ; et viljas on ; et temalgi on \n" +
        "5 ; @SUBJ; @FMV; @AN>; ; tema on lühikese ; Maamõõtja jagas 1885. ; Bremen tuleb neljandal ; See oli noor ; sa hirmus must \n" +
        "4 ; @ADVL; @J; @ADVL @IMV; ; poest ja tahtnud ; lugenud ja palunud ; kohtusse ja saanud ; käes ja küsinud \n" +
        "4 ; @NN>; @ADVL; @FMV; ; Salla laanes on ; tema nõrkuseks oli ; Piibe mõisas olid ; tema jutule mindi \n" +
        "4 ; @ADVL; @NN>; @OBJ; ; saatnud jutustaja venna ; visanud oma laabroki ; tervitanud mõisa rahvast ; sellest tema aru \n" +
        "4 ; @J; @SUBJ; @FCV; ; aga sell pole ; Aga Dahvid pole ; et tema pole ; aga keegi pole \n" +
        "4 ; @FMV; @AN>; @ADVL; ; on lühikese nägemisega ; jagas 1885. aastal ; tuleb neljandal õhtul ; lasi armetul kombel \n" +
        "4 ; @J; @SUBJ; @FMV; ; Kui tema sõitis ; et kes tuleb ; et see jäägu ; et vald tarvitab \n" +
        "4 ; @SUBJ; @FMV; @PRD; ; See oli vanapoiss ; rentnik oli ta ; mina olen keiser ; Mina olen Huen \n" +
        "4 ; @SUBJ; @FMV; @NN>; ; see kaotas oma ; Essen oli talude ; tamm kasvab Salla ; see on sinu \n" +
        "4 ; @FMV; @P>; @ADVL; ; annavad nahatäie kätte ; näeb kabeli ligidal ; oli ukse küljes ; Olid rahva vastu \n" +
        "3 ; @ADVL; @AN>; @SUBJ; ; olnud suur haagrehtikohus ; hakanud vana Pagu ; Eluajal olnud sant \n" +
        "3 ; @AN>; @NN>; @ADVL @<NN; ; mõistnud oma 15 ; kahmanud pingi pihku ; elanud Piibe mõisas \n" +
        "3 ; @ADVL; @AN>; @ADVL; ; Mõisas olnud kutsariks ; ajal tõusnud puusärk ; pärast tulnud tal \n" +
        "3 ; @IMV; @NN>; @OBJ; ; teadnud neid kombeid ; julgenud seda vastutust ; kinkinud maja aluse \n" +
        "3 ; @NN>; @SUBJ @OBJ; @ADVL; ; Harpe teener öelnud ; Harpe hobuseid lugemas ; Harpe pannud karjuma \n" +
        "3 ; @J; @AN>; @NN>; ; aga mõistnud oma ; ja visanud selle ; ja vana Avanduse \n" +
        "3 ; @SUBJ; @FMV; @OBJ; ; Harpe tahtis kummardamist ; Bremen mõistis krahvi ; Huen lasi teda \n" +
        "3 ; @SUBJ; @ADVL; @OBJ; ; Kuberner peksnud inimesi ; Stakelberg lasknud end ; See saanud aru \n" +
        "3 ; @SUBJ; @ADVL @IMV; @NN>; ; teener toonudki härra ; tema müünud Veemi ; see olnudki see \n" +
        "3 ; @AN>; @NN>; @<NN @ADVL; ; hea härra pükstes ; olnud oma eluajal ; mööda linna ringi \n" +
        "3 ; @OBJ; @J; @ADVL @IMV; ; kõhtu ja öelnud ; risti ja hakanud ; seda ja lasknud \n" +
        "3 ; @P>; @ADVL; @ADVL; ; sellest hoolimata hakanud ; plaani järele vundamendi ; rahva vastu olnud \n" +
        "3 ; @AN>; @ADVL; @OBJ; ; 1885. aastal talumaad ; armetul kombel inimesi ; väikese kivimaja ehitada \n" +
        "3 ; @FCV; @IMV; @NN>; ; pole teadnud neid ; pole julgenud seda ; Pole olnud niisugust \n" +
        "3 ; @J; @AN>; @ADVL; ; ja kolmandal õhtul ; ja suitsetanud paberossi ; ja ütelnud peksjaile \n" +
        "3 ; @ADVL; @FMV; @NN>; ; järele tuli tema ; sel oli oma ; Tal olid Salla \n" +
        "3 ; @AN>; @ADVL; @FMV; ; Esimesel õhtul on ; tõusnud puusärk õhku ; tuleval aastal tervitab \n" +
        "3 ; @P>; @ADVL; @NN>; ; müümise ajal Tammiku ; abiellumise teel ühele ; asja pärast tema \n" +
        "3 ; @NN>; @OBJ; @ADVL; ; Ema öelnud selle ; seda vastutust endale ; Jutustaja isa öelnud \n" +
        "3 ; @P>; @ADVL; @J; ; kabeli juures ja ; hobuste kõrval ja ; muna käes ja \n" +
        "3 ; @J; @AN>; @SUBJ @OBJ; ; et küpsetatud silgud ; et paremat otsi ; ja lahutanud majad \n" +
        "3 ; @ADVL @<NN; @J; @ADVL; ; pihku ja sellega ; rohule ega puuoksa ; must kui koeral \n" +
        "3 ; @J; @J; @SUBJ; ; aga sest saadik ; aga või tema ; et kui mulgid \n" +
        "3 ; @NN>; @SUBJ; @AN>; ; härra Pagu ajanud ; Joala Joosep toonud ; Koila mõis läinud \n" +
        "3 ; @SUBJ; @ADVL; @ADVL; ; Mees jäänudki peksust ; muna olnud teistest ; Tamm jäänudki Sallasse \n" +
        "3 ; @FMV; @OBJ; @OBJ; ; mõistis krahvi meelitada ; taha kopikat anda ; taha seda näha \n" +
        "3 ; @AN>; @SUBJ; @<NN @ADVL; ; vana Pagu kodus ; olnud sant mees ; mööda tuba ringi \n" +
        "3 ; @ADVL; @AN>; @OBJ; ; mõisalastele suure jõulupuu ; võtnud uut mõisnikku ; ajal näidanud end \n" +
        "3 ; @OBJ; @NEG; @FMV; ; mind ei teretanud ; aru ei saa ; otsust ei teinud \n" +
        "3 ; @SUBJ; @AN>; @ADVL @<NN; ; Pagu ajanud surnuaial ; suulagi olnud must ; Tedrekull ostnud sellelt \n" +
        "3 ; @ADVL; @NN>; @ADVL @<NN; ; Kudunud sellele lapsele ; Jutustajal oma isaga ; mehed sel ajal \n" +
        "3 ; @NN>; @SUBJ; @FCV; ; Maamõõtja nimi oli ; Võivere Pagu oli ; härra Stakelberg oli \n" +
        "3 ; @ADVL; @NN>; @SUBJ; ; härral kõik kaelavahe ; Olnud niisugune seadus ; Olnud teine niisugene \n" +
        "3 ; @J; @NN>; @SUBJ; ; ja Padu Kooli-Juhan ; ja Tammiku mõisad ; et õpetaja eluruumid \n" +
        "3 ; @J; @NN>; @ADVL; ; et soldati sauna ; Kui ta Suure-Tammikule ; Aga sel ajal \n" +
        "3 ; @FMV; @NN>; @SUBJ; ; Oli keisri kammerhärra ; oli oma sada ; oli niisugune mees \n" +
        "3 ; @AN>; @SUBJ; @FMV; ; omaaegne haagikohtunik oli ; Vana Essen oli ; uhke tamm kasvab \n" +
        "2 ; @J; @FMV; @SUBJ; ; ja ostis Porkuni ; et polnud viljaseemet \n" +
        "2 ; @J; @SUBJ; @NN>; ; kui rahvas seda ; või tema seda \n" +
        "2 ; @J; @OBJ @SUBJ; @ADVL; ; et teda vaimuks ; ja kukkunud paluma \n" +
        "2 ; @AN>; @SUBJ; @J; ; uus alus ja ; suur tüli ja \n" +
        "2 ; @IMV; @J; @NN>; ; kõnelema ja Harpe ; kärisenud ja kapi \n" +
        "2 ; @AN>; @AN>; @SUBJ; ; Vana uhke tamm ; olnud hea mees \n" +
        "2 ; @ADVL; @ADVL; @ADVL; ; sellega veheldes pääsenud ; olnud teistest väiksem \n" +
        "2 ; @PRD; @J; @ADVL @IMV; ; haige ja jäänudki ; mees ja uidanud \n" +
        "2 ; @J; @SUBJ; @ADVL @<NN; ; Kui proua sulle ; ja kiskund omal \n" +
        "2 ; @ADVL; @FMV; @OBJ; ; juurest hakkas teda ; Endine tee käinud \n" +
        "2 ; @ADVL; @OBJ; @ADVL; ; läinud neid peksma ; käskinud seda mõisa \n" +
        "2 ; @J; @ADVL; @NN>; ; ja mehed sel ; aga sellest tema \n" +
        "2 ; @NN>; @OBJ; @FMV; ; seda mütsi nägi ; neid majasid ehitatakse \n" +
        "2 ; @NN>; @ADVL @<NN; @ADVL; ; Laane kõrtsis olnud ; oma isaga olnud \n" +
        "2 ; @AN>; @NN>; @J; ; Vana Jenk ja ; Pööranud selja ja \n" +
        "2 ; @J; @SUBJ; @AN>; ; ja suulagi olnud ; ja ehitanud uue \n" +
        "2 ; @OBJ @SUBJ; @AN>; @NN>; ; venelased sugenud Harpe ; Mehed läinud neid \n" +
        "2 ; @AN>; @ADVL @<NN; @J; ; seal kõrval ja ; olnud must kui \n" +
        "2 ; @ADVL; @ADVL; @IMV; ; veega vitse kastnud ; saanud sellest teada \n" +
        "2 ; @NN> @ADVL; @OBJ; @J; ; kätega kõhtu ja ; mõisast söögi ja \n" +
        "2 ; @ADVL; @OBJ; @AN>; ; ajal kõik musta ; peksnud inimesi koledal \n" +
        "2 ; @ADVL; @FMV; @J; ; järel jookseb nagu ; puusärk õhku ja \n" +
        "2 ; @J; @P>; @ADVL; ; Aga sellest hoolimata ; ja Rohu vahel \n" +
        "2 ; @SUBJ; @NN>; @OBJ; ; rahvas seda mütsi ; tööinimene oma riideid \n" +
        "2 ; @J; @SUBJ; @ADVL @IMV; ; aga vanarahvas kõnelnud ; sest tema müünud \n" +
        "2 ; @SUBJ; @FCV; @PRD; ; Zoege oli haagreht ; see on varas \n" +
        "2 ; @J; @NN>; @SUBJ @OBJ; ; ja Harpe teener ; ja kapi uksed \n" +
        "2 ; @FMV; @OBJ; @SUBJ; ; hakkas teda vaim ; tahtis öelda pruut \n" +
        "2 ; @ADVL @IMV; @ADVL; @IMV; ; tahtnud jooksma panna ; viinud prouale näha \n" +
        "2 ; @ADVL; @J; @AN>; ; vihastanud ja visanud ; juures ja suitsetanud \n" +
        "2 ; @ADVL; @AN>; @NN>; ; päeval tulnud Dahvidile ; temale suure kääru \n" +
        "2 ; @J; @AN>; @SUBJ; ; aga õige paks ; nagu must vari \n" +
        "2 ; @J; @FMV; @AN>; ; ja oli aus ; ja hulkus mööda \n" +
        "2 ; @ADVL; @FMV; @ADVL; ; õhtul on laual ; mõisa mune viima \n" +
        "2 ; @SUBJ; @J; @FMV; ; lauda ja ütleb ; Salla ja ostis \n" +
        "2 ; @FMV; @AN>; @NN> @ADVL; ; Kandis musta mütsi ; ajab tulisest suust \n" +
        "2 ; @J; @SUBJ; @<NN @ADVL; ; ja rinnaesine hapupiima ; et tamm Tammikus \n" +
        "2 ; @ADVL @IMV; @NN>; @OBJ; ; haaranud pingi pihku ; saanud härra õiguse \n" +
        "2 ; @AN>; @NN> @ADVL; @SUBJ; ; evangeelse luteriusu kool ; vana õpetaja Pauker \n" +
        "2 ; @NN> @SUBJ; @ADVL @<NN; @ADVL; ; Riiamaa mees läinud ; Riiamaa mees läinudki \n" +
        "2 ; @SUBJ @OBJ; @ADVL; @OBJ; ; See läinud neid ; Huen lasknud teda \n" +
        "2 ; @ADVL @IMV; @IMV; @J; ; hakanud kõnelema ja ; hakanud naerma ja \n" +
        "2 ; @SUBJ; @J; @SUBJ; ; kaelavahe ja nägu ; nägu ja rinnaesine \n" +
        "2 ; @ADVL; @AN>; @SUBJ @PRD; ; olnud kole inimene ; olnud tige mees \n" +
        "2 ; @OBJ; @AN>; @<NN @ADVL; ; inimesi koledal kombel ; mõisnikku suure pidulikkusega \n" +
        "2 ; @OBJ; @ADVL; @OBJ; ; teda kabeliaeda vedada ; vastutust endale võtta \n" +
        "2 ; @SUBJ; @AN>; @P>; ; mõis läinud abiellumise ; ehitanud uue maja \n" +
        "2 ; @ADVL; @P>; @ADVL; ; olnud selle üle ; Seisnud ukse juures \n" +
        "2 ; @SUBJ @OBJ; @J; @OBJ; ; võtnud aga brauningu ; insenere ja tarku \n" +
        "2 ; @NEG; @FMV; @OBJ; ; ei taha kopikat ; ei taha seda \n" +
        "2 ; @J; @NN>; @SUBJ @ADVL; ; Kui Rahkla Miiling ; Kui Rahkla Miiling \n" +
        "2 ; @AN>; @OBJ; @NN>; ; vana Pagu meeste ; näidanud end sellele \n" +
        "2 ; @J; @ADVL @IMV; @NN> @ADVL; ; et hoidnud kätega ; ja uidanud valeriietes \n" +
        "2 ; @J; @ADVL @IMV; @OBJ; ; ja hakanud Issameiet ; ja saanud õiguse \n" +
        "2 ; @FCV; @IMV; @OBJ; ; pole teretanud Harpet ; on nähtud naharibasid \n" +
        "2 ; @NN>; @NN> @SUBJ; @ADVL @<NN; ; Üks Riiamaa mees ; See Riiamaa mees \n" +
        "2 ; @ADVL @IMV; @J; @ADVL @IMV; ; jonninud ja lõhkunudki ; kärkinud ja hüüdnud \n" +
        "2 ; @FMV; @J; @FMV; ; lähed ja suitsetad ; tulge kui tahate \n" +
        "2 ; @SUBJ; @FCV; @ADVL; ; Dahvid pole sellest ; nimi oli Joa \n" +
        "2 ; @NN>; @J; @AN>; ; Harpe aga mõistnud ; selja ja ütelnud \n" +
        "2 ; @SUBJ; @AN>; @NN>; ; Dahvid kahmanud pingi ; Joosep toonud teise \n" +
        "2 ; @NN> @ADVL; @P>; @<KN @ADVL; ; Riias tema asemel ; otsesihis rukkist läbi \n" +
        "2 ; @NN>; @<NN @ADVL; @FMV; ; tema jutule tuli ; oma eluajal hirmus \n" +
        "2 ; @NN>; @SUBJ; @J; ; kõik kaelavahe ja ; Rahkla Miiling ja \n" +
        "2 ; @ADVL; @SUBJ; @OBJ; ; pannud käed risti ; tahtnud ta tamme \n" +
        "2 ; @P>; @ADVL; @OBJ; ; matuse ajal kõik ; kabeli ligidal kedagi \n" +
        "2 ; @AN>; @NN>; @SUBJ; ; tulnud Dahvidile kiri ; Noor Võivere Pagu \n" +
        "2 ; @OBJ; @ADVL; @OBJ @SUBJ; ; Harpe lasknud mehed ; See lasknud teda \n" +
        "2 ; @ADVL; @NEG; @FCV; ; sauna ei tohi ; töötades ei tohtinud \n" +
        "2 ; @ADVL; @J; @ADVL; ; toas ja aluspükstes ; söönud ja kogu \n" +
        "2 ; @AN>; @OBJ; @AN>; ; uut mõisnikku suure ; head härrat elanud \n" +
        "2 ; @SUBJ; @ADVL; @NN>; ; See visanud oma ; Papen tervitanud mõisa \n" +
        "2 ; @ADVL; @NN>; @ADVL; ; teel ühele umbvenelasele ; pärast tema jutule \n" +
        "2 ; @NN>; @ADVL @<NN; @AN>; ; oma toas suure ; sel ajal ehitanud \n" +
        "2 ; @J; @ADVL @IMV; @ADVL; ; ja viinud prouale ; et andnud temale \n" +
        "2 ; @J; @ADVL; @ADVL; ; ja sellega veheldes ; kui koju tulnud \n" +
        "2 ; @ADVL; @ADVL; @J; ; tulnud poest ja ; kaevanud kohtusse ja \n" +
        "2 ; @AN>; @ADVL; @SUBJ; ; neljandal õhtul lauda ; olnud kutsariks keegi \n" +
        "2 ; @SUBJ; @ADVL; @AN>; ; vanaproua olnud kitsi ; Rahvas võtnud uut \n" +
        "2 ; @NN>; @<NN @ADVL; @OBJ; ; surnuaia koju minna ; meeste seljast võtta \n" +
        "2 ; @FCV; @OBJ; @IMV; ; pidid kraavi minema ; oli nekruteid peksnud \n" +
        "2 ; @SUBJ; @FMV; @NN> @ADVL; ; Essen oli Riias ; Essen oli Riias \n" +
        "2 ; @P>; @ADVL; @AN>; ; Kesköö ajal tõusnud ; Selle pärast tulnud \n" +
        "2 ; @NN>; @J; @NN>; ; Jenk ja Padu ; Mõisamaa ja Tammiku \n" +
        "2 ; @SUBJ; @NEG; @FMV; ; Jutustaja ei tea ; Mina ei taha \n" +
        "1 ; @NN> @ADVL; @J; @<NN @ADVL; ; ihupesuni ja hõbelauanõudeni \n" +
        "1 ; @<NN @ADVL; @<KN @ADVL; @J; ; teisele poole ja \n" +
        "1 ; @NN> @ADVL; @NN> @ADVL; @NN> @<NN @ADVL @SUBJ; ; Tammiku proua Salla \n" +
        "1 ; @AN>; @ADVL; @J; ; pimedas toas ja \n" +
        "1 ; @NN>; @OBJ @PRD; @J; ; härra püksid ja \n" +
        "1 ; @PRD; @J; @OBJ; ; pikk ja ennast \n" +
        "1 ; @FCV; @AN>; @ADVL; ; oli soolase veega \n" +
        "1 ; @OBJ @SUBJ; @AN>; @OBJ @<NN; ; Virtin võtnud munad \n" +
        "1 ; @ADVL; @<Q; @IMV; ; kolm ööd valvatud \n" +
        "1 ; @IMV; @NN>; @P>; ; keelatud Avanduse vallamaja \n" +
        "1 ; @FCV; @J; @OBJ; ; olid ja mind \n" +
        "1 ; @J; @ADVL @AN>; @P>; ; ja läinud kuberneri \n" +
        "1 ; @AN>; @NN>; @NN> @OBJ; ; visanud selle hapupiima \n" +
        "1 ; @ADVL @PRD; @P>; @ADVL; ; väikest muna käes \n" +
        "1 ; @J; @OBJ; @ADVL; ; kui saia andnud \n" +
        "1 ; @FMV; @AN>; @PRD @ADVL @SUBJ; ; oli terve mägi \n" +
        "1 ; @J; @<NN @SUBJ @OBJ; @ADVL; ; ja pistnud jooksma \n" +
        "1 ; @OBJ @ADVL; @FMV; @ADVL; ; ehituspalke mindi saama \n" +
        "1 ; @NN>; @ADVL; @OBJ; ; ta Suure-Tammikule koolimaja \n" +
        "1 ; @SUBJ; @<NN @ADVL; @IMV; ; Pagu kodus käima \n" +
        "1 ; @ADVL @<NN; @OBJ; @NN> @<NN @ADVL; ; meestele vilja magasiaidast \n" +
        "1 ; @FMV; @ADVL @SUBJ @OBJ; @<Q; ; laskis mitu korda \n" +
        "1 ; @NN>; @AN>; @ADVL @<NN @PRD @OBJ @SUBJ; ; see väike poiss \n" +
        "1 ; @OBJ @ADVL; @IMV; @NN>; ; proua õiendanud kõik \n" +
        "1 ; @J; @NN> @SUBJ @OBJ; @AN>; ; et mis aus \n" +
        "1 ; @NN>; @ADVL @<NN; @NN>; ; Piibe mõisas üks \n" +
        "1 ; @ADVL @SUBJ; @<Q; @ADVL; ; Kolm meest hakanud \n" +
        "1 ; @SUBJ; @FCV; @AN>; ; Pagu oli hea \n" +
        "1 ; @SUBJ; @FMV; @NN> @OBJ; ; Härra laskis mäe \n" +
        "1 ; @AN>; @SUBJ; @AN>; ; väike kasutütar seisnud \n" +
        "1 ; @ADVL @<NN; @NN>; @SUBJ; ; mõisas üks härra \n" +
        "1 ; @AN>; @AN>; @NN> @<NN @ADVL; ; elanud väikeses mõisas \n" +
        "1 ; @AN>; @ADVL; @ADVL @NN> @OBJ; ; tulnud tal valla \n" +
        "1 ; @IMV; @OBJ; @ADVL; ; tahtnud teda kabeliaeda \n" +
        "1 ; @AN>; @PRD; @IMV; ; hea mees olnud \n" +
        "1 ; @OBJ; @IMV; @ADVL @IMV; ; koolimaja ehitada lasknud \n" +
        "1 ; @ADVL; @NN>; @P>; ; olnud ühe kindrali \n" +
        "1 ; @SUBJ @OBJ; @J; @<NN @SUBJ @OBJ; ; vaim ja pistnud \n" +
        "1 ; @SUBJ @OBJ; @PRD; @J; ; seda haige ja \n" +
        "1 ; @J; @OBJ; @FCV; ; et härra võiks \n" +
        "1 ; @NEG; @FCV; @IMV; ; ei tohi lõhkuda \n" +
        "1 ; @J; @SUBJ @OBJ; @ADVL @IMV; ; ja mõlemad läinud \n" +
        "1 ; @ADVL; @NN> @OBJ; @<NN @ADVL; ; kaevanud Tedrekulli kohtusse \n" +
        "1 ; @NN>; @OBJ; @ADVL @IMV; ; Rahkla Miiling tahtnud \n" +
        "1 ; @ADVL @IMV; @OBJ; @ADVL @PRD; ; hoidnud seda väikest \n" +
        "1 ; @FMV; @ADVL; @SUBJ @ADVL @PRD; ; oli tal 9-10 \n" +
        "1 ; @ADVL @IMV; @OBJ @SUBJ; @J; ; trampinud jalgu ja \n" +
        "1 ; @NN>; @NN>; @<NN @ADVL; ; Võivere mõisa keldrites \n" +
        "1 ; @NN>; @<Q; @J; ; seda karjumist ja \n" +
        "1 ; @NN>; @P>; @J; ; otsetee Kissa ja \n" +
        "1 ; @<NN @ADVL; @FMV; @AN>; ; eluajal hirmus tige \n" +
        "1 ; @J; @ADVL @OBJ; @P>; ; Kui miski asja \n" +
        "1 ; @ADVL; @OBJ; @<NN @ADVL; ; aastal talumaad mõisast \n" +
        "1 ; @J; @<NN @SUBJ; @ICV @FCV; ; aga puusärk olevat \n" +
        "1 ; @NN>; @SUBJ @OBJ; @ADVL @IMV; ; see pistnud karjuma \n" +
        "1 ; @ADVL; @NEG; @FMV; ; eest ei taha \n" +
        "1 ; @SUBJ; @ADVL @<NN; @NN> @OBJ; ; kiskund omal juukseid \n" +
        "1 ; @<NN; @J; @FMV; ; kõike ja oli \n" +
        "1 ; @J; @FMV; @ADVL; ; ja jäi hulluks \n" +
        "1 ; @OBJ; @NN>; @ADVL @<NN; ; end sellele mehele \n" +
        "1 ; @ADVL @IMV; @J; @ADVL @AN>; ; vihastanud ja läinud \n" +
        "1 ; @OBJ @PRD; @J; @SUBJ @OBJ; ; püksid ja mõlemad \n" +
        "1 ; @NN>; @ADVL @<NN; @SUBJ; ; sellele lapsele sukad \n" +
        "1 ; @OBJ; @SUBJ; @FCV; ; mis see peab \n" +
        "1 ; @SUBJ; @AN>; @OBJ; ; Normann sõimanud ristitegijat \n" +
        "1 ; @IMV; @J; @SUBJ @OBJ; ; tuua ja nahad \n" +
        "1 ; @SUBJ @<NN; @ADVL @<NN; @<Q; ; mõistnud 15 hoopi \n" +
        "1 ; @J; @SUBJ; @J; ; ja nägu ja \n" +
        "1 ; @ADVL; @OBJ @SUBJ; @ADVL @OBJ; ; lasknud mehed mõisa \n" +
        "1 ; @J; @NN>; @P>; ; et Pagude kabeli \n" +
        "1 ; @SUBJ; @PRD; @J; ; niisugene pikk ja \n" +
        "1 ; @ADVL; @SUBJ; @J; ; õhtul lauda ja \n" +
        "1 ; @ADVL; @OBJ @SUBJ; @ADVL; ; jäänud mõlemad karistamata \n" +
        "1 ; @OBJ @SUBJ; @ADVL; @SUBJ @<NN @OBJ; ; lugejad jooksnud kõik \n" +
        "1 ; @ADVL @<NN; @AN>; @NN>; ; ajal ehitanud oma \n" +
        "1 ; @<NN @ADVL; @FCV; @IMV; ; keldrites on nähtud \n" +
        "1 ; @NN> @<NN @ADVL; @SUBJ; @FMV; ; mees mina olen \n" +
        "1 ; @OBJ; @<NN; @IMV; ; poega Abrami pekstud \n" +
        "1 ; @ADVL; @OBJ @ADVL; @IMV; ; hakanud päevi nõudma \n" +
        "1 ; @NN>; @OBJ @ADVL; @SUBJ @<INFN; ; mõisa juure minna \n" +
        "1 ; @AN>; @NN>; @OBJ; ; suure kääru saia \n" +
        "1 ; @OBJ; @OBJ; @ADVL; ; krahvi meelitada kaardimängule \n" +
        "1 ; @ADVL; @ADVL; @P>; ; Proual olnud selle \n" +
        "1 ; @SUBJ; @J; @AN>; ; Miiling ja vana \n" +
        "1 ; @ADVL @OBJ; @ADVL; @OBJ; ; Härra käskinud seda \n" +
        "1 ; @NN> @ADVL @OBJ; @ADVL; @ADVL @<NN; ; vanaproua öelnud temale \n" +
        "1 ; @OBJ; @ADVL; @IMV; ; seda mõisa tuua \n" +
        "1 ; @OBJ @SUBJ; @P>; @ADVL; ; teda enda juurde \n" +
        "1 ; @AN>; @OBJ; @SUBJ; ; va Määri Zoege \n" +
        "1 ; @AN>; @NN>; @P>; ; ehitanud oma plaani \n" +
        "1 ; @NN> @PRD; @NN> @<NN @ADVL; @SUBJ; ; mis mees mina \n" +
        "1 ; @IMV; @NN>; @SUBJ @PRD; ; olnud niisugust riista \n" +
        "1 ; @SUBJ; @FMV; @P>; ; Kell oli ukse \n" +
        "1 ; @SUBJ; @FMV; @J; ; sa lähed ja \n" +
        "1 ; @J; @NN>; @OBJ; ; aga Rahkla Miiling \n" +
        "1 ; @ICV; @IMV; @NN>; ; Olnud keelatud Avanduse \n" +
        "1 ; @J; @ICV; @AN>; ; aga olnud suur \n" +
        "1 ; @FCV; @SUBJ; @NN>; ; tohtinud tööinimene oma \n" +
        "1 ; @FMV; @AN>; @AN>; ; oli noor lahke \n" +
        "1 ; @J; @ADVL; @OBJ @SUBJ; ; kui pannud hobused \n" +
        "1 ; @OBJ; @ADVL @<NN; @J; ; riideid rohule ega \n" +
        "1 ; @ADVL; @AN>; @<NN; ; hommikul olnud Essen \n" +
        "1 ; @AN>; @ADVL @<NN @SUBJ; @<Q; ; olnud mitu nädalat \n" +
        "1 ; @PRD; @SUBJ; @FMV; ; kes mina olen \n" +
        "1 ; @ADVL; @FMV; @ADVL @IMV; ; kogu aja kiitnud \n" +
        "1 ; @<NN @ADVL; @OBJ; @ICV @FCV; ; seljast võtta olevat \n" +
        "1 ; @NN>; @SUBJ; @ADVL @IMV; ; Salla teener toonudki \n" +
        "1 ; @NN> @SUBJ; @NN> @OBJ; @SUBJ; ; Ernst von Bremen \n" +
        "1 ; @J; @ADVL; @ADVL @IMV; ; sest tingimuseks olnud \n" +
        "1 ; @SUBJ; @J; @SUBJ @<NN @OBJ; ; alus ja mehed \n" +
        "1 ; @OBJ; @ICV @FCV; @IMV; ; võtta olevat lasknud \n" +
        "1 ; @J; @FMV; @J; ; et tulge kui \n" +
        "1 ; @AN>; @OBJ; @ADVL @IMV; ; ristialuse ta teinud \n" +
        "1 ; @OBJ; @ADVL @IMV; @IMV; ; Miiling tahtnud lõhkuda \n" +
        "1 ; @OBJ; @ADVL; @FMV; ; öelnud selle kohta \n" +
        "1 ; @J; @SUBJ @OBJ; @J; ; et vaim ja \n" +
        "1 ; @<NN; @FMV; @NN>; ; Pago oli niisugune \n" +
        "1 ; @SUBJ @PRD; @NN> @<NN @ADVL; @SUBJ @<NN; ; Poesell nimega Dahvid \n" +
        "1 ; @OBJ @SUBJ; @AN>; @SUBJ; ; Tehtudki uus alus \n" +
        "1 ; @J; @NN> @SUBJ; @<NN; ; et Harpe ise \n" +
        "1 ; @NN>; @ADVL; @IMV; ; ühele vaesele kinkinud \n" +
        "1 ; @ICV @FCV; @ADVL; @SUBJ; ; olevat tal riided \n" +
        "1 ; @NN>; @OBJ; @<NN; ; Talitaja poega Abrami \n" +
        "1 ; @ADVL @NN> @OBJ; @NN> @<NN @ADVL; @SUBJ @OBJ; ; valla peremeestega arusaamatusi \n" +
        "1 ; @AN>; @NN> @ADVL; @AN>; ; musta mütsi punase \n" +
        "1 ; @ADVL @IMV; @SUBJ; @ADVL; ; mõistnud tema kolmeks \n" +
        "1 ; @AN>; @ADVL; @AN>; ; Teisel päeval tulnud \n" +
        "1 ; @NN>; @<NN @ADVL; @<INFN; ; härra pükstes olla \n" +
        "1 ; @ADVL @SUBJ @INFN>; @J; @OBJ; ; lasta ja põlvi \n" +
        "1 ; @ADVL @OBJ; @ADVL; @J; ; maamõõtja vihastanud ja \n" +
        "1 ; @NN> @ADVL; @SUBJ; @ADVL; ; Korra Harpe sõitnud \n" +
        "1 ; @AN>; @ADVL; @ICV @FCV; ; madalamad põllud olevat \n" +
        "1 ; @ADVL @<NN; @P>; @ADVL; ; sulle selle eest \n" +
        "1 ; @AN>; @NN>; @<NN @OBJ; ; sugenud Harpe naha \n" +
        "1 ; @J; @OBJ; @<NN @ADVL; ; aga Traksi mäest \n" +
        "1 ; @ADVL @IMV; @NN>; @OBJ @PRD; ; toonudki härra püksid \n" +
        "1 ; @ADVL; @FMV; @AN> @PRD; ; laanes on vanaaegsed \n" +
        "1 ; @NN>; @ADVL; @ADVL; ; Tema laeval teeninud \n" +
        "1 ; @SUBJ; @ADVL; @FMV; ; proua hulluks läks \n" +
        "1 ; @FMV; @OBJ @NN>; @P>; ; käib Piibe mõisa \n" +
        "1 ; @SUBJ @<NN; @ADVL; @NN> @ADVL; ; Essen olnud Riias \n" +
        "1 ; @NN> @ADVL; @NN> @<NN @ADVL @SUBJ; @ADVL @OBJ; ; proua Salla mõisa \n" +
        "1 ; @SUBJ; @FCV; @NN>; ; Stakelberg oli ühele \n" +
        "1 ; @J; @PRD; @FMV; ; et valusam oleks \n" +
        "1 ; @<NN @SUBJ; @ICV @FCV; @PRD; ; puusärk olevat tühi \n" +
        "1 ; @AN>; @ADVL @<NN @PRD @OBJ @SUBJ; @ADVL @IMV; ; väike poiss olnud \n" +
        "1 ; @OBJ; @ADVL @<NN; @OBJ; ; küla meestele vilja \n" +
        "1 ; @AN>; @NN>; @OBJ @PRD; ; läinud neid keldreid \n" +
        "1 ; @P>; @ADVL; @<INFN; ; plaani järele ehitada \n" +
        "1 ; @AN>; @NN> @OBJ; @OBJ; ; andvat ühtehinge palke \n" +
        "1 ; @NN>; @OBJ @PRD; @ADVL; ; neid keldreid kaevama \n" +
        "1 ; @SUBJ; @J; @<NN @SUBJ; ; tüli ja pahandus \n" +
        "1 ; @OBJ @SUBJ; @J; @SUBJ; ; jalgu ja kiskund \n" +
        "1 ; @J; @NN> @ADVL; @OBJ @ADVL; ; Kui mõisast ehituspalke \n" +
        "1 ; @FMV; @NN>; @<NN @ADVL; ; tulgu Salla haagikohtusse \n" +
        "1 ; @FMV; @ADVL; @OBJ; ; päris kasvatanud neid \n" +
        "1 ; @AN>; @NN>; @NN>; ; olnud Avanduse mõisa \n" +
        "1 ; @AN>; @OBJ; @IMV; ; vana sant maetud \n" +
        "1 ; @AN>; @NN> @ADVL; @ADVL @<NN @OBJ; ; saatnud jutustaja kord \n" +
        "1 ; @ADVL; @FCV; @OBJ; ; tulles pidid kraavi \n" +
        "1 ; @ADVL; @FMV; @AN>; ; lilli oli terve \n" +
        "1 ; @OBJ; @AN>; @ADVL; ; kõik musta kaleviga \n" +
        "1 ; @ADVL @<NN; @<Q; @SUBJ; ; 15 hoopi vitsu \n" +
        "1 ; @OBJ; @ADVL; @ADVL; ; moonamees tulnud poest \n" +
        "1 ; @FMV; @SUBJ; @PRD; ; oli Määri härra \n" +
        "1 ; @ADVL; @AN>; @PRD; ; olnud kitsi inimene \n" +
        "1 ; @FMV; @OBJ; @ADVL; ; Mängis end paljaks \n" +
        "1 ; @NN> @ADVL; @ADVL @<NN @OBJ; @ADVL @<NN; ; jutustaja kord lapsena \n" +
        "1 ; @NN> @SUBJ @PRD; @NN> @<NN @SUBJ; @<NN @ADVL; ; kõik mis tal \n" +
        "1 ; @OBJ @NN>; @P>; @<KN @ADVL; ; Piibe mõisa alla \n" +
        "1 ; @NN>; @ADVL; @FCV; ; Simuna kirik oli \n" +
        "1 ; @OBJ; @J; @OBJ; ; söögi ja palga \n" +
        "1 ; @OBJ; @AN>; @NN> @ADVL; ; Ema saatnud jutustaja \n" +
        "1 ; @NN>; @NN>; @SUBJ @OBJ; ; Salla Harpe hobuseid \n" +
        "1 ; @<Q; @P>; @ADVL @<KN; ; hullu maa pealt \n" +
        "1 ; @AN>; @OBJ @PRD; @ADVL @IMV; ; pärast tagasitulekut olnud \n" +
        "1 ; @ADVL @IMV; @J; @FMV; ; kaevanud ja kohus \n" +
        "1 ; @ADVL; @SUBJ; @PRD; ; kutsariks keegi Valdmanni-nimeline \n" +
        "1 ; @NN> @SUBJ; @OBJ; @ADVL; ; mis kodu kästud \n" +
        "1 ; @FMV; @SUBJ; @<Q; ; on 9-10 kuli \n" +
        "1 ; @ICV @FCV; @PRD; @IMV; ; olevat tühi olnud \n" +
        "1 ; @NEG; @FCV; @SUBJ; ; ei tohtinud tööinimene \n" +
        "1 ; @AN>; @NN>; @AN>; ; Vana Pagu olnud \n" +
        "1 ; @AN>; @PRD; @J; ; noor mees ja \n" +
        "1 ; @NN>; @NN>; @NN>; ; tema venna Konstantini \n" +
        "1 ; @NN>; @SUBJ; @<Q; ; oma sada hoopi \n" +
        "1 ; @FCV; @AN>; @PRD; ; oli hea mees \n" +
        "1 ; @SUBJ @PRD; @J; @SUBJ @PRD; ; silk ja hapupiim \n" +
        "1 ; @PRD @ADVL; @OBJ; @ADVL; ; kord piipu suitsetades \n" +
        "1 ; @NN> @SUBJ; @P>; @<KN @ADVL; ; mõis Henningi käes \n" +
        "1 ; @FMV; @NN>; @NN>; ; tuli tema venna \n" +
        "1 ; @NN> @OBJ; @AN>; @SUBJ; ; ta näinud teda \n" +
        "1 ; @FMV; @NN>; @PRD; ; on sinu liha \n" +
        "1 ; @NN> @SUBJ; @<NN; @FMV; ; Harpe ise seisab \n" +
        "1 ; @OBJ @SUBJ; @ADVL; @ADVL @ICV; ; teda vaimuks peetud \n" +
        "1 ; @P>; @J; @P>; ; Kissa ja Rohu \n" +
        "1 ; @ADVL; @OBJ; @OBJ; ; kombel inimesi peksta \n" +
        "1 ; @SUBJ; @ADVL @<NN; @P>; ; proua sulle selle \n" +
        "1 ; @ADVL; @ADVL; @FMV; ; järele vundamendi valmis \n" +
        "1 ; @J; @FMV; @P>; ; ja annavad nahatäie \n" +
        "1 ; @<Q; @ADVL; @ADVL; ; kuldrubla pannud sellele \n" +
        "1 ; @OBJ; @AN>; @NN>; ; härrat elanud Piibe \n" +
        "1 ; @ADVL @<NN; @ADVL; @FMV; ; lapsena mõisa mune \n" +
        "1 ; @AN>; @ADVL @<NN; @SUBJ; ; ajanud surnuaial moonameest \n" +
        "1 ; @FMV; @ADVL; @OBJ @SUBJ; ; on meil midagi \n" +
        "1 ; @SUBJ @PRD; @J; @AN>; ; poiss ja andnud \n" +
        "1 ; @AN>; @NN> @ADVL; @NN> @OBJ; ; tulisest suust suitsu \n" +
        "1 ; @J; @SUBJ; @<NN @OBJ; ; et meie mõlemad \n" +
        "1 ; @SUBJ; @ICV @FCV; @OBJ; ; vaimud olevat teise \n" +
        "1 ; @J; @NN> @SUBJ; @NN> @ADVL; ; et Huen korra \n" +
        "1 ; @FMV; @AN>; @OBJ; ; kulutab pealmisi pükse \n" +
        "1 ; @SUBJ; @<Q; @PRD; ; sada hoopi kindel \n" +
        "1 ; @NN>; @<NN; @FMV; ; Käru Pago oli \n" +
        "1 ; @FMV; @SUBJ; @ADVL @OBJ; ; Kaotas Avanduse E. \n" +
        "1 ; @NN>; @SUBJ; @ICV @FCV; ; Padu Kooli-Juhan olevat \n" +
        "1 ; @FMV; @NN> @ADVL; @OBJ; ; saab mõisast söögi \n" +
        "1 ; @ADVL @IMV; @OBJ; @J; ; näinud seda ja \n" +
        "1 ; @FCV; @NN>; @P>; ; oli tema matuse \n" +
        "1 ; @SUBJ; @OBJ; @<Q; ; teda kaks korda \n" +
        "1 ; @AN>; @NN> @<NN; @SUBJ @<NN; ; vana parun Huen \n" +
        "1 ; @NN> @OBJ; @<NN @ADVL; @ADVL @IMV; ; mõisa hoovil kärkinud \n" +
        "1 ; @J; @NN> @ADVL; @NN> @ADVL; ; Kui Tammiku proua \n" +
        "1 ; @ADVL; @<Q; @AN>; ; 10 aastat elanud \n" +
        "1 ; @SUBJ @OBJ; @ADVL; @OBJ @ADVL; ; Mõis hakanud päevi \n" +
        "1 ; @ADVL @<NN; @ADVL; @AN>; ; kõrtsis olnud suur \n" +
        "1 ; @SUBJ; @<NN @OBJ; @FCV; ; meie mõlemad võime \n" +
        "1 ; @FMV; @J; @OBJ; ; õhku ja veerenud \n" +
        "1 ; @J; @OBJ; @NEG; ; ja mind ei \n" +
        "1 ; @FMV; @NN>; @OBJ; ; kaotas oma varanduse \n" +
        "1 ; @OBJ @SUBJ; @<NN @ADVL; @<KN @ADVL; ; kumbki teisele poole \n" +
        "1 ; @NN>; @NN>; @<NN; ; Avanduse mõisa ülemvalitseja \n" +
        "1 ; @NN> @PRD @SUBJ; @J; @ICV; ; See aga olnud \n" +
        "1 ; @J; @OBJ @SUBJ; @AN>; ; aga venelased sugenud \n" +
        "1 ; @NN> @OBJ; @SUBJ; @FMV; ; von Bremen mõistis \n" +
        "1 ; @J; @NN> @ADVL @OBJ; @ADVL; ; ja vanaproua öelnud \n" +
        "1 ; @AN>; @SUBJ; @NN> @ADVL @OBJ; ; Vana Landrat v \n" +
        "1 ; @J; @FMV; @ADVL @IMV; ; ja kohus mõistnud \n" +
        "1 ; @OBJ; @ADVL @PRD; @P>; ; seda väikest muna \n" +
        "1 ; @NN>; @AN>; @NN> @OBJ; ; Tema andvat ühtehinge \n" +
        "1 ; @ADVL; @SUBJ; @ADVL @IMV; ; ennem ta surnud \n" +
        "1 ; @SUBJ; @OBJ; @J; ; käed risti ja \n" +
        "1 ; @FCV; @OBJ; @<Q; ; on kaks hullu \n" +
        "1 ; @FCV; @SUBJ; @IMV; ; pole hobused tahtnud \n" +
        "1 ; @J; @ADVL @IMV; @FMV; ; ja lasknud vundamendi \n" +
        "1 ; @ADVL; @FCV; @IMV; ; põllulegi pole läinud \n" +
        "1 ; @OBJ @SUBJ; @AN>; @P>; ; Kalavenelased olnud tee \n" +
        "1 ; @<NN @ADVL; @NEG; @FMV; ; mäest ei saa \n" +
        "1 ; @J; @AN>; @ADVL @<NN; ; ja andnud keisrile \n" +
        "1 ; @NN> @SUBJ; @AN>; @NN> @<NN @ADVL; ; Dahvid tõmmanud taskust \n" +
        "1 ; @ADVL @<NN @OBJ; @ADVL @<NN; @ADVL; ; kord lapsena mõisa \n" +
        "1 ; @ADVL @IMV; @FCV; @J; ; jultunud olid ja \n" +
        "1 ; @NN> @<NN @SUBJ; @<NN @ADVL; @FMV; ; mis tal oli \n" +
        "1 ; @NN>; @AN>; @SUBJ; ; Proua väike kasutütar \n" +
        "1 ; @<Q; @AN>; @AN>; ; aastat elanud väikeses \n" +
        "1 ; @ADVL; @FMV; @PRD; ; vastu oli hea \n" +
        "1 ; @NN>; @<NN @ADVL; @FCV; ; mõisa keldrites on \n" +
        "1 ; @ADVL @IMV; @NN> @ADVL; @OBJ; ; hoidnud kätega kõhtu \n" +
        "1 ; @PRD; @J; @PRD; ; liha ja veri \n" +
        "1 ; @ADVL; @SUBJ @OBJ; @J; ; kutsunud insenere ja \n" +
        "1 ; @FCV; @SUBJ; @ADVL @<NN; ; pidid inimesed kraavi \n" +
        "1 ; @IMV; @J; @ADVL @IMV; ; naerma ja pööranud \n" +
        "1 ; @AN>; @NN> @SUBJ; @NN>; ; vana Vamps seda \n" +
        "1 ; @ADVL @<NN; @NN> @OBJ; @<NN @ADVL; ; omal juukseid peast \n" +
        "1 ; @NN>; @SUBJ @ADVL; @ADVL; ; Rahkla Miiling surnud \n" +
        "1 ; @OBJ; @<NN @ADVL; @NEG; ; Traksi mäest ei \n" +
        "1 ; @J; @AN>; @OBJ @PRD; ; aga pärast tagasitulekut \n" +
        "1 ; @FMV; @NN> @ADVL; @ADVL; ; oli Riias kuberneriks \n" +
        "1 ; @NN> @SUBJ; @<NN; @ADVL; ; Harpe ise tulnud \n" +
        "1 ; @AN>; @NN>; @OBJ @SUBJ; ; Tahtnud Seli küla \n" +
        "1 ; @NN>; @J; @NN> @ADVL @OBJ; ; koolimaja ja talukoha \n" +
        "1 ; @NN> @SUBJ; @AN>; @AN>; ; Baer olnud hea \n" +
        "1 ; @SUBJ; @ADVL @OBJ; @NN> @<NN @OBJ @ADVL; ; Avanduse E. v \n" +
        "1 ; @OBJ @SUBJ; @AN>; @ADVL @<NN @SUBJ; ; Moonamees olnud mitu \n" +
        "1 ; @P>; @ADVL; @PRD; ; rahva vastu sõbralikud \n" +
        "1 ; @OBJ @PRD; @ADVL @IMV; @NN>; ; tagasitulekut olnud teine \n" +
        "1 ; @ADVL @AN>; @P>; @<KN @ADVL; ; läinud kuberneri juurde \n" +
        "1 ; @<NN; @FMV; @ADVL; ; ise seisab uksel \n" +
        "1 ; @AN>; @ADVL; @OBJ @SUBJ; ; kinkinud koolile koha \n" +
        "1 ; @NN> @OBJ; @ADVL @<NN; @IMV; ; Nõmmküla nõmmele viia \n" +
        "1 ; @SUBJ; @ADVL; @NN> @OBJ; ; Härra kaevanud Tedrekulli \n" +
        "1 ; @OBJ; @IMV; @NN> @ADVL; ; sant maetud Riias \n" +
        "1 ; @NN> @<NN @ADVL; @SUBJ @<NN; @ADVL; ; nimega Dahvid tulnud \n" +
        "1 ; @FMV; @NN>; @NN> @ADVL; ; kasvab Salla mõisas \n" +
        "1 ; @FCV; @ICV; @NN> @SUBJ @OBJ; ; pole saanud mütsi \n" +
        "1 ; @ADVL @OBJ; @IMV; @J; ; mõisa tuua ja \n" +
        "1 ; @SUBJ; @ICV @FCV; @P>; ; Kooli-Juhan olevat teise \n" +
        "1 ; @AN>; @NN> @<NN @ADVL; @NN>; ; tõmmanud taskust oma \n" +
        "1 ; @AN>; @SUBJ; @FCV; ; Vana Zoege oli \n" +
        "1 ; @NN> @SUBJ @OBJ; @AN>; @<NN @SUBJ; ; mis aus inimene \n" +
        "1 ; @SUBJ; @AN>; @ADVL; ; Aleksander II olnud \n" +
        "1 ; @J; @ADVL @SUBJ; @<NN @ADVL; ; kui see rahaga \n" +
        "1 ; @NN> @<NN @ADVL; @NN>; @NN>; ; taskust oma revolvri \n" +
        "1 ; @AN>; @AN>; @NN> @SUBJ; ; va vana Vamps \n" +
        "1 ; @FMV; @NN>; @P>; ; oli talude müümise \n" +
        "1 ; @AN>; @J; @AN>; ; Teisel ja kolmandal \n" +
        "1 ; @SUBJ; @ICV @FCV; @IMV; ; härra olevat öelnud \n" +
        "1 ; @FCV; @ADVL; @SUBJ; ; pole suurt midagi \n" +
        "1 ; @<KN @ADVL; @J; @ADVL @IMV; ; poole ja kukkunud \n" +
        "1 ; @ADVL @<NN; @AN>; @P>; ; toas suure tooli \n" +
        "1 ; @ADVL @<NN; @J; @NN> @ADVL @OBJ; ; kõrval ja vanaproua \n" +
        "1 ; @ADVL; @IMV; @NN>; ; vaesele kinkinud maja \n" +
        "1 ; @PRD; @FMV; @NN> @SUBJ; ; Ennem oli mõis \n" +
        "1 ; @SUBJ; @ADVL @<NN; @IMV; ; inimesed kraavi minema \n" +
        "1 ; @ADVL; @J; @NN> @ADVL; ; paljaks kuni ihupesuni \n" +
        "1 ; @ADVL; @ADVL; @NEG; ; Palavaga töötades ei \n" +
        "1 ; @J; @SUBJ @<NN @OBJ; @AN>; ; ja mehed kaevanud \n" +
        "1 ; @FCV; @ADVL @IMV; @ICV; ; oleks viia saadud \n" +
        "1 ; @NN>; @PRD; @J; ; sinu liha ja \n" +
        "1 ; @ADVL; @OBJ @SUBJ; @<AN; ; meil midagi toredat \n" +
        "1 ; @NN> @PRD; @NN>; @NN>; ; Mis see sinu \n" +
        "1 ; @J; @J; @ADVL; ; aga sest asjast \n" +
        "1 ; @NN> @OBJ @SUBJ @ADVL; @AN>; @OBJ; ; mida vana Pagu \n" +
        "1 ; @SUBJ; @ADVL; @<Q; ; tema kolmeks aastaks \n" +
        "1 ; @J; @SUBJ @ADVL; @NN>; ; Kui inimene tema \n" +
        "1 ; @SUBJ @PRD; @ADVL; @J; ; Piim olnud aga \n" +
        "1 ; @J; @FMV; @OBJ; ; et tõmbavad võõra \n" +
        "1 ; @OBJ @SUBJ; @<AN; @<INFN; ; midagi toredat süüa \n" +
        "1 ; @PRD; @FMV; @SUBJ; ; Manteufel oli Määri \n" +
        "1 ; @SUBJ @OBJ; @ADVL; @OBJ @SUBJ; ; Teenrid jäänud mõlemad \n" +
        "1 ; @NN>; @AN>; @NN>; ; Pagu olnud oma \n" +
        "1 ; @AN>; @SUBJ; @OBJ; ; näinud teda kaks \n" +
        "1 ; @NN>; @NN> @SUBJ; @AN>; ; Rahkla Miiling olnud \n" +
        "1 ; @ICV @FCV; @ADVL; @<Q; ; olevat kolm ööd \n" +
        "1 ; @P>; @ADVL @<KN; @IMV; ; maa pealt kadunud \n" +
        "1 ; @ADVL @<NN; @<Q; @SUBJ @OBJ; ; 15 hoopi vitsu \n" +
        "1 ; @FMV; @ADVL; @<NN; ; sai temalt kõike \n" +
        "1 ; @IMV; @NN>; @SUBJ @OBJ; ; õiendanud kõik asjad \n" +
        "1 ; @IMV; @J; @ADVL; ; ehitud ja lilli \n" +
        "1 ; @NN> @OBJ; @<NN; @ADVL; ; Bremen ise söönud \n" +
        "1 ; @ADVL; @FCV; @NN>; ; kirik oli tema \n" +
        "1 ; @ADVL; @ADVL; @AN>; ; hoolimata hakanud vana \n" +
        "1 ; @AN>; @OBJ @ADVL; @IMV; ; puhta seemne osta \n" +
        "1 ; @ADVL; @FCV; @ADVL; ; asjast pole suurt \n" +
        "1 ; @NN>; @ADVL; @AN>; ; sel ajal näidanud \n" +
        "1 ; @SUBJ; @FMV; @OBJ @NN>; ; küla käib Piibe \n" +
        "1 ; @NN> @ADVL; @NN> @OBJ; @<NN @ADVL; ; korra mõisa hoovil \n" +
        "1 ; @NN> @ADVL; @AN>; @NN> @<NN @ADVL; ; mütsi punase äärega \n" +
        "1 ; @ADVL; @OBJ; @IMV; ; Suure-Tammikule koolimaja ehitada \n" +
        "1 ; @AN>; @AN>; @SUBJ @PRD; ; suur tugev mees \n" +
        "1 ; @ADVL; @ADVL @NN> @OBJ; @NN> @<NN @ADVL; ; tal valla peremeestega \n" +
        "1 ; @AN>; @ADVL; @IMV; ; musta kaleviga ehitud \n" +
        "1 ; @FCV; @NN>; @ADVL; ; oli ühele vaesele \n" +
        "1 ; @ADVL; @SUBJ @ADVL @PRD; @<Q; ; tal 9-10 meistrit \n" +
        "1 ; @OBJ; @<Q; @P>; ; kaks hullu maa \n" +
        "1 ; @NN> @PRD; @NN>; @<NN @PRD; ; krahv Lütke omandus \n" +
        "1 ; @NN> @OBJ; @AN>; @OBJ; ; missuguse ristialuse ta \n" +
        "1 ; @OBJ; @NN>; @<NN @ADVL; ; Pagu meeste seljast \n" +
        "1 ; @J; @AN>; @NN> @ADVL; ; kui evangeelse luteriusu \n" +
        "1 ; @ADVL @OBJ; @P>; @ADVL; ; miski asja pärast \n" +
        "1 ; @NN>; @NN> @OBJ; @<NN @ADVL; ; selle hapupiima Bremenile \n" +
        "1 ; @SUBJ; @IMV; @OBJ; ; hobused tahtnud teda \n" +
        "1 ; @NN> @SUBJ; @NN>; @OBJ; ; Vamps seda lugu \n" +
        "1 ; @SUBJ; @ADVL @IMV; @OBJ; ; see poonud ennast \n" +
        "1 ; @AN>; @NN>; @SUBJ @PRD; ; vana Avanduse krahv \n" +
        "1 ; @FCV; @NN> @OBJ; @ADVL; ; võime tema pükstesse \n" +
        "1 ; @ADVL @IMV; @OBJ; @IMV; ; hakanud Issameiet paluma \n" +
        "1 ; @NN>; @ADVL @<NN; @J; ; pingi pihku ja \n" +
        "1 ; @SUBJ; @AN>; @OBJ @ADVL; ; Moonamees vaadanud korra \n" +
        "1 ; @ADVL; @NN> @ADVL; @ADVL; ; olnud Riias kuberneriks \n" +
        "1 ; @ADVL; @NN> @ADVL; @SUBJ; ; olnud jutustajaga sugulane \n" +
        "1 ; @ADVL @IMV; @NN>; @NN>; ; käinud Salla Harpe \n" +
        "1 ; @AN>; @OBJ @NN>; @NN> @<NN @ADVL; ; Omaaegses Simuna kõrtsis \n" +
        "1 ; @NN>; @ADVL; @NEG; ; soldati sauna ei \n" +
        "1 ; @OBJ; @ADVL; @J; ; end paljaks kuni \n" +
        "1 ; @OBJ @SUBJ; @ADVL @OBJ; @IMV; ; mehed mõisa tuua \n" +
        "1 ; @J; @ADVL; @IMV; ; ega puuoksa panna \n" +
        "1 ; @SUBJ @OBJ; @ADVL; @ADVL; ; Aleksander saanud sellest \n" +
        "1 ; @J; @FCV; @IMV; ; et on surnud \n" +
        "1 ; @SUBJ; @ADVL; @PRD; ; Söök olnud vilets \n" +
        "1 ; @<Q; @J; @FMV; ; karjumist ja jäi \n" +
        "1 ; @ADVL @IMV; @ADVL; @AN>; ; andnud temale suure \n" +
        "1 ; @FMV; @ADVL @IMV; @SUBJ; ; kohus mõistnud tema \n" +
        "1 ; @SUBJ; @AN>; @SUBJ; ; Tõusnud suur tüli \n" +
        "1 ; @ADVL; @J; @SUBJ; ; kõrval ja lugenud \n" +
        "1 ; @AN>; @AN>; @PRD; ; noor lahke härra \n" +
        "1 ; @ADVL; @NN>; @PRD; ; ajal Tammiku peremees \n" +
        "1 ; @SUBJ; @<NN @ADVL; @FMV; ; Maamõõtja kaubas oli \n" +
        "1 ; @J; @ADVL @IMV; @IMV; ; ja jäänudki uskuma \n" +
        "1 ; @ICV @FCV; @P>; @ADVL; ; olevat teise juures \n" +
        "1 ; @SUBJ @<NN @OBJ; @AN>; @OBJ; ; mehed kaevanud haua \n" +
        "1 ; @FCV; @PRD; @IMV; ; oli haagreht olnud \n" +
        "1 ; @IMV; @NN> @ADVL; @P>; ; maetud Riias tema \n" +
        "1 ; @ADVL @IMV; @AN>; @SUBJ; ; öelnud vana Normann \n" +
        "1 ; @ADVL; @FMV; @ADVL @SUBJ @OBJ; ; Ikka laskis mitu \n" +
        "1 ; @<NN @OBJ; @FCV; @NN> @OBJ; ; mõlemad võime tema \n" +
        "1 ; @J; @NN>; @AN>; ; kui see väike \n" +
        "1 ; @ADVL @IMV; @AN>; @ADVL; ; öelnud teisel korral \n" +
        "1 ; @ADVL @OBJ @SUBJ; @<Q; @ADVL; ; 6000 kuldrubla pannud \n" +
        "1 ; @NN>; @SUBJ; @PRD; ; teine niisugene pikk \n" +
        "1 ; @NN> @ADVL; @OBJ @ADVL; @FMV; ; mõisast ehituspalke mindi \n" +
        "1 ; @ICV; @NN> @SUBJ @OBJ; @<NN @ADVL; ; saanud mütsi peast \n" +
        "1 ; @SUBJ; @OBJ; @FMV; ; ta viinavabrikut ehitas \n" +
        "1 ; @ADVL @SUBJ @OBJ; @<Q; @OBJ; ; mitu korda käia \n" +
        "1 ; @AN>; @<NN @ADVL; @ADVL; ; läinud härrale kaebama \n" +
        "1 ; @J; @OBJ; @ADVL @IMV @SUBJ @<INFN; ; ja põlvi silitada \n" +
        "1 ; @FMV; @SUBJ; @J; ; Müüs Salla ja \n" +
        "1 ; @AN>; @ADVL; @ADVL; ; soolase veega vitse \n" +
        "1 ; @J; @SUBJ; @ADVL; ; kui proua hulluks \n" +
        "1 ; @ADVL @SUBJ; @OBJ; @ADVL; ; Üks moonamees tulnud \n" +
        "1 ; @NN>; @SUBJ @OBJ; @IMV; ; kapi uksed käinud \n" +
        "1 ; @ICV; @AN>; @AN>; ; olnud suur tugev \n" +
        "1 ; @FMV; @NN> @ADVL; @PRD; ; oli Riias viitsekuberner \n" +
        "1 ; @J; @NN> @ADVL; @J; ; kuni ihupesuni ja \n" +
        "1 ; @NN>; @SUBJ @<NN; @ADVL; ; Tammiku Essen olnud \n" +
        "1 ; @SUBJ; @AN>; @AN>; ; kasutütar seisnud seal \n" +
        "1 ; @J; @FMV; @NN> @ADVL; ; et saab mõisast \n" +
        "1 ; @SUBJ @ADVL; @NN>; @<NN @ADVL; ; inimene tema jutule \n" +
        "1 ; @P>; @ADVL; @NEG; ; selle eest ei \n" +
        "1 ; @NN>; @OBJ; @ADVL @<NN; ; oma riideid rohule \n" +
        "1 ; @NN>; @OBJ; @NEG; ; tema aru ei \n" +
        "1 ; @ADVL; @J; @FMV; ; mõttes ja hulkus \n" +
        "1 ; @J; @NN> @ADVL @OBJ; @ADVL @<NN; ; ja talukoha koolile \n" +
        "1 ; @PRD @SUBJ; @NN>; @OBJ; ; teine teise sääre \n" +
        "1 ; @OBJ; @SUBJ; @FMV; ; mis peigmees annab \n" +
        "1 ; @ADVL; @IMV; @J; ; kaleviga ehitud ja \n" +
        "1 ; @SUBJ @OBJ; @ADVL @IMV; @ADVL; ; Teenrid tahtnud jooksma \n" +
        "1 ; @ADVL; @OBJ @SUBJ; @P>; ; lasknud teda enda \n" +
        "1 ; @NN>; @ADVL @<NN; @<Q; ; oma 15 hoopi \n" +
        "1 ; @FMV; @NN> @SUBJ; @P>; ; oli mõis Henningi \n" +
        "1 ; @AN>; @<NN; @ADVL; ; olnud Essen surnud \n" +
        "1 ; @ADVL @IMV; @OBJ @SUBJ; @<NN @ADVL; ; jooksnud kumbki teisele \n" +
        "1 ; @AN>; @AN>; @ADVL @<NN; ; seisnud seal kõrval \n" +
        "1 ; @NN> @SUBJ; @NN> @ADVL; @NN> @OBJ; ; Huen korra mõisa \n" +
        "1 ; @NN> @SUBJ; @AN>; @NN>; ; Miiling olnud Avanduse \n" +
        "1 ; @<NN; @ADVL; @J; ; ise söönud ja \n" +
        "1 ; @ADVL; @<Q; @<NN @ADVL; ; kolmeks aastaks sunnitööle \n" +
        "1 ; @ADVL; @FCV; @ADVL @IMV; ; millega oleks viia \n" +
        "1 ; @SUBJ; @AN>; @<NN @ADVL; ; Kutsar läinud härrale \n" +
        "1 ; @FMV; @J; @AN>; ; jookseb nagu must \n" +
        "1 ; @OBJ @ADVL; @ADVL; @OBJ; ; härra saanud aru \n" +
        "1 ; @FMV; @ADVL; @SUBJ; ; on laual kartul \n" +
        "1 ; @ADVL; @SUBJ; @ADVL @<NN; ; tal riided seljast \n" +
        "1 ; @J; @ADVL; @FCV; ; sest asjast pole \n" +
        "1 ; @J; @SUBJ; @OBJ; ; Kui ta viinavabrikut \n" +
        "1 ; @<NN @ADVL; @ADVL @IMV; @J; ; hoovil kärkinud ja \n" +
        "1 ; @NN> @OBJ; @ADVL; @IMV; ; tema pükstesse minna \n" +
        "1 ; @ADVL; @<NN; @J; ; temalt kõike ja \n" +
        "1 ; @ADVL @IMV; @NN>; @P>; ; tekkinudki otsetee Kissa \n" +
        "1 ; @NN> @ADVL; @AN>; @OBJ; ; maamõõtjaga uue lepingu \n" +
        "1 ; @J; @ADVL; @SUBJ; ; aga ennem ta ";
    }

    if ( searchForm.isMorfoAnalysis() && !searchForm.isSyntacticAnalysis() )
    {
      return "6 ; Lnud V main partic past ps; L0 A pos sg nom; L0 S com sg nom; ; olnud kole inimene ; olnud suur haagrehtikohus ; hakanud vana Pagu ; öelnud vana Normann ; olnud kitsi inimene ; olnud tige mees \n" +
        "5 ; L0 S com sg nom; L0 J crd; L0 S com sg nom; ; silk ja hapupiim ; kaelavahe ja nägu ; nägu ja rinnaesine ; liha ja veri ; tüli ja pahandus \n" +
        "3 ; Lnud V main partic past ps; L0 S com sg gen; L0 S com sg gen; ; saatnud jutustaja venna ; kinkinud maja aluse ; saanud härra õiguse \n" +
        "3 ; L0 A pos sg gen; L0 S com sg gen; L0 K post; ; praeguse meierei asemel ; suure tooli peal ; uue maja peale \n" +
        "3 ; L0 S com sg gen; L0 J crd; L0 S com sg gen; ; koolimaja ja talukoha ; söögi ja palga ; Mõisamaa ja Tammiku \n" +
        "3 ; Li V main indic impf ps3 sg ps af; L0 A pos sg nom; L0 S com sg nom; ; oli aus mees ; oli terve mägi ; oli hirmus mees \n" +
        "3 ; L0 A pos sg nom; L0 A pos sg nom; L0 S com sg nom; ; suur tugev mees ; noor lahke härra ; Vana uhke tamm \n" +
        "3 ; Ls V main indic impf ps3 sg ps af; L0 A pos sg nom; L0 S com sg nom; ; Hirmus kuri mees ; hirmus tige mees ; hirmus must inimene \n" +
        "3 ; L0 A pos sg nom; L0 S com sg nom; L0 J crd; ; uus alus ja ; noor mees ja ; suur tüli ja \n" +
        "3 ; L0 S com sg gen; L0 S com sg nom; Lnud V main partic past ps; ; Jutustaja lell läinud ; Tammiku vanaproua olnud ; Tammiku proua olnud \n" +
        "3 ; Lde S com pl gen; L0 S com sg gen; L0 K post; ; Pagude kabeli juures ; Pagude kabeli juurest ; talude müümise ajal \n" +
        "2 ; L0 S com sg nom; Lnud V main partic past ps; L0 A pos sg nom; ; Söök olnud vilets ; vanaproua olnud kitsi \n" +
        "2 ; Ll P dem sg ad; Ll S com sg ad; L0 A pos partic; ; sel ajal ehitanud ; sel ajal näidanud \n" +
        "2 ; L0 S prop sg nom; L0 S prop sg nom; Lnud V main partic past ps; ; Rahkla Miiling tahtnud ; Rahkla Miiling surnud \n" +
        "2 ; L0 S prop sg nom; L0 P pos det refl sg nom; Lnud V main partic past ps; ; Harpe ise tulnud ; Bremen ise söönud \n" +
        "2 ; Ld S com pl nom; L0 A pos partic; L0 S com sg gen; ; Kalavenelased olnud tee ; mehed kaevanud haua \n" +
        "2 ; L0 K post; L0 J crd; Lnud V main partic past ps; ; poole ja kukkunud ; käes ja küsinud \n" +
        "2 ; L0 S com sg gen; L0 K post; Lnud V main partic past ps; ; maa pealt kadunud ; rahva vastu olnud \n" +
        "2 ; L0 S com sg nom; Lnud V main partic past ps; Li S com pl part; ; Kuberner peksnud inimesi ; Mõis hakanud päevi \n" +
        "2 ; L0 P pers ps3 sg nom; L0 V aux indic pres ps neg; Lnud V main partic past ps; ; tema pole näinud ; tema pole teinud \n" +
        "2 ; L0 J crd; Ld S com pl nom; L0 A pos partic; ; aga venelased sugenud ; ja mehed kaevanud \n" +
        "2 ; L0 A pos sg nom; L0 S com sg nom; L0 A pos partic; ; Vana Pagu olnud ; väike kasutütar seisnud \n" +
        "2 ; L0 S com sg gen; L0 K post; Li V main indic impf ps3 sg ps af; ; Vallarahva vastu oli ; Viinaköögi kõrval oli \n" +
        "2 ; L0 A pos sg nom; L0 S com sg nom; Lnud V main partic past ps; ; hea mees olnud ; väike poiss olnud \n" +
        "2 ; L0 S prop sg gen; L0 S com sg gen; L0 K post; ; Avanduse vallamaja ees ; Piibe mõisa alla \n" +
        "2 ; L0 J crd; Ld S com pl nom; Lma V main sup ps ill; ; ja pistnud jooksma ; ja kukkunud paluma \n" +
        "2 ; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; Ls S prop sg in; ; Essen oli Riias ; Essen oli Riias \n" +
        "2 ; L0 S com sg gen; L0 K post; La V main inf; ; naha peale anda ; vahi alla võtta \n" +
        "2 ; L0 N card sg nom; L0 S com sg part; Lu S com pl part; ; 15 hoopi vitsu ; 15 hoopi vitsu \n" +
        "2 ; L0 S com sg gen; L0 K post; L0 S com sg gen; ; müümise ajal Tammiku ; plaani järele vundamendi \n" +
        "2 ; L0 A pos; L0 S com sg gen; L0 K post; ; läinud kuberneri juurde ; läinud abiellumise teel \n" +
        "2 ; L0 A pos partic; L0 S prop sg gen; L0 S com sg gen; ; sugenud Harpe naha ; olnud Avanduse mõisa \n" +
        "2 ; Lnud V main partic past ps; Lma V main sup ps ill; L0 J crd; ; hakanud kõnelema ja ; hakanud naerma ja \n" +
        "2 ; Lnud V main partic past ps; L0 J crd; L0 A pos; ; söönud ja kogu ; vihastanud ja läinud \n" +
        "2 ; L0 S com sg gen; L0 S prop sg nom; Lnud V main partic past ps; ; Korra Harpe sõitnud ; Tammiku Essen olnud \n" +
        "2 ; L0 S prop sg nom; L0 S prop sg nom; L0 A pos partic; ; Rahkla Miiling olnud ; Joala Joosep toonud \n" +
        "2 ; L0 P pos det refl sg gen; L0 S com sg gen; L0 K post; ; oma plaani järele ; oma plaani järele \n" +
        "2 ; L0 S com sg gen; L0 K post; L0 J crd; ; kabeli juures ja ; muna käes ja \n" +
        "2 ; L0 S com sg part; L0 J crd; Lnud V main partic past ps; ; kõhtu ja öelnud ; risti ja hakanud \n" +
        "2 ; L0 A pos sg nom; L0 S com sg nom; L0 S prop sg nom; ; vana õpetaja Pauker ; vana parun Huen \n" +
        "2 ; L0 S com sg gen; L0 S com sg nom; Li V aux indic impf ps3 sg ps af; ; Maamõõtja nimi oli ; Võivere Pagu oli \n" +
        "2 ; L0 S com sg gen; L0 K post; Lda V main inf; ; vallamaja ees suitsetada ; plaani järele ehitada \n" +
        "2 ; L0 S com sg nom; Lb V main indic pres ps3 sg ps af; L0 S prop sg gen; ; tamm kasvab Salla ; küla käib Piibe \n" +
        "2 ; L0 S com sg gen; L0 S com sg nom; L0 S prop sg nom; ; Tammiku proua Salla ; Lasinurme härra Stakelberg \n" +
        "2 ; L0 J sub; L0 S prop sg nom; L0 S prop sg nom; ; Kui Rahkla Miiling ; Kui Rahkla Miiling \n" +
        "2 ; Lnud V main partic past ps; L0 P dem sg nom; L0 S com sg nom; ; Olnud niisugune seadus ; Olnud teine niisugene \n" +
        "2 ; L0 S prop sg gen; L0 S com sg nom; Lnud V main partic past ps; ; Harpe teener öelnud ; Miilingu rist kukkunud \n" +
        "2 ; L0 S com sg nom; L0 J crd; Ld S com pl nom; ; vaim ja pistnud ; alus ja mehed \n" +
        "2 ; L0 J crd; L0 S com sg gen; Ld S com pl nom; ; ja kapi uksed ; ja Tammiku mõisad \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; L0 N ord sg ad; Ll S com sg ad; ; jagas 1885. aastal \n" +
        "1 ; L0 A pos; Ld P dem pl part; Lid S com pl part; ; läinud neid keldreid \n" +
        "1 ; Ll S com sg ad; Ls V main indic impf ps3 sg ps af; L0 A pos sg nom; ; eluajal hirmus tige \n" +
        "1 ; L0 A pos sg gen; L0 S com sg gen; La V main inf; ; puhta seemne osta \n" +
        "1 ; L0 S com sg adit; L0 V aux neg; L0 V mod indic pres ps neg; ; sauna ei tohi \n" +
        "1 ; L0 A pos; Ld P pers ps3 pl part; Lma V main sup ps ill; ; läinud neid peksma \n" +
        "1 ; Lle A pos sg all; Lnud V main partic past ps; L0 S com sg gen; ; vaesele kinkinud maja \n" +
        "1 ; L0 S prop sg nom; L0 A pos partic; L0 P pos det refl sg part; ; Stakelberg lasknud end \n" +
        "1 ; Ld S com pl nom; L0 A pos sg nom; L0 S com sg nom; ; Tõusnud suur tüli \n" +
        "1 ; Lda P pers ps3 sg part; L0 S com sg adit; Lda V main inf; ; teda kabeliaeda vedada \n" +
        "1 ; L0 K post; L0 J crd; Ld S com pl nom; ; kõrval ja lugenud \n" +
        "1 ; L0 P pers ps3 sg nom; Lt S com sg part; Ls V main indic impf ps3 sg ps af; ; ta viinavabrikut ehitas \n" +
        "1 ; L0 S prop sg gen; L0 S com sg gen; L0 S com sg nom; ; Avanduse mõisa ülemvalitseja \n" +
        "1 ; L0 A pos partic; Lst P pers ps1 sg el; L0 J crd; ; olnud must kui \n" +
        "1 ; L0 P dem indef sg nom; L0 S com sg nom; L0 A pos partic; ; Üks muna olnud \n" +
        "1 ; L0 P dem sg nom; L0 A pos; Ld P pers ps3 pl part; ; See läinud neid \n" +
        "1 ; La V main inf; Lvat V aux quot pres ps af; Lnud V main partic past ps; ; võtta olevat lasknud \n" +
        "1 ; L0 J sub; L0 A pos partic; Ld S com pl nom; ; et küpsetatud silgud \n" +
        "1 ; L0 J sub; Lvad V main indic pres ps3 pl ps af; L0 S com sg gen; ; et tõmbavad võõra \n" +
        "1 ; L0 V aux indic pres ps neg; Lnud V main partic past ps; Ld P dem pl part; ; pole teadnud neid \n" +
        "1 ; L0 J crd; Ld S com pl nom; L0 A pos sg gen; ; ja ehitanud uue \n" +
        "1 ; L0 A pos sg nom; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; ; Vana Essen oli \n" +
        "1 ; L0 P pers ps1 pl nom; Ld P det pl nom; Lme V mod indic pres ps1 pl ps af; ; meie mõlemad võime \n" +
        "1 ; L0 J crd; L0 A comp sg nom; L0 P pers ps3 sg nom; ; aga ennem ta \n" +
        "1 ; Ll P pos det refl sg ad; Lid S com pl part; Lst S com sg el; ; omal juukseid peast \n" +
        "1 ; L0 S com sg nom; L0 J crd; L0 A pos partic; ; poiss ja andnud \n" +
        "1 ; Lnud V main partic past ps; Li S com pl part; Ll A pos sg ad; ; peksnud inimesi koledal \n" +
        "1 ; Ld P pers ps1 sg part; L0 V aux neg; Lnud V main indic impf ps neg; ; mind ei teretanud \n" +
        "1 ; Lnud V main partic past ps; L0 P dem sg gen; L0 K post; ; olnud selle üle \n" +
        "1 ; Li S com pl part; Li V main indic impf ps3 sg ps af; L0 A pos sg nom; ; lilli oli terve \n" +
        "1 ; L0 J crd; L0 S com sg gen; L0 K post; ; ja Rohu vahel \n" +
        "1 ; Ltud V main partic past imps; L0 J crd; Li S com pl part; ; ehitud ja lilli \n" +
        "1 ; Ll P pers ps1 pl ad; Ldagi P indef sg part; Lt A pos sg part; ; meil midagi toredat \n" +
        "1 ; L0 P pos det refl sg gen; Ls S com sg in; L0 A pos sg gen; ; oma toas suure \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; Llt P dem sg abl; ; Tedrekull ostnud sellelt \n" +
        "1 ; L0 P inter rel sg nom; L0 P dem sg nom; Lb V mod indic pres ps3 sg ps af; ; mis see peab \n" +
        "1 ; L0 J crd; L0 S com sg nom; L0 V aux indic pres ps neg; ; aga sell pole \n" +
        "1 ; L0 J sub; L0 P dem sg nom; Lgu V main imper pres ps3 pl ps af; ; et see jäägu \n" +
        "1 ; L0 P pos det refl sg gen; L0 K post; Lda V main inf; ; enda juurde kutsuda \n" +
        "1 ; L0 S com sg gen; Ltes S com pl in; L0 V aux indic pres ps3 sg ps af; ; mõisa keldrites on \n" +
        "1 ; Lnud V main partic past ps; Lma V main sup ps ill; La V main inf; ; tahtnud jooksma panna \n" +
        "1 ; L0 A pos sg nom; L0 J crd; Lnudki V main partic past ps; ; haige ja jäänudki \n" +
        "1 ; Lnud V main partic past ps; Lda P dem sg part; Lt S com sg part; ; julgenud seda vastutust \n" +
        "1 ; L0 J crd; Ld S com pl nom; Ll P dem sg ad; ; ja mehed sel \n" +
        "1 ; L0 K post; L0 P pers ps3 sg gen; Lle S com sg all; ; pärast tema jutule \n" +
        "1 ; L0 S com sg nom; L0 V aux neg; L0 V main indic pres ps neg; ; Jutustaja ei tea \n" +
        "1 ; Lta V main inf; L0 J crd; Li S com pl part; ; lasta ja põlvi \n" +
        "1 ; L0 A pos partic; L0 P pos det refl sg gen; L0 S com sg gen; ; ehitanud oma plaani \n" +
        "1 ; L0 A pos partic; L0 S prop sg gen; L0 S com sg nom; ; tulnud Dahvidile kiri \n" +
        "1 ; L0 P pos det refl sg gen; Ll S com sg ad; Ls V main indic impf ps3 sg ps af; ; oma eluajal hirmus \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; Ll A pos sg ad; ; kasutütar seisnud seal \n" +
        "1 ; L0 A pos sg gen; Lga S com sg kom; Ltud V main partic past imps; ; musta kaleviga ehitud \n" +
        "1 ; L0 S com sg gen; L0 K post; L0 P det pl nom; ; matuse ajal kõik \n" +
        "1 ; L0 P pers ps3 sg gen; Lle S com sg all; Ldi V main indic impf imps af; ; tema jutule mindi \n" +
        "1 ; Lnud V main partic past ps; L0 J crd; L0 A pos partic; ; vihastanud ja visanud \n" +
        "1 ; L0 J sub; L0 P dem sg nom; L0 A pos sg nom; ; kui see väike \n" +
        "1 ; L0 P dem sg nom; Lnudki V main partic past ps; L0 P dem sg nom; ; see olnudki see \n" +
        "1 ; L0 A pos sg nom; L0 J crd; Lt P pos det refl sg part; ; pikk ja ennast \n" +
        "1 ; L0 J crd C; Lvad V main indic pres ps3 pl ps af; L0 S com sg gen; ; ja annavad nahatäie \n" +
        "1 ; L0 S prop sg nom; L0 A pos partic; Lst S com sg el; ; Dahvid tõmmanud taskust \n" +
        "1 ; L0 A pos partic; L0 P pos det refl sg part; Lle P dem sg all; ; näidanud end sellele \n" +
        "1 ; L0 J sub; L0 P dem sg nom; Lga S com sg kom; ; kui see rahaga \n" +
        "1 ; L0 S com sg nom; Lnudki V main partic past ps; Lst S com sg el; ; Mees jäänudki peksust \n" +
        "1 ; Lnud V main partic past ps; Lst P dem sg el; La V main inf; ; saanud sellest teada \n" +
        "1 ; L0 N card sg nom l; Ld S com sg part; Ltud V main partic past imps; ; kolm ööd valvatud \n" +
        "1 ; Lb V main indic pres ps3 sg ps af; L0 S com sg gen; L0 K post; ; näeb kabeli ligidal \n" +
        "1 ; L0 P pers ps3 sg gen; L0 S com sg gen; L0 S com sg nom; ; tema kohtuistumise tool \n" +
        "1 ; L0 S prop sg nom; Lis V main indic impf ps3 sg ps af; L0 S com sg part; ; Bremen mõistis krahvi \n" +
        "1 ; L0 S com sg nom; L0 A pos; L0 S com sg gen; ; mõis läinud abiellumise \n" +
        "1 ; Li V aux indic impf ps3 sg ps af; L0 S com sg nom; Lnud V main partic past ps; ; oli haagreht olnud \n" +
        "1 ; L0 K post; Ls V main indic impf ps3 sg ps af; Lda P pers ps3 sg part; ; juurest hakkas teda \n" +
        "1 ; L0 K post; L0 S com sg gen; Ls V main indic impf ps3 sg ps af; ; järele vundamendi valmis \n" +
        "1 ; Les V main ger; Lid V mod indic impf ps2 sg ps af; L0 S com sg gen; ; tulles pidid kraavi \n" +
        "1 ; L0 S prop sg nom; Lnud V main partic past ps; Ls S prop sg in; ; Essen olnud Riias \n" +
        "1 ; Lda P pers ps3 sg part; L0 P pos det refl sg gen; L0 K post; ; teda enda juurde \n" +
        "1 ; L0 S com sg part; L0 S com sg gen; L0 K post; ; hullu maa pealt \n" +
        "1 ; L0 S prop sg gen; L0 S com sg nom; L0 S prop sg nom; ; Salla von Harpe \n" +
        "1 ; L0 J crd; L0 A pos sg nom; L0 S com sg nom; ; aga õige paks \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; Lda P pers ps3 sg part; L0 S com sg nom; ; hakkas teda vaim \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; L0 P pos det refl sg part; Lks A pos sg tr; ; Mängis end paljaks \n" +
        "1 ; L0 S com sg gen; L0 S com sg nom; Lna S com sg es; ; jutustaja kord lapsena \n" +
        "1 ; L0 J crd; L0 A pos sg gen; L0 S prop sg gen; ; ja vana Avanduse \n" +
        "1 ; Lnud V main partic past ps; L0 J crd; Ls V main indic impf ps3 sg ps af; ; kaevanud ja kohus \n" +
        "1 ; L0 A pos partic; L0 S prop sg nom; L0 A pos; ; olnud Essen surnud \n" +
        "1 ; L0 J sub; L0 S com sg adit; Lnud V main partic past ps; ; kui koju tulnud \n" +
        "1 ; Le S com pl part; Ldi V main indic impf imps af; Lma V main sup ps ill; ; ehituspalke mindi saama \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; L0 S com sg gen; ; Moonamees vaadanud korra \n" +
        "1 ; L0 S com sg gen; L0 V main imper pres ps2 sg ps af; Lma V main sup ps ill; ; mõisa mune viima \n" +
        "1 ; Ll P pers ps3 sg ad; L0 S com sg gen; Ltega S com pl kom; ; tal valla peremeestega \n" +
        "1 ; L0 S com sg nom; L0 P pers ps3 sg gen; Lle S com sg all; ; inimene tema jutule \n" +
        "1 ; L0 P pos det refl sg nom; Lnud V main partic past ps; L0 J crd; ; ise söönud ja \n" +
        "1 ; L0 S prop sg nom; L0 S com sg gen; L0 S com sg gen; ; Huen korra mõisa \n" +
        "1 ; L0 S prop sg gen; Lid S com pl part; Lmas V main sup ps in; ; Harpe hobuseid lugemas \n" +
        "1 ; Lte S com pl gen; Lst S com sg el; La V main inf; ; meeste seljast võtta \n" +
        "1 ; L0 A pos partic; Lle S com sg all; L0 S com sg part; ; kinkinud koolile koha \n" +
        "1 ; L0 A pos; L0 A pos sg nom; L0 S prop sg nom; ; va vana Vamps \n" +
        "1 ; L0 S com sg gen; Lnud V main partic past ps; L0 P det pl nom; ; proua õiendanud kõik \n" +
        "1 ; L0 P dem sg gen; L0 K post; L0 V aux neg; ; selle eest ei \n" +
        "1 ; Ll A pos sg ad; Ll S com sg ad; Li S com pl part; ; armetul kombel inimesi \n" +
        "1 ; L0 S prop sg nom; L0 A pos partic; L0 S prop sg gen; ; Miiling olnud Avanduse \n" +
        "1 ; Ls S prop sg in; L0 P pers ps3 sg gen; L0 K post; ; Riias tema asemel \n" +
        "1 ; Lks A pos sg tr; L0 J crd; Lni S com sg term; ; paljaks kuni ihupesuni \n" +
        "1 ; L0 J sub; Lnud V main indic impf ps neg; Lt S com sg part; ; et polnud viljaseemet \n" +
        "1 ; L0 A pos partic; L0 P dem sg gen; L0 S com sg gen; ; visanud selle hapupiima \n" +
        "1 ; L0 P pers ps3 sg gen; Ltesse S com pl ill; La V main inf; ; tema pükstesse minna \n" +
        "1 ; L0 V aux indic pres ps neg; Ld S com pl nom; Lnud V main partic past ps; ; pole hobused tahtnud \n" +
        "1 ; L0 N card sg nom; Lt S com sg part; L0 A pos partic; ; 10 aastat elanud \n" +
        "1 ; L0 P inter rel sg gen; L0 A pos sg gen; L0 P pers ps3 sg gen; ; missuguse ristialuse ta \n" +
        "1 ; Lnud V main partic past ps; Lda P dem sg part; L0 S com sg gen; ; käskinud seda mõisa \n" +
        "1 ; L0 S com sg nom; L0 V main imper pres ps2 sg ps af; L0 J crd; ; puusärk õhku ja \n" +
        "1 ; L0 S com sg gen; L0 S com sg gen; L0 S prop sg nom; ; Tammiku mõisa Essen \n" +
        "1 ; Lda P pers ps3 sg part; Lks S com sg tr; Ltud V mod partic past imps; ; teda vaimuks peetud \n" +
        "1 ; Ll S com sg ad; L0 A pos partic; L0 S prop sg nom; ; hommikul olnud Essen \n" +
        "1 ; L0 S com sg nom; Ls S com sg in; Lma V main sup ps ill; ; Pagu kodus käima \n" +
        "1 ; Lt S com sg part; Lle P pos det refl sg all; La V main inf; ; vastutust endale võtta \n" +
        "1 ; Lst S com sg el; Le S com pl part; Ldi V main indic impf imps af; ; mõisast ehituspalke mindi \n" +
        "1 ; L0 J sub; Ls S com sg in; L0 V main indic pres ps3 sg ps af; ; et viljas on \n" +
        "1 ; L0 S prop sg nom; Lnud V main partic past ps; Lda P pers ps3 sg part; ; Huen lasknud teda \n" +
        "1 ; L0 K post; Lnud V main partic past ps; L0 A pos sg nom; ; hoolimata hakanud vana \n" +
        "1 ; Lt S com sg part; L0 A pos partic; L0 S prop sg gen; ; härrat elanud Piibe \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; Ld S com pl nom; ; Virtin võtnud munad \n" +
        "1 ; L0 J sub; L0 V aux indic pres ps3 pl ps af; Lnud V main partic past ps; ; et on surnud \n" +
        "1 ; L0 J sub; L0 J sub; Ld S com pl nom; ; et kui mulgid \n" +
        "1 ; Lks V aux cond pres ps af; La V main inf; Ldud V mod partic past imps; ; oleks viia saadud \n" +
        "1 ; Lis V main indic impf ps3 sg ps af; L0 A pos sg gen; L0 S com sg gen; ; Kandis musta mütsi \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; Ll S com sg ad; ; Pagu ajanud surnuaial \n" +
        "1 ; L0 P dem sg nom; Lnud V main partic past ps; L0 P pos det refl sg gen; ; See visanud oma \n" +
        "1 ; L0 S prop sg nom; Ls S com sg in; Lnudki V main partic past ps; ; Riiamaa mees läinudki \n" +
        "1 ; L0 S com sg nom; Llle P pers ps2 sg all; L0 P dem sg gen; ; proua sulle selle \n" +
        "1 ; L0 J sub; Lge V main imper pres ps2 pl ps af; L0 J sub; ; et tulge kui \n" +
        "1 ; Lb V main indic pres ps3 sg ps af; L0 S prop sg gen; Ls S com sg in; ; kasvab Salla mõisas \n" +
        "1 ; L0 J crd; L0 A pos; L0 V main imper pres ps2 sg ps af; ; ja kogu aja \n" +
        "1 ; Lga P dem sg kom; Ldes V main ger; Lnud V main partic past ps; ; sellega veheldes pääsenud \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; L0 S prop sg nom; L0 Y nominal; ; Kaotas Avanduse E. \n" +
        "1 ; L0 J crd; Ll N ord sg ad l; Ll S com sg ad; ; ja kolmandal õhtul \n" +
        "1 ; L0 J crd; L0 S com sg nom; Lvat V aux quot pres ps af; ; aga puusärk olevat \n" +
        "1 ; Ls A pos sg in; Ls S com sg in; L0 J crd; ; pimedas toas ja \n" +
        "1 ; Ltud V main partic past imps; Ls S prop sg in; L0 P pers ps3 sg gen; ; maetud Riias tema \n" +
        "1 ; Ld S com pl nom; L0 S com sg gen; La V main inf; ; mehed mõisa tuua \n" +
        "1 ; Lnud V main partic past ps; L0 J crd; Lnudki V main partic past ps; ; jonninud ja lõhkunudki \n" +
        "1 ; L0 A pos partic; L0 S com sg nom; L0 V main imper pres ps2 sg ps af; ; tõusnud puusärk õhku \n" +
        "1 ; L0 P dem sg nom; L0 V aux indic pres ps3 sg ps af; L0 S com sg nom; ; see on varas \n" +
        "1 ; L0 A pos sg nom; L0 S prop sg nom; L0 J crd; ; Vana Jenk ja \n" +
        "1 ; Li V main indic impf ps3 sg ps af; Ls S prop sg in; L0 S com sg nom; ; oli Riias viitsekuberner \n" +
        "1 ; Lda P dem sg part; L0 J crd; Lnud V main partic past ps; ; seda ja lasknud \n" +
        "1 ; L0 J crd; L0 S com sg nom; L0 S com sg adit; ; ja rinnaesine hapupiima \n" +
        "1 ; Lsse S com sg ill; L0 J crd; Lnud V main partic past ps; ; kohtusse ja saanud \n" +
        "1 ; L0 S prop sg nom; L0 P pos det refl sg nom; Lb V main indic pres ps3 sg ps af; ; Harpe ise seisab \n" +
        "1 ; L0 J crd; Lst P dem sg el; L0 K post; ; Aga sellest hoolimata \n" +
        "1 ; L0 P inter rel sg nom; Ll P pers ps3 sg ad; Li V main indic impf ps3 sg ps af; ; mis tal oli \n" +
        "1 ; L0 A pos sg gen; Lga S com sg kom; L0 A pos sg gen; ; soolase veega vitse \n" +
        "1 ; Lst P dem sg el; L0 K post; Lnud V main partic past ps; ; sellest hoolimata hakanud \n" +
        "1 ; L0 A pos sg nom; L0 S prop sg nom; Lda P dem sg part; ; vana Vamps seda \n" +
        "1 ; Ltele S com pl all; L0 S com sg part; Lst S com sg el; ; meestele vilja magasiaidast \n" +
        "1 ; Ls S com sg in; L0 J crd; Ls V main indic impf ps3 sg ps af; ; mõttes ja hulkus \n" +
        "1 ; Lnud V main partic past ps; L0 P det sg nom; Lle P dem sg all; ; jooksnud kumbki teisele \n" +
        "1 ; Li V aux indic impf ps3 sg ps af; L0 P pers ps3 sg gen; L0 S com sg gen; ; oli tema matuse \n" +
        "1 ; Lst S com sg el; L0 P pos det refl sg gen; L0 S com sg gen; ; taskust oma revolvri \n" +
        "1 ; L0 A pos partic; L0 S com sg gen; L0 S com sg adit; ; kahmanud pingi pihku \n" +
        "1 ; L0 A pos sg nom; L0 S com sg nom; Lb V main indic pres ps3 sg ps af; ; uhke tamm kasvab \n" +
        "1 ; Llgi P pers ps3 sg ad; L0 V main indic pres ps3 sg ps af; L0 N card sg nom; ; temalgi on 9-10 \n" +
        "1 ; Lt S com sg part; L0 A pos partic; Ls A pos sg in; ; aastat elanud väikeses \n" +
        "1 ; L0 S com sg gen; L0 S com sg gen; Ll S com sg ad; ; korra mõisa hoovil \n" +
        "1 ; Lnud V main partic past ps; Ll N ord sg ad l; Ll S com sg ad; ; öelnud teisel korral \n" +
        "1 ; L0 N card sg nom l; Lt S com sg part; Lnud V main partic past ps; ; Kolm meest hakanud \n" +
        "1 ; Ltele S com pl all; L0 A pos sg gen; L0 S com sg gen; ; mõisalastele suure jõulupuu \n" +
        "1 ; L0 J sub; L0 P pers ps3 sg nom; L0 V aux indic pres ps neg; ; et tema pole \n" +
        "1 ; Li V main indic impf ps3 sg ps af; Li S com pl part; L0 S com sg nom; ; oli Määri härra \n" +
        "1 ; Lks S com sg tr; Li V main indic impf ps3 sg ps af; L0 S com sg nom; ; nõrkuseks oli kaardimäng \n" +
        "1 ; Ld S com pl nom; L0 A pos; Ld P dem pl part; ; Mehed läinud neid \n" +
        "1 ; L0 A pos partic; Lda P pers ps3 sg part; L0 N card sg nom l; ; näinud teda kaks \n" +
        "1 ; L0 A pos partic; L0 S com sg gen; L0 K post; ; olnud tee ääres \n" +
        "1 ; L0 J sub; L0 S prop sg nom; L0 P pos det refl sg nom; ; et Harpe ise \n" +
        "1 ; Lnud V main partic past ps; Lt A pos sg part; L0 S com sg part; ; võtnud uut mõisnikku \n" +
        "1 ; L0 J crd; L0 S prop sg nom; L0 V aux indic pres ps neg; ; Aga Dahvid pole \n" +
        "1 ; L0 P dem sg nom; L0 J crd; Lnud V aux partic past ps; ; See aga olnud \n" +
        "1 ; L0 S prop sg nom; L0 S prop sg nom; L0 J crd; ; Rahkla Miiling ja \n" +
        "1 ; Lda P dem sg part; Lt S com sg part; L0 J crd C; ; seda karjumist ja \n" +
        "1 ; L0 S com sg nom; L0 S prop sg gen; L0 S com sg nom; ; krahv Lütke omandus \n" +
        "1 ; Lb V main indic pres ps3 sg ps af; L0 S prop sg gen; L0 S com sg gen; ; käib Piibe mõisa \n" +
        "1 ; L0 S com sg part; Lst S com sg el; L0 V aux neg; ; Traksi mäest ei \n" +
        "1 ; L0 V aux indic pres ps3 sg ps af; L0 N card sg nom l; L0 S com sg part; ; on kaks hullu \n" +
        "1 ; L0 S com sg gen; L0 S com sg nom; L0 V main indic pres ps3 sg ps af; ; kohtuistumise tool on \n" +
        "1 ; Lst A pos sg el; Lst S com sg el; L0 S com sg gen; ; tulisest suust suitsu \n" +
        "1 ; Lnud V main partic past ps; Li S com pl part; Lma V main sup ps ill; ; hakanud päevi nõudma \n" +
        "1 ; L0 J crd; L0 A pos partic; Lile S com pl all; ; ja ütelnud peksjaile \n" +
        "1 ; L0 P pers ps2 sg nom; Ld V main indic pres ps2 sg ps af; L0 J crd; ; sa lähed ja \n" +
        "1 ; Lnudki V main partic past ps; L0 S com sg gen; L0 S prop sg gen; ; tekkinudki otsetee Kissa \n" +
        "1 ; L0 S com sg nom; L0 S prop sg nom; Lis V main indic impf ps3 sg ps af; ; von Bremen mõistis \n" +
        "1 ; L0 S prop sg gen; L0 S com sg nom; Li V main indic impf ps3 sg ps af; ; Avanduse mõis oli \n" +
        "1 ; L0 P pos det refl sg part; Lle P dem sg all; Lle S com sg all; ; end sellele mehele \n" +
        "1 ; Ll S com sg ad; L0 A pos partic; L0 S com sg nom; ; Eluajal olnud sant \n" +
        "1 ; L0 S com sg nom; Lna S com sg es; L0 S com sg gen; ; kord lapsena mõisa \n" +
        "1 ; L0 J crd; L0 S com sg nom; L0 S prop sg nom; ; ja Padu Kooli-Juhan \n" +
        "1 ; Ld S com pl nom; Lvat V aux quot pres ps af; L0 P dem sg gen; ; vaimud olevat teise \n" +
        "1 ; Ldki S com pl nom; L0 A pos sg nom; L0 S com sg nom; ; Tehtudki uus alus \n" +
        "1 ; Lks N card sg tr l; Lks S com sg tr; Lle S com sg all; ; kolmeks aastaks sunnitööle \n" +
        "1 ; L0 P pers ps2 sg nom; Ls V main indic impf ps3 sg ps af; L0 A pos sg nom; ; sa hirmus must \n" +
        "1 ; L0 S com sg nom; L0 J crd; Lnud V main partic past ps; ; mees ja uidanud \n" +
        "1 ; L0 P pers ps3 sg gen; L0 K post; Lb V main indic pres ps3 sg ps af; ; tema järel jookseb \n" +
        "1 ; L0 S com sg nom; L0 A pos sg nom; L0 J crd; ; niisugene pikk ja \n" +
        "1 ; L0 J sub; L0 S prop sg nom; L0 S com sg gen; ; et Huen korra \n" +
        "1 ; L0 S prop sg nom; L0 S prop sg gen; Lid S com pl part; ; Salla Harpe hobuseid \n" +
        "1 ; Lid V mod indic impf ps2 sg ps af; L0 S com sg gen; Lma V main sup ps ill; ; pidid kraavi minema \n" +
        "1 ; L0 S com sg nom; Lnud V main partic past ps; L0 S com sg gen; ; Härra kaevanud Tedrekulli \n" +
        "1 ; L0 S com sg nom; L0 A pos; Lle S com sg all; ; Kutsar läinud härrale \n" +
        "1 ; Lnud V main partic past ps; L0 J crd; Lnud V main partic past ps; ; kärkinud ja hüüdnud \n" +
        "1 ; L0 J crd; L0 S prop sg nom; L0 S prop sg nom; ; aga Rahkla Miiling \n" +
        "1 ; L0 J sub; L0 P pers ps3 sg nom; Lnud V main partic past ps; ; sest tema müünud \n" +
        "1 ; Ld S com pl nom; Lnud V main partic past ps; Lda P pers ps3 sg part; ; hobused tahtnud teda \n" +
        "1 ; Lt S com sg part; Lnud V main partic past ps; L0 P dem sg nom; ; tagasitulekut olnud teine \n" +
        "1 ; Ld S com pl nom; Lnud V main partic past ps; Lma V main sup ps ill; ; Teenrid tahtnud jooksma \n" +
        "1 ; L0 S prop sg nom; L0 V aux indic pres ps neg; Lst P dem sg el; ; Dahvid pole sellest \n" +
        "1 ; Lma V main sup ps ill; L0 J crd; Lnud V main partic past ps; ; naerma ja pööranud \n" +
        "1 ; Lst S com sg el; L0 V aux neg; L0 V main indic pres ps neg; ; mäest ei saa \n" +
        "1 ; L0 V main indic pres ps3 sg ps af; Ll S com sg ad; L0 S com sg nom; ; on laual kartul \n" +
        "1 ; L0 P pers ps3 sg nom; L0 V main indic pres ps3 sg ps af; L0 A pos sg gen; ; tema on lühikese \n" +
        "1 ; Ll N ord sg ad l; Ll S com sg ad; L0 V main indic pres ps3 sg ps af; ; Esimesel õhtul on \n" +
        "1 ; L0 P dem sg nom; L0 P dem sg gen; L0 S com sg gen; ; teine teise sääre \n" +
        "1 ; L0 A pos sg nom; L0 S com sg nom; Li V main indic impf ps3 sg ps af; ; omaaegne haagikohtunik oli \n" +
        "1 ; L0 S com sg gen; Ls S com sg in; Lnud V main partic past ps; ; Laane kõrtsis olnud \n" +
        "1 ; Lnud V mod partic past ps; L0 S com sg part; Lst S com sg el; ; saanud mütsi peast \n" +
        "1 ; L0 S prop sg gen; Ls S com sg in; L0 P dem indef sg nom; ; Piibe mõisas üks \n" +
        "1 ; L0 S com sg gen; Ld S com pl nom; L0 J crd; ; härra püksid ja \n" +
        "1 ; L0 S com sg gen; Ltes S com pl in; La V main inf; ; härra pükstes olla \n" +
        "1 ; L0 J sub; Lnud V main partic past ps; Ld S com pl nom; ; kui pannud hobused \n" +
        "1 ; L0 S prop sg nom; L0 A pos partic; L0 S com sg gen; ; Dahvid kahmanud pingi \n" +
        "1 ; L0 S com sg nom; Lis V main indic impf ps3 sg ps af; L0 S com sg gen; ; Härra laskis mäe \n" +
        "1 ; L0 P pers ps1 sg nom; Ln V main indic pres ps1 sg ps af; L0 S prop sg nom; ; Mina olen Huen \n" +
        "1 ; Lnud V main partic past ps; L0 S com sg gen; L0 K post; ; Seisnud ukse juures \n" +
        "1 ; L0 A pos sg nom; L0 S com sg nom; Ls S com sg in; ; vana Pagu kodus \n" +
        "1 ; L0 P dem sg nom; Lnud V main partic past ps; Lda P pers ps3 sg part; ; See lasknud teda \n" +
        "1 ; L0 S com sg gen; L0 S prop sg nom; L0 A pos partic; ; Lasinurme Stakelberg lasknud \n" +
        "1 ; Ld P dem pl part; Lid S com pl part; Lma V main sup ps ill; ; neid keldreid kaevama \n" +
        "1 ; Ll N ord sg ad l; Ll S com sg ad; L0 A pos partic; ; Teisel päeval tulnud \n" +
        "1 ; Lnud V main partic past ps; Lga S com sg kom; L0 S com sg nom; ; olnud jutustajaga sugulane \n" +
        "1 ; L0 J crd; L0 A pos partic; L0 P dem sg gen; ; ja visanud selle \n" +
        "1 ; L0 P pos det refl sg gen; L0 N card sg nom l; L0 S com sg part; ; oma sada hoopi \n" +
        "1 ; L0 S com sg nom; Li V aux indic impf ps3 sg ps af; L0 S com sg gen; ; nimi oli Joa \n" +
        "1 ; L0 J sub; Lnud V main partic past ps; Ltega S com pl kom; ; et hoidnud kätega \n" +
        "1 ; L0 P dem sg gen; L0 K post; Lnud V main partic past ps; ; teise juures lugenud \n" +
        "1 ; L0 P pers ps3 sg gen; L0 S com sg gen; L0 S prop sg gen; ; tema venna Konstantini \n" +
        "1 ; Llegi S com sg all; L0 V aux indic pres ps neg; Lnud V main partic past ps; ; põllulegi pole läinud \n" +
        "1 ; Lnud V main partic past ps; L0 S com sg gen; Lt S com sg part; ; tervitanud mõisa rahvast \n" +
        "1 ; L0 S com sg gen; Lle S com sg all; La V main inf; ; Nõmmküla nõmmele viia \n" +
        "1 ; Lb V main indic pres ps3 sg ps af; L0 J sub; L0 A pos sg nom; ; jookseb nagu must \n" +
        "1 ; L0 A pos partic; L0 A pos sg nom; L0 S com sg nom; ; olnud hea mees \n" +
        "1 ; Lle P dem sg all; L0 K post; L0 J crd; ; teisele poole ja \n" +
        "1 ; Ll S com sg ad; L0 P det pl nom; L0 S com sg nom; ; härral kõik kaelavahe \n" +
        "1 ; L0 J crd C; Li V main indic impf ps3 sg ps af; Lks A pos sg tr; ; ja jäi hulluks \n" +
        "1 ; L0 J crd C; Lis V main indic impf ps3 sg ps af; L0 S prop sg nom; ; ja ostis Porkuni \n" +
        "1 ; L0 J sub; Lt A comp sg part; Li S com pl part; ; et paremat otsi \n" +
        "1 ; L0 P pers ps3 sg gen; Lks S com sg tr; Li V main indic impf ps3 sg ps af; ; tema nõrkuseks oli \n" +
        "1 ; L0 J sub; L0 A pos sg gen; L0 S com sg gen; ; kui evangeelse luteriusu \n" +
        "1 ; Ls S com sg in; L0 P dem indef sg nom; L0 S com sg nom; ; mõisas üks härra \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; L0 P indef sg nom; ; Moonamees olnud mitu \n" +
        "1 ; L0 S com sg nom; L0 S prop sg nom; Lvat V aux quot pres ps af; ; Padu Kooli-Juhan olevat \n" +
        "1 ; L0 S com sg nom; Li V main indic impf ps3 sg ps af; L0 P pers ps3 sg nom; ; rentnik oli ta \n" +
        "1 ; Lnud V main partic past ps; Lu S com pl part; L0 J crd; ; trampinud jalgu ja \n" +
        "1 ; Lnud V main partic past ps; Ltega S com pl kom; L0 S com sg part; ; hoidnud kätega kõhtu \n" +
        "1 ; L0 P dem sg nom; L0 S com sg nom; L0 A pos sg nom; ; teine niisugene pikk \n" +
        "1 ; L0 P inter rel sg nom; L0 S com sg nom; Lb V main indic pres ps3 sg ps af; ; mis peigmees annab \n" +
        "1 ; Lnud V main partic past ps; L0 S com sg gen; Lsse S com sg ill; ; kaevanud Tedrekulli kohtusse \n" +
        "1 ; L0 J crd; L0 A pos partic; Ld S com pl nom; ; ja lahutanud majad \n" +
        "1 ; L0 V aux indic pres ps neg; Lnud V main partic past ps; Lt P dem sg part; ; Pole olnud niisugust \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; Lnud V main partic past ps; L0 P pers ps3 sg nom; ; kohus mõistnud tema \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; L0 A pos; L0 S com sg nom; ; hulkus mööda tuba \n" +
        "1 ; L0 J crd; Ld P det pl nom; Lnud V main partic past ps; ; ja mõlemad läinud \n" +
        "1 ; L0 S com sg nom; Lks A pos sg tr; Ls V main indic impf ps3 sg ps af; ; proua hulluks läks \n" +
        "1 ; L0 P pers ps3 sg nom; Lks N card sg tr l; Lks S com sg tr; ; tema kolmeks aastaks \n" +
        "1 ; Ll N ord sg ad l; Ll S com sg ad; L0 S com sg part; ; neljandal õhtul lauda \n" +
        "1 ; L0 S com sg gen; L0 S prop sg gen; L0 S com sg nom; ; venna Konstantini poeg \n" +
        "1 ; L0 S com sg part; L0 J crd; Lb V main indic pres ps3 sg ps af; ; lauda ja ütleb \n" +
        "1 ; Lnudki V main partic past ps; L0 S com sg gen; Ld S com pl nom; ; toonudki härra püksid \n" +
        "1 ; L0 J sub; L0 P indef sg nom; L0 S com sg gen; ; Kui miski asja \n" +
        "1 ; L0 S com sg gen; L0 K post; Ls V main indic impf ps3 sg ps af; ; kabeli juurest hakkas \n" +
        "1 ; Lt A pos sg part; Lt S com sg part; Lnud V main partic past ps; ; pärast tagasitulekut olnud \n" +
        "1 ; L0 S prop sg nom; Lvat V aux quot pres ps af; L0 P dem sg gen; ; Kooli-Juhan olevat teise \n" +
        "1 ; Lme V mod indic pres ps1 pl ps af; L0 P pers ps3 sg gen; Ltesse S com pl ill; ; võime tema pükstesse \n" +
        "1 ; L0 S com sg gen; L0 K post; Ld A pos pl nom; ; rahva vastu sõbralikud \n" +
        "1 ; L0 P pers ps1 pl gen; L0 S com sg nom; L0 V main indic pres ps3 sg ps af; ; Meie härra on \n" +
        "1 ; L0 S prop sg nom; Lnud V main partic past ps; Lst P dem sg el; ; Aleksander saanud sellest \n" +
        "1 ; L0 J sub; L0 S com sg nom; Llle P pers ps2 sg all; ; Kui proua sulle \n" +
        "1 ; Lda P dem sg part; Lt S com sg part; Lle P pos det refl sg all; ; seda vastutust endale \n" +
        "1 ; L0 S com sg gen; L0 S com sg nom; L0 S com sg nom; ; Võivere härra Pagu \n" +
        "1 ; Lnud V main partic past ps; Lt S com sg part; Lma V main sup ps ill; ; hakanud Issameiet paluma \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; L0 P pos det refl sg gen; ; Pagu olnud oma \n" +
        "1 ; L0 J crd; L0 S com sg part; Lst S com sg el; ; aga Traksi mäest \n" +
        "1 ; Lma V main sup ps ill; L0 J crd; L0 S prop sg gen; ; kõnelema ja Harpe \n" +
        "1 ; L0 S prop sg gen; L0 K post; Li V main indic impf ps3 sg ps af; ; Bremeni järele tuli \n" +
        "1 ; L0 P indef sg nom; L0 V aux indic pres ps neg; Lnud V main partic past ps; ; keegi pole julgenud \n" +
        "1 ; Li S com pl part; Ll A pos sg ad; Ll S com sg ad; ; inimesi koledal kombel \n" +
        "1 ; Li V aux indic impf ps3 sg ps af; Lle N card sg all l; Lle A pos sg all; ; oli ühele vaesele \n" +
        "1 ; Ltes S com pl in; L0 V aux indic pres ps3 sg ps af; Ltud V main partic past imps; ; keldrites on nähtud \n" +
        "1 ; L0 A pos sg gen; L0 P pers ps3 sg gen; Lnud V main partic past ps; ; ristialuse ta teinud \n" +
        "1 ; Ll S com sg ad; L0 S com sg part; L0 J crd; ; õhtul lauda ja \n" +
        "1 ; Lst P dem sg el; L0 P pers ps3 sg gen; L0 S com sg part; ; sellest tema aru \n" +
        "1 ; L0 S com sg gen; Ll S com sg ad; Lnud V main partic past ps; ; mõisa hoovil kärkinud \n" +
        "1 ; L0 J crd; L0 S com sg nom; L0 J crd; ; ja nägu ja \n" +
        "1 ; L0 V aux indic pres ps3 sg ps af; Ltud V main partic past imps; Lsid S com pl part; ; on nähtud naharibasid \n" +
        "1 ; Li V aux indic impf ps3 sg ps af; L0 A pos sg nom; L0 S com sg nom; ; oli hea mees \n" +
        "1 ; L0 S com sg nom; L0 P pos det refl sg gen; Lid S com pl part; ; tööinimene oma riideid \n" +
        "1 ; Lnud V main partic past ps; L0 N card sg gen l; L0 S com sg gen; ; olnud ühe kindrali \n" +
        "1 ; L0 S prop sg gen; L0 S com sg nom; L0 A pos; ; Koila mõis läinud \n" +
        "1 ; L0 S com sg gen; Lnud V main partic past ps; L0 J crd; ; maamõõtja vihastanud ja \n" +
        "1 ; L0 S com sg nom; L0 S prop sg nom; L0 S com sg gen; ; proua Salla mõisa \n" +
        "1 ; Lda P pers ps3 sg part; L0 N card sg nom l; L0 S com sg part; ; teda kaks korda \n" +
        "1 ; L0 J sub; L0 S com sg gen; Ld S com pl nom; ; et õpetaja eluruumid \n" +
        "1 ; L0 P inter rel sg nom; L0 P pers ps1 sg nom; Ln V main indic pres ps1 sg ps af; ; kes mina olen \n" +
        "1 ; Lda P dem sg part; Lt A pos sg part; L0 S com sg gen; ; seda väikest muna \n" +
        "1 ; L0 S com sg nom; L0 S com sg nom; L0 A pos partic; ; härra Pagu ajanud \n" +
        "1 ; L0 J crd; L0 S com sg gen; Lle S com sg all; ; ja talukoha koolile \n" +
        "1 ; L0 J crd; Li S com pl part; Lda V main inf; ; ja põlvi silitada \n" +
        "1 ; L0 S prop sg nom; L0 N ord; Lnud V main partic past ps; ; Aleksander II olnud \n" +
        "1 ; L0 P pers ps3 sg gen; Lt A pos sg part; L0 S com sg part; ; Tema andvat ühtehinge \n" +
        "1 ; L0 S com sg gen; Ld S com pl nom; L0 P dem sg gen; ; Ema öelnud selle \n" +
        "1 ; Lt S com sg part; L0 V aux neg; Lnud V main indic impf ps neg; ; otsust ei teinud \n" +
        "1 ; L0 V aux indic pres ps neg; Lnud V main partic past ps; Lt S prop sg part; ; pole teretanud Harpet \n" +
        "1 ; L0 P dem sg nom; Lb V mod indic pres ps3 sg ps af; Lma V main sup ps ill; ; see peab tähendama \n" +
        "1 ; Ld P det pl nom; Lme V mod indic pres ps1 pl ps af; L0 P pers ps3 sg gen; ; mõlemad võime tema \n" +
        "1 ; L0 A pos sg gen; L0 S com sg gen; Lda V main inf; ; väikese kivimaja ehitada \n" +
        "1 ; L0 K post; Lb V main indic pres ps3 sg ps af; L0 J sub; ; järel jookseb nagu \n" +
        "1 ; Ll S com sg ad; L0 P pos det refl sg gen; Lga S com sg kom; ; Jutustajal oma isaga \n" +
        "1 ; L0 J crd C; Ld P pers ps1 sg part; L0 V aux neg; ; ja mind ei \n" +
        "1 ; Lnud V main partic past ps; L0 P det pl nom; Ld S com pl nom; ; õiendanud kõik asjad \n" +
        "1 ; L0 P indef sg nom; L0 S com sg gen; L0 K post; ; miski asja pärast \n" +
        "1 ; L0 J crd; L0 S com sg gen; L0 A pos partic; ; ja vanaproua öelnud \n" +
        "1 ; Ls S com sg in; L0 A pos partic; Lks S com sg tr; ; Mõisas olnud kutsariks \n" +
        "1 ; L0 A pos partic; L0 S com sg gen; L0 S com sg nom; ; saatnud jutustaja kord \n" +
        "1 ; L0 V aux neg; L0 V main indic pres ps neg; Lt S com sg part; ; ei taha kopikat \n" +
        "1 ; L0 A pos sg gen; L0 S com sg gen; L0 S com sg nom; ; evangeelse luteriusu kool \n" +
        "1 ; L0 J sub; L0 S com sg nom; Lks A pos sg tr; ; kui proua hulluks \n" +
        "1 ; Lnud V main partic past ps; L0 S com sg gen; Lu S com pl part; ; haaranud pingi pihku \n" +
        "1 ; L0 S com sg part; L0 S prop sg nom; Ltud V main partic past imps; ; poega Abrami pekstud \n" +
        "1 ; L0 S prop sg nom; L0 J crd; L0 A pos sg gen; ; Miiling ja vana \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; L0 S prop sg nom; L0 J crd C; ; Müüs Salla ja \n" +
        "1 ; L0 A pos partic; Ll A pos sg ad; Ll S com sg ad; ; seisnud seal kõrval \n" +
        "1 ; Lni S com sg term; L0 J crd; Ldeni S com pl term; ; ihupesuni ja hõbelauanõudeni \n" +
        "1 ; L0 A pos sg nom; L0 V main imper pres ps2 sg ps af; Ld S com pl nom; ; Endine tee käinud \n" +
        "1 ; L0 S com sg nom; Li V aux indic impf ps3 sg ps af; L0 P pers ps3 sg gen; ; kirik oli tema \n" +
        "1 ; L0 J crd; L0 A pos partic; L0 P pos det refl sg gen; ; aga mõistnud oma \n" +
        "1 ; L0 P det sg nom; Lle P dem sg all; L0 K post; ; kumbki teisele poole \n" +
        "1 ; L0 S prop sg nom; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; ; Käru Pago oli \n" +
        "1 ; L0 K post; L0 S com sg gen; L0 S com sg nom; ; ajal Tammiku peremees \n" +
        "1 ; L0 J crd; L0 S com sg nom; Ll P pos det refl sg ad; ; ja kiskund omal \n" +
        "1 ; L0 S prop sg gen; L0 J crd; L0 A pos partic; ; Harpe aga mõistnud \n" +
        "1 ; L0 J crd; Lnud V main partic past ps; L0 S com sg gen; ; ja saanud õiguse \n" +
        "1 ; L0 P pers ps1 sg nom; Ln V main indic pres ps1 sg ps af; L0 S com sg nom; ; mina olen keiser \n" +
        "1 ; Lnud V main partic past ps; Lt P dem sg part; L0 S com sg part; ; olnud niisugust riista \n" +
        "1 ; L0 J sub; L0 P dem indef sg nom; Ls V main indic impf ps3 sg ps af; ; kui üks kohtus \n" +
        "1 ; Ll S com sg ad; L0 V main indic pres ps3 sg ps af; Ll S com sg ad; ; õhtul on laual \n" +
        "1 ; Li V main indic impf ps3 sg ps af; L0 P pos det refl sg gen; L0 N card sg nom l; ; oli oma sada \n" +
        "1 ; Lnud V main partic past ps; Ld S com pl nom; L0 S com sg gen; ; lasknud mehed mõisa \n" +
        "1 ; L0 P dem sg nom; Ls V main indic impf ps3 sg ps af; L0 P pos det refl sg gen; ; see kaotas oma \n" +
        "1 ; L0 J crd; Li S com pl part; Li V main indic impf ps3 sg ps af; ; ja lilli oli \n" +
        "1 ; Li V main indic impf ps3 sg ps af; L0 S com sg nom; L0 S prop sg gen; ; oli mõis Henningi \n" +
        "1 ; L0 K post; L0 A pos partic; Ll P pers ps3 sg ad; ; pärast tulnud tal \n" +
        "1 ; Lnud V main partic past ps; Lle P dem sg all; Lle S com sg all; ; Kudunud sellele lapsele \n" +
        "1 ; L0 P dem indef sg nom; Ls V main indic impf ps3 sg ps af; L0 S com sg nom; ; üks kohtus käimine \n" +
        "1 ; Ll S com sg ad; Lnud V main partic past ps; L0 J crd; ; hoovil kärkinud ja \n" +
        "1 ; Lge V main imper pres ps2 pl ps af; L0 J sub; Lte V main indic pres ps2 pl ps af; ; tulge kui tahate \n" +
        "1 ; L0 S prop sg nom; L0 S prop sg gen; L0 S com sg nom; ; Rahkla Miilingu rist \n" +
        "1 ; L0 N card sg nom l; L0 S com sg part; L0 S com sg gen; ; kaks hullu maa \n" +
        "1 ; L0 S com sg gen; Ld S com pl nom; Lvad V main indic pres ps3 pl ps af; ; õpetaja eluruumid tulevad \n" +
        "1 ; L0 S com sg gen; Lnud V main partic past ps; Lda P dem sg part; ; Härra käskinud seda \n" +
        "1 ; Ld S com pl nom; L0 J crd; L0 S com sg gen; ; võtnud aga brauningu \n" +
        "1 ; L0 A pos sg nom; L0 S prop sg nom; Li V aux indic impf ps3 sg ps af; ; Vana Zoege oli \n" +
        "1 ; L0 A pos sg nom; L0 S com sg gen; L0 S com sg nom; ; Noor Võivere Pagu \n" +
        "1 ; Lvad V main indic pres ps3 pl ps af; L0 S com sg gen; L0 K post; ; annavad nahatäie kätte \n" +
        "1 ; L0 J crd; Lnud V main partic past ps; Lt S com sg part; ; ja hakanud Issameiet \n" +
        "1 ; Lnud V main partic past ps; Ld S com pl nom; L0 S com sg part; ; pannud käed risti \n" +
        "1 ; L0 S prop sg nom; Ls S com sg in; Lnud V main partic past ps; ; Riiamaa mees läinud \n" +
        "1 ; Lid S com pl part; Lle S com sg all; L0 J crd; ; riideid rohule ega \n" +
        "1 ; L0 J sub; L0 P pers ps3 sg nom; Lis V main indic impf ps3 sg ps af; ; Kui tema sõitis \n" +
        "1 ; L0 S com sg gen; L0 S com sg gen; La V main inf; ; mõisa juure minna \n" +
        "1 ; L0 S com sg gen; L0 A pos partic; Lle P pers ps3 sg all; ; vanaproua öelnud temale \n" +
        "1 ; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; Lda P pers ps3 sg part; ; Huen lasi teda \n" +
        "1 ; L0 S com sg gen; L0 A pos sg nom; L0 S com sg nom; ; Proua väike kasutütar \n" +
        "1 ; L0 S com sg nom; Lnud V main partic past ps; Lst S com sg el; ; moonamees tulnud poest \n" +
        "1 ; L0 J crd; L0 P pers ps3 sg nom; Lda P dem sg part; ; või tema seda \n" +
        "1 ; Lid V main indic impf ps3 pl ps af; L0 S com sg gen; L0 K post; ; Olid rahva vastu \n" +
        "1 ; Lle N card sg all l; Lle A pos sg all; Lnud V main partic past ps; ; ühele vaesele kinkinud \n" +
        "1 ; L0 S com sg nom; Li V main indic impf ps3 sg ps af; L0 S com sg adit; ; haagikohtunik oli poolhullu \n" +
        "1 ; L0 S com sg part; Ltele S com pl all; L0 S com sg part; ; küla meestele vilja \n" +
        "1 ; Ls S com sg in; L0 J crd; Ltes S com pl in; ; toas ja aluspükstes \n" +
        "1 ; L0 J sub; Lks S com sg tr; Lnud V main partic past ps; ; sest tingimuseks olnud \n" +
        "1 ; L0 J crd; Ls V main indic impf ps3 sg ps af; L0 A pos; ; ja hulkus mööda \n" +
        "1 ; L0 P dem sg nom; Lnud V main partic past ps; Lt P pos det refl sg part; ; see poonud ennast \n" +
        "1 ; L0 S prop sg nom; Li V aux indic impf ps3 sg ps af; L0 S com sg nom; ; Zoege oli haagreht \n" +
        "1 ; L0 J sub; L0 S com sg nom; Ls S com sg in; ; et tamm Tammikus \n" +
        "1 ; L0 S com sg nom; Ltud V main partic past imps; Ls S prop sg in; ; sant maetud Riias \n" +
        "1 ; L0 P pers ps3 sg gen; L0 S com sg part; L0 V aux neg; ; tema aru ei \n" +
        "1 ; L0 S prop sg nom; Lnud V main partic past ps; L0 S com sg gen; ; Papen tervitanud mõisa \n" +
        "1 ; L0 V main indic pres ps3 sg ps af; L0 A pos sg gen; Lga S com sg kom; ; on lühikese nägemisega \n" +
        "1 ; Ls A pos sg in; L0 S prop sg gen; Ls S com sg in; ; Omaaegses Simuna kõrtsis \n" +
        "1 ; Li V main indic impf ps3 sg ps af; Ll P pers ps3 sg ad; L0 N card sg nom; ; oli tal 9-10 \n" +
        "1 ; L0 S com sg nom; Ls S com sg in; Li V main indic impf ps3 sg ps af; ; Maamõõtja kaubas oli \n" +
        "1 ; Ld S com pl nom; L0 S com sg adit; Lma V main sup ps ill; ; inimesed kraavi minema \n" +
        "1 ; Li V main indic impf ps3 sg ps af; Lde S com pl gen; L0 S com sg gen; ; oli talude müümise \n" +
        "1 ; L0 K post; Li V main indic impf ps3 sg ps af; L0 S com sg nom; ; kõrval oli puukamber \n" +
        "1 ; Lnud V main partic past ps; L0 J crd; L0 S com sg gen; ; kärisenud ja kapi \n" +
        "1 ; Lnud V main partic past ps; Le S com pl part; L0 J crd; ; kutsunud insenere ja \n" +
        "1 ; L0 K post; Lle N card sg all l; Lle S com sg all; ; teel ühele umbvenelasele \n" +
        "1 ; L0 J crd; L0gi S com sg nom; L0 A pos partic; ; ja suulagi olnud \n" +
        "1 ; L0 J crd; L0 S com sg nom; Lnud V main partic past ps; ; aga vanarahvas kõnelnud \n" +
        "1 ; Ld S com pl nom; L0 A pos partic; L0 S prop sg gen; ; venelased sugenud Harpe \n" +
        "1 ; Lt S com sg part; L0 J crd C; Li V main indic impf ps3 sg ps af; ; karjumist ja jäi \n" +
        "1 ; L0 V main indic pres ps neg; Lda P dem sg part; La V main inf; ; taha seda näha \n" +
        "1 ; L0 P pers ps3 sg gen; L0 K post; Li V main indic impf ps3 sg ps af; ; Tema ette tuli \n" +
        "1 ; L0 J sub; Lde S com pl gen; L0 S com sg gen; ; et Pagude kabeli \n" +
        "1 ; L0 N card sg gen l; L0 S com sg gen; L0 K post; ; ühe kindrali käes \n" +
        "1 ; L0 A pos partic; L0 S prop sg gen; Ls S com sg in; ; elanud Piibe mõisas \n" +
        "1 ; L0 J crd; Lnud V main partic past ps; Lle S com sg all; ; ja viinud prouale \n" +
        "1 ; L0 S prop sg gen; Ls S com sg in; Lid V main indic impf ps3 pl ps af; ; Piibe mõisas olid \n" +
        "1 ; L0 S com sg nom; L0 S com sg part; Ldes V main ger; ; kord piipu suitsetades \n" +
        "1 ; Lis V main indic impf ps3 sg ps af; L0 S com sg part; Lda V main inf; ; mõistis krahvi meelitada \n" +
        "1 ; L0 S com sg part; Lnud V main partic past ps; Lle P dem sg all; ; kuldrubla pannud sellele \n" +
        "1 ; Le S com pl part; L0 J crd; Lu S com pl part; ; insenere ja tarku \n" +
        "1 ; L0 S prop sg nom; L0 A pos partic; L0 A pos sg nom; ; Baer olnud hea \n" +
        "1 ; L0 A pos partic; Ll S com sg ad; Lt S com sg part; ; ajanud surnuaial moonameest \n" +
        "1 ; L0 P inter rel sg nom; L0 A pos sg nom; L0 S com sg nom; ; mis aus inimene \n" +
        "1 ; L0 J sub; L0 S com sg nom; L0 P pers ps3 sg gen; ; Kui inimene tema \n" +
        "1 ; L0 K post; Li V main indic impf ps3 sg ps af; L0 P pers ps3 sg gen; ; järele tuli tema \n" +
        "1 ; Ll S com sg ad; Lnud V main partic past ps; L0 P dem sg gen; ; Proual olnud selle \n" +
        "1 ; Llle P pers ps2 sg all; L0 P dem sg gen; L0 K post; ; sulle selle eest \n" +
        "1 ; Lnud V main partic past ps; Lle S com sg all; La V main inf; ; viinud prouale näha \n" +
        "1 ; L0 P pers ps3 sg gen; Lle S com sg all; Li V main indic impf ps3 sg ps af; ; tema jutule tuli \n" +
        "1 ; L0 K post; L0 V aux neg; L0 V main indic pres ps neg; ; eest ei taha \n" +
        "1 ; L0 S com sg nom; Ll P pos det refl sg ad; Lid S com pl part; ; kiskund omal juukseid \n" +
        "1 ; L0 V aux indic pres ps neg; Lnud V mod partic past ps; L0 S com sg part; ; pole saanud mütsi \n" +
        "1 ; L0 S prop sg gen; Lnud V main partic past ps; Ld S com pl nom; ; Harpe lasknud mehed \n" +
        "1 ; L0 V aux neg; L0 V main indic pres ps neg; Lda P dem sg part; ; ei taha seda \n" +
        "1 ; Li V main indic impf ps3 sg ps af; L0 P pers ps3 sg gen; L0 S com sg gen; ; tuli tema venna \n" +
        "1 ; L0 A pos partic; L0 P pos det refl sg gen; Ll S com sg ad; ; olnud oma eluajal \n" +
        "1 ; Llt P pers ps3 sg abl; L0 P det sg part; L0 J crd C; ; temalt kõike ja \n" +
        "1 ; L0 V aux neg; Lnud V mod indic impf ps neg; L0 S com sg nom; ; ei tohtinud tööinimene \n" +
        "1 ; Lt A pos sg part; L0 S com sg gen; L0 K post; ; väikest muna käes \n" +
        "1 ; L0 A pos partic; Ls A pos sg in; Ls S com sg in; ; elanud väikeses mõisas \n" +
        "1 ; L0 P pers ps1 sg nom; L0 V aux neg; L0 V main indic pres ps neg; ; Mina ei taha \n" +
        "1 ; L0 S prop sg nom; Lb V main indic pres ps3 sg ps af; Ll N ord sg ad l; ; Bremen tuleb neljandal \n" +
        "1 ; L0 K post; L0 A pos partic; L0 S com sg nom; ; ajal tõusnud puusärk \n" +
        "1 ; Lnud V main partic past ps; Lst S com sg el; L0 J crd; ; tulnud poest ja \n" +
        "1 ; L0 A pos sg nom; L0 S prop sg nom; L0 Y nominal; ; Vana Landrat v \n" +
        "1 ; L0 P dem sg nom; L0 V main indic pres ps3 sg ps af; L0 P pers ps2 sg gen; ; see on sinu \n" +
        "1 ; Ld S com pl nom; L0 S com sg part; L0 J crd; ; käed risti ja \n" +
        "1 ; L0 J sub; L0 P pers ps1 pl nom; Ld P det pl nom; ; et meie mõlemad \n" +
        "1 ; L0 P dem sg nom; Ld S com pl nom; Lma V main sup ps ill; ; see pistnud karjuma \n" +
        "1 ; L0 J crd; L0 P indef sg nom; L0 V aux indic pres ps neg; ; aga keegi pole \n" +
        "1 ; L0 J sub; L0 S com sg gen; L0 S com sg adit; ; et soldati sauna \n" +
        "1 ; Li V aux indic impf ps3 sg ps af; L0 A pos sg gen; Lga S com sg kom; ; oli soolase veega \n" +
        "1 ; L0 S com sg nom; Lvat V aux quot pres ps af; Lnud V main partic past ps; ; härra olevat öelnud \n" +
        "1 ; L0 N card sg nom l; L0 S prop sg nom; Ls S com sg in; ; Üks Riiamaa mees \n" +
        "1 ; Ltega S com pl kom; L0 S com sg part; L0 J crd; ; kätega kõhtu ja \n" +
        "1 ; Ll S com sg ad; Ld S com sg part; Lst S com sg el; ; aastal talumaad mõisast \n" +
        "1 ; Lda P dem sg part; L0 S com sg gen; La V main inf; ; seda mõisa tuua \n" +
        "1 ; L0 N ord sg ad; Ll S com sg ad; Ld S com sg part; ; 1885. aastal talumaad \n" +
        "1 ; L0 P pos det refl sg gen; L0 N card sg nom; L0 S com sg part; ; oma 15 hoopi \n" +
        "1 ; L0 J sub; L0 S com sg part; Lnud V main partic past ps; ; kui saia andnud \n" +
        "1 ; L0 P det sg part; L0 J crd C; Li V main indic impf ps3 sg ps af; ; kõike ja oli \n" +
        "1 ; L0 S com sg gen; L0 S com sg part; L0 S prop sg nom; ; Talitaja poega Abrami \n" +
        "1 ; Lga P inter rel sg kom; Lks V aux cond pres ps af; La V main inf; ; millega oleks viia \n" +
        "1 ; L0 J crd; L0 J sub; Lst S com sg el; ; aga sest asjast \n" +
        "1 ; L0 J crd; L0 A pos partic; L0 S com sg adit; ; ja suitsetanud paberossi \n" +
        "1 ; Lnud V main partic past ps; Lda P dem sg part; Lt A pos sg part; ; hoidnud seda väikest \n" +
        "1 ; Ll A pos sg ad; Ll S com sg ad; Lb V main indic pres ps3 sg ps af; ; tuleval aastal tervitab \n" +
        "1 ; L0 S com sg gen; L0 A pos sg gen; Lga S com sg kom; ; mütsi punase äärega \n" +
        "1 ; Lte S com pl gen; L0 K post; L0 J crd; ; hobuste kõrval ja \n" +
        "1 ; L0 S com sg gen; L0 K post; Ldagi P indef sg part; ; kabeli ligidal kedagi \n" +
        "1 ; L0 J sub; Llgi P pers ps3 sg ad; L0 V main indic pres ps3 sg ps af; ; et temalgi on \n" +
        "1 ; Ldagi P indef sg part; Lt A pos sg part; La V main inf; ; midagi toredat süüa \n" +
        "1 ; L0 S prop sg gen; L0 S com sg nom; Li V aux indic impf ps3 sg ps af; ; Simuna kirik oli \n" +
        "1 ; Ld P dem pl part; Lsid S com pl part; Ltakse V main indic pres imps af; ; neid majasid ehitatakse \n" +
        "1 ; L0 V aux indic pres ps neg; Lt A pos sg part; Ldagi P indef sg part; ; pole suurt midagi \n" +
        "1 ; Ls S com sg in; Lnud V main partic past ps; L0 A pos sg nom; ; kõrtsis olnud suur \n" +
        "1 ; L0 A comp sg nom; Li V main indic impf ps3 sg ps af; L0 S com sg nom; ; Ennem oli mõis \n" +
        "1 ; L0 P dem sg nom; L0 A pos sg nom; L0 S com sg nom; ; see väike poiss \n" +
        "1 ; L0 J crd; L0 A pos; L0 S com sg gen; ; ja läinud kuberneri \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; Lt S com sg part; ; Normann sõimanud ristitegijat \n" +
        "1 ; L0 J crd; Lst P dem sg el; L0 P pers ps3 sg gen; ; aga sellest tema \n" +
        "1 ; Lga A pos sg kom; Ldes V main ger; L0 V aux neg; ; Palavaga töötades ei \n" +
        "1 ; Lb V main indic pres ps3 sg ps af; Li A pos pl part; Le S com pl part; ; kulutab pealmisi pükse \n" +
        "1 ; L0 A pos partic; L0 P indef sg nom; Lt S com sg part; ; olnud mitu nädalat \n" +
        "1 ; Ll P pers ps3 sg ad; L0 N card sg nom; Lt S com sg part; ; tal 9-10 meistrit \n" +
        "1 ; L0 S com sg part; L0 A pos sg gen; Lga S com sg kom; ; mõisnikku suure pidulikkusega \n" +
        "1 ; L0 S com sg gen; L0 S prop sg gen; L0 J crd; ; otsetee Kissa ja \n" +
        "1 ; Lgu V main imper pres ps3 pl ps af; L0 S prop sg gen; Lsse S com sg ill; ; tulgu Salla haagikohtusse \n" +
        "1 ; L0 V main indic pres ps3 sg ps af; Ll P pers ps1 pl ad; Ldagi P indef sg part; ; on meil midagi \n" +
        "1 ; L0 P dem sg gen; L0 S com sg gen; Lle S prop sg all; ; selle hapupiima Bremenile \n" +
        "1 ; Lnud V main partic past ps; Lda P pers ps3 sg part; L0 P pos det refl sg gen; ; lasknud teda enda \n" +
        "1 ; Ls S com sg in; Lst S com sg el; L0 K post; ; otsesihis rukkist läbi \n" +
        "1 ; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; Li S com pl part; ; Manteufel oli Määri \n" +
        "1 ; Li V aux indic impf ps3 sg ps af; Lid S com pl part; Lnud V main partic past ps; ; oli nekruteid peksnud \n" +
        "1 ; Ld S com pl nom; Ll P dem sg ad; Ll S com sg ad; ; mehed sel ajal \n" +
        "1 ; L0 J sub; L0 P inter rel sg nom; L0 A pos sg nom; ; et mis aus \n" +
        "1 ; L0 P pers ps2 sg gen; L0 S com sg nom; L0 J crd; ; sinu liha ja \n" +
        "1 ; Lu S com pl part; L0 J crd; L0 S com sg nom; ; jalgu ja kiskund \n" +
        "1 ; Ld P indef pl nom; L0 V aux indic pres ps neg; Lnud V main partic past ps; ; muud pole olnud \n" +
        "1 ; Ll P pers ps3 sg ad; Lid V main indic impf ps3 pl ps af; L0 S prop sg gen; ; Tal olid Salla \n" +
        "1 ; Ld S com pl nom; L0 J crd; Ld P det pl nom; ; püksid ja mõlemad \n" +
        "1 ; L0 S com sg part; L0 A pos partic; L0 S com sg gen; ; Ema saatnud jutustaja \n" +
        "1 ; Lst S com sg el; La V main inf; Lvat V aux quot pres ps af; ; seljast võtta olevat \n" +
        "1 ; Lnud V main partic past ps; L0 P pers ps3 sg nom; L0 S com sg gen; ; tahtnud ta tamme \n" +
        "1 ; Ls S com sg in; Lid V main indic impf ps3 pl ps af; Ld S prop pl nom; ; mõisas olid Baerid \n" +
        "1 ; L0 S prop sg gen; L0 S com sg nom; Lb V main indic pres ps3 sg ps af; ; Edru küla käib \n" +
        "1 ; L0 K post; L0 J crd; L0 A pos partic; ; juures ja suitsetanud \n" +
        "1 ; Lb V main indic pres ps3 sg ps af; Ll N ord sg ad l; Ll S com sg ad; ; tuleb neljandal õhtul \n" +
        "1 ; L0 S com sg nom; L0 A pos partic; Ltest P dem pl el; ; muna olnud teistest \n" +
        "1 ; Ldes V main ger; L0 V aux neg; Lnud V mod indic impf ps neg; ; töötades ei tohtinud \n" +
        "1 ; Li V main indic impf ps3 sg ps af; L0 S com sg gen; L0 S com sg nom; ; Oli keisri kammerhärra \n" +
        "1 ; L0 P dem sg nom; Li V main indic impf ps3 sg ps af; Llt P pers ps3 sg abl; ; see sai temalt \n" +
        "1 ; Ll S com sg ad; L0 A pos partic; L0 S prop sg gen; ; päeval tulnud Dahvidile \n" +
        "1 ; Ltud V main partic past imps; L0 S prop sg gen; L0 S com sg gen; ; keelatud Avanduse vallamaja \n" +
        "1 ; Lvat V aux quot pres ps af; L0 A pos sg nom; Lnud V main partic past ps; ; olevat tühi olnud \n" +
        "1 ; L0 J crd; Lnud V main partic past ps; Ltes S com pl in; ; ja uidanud valeriietes \n" +
        "1 ; L0 J crd; Lnud V main partic past ps; L0 V main imper pres ps2 sg ps af; ; ja lasknud vundamendi \n" +
        "1 ; L0 J crd C; Li V main indic impf ps3 sg ps af; L0 A pos sg nom; ; ja oli aus \n" +
        "1 ; Lid V aux indic impf ps2 sg ps af; L0 J crd C; Ld P pers ps1 sg part; ; olid ja mind \n" +
        "1 ; L0 S com sg nom; L0 S prop sg nom; Lnud V main partic past ps; ; Uustalu Jaagup rääkinud \n" +
        "1 ; Lga S com sg kom; L0 A pos sg gen; Lnud V main partic past ps; ; veega vitse kastnud \n" +
        "1 ; L0 J crd; L0 S prop sg gen; L0 S com sg nom; ; ja Harpe teener \n" +
        "1 ; L0 A pos partic; L0 S com sg nom; Ls S com sg in; ; olnud sant mees \n" +
        "1 ; L0 S com sg gen; Lnud V main partic past ps; L0 S com sg part; ; härra saanud aru \n" +
        "1 ; L0 P dem sg nom; Lnud V main partic past ps; L0 S com sg part; ; See saanud aru \n" +
        "1 ; L0 A comp sg nom; L0 P pers ps3 sg nom; Lnud V main partic past ps; ; ennem ta surnud \n" +
        "1 ; L0 V main indic pres ps3 sg ps af; L0 N card sg nom; L0 S com sg part; ; on 9-10 kuli \n" +
        "1 ; Ls S com sg in; L0 V main indic pres ps3 pl ps af; Ld A pos pl nom; ; laanes on vanaaegsed \n" +
        "1 ; L0 J crd; Ll P dem sg ad; Ll S com sg ad; ; Aga sel ajal \n" +
        "1 ; Ll S com sg ad; Li S com pl part; Lta V main inf; ; kombel inimesi peksta \n" +
        "1 ; Ll P pers ps3 sg ad; Ld S com pl nom; Lst S com sg el; ; tal riided seljast \n" +
        "1 ; L0 S com sg part; Li V main indic impf ps3 sg ps af; Ll P pers ps3 sg ad; ; Raha oli tal \n" +
        "1 ; L0 P pers ps3 sg nom; Lnud V main partic past ps; L0 S prop sg gen; ; tema müünud Veemi \n" +
        "1 ; L0 S com sg nom; Li V aux indic impf ps3 sg ps af; L0 A pos sg nom; ; Pagu oli hea \n" +
        "1 ; L0 P dem sg nom; L0 P pers ps2 sg gen; L0 S com sg nom; ; see sinu asi \n" +
        "1 ; Lda P inter rel sg part; L0 A pos sg part; L0 S com sg part; ; mida vana Pagu \n" +
        "1 ; L0 A pos; Lle S com sg all; Lma V main sup ps ill; ; läinud härrale kaebama \n" +
        "1 ; L0 A pos partic; Ltest P dem pl el; L0 A comp sg nom; ; olnud teistest väiksem \n" +
        "1 ; Li V main indic impf ps3 sg ps af; L0 P dem sg nom; L0 S com sg nom; ; oli niisugune mees \n" +
        "1 ; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; L0 P dem sg nom; ; Pago oli niisugune \n" +
        "1 ; L0 A pos partic; L0 P pos det refl sg gen; L0 N card sg nom; ; mõistnud oma 15 \n" +
        "1 ; L0 S prop sg nom; L0 A pos partic; L0 P dem sg adit; ; Joosep toonud teise \n" +
        "1 ; Li V main indic impf ps3 sg ps af; L0 A pos sg nom; L0 A pos sg nom; ; oli noor lahke \n" +
        "1 ; L0 S com sg part; Lda V main inf; Lnud V main partic past ps; ; koolimaja ehitada lasknud \n" +
        "1 ; L0 S com sg gen; L0 S com sg adit; La V main inf; ; surnuaia koju minna \n" +
        "1 ; Lda P dem sg part; L0 S com sg part; Li V main indic impf ps3 sg ps af; ; seda mütsi nägi \n" +
        "1 ; L0 S prop sg gen; Ld S com pl nom; Lma V main sup ps ill; ; Harpe pannud karjuma \n" +
        "1 ; L0 J sub; L0 S com sg nom; Lb V main indic pres ps3 sg ps af; ; et vald tarvitab \n" +
        "1 ; L0 S com sg nom; Lnud V main partic past ps; Lt A pos sg part; ; Rahvas võtnud uut \n" +
        "1 ; L0 P inter rel sg nom; Ls S com sg in; L0 P pers ps1 sg nom; ; mis mees mina \n" +
        "1 ; L0 S com sg nom; Ls V main indic impf ps3 sg ps af; L0 A pos partic; ; Proua päris kasvatanud \n" +
        "1 ; L0 S com sg nom; Lnud V main partic past ps; L0 J crd; ; Piim olnud aga \n" +
        "1 ; L0 S com sg gen; L0 K post; L0 A pos partic; ; Kesköö ajal tõusnud \n" +
        "1 ; Lnud V main partic past ps; Lsse S com sg ill; L0 J crd; ; kaevanud kohtusse ja \n" +
        "1 ; L0 S com sg nom; L0 S prop sg gen; L0 K post; ; mõis Henningi käes \n" +
        "1 ; L0 S prop sg nom; L0 S com sg nom; L0 S prop sg nom; ; Ernst von Bremen \n" +
        "1 ; L0 J sub; Lb V main indic pres ps3 sg ps af; Lst S com sg el; ; et saab mõisast \n" +
        "1 ; L0 J sub; Lda P pers ps3 sg part; Lks S com sg tr; ; et teda vaimuks \n" +
        "1 ; L0 S com sg gen; L0 K post; L0 P pers ps3 sg gen; ; asja pärast tema \n" +
        "1 ; Ls V main indic impf ps3 sg ps af; L0 P pos det refl sg gen; L0 S com sg gen; ; kaotas oma varanduse \n" +
        "1 ; Lnud V main partic past ps; Ls S prop sg in; Lks S com sg tr; ; olnud Riias kuberneriks \n" +
        "1 ; Lt A pos sg part; L0 S com sg part; Le S com pl part; ; andvat ühtehinge palke \n" +
        "1 ; L0 J sub; L0 A pos sg nom; L0 S com sg nom; ; nagu must vari \n" +
        "1 ; Lnud V mod indic impf ps neg; L0 S com sg nom; L0 P pos det refl sg gen; ; tohtinud tööinimene oma \n" +
        "1 ; L0 S com sg gen; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; ; mõisa Essen oli \n" +
        "1 ; L0 J sub; Lst S com sg el; Le S com pl part; ; Kui mõisast ehituspalke \n" +
        "1 ; L0 V main indic pres ps3 sg ps af; L0 A pos sg nom; L0 S com sg nom; ; on tore piim \n" +
        "1 ; L0 J sub; L0 S com sg nom; L0 J crd; ; et vaim ja \n" +
        "1 ; Lnud V main partic past ps; L0 P pers ps3 sg nom; Lks N card sg tr l; ; mõistnud tema kolmeks \n" +
        "1 ; L0 A pos sg nom; L0 S com sg gen; Ltes S com pl in; ; hea härra pükstes \n" +
        "1 ; Lvat V aux quot pres ps af; L0 N card sg nom l; Ld S com sg part; ; olevat kolm ööd \n" +
        "1 ; L0 J sub; L0 S com sg nom; Lda P dem sg part; ; kui rahvas seda \n" +
        "1 ; Ll N ord sg ad l; L0 J crd; Ll N ord sg ad l; ; Teisel ja kolmandal \n" +
        "1 ; Lga S com sg kom; Ltud V main partic past imps; L0 J crd; ; kaleviga ehitud ja \n" +
        "1 ; L0 S prop sg gen; L0 S com sg nom; Lnudki V main partic past ps; ; Salla teener toonudki \n" +
        "1 ; Ld A pos sg part; Lt S com sg part; L0 A pos partic; ; head härrat elanud \n" +
        "1 ; Ll S com sg ad; L0 A pos partic; L0 P pos det refl sg gen; ; ajal ehitanud oma \n" +
        "1 ; L0 A pos partic; L0 S com sg gen; L0 J crd; ; Pööranud selja ja \n" +
        "1 ; L0 P pos det refl sg gen; Lid S com pl part; Lle S com sg all; ; oma riideid rohule \n" +
        "1 ; L0 J sub; Lst S com sg el; L0 V aux indic pres ps neg; ; sest asjast pole \n" +
        "1 ; Lnud V main partic past ps; Lle P pers ps3 sg all; L0 A pos sg gen; ; andnud temale suure \n" +
        "1 ; L0 A pos sg nom; L0 S com sg nom; Ltud V main partic past imps; ; vana sant maetud \n" +
        "1 ; Lnud V main partic past ps; L0 P pos det refl sg gen; L0 S com sg gen; ; visanud oma laabroki \n" +
        "1 ; L0 S com sg nom; Lga S com sg kom; L0 S prop sg nom; ; Poesell nimega Dahvid \n" +
        "1 ; Ld S com pl nom; L0 A pos partic; L0 P det pl nom; ; lugejad jooksnud kõik \n" +
        "1 ; L0 S com sg gen; L0 J crd; L0 A pos partic; ; selja ja ütelnud \n" +
        "1 ; L0 P inter rel sg nom; L0 P dem sg nom; L0 P pers ps2 sg gen; ; Mis see sinu \n" +
        "1 ; L0 J sub; L0 P pers ps3 sg gen; Lle S prop sg all; ; Kui ta Suure-Tammikule \n" +
        "1 ; Li V main indic impf ps3 sg ps af; Llt P pers ps3 sg abl; L0 P det sg part; ; sai temalt kõike \n" +
        "1 ; Ld S com pl nom; L0 N card sg nom; L0 S com sg part; ; mõistnud 15 hoopi \n" +
        "1 ; L0 V main imper pres ps2 sg ps af; L0 J crd; Ld S com pl nom; ; õhku ja veerenud \n" +
        "1 ; L0 S com sg nom; Lnudki V main partic past ps; Lsse S prop sg ill; ; Tamm jäänudki Sallasse \n" +
        "1 ; L0 P indef sg nom; L0 S com sg part; La V main inf; ; mitu korda käia \n" +
        "1 ; L0 S prop sg nom; Li V main indic impf ps3 sg ps af; Lde S com pl gen; ; Essen oli talude";
    }

    if ( searchForm.isWordtypeAnalysis() && !searchForm.isSyntacticAnalysis() && !searchForm.isMorfoAnalysis() )
    {
      return "7 ; _S_; _S_; _S_; ; X-linna Kutsekooli erialaainete ; Kutsekooli erialaainete osakonna ; erialaainete osakonna juhatajana ; osakonna juhatajana Kutsekoolis ; erialaainete osakonna juhatajana ; keskkooli lõpetamist Õhtuosakonnas ; töö noor õpetajatega \n" +
        "4 ; _S_; _A_; _S_; ; Tallina Polütehniline instituut ; päevaosakonnas õppivad lapsi ; lapsi pärast põhikooli ; Õhtuosakonnas õppivad mehed \n" +
        "4 ; _P_; _V_; _S_; ; Ma töötan X-linna ; ma töötasin elektrotehnika ; kes vajavad täiendõpetamisesse ; Ma lähen tööle \n" +
        "4 ; _S_; _P_; _V_; ; Kutsekoolis ma töötan ; aastat ma töötasin ; tööle ma sattusin ; naised kes töötab \n" +
        "3 ; _S_; _S_; _P_; ; juhatajana Kutsekoolis ma ; osakonna juhatajana Sellele ; noor õpetajatega Minu \n" +
        "3 ; _V_; _S_; _S_; ; töötan X-linna Kutsekooli ; töötan erialaainete osakonna ; lähen tööle kell \n" +
        "3 ; _S_; _J_; _S_; ; elektrotehnika ja arvutiõpetuse ; põhikooli ja keskkooli ; mehed ja naised \n" +
        "3 ; _S_; _V_; _S_; ; aastat töötan erialaainete ; töökohustused on õppetöökorraldamine ; tunde juhtima kontroll \n" +
        "2 ; _A_; _S_; _V_; ; peamised töökohustused on ; tavaline päev seisab \n" +
        "2 ; _S_; _S_; _A_; ; kutsekooli päevaosakonnas õppivad ; lõpetamist Õhtuosakonnas õppivad \n" +
        "2 ; _J_; _S_; _S_; ; ja arvutiõpetuse õpetajana ; ja keskkooli lõpetamist \n" +
        "2 ; _S_; _P_; _S_; ; juhatajana Sellele tööle ; instituut Meie kutsekooli \n" +
        "2 ; _A_; _S_; _J_; ; pärast põhikooli ja ; õppivad mehed ja \n" +
        "2 ; _S_; _P_; _A_; ; täiendõpetamisesse Minu peamised ; õpetajatega Minu tavaline \n" +
        "2 ; _A_; _S_; _S_; ; uue õppekavade töötlemine ; metoodiline töö noor \n" +
        "2 ; _N_; _N_; _S_; ; kakskümmend neli aastat ; Kakskümmend üks aastat \n" +
        "2 ; _P_; _A_; _S_; ; Minu peamised töökohustused ; Minu tavaline päev \n" +
        "1 ; _P_; _V_; _N_; ; ma töötan kakskümmend \n" +
        "1 ; _N_; _S_; _N_; ; neli aastat Kakskümmend \n" +
        "1 ; _V_; _N_; _N_; ; töötan kakskümmend neli \n" +
        "1 ; _P_; _V_; _P_; ; kes töötab mitmesuguste \n" +
        "1 ; _V_; _S_; _J_; ; töötasin elektrotehnika ja \n" +
        "1 ; _S_; _V_; _A_; ; päev seisab järgmisest \n" +
        "1 ; _V_; _S_; _P_; ; vajavad täiendõpetamisesse Minu \n" +
        "1 ; _S_; _S_; _N_; ; tööle kell kaheksa \n" +
        "1 ; _S_; _J_; _N_; ; õpetajana ja kolm \n" +
        "1 ; _S_; _J_; _P_; ; ettevõtetes ja kes \n" +
        "1 ; _V_; _J_; _V_; ; sattusin kui lõpetasin \n" +
        "1 ; _V_; _A_; _S_; ; seisab järgmisest osast \n" +
        "1 ; _V_; _P_; _S_; ; töötab mitmesuguste ettevõtetes \n" +
        "1 ; _V_; _S_; _A_; ; lõpetasin Tallina Polütehniline \n" +
        "1 ; _P_; _S_; _P_; ; Sellele tööle ma \n" +
        "1 ; _A_; _S_; _P_; ; Polütehniline instituut Meie \n" +
        "1 ; _N_; _S_; _V_; ; kolm aastat töötan \n" +
        "1 ; _P_; _S_; _J_; ; mitmesuguste ettevõtetes ja \n" +
        "1 ; _P_; _S_; _S_; ; Meie kutsekooli päevaosakonnas \n" +
        "1 ; _J_; _P_; _V_; ; ja kes vajavad \n" +
        "1 ; _J_; _S_; _P_; ; ja naised kes \n" +
        "1 ; _P_; _V_; _J_; ; ma sattusin kui \n" +
        "1 ; _S_; _N_; _N_; ; aastat Kakskümmend üks \n" +
        "1 ; _S_; _S_; _J_; ; arvutiõpetuse õpetajana ja \n" +
        "1 ; _J_; _N_; _S_; ; ja kolm aastat \n" +
        "1 ; _J_; _V_; _S_; ; kui lõpetasin Tallina \n" +
        "1 ; _A_; _S_; _A_; ; õppivad lapsi pärast \n" +
        "1 ; _N_; _S_; _P_; ; üks aastat ma";
    }
    // ProcessBuilder clusteringProcess = new ProcessBuilder("python", "cluster_helper.py", "-f", markedTextFile, clusteringParams);
    // clusteringProcess.directory(new File("clusterfinder/src/main/resources/scripts").getAbsoluteFile());
    return "9 ; @NN>; @SUBJ; @FMV; ; Meie härra on ; kohtuistumise tool on ; Avanduse mõis oli ; Venevere rentnik oli ; mõisa Essen oli ; sinu asi on ; Kuberneriproua Essen oli ; õpetaja eluruumid tulevad ; Edru küla käib \n" +
      "8 ; @NN>; @NN>; @SUBJ; ; Salla von Harpe ; tema kohtuistumise tool ; venna Konstantini poeg ; Võivere härra Pagu ; Rahkla Miilingu rist ; Tammiku mõisa Essen ; see sinu asi ; Lasinurme härra Stakelberg \n" +
      "8 ; @NN>; @P>; @ADVL; ; Avanduse vallamaja ees ; tema matuse ajal ; Pagude kabeli juures ; Pagude kabeli juurest ; talude müümise ajal ; oma plaani järele ; oma plaani järele ; ühe kindrali käes \n" +
      "7 ; @NN>; @SUBJ; @ADVL; ; Jutustaja lell läinud ; Miilingu rist kukkunud ; Tammiku vanaproua olnud ; Üks muna olnud ; Tammiku proua olnud ; Uustalu Jaagup rääkinud ; Lasinurme Stakelberg lasknud \n" +
      "7 ; @FMV; @AN>; @SUBJ; ; oli aus mees ; on tore piim ; Hirmus kuri mees ; oli hirmus mees ; hirmus tige mees ; hirmus must inimene ; hulkus mööda tuba \n" +
      "6 ; @P>; @ADVL; @FMV; ; Tema ette tuli ; Vallarahva vastu oli ; Bremeni järele tuli ; Viinaköögi kõrval oli ; tema järel jookseb ; kabeli juurest hakkas \n" +
      "6 ; @SUBJ; @FCV; @IMV; ; sell pole teretanud ; tema pole näinud ; see peab tähendama ; keegi pole julgenud ; muud pole olnud ; tema pole teinud \n" +
      "5 ; @ADVL; @FMV; @SUBJ; ; nõrkuseks oli kaardimäng ; kõrval oli puukamber ; üks kohtus käimine ; mõisas olid Baerid ; temalgi on 9-10 \n" +
      "5 ; @P>; @ADVL; @IMV; ; naha peale anda ; vallamaja ees suitsetada ; teise juures lugenud ; vahi alla võtta ; enda juurde kutsuda \n" +
      "5 ; @SUBJ; @FMV; @ADVL; ; haagikohtunik oli poolhullu ; see sai temalt ; Raha oli tal ; Proua päris kasvatanud ; Härra tuli põllule \n" +
      "5 ; @AN>; @P>; @ADVL; ; praeguse meierei asemel ; olnud tee ääres ; suure tooli peal ; läinud abiellumise teel ; uue maja peale \n" +
      "5 ; @J; @ADVL; @FMV; ; ja kogu aja ; ja lilli oli ; kui üks kohtus ; et viljas on ; et temalgi on \n" +
      "5 ; @SUBJ; @FMV; @AN>; ; tema on lühikese ; Maamõõtja jagas 1885. ; Bremen tuleb neljandal ; See oli noor ; sa hirmus must \n" +
      "4 ; @ADVL; @J; @ADVL @IMV; ; poest ja tahtnud ; lugenud ja palunud ; kohtusse ja saanud ; käes ja küsinud \n" +
      "4 ; @NN>; @ADVL; @FMV; ; Salla laanes on ; tema nõrkuseks oli ; Piibe mõisas olid ; tema jutule mindi \n" +
      "4 ; @ADVL; @NN>; @OBJ; ; saatnud jutustaja venna ; visanud oma laabroki ; tervitanud mõisa rahvast ; sellest tema aru \n" +
      "4 ; @J; @SUBJ; @FCV; ; aga sell pole ; Aga Dahvid pole ; et tema pole ; aga keegi pole \n" +
      "4 ; @FMV; @AN>; @ADVL; ; on lühikese nägemisega ; jagas 1885. aastal ; tuleb neljandal õhtul ; lasi armetul kombel \n" +
      "4 ; @J; @SUBJ; @FMV; ; Kui tema sõitis ; et kes tuleb ; et see jäägu ; et vald tarvitab \n" +
      "4 ; @SUBJ; @FMV; @PRD; ; See oli vanapoiss ; rentnik oli ta ; mina olen keiser ; Mina olen Huen \n" +
      "4 ; @SUBJ; @FMV; @NN>; ; see kaotas oma ; Essen oli talude ; tamm kasvab Salla ; see on sinu \n" +
      "4 ; @FMV; @P>; @ADVL; ; annavad nahatäie kätte ; näeb kabeli ligidal ; oli ukse küljes ; Olid rahva vastu \n" +
      "3 ; @ADVL; @AN>; @SUBJ; ; olnud suur haagrehtikohus ; hakanud vana Pagu ; Eluajal olnud sant \n" +
      "3 ; @AN>; @NN>; @ADVL @<NN; ; mõistnud oma 15 ; kahmanud pingi pihku ; elanud Piibe mõisas \n" +
      "3 ; @ADVL; @AN>; @ADVL; ; Mõisas olnud kutsariks ; ajal tõusnud puusärk ; pärast tulnud tal \n" +
      "3 ; @IMV; @NN>; @OBJ; ; teadnud neid kombeid ; julgenud seda vastutust ; kinkinud maja aluse \n" +
      "3 ; @NN>; @SUBJ @OBJ; @ADVL; ; Harpe teener öelnud ; Harpe hobuseid lugemas ; Harpe pannud karjuma \n" +
      "3 ; @J; @AN>; @NN>; ; aga mõistnud oma ; ja visanud selle ; ja vana Avanduse \n" +
      "3 ; @SUBJ; @FMV; @OBJ; ; Harpe tahtis kummardamist ; Bremen mõistis krahvi ; Huen lasi teda \n" +
      "3 ; @SUBJ; @ADVL; @OBJ; ; Kuberner peksnud inimesi ; Stakelberg lasknud end ; See saanud aru \n" +
      "3 ; @SUBJ; @ADVL @IMV; @NN>; ; teener toonudki härra ; tema müünud Veemi ; see olnudki see \n" +
      "3 ; @AN>; @NN>; @<NN @ADVL; ; hea härra pükstes ; olnud oma eluajal ; mööda linna ringi \n" +
      "3 ; @OBJ; @J; @ADVL @IMV; ; kõhtu ja öelnud ; risti ja hakanud ; seda ja lasknud \n" +
      "3 ; @P>; @ADVL; @ADVL; ; sellest hoolimata hakanud ; plaani järele vundamendi ; rahva vastu olnud \n" +
      "3 ; @AN>; @ADVL; @OBJ; ; 1885. aastal talumaad ; armetul kombel inimesi ; väikese kivimaja ehitada \n" +
      "3 ; @FCV; @IMV; @NN>; ; pole teadnud neid ; pole julgenud seda ; Pole olnud niisugust \n" +
      "3 ; @J; @AN>; @ADVL; ; ja kolmandal õhtul ; ja suitsetanud paberossi ; ja ütelnud peksjaile \n" +
      "3 ; @ADVL; @FMV; @NN>; ; järele tuli tema ; sel oli oma ; Tal olid Salla \n" +
      "3 ; @AN>; @ADVL; @FMV; ; Esimesel õhtul on ; tõusnud puusärk õhku ; tuleval aastal tervitab \n" +
      "3 ; @P>; @ADVL; @NN>; ; müümise ajal Tammiku ; abiellumise teel ühele ; asja pärast tema \n" +
      "3 ; @NN>; @OBJ; @ADVL; ; Ema öelnud selle ; seda vastutust endale ; Jutustaja isa öelnud \n" +
      "3 ; @P>; @ADVL; @J; ; kabeli juures ja ; hobuste kõrval ja ; muna käes ja \n" +
      "3 ; @J; @AN>; @SUBJ @OBJ; ; et küpsetatud silgud ; et paremat otsi ; ja lahutanud majad \n" +
      "3 ; @ADVL @<NN; @J; @ADVL; ; pihku ja sellega ; rohule ega puuoksa ; must kui koeral \n" +
      "3 ; @J; @J; @SUBJ; ; aga sest saadik ; aga või tema ; et kui mulgid \n" +
      "3 ; @NN>; @SUBJ; @AN>; ; härra Pagu ajanud ; Joala Joosep toonud ; Koila mõis läinud \n" +
      "3 ; @SUBJ; @ADVL; @ADVL; ; Mees jäänudki peksust ; muna olnud teistest ; Tamm jäänudki Sallasse \n" +
      "3 ; @FMV; @OBJ; @OBJ; ; mõistis krahvi meelitada ; taha kopikat anda ; taha seda näha \n" +
      "3 ; @AN>; @SUBJ; @<NN @ADVL; ; vana Pagu kodus ; olnud sant mees ; mööda tuba ringi \n" +
      "3 ; @ADVL; @AN>; @OBJ; ; mõisalastele suure jõulupuu ; võtnud uut mõisnikku ; ajal näidanud end \n" +
      "3 ; @OBJ; @NEG; @FMV; ; mind ei teretanud ; aru ei saa ; otsust ei teinud \n" +
      "3 ; @SUBJ; @AN>; @ADVL @<NN; ; Pagu ajanud surnuaial ; suulagi olnud must ; Tedrekull ostnud sellelt \n" +
      "3 ; @ADVL; @NN>; @ADVL @<NN; ; Kudunud sellele lapsele ; Jutustajal oma isaga ; mehed sel ajal \n" +
      "3 ; @NN>; @SUBJ; @FCV; ; Maamõõtja nimi oli ; Võivere Pagu oli ; härra Stakelberg oli \n" +
      "3 ; @ADVL; @NN>; @SUBJ; ; härral kõik kaelavahe ; Olnud niisugune seadus ; Olnud teine niisugene \n" +
      "3 ; @J; @NN>; @SUBJ; ; ja Padu Kooli-Juhan ; ja Tammiku mõisad ; et õpetaja eluruumid \n" +
      "3 ; @J; @NN>; @ADVL; ; et soldati sauna ; Kui ta Suure-Tammikule ; Aga sel ajal \n" +
      "3 ; @FMV; @NN>; @SUBJ; ; Oli keisri kammerhärra ; oli oma sada ; oli niisugune mees \n" +
      "3 ; @AN>; @SUBJ; @FMV; ; omaaegne haagikohtunik oli ; Vana Essen oli ; uhke tamm kasvab \n" +
      "2 ; @J; @FMV; @SUBJ; ; ja ostis Porkuni ; et polnud viljaseemet \n" +
      "2 ; @J; @SUBJ; @NN>; ; kui rahvas seda ; või tema seda \n" +
      "2 ; @J; @OBJ @SUBJ; @ADVL; ; et teda vaimuks ; ja kukkunud paluma \n" +
      "2 ; @AN>; @SUBJ; @J; ; uus alus ja ; suur tüli ja \n" +
      "2 ; @IMV; @J; @NN>; ; kõnelema ja Harpe ; kärisenud ja kapi \n" +
      "2 ; @AN>; @AN>; @SUBJ; ; Vana uhke tamm ; olnud hea mees \n" +
      "2 ; @ADVL; @ADVL; @ADVL; ; sellega veheldes pääsenud ; olnud teistest väiksem \n" +
      "2 ; @PRD; @J; @ADVL @IMV; ; haige ja jäänudki ; mees ja uidanud \n" +
      "2 ; @J; @SUBJ; @ADVL @<NN; ; Kui proua sulle ; ja kiskund omal \n" +
      "2 ; @ADVL; @FMV; @OBJ; ; juurest hakkas teda ; Endine tee käinud \n" +
      "2 ; @ADVL; @OBJ; @ADVL; ; läinud neid peksma ; käskinud seda mõisa \n" +
      "2 ; @J; @ADVL; @NN>; ; ja mehed sel ; aga sellest tema \n" +
      "2 ; @NN>; @OBJ; @FMV; ; seda mütsi nägi ; neid majasid ehitatakse \n" +
      "2 ; @NN>; @ADVL @<NN; @ADVL; ; Laane kõrtsis olnud ; oma isaga olnud \n" +
      "2 ; @AN>; @NN>; @J; ; Vana Jenk ja ; Pööranud selja ja \n" +
      "2 ; @J; @SUBJ; @AN>; ; ja suulagi olnud ; ja ehitanud uue \n" +
      "2 ; @OBJ @SUBJ; @AN>; @NN>; ; venelased sugenud Harpe ; Mehed läinud neid \n" +
      "2 ; @AN>; @ADVL @<NN; @J; ; seal kõrval ja ; olnud must kui \n" +
      "2 ; @ADVL; @ADVL; @IMV; ; veega vitse kastnud ; saanud sellest teada \n" +
      "2 ; @NN> @ADVL; @OBJ; @J; ; kätega kõhtu ja ; mõisast söögi ja \n" +
      "2 ; @ADVL; @OBJ; @AN>; ; ajal kõik musta ; peksnud inimesi koledal \n" +
      "2 ; @ADVL; @FMV; @J; ; järel jookseb nagu ; puusärk õhku ja \n" +
      "2 ; @J; @P>; @ADVL; ; Aga sellest hoolimata ; ja Rohu vahel \n" +
      "2 ; @SUBJ; @NN>; @OBJ; ; rahvas seda mütsi ; tööinimene oma riideid \n" +
      "2 ; @J; @SUBJ; @ADVL @IMV; ; aga vanarahvas kõnelnud ; sest tema müünud \n" +
      "2 ; @SUBJ; @FCV; @PRD; ; Zoege oli haagreht ; see on varas \n" +
      "2 ; @J; @NN>; @SUBJ @OBJ; ; ja Harpe teener ; ja kapi uksed \n" +
      "2 ; @FMV; @OBJ; @SUBJ; ; hakkas teda vaim ; tahtis öelda pruut \n" +
      "2 ; @ADVL @IMV; @ADVL; @IMV; ; tahtnud jooksma panna ; viinud prouale näha \n" +
      "2 ; @ADVL; @J; @AN>; ; vihastanud ja visanud ; juures ja suitsetanud \n" +
      "2 ; @ADVL; @AN>; @NN>; ; päeval tulnud Dahvidile ; temale suure kääru \n" +
      "2 ; @J; @AN>; @SUBJ; ; aga õige paks ; nagu must vari \n" +
      "2 ; @J; @FMV; @AN>; ; ja oli aus ; ja hulkus mööda \n" +
      "2 ; @ADVL; @FMV; @ADVL; ; õhtul on laual ; mõisa mune viima \n" +
      "2 ; @SUBJ; @J; @FMV; ; lauda ja ütleb ; Salla ja ostis \n" +
      "2 ; @FMV; @AN>; @NN> @ADVL; ; Kandis musta mütsi ; ajab tulisest suust \n" +
      "2 ; @J; @SUBJ; @<NN @ADVL; ; ja rinnaesine hapupiima ; et tamm Tammikus \n" +
      "2 ; @ADVL @IMV; @NN>; @OBJ; ; haaranud pingi pihku ; saanud härra õiguse \n" +
      "2 ; @AN>; @NN> @ADVL; @SUBJ; ; evangeelse luteriusu kool ; vana õpetaja Pauker \n" +
      "2 ; @NN> @SUBJ; @ADVL @<NN; @ADVL; ; Riiamaa mees läinud ; Riiamaa mees läinudki \n" +
      "2 ; @SUBJ @OBJ; @ADVL; @OBJ; ; See läinud neid ; Huen lasknud teda \n" +
      "2 ; @ADVL @IMV; @IMV; @J; ; hakanud kõnelema ja ; hakanud naerma ja \n" +
      "2 ; @SUBJ; @J; @SUBJ; ; kaelavahe ja nägu ; nägu ja rinnaesine \n" +
      "2 ; @ADVL; @AN>; @SUBJ @PRD; ; olnud kole inimene ; olnud tige mees \n" +
      "2 ; @OBJ; @AN>; @<NN @ADVL; ; inimesi koledal kombel ; mõisnikku suure pidulikkusega \n" +
      "2 ; @OBJ; @ADVL; @OBJ; ; teda kabeliaeda vedada ; vastutust endale võtta \n" +
      "2 ; @SUBJ; @AN>; @P>; ; mõis läinud abiellumise ; ehitanud uue maja \n" +
      "2 ; @ADVL; @P>; @ADVL; ; olnud selle üle ; Seisnud ukse juures \n" +
      "2 ; @SUBJ @OBJ; @J; @OBJ; ; võtnud aga brauningu ; insenere ja tarku \n" +
      "2 ; @NEG; @FMV; @OBJ; ; ei taha kopikat ; ei taha seda \n" +
      "2 ; @J; @NN>; @SUBJ @ADVL; ; Kui Rahkla Miiling ; Kui Rahkla Miiling \n" +
      "2 ; @AN>; @OBJ; @NN>; ; vana Pagu meeste ; näidanud end sellele \n" +
      "2 ; @J; @ADVL @IMV; @NN> @ADVL; ; et hoidnud kätega ; ja uidanud valeriietes \n" +
      "2 ; @J; @ADVL @IMV; @OBJ; ; ja hakanud Issameiet ; ja saanud õiguse \n" +
      "2 ; @FCV; @IMV; @OBJ; ; pole teretanud Harpet ; on nähtud naharibasid \n" +
      "2 ; @NN>; @NN> @SUBJ; @ADVL @<NN; ; Üks Riiamaa mees ; See Riiamaa mees \n" +
      "2 ; @ADVL @IMV; @J; @ADVL @IMV; ; jonninud ja lõhkunudki ; kärkinud ja hüüdnud \n" +
      "2 ; @FMV; @J; @FMV; ; lähed ja suitsetad ; tulge kui tahate \n" +
      "2 ; @SUBJ; @FCV; @ADVL; ; Dahvid pole sellest ; nimi oli Joa \n" +
      "2 ; @NN>; @J; @AN>; ; Harpe aga mõistnud ; selja ja ütelnud \n" +
      "2 ; @SUBJ; @AN>; @NN>; ; Dahvid kahmanud pingi ; Joosep toonud teise \n" +
      "2 ; @NN> @ADVL; @P>; @<KN @ADVL; ; Riias tema asemel ; otsesihis rukkist läbi \n" +
      "2 ; @NN>; @<NN @ADVL; @FMV; ; tema jutule tuli ; oma eluajal hirmus \n" +
      "2 ; @NN>; @SUBJ; @J; ; kõik kaelavahe ja ; Rahkla Miiling ja \n" +
      "2 ; @ADVL; @SUBJ; @OBJ; ; pannud käed risti ; tahtnud ta tamme \n" +
      "2 ; @P>; @ADVL; @OBJ; ; matuse ajal kõik ; kabeli ligidal kedagi \n" +
      "2 ; @AN>; @NN>; @SUBJ; ; tulnud Dahvidile kiri ; Noor Võivere Pagu \n" +
      "2 ; @OBJ; @ADVL; @OBJ @SUBJ; ; Harpe lasknud mehed ; See lasknud teda \n" +
      "2 ; @ADVL; @NEG; @FCV; ; sauna ei tohi ; töötades ei tohtinud \n" +
      "2 ; @ADVL; @J; @ADVL; ; toas ja aluspükstes ; söönud ja kogu \n" +
      "2 ; @AN>; @OBJ; @AN>; ; uut mõisnikku suure ; head härrat elanud \n" +
      "2 ; @SUBJ; @ADVL; @NN>; ; See visanud oma ; Papen tervitanud mõisa \n" +
      "2 ; @ADVL; @NN>; @ADVL; ; teel ühele umbvenelasele ; pärast tema jutule \n" +
      "2 ; @NN>; @ADVL @<NN; @AN>; ; oma toas suure ; sel ajal ehitanud \n" +
      "2 ; @J; @ADVL @IMV; @ADVL; ; ja viinud prouale ; et andnud temale \n" +
      "2 ; @J; @ADVL; @ADVL; ; ja sellega veheldes ; kui koju tulnud \n" +
      "2 ; @ADVL; @ADVL; @J; ; tulnud poest ja ; kaevanud kohtusse ja \n" +
      "2 ; @AN>; @ADVL; @SUBJ; ; neljandal õhtul lauda ; olnud kutsariks keegi \n" +
      "2 ; @SUBJ; @ADVL; @AN>; ; vanaproua olnud kitsi ; Rahvas võtnud uut \n" +
      "2 ; @NN>; @<NN @ADVL; @OBJ; ; surnuaia koju minna ; meeste seljast võtta \n" +
      "2 ; @FCV; @OBJ; @IMV; ; pidid kraavi minema ; oli nekruteid peksnud \n" +
      "2 ; @SUBJ; @FMV; @NN> @ADVL; ; Essen oli Riias ; Essen oli Riias \n" +
      "2 ; @P>; @ADVL; @AN>; ; Kesköö ajal tõusnud ; Selle pärast tulnud \n" +
      "2 ; @NN>; @J; @NN>; ; Jenk ja Padu ; Mõisamaa ja Tammiku \n" +
      "2 ; @SUBJ; @NEG; @FMV; ; Jutustaja ei tea ; Mina ei taha \n" +
      "1 ; @NN> @ADVL; @J; @<NN @ADVL; ; ihupesuni ja hõbelauanõudeni \n" +
      "1 ; @<NN @ADVL; @<KN @ADVL; @J; ; teisele poole ja \n" +
      "1 ; @NN> @ADVL; @NN> @ADVL; @NN> @<NN @ADVL @SUBJ; ; Tammiku proua Salla \n" +
      "1 ; @AN>; @ADVL; @J; ; pimedas toas ja \n" +
      "1 ; @NN>; @OBJ @PRD; @J; ; härra püksid ja \n" +
      "1 ; @PRD; @J; @OBJ; ; pikk ja ennast \n" +
      "1 ; @FCV; @AN>; @ADVL; ; oli soolase veega \n" +
      "1 ; @OBJ @SUBJ; @AN>; @OBJ @<NN; ; Virtin võtnud munad \n" +
      "1 ; @ADVL; @<Q; @IMV; ; kolm ööd valvatud \n" +
      "1 ; @IMV; @NN>; @P>; ; keelatud Avanduse vallamaja \n" +
      "1 ; @FCV; @J; @OBJ; ; olid ja mind \n" +
      "1 ; @J; @ADVL @AN>; @P>; ; ja läinud kuberneri \n" +
      "1 ; @AN>; @NN>; @NN> @OBJ; ; visanud selle hapupiima \n" +
      "1 ; @ADVL @PRD; @P>; @ADVL; ; väikest muna käes \n" +
      "1 ; @J; @OBJ; @ADVL; ; kui saia andnud \n" +
      "1 ; @FMV; @AN>; @PRD @ADVL @SUBJ; ; oli terve mägi \n" +
      "1 ; @J; @<NN @SUBJ @OBJ; @ADVL; ; ja pistnud jooksma \n" +
      "1 ; @OBJ @ADVL; @FMV; @ADVL; ; ehituspalke mindi saama \n" +
      "1 ; @NN>; @ADVL; @OBJ; ; ta Suure-Tammikule koolimaja \n" +
      "1 ; @SUBJ; @<NN @ADVL; @IMV; ; Pagu kodus käima \n" +
      "1 ; @ADVL @<NN; @OBJ; @NN> @<NN @ADVL; ; meestele vilja magasiaidast \n" +
      "1 ; @FMV; @ADVL @SUBJ @OBJ; @<Q; ; laskis mitu korda \n" +
      "1 ; @NN>; @AN>; @ADVL @<NN @PRD @OBJ @SUBJ; ; see väike poiss \n" +
      "1 ; @OBJ @ADVL; @IMV; @NN>; ; proua õiendanud kõik \n" +
      "1 ; @J; @NN> @SUBJ @OBJ; @AN>; ; et mis aus \n" +
      "1 ; @NN>; @ADVL @<NN; @NN>; ; Piibe mõisas üks \n" +
      "1 ; @ADVL @SUBJ; @<Q; @ADVL; ; Kolm meest hakanud \n" +
      "1 ; @SUBJ; @FCV; @AN>; ; Pagu oli hea \n" +
      "1 ; @SUBJ; @FMV; @NN> @OBJ; ; Härra laskis mäe \n" +
      "1 ; @AN>; @SUBJ; @AN>; ; väike kasutütar seisnud \n" +
      "1 ; @ADVL @<NN; @NN>; @SUBJ; ; mõisas üks härra \n" +
      "1 ; @AN>; @AN>; @NN> @<NN @ADVL; ; elanud väikeses mõisas \n" +
      "1 ; @AN>; @ADVL; @ADVL @NN> @OBJ; ; tulnud tal valla \n" +
      "1 ; @IMV; @OBJ; @ADVL; ; tahtnud teda kabeliaeda \n" +
      "1 ; @AN>; @PRD; @IMV; ; hea mees olnud \n" +
      "1 ; @OBJ; @IMV; @ADVL @IMV; ; koolimaja ehitada lasknud \n" +
      "1 ; @ADVL; @NN>; @P>; ; olnud ühe kindrali \n" +
      "1 ; @SUBJ @OBJ; @J; @<NN @SUBJ @OBJ; ; vaim ja pistnud \n" +
      "1 ; @SUBJ @OBJ; @PRD; @J; ; seda haige ja \n" +
      "1 ; @J; @OBJ; @FCV; ; et härra võiks \n" +
      "1 ; @NEG; @FCV; @IMV; ; ei tohi lõhkuda \n" +
      "1 ; @J; @SUBJ @OBJ; @ADVL @IMV; ; ja mõlemad läinud \n" +
      "1 ; @ADVL; @NN> @OBJ; @<NN @ADVL; ; kaevanud Tedrekulli kohtusse \n" +
      "1 ; @NN>; @OBJ; @ADVL @IMV; ; Rahkla Miiling tahtnud \n" +
      "1 ; @ADVL @IMV; @OBJ; @ADVL @PRD; ; hoidnud seda väikest \n" +
      "1 ; @FMV; @ADVL; @SUBJ @ADVL @PRD; ; oli tal 9-10 \n" +
      "1 ; @ADVL @IMV; @OBJ @SUBJ; @J; ; trampinud jalgu ja \n" +
      "1 ; @NN>; @NN>; @<NN @ADVL; ; Võivere mõisa keldrites \n" +
      "1 ; @NN>; @<Q; @J; ; seda karjumist ja \n" +
      "1 ; @NN>; @P>; @J; ; otsetee Kissa ja \n" +
      "1 ; @<NN @ADVL; @FMV; @AN>; ; eluajal hirmus tige \n" +
      "1 ; @J; @ADVL @OBJ; @P>; ; Kui miski asja \n" +
      "1 ; @ADVL; @OBJ; @<NN @ADVL; ; aastal talumaad mõisast \n" +
      "1 ; @J; @<NN @SUBJ; @ICV @FCV; ; aga puusärk olevat \n" +
      "1 ; @NN>; @SUBJ @OBJ; @ADVL @IMV; ; see pistnud karjuma \n" +
      "1 ; @ADVL; @NEG; @FMV; ; eest ei taha \n" +
      "1 ; @SUBJ; @ADVL @<NN; @NN> @OBJ; ; kiskund omal juukseid \n" +
      "1 ; @<NN; @J; @FMV; ; kõike ja oli \n" +
      "1 ; @J; @FMV; @ADVL; ; ja jäi hulluks \n" +
      "1 ; @OBJ; @NN>; @ADVL @<NN; ; end sellele mehele \n" +
      "1 ; @ADVL @IMV; @J; @ADVL @AN>; ; vihastanud ja läinud \n" +
      "1 ; @OBJ @PRD; @J; @SUBJ @OBJ; ; püksid ja mõlemad \n" +
      "1 ; @NN>; @ADVL @<NN; @SUBJ; ; sellele lapsele sukad \n" +
      "1 ; @OBJ; @SUBJ; @FCV; ; mis see peab \n" +
      "1 ; @SUBJ; @AN>; @OBJ; ; Normann sõimanud ristitegijat \n" +
      "1 ; @IMV; @J; @SUBJ @OBJ; ; tuua ja nahad \n" +
      "1 ; @SUBJ @<NN; @ADVL @<NN; @<Q; ; mõistnud 15 hoopi \n" +
      "1 ; @J; @SUBJ; @J; ; ja nägu ja \n" +
      "1 ; @ADVL; @OBJ @SUBJ; @ADVL @OBJ; ; lasknud mehed mõisa \n" +
      "1 ; @J; @NN>; @P>; ; et Pagude kabeli \n" +
      "1 ; @SUBJ; @PRD; @J; ; niisugene pikk ja \n" +
      "1 ; @ADVL; @SUBJ; @J; ; õhtul lauda ja \n" +
      "1 ; @ADVL; @OBJ @SUBJ; @ADVL; ; jäänud mõlemad karistamata \n" +
      "1 ; @OBJ @SUBJ; @ADVL; @SUBJ @<NN @OBJ; ; lugejad jooksnud kõik \n" +
      "1 ; @ADVL @<NN; @AN>; @NN>; ; ajal ehitanud oma \n" +
      "1 ; @<NN @ADVL; @FCV; @IMV; ; keldrites on nähtud \n" +
      "1 ; @NN> @<NN @ADVL; @SUBJ; @FMV; ; mees mina olen \n" +
      "1 ; @OBJ; @<NN; @IMV; ; poega Abrami pekstud \n" +
      "1 ; @ADVL; @OBJ @ADVL; @IMV; ; hakanud päevi nõudma \n" +
      "1 ; @NN>; @OBJ @ADVL; @SUBJ @<INFN; ; mõisa juure minna \n" +
      "1 ; @AN>; @NN>; @OBJ; ; suure kääru saia \n" +
      "1 ; @OBJ; @OBJ; @ADVL; ; krahvi meelitada kaardimängule \n" +
      "1 ; @ADVL; @ADVL; @P>; ; Proual olnud selle \n" +
      "1 ; @SUBJ; @J; @AN>; ; Miiling ja vana \n" +
      "1 ; @ADVL @OBJ; @ADVL; @OBJ; ; Härra käskinud seda \n" +
      "1 ; @NN> @ADVL @OBJ; @ADVL; @ADVL @<NN; ; vanaproua öelnud temale \n" +
      "1 ; @OBJ; @ADVL; @IMV; ; seda mõisa tuua \n" +
      "1 ; @OBJ @SUBJ; @P>; @ADVL; ; teda enda juurde \n" +
      "1 ; @AN>; @OBJ; @SUBJ; ; va Määri Zoege \n" +
      "1 ; @AN>; @NN>; @P>; ; ehitanud oma plaani \n" +
      "1 ; @NN> @PRD; @NN> @<NN @ADVL; @SUBJ; ; mis mees mina \n" +
      "1 ; @IMV; @NN>; @SUBJ @PRD; ; olnud niisugust riista \n" +
      "1 ; @SUBJ; @FMV; @P>; ; Kell oli ukse \n" +
      "1 ; @SUBJ; @FMV; @J; ; sa lähed ja \n" +
      "1 ; @J; @NN>; @OBJ; ; aga Rahkla Miiling \n" +
      "1 ; @ICV; @IMV; @NN>; ; Olnud keelatud Avanduse \n" +
      "1 ; @J; @ICV; @AN>; ; aga olnud suur \n" +
      "1 ; @FCV; @SUBJ; @NN>; ; tohtinud tööinimene oma \n" +
      "1 ; @FMV; @AN>; @AN>; ; oli noor lahke \n" +
      "1 ; @J; @ADVL; @OBJ @SUBJ; ; kui pannud hobused \n" +
      "1 ; @OBJ; @ADVL @<NN; @J; ; riideid rohule ega \n" +
      "1 ; @ADVL; @AN>; @<NN; ; hommikul olnud Essen \n" +
      "1 ; @AN>; @ADVL @<NN @SUBJ; @<Q; ; olnud mitu nädalat \n" +
      "1 ; @PRD; @SUBJ; @FMV; ; kes mina olen \n" +
      "1 ; @ADVL; @FMV; @ADVL @IMV; ; kogu aja kiitnud \n" +
      "1 ; @<NN @ADVL; @OBJ; @ICV @FCV; ; seljast võtta olevat \n" +
      "1 ; @NN>; @SUBJ; @ADVL @IMV; ; Salla teener toonudki \n" +
      "1 ; @NN> @SUBJ; @NN> @OBJ; @SUBJ; ; Ernst von Bremen \n" +
      "1 ; @J; @ADVL; @ADVL @IMV; ; sest tingimuseks olnud \n" +
      "1 ; @SUBJ; @J; @SUBJ @<NN @OBJ; ; alus ja mehed \n" +
      "1 ; @OBJ; @ICV @FCV; @IMV; ; võtta olevat lasknud \n" +
      "1 ; @J; @FMV; @J; ; et tulge kui \n" +
      "1 ; @AN>; @OBJ; @ADVL @IMV; ; ristialuse ta teinud \n" +
      "1 ; @OBJ; @ADVL @IMV; @IMV; ; Miiling tahtnud lõhkuda \n" +
      "1 ; @OBJ; @ADVL; @FMV; ; öelnud selle kohta \n" +
      "1 ; @J; @SUBJ @OBJ; @J; ; et vaim ja \n" +
      "1 ; @<NN; @FMV; @NN>; ; Pago oli niisugune \n" +
      "1 ; @SUBJ @PRD; @NN> @<NN @ADVL; @SUBJ @<NN; ; Poesell nimega Dahvid \n" +
      "1 ; @OBJ @SUBJ; @AN>; @SUBJ; ; Tehtudki uus alus \n" +
      "1 ; @J; @NN> @SUBJ; @<NN; ; et Harpe ise \n" +
      "1 ; @NN>; @ADVL; @IMV; ; ühele vaesele kinkinud \n" +
      "1 ; @ICV @FCV; @ADVL; @SUBJ; ; olevat tal riided \n" +
      "1 ; @NN>; @OBJ; @<NN; ; Talitaja poega Abrami \n" +
      "1 ; @ADVL @NN> @OBJ; @NN> @<NN @ADVL; @SUBJ @OBJ; ; valla peremeestega arusaamatusi \n" +
      "1 ; @AN>; @NN> @ADVL; @AN>; ; musta mütsi punase \n" +
      "1 ; @ADVL @IMV; @SUBJ; @ADVL; ; mõistnud tema kolmeks \n" +
      "1 ; @AN>; @ADVL; @AN>; ; Teisel päeval tulnud \n" +
      "1 ; @NN>; @<NN @ADVL; @<INFN; ; härra pükstes olla \n" +
      "1 ; @ADVL @SUBJ @INFN>; @J; @OBJ; ; lasta ja põlvi \n" +
      "1 ; @ADVL @OBJ; @ADVL; @J; ; maamõõtja vihastanud ja \n" +
      "1 ; @NN> @ADVL; @SUBJ; @ADVL; ; Korra Harpe sõitnud \n" +
      "1 ; @AN>; @ADVL; @ICV @FCV; ; madalamad põllud olevat \n" +
      "1 ; @ADVL @<NN; @P>; @ADVL; ; sulle selle eest \n" +
      "1 ; @AN>; @NN>; @<NN @OBJ; ; sugenud Harpe naha \n" +
      "1 ; @J; @OBJ; @<NN @ADVL; ; aga Traksi mäest \n" +
      "1 ; @ADVL @IMV; @NN>; @OBJ @PRD; ; toonudki härra püksid \n" +
      "1 ; @ADVL; @FMV; @AN> @PRD; ; laanes on vanaaegsed \n" +
      "1 ; @NN>; @ADVL; @ADVL; ; Tema laeval teeninud \n" +
      "1 ; @SUBJ; @ADVL; @FMV; ; proua hulluks läks \n" +
      "1 ; @FMV; @OBJ @NN>; @P>; ; käib Piibe mõisa \n" +
      "1 ; @SUBJ @<NN; @ADVL; @NN> @ADVL; ; Essen olnud Riias \n" +
      "1 ; @NN> @ADVL; @NN> @<NN @ADVL @SUBJ; @ADVL @OBJ; ; proua Salla mõisa \n" +
      "1 ; @SUBJ; @FCV; @NN>; ; Stakelberg oli ühele \n" +
      "1 ; @J; @PRD; @FMV; ; et valusam oleks \n" +
      "1 ; @<NN @SUBJ; @ICV @FCV; @PRD; ; puusärk olevat tühi \n" +
      "1 ; @AN>; @ADVL @<NN @PRD @OBJ @SUBJ; @ADVL @IMV; ; väike poiss olnud \n" +
      "1 ; @OBJ; @ADVL @<NN; @OBJ; ; küla meestele vilja \n" +
      "1 ; @AN>; @NN>; @OBJ @PRD; ; läinud neid keldreid \n" +
      "1 ; @P>; @ADVL; @<INFN; ; plaani järele ehitada \n" +
      "1 ; @AN>; @NN> @OBJ; @OBJ; ; andvat ühtehinge palke \n" +
      "1 ; @NN>; @OBJ @PRD; @ADVL; ; neid keldreid kaevama \n" +
      "1 ; @SUBJ; @J; @<NN @SUBJ; ; tüli ja pahandus \n" +
      "1 ; @OBJ @SUBJ; @J; @SUBJ; ; jalgu ja kiskund \n" +
      "1 ; @J; @NN> @ADVL; @OBJ @ADVL; ; Kui mõisast ehituspalke \n" +
      "1 ; @FMV; @NN>; @<NN @ADVL; ; tulgu Salla haagikohtusse \n" +
      "1 ; @FMV; @ADVL; @OBJ; ; päris kasvatanud neid \n" +
      "1 ; @AN>; @NN>; @NN>; ; olnud Avanduse mõisa \n" +
      "1 ; @AN>; @OBJ; @IMV; ; vana sant maetud \n" +
      "1 ; @AN>; @NN> @ADVL; @ADVL @<NN @OBJ; ; saatnud jutustaja kord \n" +
      "1 ; @ADVL; @FCV; @OBJ; ; tulles pidid kraavi \n" +
      "1 ; @ADVL; @FMV; @AN>; ; lilli oli terve \n" +
      "1 ; @OBJ; @AN>; @ADVL; ; kõik musta kaleviga \n" +
      "1 ; @ADVL @<NN; @<Q; @SUBJ; ; 15 hoopi vitsu \n" +
      "1 ; @OBJ; @ADVL; @ADVL; ; moonamees tulnud poest \n" +
      "1 ; @FMV; @SUBJ; @PRD; ; oli Määri härra \n" +
      "1 ; @ADVL; @AN>; @PRD; ; olnud kitsi inimene \n" +
      "1 ; @FMV; @OBJ; @ADVL; ; Mängis end paljaks \n" +
      "1 ; @NN> @ADVL; @ADVL @<NN @OBJ; @ADVL @<NN; ; jutustaja kord lapsena \n" +
      "1 ; @NN> @SUBJ @PRD; @NN> @<NN @SUBJ; @<NN @ADVL; ; kõik mis tal \n" +
      "1 ; @OBJ @NN>; @P>; @<KN @ADVL; ; Piibe mõisa alla \n" +
      "1 ; @NN>; @ADVL; @FCV; ; Simuna kirik oli \n" +
      "1 ; @OBJ; @J; @OBJ; ; söögi ja palga \n" +
      "1 ; @OBJ; @AN>; @NN> @ADVL; ; Ema saatnud jutustaja \n" +
      "1 ; @NN>; @NN>; @SUBJ @OBJ; ; Salla Harpe hobuseid \n" +
      "1 ; @<Q; @P>; @ADVL @<KN; ; hullu maa pealt \n" +
      "1 ; @AN>; @OBJ @PRD; @ADVL @IMV; ; pärast tagasitulekut olnud \n" +
      "1 ; @ADVL @IMV; @J; @FMV; ; kaevanud ja kohus \n" +
      "1 ; @ADVL; @SUBJ; @PRD; ; kutsariks keegi Valdmanni-nimeline \n" +
      "1 ; @NN> @SUBJ; @OBJ; @ADVL; ; mis kodu kästud \n" +
      "1 ; @FMV; @SUBJ; @<Q; ; on 9-10 kuli \n" +
      "1 ; @ICV @FCV; @PRD; @IMV; ; olevat tühi olnud \n" +
      "1 ; @NEG; @FCV; @SUBJ; ; ei tohtinud tööinimene \n" +
      "1 ; @AN>; @NN>; @AN>; ; Vana Pagu olnud \n" +
      "1 ; @AN>; @PRD; @J; ; noor mees ja \n" +
      "1 ; @NN>; @NN>; @NN>; ; tema venna Konstantini \n" +
      "1 ; @NN>; @SUBJ; @<Q; ; oma sada hoopi \n" +
      "1 ; @FCV; @AN>; @PRD; ; oli hea mees \n" +
      "1 ; @SUBJ @PRD; @J; @SUBJ @PRD; ; silk ja hapupiim \n" +
      "1 ; @PRD @ADVL; @OBJ; @ADVL; ; kord piipu suitsetades \n" +
      "1 ; @NN> @SUBJ; @P>; @<KN @ADVL; ; mõis Henningi käes \n" +
      "1 ; @FMV; @NN>; @NN>; ; tuli tema venna \n" +
      "1 ; @NN> @OBJ; @AN>; @SUBJ; ; ta näinud teda \n" +
      "1 ; @FMV; @NN>; @PRD; ; on sinu liha \n" +
      "1 ; @NN> @SUBJ; @<NN; @FMV; ; Harpe ise seisab \n" +
      "1 ; @OBJ @SUBJ; @ADVL; @ADVL @ICV; ; teda vaimuks peetud \n" +
      "1 ; @P>; @J; @P>; ; Kissa ja Rohu \n" +
      "1 ; @ADVL; @OBJ; @OBJ; ; kombel inimesi peksta \n" +
      "1 ; @SUBJ; @ADVL @<NN; @P>; ; proua sulle selle \n" +
      "1 ; @ADVL; @ADVL; @FMV; ; järele vundamendi valmis \n" +
      "1 ; @J; @FMV; @P>; ; ja annavad nahatäie \n" +
      "1 ; @<Q; @ADVL; @ADVL; ; kuldrubla pannud sellele \n" +
      "1 ; @OBJ; @AN>; @NN>; ; härrat elanud Piibe \n" +
      "1 ; @ADVL @<NN; @ADVL; @FMV; ; lapsena mõisa mune \n" +
      "1 ; @AN>; @ADVL @<NN; @SUBJ; ; ajanud surnuaial moonameest \n" +
      "1 ; @FMV; @ADVL; @OBJ @SUBJ; ; on meil midagi \n" +
      "1 ; @SUBJ @PRD; @J; @AN>; ; poiss ja andnud \n" +
      "1 ; @AN>; @NN> @ADVL; @NN> @OBJ; ; tulisest suust suitsu \n" +
      "1 ; @J; @SUBJ; @<NN @OBJ; ; et meie mõlemad \n" +
      "1 ; @SUBJ; @ICV @FCV; @OBJ; ; vaimud olevat teise \n" +
      "1 ; @J; @NN> @SUBJ; @NN> @ADVL; ; et Huen korra \n" +
      "1 ; @FMV; @AN>; @OBJ; ; kulutab pealmisi pükse \n" +
      "1 ; @SUBJ; @<Q; @PRD; ; sada hoopi kindel \n" +
      "1 ; @NN>; @<NN; @FMV; ; Käru Pago oli \n" +
      "1 ; @FMV; @SUBJ; @ADVL @OBJ; ; Kaotas Avanduse E. \n" +
      "1 ; @NN>; @SUBJ; @ICV @FCV; ; Padu Kooli-Juhan olevat \n" +
      "1 ; @FMV; @NN> @ADVL; @OBJ; ; saab mõisast söögi \n" +
      "1 ; @ADVL @IMV; @OBJ; @J; ; näinud seda ja \n" +
      "1 ; @FCV; @NN>; @P>; ; oli tema matuse \n" +
      "1 ; @SUBJ; @OBJ; @<Q; ; teda kaks korda \n" +
      "1 ; @AN>; @NN> @<NN; @SUBJ @<NN; ; vana parun Huen \n" +
      "1 ; @NN> @OBJ; @<NN @ADVL; @ADVL @IMV; ; mõisa hoovil kärkinud \n" +
      "1 ; @J; @NN> @ADVL; @NN> @ADVL; ; Kui Tammiku proua \n" +
      "1 ; @ADVL; @<Q; @AN>; ; 10 aastat elanud \n" +
      "1 ; @SUBJ @OBJ; @ADVL; @OBJ @ADVL; ; Mõis hakanud päevi \n" +
      "1 ; @ADVL @<NN; @ADVL; @AN>; ; kõrtsis olnud suur \n" +
      "1 ; @SUBJ; @<NN @OBJ; @FCV; ; meie mõlemad võime \n" +
      "1 ; @FMV; @J; @OBJ; ; õhku ja veerenud \n" +
      "1 ; @J; @OBJ; @NEG; ; ja mind ei \n" +
      "1 ; @FMV; @NN>; @OBJ; ; kaotas oma varanduse \n" +
      "1 ; @OBJ @SUBJ; @<NN @ADVL; @<KN @ADVL; ; kumbki teisele poole \n" +
      "1 ; @NN>; @NN>; @<NN; ; Avanduse mõisa ülemvalitseja \n" +
      "1 ; @NN> @PRD @SUBJ; @J; @ICV; ; See aga olnud \n" +
      "1 ; @J; @OBJ @SUBJ; @AN>; ; aga venelased sugenud \n" +
      "1 ; @NN> @OBJ; @SUBJ; @FMV; ; von Bremen mõistis \n" +
      "1 ; @J; @NN> @ADVL @OBJ; @ADVL; ; ja vanaproua öelnud \n" +
      "1 ; @AN>; @SUBJ; @NN> @ADVL @OBJ; ; Vana Landrat v \n" +
      "1 ; @J; @FMV; @ADVL @IMV; ; ja kohus mõistnud \n" +
      "1 ; @OBJ; @ADVL @PRD; @P>; ; seda väikest muna \n" +
      "1 ; @NN>; @AN>; @NN> @OBJ; ; Tema andvat ühtehinge \n" +
      "1 ; @ADVL; @SUBJ; @ADVL @IMV; ; ennem ta surnud \n" +
      "1 ; @SUBJ; @OBJ; @J; ; käed risti ja \n" +
      "1 ; @FCV; @OBJ; @<Q; ; on kaks hullu \n" +
      "1 ; @FCV; @SUBJ; @IMV; ; pole hobused tahtnud \n" +
      "1 ; @J; @ADVL @IMV; @FMV; ; ja lasknud vundamendi \n" +
      "1 ; @ADVL; @FCV; @IMV; ; põllulegi pole läinud \n" +
      "1 ; @OBJ @SUBJ; @AN>; @P>; ; Kalavenelased olnud tee \n" +
      "1 ; @<NN @ADVL; @NEG; @FMV; ; mäest ei saa \n" +
      "1 ; @J; @AN>; @ADVL @<NN; ; ja andnud keisrile \n" +
      "1 ; @NN> @SUBJ; @AN>; @NN> @<NN @ADVL; ; Dahvid tõmmanud taskust \n" +
      "1 ; @ADVL @<NN @OBJ; @ADVL @<NN; @ADVL; ; kord lapsena mõisa \n" +
      "1 ; @ADVL @IMV; @FCV; @J; ; jultunud olid ja \n" +
      "1 ; @NN> @<NN @SUBJ; @<NN @ADVL; @FMV; ; mis tal oli \n" +
      "1 ; @NN>; @AN>; @SUBJ; ; Proua väike kasutütar \n" +
      "1 ; @<Q; @AN>; @AN>; ; aastat elanud väikeses \n" +
      "1 ; @ADVL; @FMV; @PRD; ; vastu oli hea \n" +
      "1 ; @NN>; @<NN @ADVL; @FCV; ; mõisa keldrites on \n" +
      "1 ; @ADVL @IMV; @NN> @ADVL; @OBJ; ; hoidnud kätega kõhtu \n" +
      "1 ; @PRD; @J; @PRD; ; liha ja veri \n" +
      "1 ; @ADVL; @SUBJ @OBJ; @J; ; kutsunud insenere ja \n" +
      "1 ; @FCV; @SUBJ; @ADVL @<NN; ; pidid inimesed kraavi \n" +
      "1 ; @IMV; @J; @ADVL @IMV; ; naerma ja pööranud \n" +
      "1 ; @AN>; @NN> @SUBJ; @NN>; ; vana Vamps seda \n" +
      "1 ; @ADVL @<NN; @NN> @OBJ; @<NN @ADVL; ; omal juukseid peast \n" +
      "1 ; @NN>; @SUBJ @ADVL; @ADVL; ; Rahkla Miiling surnud \n" +
      "1 ; @OBJ; @<NN @ADVL; @NEG; ; Traksi mäest ei \n" +
      "1 ; @J; @AN>; @OBJ @PRD; ; aga pärast tagasitulekut \n" +
      "1 ; @FMV; @NN> @ADVL; @ADVL; ; oli Riias kuberneriks \n" +
      "1 ; @NN> @SUBJ; @<NN; @ADVL; ; Harpe ise tulnud \n" +
      "1 ; @AN>; @NN>; @OBJ @SUBJ; ; Tahtnud Seli küla \n" +
      "1 ; @NN>; @J; @NN> @ADVL @OBJ; ; koolimaja ja talukoha \n" +
      "1 ; @NN> @SUBJ; @AN>; @AN>; ; Baer olnud hea \n" +
      "1 ; @SUBJ; @ADVL @OBJ; @NN> @<NN @OBJ @ADVL; ; Avanduse E. v \n" +
      "1 ; @OBJ @SUBJ; @AN>; @ADVL @<NN @SUBJ; ; Moonamees olnud mitu \n" +
      "1 ; @P>; @ADVL; @PRD; ; rahva vastu sõbralikud \n" +
      "1 ; @OBJ @PRD; @ADVL @IMV; @NN>; ; tagasitulekut olnud teine \n" +
      "1 ; @ADVL @AN>; @P>; @<KN @ADVL; ; läinud kuberneri juurde \n" +
      "1 ; @<NN; @FMV; @ADVL; ; ise seisab uksel \n" +
      "1 ; @AN>; @ADVL; @OBJ @SUBJ; ; kinkinud koolile koha \n" +
      "1 ; @NN> @OBJ; @ADVL @<NN; @IMV; ; Nõmmküla nõmmele viia \n" +
      "1 ; @SUBJ; @ADVL; @NN> @OBJ; ; Härra kaevanud Tedrekulli \n" +
      "1 ; @OBJ; @IMV; @NN> @ADVL; ; sant maetud Riias \n" +
      "1 ; @NN> @<NN @ADVL; @SUBJ @<NN; @ADVL; ; nimega Dahvid tulnud \n" +
      "1 ; @FMV; @NN>; @NN> @ADVL; ; kasvab Salla mõisas \n" +
      "1 ; @FCV; @ICV; @NN> @SUBJ @OBJ; ; pole saanud mütsi \n" +
      "1 ; @ADVL @OBJ; @IMV; @J; ; mõisa tuua ja \n" +
      "1 ; @SUBJ; @ICV @FCV; @P>; ; Kooli-Juhan olevat teise \n" +
      "1 ; @AN>; @NN> @<NN @ADVL; @NN>; ; tõmmanud taskust oma \n" +
      "1 ; @AN>; @SUBJ; @FCV; ; Vana Zoege oli \n" +
      "1 ; @NN> @SUBJ @OBJ; @AN>; @<NN @SUBJ; ; mis aus inimene \n" +
      "1 ; @SUBJ; @AN>; @ADVL; ; Aleksander II olnud \n" +
      "1 ; @J; @ADVL @SUBJ; @<NN @ADVL; ; kui see rahaga \n" +
      "1 ; @NN> @<NN @ADVL; @NN>; @NN>; ; taskust oma revolvri \n" +
      "1 ; @AN>; @AN>; @NN> @SUBJ; ; va vana Vamps \n" +
      "1 ; @FMV; @NN>; @P>; ; oli talude müümise \n" +
      "1 ; @AN>; @J; @AN>; ; Teisel ja kolmandal \n" +
      "1 ; @SUBJ; @ICV @FCV; @IMV; ; härra olevat öelnud \n" +
      "1 ; @FCV; @ADVL; @SUBJ; ; pole suurt midagi \n" +
      "1 ; @<KN @ADVL; @J; @ADVL @IMV; ; poole ja kukkunud \n" +
      "1 ; @ADVL @<NN; @AN>; @P>; ; toas suure tooli \n" +
      "1 ; @ADVL @<NN; @J; @NN> @ADVL @OBJ; ; kõrval ja vanaproua \n" +
      "1 ; @ADVL; @IMV; @NN>; ; vaesele kinkinud maja \n" +
      "1 ; @PRD; @FMV; @NN> @SUBJ; ; Ennem oli mõis \n" +
      "1 ; @SUBJ; @ADVL @<NN; @IMV; ; inimesed kraavi minema \n" +
      "1 ; @ADVL; @J; @NN> @ADVL; ; paljaks kuni ihupesuni \n" +
      "1 ; @ADVL; @ADVL; @NEG; ; Palavaga töötades ei \n" +
      "1 ; @J; @SUBJ @<NN @OBJ; @AN>; ; ja mehed kaevanud \n" +
      "1 ; @FCV; @ADVL @IMV; @ICV; ; oleks viia saadud \n" +
      "1 ; @NN>; @PRD; @J; ; sinu liha ja \n" +
      "1 ; @ADVL; @OBJ @SUBJ; @<AN; ; meil midagi toredat \n" +
      "1 ; @NN> @PRD; @NN>; @NN>; ; Mis see sinu \n" +
      "1 ; @J; @J; @ADVL; ; aga sest asjast \n" +
      "1 ; @NN> @OBJ @SUBJ @ADVL; @AN>; @OBJ; ; mida vana Pagu \n" +
      "1 ; @SUBJ; @ADVL; @<Q; ; tema kolmeks aastaks \n" +
      "1 ; @J; @SUBJ @ADVL; @NN>; ; Kui inimene tema \n" +
      "1 ; @SUBJ @PRD; @ADVL; @J; ; Piim olnud aga \n" +
      "1 ; @J; @FMV; @OBJ; ; et tõmbavad võõra \n" +
      "1 ; @OBJ @SUBJ; @<AN; @<INFN; ; midagi toredat süüa \n" +
      "1 ; @PRD; @FMV; @SUBJ; ; Manteufel oli Määri \n" +
      "1 ; @SUBJ @OBJ; @ADVL; @OBJ @SUBJ; ; Teenrid jäänud mõlemad \n" +
      "1 ; @NN>; @AN>; @NN>; ; Pagu olnud oma \n" +
      "1 ; @AN>; @SUBJ; @OBJ; ; näinud teda kaks \n" +
      "1 ; @NN>; @NN> @SUBJ; @AN>; ; Rahkla Miiling olnud \n" +
      "1 ; @ICV @FCV; @ADVL; @<Q; ; olevat kolm ööd \n" +
      "1 ; @P>; @ADVL @<KN; @IMV; ; maa pealt kadunud \n" +
      "1 ; @ADVL @<NN; @<Q; @SUBJ @OBJ; ; 15 hoopi vitsu \n" +
      "1 ; @FMV; @ADVL; @<NN; ; sai temalt kõike \n" +
      "1 ; @IMV; @NN>; @SUBJ @OBJ; ; õiendanud kõik asjad \n" +
      "1 ; @IMV; @J; @ADVL; ; ehitud ja lilli \n" +
      "1 ; @NN> @OBJ; @<NN; @ADVL; ; Bremen ise söönud \n" +
      "1 ; @ADVL; @FCV; @NN>; ; kirik oli tema \n" +
      "1 ; @ADVL; @ADVL; @AN>; ; hoolimata hakanud vana \n" +
      "1 ; @AN>; @OBJ @ADVL; @IMV; ; puhta seemne osta \n" +
      "1 ; @ADVL; @FCV; @ADVL; ; asjast pole suurt \n" +
      "1 ; @NN>; @ADVL; @AN>; ; sel ajal näidanud \n" +
      "1 ; @SUBJ; @FMV; @OBJ @NN>; ; küla käib Piibe \n" +
      "1 ; @NN> @ADVL; @NN> @OBJ; @<NN @ADVL; ; korra mõisa hoovil \n" +
      "1 ; @NN> @ADVL; @AN>; @NN> @<NN @ADVL; ; mütsi punase äärega \n" +
      "1 ; @ADVL; @OBJ; @IMV; ; Suure-Tammikule koolimaja ehitada \n" +
      "1 ; @AN>; @AN>; @SUBJ @PRD; ; suur tugev mees \n" +
      "1 ; @ADVL; @ADVL @NN> @OBJ; @NN> @<NN @ADVL; ; tal valla peremeestega \n" +
      "1 ; @AN>; @ADVL; @IMV; ; musta kaleviga ehitud \n" +
      "1 ; @FCV; @NN>; @ADVL; ; oli ühele vaesele \n" +
      "1 ; @ADVL; @SUBJ @ADVL @PRD; @<Q; ; tal 9-10 meistrit \n" +
      "1 ; @OBJ; @<Q; @P>; ; kaks hullu maa \n" +
      "1 ; @NN> @PRD; @NN>; @<NN @PRD; ; krahv Lütke omandus \n" +
      "1 ; @NN> @OBJ; @AN>; @OBJ; ; missuguse ristialuse ta \n" +
      "1 ; @OBJ; @NN>; @<NN @ADVL; ; Pagu meeste seljast \n" +
      "1 ; @J; @AN>; @NN> @ADVL; ; kui evangeelse luteriusu \n" +
      "1 ; @ADVL @OBJ; @P>; @ADVL; ; miski asja pärast \n" +
      "1 ; @NN>; @NN> @OBJ; @<NN @ADVL; ; selle hapupiima Bremenile \n" +
      "1 ; @SUBJ; @IMV; @OBJ; ; hobused tahtnud teda \n" +
      "1 ; @NN> @SUBJ; @NN>; @OBJ; ; Vamps seda lugu \n" +
      "1 ; @SUBJ; @ADVL @IMV; @OBJ; ; see poonud ennast \n" +
      "1 ; @AN>; @NN>; @SUBJ @PRD; ; vana Avanduse krahv \n" +
      "1 ; @FCV; @NN> @OBJ; @ADVL; ; võime tema pükstesse \n" +
      "1 ; @ADVL @IMV; @OBJ; @IMV; ; hakanud Issameiet paluma \n" +
      "1 ; @NN>; @ADVL @<NN; @J; ; pingi pihku ja \n" +
      "1 ; @SUBJ; @AN>; @OBJ @ADVL; ; Moonamees vaadanud korra \n" +
      "1 ; @ADVL; @NN> @ADVL; @ADVL; ; olnud Riias kuberneriks \n" +
      "1 ; @ADVL; @NN> @ADVL; @SUBJ; ; olnud jutustajaga sugulane \n" +
      "1 ; @ADVL @IMV; @NN>; @NN>; ; käinud Salla Harpe \n" +
      "1 ; @AN>; @OBJ @NN>; @NN> @<NN @ADVL; ; Omaaegses Simuna kõrtsis \n" +
      "1 ; @NN>; @ADVL; @NEG; ; soldati sauna ei \n" +
      "1 ; @OBJ; @ADVL; @J; ; end paljaks kuni \n" +
      "1 ; @OBJ @SUBJ; @ADVL @OBJ; @IMV; ; mehed mõisa tuua \n" +
      "1 ; @J; @ADVL; @IMV; ; ega puuoksa panna \n" +
      "1 ; @SUBJ @OBJ; @ADVL; @ADVL; ; Aleksander saanud sellest \n" +
      "1 ; @J; @FCV; @IMV; ; et on surnud \n" +
      "1 ; @SUBJ; @ADVL; @PRD; ; Söök olnud vilets \n" +
      "1 ; @<Q; @J; @FMV; ; karjumist ja jäi \n" +
      "1 ; @ADVL @IMV; @ADVL; @AN>; ; andnud temale suure \n" +
      "1 ; @FMV; @ADVL @IMV; @SUBJ; ; kohus mõistnud tema \n" +
      "1 ; @SUBJ; @AN>; @SUBJ; ; Tõusnud suur tüli \n" +
      "1 ; @ADVL; @J; @SUBJ; ; kõrval ja lugenud \n" +
      "1 ; @AN>; @AN>; @PRD; ; noor lahke härra \n" +
      "1 ; @ADVL; @NN>; @PRD; ; ajal Tammiku peremees \n" +
      "1 ; @SUBJ; @<NN @ADVL; @FMV; ; Maamõõtja kaubas oli \n" +
      "1 ; @J; @ADVL @IMV; @IMV; ; ja jäänudki uskuma \n" +
      "1 ; @ICV @FCV; @P>; @ADVL; ; olevat teise juures \n" +
      "1 ; @SUBJ @<NN @OBJ; @AN>; @OBJ; ; mehed kaevanud haua \n" +
      "1 ; @FCV; @PRD; @IMV; ; oli haagreht olnud \n" +
      "1 ; @IMV; @NN> @ADVL; @P>; ; maetud Riias tema \n" +
      "1 ; @ADVL @IMV; @AN>; @SUBJ; ; öelnud vana Normann \n" +
      "1 ; @ADVL; @FMV; @ADVL @SUBJ @OBJ; ; Ikka laskis mitu \n" +
      "1 ; @<NN @OBJ; @FCV; @NN> @OBJ; ; mõlemad võime tema \n" +
      "1 ; @J; @NN>; @AN>; ; kui see väike \n" +
      "1 ; @ADVL @IMV; @AN>; @ADVL; ; öelnud teisel korral \n" +
      "1 ; @ADVL @OBJ @SUBJ; @<Q; @ADVL; ; 6000 kuldrubla pannud \n" +
      "1 ; @NN>; @SUBJ; @PRD; ; teine niisugene pikk \n" +
      "1 ; @NN> @ADVL; @OBJ @ADVL; @FMV; ; mõisast ehituspalke mindi \n" +
      "1 ; @ICV; @NN> @SUBJ @OBJ; @<NN @ADVL; ; saanud mütsi peast \n" +
      "1 ; @SUBJ; @OBJ; @FMV; ; ta viinavabrikut ehitas \n" +
      "1 ; @ADVL @SUBJ @OBJ; @<Q; @OBJ; ; mitu korda käia \n" +
      "1 ; @AN>; @<NN @ADVL; @ADVL; ; läinud härrale kaebama \n" +
      "1 ; @J; @OBJ; @ADVL @IMV @SUBJ @<INFN; ; ja põlvi silitada \n" +
      "1 ; @FMV; @SUBJ; @J; ; Müüs Salla ja \n" +
      "1 ; @AN>; @ADVL; @ADVL; ; soolase veega vitse \n" +
      "1 ; @J; @SUBJ; @ADVL; ; kui proua hulluks \n" +
      "1 ; @ADVL @SUBJ; @OBJ; @ADVL; ; Üks moonamees tulnud \n" +
      "1 ; @NN>; @SUBJ @OBJ; @IMV; ; kapi uksed käinud \n" +
      "1 ; @ICV; @AN>; @AN>; ; olnud suur tugev \n" +
      "1 ; @FMV; @NN> @ADVL; @PRD; ; oli Riias viitsekuberner \n" +
      "1 ; @J; @NN> @ADVL; @J; ; kuni ihupesuni ja \n" +
      "1 ; @NN>; @SUBJ @<NN; @ADVL; ; Tammiku Essen olnud \n" +
      "1 ; @SUBJ; @AN>; @AN>; ; kasutütar seisnud seal \n" +
      "1 ; @J; @FMV; @NN> @ADVL; ; et saab mõisast \n" +
      "1 ; @SUBJ @ADVL; @NN>; @<NN @ADVL; ; inimene tema jutule \n" +
      "1 ; @P>; @ADVL; @NEG; ; selle eest ei \n" +
      "1 ; @NN>; @OBJ; @ADVL @<NN; ; oma riideid rohule \n" +
      "1 ; @NN>; @OBJ; @NEG; ; tema aru ei \n" +
      "1 ; @ADVL; @J; @FMV; ; mõttes ja hulkus \n" +
      "1 ; @J; @NN> @ADVL @OBJ; @ADVL @<NN; ; ja talukoha koolile \n" +
      "1 ; @PRD @SUBJ; @NN>; @OBJ; ; teine teise sääre \n" +
      "1 ; @OBJ; @SUBJ; @FMV; ; mis peigmees annab \n" +
      "1 ; @ADVL; @IMV; @J; ; kaleviga ehitud ja \n" +
      "1 ; @SUBJ @OBJ; @ADVL @IMV; @ADVL; ; Teenrid tahtnud jooksma \n" +
      "1 ; @ADVL; @OBJ @SUBJ; @P>; ; lasknud teda enda \n" +
      "1 ; @NN>; @ADVL @<NN; @<Q; ; oma 15 hoopi \n" +
      "1 ; @FMV; @NN> @SUBJ; @P>; ; oli mõis Henningi \n" +
      "1 ; @AN>; @<NN; @ADVL; ; olnud Essen surnud \n" +
      "1 ; @ADVL @IMV; @OBJ @SUBJ; @<NN @ADVL; ; jooksnud kumbki teisele \n" +
      "1 ; @AN>; @AN>; @ADVL @<NN; ; seisnud seal kõrval \n" +
      "1 ; @NN> @SUBJ; @NN> @ADVL; @NN> @OBJ; ; Huen korra mõisa \n" +
      "1 ; @NN> @SUBJ; @AN>; @NN>; ; Miiling olnud Avanduse \n" +
      "1 ; @<NN; @ADVL; @J; ; ise söönud ja \n" +
      "1 ; @ADVL; @<Q; @<NN @ADVL; ; kolmeks aastaks sunnitööle \n" +
      "1 ; @ADVL; @FCV; @ADVL @IMV; ; millega oleks viia \n" +
      "1 ; @SUBJ; @AN>; @<NN @ADVL; ; Kutsar läinud härrale \n" +
      "1 ; @FMV; @J; @AN>; ; jookseb nagu must \n" +
      "1 ; @OBJ @ADVL; @ADVL; @OBJ; ; härra saanud aru \n" +
      "1 ; @FMV; @ADVL; @SUBJ; ; on laual kartul \n" +
      "1 ; @ADVL; @SUBJ; @ADVL @<NN; ; tal riided seljast \n" +
      "1 ; @J; @ADVL; @FCV; ; sest asjast pole \n" +
      "1 ; @J; @SUBJ; @OBJ; ; Kui ta viinavabrikut \n" +
      "1 ; @<NN @ADVL; @ADVL @IMV; @J; ; hoovil kärkinud ja \n" +
      "1 ; @NN> @OBJ; @ADVL; @IMV; ; tema pükstesse minna \n" +
      "1 ; @ADVL; @<NN; @J; ; temalt kõike ja \n" +
      "1 ; @ADVL @IMV; @NN>; @P>; ; tekkinudki otsetee Kissa \n" +
      "1 ; @NN> @ADVL; @AN>; @OBJ; ; maamõõtjaga uue lepingu \n" +
      "1 ; @J; @ADVL; @SUBJ; ; aga ennem ta";
  }

  private String queryProcess(ProcessBuilder processBuilder) throws IOException
  {
    Process process = processBuilder.start();
    int exitCode;

    try {
      exitCode = process.waitFor();
    } catch (InterruptedException e) {
      exitCode = 1;
      e.printStackTrace();
    }

    if (exitCode != 0) {
      String error;
      try (InputStream is = process.getErrorStream()) {
        error = new String(is.readAllBytes(), StandardCharsets.UTF_8);
      }

      log.error("Process returned non-zero exit code: {}", error);
    }

    String response;
    try (InputStream is = process.getInputStream()) {
      response = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    return response;
  }
}
