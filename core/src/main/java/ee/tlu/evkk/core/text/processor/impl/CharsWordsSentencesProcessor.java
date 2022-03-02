package ee.tlu.evkk.core.text.processor.impl;
import javax.annotation.Nonnull;
import ee.tlu.evkk.core.integration.StanzaServerClient;

public class CharsWordsSentencesProcessor  extends AbstractTextProcessor {
    
  private final StanzaServerClient stanzaServerClient;

  public CharsWordsSentencesProcessor(StanzaServerClient stanzaServerClient) {
    this.stanzaServerClient = stanzaServerClient;
  }

  @Override
  public long getVersion() {
    return 1;
  }

  @Nonnull
  @Override
  public Type getType() {
    return Type.CHARS_WORDS_SENTENCES;
  }

  @Nonnull
  @Override
  protected Object doProcess(@Nonnull String input, @Nonnull Context context) {
    String languageCode = context.getLanguageCode().orElseThrow(() -> new RuntimeException("No language code provided"));
    String languageIsoCode = languageCodeToIso(languageCode);
    return stanzaServerClient.getTahedSonadLaused(input, languageIsoCode);
  }


  private static String languageCodeToIso(String languageCode) {
    if (languageCode.equals("eesti")) return "et";
    if (languageCode.equals("vene")) return "ru";
    throw new IllegalArgumentException("Invalid language code: " + languageCode);
  }

}
