package ee.tlu.evkk.api.service;

import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.WordlistRequestDto;
import ee.tlu.evkk.dal.dto.WordlistResponseDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

  public WordlistService(TextDao textDao, StanzaServerClient stanzaServerClient) {
    this.textDao = textDao;
    this.stanzaServerClient = stanzaServerClient;
  }

  public List<WordlistResponseDto> getWordlistResponse(WordlistRequestDto dto) {
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
    return new HashSet<>(wordlist).stream()
      .map(word -> new WordlistResponseDto(word, frequencyCounts.get(word), frequencyPercentages.get(word)))
      .collect(toList());
  }

  private String sanitizeText(String text) {
    return text
      .replace("\\n", " ")
      .replace("\\t", " ");
  }

  private List<String> sanitizeLemmaList(List<String> lemmas) {
    return lemmas.stream()
      .map(lemma -> lemma.replace("_", ""))
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
