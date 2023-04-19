package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.StanzaServerClient;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2022
 */
@Component
public class AnnotateStanzaConlluTextProcessor extends AbstractTextProcessor {

  private final StanzaServerClient stanzaServerClient;

  public AnnotateStanzaConlluTextProcessor(StanzaServerClient stanzaServerClient) {
    this.stanzaServerClient = stanzaServerClient;
  }

  @Override
  public long getVersion() {
    return 1;
  }

  @Nonnull
  @Override
  public Type getType() {
    return Type.ANNOTATE_STANZA_CONLLU;
  }

  @Nonnull
  @Override
  protected Object doProcess(@Nonnull String input, @Nonnull Context context) {
    String languageCode = context.getLanguageCode().orElseThrow(() -> new RuntimeException("No language code provided"));
    String languageIsoCode = languageCodeToIso(languageCode);
    String fileName = getFileName(context);
    Map<String, String> answer = new HashMap<>();
    answer.put("content", stanzaServerClient.getStanzaConllu(input, fileName, languageIsoCode));
    return answer;
  }

  private static String getFileName(Context context) {
    Optional<String> originalFileName = context.getOriginalFileName();
    if (originalFileName.isPresent() && !originalFileName.get().isBlank()) return originalFileName.get();
    Optional<String> fallbackFileName = context.getFallbackFileName();
    if (fallbackFileName.isPresent() && !fallbackFileName.get().isBlank()) return fallbackFileName.get();
    throw new IllegalStateException("Unable to figure out file name");
  }

  private static String languageCodeToIso(String languageCode) {
    if (languageCode.equals("eesti")) return "et";
    if (languageCode.equals("vene")) return "ru";
    throw new IllegalArgumentException("Invalid language code: " + languageCode);
  }

}
