package ee.tlu.evkk.test.factory;

import ee.tlu.evkk.test.MockData;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-14
 */
public abstract class AbstractMockFactory {

    @Autowired
    private MockData mockData;

}
