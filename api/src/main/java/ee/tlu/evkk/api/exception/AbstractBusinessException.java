package ee.tlu.evkk.api.exception;

import org.springframework.context.MessageSourceResolvable;

/**
 * @author Mikk Tarvas
 * Date: 04.02.2020
 */
public abstract class AbstractBusinessException extends Exception implements MessageSourceResolvable {

  private static final Object[] DEFAULT_ARGUMENTS = new Object[0];

  private final Object[] arguments;

  protected AbstractBusinessException() {
    this(DEFAULT_ARGUMENTS);
  }

  protected AbstractBusinessException(Object... arguments) {
    this.arguments = arguments;
  }

  @Override
  public String[] getCodes() {
    return new String[]{getCode()};
  }

  @Override
  public synchronized Throwable fillInStackTrace() {
    return this;
  }

  @Override
  public Object[] getArguments() {
    return arguments;
  }

  @Override
  public String getDefaultMessage() {
    return getCode();
  }

  public abstract String getCode();

}
