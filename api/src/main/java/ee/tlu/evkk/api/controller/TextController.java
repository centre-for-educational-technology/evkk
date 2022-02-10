package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.controller.dto.LemmadRequestEntity;
import ee.tlu.evkk.api.controller.dto.ConlluRequestEntity;
import ee.tlu.evkk.core.integration.CorrectorServerClient;
import ee.tlu.evkk.core.service.TextService;
import org.springframework.web.bind.annotation.*;

import ee.tlu.evkk.dal.dto.TextQueryHelper;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.integration.KlasterdajaServerClient;

//import ee.tlu.evkk.clusterfinder.service.ClusterServiceImpl;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.util.JSONPObject;

import java.util.Optional;

@RestController
@RequestMapping("/texts")
public class TextController {

  private final TextDao textDao;
  private final StanzaServerClient stanzaServerClient;
  private final CorrectorServerClient correctorServerClient;
  private final KlasterdajaServerClient klasterdajaServerClient;
  //private final ClusterServiceImpl clusterServiceClient;
  private final TextService textService;

  public TextController(TextDao uusTDao, StanzaServerClient stanzaServerClient,
                        CorrectorServerClient correctorServerClient,
                        KlasterdajaServerClient klasterdajaServerClient, TextService textService) {
    textDao = uusTDao;
    this.stanzaServerClient = stanzaServerClient;
    this.correctorServerClient = correctorServerClient;
    this.klasterdajaServerClient=klasterdajaServerClient;
    this.textService = textService;

    // String annotated = textService.annotateWithEstnltk(textId);
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


  @PostMapping("/stanzaconllu")
  public String stanzaconllu(@RequestBody ConlluRequestEntity request) throws Exception {
    String body = stanzaServerClient.getStanzaConllu(request.getTekst(), request.getFailinimi(), "et");
    return body;
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


  @GetMapping("/kysimargendamata")
  public List<String> kysiMargendamata(String tyyp){
    return textDao.findNotParsedIds(tyyp);
  }

  @GetMapping("/lisamargendus")
  public String lisaMargendus(String sisu){
     textDao.insertParsing("stanza_conllu", UUID.fromString("32c21cfc-b14f-45e5-8d67-e59d7cfa2e54"), "proovisisu 2 "+sisu, null);
     return "lisatud "+sisu;
  }

  @GetMapping("/kysifailikood")
  public String kysiFailiKood(String textid){
    System.out.println(textid);
    List<String> v=textDao.textfileid(UUID.fromString(textid));
    System.out.println(v);
    if(v.size()>0){return v.get(0);}
    return textid;
  }

  @GetMapping("/parsitudtekst")
  public String kysiParsing(String textid, String tyyp){
    Optional<String> vastus=textDao.findParsingById(UUID.fromString(textid), tyyp);
    if(vastus.isEmpty()){return "puudub";}
    return vastus.get();
  }

  @GetMapping("/kontrollimargendus")
  public String kontrolliMargendus(String tyyp){
    if(! (tyyp.equals("stanza_conllu") || tyyp.equals("estnltk14"))){return "tundmatu tüüp";}
    List<String> koodid=kysiMargendamata(tyyp);
    if(koodid.size()==0){return "otsas "+tyyp;}
    String[] kood=koodid.get(0).split(",");
    String failikood=this.kysiFailiKood(kood[0]);
    String margendus="???";
    if(tyyp.equals("stanza_conllu")){margendus=stanzaServerClient.getStanzaConllu(kysiTekst(kood[0]), failikood, kood[1]);}
    if(tyyp.equals("estnltk14")){
       if(kood[1].equals("eesti")){
         margendus=klasterdajaServerClient.klasterdajaParsi(kysiTekst(kood[0]));
       } else {
         margendus="puudub keeles "+kood[1];
       }
    }
    
    textDao.insertParsing(tyyp, UUID.fromString(kood[0]), margendus, null);
    return "Lisati "+kood+" alles: "+(koodid.size()-1);
  }

  @GetMapping("/kontrolliloendamine")
  public String kontrolliLoendamine(){
    List<String> koodid=textDao.findNotCountedIds();
    if(koodid.size()==0){return "otsas loendamata";}
    int kogus=koodid.size();
    while(koodid.size()>0){
      String[] kood=koodid.get(0).split(",");
      koodid.remove(0);
      String keel=(kood[1].equals("vene")?"ru":"et");
      String[] v= stanzaServerClient.getTahedSonadLaused(kysiTekst(kood[0]), keel);
      textDao.insertCounting(UUID.fromString(kood[0]), Integer.parseInt(v[0]), Integer.parseInt(v[1]), Integer.parseInt(v[2]));
    }
    return "Lisati "+kogus;
  }

/*

Taustal arvutamise näited

function kysi(){
  fetch("/api/texts/kontrollimargendus?tyyp=stanza_conllu", {method:"GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }}).then(v => v.text()).then(t=>{
    console.log(t); 
    if(!t.startsWith("otsas")){kysi();}
  });
}


function kysi(){
  fetch("/api/texts/kontrollimargendus?tyyp=estnltk14", {method:"GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }}).then(v => v.text()).then(t=>{
    console.log(t); 
    if(!t.startsWith("otsas")){kysi();}
  });
}


tähti-sõnu-lauseid:

function kysi(){
  fetch("/api/texts/kontrolliloendamine", {method:"GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }}).then(v => v.text()).then(t=>{
    console.log(t); 
    if(!t.startsWith("otsas")){kysi();}
  });
}

*/
  @PostMapping("/parsiestnltk14")
  public String parsiEstnltk14(@RequestBody LemmadRequestEntity request){
     return klasterdajaServerClient.klasterdajaParsi(request.getTekst());
  }

  @PostMapping("/tahedsonadlaused")
  public String[] tahedSonadLaused(@RequestBody LemmadRequestEntity request){
     return stanzaServerClient.getTahedSonadLaused(request.getTekst(), "et");
  }

  @GetMapping("/loendamata")
  public String[] loendamata(){
    return textDao.findNotCountedIds().toArray(new String[0]);
  }

}
