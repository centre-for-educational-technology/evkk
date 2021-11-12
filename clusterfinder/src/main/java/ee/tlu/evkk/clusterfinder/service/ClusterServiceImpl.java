package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.exception.ProcessingAbortedException;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.mapping.ClusterResultMapper;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestOperations;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

public class ClusterServiceImpl implements ClusterService {

  private static final Logger log = LoggerFactory.getLogger(ClusterServiceImpl.class);

  private final ClusterResultMapper resultMapper;
  private final RestOperations restOperations;

  public ClusterServiceImpl(ClusterResultMapper resultMapper, RestOperations restOperations)
  {
    this.resultMapper = resultMapper;
    this.restOperations = restOperations;
  }

  @Override
  public ClusterResult clusterText(ClusterSearchForm searchForm)
  {
    String clusteringParams = getClusteringParams(searchForm);

    try
    {
      String markedText = markText(searchForm.getFileName(), searchForm.getFormId());
      String clusteredText = clusterMarkedText(markedText, clusteringParams);
      return resultMapper.mapResults(clusteredText, searchForm);
    }
    catch (IOException | ProcessingAbortedException e)
    {
      log.error("Could not cluster text", e);
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

  private String markText(String fileName, String formId) throws IOException, ProcessingAbortedException
  {
    if (1 == 1) { //TODO:
      String tekst = Files.readString(Path.of(fileName));
      return klasterdajaParsi(tekst);
    }

    ProcessBuilder markingProcess = new ProcessBuilder("python", "file_text_marker.py", fileName, formId);
    markingProcess.directory(new File("clusterfinder/src/main/resources/scripts").getAbsoluteFile());
    return queryProcess(markingProcess);
  }

  private String clusterMarkedText(String markedTextFile, String clusteringParams) throws IOException, ProcessingAbortedException
  {
    if (1 == 1) { //TODO:
      return klasterdajaKlasterda(markedTextFile, clusteringParams);
    }
    ProcessBuilder clusteringProcess = new ProcessBuilder("python", "cluster_helper.py", "-f", markedTextFile, clusteringParams);
    clusteringProcess.directory(new File("clusterfinder/src/main/resources/scripts").getAbsoluteFile());
    return queryProcess(clusteringProcess);
  }

  private String queryProcess(ProcessBuilder processBuilder) throws IOException, ProcessingAbortedException
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

      throw new ProcessingAbortedException( error );
    }

    String response;
    try (InputStream is = process.getInputStream()) {
      response = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    return response;
  }

  private String klasterdajaParsi(String tekst)
  {
    Map<String, String> body = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(body);
    return restOperations.postForObject("/parsi", requestEntity, String.class);
  }

  private String klasterdajaKlasterda(String tekst, String parameetrid)
  {
    Map<String, String> body = Map.of("tekst", tekst, "parameetrid", parameetrid);
    HttpEntity<?> requestEntity = new HttpEntity<>(body);
    return restOperations.postForObject("/klasterda", requestEntity, String.class);
  }

}
