package ee.tlu.evkk.api.repository;

import ee.tlu.evkk.api.jdbc.ArrayHolder;
import ee.tlu.evkk.api.jdbc.SqlObjectFactory;
import ee.tlu.evkk.api.lang.StreamUtils;
import org.apache.ibatis.cursor.Cursor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;

import java.util.Objects;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 29.09.2021
 */
public abstract class AbstractRepository {

  private final Logger logger;
  private final SqlObjectFactory sqlObjectFactory;

  protected AbstractRepository(SqlObjectFactory sqlObjectFactory) {
    this.logger = LoggerFactory.getLogger(getClass());
    this.sqlObjectFactory = sqlObjectFactory;
  }

  @NonNull
  protected Logger log() {
    return logger;
  }

  @NonNull
  private SqlObjectFactory getSqlObjectFactory() {
    Objects.requireNonNull(sqlObjectFactory, "sqlObjectFactory is not present");
    return sqlObjectFactory;
  }

  @NonNull
  @SuppressWarnings("SameParameterValue")
  protected ArrayHolder createSqlArray(@NonNull String typeName, @NonNull Iterable<?> elements, boolean distinct) {
    Stream<?> stream = StreamSupport.stream(elements.spliterator(), false);
    if (distinct) stream = stream.distinct();
    Object[] elementArray = stream.toArray(Object[]::new);
    return getSqlObjectFactory().createArray(typeName, elementArray);
  }

  @NonNull
  protected static <T> Stream<T> cursorToStream(@NonNull Cursor<T> cursor) {
    return StreamUtils.streamAndHandleClose(cursor, false);
  }

}
