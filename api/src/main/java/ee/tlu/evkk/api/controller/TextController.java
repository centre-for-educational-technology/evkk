package ee.tlu.evkk.api.controller;
import ee.tlu.evkk.api.controller.dto.LemmadRequestEntity;
import org.springframework.web.bind.annotation.*;

import ee.tlu.evkk.api.controller.dto.TextQueryHelper;
import ee.tlu.evkk.api.dao.TextDao;
import ee.tlu.evkk.api.integration.StanzaClient;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/texts")
public class TextController {

  private final TextDao textDao;
  private final StanzaClient stanzaClient;

  public TextController(TextDao uusTDao, StanzaClient stanzaClient) {
    textDao = uusTDao;
    this.stanzaClient = stanzaClient;
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
    String[] lemmad = stanzaClient.getLemmad(request.getTekst());
    List<String> body = Arrays.asList(lemmad);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/sonad")
  public ResponseEntity<List<String>> sonad(@RequestBody LemmadRequestEntity request) {
   // return ResponseEntity.ok(new ArrayList(Arrays.asList(new String[]{"aa", "ab"})));
//   String[] sonad = stanzaClient.getSonad(request.getTekst());
   String[] sonad = stanzaClient.getSonad(request.getTekst());
   List<String> body = Arrays.asList(sonad);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/laused")
  public ResponseEntity<List<String>> laused(@RequestBody LemmadRequestEntity request) throws Exception {
    String[] laused = stanzaClient.getLaused(request.getTekst());
    List<String> body = Arrays.asList(laused);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/korrektuur")
  public ResponseEntity<List<String>> korrektuur(@RequestBody LemmadRequestEntity request) throws Exception {
    String[] vastus = stanzaClient.getKorrektuur(request.getTekst());
    List<String> body = Arrays.asList(vastus);
    return ResponseEntity.ok(body);
  }


  @PostMapping("/keeletase")
  public ResponseEntity<List<String[]>> keeletase(@RequestBody LemmadRequestEntity request) throws Exception {
   // String[] sonad = stanzaClient.getLemmad(request.getTekst());
    String[][] tasemed = stanzaClient.getKeeletase(request.getTekst());
List<String[]> body = Arrays.asList(tasemed);
//List<String> body = Arrays.asList(sonad);
return ResponseEntity.ok(body);
  }




  @PostMapping("/detailneparing")
    public String detailneparing(@RequestBody String[] vaartused) {
        String[] parameetrid = {"korpus", "tekstityyp", "tekstikeel", "keeletase", "abivahendid", "emakeel", "sugu", "haridus", "aasta", "vanus", "elukoht"};
        // "kodukeel" parameetritest välja võetud
        int vaartusteArv = 0;
        for(int i = 0; i < vaartused.length; i++) {
            if(!(vaartused[i].equals("NO"))) {
                vaartusteArv++;
            }
        }

        TextQueryHelper[] helperid = new TextQueryHelper[vaartusteArv];
        vaartusteArv = 0;

        for(int i = 0; i < vaartused.length; i++) {
            if(!(vaartused[i].equals("NO"))) {
                TextQueryHelper h = new TextQueryHelper();
                h.setTabel("p" + (vaartusteArv + 3));
                h.setParameeter(parameetrid[i]);
                h.setVaartused(vaartused[i].split(","));
                helperid[vaartusteArv] = h;
                vaartusteArv++;
            }
        }
        String vastus = textDao.textTitleQueryByParameters(helperid);

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
