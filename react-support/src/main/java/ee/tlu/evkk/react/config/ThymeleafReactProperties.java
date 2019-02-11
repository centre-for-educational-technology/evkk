package ee.tlu.evkk.react.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;

import javax.annotation.PostConstruct;
import java.nio.file.Path;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-20
 */
@ConfigurationProperties("thymeleaf.react")
public class ThymeleafReactProperties {

    @Value("${development-enabled:false}")
    private Boolean developmentEnabled;

    @Value("${development-path:#{null}}")
    private String developmentPath;

    @Value("${development-port:0}")
    private Integer developmentPort;

    @Value("${development-host:127.0.0.1}")
    private String developmentHost;

    @Value("${build-static-dir:#{null}}")
    private String buildStaticDir;

    @Value("${build-index-html:#{null}}")
    private Resource buildIndex;

    @PostConstruct
    public void postConstruct() {
        if (developmentEnabled && developmentPath == null) throw new IllegalStateException(
                "if thymeleaf.react.development-enabled == true then thymeleaf.react.development-path must be defined");
        if (!developmentEnabled && buildStaticDir == null) throw new IllegalStateException(
                "if thymeleaf.react.development-enabled == false then thymeleaf.react.build-static-dir must be defined");
        if (!developmentEnabled && buildIndex == null) throw new IllegalStateException(
                "if thymeleaf.react.development-enabled == false then thymeleaf.react.build-index-html must be defined");
    }

    public Boolean getDevelopmentEnabled() {
        return developmentEnabled;
    }

    public void setDevelopmentEnabled(Boolean developmentEnabled) {
        this.developmentEnabled = developmentEnabled;
    }

    public String getDevelopmentPath() {
        return developmentPath;
    }

    public void setDevelopmentPath(String developmentPath) {
        this.developmentPath = developmentPath;
    }

    public Integer getDevelopmentPort() {
        return developmentPort;
    }

    public void setDevelopmentPort(Integer developmentPort) {
        this.developmentPort = developmentPort;
    }

    public String getDevelopmentHost() {
        return developmentHost;
    }

    public void setDevelopmentHost(String developmentHost) {
        this.developmentHost = developmentHost;
    }

    public String getBuildStaticDir() {
        return buildStaticDir;
    }

    public void setBuildStaticDir(String buildStaticDir) {
        this.buildStaticDir = buildStaticDir;
    }

    public Resource getBuildIndex() {
        return buildIndex;
    }

    public void setBuildIndex(Resource buildIndex) {
        this.buildIndex = buildIndex;
    }

}