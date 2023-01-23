package ee.tlu.evkk.api;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import org.springframework.core.io.ClassPathResource;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.io.InputStream;

import static java.lang.String.format;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.util.StreamUtils.copyToString;

public class TestUtils {

  public static Gson gson = new Gson();

  public static String readResourceAsString(@NotNull String path) throws IOException {
    ClassPathResource resource = new ClassPathResource(path);
    if (!resource.exists()) {
      throw new ResourceNotFoundException(path);
    }
    try (InputStream stream = resource.getInputStream()) {
      return readFromStream(stream);
    }
  }

  public static JsonElement stringArrayToJson(@NotNull String content) {
    return gson.toJsonTree(content
      .replaceAll("\n", "")
      .replaceAll(" ", ""));
  }

  private static String readFromStream(InputStream inputStream) throws IOException {
    return copyToString(inputStream, UTF_8);
  }

  private static class ResourceNotFoundException extends RuntimeException {
    private static final String MESSAGE = "Resource not found from path %s.";

    public ResourceNotFoundException(String path) {
      super(format(MESSAGE, path));
    }
  }
}
