package ee.tlu.evkk.dal.repository;

import ee.tlu.evkk.common.util.IOUtils;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.jdbc.SqlArray;
import org.apache.ibatis.cursor.Cursor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toUnmodifiableMap;

/**
 * @author Mikk Tarvas
 * Date: 15.11.2021
 */
@Repository
public class TextRepository extends AbstractRepository {

  private final TextDao textDao;

  @Autowired
  public TextRepository(TextDao textDao) {
    this.textDao = textDao;
  }

  public Stream<Text> search(Map<String, ? extends Collection<String>> filters, Pageable pageable) {
    //TODO: whitelist filter keys
    Map<String, SqlArray<String>> filterHolders = filters.entrySet().stream().collect(toUnmodifiableMap(Entry::getKey, entry -> createSqlArray("text", entry.getValue(), true)));
    try {
      Cursor<Text> cursor = textDao.search(filterHolders, pageable.getPageSize(), pageable.getOffset());
      return cursorToStream(cursor);
    } finally {
      filterHolders.values().forEach(IOUtils::closeQuietly);
    }
  }

}
