package ee.tlu.evkk.api.tx;

import org.springframework.transaction.support.TransactionTemplate;

import java.lang.reflect.UndeclaredThrowableException;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 03/10/2019
 */
public class TransactionTemplateUtils {

  public static <T extends Throwable, R> R executeAndReturn(TransactionTemplate transactionTemplate, ReturningTransactionCallback<R, T> callback) throws T {
    Objects.requireNonNull(transactionTemplate);
    Objects.requireNonNull(callback);
    return executeInternal(transactionTemplate, callback);
  }

  public static <T extends Throwable, R> R execute(TransactionTemplate transactionTemplate, VoidTransactionCallback<T> callback) throws T {
    Objects.requireNonNull(transactionTemplate);
    Objects.requireNonNull(callback);
    return executeInternal(transactionTemplate, status -> {
      callback.execute(status);
      return null;
    });
  }

  private static <T extends Throwable, R> R executeInternal(TransactionTemplate transactionTemplate, ReturningTransactionCallback<R, T> callback) throws T {
    TransactionResult<R> result = transactionTemplate.execute(status -> {
      try {
        R returnValue = callback.execute(status);
        return new TransactionResult<>(returnValue, null);
      } catch (Throwable throwable) {
        return new TransactionResult<>(null, throwable);
      }
    });

    if (result == null) throw new IllegalStateException("Transaction callback did not return result");
    if (result.throwable == null) return result.returnValue;

    Throwable throwable = result.throwable;
    if (throwable instanceof RuntimeException) throw (RuntimeException) throwable;
    if (throwable instanceof Error) throw (Error) throwable;

    try {
      @SuppressWarnings("unchecked") T casted = (T) throwable;
      throw casted;
    } catch (ClassCastException cce) {
      throw new UndeclaredThrowableException(throwable);
    }
  }

  private static final class TransactionResult<T> {

    private final T returnValue;
    private final Throwable throwable;

    private TransactionResult(T returnValue, Throwable throwable) {
      this.returnValue = returnValue;
      this.throwable = throwable;
    }

  }

}
