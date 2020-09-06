package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;

import java.io.IOException;

public interface ClusterService {

  String clusterText(ClusterSearchForm searchForm) throws IOException;
}
