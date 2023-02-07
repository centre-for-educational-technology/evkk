package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.dto.AddingRequestEntity;
import ee.tlu.evkk.api.controller.dto.LemmadRequestEntity;
import ee.tlu.evkk.api.controller.dto.TextSearchRequest;
import ee.tlu.evkk.api.controller.dto.TextSearchResponse;
import ee.tlu.evkk.api.controller.dto.WordFeatsRequestEntity;
import ee.tlu.evkk.common.env.ServiceLocator;
import ee.tlu.evkk.core.integration.CorrectorServerClient;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.service.TextService;
import ee.tlu.evkk.core.service.dto.CorpusDownloadDto;
import ee.tlu.evkk.core.service.dto.CorpusRequestDto;
import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static java.util.UUID.randomUUID;
@RestController
@RequestMapping("/texts")
public class TextController {

  private final TextDao textDao;
  private final StanzaServerClient stanzaServerClient;
  private final CorrectorServerClient correctorServerClient;
  private final TextService textService;
  private final ServiceLocator serviceLocator;

  public TextController(TextDao uusTDao, StanzaServerClient stanzaServerClient, CorrectorServerClient correctorServerClient, TextService textService, ServiceLocator serviceLocator) {
    textDao = uusTDao;
    this.stanzaServerClient = stanzaServerClient;
    this.correctorServerClient = correctorServerClient;
    this.textService = textService;
    this.serviceLocator = serviceLocator;
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
    return textDao.findTextIdsByCorpusId(korpusekood);
  }

  @GetMapping("/kysikorpusetekstiIDjapealkiri")
  public List<String> kysikorpusetekstiIDjapealkiri(String korpusekood) {
    return textDao.findTextIdAndTitleByCorpusId(korpusekood);
  }

  @PostMapping("/sonaliik")
  public ResponseEntity<List<String>> sonaliik(@RequestBody WordFeatsRequestEntity request) {
    String[] sonaliik = stanzaServerClient.getSonaliik(request.getTekst());
    List<String> body = asList(TextService.translateWordType(sonaliik, request.getLanguage()));
    return ResponseEntity.ok(body);
  }

