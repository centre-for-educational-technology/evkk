package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;

import java.io.IOException;

public interface ClusterService
{
  ClusterResult clusterText( ClusterSearchForm searchForm ) throws IOException;
}
