package ee.tlu.evkk.env;

import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.io.support.ResourcePropertySource;

import java.io.IOException;

/**
 * @author Mikk Tarvas
 * Date: 26/11/2018
 */
public class EnvironmentFactory {

    private static final ClassLoader CLASS_LOADER = EnvironmentFactory.class.getClassLoader();
    private static final ResourcePatternResolver RESOURCE_PATTERN_RESOLVER = new PathMatchingResourcePatternResolver(CLASS_LOADER);
    private static final Object LOCK = new Object();
    private static volatile ConfigurableEnvironment cachedEnvironment = null;

    public static ConfigurableEnvironment createEnvironment() {
        synchronized (LOCK) {
            if (cachedEnvironment == null) {
                cachedEnvironment = new StandardEnvironment();
                MutablePropertySources propertySources = cachedEnvironment.getPropertySources();
                try {
                    attachPropertySources(propertySources);
                } catch (IOException ex) {
                    throw new RuntimeException("unable to attach property sources", ex);
                }
            }
        }
        return cachedEnvironment;
    }

    private static void attachPropertySources(MutablePropertySources propertySources) throws IOException {
        ClassPathResource applicationProperties = new ClassPathResource("application.properties");
        if (applicationProperties.exists()) {
            propertySources.addLast(new ResourcePropertySource(applicationProperties));
        }

        attachPropertySourcesFromPattern(propertySources, "file:./../conf/local_*.env");
        attachPropertySourcesFromPattern(propertySources, "classpath*:*.conf.properties");
    }

    private static void attachPropertySourcesFromPattern(MutablePropertySources propertySources, String pattern) throws IOException {
        Resource[] resources = RESOURCE_PATTERN_RESOLVER.getResources(pattern);
        for (Resource resource : resources) {
            propertySources.addLast(new ResourcePropertySource(resource));
        }
    }

}