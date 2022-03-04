package ee.tlu.evkk.core.text.processor.impl;
import javax.annotation.Nonnull;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class CharsWordsSentencesTextProcessor  extends AbstractTextProcessor {
    
  private final StanzaServerClient stanzaServerClient;

  public CharsWordsSentencesTextProcessor(StanzaServerClient stanzaServerClient) {
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
    String[] triple= stanzaServerClient.getTahedSonadLaused(input, languageIsoCode);
    Map<String, Integer> answer=new HashMap<String, Integer>();
    answer.put("charCount", Integer.parseInt(triple[0]));
    answer.put("wordCount", Integer.parseInt(triple[1]));
    answer.put("sentenceCount", Integer.parseInt(triple[2]));
    return answer;
  }


  private static String languageCodeToIso(String languageCode) {
    if (languageCode.equals("eesti")) return "et";
    if (languageCode.equals("vene")) return "ru";
    throw new IllegalArgumentException("Invalid language code: " + languageCode);
  }

}
