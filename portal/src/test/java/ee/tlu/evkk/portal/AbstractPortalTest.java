package ee.tlu.evkk.portal;

import ee.tlu.evkk.test.AbstractTest;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@SpringBootTest(properties = "thymeleaf.react.disable-runner=true")
public abstract class AbstractPortalTest extends AbstractTest {

}