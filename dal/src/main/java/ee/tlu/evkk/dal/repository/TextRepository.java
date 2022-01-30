package ee.tlu.evkk.dal.repository;

import ee.tlu.evkk.common.util.IOUtils;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.jdbc.ArrayHolder;
import org.apache.ibatis.cursor.Cursor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author Mikk Tarvas
 * Date: 15.11.2021
 */
@Component
public class TextRepository extends AbstractRepository {

  private final TextDao textDao;

  @Autowired
  public TextRepository(TextDao textDao) {
    this.textDao = textDao;
  }

  public Stream<Text> search(Map<String, Collection<String>> filters) {
    //TODO: whitelist filter keys
    //TODO: what we do for empty filters?
    Cursor<Text> cursor;
    Map<String, ArrayHolder> filterHolders = filters.entrySet().stream().filter(entry -> !entry.getValue().isEmpty())
      .collect(Collectors.toUnmodifiableMap(Entry::getKey, entry -> createSqlArray("text", entry.getValue(), true)));
    try {
      cursor = textDao.search(filterHolders.entrySet().stream().collect(Collectors.toUnmodifiableMap(Entry::getKey, entry -> entry.getValue().getSqlArray())));
    } finally {
      filterHolders.values().forEach(IOUtils::closeQuietly);
    }
    return cursorToStream(cursor);
  }

}
