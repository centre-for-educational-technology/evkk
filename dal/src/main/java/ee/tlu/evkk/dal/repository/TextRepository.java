package ee.tlu.evkk.dal.repository;

import ee.tlu.evkk.common.util.IOUtils;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.jdbc.SqlArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

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

  public List<Text> search(Map<String, ? extends Collection<String>> filterMap, Pageable pageable) {
    int pageSize = pageable.getPageSize();
    int offset = pageable.getOffset();

    if (filterMap.isEmpty()) return textDao.list(pageSize, offset);
    Map<String, SqlArray<String>> filters = filterMap.entrySet().stream()
      .filter(entry -> !entry.getValue().isEmpty())
      .collect(toUnmodifiableMap(Entry::getKey, entry -> createSqlArray("text", entry.getValue(), true)));

    try {
      return textDao.search(filters, pageSize, offset);
    } finally {
      filters.values().forEach(IOUtils::closeQuietly);
    }
  }

}
