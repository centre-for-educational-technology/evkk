package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.dto.CorpusRequestEntity;
import ee.tlu.evkk.api.controller.dto.LemmadRequestEntity;
import ee.tlu.evkk.api.controller.dto.TextSearchRequest;
import ee.tlu.evkk.api.controller.dto.TextSearchResponse;
import ee.tlu.evkk.common.env.ServiceLocator;
import ee.tlu.evkk.core.integration.CorrectorServerClient;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.service.TextService;
import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.TextQueryCorpusHelper;
import ee.tlu.evkk.dal.dto.TextQueryCountsHelper;
import ee.tlu.evkk.dal.dto.TextQueryHelper;
import ee.tlu.evkk.dal.dto.TextQueryParamHelper;
import ee.tlu.evkk.dal.dto.TextQueryRangeParamBaseHelper;
import ee.tlu.evkk.dal.dto.TextQueryRangeParamHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.Collections.addAll;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

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

  @PostMapping("/detailneparing2")
  public String detailneparing2(@RequestBody CorpusRequestEntity vaartused) {
    int loendur = 2;
    List<TextQueryParamHelper> paramHelper = new ArrayList<>();
    TextQueryCorpusHelper corpusHelper = new TextQueryCorpusHelper();
    List<TextQueryRangeParamBaseHelper> rangeParamBaseHelper = new ArrayList<>();

    loendur++;
    corpusHelper.setTabel("p" + loendur);
    corpusHelper.setParameeter("korpus");
    List<String> corpuses = new ArrayList<>();
    addAll(corpuses, vaartused.getCorpuses());
    corpusHelper.setVaartused(corpuses);

    if (isNotBlank(vaartused.getType())) {
      loendur++;
      TextQueryParamHelper h1 = new TextQueryParamHelper();
      h1.setTabel("p" + loendur);
      h1.setParameeter("tekstityyp");
      h1.setVaartus(vaartused.getType());
      paramHelper.add(h1);
    }
    if (isNotBlank(vaartused.getLanguage())) {
      loendur++;
      TextQueryParamHelper h2 = new TextQueryParamHelper();
      h2.setTabel("p" + loendur);
      h2.setParameeter("tekstikeel");
      h2.setVaartus(vaartused.getLanguage());
      paramHelper.add(h2);
    }
    if (isNotBlank(vaartused.getLevel())) {
      loendur++;
      TextQueryParamHelper h3 = new TextQueryParamHelper();
      h3.setTabel("p" + loendur);
      h3.setParameeter("keeletase");
      h3.setVaartus(vaartused.getLevel());
      paramHelper.add(h3);
    }
    if (isNotBlank(vaartused.getUsedMaterials())) {
      loendur++;
      TextQueryParamHelper h4 = new TextQueryParamHelper();
      h4.setTabel("p" + loendur);
      h4.setParameeter("abivahendid");
      h4.setVaartus(vaartused.getUsedMaterials());
      paramHelper.add(h4);
    }
    if (isNotBlank(vaartused.getAge())) {
      loendur++;
      TextQueryParamHelper h5 = new TextQueryParamHelper();
      h5.setTabel("p" + loendur);
      h5.setParameeter("vanus");
      h5.setVaartus(vaartused.getAge());
      paramHelper.add(h5);
    }
    if (isNotBlank(vaartused.getGender())) {
      loendur++;
      TextQueryParamHelper h6 = new TextQueryParamHelper();
      h6.setTabel("p" + loendur);
      h6.setParameeter("sugu");
      h6.setVaartus(vaartused.getGender());
      paramHelper.add(h6);
    }
    if (isNotBlank(vaartused.getEducation())) {
      loendur++;
      TextQueryParamHelper h7 = new TextQueryParamHelper();
      h7.setTabel("p" + loendur);
      h7.setParameeter("haridus");
      h7.setVaartus(vaartused.getEducation());
      paramHelper.add(h7);
    }
    if (isNotBlank(vaartused.getNativeLang())) {
      loendur++;
      TextQueryParamHelper h8 = new TextQueryParamHelper();
      h8.setTabel("p" + loendur);
      h8.setParameeter("emakeel");
      h8.setVaartus(vaartused.getNativeLang());
      paramHelper.add(h8);
    }
    if (isNotBlank(vaartused.getCountry())) {
      loendur++;
      TextQueryParamHelper h9 = new TextQueryParamHelper();
      h9.setTabel("p" + loendur);
      h9.setParameeter("elukoht");
      h9.setVaartus(vaartused.getCountry());
      paramHelper.add(h9);
    }

    if (vaartused.getAddedYear() != null) {
      loendur++;
      TextQueryRangeParamBaseHelper h10 = new TextQueryRangeParamBaseHelper();
      List<TextQueryRangeParamHelper> helperid = new ArrayList<>();
      h10.setTabel("p" + loendur);
      h10.setParameeter("aasta");
      h10.setCastable(false);
      for (Integer[] vaartus : vaartused.getAddedYear()) {
        TextQueryRangeParamHelper helper = new TextQueryRangeParamHelper();
        helper.setAlgVaartus(vaartus[0]);
        helper.setLoppVaartus(vaartus[1]);
        helperid.add(helper);
      }
      h10.setVaartused(helperid.toArray(new TextQueryRangeParamHelper[0]));
      rangeParamBaseHelper.add(h10);
    }

    if (vaartused.getCharacters() != null) {
      loendur++;
      TextQueryRangeParamBaseHelper h11 = new TextQueryRangeParamBaseHelper();
      List<TextQueryRangeParamHelper> helperid = new ArrayList<>();
      h11.setTabel("p" + loendur);
      h11.setParameeter("charCount");
      h11.setCastable(true);
      for (Integer[] vaartus : vaartused.getCharacters()) {
        TextQueryRangeParamHelper helper = new TextQueryRangeParamHelper();
        helper.setAlgVaartus(vaartus[0]);
        helper.setLoppVaartus(vaartus[1]);
        helperid.add(helper);
      }
      h11.setVaartused(helperid.toArray(new TextQueryRangeParamHelper[0]));
      rangeParamBaseHelper.add(h11);
    }

    if (vaartused.getWords() != null) {
      loendur++;
      TextQueryRangeParamBaseHelper h12 = new TextQueryRangeParamBaseHelper();
      List<TextQueryRangeParamHelper> helperid = new ArrayList<>();
      h12.setTabel("p" + loendur);
      h12.setParameeter("wordCount");
      h12.setCastable(true);
      for (Integer[] vaartus : vaartused.getWords()) {
        TextQueryRangeParamHelper helper = new TextQueryRangeParamHelper();
        helper.setAlgVaartus(vaartus[0]);
        helper.setLoppVaartus(vaartus[1]);
        helperid.add(helper);
      }
      h12.setVaartused(helperid.toArray(new TextQueryRangeParamHelper[0]));
      rangeParamBaseHelper.add(h12);
    }

    if (vaartused.getSentences() != null) {
      loendur++;
      TextQueryRangeParamBaseHelper h13 = new TextQueryRangeParamBaseHelper();
      List<TextQueryRangeParamHelper> helperid = new ArrayList<>();
      h13.setTabel("p" + loendur);
      h13.setParameeter("sentenceCount");
      h13.setCastable(true);
      for (Integer[] vaartus : vaartused.getSentences()) {
        TextQueryRangeParamHelper helper = new TextQueryRangeParamHelper();
        helper.setAlgVaartus(vaartus[0]);
        helper.setLoppVaartus(vaartus[1]);
        helperid.add(helper);
      }
      h13.setVaartused(helperid.toArray(new TextQueryRangeParamHelper[0]));
      rangeParamBaseHelper.add(h13);
    }

    String vastus = textDao.textTitleQueryByParameters2(corpusHelper, paramHelper, rangeParamBaseHelper);
    if (isNotBlank(vastus)) {
      return vastus;
    } else {
      return new ArrayList<>().toString();
    }
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

}
