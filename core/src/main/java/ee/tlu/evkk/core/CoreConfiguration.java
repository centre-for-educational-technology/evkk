package ee.tlu.evkk.core;

import ee.tlu.evkk.dal.DalConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
@Configuration
@ComponentScan
@Import(DalConfiguration.class)
public class CoreConfiguration {

}
