package ee.tlu.evkk.clusterfinder.ajax;

import ee.tlu.evkk.clusterfinder.ajax.helper.ClusterFinderAjaxControllerHelper;
import ee.tlu.evkk.clusterfinder.exception.InvalidInputException;
import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static ee.tlu.evkk.clusterfinder.constants.AjaxConsts.CLUSTER_TEXT;

@Controller
public class ClusterFinderAjaxController {

  private final ClusterFinderAjaxControllerHelper clusterFinderAjaxControllerHelper;

  public ClusterFinderAjaxController(ClusterFinderAjaxControllerHelper clusterFinderAjaxControllerHelper) {
    this.clusterFinderAjaxControllerHelper = clusterFinderAjaxControllerHelper;
  }

  @PostMapping(value = CLUSTER_TEXT)
  public ResponseEntity<ClusterResult> executeClusterSearch(HttpServletRequest request) throws IOException, InvalidInputException {
    return clusterFinderAjaxControllerHelper.clusterText(request);
  }
}
