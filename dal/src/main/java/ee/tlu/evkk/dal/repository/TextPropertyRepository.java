package ee.tlu.evkk.dal.repository;

import ee.tlu.evkk.dal.dao.TextPropertyDao;
import ee.tlu.evkk.dal.dto.TextProperty;
import ee.tlu.evkk.dal.jdbc.SqlArray;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
@Repository
@AllArgsConstructor
public class TextPropertyRepository extends AbstractRepository {

  private final TextPropertyDao textPropertyDao;

  public Collection<TextProperty> findByTextIds(Iterable<UUID> textIds) {
    try (SqlArray<UUID> array = createSqlArray("uuid", textIds, true)) {
      return textPropertyDao.findByTextIds(array);
    }
  }

}
