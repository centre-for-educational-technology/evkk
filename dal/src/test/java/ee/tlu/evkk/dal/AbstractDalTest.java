package ee.tlu.evkk.dal;

import ee.tlu.evkk.test.AbstractTest;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.test.context.ContextConfiguration;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@ContextConfiguration(classes = AbstractDalTest.TestConfiguration.class)
public abstract class AbstractDalTest extends AbstractTest {

    @SpringBootApplication
    public static class TestConfiguration {

    }

}