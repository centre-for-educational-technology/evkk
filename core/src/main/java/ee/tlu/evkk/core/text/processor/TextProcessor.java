package ee.tlu.evkk.core.text.processor;

import org.springframework.lang.NonNull;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public interface TextProcessor {

  long getVersion();

  @NonNull
  Type getType();

  @NonNull
  Object process(@NonNull String input, @NonNull Context context);

  enum Type {

    LEMMATIZER,
    CORRECTOR,
    LANGUAGE_LEVEL,
    ANNOTATE_ESTNLTK

  }

  class Context {

    private static final Context INSTANCE = new Context(null, null);

    private final String languageCode;
    private final String originalFileName;

    private Context(String languageCode, String originalFileName) {
      this.languageCode = languageCode;
      this.originalFileName = originalFileName;
    }

    private Context copy(String languageCode, String originalFileName) {
      return new Context(languageCode, originalFileName);
    }

    public static Context newInstance() {
      return INSTANCE;
    }

    public Context withLanguageCode(String languageCode) {
      return copy(languageCode, originalFileName);
    }

    public Context withOriginalFileName(String originalFileName) {
      return copy(languageCode, originalFileName);
    }

    public String getLanguageCode() {
      return languageCode;
    }

    public String getOriginalFileName() {
      return originalFileName;
    }

  }

}
