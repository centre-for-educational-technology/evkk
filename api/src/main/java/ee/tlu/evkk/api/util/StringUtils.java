package ee.tlu.evkk.api.util;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class StringUtils {

  public static String charSequenceToString(CharSequence charSequence) {
    if (charSequence == null) return null;
    if (charSequence instanceof String) return (String) charSequence;
    return charSequence.toString();
  }

  public static boolean isBlank(CharSequence charSequence) {
    String string = charSequenceToString(charSequence);
    return string == null || string.isBlank();
  }

}
