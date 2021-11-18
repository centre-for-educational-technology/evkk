package ee.tlu.evkk.api.lang;

import org.springframework.lang.NonNull;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Objects;
import java.util.Spliterator;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 29.09.2021
 */
public class StreamUtils {

  private StreamUtils() {
    throw new UnsupportedOperationException();
  }

  /**
   * Creates a new stream from {@link Iterable} and registers {@code close} method from {@link AutoCloseable} using {@link Stream#onClose(Runnable)}.
   *
   * @param iterable               {@link Iterable} to create stream from
   * @param parallel               {@code true} for parallel stream, {@code false} for sequential stream
   * @param <E>                    Element type
   * @param <AutoClosableIterable> {@link AutoCloseable} and {@link Iterable}
   * @return created {@link Stream}
   * @see StreamSupport#stream(Spliterator, boolean)
   * @see AutoCloseable#close()
   * @see Stream#onClose(Runnable)
   */
  @NonNull
  public static <E, AutoClosableIterable extends AutoCloseable & Iterable<E>> Stream<E> streamAndHandleClose(@NonNull AutoClosableIterable iterable, boolean parallel) {
    Objects.requireNonNull(iterable, "iterable must not be null");
    return StreamSupport.stream(iterable.spliterator(), parallel).onClose(() -> closeUnchecked(iterable));
  }

  private static void closeUnchecked(AutoCloseable closeable) {
    try {
      closeable.close();
    } catch (IOException ex) {
      throw new UncheckedIOException(ex);
    } catch (Exception ex) {
      throw new RuntimeException(ex);
    }
  }

}
