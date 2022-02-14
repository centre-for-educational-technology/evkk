package ee.tlu.evkk.core.text.processor;

import javax.annotation.Nonnull;
import java.util.Optional;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public interface TextProcessor {

  long getVersion();

  @Nonnull
  Type getType();

  @Nonnull
  Object process(@Nonnull String input, @Nonnull Context context);

  enum Type {

    LEMMATIZER,
    CORRECTOR,
    LANGUAGE_LEVEL,
    ANNOTATE_ESTNLTK,
    ANNOTATE_STANZA_CONLLU

  }

  class Context {

    private static final Context INSTANCE = new Context(null, null, null);

    private final String languageCode;
    private final String originalFileName;
    private final String fallbackFileName;

    private Context(String languageCode, String originalFileName, String fallbackFileName) {
      this.languageCode = languageCode;
      this.originalFileName = originalFileName;
      this.fallbackFileName = fallbackFileName;
    }

    private Context copy(String languageCode, String originalFileName, String fallbackFileName) {
      return new Context(languageCode, originalFileName, fallbackFileName);
    }

    public static Context newInstance() {
      return INSTANCE;
    }

    public Context withLanguageCode(String languageCode) {
      return copy(languageCode, originalFileName, fallbackFileName);
    }

    public Context withOriginalFileName(String originalFileName) {
      return copy(languageCode, originalFileName, fallbackFileName);
    }

    public Context withFallbackFileName(String fallbackFileName) {
      return copy(languageCode, originalFileName, fallbackFileName);
    }

    public Optional<String> getLanguageCode() {
      return Optional.ofNullable(languageCode);
    }

    public Optional<String> getOriginalFileName() {
      return Optional.ofNullable(originalFileName);
    }

    public Optional<String> getFallbackFileName() {
      return Optional.ofNullable(fallbackFileName);
    }

  }

}
