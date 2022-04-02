package ee.tlu.evkk.api.util;

import java.util.Objects;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class StreamUtils {

  public static <T> Stream<T> toStream(Iterable<T> iterable) {
    Objects.requireNonNull(iterable);
    return StreamSupport.stream(iterable.spliterator(), false);
  }

}
