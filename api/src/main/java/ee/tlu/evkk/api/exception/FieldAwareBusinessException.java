package ee.tlu.evkk.api.exception;

import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 05.06.2020
 */
public final class FieldAwareBusinessException extends AbstractBusinessException {

  private final String field;
  private final AbstractBusinessException original;

  public FieldAwareBusinessException(String field, AbstractBusinessException original) {
    Objects.requireNonNull(field);
    Objects.requireNonNull(original);

    this.field = field;
    this.original = original;
  }

  public String getField() {
    return field;
  }

  @Override
  public String getCode() {
    return original.getCode();
  }

  @Override
  public String[] getCodes() {
    return original.getCodes();
  }

  @Override
  public Object[] getArguments() {
    return original.getArguments();
  }

  @Override
  public String getDefaultMessage() {
    return original.getDefaultMessage();
  }

}
