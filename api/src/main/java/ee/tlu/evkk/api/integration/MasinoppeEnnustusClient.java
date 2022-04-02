package ee.tlu.evkk.api.integration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

/**
 * @author Mikk Tarvas
 * Date: 09.02.2020
 */
public class MasinoppeEnnustusClient {

  private static final Logger log = LoggerFactory.getLogger(MasinoppeEnnustusClient.class);

  private final Path workingDirectory;

  public MasinoppeEnnustusClient(Path workingDirectory) {
    this.workingDirectory = workingDirectory;
  }

  public String execute(CharSequence charSequence) throws IOException, InterruptedException {
    if (charSequence == null) throw new NullPointerException();
    ProcessBuilder builder = new ProcessBuilder();
    builder.directory(workingDirectory.toFile());
    builder.command("java", "-jar", "me.jar", "-pt", charSequence.toString());

    Process process = builder.start();
    int exitCode = process.waitFor();

    if (exitCode != 0) {
      String error;
      try (InputStream is = process.getErrorStream()) {
        error = new String(is.readAllBytes(), StandardCharsets.UTF_8);
      }

      if (!error.isBlank()) {
        log.error(error);
      }

      throw new IllegalStateException("Process returned non-zero exit code: " + exitCode);
    }

    String response;
    try (InputStream is = process.getInputStream()) {
      response = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    return response;
  }

}
