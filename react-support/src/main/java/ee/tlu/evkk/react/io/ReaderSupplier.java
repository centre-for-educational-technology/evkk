package ee.tlu.evkk.react.io;

import java.io.Reader;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-20
 */
public interface ReaderSupplier {

    Reader get() throws Exception;

}
