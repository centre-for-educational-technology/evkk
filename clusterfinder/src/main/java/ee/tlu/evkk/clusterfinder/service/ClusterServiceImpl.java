package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
public class ClusterServiceImpl implements ClusterService {

  private static final Logger log = LoggerFactory.getLogger(ClusterServiceImpl.class);

  @Override
  public String clusterText(ClusterSearchForm searchForm) {

    String clusteringParams = getClusteringParams(searchForm);

    try
    {
      String markedText = markFreeText(searchForm.getText());
      return clusterMarkedText(markedText, clusteringParams);
    }
    catch (IOException e)
    {
      log.error("Could not cluster text: {}", e.getMessage());
      return null;
    }
  }

  private String getClusteringParams(ClusterSearchForm searchForm) {
    StringBuilder sb = new StringBuilder();

    if (searchForm.isMorfoAnalysis()) {
      sb.append("-m").append(" ");
    }

    if (searchForm.isSyntacticAnalysis()) {
      sb.append("-s").append(" ");
    }

    if (searchForm.isIncludePunctuation()) {
      sb.append("-z").append(" ");
    }

    if (searchForm.isWordtypeAnalysis()) {
      sb.append("-w").append(" ");
    }

    return sb.toString();
  }

  private String markFreeText(String text) throws IOException{
    ProcessBuilder markingBuilder = new ProcessBuilder("python", "scripts/free_text_marker.py", UUID.randomUUID().toString(), text);
    return queryProcess(markingBuilder);
  }

  private String markFileBasedText(String fileName) {
    // TODO: Add method body
    return null;
  }

  private String clusterMarkedText(String markedText, String clusteringParams) throws IOException {
    ProcessBuilder clusterBuilder = new ProcessBuilder("java -jar", "klastrileidja.jar", clusteringParams, markedText);
    return queryProcess(clusterBuilder);
  }

  private String queryProcess(ProcessBuilder processBuilder) throws IOException {
    Process process = processBuilder.start();
    int exitCode;

    try {
      exitCode = process.waitFor();
    } catch (InterruptedException e) {
      exitCode = 1;
      e.printStackTrace();
    }

    if (exitCode != 0) {
      String error;
      try (InputStream is = process.getErrorStream()) {
        error = new String(is.readAllBytes(), StandardCharsets.UTF_8);
      }

      log.error("Process returned non-zero exit code: {}", error);

    }

    String response;
    try (InputStream is = process.getInputStream()) {
      response = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    return response;
  }
}
