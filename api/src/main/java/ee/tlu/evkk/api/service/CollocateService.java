package ee.tlu.evkk.api.service;

import ee.evkk.dto.CollocateDto;
import ee.evkk.dto.CollocateRequestDto;
import ee.evkk.dto.CollocateResponseDto;
import ee.evkk.dto.WordlistRequestDto;
import ee.evkk.dto.WordlistResponseDto;
import ee.evkk.dto.enums.CollocateFormula;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.dal.dao.TextDao;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static ee.evkk.dto.enums.CollocateFormula.LOGDICE;
import static ee.evkk.dto.enums.WordType.WORDS;
import static ee.tlu.evkk.api.util.TextUtils.sanitizeText;
import static java.lang.Math.log;
import static java.math.BigDecimal.valueOf;
import static java.math.RoundingMode.UP;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

@Service
public class CollocateService {

  private final TextDao textDao;
  private final StanzaServerClient stanzaServerClient;
  private final WordlistService wordlistService;

  public CollocateService(TextDao textDao, StanzaServerClient stanzaServerClient, WordlistService wordlistService) {
    this.textDao = textDao;
    this.stanzaServerClient = stanzaServerClient;
    this.wordlistService = wordlistService;
  }

  public CollocateResponseDto getCollocateResponse(CollocateRequestDto dto) throws IOException {
    List<WordlistResponseDto> wordlistAndFrequencies = getWordlistResponse(dto);
    String sanitizedTextContent = sanitizeText(textDao.findTextsByIds(dto.getCorpusTextIds()));
    String keyword = dto.isKeepCapitalization()
      ? dto.getKeyword()
      : dto.getKeyword().toLowerCase();
    return wordResponse(dto, sanitizedTextContent, keyword, wordlistAndFrequencies);
//    return WORDS.equals(dto.getType())
//      ? wordResponse(dto, sanitizedTextContent, keyword)
//      : lemmaResponse(dto, sanitizedTextContent, keyword);
  }

  private List<WordlistResponseDto> getWordlistResponse(CollocateRequestDto dto) throws IOException {
    WordlistRequestDto wordlistDto = new WordlistRequestDto();
    wordlistDto.setCorpusTextIds(dto.getCorpusTextIds());
    wordlistDto.setType(WORDS);
    wordlistDto.setExcludeStopwords(false);
    wordlistDto.setCustomStopwords(null);
    wordlistDto.setKeepCapitalization(dto.isKeepCapitalization());
    wordlistDto.setMinFrequency(1);
    return wordlistService.getWordlistResponse(wordlistDto);
  }

  private CollocateResponseDto wordResponse(CollocateRequestDto dto, String sanitizedTextContent, String keyword, List<WordlistResponseDto> wordlistAndFrequencies) {
    List<CollocateDto> finalCollocates = new ArrayList<>();
    List<String> wordlist = asList(stanzaServerClient.getSonad(sanitizedTextContent));
    if (!dto.isKeepCapitalization()) {
      wordlist = wordlist.stream().map(String::toLowerCase).collect(toList());
    }
    Map<String, Long> collocates = getCollocates(wordlist, keyword, dto.getSearchCount());
    for (Map.Entry<String, Long> collocate : collocates.entrySet()) {
      WordlistResponseDto keywordFromFrequencyList = wordlistAndFrequencies.stream()
        .filter(entry -> entry.getWord().equals(keyword))
        .collect(toList()).get(0);
      WordlistResponseDto collocateFromFrequencyList = wordlistAndFrequencies.stream()
        .filter(entry -> entry.getWord().equals(collocate.getKey()))
        .collect(toList()).get(0);

      finalCollocates.add(new CollocateDto(
        collocate.getKey(),
        calculateScore(dto.getFormula(), keywordFromFrequencyList.getFrequencyCount(), collocateFromFrequencyList.getFrequencyCount(), collocate.getValue()),
        collocateFromFrequencyList.getFrequencyCount(),
        collocateFromFrequencyList.getFrequencyPercentage()
      ));
    }
    return new CollocateResponseDto(finalCollocates, null, null);
  }

  private BigDecimal calculateScore(CollocateFormula formula, long keywordOccurrences, long collocateOccurrences, long coOccurrences) {
    if (LOGDICE.equals(formula)) {
      return valueOf(14 + (log((double) (2 * coOccurrences) / (keywordOccurrences + collocateOccurrences)) / log(2))).setScale(4, UP);
    }
    return valueOf(0);
  }

  private Map<String, Long> getCollocates(List<String> wordlist, String keyword, int searchCount) {
    Map<String, Long> result = new HashMap<>();
    for (int i = 0; i < wordlist.size(); i++) {
      if (wordlist.get(i).equals(keyword)) {
        int counter = i;
        while (counter > i - searchCount) {
          counter--;
          try {
            String collocate = wordlist.get(counter);
            if (result.containsKey(collocate)) {
              result.merge(collocate, 1L, Long::sum);
            } else {
              result.put(collocate, 1L);
            }
          } catch (IndexOutOfBoundsException e) {
            break;
          }
        }
        counter = i;
        while (counter < i + searchCount) {
          counter++;
          try {
            String collocate = wordlist.get(counter);
            if (result.containsKey(collocate)) {
              result.merge(collocate, 1L, Long::sum);
            } else {
              result.put(collocate, 1L);
            }
          } catch (IndexOutOfBoundsException e) {
            break;
          }
        }
      }
    }
    return result;
  }

//  private CollocateResponseDto lemmaResponse(CollocateRequestDto dto, String sanitizedTextContent, String keyword) {
//    List<String> wordlist = asList(stanzaServerClient.getSonad(sanitizedTextContent));
//    List<String> lemmalist = sanitizeLemmaStrings(asList(stanzaServerClient.getLemmad(sanitizedTextContent)));
//    if (dto.isKeepCapitalization()) {
//      wordlist = wordlist.stream().map(String::toLowerCase).collect(toList());
//      lemmalist = lemmalist.stream().map(String::toLowerCase).collect(toList());
//    }
//    List<Integer> keywordIndexes = getKeywordIndexes(lemmalist, keyword);
//    return new CollocateResponseDto();
//  }

//  private List<Integer> getKeywordIndexes(List<String> list, String keyword) {
//    List<Integer> result = new ArrayList<>();
//    for (int i = 0; i < list.size(); i++) {
//      if (list.get(i).equals(keyword)) {
//        result.add(i);
//      }
//    }
//    return result;
//  }
}
