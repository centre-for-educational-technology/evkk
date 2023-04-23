package ee.tlu.evkk.api.service;

import ee.evkk.dto.CollocateDto;
import ee.evkk.dto.CollocateRequestDto;
import ee.evkk.dto.CollocateResponseDto;
import ee.evkk.dto.WordlistRequestDto;
import ee.evkk.dto.WordlistResponseDto;
import ee.evkk.dto.enums.CollocateFormula;
import ee.evkk.dto.enums.WordType;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.service.TextService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static ee.evkk.dto.enums.CollocateFormula.LOGDICE;
import static ee.evkk.dto.enums.CollocateFormula.MI_SCORE;
import static ee.evkk.dto.enums.CollocateFormula.T_SCORE;
import static ee.evkk.dto.enums.WordType.LEMMAS;
import static ee.evkk.dto.enums.WordType.WORDS;
import static ee.tlu.evkk.api.util.TextUtils.sanitizeLemmaStrings;
import static ee.tlu.evkk.api.util.TextUtils.sanitizeText;
import static java.lang.Math.log;
import static java.lang.Math.sqrt;
import static java.math.BigDecimal.valueOf;
import static java.math.RoundingMode.UP;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

@Service
public class CollocateService {

  private final StanzaServerClient stanzaServerClient;
  private final TextService textService;
  private final WordlistService wordlistService;

  public CollocateService(StanzaServerClient stanzaServerClient, TextService textService, WordlistService wordlistService) {
    this.textService = textService;
    this.stanzaServerClient = stanzaServerClient;
    this.wordlistService = wordlistService;
  }

  public CollocateResponseDto getCollocateResponse(CollocateRequestDto dto) throws IOException {
    String sanitizedTextContent = sanitizeText(textService.combineCorpusTextIdsAndOwnText(dto.getCorpusTextIds(), dto.getOwnTexts()));
    String keyword = dto.isKeepCapitalization()
      ? dto.getKeyword()
      : dto.getKeyword().toLowerCase();
    return WORDS.equals(dto.getType())
      ? wordResponse(dto, keyword, sanitizedTextContent)
      : lemmaResponse(dto, keyword, sanitizedTextContent);
  }

  private CollocateResponseDto wordResponse(CollocateRequestDto dto, String keyword, String sanitizedTextContent) throws IOException {
    List<String> wordlist = asList(stanzaServerClient.getSonad(sanitizedTextContent));
    if (!dto.isKeepCapitalization()) {
      wordlist = wordlist.stream().map(String::toLowerCase).collect(toList());
    }
    List<WordlistResponseDto> wordlistAndFrequencies = getWordlistResponse(dto, WORDS);
    Map<String, Long> collocates = getCollocates(wordlist, keyword, dto.getSearchCount());
    return combineFinalResult(collocates, wordlistAndFrequencies, keyword, dto.getFormula(), null);
  }

  private CollocateResponseDto lemmaResponse(CollocateRequestDto dto, String keyword, String sanitizedTextContent) throws IOException {
    String initialKeyword = null;
    List<String> lemmalist = sanitizeLemmaStrings(asList(stanzaServerClient.getLemmad(sanitizedTextContent)));
    lemmalist = lemmalist.stream().map(String::toLowerCase).collect(toList());
    List<WordlistResponseDto> lemmalistAndFrequencies = getWordlistResponse(dto, LEMMAS);
    Map<String, Long> collocates = getCollocates(lemmalist, keyword, dto.getSearchCount());
    if (collocates.isEmpty()) {
      initialKeyword = dto.getKeyword();
      keyword = sanitizeLemmaStrings(asList(stanzaServerClient.getLemmad(initialKeyword))).get(0);
      if (!keyword.equalsIgnoreCase(initialKeyword)) {
        collocates = getCollocates(lemmalist, keyword, dto.getSearchCount());
      }
    }
    return combineFinalResult(collocates, lemmalistAndFrequencies, keyword, dto.getFormula(), initialKeyword);
  }

  private CollocateResponseDto combineFinalResult(Map<String, Long> collocates, List<WordlistResponseDto> wordlistAndFrequencies, String keyword, CollocateFormula formula, String initialKeyword) {
    List<CollocateDto> finalCollocates = new ArrayList<>();
    for (Map.Entry<String, Long> collocate : collocates.entrySet()) {
      WordlistResponseDto keywordFromFrequencyList = wordlistAndFrequencies.stream()
        .filter(entry -> entry.getWord().equals(keyword))
        .collect(toList()).get(0);
      WordlistResponseDto collocateFromFrequencyList = wordlistAndFrequencies.stream()
        .filter(entry -> entry.getWord().equals(collocate.getKey()))
        .collect(toList()).get(0);

      finalCollocates.add(new CollocateDto(
        collocate.getKey(),
        calculateScore(formula, keywordFromFrequencyList.getFrequencyCount(), collocateFromFrequencyList.getFrequencyCount(), collocate.getValue(), wordlistAndFrequencies.size())
          .setScale(4, UP),
        collocateFromFrequencyList.getFrequencyCount(),
        collocateFromFrequencyList.getFrequencyPercentage()
      ));
    }
    String lemmatizedKeyword = initialKeyword == null
      ? null
      : keyword;
    return new CollocateResponseDto(finalCollocates, initialKeyword, lemmatizedKeyword);
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

  private BigDecimal calculateScore(CollocateFormula formula, long keywordOccurrences, long collocateOccurrences, long coOccurrences, long totalWordCount) {
    if (LOGDICE.equals(formula)) {
      return valueOf(14 + (log((double) (2 * coOccurrences) / (keywordOccurrences + collocateOccurrences)) / log(2)));
    } else if (T_SCORE.equals(formula)) {
      return valueOf((coOccurrences - ((double) (keywordOccurrences * collocateOccurrences) / totalWordCount)) / sqrt(coOccurrences));
    } else if (MI_SCORE.equals(formula)) {
      return valueOf(log((double) (coOccurrences * totalWordCount) / keywordOccurrences * collocateOccurrences) / log(2));
    }
    return valueOf(0);
  }

  private List<WordlistResponseDto> getWordlistResponse(CollocateRequestDto dto, WordType wordType) throws IOException {
    WordlistRequestDto wordlistDto = new WordlistRequestDto();
    wordlistDto.setCorpusTextIds(dto.getCorpusTextIds());
    wordlistDto.setOwnTexts(dto.getOwnTexts());
    wordlistDto.setType(wordType);
    wordlistDto.setExcludeStopwords(false);
    wordlistDto.setCustomStopwords(null);
    wordlistDto.setKeepCapitalization(dto.isKeepCapitalization());
    wordlistDto.setMinFrequency(1);
    return wordlistService.getWordlistResponse(wordlistDto);
  }
}
