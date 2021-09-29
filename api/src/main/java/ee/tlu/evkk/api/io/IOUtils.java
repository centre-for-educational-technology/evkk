package ee.tlu.evkk.api.io;

import org.springframework.core.io.InputStreamSource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class IOUtils {

  /**
   * InputStreamSource interface does not ensure that source can be read multiple times. <br/>
   * This method enables multiple invocations of getInputStream method via caching bytes in memory if needed. <br/>
   * Use this method only sparsely - caching streams in memory can lead to memory problems.
   *
   * @param iss source to cache
   * @return cached source
   */
  public static InputStreamSource cacheInputStreamSource(InputStreamSource iss) {
    Objects.requireNonNull(iss);
    return new CachedInputStreamSource(iss);
  }

  private static final class CachedInputStreamSource implements InputStreamSource {

    private final InputStreamSource delegate;
    private byte[] bytes = null;

    private CachedInputStreamSource(InputStreamSource delegate) {
      this.delegate = delegate;
    }

    @Override
    public InputStream getInputStream() throws IOException {
      //TODO: we can check specific sources here that do not need to be caches (files for example)

      if (bytes == null) {
        try (InputStream is = delegate.getInputStream()) {
          bytes = is.readAllBytes();
        }
      }
      return new ByteArrayInputStream(bytes);
    }

  }

}
