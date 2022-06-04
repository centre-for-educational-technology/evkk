package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.exception.ProcessingAbortedException;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.mapping.ClusterResultMapper;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestOperations;

import java.io.IOException;
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
      String clusteredText = clusterText(searchForm.getFileName(), searchForm.shouldReplaceOptionalMarkups(), clusteringParams);
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

    return sb.toString();
  }

  private String clusterText(String fileName, boolean shouldReplaceOptionalMarkups, String clusteringParams) throws IOException, ProcessingAbortedException
  {
    String text = Files.readString(Path.of(fileName));
    return klasterdajaKlasterda(text, shouldReplaceOptionalMarkups, clusteringParams);
  }

  private String klasterdajaKlasterda(String tekst, boolean shouldReplaceOptionalMarkups, String parameetrid)
  {
    Map<String, String> body = Map.of("tekst", tekst, "eemaldaValikulised", shouldReplaceOptionalMarkups ? "jah" : "ei", "parameetrid", parameetrid);
    HttpEntity<?> requestEntity = new HttpEntity<>(body);
    return restOperations.postForObject("/klasterda", requestEntity, String.class);
  }

}
