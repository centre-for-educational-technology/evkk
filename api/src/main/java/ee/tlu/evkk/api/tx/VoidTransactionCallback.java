package ee.tlu.evkk.api.tx;

import org.springframework.transaction.TransactionStatus;

/**
 * @author Mikk Tarvas
 * Date: 03.02.2020
 */
public interface VoidTransactionCallback<T extends Throwable> {

  void execute(TransactionStatus status) throws T;

}
