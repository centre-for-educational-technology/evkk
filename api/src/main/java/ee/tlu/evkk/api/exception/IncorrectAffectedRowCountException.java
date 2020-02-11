package ee.tlu.evkk.api.exception;

import org.springframework.dao.IncorrectUpdateSemanticsDataAccessException;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
public class IncorrectAffectedRowCountException extends IncorrectUpdateSemanticsDataAccessException {

  public IncorrectAffectedRowCountException(String expected, int affectedRowCount) {
    super(expected + ", actually affected " + affectedRowCount + " row(s)");
  }

}
