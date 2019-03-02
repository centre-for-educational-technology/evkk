package ee.tlu.evkk.portal;

import ee.tlu.evkk.dal.config.DalConfiguration;
import ee.tlu.evkk.react.config.ThymeleafReactConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-01
 */
@SpringBootApplication
@Import({ThymeleafReactConfiguration.class, DalConfiguration.class})
public class PortalRunner {

    public static void main(String[] args) {
        SpringApplication.run(PortalRunner.class, args);
    }

}