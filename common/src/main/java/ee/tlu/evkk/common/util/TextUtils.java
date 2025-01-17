package ee.tlu.evkk.common.util;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.stream.Collectors.toList;
import static lombok.AccessLevel.PRIVATE;

@Component
@NoArgsConstructor(access = PRIVATE)
public class TextUtils {

  public static String sanitizeText(String text) {
    return text
      .replace("\\n", " ")
      .replace("\\n\\n", " ")
      .replace("\\t", " ")
      .replace("'", "")
      .replace("*", "")
      .replace("&quot;", "\"");
  }

  public static List<String> sanitizeLemmaStrings(List<String> lemmas) {
    return lemmas.stream()
      .map(lemma ->
        lemma == null ? "–" : lemma
          .replace("'", "")
          .replace("*", "")
          .replace("_", "")
          .replace("=", ""))
      .collect(toList());
  }

  public static List<String> sanitizeWordStrings(List<String> words) {
    return words.stream()
      .map(word ->
        word == null ? "–" : word
          .replace("'", "")
          .replace("*", ""))
      .collect(toList());
  }
}
