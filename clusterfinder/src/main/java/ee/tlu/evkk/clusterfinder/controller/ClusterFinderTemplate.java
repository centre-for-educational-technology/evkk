package ee.tlu.evkk.clusterfinder.controller;

import ee.tlu.evkk.clusterfinder.client.EvkkClient;
import ee.tlu.evkk.clusterfinder.constants.TemplateConstants;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class ClusterFinderTemplate {

  private final EvkkClient evkkClient;

  public ClusterFinderTemplate(EvkkClient evkkClient) {
    this.evkkClient = evkkClient;
  }

  @GetMapping( "/" )
  public String render( Model model,
                              @RequestParam( value = "evkkSessionToken", required = false ) String sessionToken,
                              @RequestParam( value = "userFileId", required = false ) String userFileId ) {
    model.addAttribute( "userFiles", sessionToken != null ? evkkClient.listFiles( sessionToken ) : List.of() );
    model.addAttribute( "selectedFile", userFileId );
    return TemplateConstants.CLUSTER_SEARCH;
  }

}
