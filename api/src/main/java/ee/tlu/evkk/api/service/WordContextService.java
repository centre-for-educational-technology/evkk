package ee.tlu.evkk.api.service;

import ee.evkk.dto.WordContextDto;
import ee.evkk.dto.WordContextRequestDto;
import ee.evkk.dto.integration.WordContextResponseDto;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.service.dto.WordAndPosInfoDto;
import ee.tlu.evkk.dal.dao.TextDao;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static ee.evkk.dto.enums.WordType.LEMMAS;
import static ee.evkk.dto.enums.WordType.WORDS;
import static ee.tlu.evkk.api.util.TextUtils.sanitizeLemmaStringList;
import static ee.tlu.evkk.api.util.TextUtils.sanitizeText;
import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

@Service
public class WordContextService {

  private final TextDao textDao;
  private final StanzaServerClient stanzaServerClient;

  public WordContextService(TextDao textDao, StanzaServerClient stanzaServerClient) {
    this.textDao = textDao;
    this.stanzaServerClient = stanzaServerClient;
  }

  public WordContextResponseDto getWordContextResponse(WordContextRequestDto dto) {
    String sanitizedTextContent = sanitizeText(textDao.findTextsByIds(dto.getCorpusTextIds()));
    List<WordAndPosInfoDto> wordlist = dto.getType().equals(WORDS)
      ? removeCapitalization(asList(stanzaServerClient.getSonadJaPosInfo(sanitizedTextContent)), dto.isKeepCapitalization())
      : removeCapitalization(sanitizeLemmaList(asList(stanzaServerClient.getLemmadJaPosInfo(sanitizedTextContent))), false);
    return generateResponse(wordlist, dto, sanitizedTextContent);
  }

  private WordContextResponseDto generateResponse(List<WordAndPosInfoDto> wordlist, WordContextRequestDto dto, String sanitizedTextContent) {
    List<WordContextDto> initialList = generateContextList(wordlist, dto, sanitizedTextContent);
    if (initialList.isEmpty() && dto.getType().equals(LEMMAS)) {
      String sanitizedLemmatizedKeyword = sanitizeLemmaStringList(asList(stanzaServerClient.getLemmad(dto.getKeyword()))).get(0);
      if (!sanitizedLemmatizedKeyword.equalsIgnoreCase(dto.getKeyword())) {
        dto.setKeyword(sanitizedLemmatizedKeyword.toLowerCase());
        List<WordContextDto> newList = generateContextList(wordlist, dto, sanitizedTextContent);
        return new WordContextResponseDto(newList, true);
      }
    }
    return new WordContextResponseDto(initialList, false);
  }

  private List<WordContextDto> generateContextList(List<WordAndPosInfoDto> wordlist, WordContextRequestDto dto, String sanitizedTextContent) {
    List<WordContextDto> result = new ArrayList<>();
    for (int i = 0; i < wordlist.size(); i++) {
      String keyword = dto.isKeepCapitalization() && dto.getType().equals(WORDS)
        ? dto.getKeyword()
        : dto.getKeyword().toLowerCase();

      if (wordlist.get(i).getWord().equals(keyword)) {
        int contextBeforeStart = getWordAndPosInfoByIndex(wordlist, i, dto.getDisplayCount(), false).getStartChar();
        int contextBeforeEnd = wordlist.get(i).getStartChar();
        int contextAfterStart = wordlist.get(i).getEndChar();
        int contextAfterEnd = getWordAndPosInfoByIndex(wordlist, i, dto.getDisplayCount(), true).getEndChar();

        result.add(new WordContextDto(
          sanitizedTextContent.substring(contextBeforeEnd, contextAfterStart),
          sanitizedTextContent.substring(contextBeforeStart, contextBeforeEnd),
          sanitizedTextContent.substring(contextAfterStart, contextAfterEnd)
        ));
      }
    }
    return result;
  }

  private WordAndPosInfoDto getWordAndPosInfoByIndex(List<WordAndPosInfoDto> wordlist, int index, int displayCount, boolean ascending) {
    WordAndPosInfoDto result;
    while (true) {
      try {
        if (ascending) {
          result = wordlist.get(index + displayCount);
        } else {
          result = wordlist.get(index - displayCount);
        }
        break;
      } catch (IndexOutOfBoundsException e) {
        if (ascending) {
          index--;
        } else {
          index++;
        }
      }
    }
    return result;
  }

  private List<WordAndPosInfoDto> removeCapitalization(List<WordAndPosInfoDto> words, boolean keepCapitalization) {
    return keepCapitalization
      ? words
      : words.stream().map(word -> {
        word.setWord(
          word.getWord().toLowerCase()
        );
        return word;
      }).collect(toList());
  }

  private List<WordAndPosInfoDto> sanitizeLemmaList(List<WordAndPosInfoDto> lemmas) {
    return lemmas.stream()
      .map(lemma -> {
        lemma.setWord(
          lemma.getWord()
            .replace("_", "")
            .replace("=", "")
        );
        return lemma;
      })
      .collect(toList());
  }
}
