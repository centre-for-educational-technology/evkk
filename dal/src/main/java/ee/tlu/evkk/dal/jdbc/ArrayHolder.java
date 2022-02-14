package ee.tlu.evkk.dal.jdbc;

import org.springframework.dao.CleanupFailureDataAccessException;

import java.sql.Array;
import java.sql.SQLException;

/**
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public final class ArrayHolder implements AutoCloseable {

  private final Array sqlArray;
  private final Object[] elements;

  ArrayHolder(Array sqlArray, Object[] elements) {
    this.sqlArray = sqlArray;
    this.elements = elements;
  }

  public int getSize() {
    return elements.length;
  }

  public boolean isEmpty() {
    return getSize() == 0;
  }

  public Array getSqlArray() {
    return sqlArray;
  }

  public Object[] getElements() {
    return elements;
  }

  @Override
  public void close() {
    try {
      sqlArray.free();
    } catch (SQLException ex) {
      throw new CleanupFailureDataAccessException("Unable to free SQL array", ex);
    }
  }

  @Override
  public String toString() {
    return "SQL array containing " + elements.length + " element(s)";
  }

}
