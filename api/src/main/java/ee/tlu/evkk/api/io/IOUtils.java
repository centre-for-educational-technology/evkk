package ee.tlu.evkk.api.io;

import com.google.common.base.Suppliers;
import org.springframework.core.io.InputStreamSource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.function.Supplier;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class IOUtils {

  public static InputStreamSource cacheInputStream(InputStream is) {
    Objects.requireNonNull(is);

    // TODO: We basically "cache" InputStream here, because in lots of cases, we need to use same stream multiple times.
    //       For example if we first need to detect content type and after that store same stream in database.
    //       Currently storing data in byte array is "good enough" but is not memory efficient in the long run.
    //       We should figure out some type of better solution for this problem.
    //       Maybe store it in files - this will be slower but more memory friendly.

    Supplier<byte[]> bytes = Suppliers.memoize(() -> inputStreamToByteArrayUnchecked(is));
    return () -> {
      try {
        return new ByteArrayInputStream(bytes.get());
      } catch (Exception ex) {
        throw new IOException("Unable to open stream", ex);
      }
    };
  }

  private static byte[] inputStreamToByteArrayUnchecked(InputStream is) {
    try {
      return org.apache.commons.io.IOUtils.toByteArray(is);
    } catch (IOException ex) {
      throw new RuntimeException(ex);
    }
  }

}
