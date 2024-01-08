package ee.tlu.evkk.common.util;

import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class TextUtils {

  private TextUtils() {}

  public static String sanitizeText(String text) {
    return text
      .replace("\\n", " ")
      .replace("\\t", " ");
  }

  public static List<String> sanitizeLemmaStrings(List<String> lemmas) {
    return lemmas.stream()
      .map(lemma -> lemma
        .replace("'", "")
        .replace("*", "")
        .replace("_", "")
        .replace("=", ""))
      .collect(toList());
  }
}
