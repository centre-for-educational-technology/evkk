package ee.tlu.evkk.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import ee.evkk.dto.WordAnalyserRequestDto;
import ee.evkk.dto.WordContextRequestDto;
import ee.evkk.dto.WordlistRequestDto;
import ee.tlu.evkk.api.exception.StanzaAnalysisSerializationException;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.dal.dao.TextProcessorResultDao;
import ee.tlu.evkk.dal.dto.StanzaResponseDto;
import ee.tlu.evkk.dal.dto.WordAndPosInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.function.Supplier;

import static com.google.common.collect.Lists.partition;
import static ee.tlu.evkk.api.util.StringUtils.isNullOrBlank;
import static ee.tlu.evkk.api.util.WordContextUtils.sentenceArrayToList;
import static ee.tlu.evkk.common.util.TextUtils.sanitizeText;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Stream.concat;
import static java.util.stream.Stream.empty;
import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@Service
@RequiredArgsConstructor
public class StanzaAnalysisService {

  private final TextProcessorResultDao textProcessorResultDao;
  private final StanzaServerClient stanzaServerClient;

  private static final ObjectMapper objectMapper = new ObjectMapper();
  // todo what if analysis is not found
  // todo startChar and endChar of own texts is still not working
  // todo StanzaResponseDto.getCharCount() is possibly bugged and causes errors with some texts

  public List<String> getSonad(WordlistRequestDto dto) {
    return combineStringResponses(
      dto::getCorpusTextIds,
      StanzaResponseDto::getSonad,
      () -> sanitizeAndFetchStringList(dto, stanzaServerClient::getSonad)
    );
  }

  public List<String> getLemmad(WordlistRequestDto dto) {
    return combineStringResponses(
      dto::getCorpusTextIds,
      StanzaResponseDto::getLemmad,
      () -> sanitizeAndFetchStringList(dto, stanzaServerClient::getLemmad)
    );
  }

  public List<List<WordAndPosInfoDto>> getSonadLausetenaJaPosInfo(WordContextRequestDto dto) {
    return combineNestedResponses(
      dto,
      StanzaResponseDto::getSonadLausetenaJaPosInfo,
      () -> sanitizeAndFetchNested(dto, stanzaServerClient::getSonadLausetenaJaPosInfo)
    );
  }

  public List<List<WordAndPosInfoDto>> getLemmadLausetenaJaPosInfo(WordContextRequestDto dto) {
    return combineNestedResponses(
      dto,
      StanzaResponseDto::getLemmadLausetenaJaPosInfo,
      () -> sanitizeAndFetchNested(dto, stanzaServerClient::getLemmadLausetenaJaPosInfo)
    );
  }

  public List<WordAndPosInfoDto> getSonadJaPosInfo(WordContextRequestDto dto) {
    return combineWordAndPosInfoResponses(
      dto::getCorpusTextIds,
      StanzaResponseDto::getSonadJaPosInfo,
      () -> sanitizeAndFetchWordAndPosInfoList(dto, stanzaServerClient::getSonadJaPosInfo)
    );
  }

  public List<WordAndPosInfoDto> getLemmadJaPosInfo(WordContextRequestDto dto) {
    return combineWordAndPosInfoResponses(
      dto::getCorpusTextIds,
      StanzaResponseDto::getLemmadJaPosInfo,
      () -> sanitizeAndFetchWordAndPosInfoList(dto, stanzaServerClient::getLemmadJaPosInfo)
    );
  }

  public StanzaResponseDto getWordAnalyserResponse(WordAnalyserRequestDto dto) {
    List<StanzaResponseDto> corpusTextResponses = isNotEmpty(dto.getCorpusTextIds())
      ? getCorpusTextResponses(dto.getCorpusTextIds())
      : new ArrayList<>();

    StanzaResponseDto ownTextResponse = isNullOrBlank(dto.getOwnTexts())
      ? new StanzaResponseDto()
      : stanzaServerClient.getSonadLemmadSilbidSonaliigidVormimargendid(sanitizeText(dto.getOwnTexts()));

    StanzaResponseDto combined = new StanzaResponseDto();

    combined.setSonad(combineFields(corpusTextResponses, StanzaResponseDto::getSonad, ownTextResponse.getSonad()));
    combined.setLemmad(combineFields(corpusTextResponses, StanzaResponseDto::getLemmad, ownTextResponse.getLemmad()));
    combined.setSilbid(combineFields(corpusTextResponses, StanzaResponseDto::getSilbid, ownTextResponse.getSilbid()));
    combined.setSonaliigid(combineFields(corpusTextResponses, StanzaResponseDto::getSonaliigid, ownTextResponse.getSonaliigid()));
    combined.setVormimargendid(combineFields(corpusTextResponses, StanzaResponseDto::getVormimargendid, ownTextResponse.getVormimargendid()));

    return combined;
  }

