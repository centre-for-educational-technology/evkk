package ee.tlu.evkk.common.env;

import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePropertySource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static java.nio.file.FileVisitOption.FOLLOW_LINKS;

/**
 * @author Mikk Tarvas
 * Date: 09.02.2020
 */
public class EnvironmentListener implements ApplicationListener<ApplicationEvent>, Ordered {

  private final List<String> confDirectoryCandidates = Arrays.asList("./conf/", "./../conf/");
  private final Pattern envFilePattern = Pattern.compile("^local_.+\\.env$");

  @Override
  public void onApplicationEvent(ApplicationEvent event) {
    if (event instanceof ApplicationEnvironmentPreparedEvent) {
      ConfigurableEnvironment environment = ((ApplicationEnvironmentPreparedEvent) event).getEnvironment();
      try {
        environment.merge(createLocalEnvironment());
      } catch (IOException ex) {
        throw new RuntimeException(ex);
      }
    }
  }

  @Override
  public int getOrder() {
    return Ordered.HIGHEST_PRECEDENCE + 10;
  }

  private ConfigurableEnvironment createLocalEnvironment() throws IOException {
    // Create environment
    StandardEnvironment standardEnvironment = new StandardEnvironment();
    MutablePropertySources propertySources = standardEnvironment.getPropertySources();

    // Additional properties / conf files
    Map<String, Object> additionalProperties = new HashMap<>();
    List<Resource> configurationFiles = new ArrayList<>();

    // If conf directory exists - resolve rootDir & add properties
    Optional<Path> confDirectory = resolveConfDirectory();
    if (confDirectory.isPresent()) {
      additionalProperties.put("rootDir", confDirectory.get().getParent().toRealPath().toString());
      configurationFiles.addAll(findEnvFiles(confDirectory.get()));
    }

    // Attach properties
    propertySources.addLast(new MapPropertySource("additionalProperties", additionalProperties));
    for (Resource configurationFile : configurationFiles) propertySources.addLast(new ResourcePropertySource(configurationFile));

    // Return created environment
    return standardEnvironment;
  }

  private Optional<Path> resolveConfDirectory() {
    for (String candidate : confDirectoryCandidates) {
      Path path = Paths.get(candidate);
      if (Files.exists(path) && Files.isDirectory(path)) return Optional.of(path);
    }
    return Optional.empty();
  }

  private List<Resource> findEnvFiles(Path directory) throws IOException {
    return Files
      .find(directory, Integer.MAX_VALUE, (path, basicFileAttributes) -> envFilePattern.matcher(path.getFileName().toString()).matches(), FOLLOW_LINKS)
      .map(FileSystemResource::new)
      .collect(Collectors.toList());
  }

}
