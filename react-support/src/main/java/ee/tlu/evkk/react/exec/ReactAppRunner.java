package ee.tlu.evkk.react.exec;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-19
 */
public class ReactAppRunner {

    private final Path directory;
    private final String host;
    private final int port;

    public ReactAppRunner(Path directory, String host, int port) {
        this.directory = directory;
        this.host = host;
        this.port = port;
    }

    public void install() {
        ProcessBuilder builder = new ProcessBuilder();
        builder.directory(directory.toFile());
        builder.command("yarn", "install");
        builder.inheritIO();

        Process process = startProcessUnchecked(builder);
        int returnValue = waitForUnchecked(process);
        if (returnValue != 0) {
            throw new RuntimeException("expected yarn install to return 0, got:" + returnValue);
        }
    }

    public void start() {
        Thread thread = new Thread(() -> {
            ProcessBuilder builder = new ProcessBuilder();
            builder.directory(directory.toFile());
            builder.command("yarn", "start");
            builder.inheritIO();
            Map<String, String> environment = builder.environment();
            environment.put("PORT", Integer.toString(port));
            environment.put("BROWSER", "none");
            environment.put("HOST", host);
            Process process = startProcessUnchecked(builder);
            Runtime.getRuntime().addShutdownHook(new ProcessDestroyer(process));
        });

        thread.setDaemon(false);
        thread.start();
    }

    private static int waitForUnchecked(Process process) {
        try {
            return process.waitFor();
        } catch (InterruptedException ex) {
            throw new RuntimeException(ex);
        }
    }

    private static Process startProcessUnchecked(ProcessBuilder builder) {
        try {
            return builder.start();
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    private static class ProcessDestroyer extends Thread {

        private final Process process;

        private ProcessDestroyer(Process process) {
            this.process = process;
        }

        @Override
        public void run() {
            process.destroyForcibly();
        }

    }

}
