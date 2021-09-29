package ee.tlu.evkk.common.env;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertySource;
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
import java.util.stream.StreamSupport;

import static java.nio.file.FileVisitOption.FOLLOW_LINKS;

/**
 * @author Mikk Tarvas
 * Date: 25.08.2021
 */
public class LocalEnvironmentPostProcessor implements EnvironmentPostProcessor {

  private static final String DOCKER_SECRETS_DIRECTORY = "/run/secrets/";

  private final String[] confDirCandidates = new String[]{"./conf/", "./../conf/", "./../../conf/"};
  private final Pattern envFilePattern = Pattern.compile("^local_.+\\.env$");

  @Override
  public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
    List<PropertySource<?>> propertySources;
    try {
      propertySources = createPropertySources();
    } catch (IOException ex) {
      throw new RuntimeException("Unable to create property sources", ex);
    }
    appendPropertySources(environment.getPropertySources(), propertySources);
  }

  private List<PropertySource<?>> createPropertySources() throws IOException {
    List<PropertySource<?>> result = new ArrayList<>(8);

    MapPropertySource dockerSecrets = readDockerSecrets();
    if (dockerSecrets != null) result.add(dockerSecrets);

    Optional<Path> confDir = resolveConfDir();
    if (confDir.isPresent()) {
      result.add(createLocalDevProperties(confDir.get()));
      for (Resource resource : findEnvFiles(confDir.get())) result.add(new ResourcePropertySource(resource));
    }

    return Collections.unmodifiableList(result);
  }

  private MapPropertySource readDockerSecrets() throws IOException {
    Path dockerSecretsDirectory = Path.of(DOCKER_SECRETS_DIRECTORY);
    if (!Files.isDirectory(dockerSecretsDirectory)) return null;

    List<Path> secrets = Files.list(dockerSecretsDirectory).collect(Collectors.toUnmodifiableList());
    Map<String, Object> map = new HashMap<>(secrets.size());
    for (Path secret : secrets) {
      String secretName = secret.getFileName().toString();
      String secretValue = readDockerSecret(secret);
      map.put(secretName, secretValue);
    }
    return new MapPropertySource("Docker secrets loaded from " + DOCKER_SECRETS_DIRECTORY, Collections.unmodifiableMap(map));
  }

  private String readDockerSecret(Path path) throws IOException {
    String content = Files.readString(path);
    return content.strip();
  }

  private PropertySource<?> createLocalDevProperties(Path confDir) throws IOException {
    Path localRootDir = confDir.getParent().toRealPath();
    Map<String, Object> source = Map.of("rootDir", localRootDir.toString());
    return new MapPropertySource("localDevProperties", source);
  }

  private List<Resource> findEnvFiles(Path directory) throws IOException {
    return Files
      .find(directory, Integer.MAX_VALUE, (path, basicFileAttributes) -> envFilePattern.matcher(path.getFileName().toString()).matches(), FOLLOW_LINKS)
      .map(FileSystemResource::new)
      .collect(Collectors.toUnmodifiableList());
  }

  private Optional<Path> resolveConfDir() {
    for (String candidate : confDirCandidates) {
      Path path = Paths.get(candidate);
      if (Files.exists(path) && Files.isDirectory(path)) return Optional.of(path);
    }
    return Optional.empty();
  }

  private static void appendPropertySources(MutablePropertySources propertySources, Iterable<? extends PropertySource<?>> toAppend) {
    StreamSupport.stream(toAppend.spliterator(), false).forEach(propertySources::addLast);
  }

}
