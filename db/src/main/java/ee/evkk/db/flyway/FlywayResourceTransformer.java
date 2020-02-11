package ee.evkk.db.flyway;

import org.apache.commons.io.IOUtils;
import org.flywaydb.core.internal.placeholder.DefaultPlaceholderReplacer;
import org.springframework.core.io.AbstractResource;
import org.springframework.core.io.Resource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.function.Function;

/**
 * @author Mikk Tarvas
 * Date: 01/10/2019
 */
public class FlywayResourceTransformer implements Function<Resource, Resource> {

  private final String prefix, suffix;
  private final Map<String, String> placeholders;
  private final Charset scriptEncoding;

  public FlywayResourceTransformer(String prefix, String suffix, Map<String, String> placeholders, Charset scriptEncoding) {
    this.prefix = prefix;
    this.suffix = suffix;
    this.placeholders = placeholders;
    this.scriptEncoding = scriptEncoding;
  }

  @Override
  public Resource apply(Resource resource) {
    return new PlaceholderReplacingResource(resource);
  }

  private final class PlaceholderReplacingResource extends AbstractResource {

    private final Resource resource;

    private PlaceholderReplacingResource(Resource resource) {
      this.resource = resource;
    }

    @Override
    public String getDescription() {
      return resource.getDescription();
    }

    @Override
    public InputStream getInputStream() throws IOException {
      DefaultPlaceholderReplacer placeholderReplacer = new DefaultPlaceholderReplacer(placeholders, prefix, suffix);
      try (InputStream is = resource.getInputStream()) {
        String asString = IOUtils.toString(is, scriptEncoding);
        String replaced = placeholderReplacer.replacePlaceholders(asString);
        byte[] bytes = replaced.getBytes(StandardCharsets.UTF_8);
        return new ByteArrayInputStream(bytes);
      }
    }

  }

}
