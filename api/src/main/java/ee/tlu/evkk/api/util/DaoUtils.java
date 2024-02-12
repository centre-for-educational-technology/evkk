package ee.tlu.evkk.api.util;

import ee.tlu.evkk.api.exception.IncorrectAffectedRowCountException;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

/**
 * @author Mikk Tarvas
 * Date: 2019-11-01
 */
@NoArgsConstructor(access = PRIVATE)
public class DaoUtils {

  public static void ensureSingleAffectedRow(int affectedRowCount) {
    if (affectedRowCount != 1) {
      throw new IncorrectAffectedRowCountException("Expected to affect exactly 1 row", affectedRowCount);
    }
  }

  public static void ensureAtMostOneAffectedRow(int affectedRowCount) {
    if (!(affectedRowCount == 0 || affectedRowCount == 1)) {
      throw new IncorrectAffectedRowCountException("Expected to affect 0 or 1 rows", affectedRowCount);
    }
  }

}
