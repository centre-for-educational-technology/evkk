package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.util.FileUtils;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.WordlistRequestDto;
import ee.tlu.evkk.dal.dto.WordlistResponseDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.dal.enums.WordlistType.WORDS;
import static java.math.BigDecimal.valueOf;
import static java.math.RoundingMode.UP;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

@Service
public class WordlistService {

  private final TextDao textDao;
  private final StanzaServerClient stanzaServerClient;
  private final FileUtils fileUtils;

  public WordlistService(TextDao textDao, StanzaServerClient stanzaServerClient, FileUtils fileUtils) {
    this.textDao = textDao;
    this.stanzaServerClient = stanzaServerClient;
    this.fileUtils = fileUtils;
  }

  public List<WordlistResponseDto> getWordlistResponse(WordlistRequestDto dto) throws IOException {
    String textContent = textDao.findTextsByIds(dto.getCorpusTextIds());
    String sanitizedText = sanitizeText(textContent);
    List<String> wordlist = dto.getType().equals(WORDS)
      ? asList(stanzaServerClient.getSonad(sanitizedText))
      : sanitizeLemmaList(asList(stanzaServerClient.getLemmad(sanitizedText)));
    if (!dto.isKeepCapitalization()) {
      wordlist = wordlist.stream().map(String::toLowerCase).collect(toList());
    }
    Map<String, Long> frequencyCounts = getFrequencyCount(wordlist);
    Map<String, BigDecimal> frequencyPercentages = getFrequencyPercentages(wordlist, frequencyCounts);
    return filteredWordlistResponse(dto, wordlist, frequencyCounts, frequencyPercentages);
  }

  private List<WordlistResponseDto> filteredWordlistResponse(WordlistRequestDto dto, List<String> wordlist, Map<String, Long> frequencyCounts, Map<String, BigDecimal> frequencyPercentages) throws IOException {
    List<String> defaultStopwords = new ArrayList<>(asList(fileUtils.readResourceAsString("Stopwords.txt").split(",")));
    List<String> customStopwords = dto.getCustomStopwords() != null
      ? new ArrayList<>(dto.getCustomStopwords())
      : new ArrayList<>();
    List<String> customStopwordsLower = customStopwords
      .stream().map(String::toLowerCase)
      .collect(toList());

    return new HashSet<>(wordlist).stream()
      .filter(dto.isExcludeStopwords()
        ? word -> !defaultStopwords.contains(word.toLowerCase())
        : word -> true)
      .filter(dto.getCustomStopwords() != null
        ? word -> !isCustomStopword(word, customStopwords, customStopwordsLower, dto)
        : word -> true)
      .filter(dto.getMinFrequency() != null
        ? word -> frequencyCounts.get(word) >= dto.getMinFrequency()
        : word -> true)
      .map(word -> new WordlistResponseDto(word, frequencyCounts.get(word), frequencyPercentages.get(word)))
      .collect(toList());
  }

  private boolean isCustomStopword(String word, List<String> stopwords, List<String> stopwordsLower, WordlistRequestDto dto) {
    return dto.isKeepCapitalization()
      ? stopwords.contains(word)
      : stopwordsLower.contains(word);
  }

  private String sanitizeText(String text) {
    return text
      .replace("\\n", " ")
      .replace("\\t", " ");
  }

  private List<String> sanitizeLemmaList(List<String> lemmas) {
    return lemmas.stream()
      .map(lemma -> lemma
        .replace("_", "")
        .replace("=", ""))
      .collect(toList());
  }

  private Map<String, Long> getFrequencyCount(List<String> wordlist) {
    Map<String, Long> counts = new HashMap<>();
    for (String word : wordlist) {
      if (counts.get(word) != null) {
        counts.replace(word, counts.get(word) + 1);
      } else {
        counts.put(word, 1L);
      }
    }
    return counts;
  }

  private Map<String, BigDecimal> getFrequencyPercentages(List<String> wordlist, Map<String, Long> frequencyCounts) {
    Map<String, BigDecimal> percentages = new HashMap<>();
    long wordCount = wordlist.size();
    for (Map.Entry<String, Long> entry : frequencyCounts.entrySet()) {
      BigDecimal percentage = valueOf((entry.getValue() * 100.0) / wordCount).setScale(2, UP);
      percentages.put(entry.getKey(), percentage);
    }
    return percentages;
  }
}
