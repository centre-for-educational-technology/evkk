package ee.tlu.evkk.clusterfinder.ajax.helper;

import ee.tlu.evkk.clusterfinder.service.ClusterService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
class ClusterFinderAjaxControllerHelperImpl implements ClusterFinderAjaxControllerHelper {

  private final ClusterService clusterService;

  ClusterFinderAjaxControllerHelperImpl(ClusterService clusterService) {
    this.clusterService = clusterService;
  }

  @Override
  public void clusterText(HttpServletRequest request, HttpServletResponse response) {
    clusterService.clusterText();
  }

}
