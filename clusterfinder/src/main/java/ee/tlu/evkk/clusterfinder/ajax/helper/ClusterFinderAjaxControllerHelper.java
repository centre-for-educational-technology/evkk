package ee.tlu.evkk.clusterfinder.ajax.helper;

import ee.tlu.evkk.clusterfinder.service.model.ClusterResult;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface ClusterFinderAjaxControllerHelper {

  ResponseEntity<ClusterResult> clusterText(HttpServletRequest request) throws IOException;

}
