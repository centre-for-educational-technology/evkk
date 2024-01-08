package ee.tlu.evkk.api.controller;

import ee.evkk.dto.AddingRequestDto;
import ee.evkk.dto.CommonTextRequestDto;
import ee.evkk.dto.CorpusDownloadDto;
import ee.evkk.dto.CorpusRequestDto;
import ee.evkk.dto.CorpusTextContentsDto;
import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.dto.TextSearchRequest;
import ee.tlu.evkk.api.controller.dto.TextSearchResponse;
import ee.tlu.evkk.common.env.ServiceLocator;
import ee.tlu.evkk.core.integration.CorrectorServerClient;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.service.TextService;
import ee.tlu.evkk.core.service.dto.TextResponseDto;
import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
import static org.springframework.http.ResponseEntity.ok;

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

    @PostMapping("/kysitekstid")
    public String kysiTekstid(@RequestBody CorpusTextContentsDto dto) {
        return textDao.findTextsByIds(dto.getIds());
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

  @PostMapping("/sonad-lemmad-silbid-laused-sonaliigid-vormimargendid")
  public ResponseEntity<TextResponseDto> sonadLemmadSilbidLausedSonaliigidVormimargendid(@RequestBody CommonTextRequestDto request) {
    return ok(textService.sonadLemmadSilbidLausedSonaliigidVormimargendid(request));
  }

    @PostMapping("/sonaliik")
    public ResponseEntity<List<String>> sonaliik(@RequestBody CommonTextRequestDto request) {
      List<String> sonaliik = stanzaServerClient.getSonaliik(request.getTekst());
      List<String> body = textService.translateWordType(sonaliik, request.getLanguage());
        return ok(body);
    }

    @PostMapping("/silbid")
    public ResponseEntity<List<String>> silbid(@RequestBody CommonTextRequestDto request) {
        String[] silbid = stanzaServerClient.getSilbid(request.getTekst());
        List<String> body = asList(silbid);
        return ok(body);
    }

    @PostMapping("/raw/vormimargendid")
    public ResponseEntity<List<List<String>>> rawVormimargendid(@RequestBody CommonTextRequestDto request) {
      List<List<String>> vormimargendid = stanzaServerClient.getVormimargendid(request.getTekst());
      return ok(vormimargendid);
    }

    @PostMapping("/vormimargendid")
    public ResponseEntity<List<String>> vormimargendid(@RequestBody CommonTextRequestDto request) {
      List<List<String>> vormimargendid = stanzaServerClient.getVormimargendid(request.getTekst());
        return ok(textService.translateFeats(vormimargendid, request.getLanguage()));
    }

    @PostMapping("/lemmad")
    public ResponseEntity<List<String>> lemmad(@RequestBody CommonTextRequestDto request) {
        String[] lemmad = stanzaServerClient.getLemmad(request.getTekst());
        List<String> body = asList(lemmad);
        return ok(body);
    }

    @PostMapping("/sonad")
    public ResponseEntity<List<String>> sonad(@RequestBody CommonTextRequestDto request) {
        String[] sonad = stanzaServerClient.getSonad(request.getTekst());
        List<String> body = asList(sonad);
        return ok(body);
    }

    @PostMapping("/laused")
    public ResponseEntity<List<String[]>> laused(@RequestBody CommonTextRequestDto request) {
        String[][] laused = stanzaServerClient.getLaused(request.getTekst());
        List<String[]> body = asList(laused);
        return ok(body);
    }

    @PostMapping("/korrektuur")
    public ResponseEntity<List<String>> korrektuur(@RequestBody CommonTextRequestDto request) {
        String[] vastus = correctorServerClient.getKorrektuur(request.getTekst());
        List<String> body = asList(vastus);
        return ok(body);
    }

    @PostMapping("/keeletase")
    public ResponseEntity<List<String[]>> keeletase(@RequestBody CommonTextRequestDto request) {
        String[][] tasemed = stanzaServerClient.getKeeletase(request.getTekst());
        List<String[]> body = asList(tasemed);
        return ok(body);
    }

    @PostMapping("/keerukus")
    public ResponseEntity<List<String>> keerukus(@RequestBody CommonTextRequestDto request) {
        String[] m = stanzaServerClient.getKeerukus(request.getTekst());
        List<String> body = asList(m);
        return ok(body);
    }

    @PostMapping("/mitmekesisus")
    public ResponseEntity<List<String>> mitmekesisus(@RequestBody CommonTextRequestDto request) {
        String[] m = stanzaServerClient.getMitmekesisus(request.getTekst());
        List<String> body = asList(m);
        return ok(body);
    }

    @PostMapping("/detailneparing")
    public ResponseEntity<String> detailneparing(@RequestBody CorpusRequestDto vaartused) {
        return ok(textService.detailneparing(vaartused));
    }

    @PostMapping("/tekstidfailina")
    public HttpEntity<byte[]> tekstidfailina(@RequestBody CorpusDownloadDto corpusDownloadDto, HttpServletResponse response) throws IOException {
        byte[] file = textService.tekstidfailina(corpusDownloadDto);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(APPLICATION_OCTET_STREAM);
        response.setHeader("Content-Disposition", "attachment");

        return new HttpEntity<>(file, headers);
    }

    @GetMapping("/asukoht")
    public String asukoht() {
        return new java.io.File(".").getAbsolutePath();
    }

    @PostMapping("/lisatekst")
    public String lisatekst(@Valid @RequestBody AddingRequestDto andmed) {
        return textService.lisatekst(andmed);
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
