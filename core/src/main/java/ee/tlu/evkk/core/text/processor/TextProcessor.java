package ee.tlu.evkk.core.text.processor;

import javax.annotation.Nonnull;
import java.util.Optional;
import java.util.UUID;

import static java.util.Optional.ofNullable;

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
    ANNOTATE_STANZA_CONLLU,
    ANNOTATE_TEI,
    CHARS_WORDS_SENTENCES
  }

  class Context {

    private static final Context INSTANCE = new Context(null, null, null, null);

    private final String languageCode;
    private final String originalFileName;
    private final String fallbackFileName;
    private final UUID textId;

    private Context(String languageCode, String originalFileName, String fallbackFileName, UUID textId) {
      this.languageCode = languageCode;
      this.originalFileName = originalFileName;
      this.fallbackFileName = fallbackFileName;
      this.textId = textId;
    }

    private Context copy(String languageCode, String originalFileName, String fallbackFileName, UUID textId) {
      return new Context(languageCode, originalFileName, fallbackFileName, textId);
    }

    public static Context newInstance() {
      return INSTANCE;
    }

    public Context withLanguageCode(String languageCode) {
      return copy(languageCode, originalFileName, fallbackFileName, textId);
    }

    public Context withOriginalFileName(String originalFileName) {
      return copy(languageCode, originalFileName, fallbackFileName, textId);
    }

    public Context withTextIdAndFallbackFileName(UUID textId, String fallbackFileName) {
      return copy(languageCode, originalFileName, fallbackFileName, textId);
    }

    public Optional<String> getLanguageCode() {
      return ofNullable(languageCode);
    }

    public Optional<String> getOriginalFileName() {
      return ofNullable(originalFileName);
    }

    public Optional<String> getFallbackFileName() {
      return ofNullable(fallbackFileName);
    }

    public Optional<UUID> getTextId() {
      return ofNullable(textId);
    }

  }

}
