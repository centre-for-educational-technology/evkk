package ee.tlu.evkk.portal.client;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@Component
public class MeClient {

    private static final Logger log = LoggerFactory.getLogger(MeClient.class);

    private final File workingDirectory;

    public MeClient(@Value("${lib.me-path}") String path) {
        this.workingDirectory = Paths.get(path).toFile();
    }

    public String execute(CharSequence charSequence) throws IOException, InterruptedException {
        ProcessBuilder builder = new ProcessBuilder();
        builder.directory(this.workingDirectory);
        builder.command("java", "-jar", "me.jar", "-pt", charSequence.toString());
        Process process = builder.start();
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            String error;
            try (InputStream is = process.getErrorStream()) {
                error = IOUtils.toString(is, StandardCharsets.UTF_8);
            }

            if (error != null) {
                log.error(error);
            }

            throw new IllegalStateException("process returned non-zero exit code: " + exitCode);
        }

        String response;
        try (InputStream is = process.getInputStream()) {
            response = IOUtils.toString(is, StandardCharsets.UTF_8);
        }

        return response;
    }

}