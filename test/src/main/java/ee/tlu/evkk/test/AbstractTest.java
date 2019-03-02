package ee.tlu.evkk.test;

import ee.tlu.evkk.env.EnvironmentInitializer;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@SpringBootTest
@RunWith(SpringRunner.class)
@ContextConfiguration(initializers = EnvironmentInitializer.class)
public abstract class AbstractTest extends Assert {

}