package ee.tlu.evkk.dal.jdbc;

import org.springframework.dao.CleanupFailureDataAccessException;

import javax.annotation.Nonnull;
import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

/**
 * Simple adapter class that combines SQL {@link Array}, {@link AutoCloseable} and {@link Collection} interfaces.
 * It allows freeing array using try-with-resources pattern and traversing elements using Java Collections API.
 * Instances of {@link SqlArray} are created using {@link SqlObjectFactory}.
 *
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public final class SqlArray<T> extends AbstractCollection<T> implements Array, AutoCloseable {

  private final Array array;
  private T[] elements;

  SqlArray(Array array, T[] elements) {
    this.array = array;
    this.elements = elements;
  }

  @Nonnull
  T[] getElements() {
    if (elements == null) throw new IllegalStateException("SqlArray is already closed");
    return elements;
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public Iterator<T> iterator() {
    return Arrays.stream(getElements()).iterator();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public int size() {
    return getElements().length;
  }

  /**
   * Invoke {@link Array#free()} and remove elements from memory.
   *
   * @see Array#free()
   */
  @Override
  public void close() {
    try {
      array.free();
      elements = null;
    } catch (SQLException ex) {
      throw new CleanupFailureDataAccessException("Unable to free SQL array", ex);
    }
  }

  @Override
  public String toString() {
    if (elements == null) return "Closed SqlArray";
    return "SqlArray containing " + elements.length + " element(s)";
  }

  @Override
  public boolean equals(Object other) {
    if (this == other) return true;
    if (other == null) return false;
    if (getClass() != other.getClass()) return false;
    SqlArray<?> that = (SqlArray<?>) other;
    return Arrays.equals(this.elements, that.elements);
  }

  @Override
  public int hashCode() {
    return Arrays.hashCode(this.elements);
  }

  ///////////////////////
  // DELEGATED METHODS //
  ///////////////////////

  /**
   * {@inheritDoc}
   */
  @Override
  public String getBaseTypeName() throws SQLException {
    return array.getBaseTypeName();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public int getBaseType() throws SQLException {
    return array.getBaseType();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Object getArray() throws SQLException {
    return array.getArray();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Object getArray(Map<String, Class<?>> map) throws SQLException {
    return array.getArray(map);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Object getArray(long index, int count) throws SQLException {
    return array.getArray(index, count);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Object getArray(long index, int count, Map<String, Class<?>> map) throws SQLException {
    return array.getArray(index, count, map);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ResultSet getResultSet() throws SQLException {
    return array.getResultSet();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ResultSet getResultSet(Map<String, Class<?>> map) throws SQLException {
    return array.getResultSet(map);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ResultSet getResultSet(long index, int count) throws SQLException {
    return array.getResultSet(index, count);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ResultSet getResultSet(long index, int count, Map<String, Class<?>> map) throws SQLException {
    return array.getResultSet(index, count, map);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void free() {
    close();
  }

}
