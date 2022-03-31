package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.controller.dto.LemmadRequestEntity;
import ee.tlu.evkk.core.integration.CorrectorServerClient;
import org.springframework.web.bind.annotation.*;

import ee.tlu.evkk.dal.dto.TextQueryHelper;
import ee.tlu.evkk.dal.dto.TextQueryCountsHelper;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/texts")
public class TextController {

  private final TextDao textDao;
  private final StanzaServerClient stanzaServerClient;
  private final CorrectorServerClient correctorServerClient;

  public TextController(TextDao uusTDao, StanzaServerClient stanzaServerClient, CorrectorServerClient correctorServerClient) {
    textDao = uusTDao;
    this.stanzaServerClient = stanzaServerClient;
    this.correctorServerClient = correctorServerClient;
  }

  @GetMapping("/kysitekst")
  public String kysiTekst(String id) {
    return textDao.findTextById(UUID.fromString(id));
  }

  @GetMapping("/kysitekstimetainfo")
  public String kysiTekstiMetainfo(String id) {
    return textDao.findTextMetadata(UUID.fromString(id));
  }

  @GetMapping("/kysikorpusetekstiIDd")
  public List<String> kysikorpusetekstiIDd(String korpusekood) {
    return textDao.findTextIDsByCorpusID(korpusekood);
  }

  @GetMapping("/kysikorpusetekstiIDjapealkiri")
  public List<String> kysikorpusetekstiIDjapealkiri(String korpusekood) {
    return textDao.findTextIDandTitleByCorpusID(korpusekood);
  }

  @CrossOrigin("*")

  @PostMapping("/lemmad")
  public ResponseEntity<List<String>> lemmad(@RequestBody LemmadRequestEntity request) {
    String[] lemmad = stanzaServerClient.getLemmad(request.getTekst());
    List<String> body = Arrays.asList(lemmad);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/sonad")
  public ResponseEntity<List<String>> sonad(@RequestBody LemmadRequestEntity request) {
   // return ResponseEntity.ok(new ArrayList(Arrays.asList(new String[]{"aa", "ab"})));
   String[] sonad = stanzaServerClient.getSonad(request.getTekst());
   List<String> body = Arrays.asList(sonad);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/laused")
  public ResponseEntity<List<String[]>> laused(@RequestBody LemmadRequestEntity request) throws Exception {
    String[][] laused = stanzaServerClient.getLaused(request.getTekst());
    List<String[]> body = Arrays.asList(laused);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/korrektuur")
  public ResponseEntity<List<String>> korrektuur(@RequestBody LemmadRequestEntity request) throws Exception {
    String[] vastus = correctorServerClient.getKorrektuur(request.getTekst());
    List<String> body = Arrays.asList(vastus);
    return ResponseEntity.ok(body);
  }


  @PostMapping("/keeletase")
  public ResponseEntity<List<String[]>> keeletase(@RequestBody LemmadRequestEntity request) throws Exception {
   // String[] sonad = stanzaClient.getLemmad(request.getTekst());
    String[][] tasemed = stanzaServerClient.getKeeletase(request.getTekst());
List<String[]> body = Arrays.asList(tasemed);
//List<String> body = Arrays.asList(sonad);
return ResponseEntity.ok(body);
  }




  @PostMapping("/detailneparing")
    public String detailneparing(@RequestBody String[][] vaartused) {
        String[] tavaparameetrid = {"korpus", "tekstityyp", "tekstikeel", "keeletase", "abivahendid", "emakeel", "sugu", "haridus", "aasta", "vanus", "elukoht"};
        // "kodukeel" tavaparameetritest välja võetud
        String[] loendurparameetrid = {"charCount", "wordCount", "sentenceCount"};

        int tavaVaartusteArv = 0;
        for(int i = 0; i < vaartused[0].length; i++) {
          if(!(vaartused[0][i].equals("NO"))) {
              tavaVaartusteArv++;
          }
        }

        int loendurVaartusteArv = 0;
        for(int i = 0; i < vaartused[1].length; i++) {
          if(!(vaartused[1][i].equals("NO"))) {
            loendurVaartusteArv++;
          }
        }

        TextQueryCountsHelper[] loendurHelperid = new TextQueryCountsHelper[loendurVaartusteArv];
        loendurVaartusteArv = 0;

        TextQueryHelper[] helperid = new TextQueryHelper[tavaVaartusteArv];
        tavaVaartusteArv = 0;

        for(int i = 0; i < vaartused[0].length; i++) {
          if(!(vaartused[0][i].equals("NO"))) {
            TextQueryHelper h = new TextQueryHelper();
            h.setTabel("p" + (tavaVaartusteArv + 5));
            h.setParameeter(tavaparameetrid[i]);
            h.setVaartused(vaartused[0][i].split(","));
            helperid[tavaVaartusteArv] = h;
            tavaVaartusteArv++;
          }
        }

        for(int i = 0; i < vaartused[1].length; i++) {
          if(!(vaartused[1][i].equals("NO"))) {
            TextQueryCountsHelper ch = new TextQueryCountsHelper();
            ch.setParameeter(loendurparameetrid[i]);
            ch.setVaartus(vaartused[1][i]);
            loendurHelperid[loendurVaartusteArv] = ch;
            loendurVaartusteArv++;
          }
        }

        String vastus = textDao.textTitleQueryByParameters(helperid, loendurHelperid);
        return vastus;
    }

    @GetMapping("/asukoht")
    public String asukoht(){
       return new java.io.File(".").getAbsolutePath().toString();
    }

  @GetMapping("/getValues")
  public String getValues(String cId) {
    return textDao.findValueByPropertyName(cId);
  }

  @GetMapping("/getMiniStats")
  public String getMiniStats(String corpus) {
    String[] corpusArray = corpus.split(",");
    return textDao.findMiniStats(corpusArray);
  }

  @GetMapping("/getDetailedValues")
  public String getValues(@RequestParam("corpus") String corpus, String pValue, String pName) {
    String[] corpusArray = corpus.split(",");
    String[] pValueArray = pValue.split(",");
    return textDao.findDetailedValueByPropertyName(pValueArray, pName, corpusArray);
  }

  @GetMapping("/getAvailableValues")
  public String getAvailableValues(String pName) {
    return textDao.findAvailableValues(pName);
  }

  @GetMapping("/kysikorpusetekstid")
  public List<String> kysiKorpuseTekstid(String id) {
    return textDao.findTextsByCorpusId(id);
  }

}
