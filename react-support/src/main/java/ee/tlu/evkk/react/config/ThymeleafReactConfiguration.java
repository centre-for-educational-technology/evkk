package ee.tlu.evkk.react.config;

import ee.tlu.evkk.react.dialect.ReactAppDialect;
import ee.tlu.evkk.react.exec.ReactAppRunner;
import ee.tlu.evkk.react.html.CachedStaticResourceExtractor;
import ee.tlu.evkk.react.html.JsoupStaticResourceExtractor;
import ee.tlu.evkk.react.html.StaticResourceExtractor;
import ee.tlu.evkk.react.io.ReaderSupplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.UrlResource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.URI;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-20
 */
@Configuration
@EnableConfigurationProperties(ThymeleafReactProperties.class)
public class ThymeleafReactConfiguration implements WebMvcConfigurer {

    private ThymeleafReactProperties properties;
    private Integer port;

    @Autowired
    public ThymeleafReactConfiguration(ThymeleafReactProperties properties) {
        this.properties = properties;
        this.port = properties.getDevelopmentPort() == 0 ? getRandomAvailablePort() : properties.getDevelopmentPort();
    }

    @Bean
    public CommandLineRunner reactAppRunner() {
        return args -> {
            if (!properties.getDisableRunner() && properties.getDevelopmentEnabled()) {
                String developmentPath = properties.getDevelopmentPath();
                ReactAppRunner runner = new ReactAppRunner(Paths.get(developmentPath), properties.getDevelopmentHost(), port);
                runner.install();
                runner.start();
            }
        };
    }

    @Bean
    public ReactAppDialect reactAppDialect(StaticResourceExtractor staticResourceExtractor) {
        return new ReactAppDialect(staticResourceExtractor);
    }

    @Bean
    public StaticResourceExtractor staticResourceExtractor(ReaderSupplier htmlSource) {
        JsoupStaticResourceExtractor resourceExtractor = new JsoupStaticResourceExtractor(htmlSource);
        return properties.getDevelopmentEnabled() ? resourceExtractor : new CachedStaticResourceExtractor(resourceExtractor);
    }

    @Bean
    public ReaderSupplier htmlSource() throws IOException {
        if (properties.getDevelopmentEnabled()) {
            URI uri = UriComponentsBuilder.newInstance().scheme("http").host(properties.getDevelopmentHost()).port(port).path("index.html").build().toUri();
            return new ResourceReaderSupplier(new UrlResource(uri));
        } else {
            return new ResourceReaderSupplier(properties.getBuildIndex());
        }
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (properties.getDevelopmentEnabled()) {
            CacheControl cacheControl = CacheControl.noCache().mustRevalidate();
            registry
                    .addResourceHandler("/static/**")
                    .setCacheControl(cacheControl)
                    .resourceChain(false).addResolver(new ReactResourceResolver(properties.getDevelopmentHost(), port));
        } else {
            // create react app seems to generate file names for the static resources using some-kind of hash
            // this means we can safely cache resources for long periods
            // also all clients get the same resource, so we can apply `public` cache directive
            CacheControl cacheControl = CacheControl.maxAge(30L, TimeUnit.DAYS).cachePublic();
            registry
                    .addResourceHandler("/static/**").addResourceLocations(properties.getBuildStaticDir())
                    .setCacheControl(cacheControl)
                    .resourceChain(true);
        }
    }

    // race-conditions can happen (we free selected port immediately), but we do not care too much since it is for development only
    private int getRandomAvailablePort() {
        try (ServerSocket socket = new ServerSocket(0)) {
            return socket.getLocalPort();
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

}