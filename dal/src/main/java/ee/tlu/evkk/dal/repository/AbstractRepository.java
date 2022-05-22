package ee.tlu.evkk.dal.repository;

import ee.tlu.evkk.dal.jdbc.SqlArray;
import ee.tlu.evkk.dal.jdbc.SqlObjectFactory;
import org.apache.ibatis.cursor.Cursor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 29.09.2021
 */
public abstract class AbstractRepository {

  private final Logger logger;

  @Autowired
  private SqlObjectFactory sqlObjectFactory;

  protected AbstractRepository() {
    this.logger = LoggerFactory.getLogger(getClass());
  }

  @NonNull
  protected Logger log() {
    return logger;
  }

  @Nonnull
  protected <T> SqlArray<T> createSqlArray(@Nonnull String typeName, @Nonnull Iterable<T> elements, boolean distinct) {
    Objects.requireNonNull(typeName, "typeName must not be null");
    Objects.requireNonNull(elements, "elements must not be null");
    Stream<T> stream = StreamSupport.stream(elements.spliterator(), false);
    if (distinct) stream = stream.distinct();
    return sqlObjectFactory.createSqlArray(typeName, stream.collect(Collectors.toUnmodifiableList()));
  }

  @NonNull
  protected static <T> Stream<T> cursorToStream(@NonNull Cursor<T> cursor) {
    return StreamSupport.stream(cursor.spliterator(), false).onClose(() -> closeUnchecked(cursor));
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
