package ee.evkk.db.flyway;

import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.configuration.Configuration;

import java.nio.charset.Charset;
import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 01/10/2019
 */
public class ResourceTransformerFactory {

  private ResourceTransformerFactory() {
    // NOOP
  }

  public static FlywayResourceTransformer createResourceTransformer(Flyway flyway) {
    Configuration configuration = flyway.getConfiguration();
    String prefix = configuration.getPlaceholderPrefix();
    String suffix = configuration.getPlaceholderSuffix();
    Map<String, String> placeholders = configuration.getPlaceholders();
    Charset encoding = configuration.getEncoding();
    Charset charsetToUse = encoding == null ? Charset.defaultCharset() : encoding;
    return new FlywayResourceTransformer(prefix, suffix, placeholders, charsetToUse);
  }

}
