package ee.tlu.evkk.api.tx;

import org.springframework.transaction.TransactionStatus;

/**
 * @author Mikk Tarvas
 * Date: 03.02.2020
 */
public interface ReturningTransactionCallback<R, T extends Throwable> {

  R execute(TransactionStatus status) throws T;

}
