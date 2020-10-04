package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.mapping.ClusterResultMapper;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class ClusterServiceImpl implements ClusterService {

  private static final Logger log = LoggerFactory.getLogger(ClusterServiceImpl.class);

  private final ClusterResultMapper resultMapper;

  public ClusterServiceImpl(ClusterResultMapper resultMapper)
  {
    this.resultMapper = resultMapper;
  }

  @Override
  public ClusterResult clusterText(ClusterSearchForm searchForm)
  {
    String clusteringParams = getClusteringParams(searchForm);

    try
    {
      String markedText = markFreeText(searchForm.getText(), searchForm.getFormId());
      return resultMapper.mapResults(clusterMarkedText(markedText, clusteringParams), searchForm.getAnalysisLength());
    }
    catch (IOException e)
    {
      log.error("Could not cluster text: {}", e.getMessage());
      return ClusterResult.EMPTY;
    }
  }

  private String getClusteringParams(ClusterSearchForm searchForm)
  {
    StringBuilder sb = new StringBuilder();
    sb.append("-k").append(" ").append(searchForm.getAnalysisLength()).append(" ");

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

    // Always append -e parameter (otherwise clustering won't work)
    sb.append("-e");
    return sb.toString();
  }

  private String markFreeText(String text, String formId) throws IOException
  {
    ProcessBuilder markingProcess = new ProcessBuilder("python", "free_text_marker.py", formId, text);
    markingProcess.directory(new File("clusterfinder/src/main/resources/scripts").getAbsoluteFile());
    return queryProcess(markingProcess);
  }

  private String markFileBasedText(String fileName, String formId) throws IOException
  {
    // TODO: Add method body
    return null;
  }

  private String clusterMarkedText(String markedTextFile, String clusteringParams) throws IOException
  {
    ProcessBuilder clusteringProcess = new ProcessBuilder("python", "cluster_helper.py", "-f", markedTextFile, clusteringParams);
    clusteringProcess.directory(new File("clusterfinder/src/main/resources/scripts").getAbsoluteFile());
    return queryProcess(clusteringProcess);
  }

  private String queryProcess(ProcessBuilder processBuilder) throws IOException
  {
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
