package ee.tlu.evkk.api.util;

import org.springframework.stereotype.Component;

@Component
public class TextUtils {

  private TextUtils() {}

  public static String sanitizeText(String text) {
    return text
      .replace("\\n", " ")
      .replace("\\t", " ");
  }
}