  private List<String> combineStringResponses(Supplier<Set<UUID>> corpusTextIdsSupplier, Function<StanzaResponseDto, List<String>> responseMapper, Supplier<List<String>> ownTextSupplier) {
    Set<UUID> corpusTextIds = corpusTextIdsSupplier.get();
    List<String> combined = new ArrayList<>();

    if (isNotEmpty(corpusTextIds)) {
      List<StanzaResponseDto> corpusTextResponses = getCorpusTextResponses(corpusTextIds);
      combined.addAll(corpusTextResponses.stream()
        .map(responseMapper)
        .flatMap(List::stream)
        .collect(toList()));
    }

    combined.addAll(ownTextSupplier.get());

    return combined;
  }

  private List<WordAndPosInfoDto> combineWordAndPosInfoResponses(Supplier<Set<UUID>> corpusTextIdsSupplier, Function<StanzaResponseDto, List<WordAndPosInfoDto>> responseMapper, Supplier<List<WordAndPosInfoDto>> ownTextSupplier) {
    Set<UUID> corpusTextIds = corpusTextIdsSupplier.get();
    List<WordAndPosInfoDto> combined = new ArrayList<>();
    AtomicInteger increaseCounter = new AtomicInteger();

    if (isNotEmpty(corpusTextIds)) {
      List<StanzaResponseDto> corpusTextResponses = getCorpusTextResponses(corpusTextIds);

      combined.addAll(corpusTextResponses.stream()
        .map(response -> {
          responseMapper.apply(response).forEach(element ->
            element.increaseChars(increaseCounter.get())
          );
          increaseCounter.addAndGet(response.getCharCount() + 1);
          return responseMapper.apply(response);
        })
        .flatMap(List::stream)
        .collect(toList())
      );
    }

    combined.addAll(ownTextSupplier.get());

    return combined;
  }

  private List<List<WordAndPosInfoDto>> combineNestedResponses(WordContextRequestDto dto, Function<StanzaResponseDto, List<List<WordAndPosInfoDto>>> responseMapper, Supplier<List<List<WordAndPosInfoDto>>> ownTextSupplier) {
    Set<UUID> corpusTextIds = dto.getCorpusTextIds();
    List<List<WordAndPosInfoDto>> combined = new ArrayList<>();
    AtomicInteger increaseCounter = new AtomicInteger();

    if (isNotEmpty(corpusTextIds)) {
      List<StanzaResponseDto> corpusTextResponses = getCorpusTextResponses(corpusTextIds);

      combined.addAll(corpusTextResponses.stream()
        .map(response -> {
          responseMapper.apply(response).forEach(element ->
            element.forEach(subElement ->
              subElement.increaseChars(increaseCounter.get())
            )
          );
          increaseCounter.addAndGet(response.getCharCount() + 1);
          return responseMapper.apply(response);
        })
        .flatMap(List::stream)
        .collect(toList())
      );
    }

    combined.addAll(ownTextSupplier.get());

    return combined;
  }

  private List<String> sanitizeAndFetchStringList(WordlistRequestDto dto, Function<String, String[]> clientListFunction) {
    return isNullOrBlank(dto.getOwnTexts())
      ? emptyList()
      : asList(clientListFunction.apply(sanitizeText(dto.getOwnTexts())));
  }

  private List<WordAndPosInfoDto> sanitizeAndFetchWordAndPosInfoList(WordContextRequestDto dto, Function<String, WordAndPosInfoDto[]> clientListFunction) {
    return isNullOrBlank(dto.getOwnTexts())
      ? emptyList()
      : asList(clientListFunction.apply(sanitizeText(dto.getOwnTexts())));
  }

  private List<List<WordAndPosInfoDto>> sanitizeAndFetchNested(WordContextRequestDto dto, Function<String, WordAndPosInfoDto[][]> clientListFunction) {
    return isNullOrBlank(dto.getOwnTexts())
      ? emptyList()
      : sentenceArrayToList(clientListFunction.apply(sanitizeText(dto.getOwnTexts())));
  }

  private List<StanzaResponseDto> getCorpusTextResponses(Set<UUID> corpusTextIds) {
    List<List<UUID>> batches = partition(new ArrayList<>(corpusTextIds), 1000);
    List<StanzaResponseDto> results = new ArrayList<>();
    for (List<UUID> batch : batches) {
      String json = textProcessorResultDao.findStanzaFullTextAnalysisByTextIds(new HashSet<>(batch));
      try {
        results.addAll(objectMapper.readValue(json, new TypeReference<List<StanzaResponseDto>>() {}));
      } catch (JsonProcessingException e) {
        throw new StanzaAnalysisSerializationException(e);
      }
    }
    return results;
  }

  private static <T> List<T> combineFields(List<StanzaResponseDto> corpusTextResponses, Function<StanzaResponseDto, List<T>> fieldExtractor, List<T> ownTextField) {
    return concat(
      corpusTextResponses.stream()
        .map(fieldExtractor)
        .filter(Objects::nonNull)
        .flatMap(List::stream),
      (ownTextField != null ? ownTextField.stream() : empty())
    ).collect(toList());
  }

}
