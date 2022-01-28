package ee.tlu.evkk.api.repository;

import ee.tlu.evkk.core.jdbc.ArrayHolder;
import ee.tlu.evkk.core.jdbc.SqlObjectFactory;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Text;
import org.apache.ibatis.cursor.Cursor;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

/**
 * @author Mikk Tarvas
 * Date: 15.11.2021
 */
@Component
public class TextRepository extends AbstractRepository {

  private final TextDao textDao;

  public TextRepository(SqlObjectFactory sqlObjectFactory, TextDao textDao) {
    super(sqlObjectFactory);
    this.textDao = textDao;
  }

  public Stream<Text> search(Iterable<String> korpus) {
    Cursor<Text> cursor;
    try (ArrayHolder korpusArray = createSqlArray("text", korpus, true)) {
      cursor = textDao.search(
        korpusArray.isEmpty() ? null : korpusArray.getSqlArray(),
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
    }
    return cursorToStream(cursor);
  }

}