  @PostMapping("/silbid")
  public ResponseEntity<List<String>> silbid(@RequestBody LemmadRequestEntity request) {
    String[] silbid = stanzaServerClient.getSilbid(request.getTekst());
    List<String> body = asList(silbid);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/raw/vormimargendid")
  public ResponseEntity<List<String[]>> rawVormimargendid(@RequestBody LemmadRequestEntity request) {
    String[][] vormimargendid = stanzaServerClient.getVormimargendid(request.getTekst());
    List<String[]> body = asList(vormimargendid);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/vormimargendid")
  public ResponseEntity<List<String>> vormimargendid(@RequestBody WordFeatsRequestEntity request) {
    String[][] vormimargendid = stanzaServerClient.getVormimargendid(request.getTekst());
    return ResponseEntity.ok(textService.translateFeats(vormimargendid, request.getLanguage()));
  }

  @PostMapping("/lemmad")
  public ResponseEntity<List<String>> lemmad(@RequestBody LemmadRequestEntity request) {
    String[] lemmad = stanzaServerClient.getLemmad(request.getTekst());
    List<String> body = asList(lemmad);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/sonad")
  public ResponseEntity<List<String>> sonad(@RequestBody LemmadRequestEntity request) {
    String[] sonad = stanzaServerClient.getSonad(request.getTekst());
    List<String> body = asList(sonad);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/laused")
  public ResponseEntity<List<String[]>> laused(@RequestBody LemmadRequestEntity request) {
    String[][] laused = stanzaServerClient.getLaused(request.getTekst());
    List<String[]> body = asList(laused);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/korrektuur")
  public ResponseEntity<List<String>> korrektuur(@RequestBody LemmadRequestEntity request) {
    String[] vastus = correctorServerClient.getKorrektuur(request.getTekst());
    List<String> body = asList(vastus);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/keeletase")
  public ResponseEntity<List<String[]>> keeletase(@RequestBody LemmadRequestEntity request) {
    String[][] tasemed = stanzaServerClient.getKeeletase(request.getTekst());
    List<String[]> body = asList(tasemed);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/keerukus")
  public ResponseEntity<List<String>> keerukus(@RequestBody LemmadRequestEntity request) {
    String[] m = stanzaServerClient.getKeerukus(request.getTekst());
    List<String> body = asList(m);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/mitmekesisus")
  public ResponseEntity<List<String>> mitmekesisus(@RequestBody LemmadRequestEntity request) {
    String[] m = stanzaServerClient.getMitmekesisus(request.getTekst());
    List<String> body = asList(m);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/detailneparing")
  public ResponseEntity<String> detailneparing(@RequestBody CorpusRequestDto vaartused) {
    return ResponseEntity.ok(textService.detailneparing(vaartused));
  }

  @PostMapping("/tekstidfailina")
  public ResponseEntity<byte[]> tekstidfailina(@RequestBody CorpusDownloadDto corpusDownloadDto) throws IOException {
    return ResponseEntity.ok(textService.tekstidfailina(corpusDownloadDto));
  }

  @GetMapping("/asukoht")
  public String asukoht() {
    return new java.io.File(".").getAbsolutePath();
  }

  @PostMapping("/lisatekst")
  public String lisatekst(@Valid @RequestBody AddingRequestEntity andmed) {
    UUID kood = randomUUID();
    textDao.insertAdding(kood, andmed.getSisu());
    lisaTekstiOmadus(kood, "title", andmed.getPealkiri());
    lisaTekstiOmadus(kood, "kirjeldus", andmed.getKirjeldus());
    lisaTekstiOmadus(kood, "tekstityyp", andmed.getLiik());
    if (andmed.getLiik().equals("akadeemiline")) {
      if (andmed.getOppematerjal().equals("jah")) {
        lisaTekstiOmadus(kood, "akad_oppematerjal", andmed.getAkadOppematerjal());
      }
      lisaTekstiOmadus(kood, "eriala", andmed.getAutoriEriala());
      lisaTekstiOmadus(kood, "akad_alamliik", andmed.getAkadAlamliik());
    }
    if (andmed.getLiik().equals("mitteakadeemiline")) {
      lisaTekstiOmadus(kood, "mitteakad_alamliik", andmed.getMitteakadAlamliik());
    }
    lisaTekstiOmadus(kood, "abivahendid", andmed.getOppematerjal());
    lisaTekstiOmadus(kood, "kasAutor", andmed.getTekstiAutor());
    lisaTekstiOmadus(kood, "vanus", andmed.getAutoriVanus());
    lisaTekstiOmadus(kood, "sugu", andmed.getAutoriSugu());
    lisaTekstiOmadus(kood, "haridus", andmed.getAutoriOppeaste());
    lisaTekstiOmadus(kood, "emakeel", andmed.getAutoriEmakeel());
    lisaTekstiOmadus(kood, "muudkeeled", andmed.getAutoriMuudKeeled());
    lisaTekstiOmadus(kood, "riik", andmed.getAutoriElukohariik());
    lisaTekstiOmadus(kood, "nousolek", andmed.getNousOlek());
    return kood.toString();
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

  @PostMapping("/search")
  @Transactional(readOnly = true)
  public List<TextSearchResponse> search(@RequestBody TextSearchRequest request,
                                         @RequestParam(name = "pageNumber") Integer pageNumber) {
    Pageable pageable = new Pageable(30, pageNumber);
    List<TextWithProperties> texts = textService.search(pageable, request.getKorpus(), request.getTekstityyp(), request.getTekstikeel(),
      request.getKeeletase(), request.getAbivahendid(), request.getAasta(), request.getSugu());
    URI publicApiUri = serviceLocator.locate(ServiceLocator.ServiceName.EVKK_PUBLIC_API);
    return texts.stream().map(textWithProperties -> toTextSearchResponse(textWithProperties, publicApiUri)).collect(Collectors.toUnmodifiableList());
  }

  private TextSearchResponse toTextSearchResponse(TextWithProperties textWithProperties, URI publicApiUri) {
    UUID textId = textWithProperties.getText().getId();
    String downloadUrl = UriComponentsBuilder.fromUri(publicApiUri).pathSegment("texts", "download", "{textId}").encode().build(textId.toString()).toString();
    return ApiMapper.INSTANCE.toTextSearchResponse(textWithProperties, downloadUrl);
  }

  private void lisaTekstiOmadus(UUID kood, String tunnus, String omadus) {
    if (omadus != null && omadus.length() > 0) {
      textDao.insertAddingProperty(kood, tunnus, omadus);
    }
  }

}
