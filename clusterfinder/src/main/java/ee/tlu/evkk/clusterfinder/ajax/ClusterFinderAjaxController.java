package ee.tlu.evkk.clusterfinder.ajax;

import ee.tlu.evkk.clusterfinder.ajax.helper.ClusterFinderAjaxControllerHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class ClusterFinderAjaxController {

  private final ClusterFinderAjaxControllerHelper clusterFinderAjaxControllerHelper;

  public ClusterFinderAjaxController(ClusterFinderAjaxControllerHelper clusterFinderAjaxControllerHelper) {
    this.clusterFinderAjaxControllerHelper = clusterFinderAjaxControllerHelper;
  }

  @PostMapping( value = "/clusterfinder/search" )
  public void executeClusterSearch(HttpServletRequest request, HttpServletResponse response) {
    clusterFinderAjaxControllerHelper.clusterText(request, response);
  }
}
